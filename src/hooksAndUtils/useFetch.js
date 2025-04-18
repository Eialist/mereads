import { useEffect } from 'react';
import { get, post, patch, del, authGet } from './fetchUtils';

function FetchHelper(func, stateSetter) {
    useEffect(() => {
        (async () => {
            let result = await func();
            stateSetter(result);
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
}

export function useGet(url, stateSetter) {
    FetchHelper(() => get(url), stateSetter, url, 'get');
}

export function useAuthGet(url, token, stateSetter) {
    FetchHelper(() => authGet(url, token), stateSetter, url, 'get');
}

export function usePost(url, body, stateSetter) {
    FetchHelper(() => post(url, body), stateSetter, url, 'post');
}

export function usePatch(url, body, stateSetter) {
    FetchHelper(() => patch(url, body), stateSetter, url, 'PATCH')
}

export function useDelete(url, stateSetter) {
    FetchHelper(() => del(url), stateSetter, url, 'delete');
}