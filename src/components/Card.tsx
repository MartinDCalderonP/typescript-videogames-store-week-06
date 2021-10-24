import React from 'react';
import styles from '../styles/Card.module.scss';
import { Link } from 'react-router-dom';
import { ICard } from '../common/types';
import { paths } from '../common/enums';
import defaultImage from '../img/gameDefault.png';

export default function Card({ id, name, image }: ICard) {
	return (
		<Link
			className={`${styles.card} ${styles.appearCard}`}
			to={`${paths.game}${id}`}
		>
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
