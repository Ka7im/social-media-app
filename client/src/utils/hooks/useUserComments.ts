import { useEffect, useState } from 'react';
import { $authHost } from '../../axios/axios';
import { IComment } from '../../types/Comment';

export function useUserComments(id: string) {
    const [comments, setComments] = useState<IComment[]>([]);

    useEffect(() => {
        $authHost
            .get<IComment[]>(`/comments/${id}`)
            .then(({ data }) => setComments(data));
    }, []);

    return comments;
}
