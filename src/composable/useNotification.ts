import {notification} from 'ant-design-vue';
import {ref} from 'vue';

interface NotificationConfig {
    message: string;
    description?: string;
    duration?: number;
    key?: string;
    onClose?: () => void;
}

const useNotification = () => {
    const api = ref(notification);

    const success = (config: NotificationConfig) => api.value.success(config);
    const error = (config: NotificationConfig) => api.value.error(config);
    const info = (config: NotificationConfig) => api.value.info(config);
    const warning = (config: NotificationConfig) => api.value.warning(config);
    const warn = (config: NotificationConfig) => api.value.warn(config);
    const open = (config: NotificationConfig) => api.value.open(config);
    const close = (key: string) => api.value.close(key);
    const destroy = () => api.value.destroy();
    const useNotification = () => api.value.useNotification();

    return {success, error, info, warning, warn, open, close, destroy, useNotification};
};

export default useNotification;
