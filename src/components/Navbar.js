import React, { useState } from 'react';
import styles from '../styles/Navbar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faHome,
	faArrowAltCircleLeft,
	faSignInAlt,
	faUserCircle,
} from '@fortawesome/free-solid-svg-icons';
import Modal from './Modal';

export default function Navbar({ toHome, previousPage, onLoggedUser, user }) {
	const [openModal, setOpenModal] = useState(false);

	const handleHomeClick = () => {
		toHome(true);
	};

	const handlePreviousClick = () => {
		previousPage(true);
	};

	const handleSignInClick = () => {
		setOpenModal(true);
	};

	const handleSignOutClick = () => {
		onLoggedUser(null);
		localStorage.removeItem('user');
	};

	const handleCloseModal = () => {
		setOpenModal(false);
	};

	const handleLoggedUser = (loggedUser) => {
		onLoggedUser(loggedUser);
		setOpenModal(false);
	};

	return (
		<>
			<nav className={styles.navbar}>
				<div onClick={handlePreviousClick}>
					<FontAwesomeIcon
						className={styles.goBack}
						icon={faArrowAltCircleLeft}
					/>
					Go Back
				</div>

				<div onClick={handleHomeClick}>
					<FontAwesomeIcon className={styles.home} icon={faHome} />
					Home
				</div>

				{!user ? (
					<div onClick={handleSignInClick}>
						Sign In
						<FontAwesomeIcon className={styles.signIn} icon={faSignInAlt} />
					</div>
				) : (
					<div onClick={handleSignOutClick}>
						{user?.user?.firstName}
						<FontAwesomeIcon className={styles.signIn} icon={faUserCircle} />
					</div>
				)}
			</nav>

			{openModal && !user && (
				<Modal closeModal={handleCloseModal} loggedUser={handleLoggedUser} />
			)}
		</>
	);
}
