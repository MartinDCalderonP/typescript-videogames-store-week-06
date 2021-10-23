import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../styles/Detail.module.scss';
import useFetch from '../hooks/useFetch';
import { IDetail, IPostId } from '../interfaces/types';
import { getNamesFromArray } from '../components/Helpers';
import Spinner from '../components/Spinner';
import defaultImage from '../img/gameDefault.png';
import CommentBox from '../components/CommentBox';
import Divider from '../components/Divider';
import CommentsList from '../components/CommentsList';

export default function Detail({ user }: IDetail) {
	const { postId } = useParams<IPostId>();
	const fetchUrl = `https://trainee-gamerbox.herokuapp.com/games/${postId}`;
	const { data, loading } = useFetch(fetchUrl);
	const [updater, setUpdater] = useState(0);

	const handleUpdateFetchData = () => {
		setUpdater((current) => current + 1);
	};

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

					<CommentBox
						postId={data.id}
						user={user}
						updateFetchData={handleUpdateFetchData}
					/>

					<Divider />

					<CommentsList postId={data.id} updateFetchData={updater} />
				</>
			)}
		</div>
	);
}
