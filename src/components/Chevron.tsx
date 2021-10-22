import React, { MouseEventHandler } from 'react';
import styles from '../styles/Chevron.module.scss';
import { IChevron } from '../interfaces/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faChevronUp,
	faChevronRight,
	faChevronDown,
	faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';

export default function Chevron({ className, onClick, orientation }: IChevron) {
	return (
		<div
			className={
				((orientation === 'top' && styles.top) ||
					(orientation === 'right' && styles.right) ||
					(orientation === 'down' && styles.down) ||
					(orientation === 'left' && styles.left)) +
				(className ? ` ${className}` : '')
			}
			onClick={onClick}
		>
			<FontAwesomeIcon
				icon={
					(orientation === 'top' && faChevronUp) ||
					(orientation === 'right' && faChevronRight) ||
					(orientation === 'down' && faChevronDown) ||
					(orientation === 'left' && faChevronLeft) ||
					faChevronUp
				}
			/>
		</div>
	);
}
