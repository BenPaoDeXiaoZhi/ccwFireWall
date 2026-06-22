<script lang="ts">
  import { Circle, CircleCheck } from "@lucide/svelte";
  import TooltipContent from "$lib/components/ui/tooltip/tooltip-content.svelte";
  import TooltipTrigger from "$lib/components/ui/tooltip/tooltip-trigger.svelte";
  import Tooltip from "$lib/components/ui/tooltip/tooltip.svelte";
  import { rpcInstances, type RPCdata } from "./rpc.store";
  import { RPC_Message } from "#enum";

  let { id }: { id: string } = $props();
  let project = $derived<RPCdata>($rpcInstances[id])!;
  let { meta, rpc, target } = $derived(project);
  let { name, extraName, url, vmTrapped } = $derived(meta);
</script>

<div class="flex w-50" {id}>
  <Tooltip>
    <TooltipTrigger>
      <button
        class="bg-background cursor-pointer"
        onclick={() => {
          target.focus();
        }}
      >
        <span
          class="text-ellipsis overflow-hidden whitespace-nowrap w-40 min-h-6 flex flex-col items-start"
        >
          {name || "..."}
          {#if extraName}
            <span class="text-red-400 text-xs">{extraName}</span>
          {/if}
        </span>
      </button>
    </TooltipTrigger>
    <TooltipContent>
      <span class="w-20 wrap-anywhere">
        {`${name} ${extraName}(${decodeURI(url)})(点击打开)` || "..."}
      </span>
    </TooltipContent>
  </Tooltip>
  <Tooltip>
    <TooltipTrigger>
      <div class="w-10">
        {#if vmTrapped}
          <CircleCheck />
        {:else}
          <Circle />
        {/if}
      </div>
    </TooltipTrigger>
    <TooltipContent>
      {vmTrapped ? "已" : "未"}获取到vm
    </TooltipContent>
  </Tooltip>
</div>
