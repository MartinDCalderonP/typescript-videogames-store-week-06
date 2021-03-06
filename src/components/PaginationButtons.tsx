import React, { useState, useMemo } from 'react';
import styles from '../styles/PaginationButtons.module.scss';
import useFetch from '../hooks/useFetch';
import { IPaginationButtons } from '../common/types';

export default function PaginationButtons({
	totalPosts,
	postsPerPage,
	paginate,
}: IPaginationButtons) {
	const fetchUrl = `https://trainee-gamerbox.herokuapp.com/games/count`;
	const { data, loading } = useFetch(fetchUrl);
	const [currentPage, setCurrentPage] = useState(1);
	const pagesNumbers = useMemo(() => {
		return Array.from(
			{ length: Math.ceil((totalPosts || data) / postsPerPage) },
			(_, i) => 1 + i
		);
	}, [data, postsPerPage]);

	const handlePageButtonClick = (pageNumber: number) => {
		paginate(pageNumber);
		setCurrentPage(pageNumber);
	};

	return (
		<div className={styles.buttonsContainer}>
			{!loading &&
				pagesNumbers?.map((pageNumber: number) => (
					<button
						className={
							styles.pageButton +
							(currentPage === pageNumber ? ` ${styles.active}` : '')
						}
						key={`paginationButton${pageNumber}`}
						onClick={() => handlePageButtonClick(pageNumber)}
					>
						{pageNumber}
					</button>
				))}
		</div>
	);
}
