import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from '../styles/Toast.module.scss';
import { IToast } from '../common/types';
import CloseIcon from './CloseIcon';

export default function Toast({ children, closeToast }: IToast) {
	useEffect(() => {
		let timeOut = setTimeout(() => {
			closeToast(true);
		}, 5000);

		return () => {
			clearTimeout(timeOut);
		};
	}, []);

	const handleCloseIconClick = () => {
		closeToast(true);
	};

	return createPortal(
		<div className={`${styles.toast} ${styles.appearToast}`}>
			{children}

			<CloseIcon className={styles.closeIcon} onClick={handleCloseIconClick} />
		</div>,
		document.getElementById('portal')!
	);
}
