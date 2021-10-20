import React, { useState, useRef } from 'react';
import styles from '../styles/CommentBox.module.scss';
import Button from './Button';
import Toast from './Toast';

export default function CommentBox({ postId, user, updateFetchData }) {
	const fetchUrl = `https://trainee-gamerbox.herokuapp.com/games/${postId}/comment`;
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
		fetch(fetchUrl, {
			method: 'POST',
			body: JSON.stringify(newComment),
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${user.jwt}`,
			},
		})
			.then((res) => res.json())
			.then(() => {
				updateFetchData(true);
				setMessage('Comment successfully added');
			})
			.catch((err) => setMessage(err));

		setOpenToast(true);
	};

	const handleCloseToast = () => {
		setOpenToast(false);
	};

	return (
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

					<Button onClick={handlePostCommentButtonClick}>Add a Comment</Button>
				</>
			) : (
				<div>
					<h2 className={styles.notLoggedText}>
						You must be logged to add a comment.
					</h2>
				</div>
			)}

			{openToast && message && (
				<Toast closeToast={handleCloseToast}>{message}</Toast>
			)}
		</div>
	);
}
