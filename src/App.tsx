import React, { useState, useEffect } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Footer from './components/Footer';

export default function App() {
	const [page, setPage] = useState<String | undefined>('home');
	const [postId, setPostId] = useState(0);
	const [user, setUser] = useState('');

	useEffect(() => {
		const storagedUser = localStorage.getItem('user');

		if (storagedUser) {
			setUser(JSON.parse(storagedUser));
		}
	}, []);

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
