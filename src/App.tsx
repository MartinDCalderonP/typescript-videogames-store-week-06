import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Footer from './components/Footer';

export default function App() {
	const [user, setUser] = useState('');

	useEffect(() => {
		const storagedUser = localStorage.getItem('user');

		if (storagedUser) {
			setUser(JSON.parse(storagedUser));
		}
	}, []);

	const handleLoggedUser = (loggedUser: any) => {
		setUser(loggedUser);
	};

	return (
		<BrowserRouter>
			<Navbar onLoggedUser={handleLoggedUser} user={user} />

			<Switch>
				<Route exact path="/">
					<Home />
				</Route>

				<Route exact path="/game/:postId">
					<Detail user={user} />
				</Route>
			</Switch>

			<Footer />
		</BrowserRouter>
	);
}
