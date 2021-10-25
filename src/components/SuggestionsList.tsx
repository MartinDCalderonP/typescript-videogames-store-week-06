import React, { useState, useRef, useEffect } from 'react';
import styles from '../styles/SuggestionsList.module.scss';
import useFetch from '../hooks/useFetch';
import { ISuggestionsList } from '../common/types';
import { MouseEvent } from 'react-router/node_modules/@types/react';

export default function SuggestionsList({
	searchedTerm,
	suggestionSelected,
	closeSuggestions,
	pressedKey,
}: ISuggestionsList) {
	const fetchUrl = `https://trainee-gamerbox.herokuapp.com/games?name_contains=${searchedTerm}`;
	const { data, loading } = useFetch(fetchUrl);
	const ulRef = useRef<HTMLUListElement>(null);
	const [currentSuggestion, setCurrentSuggestion] = useState(0);

	useEffect(() => {
		const handleClickOutside = (e: any) => {
			if (ulRef.current && !ulRef.current.contains(e.target)) {
				closeSuggestions(true);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [ulRef]);

	useEffect(() => {
		if (pressedKey.keyCode === 38 && currentSuggestion > 0) {
			setCurrentSuggestion((current) => current - 1);
		}

		if (pressedKey.keyCode === 40 && currentSuggestion < data.length - 1) {
			setCurrentSuggestion((current) => current + 1);
		}

		if (pressedKey.keyCode === 13) {
			suggestionSelected(data[currentSuggestion].name);
			closeSuggestions(true);
		}
	}, [pressedKey]);

	const handleSuggestionClick = (e: React.MouseEvent<HTMLLIElement>) => {
		if (typeof e.currentTarget.textContent === 'string') {
			suggestionSelected(e.currentTarget.textContent);
			closeSuggestions(true);
		}
	};

	return (
		<>
			{!loading && data.length > 0 && (
				<ul className={styles.suggestionsList} ref={ulRef}>
					{data?.map((suggestion: any, index: number) => (
						<li
							className={
								styles.suggestion +
								(currentSuggestion === index ? ` ${styles.active}` : '')
							}
							key={suggestion.id}
							onClick={handleSuggestionClick}
						>
							{suggestion.name}
						</li>
					))}
				</ul>
			)}
		</>
	);
}
