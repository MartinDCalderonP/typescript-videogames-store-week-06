import React, { useState, useReducer, memo } from 'react';
import styles from '../styles/SearchInput.module.scss';
import { useHistory } from 'react-router-dom';
import { paths } from '../common/enums';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import SuggestionsList from './SuggestionsList';

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

export default memo(function Search() {
	const [searchedTerm, dispatch] = useReducer(reducer, initialState);
	const [openSuggestions, setOpenSuggestions] = useState(false);
	const [pressedKey, setPressedKey] = useState(0);
	const history = useHistory();

	const handleSearchedTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch({
			type: 'SET_SEARCH_TERM',
			term: e.target.value,
		});

		setOpenSuggestions(true);
	};

	const searchTerm = (term: string) => {
		history.push(`${paths.search}${term.replaceAll(' ', '+')}`);
	};

	const handleSearchButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		if (searchedTerm.term !== '') {
			searchTerm(searchedTerm.term);
		}
	};

	const handleSuggestionSelected = (suggestionSelected: string) => {
		dispatch({
			type: 'SET_SEARCH_TERM',
			term: suggestionSelected,
		});

		searchTerm(suggestionSelected);
	};

	const handleCloseSuggestions = () => {
		setOpenSuggestions(false);
	};

	const handleKeyNavigation = (e: any) => {
		setPressedKey(e);
	};

	return (
		<form className={styles.searchForm} autoComplete="off">
			<div className={styles.searchInput}>
				<input
					value={searchedTerm.term}
					onChange={handleSearchedTermChange}
					onKeyDown={handleKeyNavigation}
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

			{openSuggestions && (
				<SuggestionsList
					searchedTerm={searchedTerm.term}
					suggestionSelected={handleSuggestionSelected}
					closeSuggestions={handleCloseSuggestions}
					pressedKey={pressedKey}
				/>
			)}
		</form>
	);
});
