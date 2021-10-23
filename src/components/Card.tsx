import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Card.module.scss';
import { ICard } from '../interfaces/types';
import defaultImage from '../img/gameDefault.png';

export default function Card({ id, name, image }: ICard) {
	return (
		<Link className={`${styles.card} ${styles.appearCard}`} to={`/game/${id}`}>
			<p>{name}</p>
			<div className={styles.cardImage}>
				<img
					className={!image ? styles.defaultImage : ''}
					src={image || defaultImage}
					alt={name}
				/>
			</div>
		</Link>
	);
}
