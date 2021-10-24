import { useState, useEffect, useCallback } from 'react';
import { IUseFetch } from '../common/types';

export default function useFetch<T>(fetchUrl: string): IUseFetch<T> {
	const [data, setData] = useState<T>();
	const [loading, setLoading] = useState(true);

	const fetchData = useCallback(async () => {
		setLoading(true);

		fetch(fetchUrl)
			.then((res) => res.json())
			.then((result) => {
				setData(result);
				setLoading(false);
			})
			.catch((err) => alert(`${err}. Try again later.`));
	}, [fetchUrl]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	return { data, loading, fetchData };
}
