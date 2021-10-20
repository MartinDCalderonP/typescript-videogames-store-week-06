import React from 'react';
import styles from '../styles/CloseIcon.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export default function CloseIcon({ className, onClick }) {
	return (
		<FontAwesomeIcon
			className={styles.closeIcon + (className ? ` ${className}` : '')}
			onClick={onClick}
			icon={faTimes}
		/>
	);
}
