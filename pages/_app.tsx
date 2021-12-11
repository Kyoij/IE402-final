import 'styles/globals.css';
import type { AppProps } from 'next/app';
import { setDefaultOptions } from 'esri-loader';
import Layout from 'components/Layout';
import { SWRConfig } from 'swr';
import { UserContextProvider } from 'contexts/UserContext';
import supabase from 'libs/supabase';

setDefaultOptions({ css: true });

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<SWRConfig value={{ provider: () => new Map() }}>
			<UserContextProvider supabaseClient={supabase}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</UserContextProvider>
		</SWRConfig>
	);
}

export default MyApp;
