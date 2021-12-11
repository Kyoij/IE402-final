import { Menu, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { useUser } from 'contexts/UserContext';
import supabase from 'libs/supabase';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment } from 'react';

const Header = () => {
	const router = useRouter();
	const { user } = useUser();
	return (
		<nav className="bg-gray-800">
			<div className="container mx-auto px-3">
				<div className="relative flex items-center justify-between h-16">
					<div className="flex-1 flex items-stretch justify-start">
						<div className="block">
							<div className="flex space-x-4">
								<Link href="/">
									<a
										className={clsx(
											{ 'bg-gray-900': router.pathname == '/' },
											'text-white px-3 py-2 rounded-md text-sm font-medium'
										)}
										aria-current="page"
									>
										Home
									</a>
								</Link>
								{!!user && (
									<Link href="/admin">
										<a
											className={clsx(
												{ 'bg-gray-900': router.pathname == '/admin' },
												'text-white px-3 py-2 rounded-md text-sm font-medium'
											)}
											aria-current="page"
										>
											Dashboard
										</a>
									</Link>
								)}
							</div>
						</div>
					</div>
					<div className="ml-3 relative">
						<div>
							{user ? (
								<Menu as="div" className="relative text-left">
									<div>
										<Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
											<span className="sr-only">Open user menu</span>
											<Image src="/user.png" width={36} height={36} alt="user" />
										</Menu.Button>
									</div>
									<Transition
										as={Fragment}
										enter="transition ease-out duration-100"
										enterFrom="transform opacity-0 scale-95"
										enterTo="transform opacity-100 scale-100"
										leave="transition ease-in duration-75"
										leaveFrom="transform opacity-100 scale-100"
										leaveTo="transform opacity-0 scale-95"
									>
										<Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
											<div className="px-1 py-1 ">
												<Menu.Item>
													{({ active }) => (
														<Link href="/change_password">
															<a
																className={`${
																	active ? 'bg-gray-500 text-white' : 'text-gray-900'
																} group flex rounded-md items-center w-full px-2 py-2 text-sm`}
															>
																Change Password
															</a>
														</Link>
													)}
												</Menu.Item>
											</div>
											<div className="px-1 py-1">
												<Menu.Item>
													{({ active }) => (
														<button
															className={`${
																active ? 'bg-gray-500 text-white' : 'text-gray-900'
															} group flex rounded-md items-center w-full px-2 py-2 text-sm`}
															onClick={() => {
																supabase.auth.signOut();
															}}
														>
															Sign Out
														</button>
													)}
												</Menu.Item>
											</div>
										</Menu.Items>
									</Transition>
								</Menu>
							) : (
								<Link href="/signin">
									<a
										className={clsx(
											{ 'bg-gray-900': router.pathname == '/signin' },
											'text-white px-3 py-2 rounded-md text-sm font-medium'
										)}
										aria-current="page"
									>
										Sign In
									</a>
								</Link>
							)}
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Header;
function EditInactiveIcon(props: any) {
	return (
		<svg {...props} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M4 13V16H7L16 7L13 4L4 13Z" fill="#EDE9FE" stroke="#A78BFA" strokeWidth="2" />
		</svg>
	);
}

function EditActiveIcon(props: any) {
	return (
		<svg {...props} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M4 13V16H7L16 7L13 4L4 13Z" fill="#8B5CF6" stroke="#C4B5FD" strokeWidth="2" />
		</svg>
	);
}

function DuplicateInactiveIcon(props: any) {
	return (
		<svg {...props} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M4 4H12V12H4V4Z" fill="#EDE9FE" stroke="#A78BFA" strokeWidth="2" />
			<path d="M8 8H16V16H8V8Z" fill="#EDE9FE" stroke="#A78BFA" strokeWidth="2" />
		</svg>
	);
}

function DuplicateActiveIcon(props: any) {
	return (
		<svg {...props} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M4 4H12V12H4V4Z" fill="#8B5CF6" stroke="#C4B5FD" strokeWidth="2" />
			<path d="M8 8H16V16H8V8Z" fill="#8B5CF6" stroke="#C4B5FD" strokeWidth="2" />
		</svg>
	);
}

function ArchiveInactiveIcon(props: any) {
	return (
		<svg {...props} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect x="5" y="8" width="10" height="8" fill="#EDE9FE" stroke="#A78BFA" strokeWidth="2" />
			<rect x="4" y="4" width="12" height="4" fill="#EDE9FE" stroke="#A78BFA" strokeWidth="2" />
			<path d="M8 12H12" stroke="#A78BFA" strokeWidth="2" />
		</svg>
	);
}

function ArchiveActiveIcon(props: any) {
	return (
		<svg {...props} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect x="5" y="8" width="10" height="8" fill="#8B5CF6" stroke="#C4B5FD" strokeWidth="2" />
			<rect x="4" y="4" width="12" height="4" fill="#8B5CF6" stroke="#C4B5FD" strokeWidth="2" />
			<path d="M8 12H12" stroke="#A78BFA" strokeWidth="2" />
		</svg>
	);
}

function MoveInactiveIcon(props: any) {
	return (
		<svg {...props} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M10 4H16V10" stroke="#A78BFA" strokeWidth="2" />
			<path d="M16 4L8 12" stroke="#A78BFA" strokeWidth="2" />
			<path d="M8 6H4V16H14V12" stroke="#A78BFA" strokeWidth="2" />
		</svg>
	);
}

function MoveActiveIcon(props: any) {
	return (
		<svg {...props} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M10 4H16V10" stroke="#C4B5FD" strokeWidth="2" />
			<path d="M16 4L8 12" stroke="#C4B5FD" strokeWidth="2" />
			<path d="M8 6H4V16H14V12" stroke="#C4B5FD" strokeWidth="2" />
		</svg>
	);
}

function DeleteInactiveIcon(props: any) {
	return (
		<svg {...props} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect x="5" y="6" width="10" height="10" fill="#EDE9FE" stroke="#A78BFA" strokeWidth="2" />
			<path d="M3 6H17" stroke="#A78BFA" strokeWidth="2" />
			<path d="M8 6V4H12V6" stroke="#A78BFA" strokeWidth="2" />
		</svg>
	);
}

function DeleteActiveIcon(props: any) {
	return (
		<svg {...props} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect x="5" y="6" width="10" height="10" fill="#8B5CF6" stroke="#C4B5FD" strokeWidth="2" />
			<path d="M3 6H17" stroke="#C4B5FD" strokeWidth="2" />
			<path d="M8 6V4H12V6" stroke="#C4B5FD" strokeWidth="2" />
		</svg>
	);
}
