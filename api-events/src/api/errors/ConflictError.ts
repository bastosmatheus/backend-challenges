class ConflictError extends Error {
  public message: string;
  public type: string;
  public statusCode: number;

  constructor(message: string) {
    super(message);

    this.message = message;
    this.type = "Conflict";
    this.statusCode = 409;
  }
}

export { ConflictError };
