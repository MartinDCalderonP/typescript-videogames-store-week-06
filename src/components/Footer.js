import React, { memo } from 'react';
import styles from '../styles/Footer.module.scss';

export default memo(function Footer() {
	return (
		<footer className={styles.footer}>
			© Videogames Store 2021 - Todos los derechos reservados
		</footer>
	);
});
