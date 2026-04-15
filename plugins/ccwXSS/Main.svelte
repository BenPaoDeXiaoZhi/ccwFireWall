<script module>
  const prefix = `
const {stringify}=JSON;
JSON.stringify=(dat)=>{
JSON.stringify=stringify;
return run();
};
function run(){
`.replaceAll("\n","");
  function escapeAscii(char: string){
    return `\\x${char.charCodeAt(0).toString(16).padStart(2, "0")}`;
  }
  const needEscape = Array.from(`()=[]{}'". \n`);
</script>
<script lang="ts">
  import { PluginContext } from "#src/plugin";

  let { vm }: PluginContext = $props();
  
  let input = $state("");
  let output = $derived.by(()=>{
    const patchedCode = `${prefix}${input}}`
    const escaped = needEscape.reduce((code, char)=>{
      return code.replaceAll(char, escapeAscii(char));
    }, patchedCode);
    return `toString.constructor\`${escaped}\`\`\``;
  });
  $effect(()=>{
    if(!$vm){
      return;
    }
    const { runtime } = $vm;
    if("ext_CCWData" in runtime){
      const { ext_CCWData } = runtime;
      const { getInfo } = ext_CCWData;
      ext_CCWData.getInfo = function(){
        const info = getInfo.call(this);
        console.log(info);
        info.blocks.forEach((b)=>{
          b.hideInPalette = false;
        })
        return info;
      }
    }
  })
</script>

<li id="input">
  <label>
    输入js代码
    <input bind:value={input}/>
  </label>
</li>
<li id="output">
  <label>
    编译后结果
    <input bind:value={output} onfocus={function(){this.select()}}/>
  </label>
</li>

<style>
  li {
    list-style: none;
    font-size: 12px;
  }
  button {
    font-size: 12px;
  }
</style>