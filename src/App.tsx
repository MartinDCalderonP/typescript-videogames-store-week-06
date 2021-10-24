import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import useLocalStorage from './hooks/useLocalStorage';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Search from './pages/Search';
import Footer from './components/Footer';

export default function App() {
	const [user, setUser] = useLocalStorage<string>('user', '');

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

				<Route exact path="/search=:searchedTerm">
					<Search />
				</Route>

				<Redirect to={{ pathname: '/' }} />
			</Switch>

			<Footer />
		</BrowserRouter>
	);
}
