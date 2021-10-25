import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function PrivateRoute({ children, user, ...rest }: any) {
	if (user) {
		return <Route {...rest}>{children}</Route>;
	} else {
		return <Redirect to={{ pathname: '/' }} />;
	}
}
