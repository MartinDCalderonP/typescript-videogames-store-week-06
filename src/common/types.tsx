import { MouseEventHandler } from 'react';

export interface IButton {
	className?: string;
	onClick: MouseEventHandler;
	children: React.ReactNode;
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
	postsPerPage: number;
	paginate: (paginate: number) => void;
}

export interface IToast {
	children: React.ReactNode;
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
