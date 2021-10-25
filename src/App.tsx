import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import useLocalStorage from './hooks/useLocalStorage';
import { paths } from './common/enums';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Search from './pages/Search';
import PrivateRoute from './components/PrivateRoute';
import Profile from './pages/Profile';
import Footer from './components/Footer';

export default function App() {
	const [user, setUser] = useLocalStorage('user', '');

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

				<Route exact path={`${paths.game}:postId`}>
					<Detail user={user} />
				</Route>

				<Route exact path={`${paths.search}:searchedTerm`}>
					<Search />
				</Route>

				<PrivateRoute exact path={`${paths.profile}:userId`} user={user}>
					<Profile />
				</PrivateRoute>

				<Redirect to={{ pathname: '/' }} />
			</Switch>

			<Footer />
		</BrowserRouter>
	);
}
