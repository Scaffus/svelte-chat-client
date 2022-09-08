import { writable } from 'svelte/store';

export let groupsMessages = {};
export const messages = writable([]);

export function setGroupsMessages(messages) {
    groupsMessages = messages;
}