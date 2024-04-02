class Success<F, S> {
  public readonly value: S;

  constructor(value: S) {
    this.value = value;
  }

  isSuccess(): this is Success<F, S> {
    return true;
  }

  isFailure(): this is Failure<F, S> {
    return false;
  }
}

class Failure<F, S> {
  public readonly value: F;

  constructor(value: F) {
    this.value = value;
  }

  isFailure(): this is Failure<F, S> {
    return true;
  }

  isSuccess(): this is Success<F, S> {
    return false;
  }
}

type Either<F, S> = Failure<F, S> | Success<F, S>;

function failure<F, S>(value: F): Either<F, S> {
  return new Failure<F, S>(value);
}

function success<F, S>(value: S): Either<F, S> {
  return new Success<F, S>(value);
}

export { Either, Failure, Success, failure, success };
