import {ref} from 'vue';
import axiosAPI from '../api/api';

export function useFetchAPI(method: 'post' | 'get' | 'put', apiUrl: string, toSendData?: any) {
    const data = ref(null)
    const error = ref<string | null>(null)

    const doFetch = async () => {
        await axiosAPI[method](apiUrl, toSendData)
            .then((res) => {
                data.value = res.data;
            })
            .catch((err) => {
                error.value = err;
                console.error('the error in fetchApi :', err.response.status)
                if (err.response.status === 404) {
                    error.value = '404';
                }
            })
            .finally(() => {
            })
    }

    doFetch();

    return {data, error}
}
