import React, { useEffect } from 'react';
import styles from '../styles/CommentsList.module.scss';
import useFetch from '../hooks/useFetch';
import { ICommentsList, IComment } from '../common/types';
import { formatDate } from './Helpers';
import Spinner from './Spinner';

export default function CommentsList({
	postId,
	updateFetchData,
}: ICommentsList) {
	const fetchUrl = `https://trainee-gamerbox.herokuapp.com/games/${postId}/comments`;
	const { data, loading, fetchData } = useFetch(fetchUrl);

	useEffect(() => {
		fetchData();
	}, [updateFetchData]);

	return (
		<div className={styles.commentsList}>
			<h3>Comments:</h3>

			{loading && <Spinner />}

			{!loading &&
				data?.length > 0 &&
				data
					?.map((item: IComment) => (
						<div key={`comment${item.id}`}>
							<p>
								{`${item.user.firstName} ${item.user.lastName} `}
								<span>{formatDate(item.created_at)}</span>
							</p>
							<p>{item.body}</p>
						</div>
					))
					.reverse()}

			{!loading && data?.length === 0 && (
				<h3>There are no comments yet. Be the first!</h3>
			)}
		</div>
	);
}
