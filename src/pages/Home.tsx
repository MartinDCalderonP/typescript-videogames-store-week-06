import React, { useState } from 'react';
import styles from '../styles/Home.module.scss';
import useFetch from '../hooks/useFetch';
import Carousel from '../components/Carousel';
import CardsContainer from '../components/CardsContainer';
import PaginationButtons from '../components/PaginationButtons';

export default function Home() {
	const postsUrl = `https://trainee-gamerbox.herokuapp.com/games?_sort=release_year&_limit=8`;
	const [fetchUrl, setFetchUrl] = useState(postsUrl);
	const { data, loading } = useFetch(fetchUrl);
	const postsPerPage = 8;

	const handlePaginate = (pageNumber: number) => {
		setFetchUrl(postsUrl + `&_start=${(pageNumber - 1) * postsPerPage}`);
	};

	return (
		<>
			<Carousel />

			<div className={styles.mainContainer}>
				<CardsContainer
					loading={loading}
					posts={data}
				/>

				<PaginationButtons
					postsPerPage={postsPerPage}
					paginate={handlePaginate}
				/>
			</div>
		</>
	);
}
