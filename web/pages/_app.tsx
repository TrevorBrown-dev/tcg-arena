import { CardPreviewContextLayout } from 'components/Card/CardPreview';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { Provider } from 'urql';
import { GlobalStyle } from '../styles/sc/GlobalStyle';
// import '../styles/globals.css';
import { ssrCache, urqlClient } from '../utils/createURQLClient';
//create a function that will turn a cookie string into a json object
export const findCookie = (name: string, cookie: string) => {
    return cookie?.split(';').find((c) => c.trim().startsWith(`${name}=`));
};

function MyApp({ Component, pageProps, ...rest }: AppProps) {
    if (pageProps.urqlState) {
        ssrCache.restoreData(pageProps.urqlState);
        pageProps.urqlState;
    }

    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width,initial-scale=1.0"
                />
                <title>TCG Arena</title>
            </Head>
            <Provider value={urqlClient}>
                <GlobalStyle />
                <CardPreviewContextLayout>
                    <Component {...pageProps} />
                </CardPreviewContextLayout>
            </Provider>
        </>
    );
}

export default MyApp;
