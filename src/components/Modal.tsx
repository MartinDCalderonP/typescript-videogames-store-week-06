import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from '../styles/Modal.module.scss';
import useAuth from '../hooks/useAuth';
import { IModal } from '../common/types';
import CloseIcon from './CloseIcon';
import Button from './Button';
import Toast from './Toast';

export default function Modal({ closeModal, loggedUser }: IModal) {
	const [identifier, setIdentifier] = useState('');
	const [password, setPassword] = useState('');
	const [formData, setFormData] = useState({
		identifier,
		password,
	});
	const { user, message } = useAuth(formData);
	const [openToast, setOpenToast] = useState(false);

	useEffect(() => {
		if (user) {
			loggedUser(user);
		}
	}, [user]);

	const handleCloseIconClick = () => {
		closeModal(true);
	};

	const handleIdentifierChange = (e: React.FormEvent<HTMLInputElement>) => {
		setIdentifier(e.currentTarget.value);
	};

	const handlePasswordChange = (e: React.FormEvent<HTMLInputElement>) => {
		setPassword(e.currentTarget.value);
	};

	const handleSignInButton = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		setFormData({
			identifier,
			password,
		});

		setOpenToast(true);
	};

	const handleCloseToast = () => {
		setOpenToast(false);
	};

	return createPortal(
		<div className={`${styles.overlay} ${styles.showModal}`}>
			<div className={styles.modal}>
				<CloseIcon
					className={styles.modalClose}
					onClick={handleCloseIconClick}
				/>

				<h1>Sign In</h1>

				<form className={styles.signInForm}>
					<input
						value={identifier}
						onChange={handleIdentifierChange}
						type="text"
						name="Identifier"
						placeholder="Identifier"
					/>

					<input
						value={password}
						onChange={handlePasswordChange}
						type="password"
						name="Password"
						placeholder="Password"
					/>

					<Button onClick={handleSignInButton}>Sign In</Button>
				</form>
			</div>

			{openToast && message && (
				<Toast closeToast={handleCloseToast}>{message}</Toast>
			)}
		</div>,
		document.getElementById('portal')!
	);
}
