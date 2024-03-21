export interface Changelog {
	version: string,
	changes: string[]
}

// form
export type InputStatus = undefined|boolean;
export type InputStatusWithProgress = InputStatus|'progress';
