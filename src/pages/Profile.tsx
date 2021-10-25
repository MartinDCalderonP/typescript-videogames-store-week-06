import React from 'react';
import styles from '../styles/Profile.module.scss';

export default function Profile() {
	const user = JSON.parse(window.localStorage.getItem('user') || '{}');

	return (
		<div className={styles.profilePage}>
			{user && (
				<>
					<h1>Profile of {user?.user?.firstName}</h1>
				</>
			)}
		</div>
	);
}
