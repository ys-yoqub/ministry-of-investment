import {ref} from 'vue';
import axiosInstance from '../services/api/api';

interface UseMutateOptions {
    url: string;
    data?: Record<string, any>;
    method?: 'POST' | 'PUT' | 'DELETE';
    headers?: Record<string, string>;
    onSuccess?: (data: any) => void;
    onError?: (error: string) => void;
}

export function useMutate<T>() {
    const response = ref<T | null>(null);
    const isLoading = ref(false);
    const error = ref<string | null>(null);

    const mutate = async ({
                              url,
                              data = {},
                              method = 'POST',
                              headers = {},
                              onSuccess,
                              onError,
                          }: UseMutateOptions) => {
        isLoading.value = true;
        error.value = null;
        try {
            const res = await axiosInstance({url, method, data, headers});
            response.value = res.data;
            if (onSuccess) {
                onSuccess(res.data);
            }
        } catch (err: any) {
            error.value = err.response?.data?.message || err.message || 'An error occurred';
            if (onError) {
                onError(error.value || 'Unknown error');
            }
        } finally {
            isLoading.value = false;
        }
    };

    return {
        response,
        isLoading,
        error,
        mutate,
    };
}

export default useMutate;
