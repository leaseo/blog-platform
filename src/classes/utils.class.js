import { hash, compare } from 'bcrypt'
import { sign, verify } from 'jsonwebtoken'

export async function generatePasswordHash (password) {
  return hash(password, Number(process.env.HASH_SALT))
}

export async function comparePasswordHash (password, hashedPassword) {
  return compare(password, hashedPassword)
}

export async function signJwtPayload (payload) {
  const secretKey = process.env.JWT_SECRETKEY
  const expiresIn = Number(process.env.JWT_EXPIRESIN)
  return sign(payload, secretKey, { expiresIn: expiresIn })
}

export async function verifyJwtPayload (jwtToken) {
  const secretKey = process.env.JWT_SECRETKEY
  return verify(jwtToken, secretKey)
}
