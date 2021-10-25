import React, { useState } from 'react';
import styles from '../styles/Navbar.module.scss';
import { Link, useHistory } from 'react-router-dom';
import { INavbar } from '../common/types';
import { paths } from '../common/enums';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faHome,
	faSignInAlt,
	faSignOutAlt,
	faUserCircle,
} from '@fortawesome/free-solid-svg-icons';
import Search from './SearchInput';
import Modal from './Modal';

export default function Navbar({ onLoggedUser, user }: INavbar) {
	const [openModal, setOpenModal] = useState(false);
	const history = useHistory();

	const handleSignInClick = () => {
		setOpenModal(true);
	};

	const handleToProfile = () => {
		history.push(`${paths.profile}${user.user.id}`);
	};

	const handleSignOutClick = () => {
		onLoggedUser(null);
		window.localStorage.removeItem('user');
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
					<FontAwesomeIcon className={styles.leftSide} icon={faHome} />
					Home
				</Link>

				<Search />

				{!user ? (
					<div onClick={handleSignInClick}>
						Sign In
						<FontAwesomeIcon className={styles.rightSide} icon={faSignInAlt} />
					</div>
				) : (
					<div>
						<div onClick={handleToProfile}>
							{user?.user?.firstName}
							<FontAwesomeIcon
								className={styles.rightSide}
								icon={faUserCircle}
							/>
						</div>

						<div onClick={handleSignOutClick}>
							<FontAwesomeIcon
								className={styles.rightSide}
								icon={faSignOutAlt}
							/>
						</div>
					</div>
				)}
			</nav>

			{openModal && (
				<Modal closeModal={handleCloseModal} loggedUser={handleLoggedUser} />
			)}
		</>
	);
}
