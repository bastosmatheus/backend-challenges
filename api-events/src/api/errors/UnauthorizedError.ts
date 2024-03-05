class UnauthorizedError extends Error {
  public message: string;
  public type: string;
  public statusCode: number;

  constructor(message: string) {
    super(message);

    this.message = message;
    this.type = "Unauthorized";
    this.statusCode = 401;
  }
}

export { UnauthorizedError };
