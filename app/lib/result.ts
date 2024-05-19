export type Success<T> = {
	success: true;
	data: T;
};

export type Error<T> = {
	success: false;
	error: T;
};

export function success<T>(data: T): Success<T> {
	return {
		success: true,
		data,
	};
}

export function error<E>(error: E): Error<E> {
	return {
		success: false,
		error,
	};
}
