import 'styles/globals.css';
import type { AppProps } from 'next/app';
import { setDefaultOptions } from 'esri-loader';
import Layout from 'components/Layout';
import { SWRConfig } from 'swr';

setDefaultOptions({ css: true });

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<SWRConfig value={{ provider: () => new Map() }}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</SWRConfig>
	);
}

export default MyApp;
