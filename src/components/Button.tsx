import React from 'react';
import styles from '../styles/Button.module.scss';
import { IButton } from '../interfaces/types';

export default function Button({ className, onClick, children }: IButton) {
	return (
		<button
			className={styles.commentButton + (className ? ` ${className}` : '')}
			onClick={onClick}
		>
			{children}
		</button>
	);
}
