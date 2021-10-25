import React, { useState, useRef, useEffect } from 'react';
import styles from '../styles/SuggestionsList.module.scss';
import useFetch from '../hooks/useFetch';
import { ISuggestionsList } from '../common/types';
import { MouseEvent } from 'react-router/node_modules/@types/react';

export default function SuggestionsList({
	searchedTerm,
	suggestionSelected,
	closeSuggestions,
}: ISuggestionsList) {
	const fetchUrl = `https://trainee-gamerbox.herokuapp.com/games?name_contains=${searchedTerm}`;
	const { data, loading } = useFetch(fetchUrl);
	const ulRef = useRef<HTMLUListElement>(null);

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

	const handleSuggestionClick = (e: React.MouseEvent<HTMLLIElement>) => {
		if (typeof e.currentTarget.textContent === 'string') {
			suggestionSelected(e.currentTarget.textContent);
		}
	};

	return (
		<>
			{!loading && data.length > 0 && (
				<ul className={styles.suggestionsList} ref={ulRef}>
					{data?.map((suggestion: any) => (
						<li
							className={styles.suggestion}
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
