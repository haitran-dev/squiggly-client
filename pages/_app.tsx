import 'styles/global.css';
import 'styles/normalize.css';

type AppProps = {
	Component: React.ComponentType<any>;
	pageProps: object;
};

export default function App({ Component, pageProps }: AppProps) {
	return (
		<main id='main'>
			<Component {...pageProps} />
		</main>
	);
}
