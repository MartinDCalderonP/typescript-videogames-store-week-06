import React from 'react';
import styles from '../styles/Detail.module.scss';
import useFetch from '../hooks/useFetch';
import { getNamesFromArray } from '../components/Helpers';
import Spinner from '../components/Spinner';
import Comments from '../components/Comments';
import defaultImage from '../img/gameDefault.png';

export default function Detail({ postId, user }) {
	const fetchUrl = `https://trainee-gamerbox.herokuapp.com/games/${postId}`;
	const { data, loading } = useFetch(fetchUrl);

	return (
		<div className={styles.container}>
			{loading && <Spinner />}

			{!loading && data && (
				<>
					<h1>{data.name}</h1>

					<div className={styles.row}>
						<div className={styles.leftColumn}>
							<div className={styles.image}>
								<img
									src={data.cover_art?.url || defaultImage}
									alt={data.name}
								/>
							</div>
						</div>

						<div className={styles.dividerColumn}></div>

						<div className={styles.rightColumn}>
							<div className={styles.information}>
								<h3>Game Details</h3>

								<p>
									<b>Title: </b>
									{data.name}
								</p>

								<p>
									<b>Genre: </b>
									{data.genre.name}
								</p>

								{data?.publishers.length > 0 && (
									<p>
										<b>Publisher: </b>
										{getNamesFromArray(data.publishers)}
									</p>
								)}

								{data?.platforms.length > 0 && (
									<p>
										<b>Platoforms: </b>
										{getNamesFromArray(data.platforms)}
									</p>
								)}
							</div>
						</div>
					</div>

					<Comments postId={data.id} user={user} />
				</>
			)}
		</div>
	);
}
