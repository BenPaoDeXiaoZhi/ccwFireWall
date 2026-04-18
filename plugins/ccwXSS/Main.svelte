<script module lang="ts">
  const prefix = `
const {stringify}=JSON;
JSON.stringify=(dat)=>{
JSON.stringify=stringify;
return run();
};
function run(){
`.replaceAll("\n", "");
  function escapeAscii(char: string) {
    return `\\x${char.charCodeAt(0).toString(16).padStart(2, "0")}`;
  }
  const needEscape = Array.from(`()=[]{}'". \n`);
</script>

<script lang="ts">
  import type { PluginContext } from "#src/plugin";

  let { vm }: PluginContext = $props();

  let input = $state("");
  let output = $derived.by(() => {
    const patchedCode = `${prefix}${input}};`;
    const escaped = needEscape.reduce((code, char) => {
      return code.replaceAll(char, escapeAscii(char));
    }, patchedCode);
    return `toString.constructor\`${escaped}\`\`\`,{}`;
  });
</script>

<li id="input">
  <label>
    <textarea
      bind:value={input}
      rows="4"
      wrap="off"
      onkeydown={(e) => e.stopPropagation()}>输入js代码</textarea
    >
  </label>
</li>
<li id="output">
  <label>
    <textarea
      bind:value={output}
      onfocus={function () {
        this.select();
      }}
      rows="6"
      wrap="off">编译后结果</textarea
    >
  </label>
</li>

<style>
  li {
    list-style: none;
    font-size: 12px;
  }
</style>
