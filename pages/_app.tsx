/* ./pages/_app.tsx */

import type { AppProps } from 'next/app'
import Head from 'next/head'

import DashboardLayout from '../views/DashboardLayout';
import '../styles/globals.css'


function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1, shrink-to-fit=no'
                />
                <title>Demo Dashboard</title>
            </Head>
            <DashboardLayout>
                <Component {...pageProps} />
            </DashboardLayout>
        </>
    );
}

export default App;
