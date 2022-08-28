import { writable } from 'svelte/store';

export const publicMessages =  writable([]);
export const privateMessages = writable([]);