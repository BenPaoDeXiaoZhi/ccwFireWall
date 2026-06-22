<script lang="ts">
  import type { Snippet } from "svelte";

  type Props = {
    children: Snippet;
    h: string;
    t: string;
  };
  let { children, h, t }: Props = $props();
</script>

<div class="flex text-{t} gap-2.5 pl-1 h-{h}">
  {@render children()}
</div>
