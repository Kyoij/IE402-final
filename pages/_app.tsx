import 'styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app';
import { setDefaultOptions } from 'esri-loader';
import Layout from 'components/Layout';
import { SWRConfig } from 'swr';
import { UserContextProvider } from 'contexts/UserContext';
import supabase from 'libs/supabase';
import { ToastContainer } from 'react-toastify';

setDefaultOptions({ css: true });

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<SWRConfig value={{ provider: () => new Map() }}>
				<UserContextProvider supabaseClient={supabase}>
					<Layout>
						<Component {...pageProps} />
						<ToastContainer hideProgressBar />
					</Layout>
				</UserContextProvider>
			</SWRConfig>
		</>
	);
}

export default MyApp;
