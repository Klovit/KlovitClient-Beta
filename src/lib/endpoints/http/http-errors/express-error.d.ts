export default class ExpressError extends Error {
    code: number;
    constructor(message: string, code?: number);
}
