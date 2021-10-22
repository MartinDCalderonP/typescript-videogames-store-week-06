import { MouseEventHandler } from 'react';

export interface IButton {
	className?: string;
	onClick: MouseEventHandler;
	children: React.ReactNode;
}

export interface ICard {
	name: string;
	image: string;
	onClick: MouseEventHandler;
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
	loading: boolean;
	posts: Array<IPost>;
	toDetail: (toDetail: number) => void;
}

export interface ICarousel {
	toDetail: (toDetail: number) => void;
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
	toHome: (toHome: boolean) => void;
	previousPage: (previousPage: boolean) => void;
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
	postId: number;
	user: any;
}

export interface IHome {
	toDetail: (toDetail: number) => void;
}