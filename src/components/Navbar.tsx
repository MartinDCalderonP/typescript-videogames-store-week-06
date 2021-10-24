import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Navbar.module.scss';
import { INavbar } from '../interfaces/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faHome,
	faSignInAlt,
	faUserCircle,
} from '@fortawesome/free-solid-svg-icons';
import Search from './SearchInput';
import Modal from './Modal';

export default function Navbar({ onLoggedUser, user }: INavbar) {
	const [openModal, setOpenModal] = useState(false);

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
				<Link to="/">
					<FontAwesomeIcon className={styles.home} icon={faHome} />
					Home
				</Link>

				<Search />

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
