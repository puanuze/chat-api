import { config } from 'dotenv'

config()

// Server Config
export const PORT = process.env.PORT || 5000
export const NODE_ENV = process.env.NODE_ENV || 'development'
export const APP_ENV = process.env.APP_ENV || NODE_ENV
export const JWT_SECRET = process.env.JWT_SECRET || ''

// Database Config
export const DB_HOST = process.env.DB_HOST || 'localhost'
export const DB_USERNAME = process.env.DB_USERNAME || ''
export const DB_PASSWORD = process.env.DB_PASSWORD || ''
export const DB_NAME = process.env.DB_NAME || ''
