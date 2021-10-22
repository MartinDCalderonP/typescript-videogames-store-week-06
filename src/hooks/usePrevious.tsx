import { useRef, useEffect } from 'react';

export default function usePrevious<String>(value: String): String | undefined {
	const ref = useRef<String>();

	useEffect(() => {
		ref.current = value;
	}, [value]);

	return ref.current;
}
