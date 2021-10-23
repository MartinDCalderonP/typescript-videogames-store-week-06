import React, { useState, useEffect } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';
import usePrevious from './hooks/usePrevious';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Footer from './components/Footer';

export default function App() {
	const [page, setPage] = useState<String | undefined>('home');
	const [postId, setPostId] = useState(0);
	const [user, setUser] = useState('');
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
		<Router>
			<Navbar
				previousPage={handlePreviousPage}
				onLoggedUser={handleLoggedUser}
				user={user}
			/>

			<Switch>
				<Route exact path="/">
					<Home toDetail={handleToDetail} />
				</Route>

				<Route exact path="/game/:postId">
					<Detail user={user} />
				</Route>
			</Switch>

			<Footer />
		</Router>
	);
}
