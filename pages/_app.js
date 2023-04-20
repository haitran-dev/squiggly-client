import React from 'react';
import 'styles/normalize.css';
import 'styles/global.css';
import localFont from 'next/font/local';
import PropTypes from 'prop-types';

const kalam = localFont({
    src: [
        {
            path: '../public/fonts/Kalam-Light.ttf',
            weight: '300',
            style: 'normal',
        },
        {
            path: '../public/fonts/Kalam-Regular.ttf',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../public/fonts/Kalam-Bold.ttf',
            weight: '700',
            style: 'normal',
        },
    ],
});

export default function App({ Component, pageProps }) {
    return (
        <main className={kalam.className}>
            <Component {...pageProps} />
        </main>
    );
}

App.propTypes = {
    Component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
    pageProps: PropTypes.object,
};
