import React, {
	useState,
	useRef,
	useCallback,
	ChangeEvent,
	MouseEvent,
} from 'react';
import styles from '../styles/CommentBox.module.scss';
import _ from 'lodash';
import { ICommentBox } from '../common/types';
import Button from './Button';
import Toast from './Toast';

export default function CommentBox({
	postId,
	user,
	updateFetchData,
}: ICommentBox) {
	const fetchUrl = `https://trainee-gamerbox.herokuapp.com/games/${postId}/comment`;
	const [textAreaValue, setTextAreaValue] = useState('');
	const textAreaRef = useRef<HTMLTextAreaElement>(null);
	const [openToast, setOpenToast] = useState(false);
	const [message, setMessage] = useState('');

	const handleTextAreaValueChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setTextAreaValue(e.currentTarget.value);
	};

	const postComment = (newComment: object) => {
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

	const throttledPostComment = useCallback(
		_.throttle((newComment) => {
			postComment(newComment);
		}, 1000),
		[postComment]
	);

	const handlePostCommentButtonClick = (e: MouseEvent<HTMLInputElement>) => {
		e.preventDefault();

		if (textAreaRef.current !== null) {
			textAreaRef.current.focus();
		}

		if (textAreaValue) {
			let newComment = {
				body: textAreaValue,
			};

			throttledPostComment(newComment);
		}
	};

	const handleCloseToast = () => {
		setOpenToast(false);
	};

	return (
		<div className={styles.commentBox}>
			{user?.jwt ? (
				<>
					<textarea
						className={styles.commentArea}
						value={textAreaValue}
						onChange={handleTextAreaValueChange}
						ref={textAreaRef}
						name="commentArea"
						placeholder="Leave a comment..."
						rows={5}
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
