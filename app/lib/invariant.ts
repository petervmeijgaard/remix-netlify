export class InvariantError extends Error {
	constructor(message: string) {
		super(message);
		Object.setPrototypeOf(this, InvariantError.prototype);
	}
}

export function invariant(
	condition: unknown,
	messageOrResponse: string | Response,
): asserts condition {
	if (condition) return;

	if (typeof messageOrResponse === "string") {
		throw new InvariantError(messageOrResponse);
	}

	throw messageOrResponse;
}
