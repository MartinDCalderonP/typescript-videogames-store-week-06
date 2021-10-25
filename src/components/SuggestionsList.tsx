import React from 'react';
import styles from '../styles/SuggestionsList.module.scss';
import useFetch from '../hooks/useFetch';
import { ISuggestionsList } from '../common/types';

export default function SuggestionsList({ searchedTerm }: ISuggestionsList) {
	const fetchUrl = `https://trainee-gamerbox.herokuapp.com/games?name_contains=${searchedTerm}`;
	const { data, loading } = useFetch(fetchUrl);

	return (
		<>
			{!loading && data.length > 0 && (
				<ul className={styles.suggestionsList}>
					{data?.map((suggestion: any) => (
						<li className={styles.suggestionListItem} key={suggestion.id}>
							{suggestion.name}
						</li>
					))}
				</ul>
			)}
		</>
	);
}
