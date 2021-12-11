import React, { useEffect, useState, createContext, useContext, useRef } from 'react';
import { SupabaseClient, Session, User } from '@supabase/supabase-js';
import { useRouter } from 'next/router';

export interface AuthSession {
	user: User | null;
	session: Session | null;
	isLoading: boolean;
}

const UserContext = createContext<AuthSession>({ user: null, session: null, isLoading: true });

export interface Props {
	supabaseClient: SupabaseClient;
	[propName: string]: any;
}

export const UserContextProvider = (props: Props) => {
	const router = useRouter();
	const { supabaseClient } = props;
	const firstRender = useRef(true);
	const [session, setSession] = useState<Session | null>(null);
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		firstRender.current = false;
		const ss = supabaseClient.auth.session();
		if (ss) {
			setSession(ss);
			setUser(ss?.user);
		}
	}, []);

	useEffect(() => {
		const { data: authListener } = supabaseClient.auth.onAuthStateChange(async (event, session) => {
			setSession(session);
			setUser(session?.user ?? null);
			if (event == 'PASSWORD_RECOVERY') router.push('/change_password');
		});

		return () => {
			authListener?.unsubscribe();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const value = {
		session,
		user,
		isLoading: firstRender.current,
	};
	return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
	const context = useContext(UserContext);
	if (context === undefined) {
		throw new Error(`useUser must be used within a UserContextProvider.`);
	}
	return context;
};
