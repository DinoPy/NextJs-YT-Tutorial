import Head from 'next/head';
import Header from '../components/Header.tsx';
import Footer from '../components/Footer.tsx';
import '../styles/globals.css';
import '../styles/layout.css';

// the component we receive is each component that is rendered actively on the page
// if the component we receive has the property getLayout we will be able to return the
// component function faster with a different output.
function MyApp({ Component, pageProps }) {
	if (Component.getLayout) {
		return Component.getLayout(<Component {...pageProps} />);
	}

	return (
		<>
			<Head>
				<title> My app </title>
				<meta name='viewport' content='initial-scale=1.0, width=device-width' />
				<meta name='description' content=' Next JS YT tutorial ' />
			</Head>
			<Header />
			<Component {...pageProps} />
			<Footer />
		</>
	);
}

export default MyApp;
