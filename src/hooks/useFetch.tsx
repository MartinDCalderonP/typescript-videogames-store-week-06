import { useState, useEffect, useCallback } from 'react';

const useFetch = (fetchUrl) => {
	const [data, setData] = useState(null);
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
};

export default useFetch;
