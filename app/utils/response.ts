export enum ResponseType {
	SUCCESS = 'success',
	ERROR = 'error'
}

export const Response = {
	Success: <T>(data: T) => {
		return {
			type: ResponseType.SUCCESS,
			message: null,
			data: data
		};
	},
	Error: (message: string) => {
		return {
			type: ResponseType.ERROR,
			message: message,
			data: null
		};
	}
};
