import type { Message, MessageResponse } from '@/shared/types'
import pool from './pool'

const selectByUserId = async (userId: number): Promise<Message[]> => {
  const { rows } = await pool.query<Message>(
    'SELECT * FROM messages WHERE user_id = $1',
    [userId]
  )

  return rows
}

const selectById = async (id: number): Promise<Message | undefined> => {
  const { rows } = await pool.query<Message>(
    'SELECT * FROM messages WHERE id = $1',
    [id]
  )

  return rows[0]
}

const selectAll = async (limit?: number): Promise<Message[]> => {
  let sqlQuery = 'SELECT * FROM messages'

  if (limit) {
    sqlQuery += ` LIMIT ${limit}`
  }

  const { rows } = await pool.query<Message>(sqlQuery)

  return rows
}

const selectJoinUsersTable = async (
  limit: number = 0
): Promise<MessageResponse[]> => {
  let sqlQuery = `
SELECT
  messages.id, messages.user_id, users.username, users.name, messages.message, messages.create_time
FROM messages
JOIN users ON messages.user_id = users.id
ORDER BY messages.create_time DESC`

  if (limit) {
    sqlQuery += ` LIMIT ${limit}`
  }

  const { rows } = await pool.query<MessageResponse>(sqlQuery)

  return rows
}

const selectByIdJoinUsersTable = async (
  id: number
): Promise<MessageResponse | undefined> => {
  const sqlQuery = `
SELECT
  messages.id, messages.user_id, users.username, users.name, messages.message, messages.create_time
FROM messages
JOIN users ON messages.user_id = users.id
WHERE messages.id = $1`

  const { rows } = await pool.query<MessageResponse>(sqlQuery, [id])

  return rows[0]
}

const selectByUserIdJoinUsersTable = async (
  id: number
): Promise<MessageResponse | undefined> => {
  const sqlQuery = `
SELECT
  messages.id, messages.user_id, users.username, users.name, messages.message, messages.create_time
FROM messages
JOIN users ON messages.user_id = users.id
WHERE messages.user_id = $1`

  const { rows } = await pool.query<MessageResponse>(sqlQuery, [id])

  return rows[0]
}

const insert = async ({
  message,
  user_id
}: Omit<Message, 'id' | 'create_time'>): Promise<Message> => {
  const { rows } = await pool.query<Message>(
    'INSERT INTO messages (message, user_id) VALUES ($1, $2) RETURNING *;',
    [message, user_id]
  )

  return rows[0]
}

const deleteById = async (id: number): Promise<Message | undefined> => {
  const { rows } = await pool.query<Message>(
    'DELETE FROM messages WHERE id = $1 RETURNING *',
    [id]
  )

  return rows[0]
}

const Messages = {
  selectByUserId,
  selectById,
  selectAll,
  selectJoinUsersTable,
  selectByIdJoinUsersTable,
  selectByUserIdJoinUsersTable,
  insert,
  deleteById
}

export default Messages
