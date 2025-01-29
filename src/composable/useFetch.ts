import {onMounted, ref} from 'vue';
import axiosInstance from '../services/api/api';

interface UseFetchOptions {
    url: string;
    params?: Record<string, any>;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    immediateRequest?: boolean;
    headers?: Record<string, string>;
}

export function useFetch<T>({url, params = {}, method = 'GET', immediateRequest = true, headers = {}}: UseFetchOptions) {
    const data = ref<T | null>(null);
    const isLoading = ref(false);
    const error = ref<string | null>(null);

    const fetchData = async () => {
        isLoading.value = true;
        error.value = null;
        try {
            const response = await axiosInstance({
                url,
                method,
                params,
                headers,
            });
            data.value = response.data;
        } catch (err: any) {
            error.value =
                err.response?.data?.message || err.message || 'An error occurred';
        } finally {
            isLoading.value = false;
        }
    };

    if (immediateRequest) {
        onMounted(fetchData);
    }

    return {
        data,
        isLoading,
        error,
        fetchData,
    };
}
