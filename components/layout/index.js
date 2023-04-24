import React from 'react';
import styles from './layout.module.css';
import PropTypes from 'prop-types';

export default function Layout({ children }) {
	return <div className={styles.container}>{children}</div>;
}

Layout.propTypes = {
	children: PropTypes.element.isRequired,
};
