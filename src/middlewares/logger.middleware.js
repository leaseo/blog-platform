export function consoleLogger (req, res, next) {
  console.log(`${req.method} ${req.path}`)
  next()
}
