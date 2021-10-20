import React, { useState, useRef } from 'react';
import styles from '../styles/Comments.module.scss';
import useFetch from '../hooks/useFetch';
import { formatDate } from './Helpers';
import Spinner from './Spinner';
import Button from './Button';
import Toast from './Toast';

export default function Comments({ postId, user }) {
	const getCommentsUrl = `https://trainee-gamerbox.herokuapp.com/games/${postId}/comments`;
	const postCommentUrl = `https://trainee-gamerbox.herokuapp.com/games/${postId}/comment`;
	const { data, loading, fetchData } = useFetch(getCommentsUrl);
	const [textAreaValue, setTextAreaValue] = useState('');
	const textAreaRef = useRef();
	const [openToast, setOpenToast] = useState(false);
	const [message, setMessage] = useState('');

	const handleTextAreaValueChange = (e) => {
		setTextAreaValue(e.target.value);
	};

	const handlePostCommentButtonClick = (e) => {
		e.preventDefault();

		textAreaRef.current.focus();

		if (textAreaValue) {
			let newComment = {
				body: textAreaValue,
			};

			postComments(newComment);
		}
	};

	const postComments = (newComment) => {
		fetch(postCommentUrl, {
			method: 'POST',
			body: JSON.stringify(newComment),
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${user.jwt}`,
			},
		})
			.then((res) => res.json())
			.then(() => {
				fetchData();
				setMessage('Comment successfully added');
			})
			.catch((err) => setMessage(err));

		setOpenToast(true);
	};

	const handleCloseToast = () => {
		setOpenToast(false);
	};

	return (
		<>
			<div className={styles.commentBox}>
				{user ? (
					<>
						<textarea
							className={styles.commentArea}
							value={textAreaValue}
							onChange={handleTextAreaValueChange}
							ref={textAreaRef}
							type="text"
							name="commentArea"
							placeholder="Leave a comment..."
							rows="5"
						/>

						<Button onClick={handlePostCommentButtonClick}>
							Add a Comment
						</Button>
					</>
				) : (
					<div>
						<h2 className={styles.notLoggedText}>
							You must be logged to add a comment.
						</h2>
					</div>
				)}
			</div>

			<div className={styles.divider} />

			<div className={styles.commentsContainer}>
				<h3>Comments:</h3>

				{loading && <Spinner />}

				{!loading &&
					data?.length > 0 &&
					data
						?.map((item) => (
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

			{openToast && message && (
				<Toast closeToast={handleCloseToast}>{message}</Toast>
			)}
		</>
	);
}
