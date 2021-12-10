import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Header = () => {
	const router = useRouter();
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
							</div>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Header;
