import 'styles/global.css';
import 'styles/normalize.css';
import React from 'react';

type AppProps = {
	Component: React.ComponentType<unknown>;
	pageProps: object;
};

export default function App({ Component, pageProps }: AppProps) {
	return (
		<main id='main'>
			<Component {...pageProps} />
		</main>
	);
}
