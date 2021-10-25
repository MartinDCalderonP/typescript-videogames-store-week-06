import React from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import styles from '../styles/Profile.module.scss';

export default function Profile() {
	const [user] = useLocalStorage<any>('user', '');

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
