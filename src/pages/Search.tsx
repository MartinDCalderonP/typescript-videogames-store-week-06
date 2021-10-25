import React, { useState } from 'react';
import styles from '../styles/Search.module.scss';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { ISearchedTerm } from '../common/types';
import Spinner from '../components/Spinner';
import CardsContainer from '../components/CardsContainer';
import PaginationButtons from '../components/PaginationButtons';

export default function Search() {
	const { searchedTerm } = useParams<ISearchedTerm>();
	const fetchUrl = `https://trainee-gamerbox.herokuapp.com/games?name_contains=${searchedTerm}`;
	const { data, loading } = useFetch(fetchUrl);
	const postsPerPage = 8;
	const [currentPage, setCurrentPage] = useState(1);

	const startIndex = postsPerPage * (currentPage - 1);
	const endIndex = postsPerPage * currentPage;
	const currentPosts = data?.slice(startIndex, endIndex);

	const handlePaginate = (pageNumber: number) => {
		setCurrentPage(pageNumber);
	};

	return (
		<div className={styles.searchPage}>
			{loading && <Spinner />}

			{!loading && data.length > 0 && (
				<>
					<h1>{`Results for "${searchedTerm}".`}</h1>

					<CardsContainer
						className={styles.results}
						loading={loading}
						posts={currentPosts}
					/>

					<PaginationButtons
						totalPosts={data.length}
						postsPerPage={postsPerPage}
						paginate={handlePaginate}
					/>
				</>
			)}

			{!loading && data.length === 0 && (
				<h1 className={styles.noResults}>
					{`No results found for "${searchedTerm}".`}
				</h1>
			)}
		</div>
	);
}
