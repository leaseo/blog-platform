export class HttpServerException extends Error {
  constructor (message, detail) {
    super(message)
    this.status = 500
    this.message = message
    this.detail = detail
  }
}

export class HttpClientException extends Error {
  constructor (message, detail) {
    super(message)
    this.status = 400
    this.message = message
    this.detail = detail
  }
}

export class HttpUnauthorizedException extends Error {
  constructor (message, detail) {
    super(message)
    this.status = 401
    this.message = message
    this.detail = detail
  }
}

export class HttpForbiddenException extends Error {
  constructor (message, detail) {
    super(message)
    this.status = 403
    this.message = message
    this.detail = detail
  }
}
