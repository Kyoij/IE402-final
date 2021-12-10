import dynamic from 'next/dynamic';
const LandmarkMap = dynamic(() => import('components/LandmarkMap'), { ssr: false, loading: () => <p>loading...</p> });

const HomePage = () => {
	return <LandmarkMap />;
};

export default HomePage;
