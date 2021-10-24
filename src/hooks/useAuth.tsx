import { useState, useEffect } from 'react';
import { IFormData } from '../common/types';

export default function useAuth(formData: IFormData) {
	const [user, setUser] = useState('');
	const [message, setMessage] = useState('');
	const fetchUrl = `https://trainee-gamerbox.herokuapp.com/auth/local`;

	useEffect(() => {
		const signIn = async () => {
			if (formData.identifier) {
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
						}
					})
					.catch((err) => setMessage(err));
			}
		};

		signIn();
	}, [formData, fetchUrl]);

	return { user, message };
}
