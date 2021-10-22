import React, { useState, useEffect } from 'react';
import usePrevious from './hooks/usePrevious';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Footer from './components/Footer';

function App() {
	const [page, setPage] = useState<String | undefined>('home');
	const [postId, setPostId] = useState(0);
	const [user, setUser] = useState(null);
	const previousPage = usePrevious(page);

	useEffect(() => {
		const storagedUser = localStorage.getItem('user');

		if (storagedUser) {
			setUser(JSON.parse(storagedUser));
		}
	}, []);

	const handleToHome = () => {
		setPage('home');
	};

	const handlePreviousPage = () => {
		setPage(previousPage);
	};

	const handleToDetail = (postId: number) => {
		setPage('detail');
		setPostId(postId);
	};

	const handleLoggedUser = (loggedUser: any) => {
		setUser(loggedUser);
	};

	return (
		<div className="App">
			<Navbar
				toHome={handleToHome}
				previousPage={handlePreviousPage}
				onLoggedUser={handleLoggedUser}
				user={user}
			/>

			{page === 'home' && <Home toDetail={handleToDetail} />}

			{page === 'detail' && <Detail postId={postId} user={user} />}

			<Footer />
		</div>
	);
}

export default App;
