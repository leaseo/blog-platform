export function errorMiddleware (error, request, response, next) {
  const status = error.status || 500
  const message = error.message || 'Something went wrong'
  const detail = error.detail || {}

  response
    .status(status)
    .send({
      detail,
      message,
      status
    })
}
