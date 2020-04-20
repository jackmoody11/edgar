class EDGARQueryError extends Error {
    constructor(m: string) {
        super(m);
        Object.setPrototypeOf(this, EDGARQueryError.prototype);
    }
}