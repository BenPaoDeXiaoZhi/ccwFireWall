<script lang="ts">
  import { ChevronDown } from "#node_modules/@lucide/svelte/dist/icons";
  import type { Snippet } from "svelte";
  import * as Collapsible from "./lib/components/ui/collapsible/index";
  let open = $state(false);
  type Props = {
    children: Snippet;
    title: string;
    class: string;
  };
  let { children, title, class: cn = "" }: Props = $props();
</script>

<Collapsible.Root bind:open>
  <div class={cn}>
    <span class="h-[1.5em] overflow-hidden">{title}</span>
    <Collapsible.Trigger class="cursor-pointer">
      <ChevronDown
        class="ms-auto transition-transform data-open:rotate-180 size-4"
        data-open={open}
      />
    </Collapsible.Trigger>
  </div>
  <Collapsible.Content>
    {@render children()}
  </Collapsible.Content>
</Collapsible.Root>
