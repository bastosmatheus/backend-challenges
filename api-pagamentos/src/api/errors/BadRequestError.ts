class BadRequestError extends Error {
  constructor(
    public readonly message: string,
    public readonly type = "Bad Request",
    public readonly statusCode = 400
  ) {
    super(message);
  }
}

export { BadRequestError };
