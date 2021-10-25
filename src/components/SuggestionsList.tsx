import React from 'react';
import styles from '../styles/SuggestionsList.module.scss';
import useFetch from '../hooks/useFetch';
import { ISuggestionsList } from '../common/types';

export default function SuggestionsList({
	searchedTerm,
	suggestionSelected,
}: ISuggestionsList) {
	const fetchUrl = `https://trainee-gamerbox.herokuapp.com/games?name_contains=${searchedTerm}`;
	const { data, loading } = useFetch(fetchUrl);

	const handleSuggestionClick = (e: React.MouseEvent<HTMLLIElement>) => {
		if (typeof e.currentTarget.textContent === 'string') {
			suggestionSelected(e.currentTarget.textContent);
		}
	};

	return (
		<>
			{!loading && data.length > 0 && (
				<ul className={styles.suggestionsList}>
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
