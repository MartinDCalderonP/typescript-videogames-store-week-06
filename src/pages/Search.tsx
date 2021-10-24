import React from 'react';
import styles from '../styles/Search.module.scss';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { ISearchedTerm } from '../interfaces/types';
import CardsContainer from '../components/CardsContainer';
import Spinner from '../components/Spinner';

export default function Search() {
	const { searchedTerm } = useParams<ISearchedTerm>();
	const fetchUrl = `https://trainee-gamerbox.herokuapp.com/games?name_contains=${searchedTerm}`;
	const { data, loading } = useFetch(fetchUrl);

	return (
		<div className={styles.searchPage}>
			{loading && <Spinner />}

			{!loading && data.length > 0 && (
				<>
					<h1>{`Results for "${searchedTerm}"`}</h1>

					<CardsContainer loading={loading} posts={data} />
				</>
			)}

			{!loading && data.length === 0 && <h1>No results found</h1>}
		</div>
	);
}
