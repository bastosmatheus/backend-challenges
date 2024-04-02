class NotFoundError extends Error {
  constructor(
    public readonly message: string,
    public readonly type = "Not Found",
    public readonly statusCode = 404
  ) {
    super(message);
  }
}

export { NotFoundError };
