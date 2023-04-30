import { $host } from '../../axios/axios';

export async function uploadFile(file: Blob | string) {
    const formData = new FormData();
    formData.append('file', file);

    const { data } = await $host.post<{ url: string }>('/upload', formData);

    return data;
}
