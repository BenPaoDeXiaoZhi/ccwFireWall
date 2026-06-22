import { RPC } from "@mixer/postmessage-rpc";
import { writable } from "svelte/store";
import type { Fetcher, Writer } from "./trapProjectStore";
export const vm = writable<GandiVM>();
export const rpc = writable<RPC>();
export const fetcher = writable<Fetcher>();
export const writer = writable<Writer>();
