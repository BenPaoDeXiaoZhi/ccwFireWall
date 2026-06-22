<script lang="ts">
  import * as Sidebar from "$lib/components/ui/sidebar/index";
  import {
    BrickWallFireIcon,
    CirclePlus,
    SquareTerminal,
  } from "@lucide/svelte";
  import CollapsibleMenu from "./CollapsibleMenu.svelte";
  import FlexItemContainer from "./FlexItemContainer.svelte";
  import ProjectsMenu from "./ProjectsMenu.svelte";
  import { rpcInstances, storeRPC } from "./rpc.store";
  import * as Dialog from "$lib/components/ui/dialog";
  import Button, {
    buttonVariants,
  } from "./lib/components/ui/button/button.svelte";
  import Input from "./lib/components/ui/input/input.svelte";
  import { RPC } from "@mixer/postmessage-rpc/dist/rpc";
  import { RPC_Message } from "#enum";
  import { parseProjectUrl } from "./parseProjectUrl";
  import Checkbox from "./lib/components/ui/checkbox/checkbox.svelte";

  let openUrlInput = $state(false);
  let projectUrl = $state("6a311058b6c84711978d68da");
  let openOverwrite = $state(false);
  let overwriteUrl = $state("68cfbb0c0f549053d68eac7b");
  let projectCount = $derived(Object.keys($rpcInstances).length);
</script>

<Sidebar.Provider>
  <Sidebar.Root collapsible="icon">
    <Sidebar.Header>
      <FlexItemContainer h="8" t="2xl">
        <BrickWallFireIcon
          color="#0084ff"
          class="shrink-0 mt-auto mb-auto size-6"
        />
        <h1 class="item">CCW Firewall</h1>
      </FlexItemContainer>
    </Sidebar.Header>
    <Sidebar.Content>
      <FlexItemContainer h="fit" t="xl">
        <SquareTerminal class="shrink-0 size-6 m-2 mr-0" />
        <CollapsibleMenu
          title={`已连接的项目(${projectCount})`}
          class="item mt-2 w-40"
        >
          <ProjectsMenu />
        </CollapsibleMenu>
      </FlexItemContainer>
    </Sidebar.Content>
    <Sidebar.Footer>
      <Button
        onclick={() => {
          openUrlInput = true;
        }}
      >
        <CirclePlus />
      </Button>
      <Sidebar.Trigger class="cursor-pointer" />
    </Sidebar.Footer>
  </Sidebar.Root>
</Sidebar.Provider>

<Dialog.Root bind:open={openUrlInput}>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>输入项目url</Dialog.Title>
    </Dialog.Header>
    <label>项目url<Input bind:value={projectUrl} /></label>
    <label class="flex gap-2">
      覆盖其他作品
      <Checkbox bind:checked={openOverwrite} />
    </label>
    {#if openOverwrite}
      <label>
        要覆盖的作品
        <Input bind:value={overwriteUrl} />
      </label>
    {/if}
    <Dialog.Footer>
      <Dialog.Close
        type="button"
        class={buttonVariants({ variant: "outline" })}
      >
        返回
      </Dialog.Close>
      <Button
        type="submit"
        onclick={async () => {
          const url = await parseProjectUrl(
            projectUrl,
            openOverwrite ? overwriteUrl : "",
          );
          const target = window.open(url, url);
          if (!target) {
            alert("打开项目失败!");
            return;
          }
          openUrlInput = false;
          const rpc = new RPC({
            target,
            serviceId: `${RPC_Message.shared_SERVICE_PREFIX}${url}`,
          });
          console.log(rpc);
          await rpc.isReady;
          await storeRPC(rpc, url, target);
        }}>确定</Button
      >
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>

<style lang="postcss">
  .item {
    @apply overflow-hidden shrink text-nowrap;
  }
</style>
