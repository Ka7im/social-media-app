import { useEffect, useState } from 'react';
import { $authHost } from '../../axios/axios';
import { IUser } from '../../types/User';

export function useDialogs() {
    const [dialogs, setDialogs] = useState<IUser[]>([]);

    useEffect(() => {
        $authHost.get('/dialogs').then(({ data }) => {
            setDialogs(data);
        });
    }, []);

    return { dialogs, setDialogs };
}
