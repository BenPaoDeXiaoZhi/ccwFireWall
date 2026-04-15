<script lang="ts">
  import { PluginContext } from "#src/plugin";

  let { vm }: PluginContext = $props();

  function escapeAscii(char: string){
    return `\x${char.charCodeAt(0).toString(16).padStart(2, "0")}`;
  }
  const needEscape = Array.from(`()[]{}'"`);
  
  let input = $state("");
  let output = $derived.by(()=>{
    const encrypted = needEscape.reduce((code, char)=>{
      return code.replaceAll(char, escapeAscii(char));
    }
  }, input);
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
    <input bind:value={output}/>
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