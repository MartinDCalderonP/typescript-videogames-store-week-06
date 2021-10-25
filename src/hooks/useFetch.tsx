import { useState, useEffect, useCallback } from 'react';
import { IUseFetch } from '../common/types';

export default function useFetch<T>(fetchUrl: string): IUseFetch<T> {
	const [data, setData] = useState<T>();
	const [loading, setLoading] = useState(true);

	const fetchData = useCallback(
		async (signal) => {
			setLoading(true);

			fetch(fetchUrl, { signal })
				.then((res) => res.json())
				.then((result) => {
					setData(result);
					setLoading(false);
				})
				.catch((err) => {
					if (err.name === 'AbortError') return;
					alert(`${err}. Try again later.`);
				});
		},
		[fetchUrl]
	);

	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;

		fetchData(signal);

		return () => abortController.abort();
	}, [fetchData]);

	return { data, loading, fetchData };
}
