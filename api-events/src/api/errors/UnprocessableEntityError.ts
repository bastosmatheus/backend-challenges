class UnprocessableEntityError extends Error {
  public message: string;
  public type: string;
  public statusCode: number;

  constructor(message: string) {
    super(message);

    this.message = message;
    this.type = "Unprocessable Entity";
    this.statusCode = 422;
  }
}

export { UnprocessableEntityError };
