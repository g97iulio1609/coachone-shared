/**
 * Global Dialog Utilities
 *
 * Provides global functions to replace window.alert, window.confirm, window.prompt
 * These functions use Zustand store directly (can be called outside React components)
 *
 * Usage:
 *   import { dialog } from '@onecoach/lib-shared/utils/dialog-global';
 *   await dialog.alert('Message');
 *   const confirmed = await dialog.confirm('Are you sure?');
 *   const value = await dialog.prompt('Enter value:');
 */

import { useDialogStore } from '@onecoach/lib-stores/dialog.store';

// Get dialog functions from store (can be called outside React components)
const getDialogStore = () => useDialogStore.getState();

export const dialog = {
  alert: async (message: string, options?: { title?: string; confirmLabel?: string }): Promise<void> => {
    if (typeof window === 'undefined') {
      // Server-side fallback
      return;
    }
    const store = getDialogStore();
    return store.alert(message, options);
  },

  confirm: async (
    message: string,
    options?: { title?: string; confirmLabel?: string; cancelLabel?: string }
  ): Promise<boolean> => {
    if (typeof window === 'undefined') {
      // Server-side fallback
      return false;
    }
    const store = getDialogStore();
    return store.confirm(message, options);
  },

  prompt: async (
    message: string,
    options?: {
      title?: string;
      confirmLabel?: string;
      cancelLabel?: string;
      defaultValue?: string;
      placeholder?: string;
    }
  ): Promise<string | null> => {
    if (typeof window === 'undefined') {
      // Server-side fallback
      return null;
    }
    const store = getDialogStore();
    return store.prompt(message, options);
  },

  info: async (message: string, options?: { title?: string; confirmLabel?: string }): Promise<void> => {
    if (typeof window === 'undefined') {
      return;
    }
    const store = getDialogStore();
    return store.info(message, options);
  },

  success: async (
    message: string,
    options?: { title?: string; confirmLabel?: string }
  ): Promise<void> => {
    if (typeof window === 'undefined') {
      return;
    }
    const store = getDialogStore();
    return store.success(message, options);
  },

  warning: async (
    message: string,
    options?: { title?: string; confirmLabel?: string; cancelLabel?: string }
  ): Promise<void> => {
    if (typeof window === 'undefined') {
      return;
    }
    const store = getDialogStore();
    return store.warning(message, options);
  },

  error: async (message: string, options?: { title?: string; confirmLabel?: string }): Promise<void> => {
    if (typeof window === 'undefined') {
      return;
    }
    const store = getDialogStore();
    return store.error(message, options);
  },
};
