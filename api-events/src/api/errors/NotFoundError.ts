class NotFoundError extends Error {
  public message: string;
  public type: string;
  public statusCode: number;

  constructor(message: string) {
    super(message);

    this.message = message;
    this.type = "Not Found";
    this.statusCode = 404;
  }
}

export { NotFoundError };
