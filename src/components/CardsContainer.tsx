import React from 'react';
import styles from '../styles/CardsContainer.module.scss';
import { ICardsContainer } from '../interfaces/types';
import Spinner from './Spinner';
import Card from './Card';

export default function CardsContainer({
	loading,
	posts,
	toDetail,
}: ICardsContainer) {
	return (
		<div className={styles.cardsContainer}>
			{loading && <Spinner />}

			{!loading &&
				posts?.length > 0 &&
				posts?.map((post) => (
					<Card
						key={`card${post.id}`}
						name={post.name}
						image={post.cover_art?.formats?.small?.url}
						onClick={() => toDetail(post.id)}
					/>
				))}
		</div>
	);
}
