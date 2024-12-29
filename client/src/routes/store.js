import { writable } from 'svelte/store';

export const userStore = writable([]);
export const selectedUserStore = writable(null);
export const notificationStore = writable([]);
