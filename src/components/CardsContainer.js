import React from 'react';
import styles from '../styles/CardsContainer.module.scss';
import Spinner from './Spinner';
import Card from './Card';

export default function CardsContainer({ loading, posts, toDetail }) {
	const handleToDetail = (postId) => {
		toDetail(postId);
	};

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
						onClick={() => handleToDetail(post.id)}
					/>
				))}
		</div>
	);
}
