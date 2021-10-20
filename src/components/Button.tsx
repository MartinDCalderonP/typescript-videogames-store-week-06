import React from 'react';
import styles from '../styles/Button.module.scss';

export default function Button({ className, onClick, children }) {
	return (
		<button
			className={styles.commentButton + (className ? ` ${className}` : '')}
			onClick={onClick}
		>
			{children}
		</button>
	);
}
