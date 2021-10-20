import { useState, useEffect } from 'react';

const useAuth = (formData) => {
	const [user, setUser] = useState('');
	const [message, setMessage] = useState('');
	const fetchUrl = `https://trainee-gamerbox.herokuapp.com/auth/local`;

	useEffect(() => {
		const signIn = async () => {
			if (formData) {
				fetch(fetchUrl, {
					method: 'POST',
					body: JSON.stringify(formData),
					headers: {
						'Content-Type': 'application/json',
					},
				})
					.then((res) => res.json())
					.then((result) => {
						if (result.statusCode === 400) {
							setMessage(result.message[0].messages[0].message);
						} else {
							setUser(result);
							localStorage.setItem('user', JSON.stringify(result));
						}
					})
					.catch((err) => setMessage(err));
			}
		};

		signIn();
	}, [formData, fetchUrl]);

	return { user, message };
};

export default useAuth;
