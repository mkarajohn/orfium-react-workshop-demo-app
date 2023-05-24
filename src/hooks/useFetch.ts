import { get } from '@/api.js';
import { BlogPostsResponse } from '@/types.ts';
import { useEffect, useState } from 'react';

export function useFetch(url: string) {
  const [data, setData] = useState<BlogPostsResponse | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    get(url, signal)
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        console.log(err);
      });

    return function () {
      controller.abort();
    };
  }, [url]);

  return [data, setData] as const;
}
