import '../styles/globals.css';
import { useRouter } from 'next/router'

import Head from "next/head";
import Container from "../components/Container";
import Footer from "../components/Footer";
import Header from "../components/Header";

function MyApp({ Component, pageProps }) {
    const router = useRouter()
    if (router.pathname.startsWith('/chat')) {
        <Component {...pageProps} />
    } else {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="bg-white w-full min-h-screen">
                <Header />
                <Container>
                    <Component {...pageProps} />
                </Container>
                <Footer />
            </div>
            </div>
        )
    }
  }
  
  export default MyApp;