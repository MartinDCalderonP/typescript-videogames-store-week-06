import React, { useReducer } from 'react';
import styles from '../styles/SearchInput.module.scss';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const initialState = {
	term: '',
};

interface actionTypes {
	type: 'SET_SEARCH_TERM';
	term: string;
}

const reducer = (state: typeof initialState, action: actionTypes) => {
	switch (action.type) {
		case 'SET_SEARCH_TERM':
			return {
				...state,
				term: action.term,
			};

		default:
			return state;
	}
};

export default function Search() {
	const [searchedTerm, dispatch] = useReducer(reducer, initialState);
	const history = useHistory();

	const handleSearchedTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch({
			type: 'SET_SEARCH_TERM',
			term: e.target.value,
		});
	};

	const handleSearchButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		if (searchedTerm.term !== '') {
			history.push(`/search=${searchedTerm.term.replace(' ', '+')}`);
		}
	};

	return (
		<form className={styles.searchForm}>
			<div className={styles.searchInput}>
				<input
					value={searchedTerm.term}
					onChange={handleSearchedTermChange}
					type="text"
					name="search"
					placeholder="Search"
				/>

				<button
					className={styles.searchButton}
					onClick={handleSearchButtonClick}
				>
					<FontAwesomeIcon icon={faSearch} />
				</button>
			</div>
		</form>
	);
}
