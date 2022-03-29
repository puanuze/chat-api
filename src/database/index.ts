import mongoose from 'mongoose'
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USERNAME } from '../config'

export async function initDatabase() {
  await mongoose.connect(`mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`)
}
