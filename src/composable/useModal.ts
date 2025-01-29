/**
 * useModal composable for managing modal state in Vue 3.
 *
 * @param {boolean} initialValue - Initial state of the modal (default: false).
 * @returns {object} Modal state and control functions.
 */
import {ref} from "vue";

export function useModal(initialValue: boolean = false) {
    const isOpen = ref<boolean>(initialValue);

    /** Open the modal */
    const open = () => {
        isOpen.value = true;
    };

    /** Close the modal */
    const close = () => {
        isOpen.value = false;
    };

    /** Toggle the modal state */
    const reverse = () => {
        isOpen.value = !isOpen.value;
    };

    return {isOpen, open, close, reverse};
}