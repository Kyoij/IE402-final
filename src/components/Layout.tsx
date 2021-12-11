import supabase from 'libs/supabase';
import { FC, useEffect } from 'react';
import Header from './Header';

const Layout: FC = ({ children }) => {
	useEffect(() => {
		supabase.auth.onAuthStateChange((event, session) => {
			console.log(event, session);
		});
	}, []);

	return (
		<>
			<Header />
			{children}
		</>
	);
};

export default Layout;
