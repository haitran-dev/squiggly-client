import React from 'react';
import 'styles/normalize.css';
import 'styles/global.css';
import PropTypes from 'prop-types';

export default function App({ Component, pageProps }) {
	return (
		<main id='main'>
			<Component {...pageProps} />
		</main>
	);
}

App.propTypes = {
	Component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
	pageProps: PropTypes.object,
};
