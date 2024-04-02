class ConflictError extends Error {
  constructor(
    public readonly message: string,
    public readonly type = "Conflict",
    public readonly statusCode = 409
  ) {
    super(message);
  }
}

export { ConflictError };
