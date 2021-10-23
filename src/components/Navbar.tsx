import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styles from '../styles/Navbar.module.scss';
import { INavbar } from '../interfaces/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faHome,
	faArrowAltCircleLeft,
	faSignInAlt,
	faUserCircle,
} from '@fortawesome/free-solid-svg-icons';
import Modal from './Modal';

export default function Navbar({ onLoggedUser, user }: INavbar) {
	const [openModal, setOpenModal] = useState(false);
	const history = useHistory();

	const toPreviousPage = () => {
		history.goBack();
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

	const handleLoggedUser = (loggedUser: any) => {
		onLoggedUser(loggedUser);
		setOpenModal(false);
	};

	return (
		<>
			<nav className={styles.navbar}>
				<div onClick={toPreviousPage}>
					<FontAwesomeIcon
						className={styles.goBack}
						icon={faArrowAltCircleLeft}
					/>
					Go Back
				</div>

				<Link to="/">
					<FontAwesomeIcon className={styles.home} icon={faHome} />
					Home
				</Link>

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

			{openModal && (
				<Modal closeModal={handleCloseModal} loggedUser={handleLoggedUser} />
			)}
		</>
	);
}
