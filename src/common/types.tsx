import { MouseEventHandler, ReactNode } from 'react';

export interface IButton {
	className?: string;
	onClick: MouseEventHandler;
	children: ReactNode;
}

export interface ICard {
	id: number;
	name: string;
	image: string;
}

interface IPost {
	id: number;
	name: string;
	cover_art: {
		formats: {
			small: {
				url: string;
			};
		};
	};
	onClick: MouseEventHandler;
}

export interface ICardsContainer {
	className?: string;
	loading: boolean;
	posts: Array<IPost>;
}

export interface IChevron {
	className: string;
	onClick: MouseEventHandler;
	orientation: string;
}
export interface ICloseIcon {
	className: string;
	onClick: MouseEventHandler;
}

export interface ICommentBox {
	postId: number;
	user: any;
	updateFetchData: (updateFetchData: boolean) => void;
}

export interface ICommentsList {
	postId: number;
	updateFetchData: number;
}

export interface IComment {
	id: number;
	user: {
		firstName: string;
		lastName: string;
	};
	created_at: string;
	body: string;
}

export interface IProperty {
	name: string;
}

export interface IModal {
	closeModal: (closeModal: boolean) => void;
	loggedUser: (loggedUser: any) => void;
}

export interface INavbar {
	onLoggedUser: (onLoggedUser: any) => void;
	user: any;
}

export interface IPaginationButtons {
	totalPosts?: number;
	postsPerPage: number;
	paginate: (paginate: number) => void;
}

export interface IToast {
	children: ReactNode;
	closeToast: (closeToast: boolean) => void;
}

export interface IFormData {
	identifier: string;
	password: string;
}

export interface IUseFetch<T> {
	data: any;
	loading: boolean;
	fetchData: () => void;
}

export interface IDetail {
	user: any;
}

export interface IPostId {
	postId: string;
}

export interface ISearchedTerm {
	searchedTerm: string;
}

export interface ISuggestionsList {
	searchedTerm: string;
	suggestionSelected: (suggestionSelected: string) => void;
	closeSuggestions: (closeSuggestions: boolean) => void;
	pressedKey: any;
}
