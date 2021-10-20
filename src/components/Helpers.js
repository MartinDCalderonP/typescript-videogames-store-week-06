export const formatDate = (dateString) => {
	const insertedDate = new Date(dateString);
	const nowDate = Date.now();
	const timeDifference = Math.abs(nowDate - insertedDate);

	const differences = {
		minutes: Math.ceil(timeDifference / (1000 * 60)),
		hours: Math.ceil(timeDifference / (1000 * 60 * 60)),
		days: Math.ceil(timeDifference / (1000 * 60 * 60 * 24)),
		months: Math.ceil(timeDifference / (1000 * 60 * 60 * 24 * 30)),
	};

	return differences['minutes'] < 61
		? `${differences['minutes']} minutes ago`
		: differences['hours'] < 25
		? `${differences['hours']} hours ago`
		: differences['days'] < 32
		? `${differences['days']} days ago`
		: `${differences['months']} months ago`;
};

export const getNamesFromArray = (array) => {
	return array?.map((item) => item.name).join(', ');
};
