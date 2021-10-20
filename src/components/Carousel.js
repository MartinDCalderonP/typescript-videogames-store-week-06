import React, { useEffect, useState } from 'react';
import styles from '../styles/Carousel.module.scss';
import useFetch from '../hooks/useFetch';
import Spinner from './Spinner';
import Chevron from './Chevron';

export default function Carousel({ toDetail }) {
	const fetchUrl = `https://trainee-gamerbox.herokuapp.com/games?_start=1&_limit=4`;
	const { data, loading } = useFetch(fetchUrl);
	const [currentSlide, setCurrentSlide] = useState(0);

	useEffect(() => {
		let interval;

		if (data?.length > 0) {
			interval = setInterval(() => {
				setCurrentSlide((current) =>
					current === data?.length - 1 ? 0 : current + 1
				);
			}, 5000);
		}

		return () => {
			clearInterval(interval);
		};
	}, [data?.length]);

	const handleCarouselItemClick = (postId) => {
		toDetail(postId);
	};

	const handlePreviousClick = () => {
		setCurrentSlide((current) =>
			current === 0 ? data?.length - 1 : current - 1
		);
	};

	const handleNextClick = () => {
		setCurrentSlide((current) =>
			current === data?.length - 1 ? 0 : current + 1
		);
	};

	const handleDotClick = (carouselStep) => {
		setCurrentSlide(carouselStep);
	};

	return (
		<>
			{loading && <Spinner />}

			{!loading && data && (
				<div className={styles.carousel}>
					<Chevron
						className={styles.previous}
						onClick={handlePreviousClick}
						orientation="left"
					/>

					<div
						className={`${styles.carouselItem} ${styles.fade}`}
						onClick={() => handleCarouselItemClick(data[currentSlide]?.id)}
					>
						<h1>{data[currentSlide]?.name}</h1>

						<div className={styles.triangle}></div>
						<h2>Top Rated </h2>

						<img
							src={data[currentSlide]?.cover_art?.url}
							alt={data[currentSlide]?.name}
						/>
					</div>

					<Chevron
						className={styles.next}
						onClick={handleNextClick}
						orientation="right"
					/>

					<div className={styles.dotsContainer}>
						{data?.map((item, i) => (
							<span
								className={
									styles.dot + (currentSlide === i ? ` ${styles.active}` : '')
								}
								key={`dot${i}`}
								onClick={() => handleDotClick(i)}
							/>
						))}
					</div>
				</div>
			)}
		</>
	);
}
