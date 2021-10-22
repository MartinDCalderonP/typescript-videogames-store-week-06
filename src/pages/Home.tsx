import React, { useState } from 'react';
import styles from '../styles/Home.module.scss';
import useFetch from '../hooks/useFetch';
import { IHome } from '../interfaces/types';
import Carousel from '../components/Carousel';
import CardsContainer from '../components/CardsContainer';
import PaginationButtons from '../components/PaginationButtons';

export default function Home({ toDetail }: IHome) {
	const postsUrl = `https://trainee-gamerbox.herokuapp.com/games?_sort=release_year&_limit=8`;
	const [fetchUrl, setFetchUrl] = useState(postsUrl);
	const { data, loading } = useFetch(fetchUrl);
	const postsPerPage = 8;

	const handleToDetail = (postId: number) => {
		toDetail(postId);
	};

	const handlePaginate = (pageNumber: number) => {
		setFetchUrl(postsUrl + `&_start=${(pageNumber - 1) * postsPerPage}`);
	};

	return (
		<>
			<Carousel toDetail={handleToDetail} />

			<div className={styles.mainContainer}>
				<CardsContainer
					loading={loading}
					posts={data}
					toDetail={handleToDetail}
				/>

				<PaginationButtons
					postsPerPage={postsPerPage}
					paginate={handlePaginate}
				/>
			</div>
		</>
	);
}
