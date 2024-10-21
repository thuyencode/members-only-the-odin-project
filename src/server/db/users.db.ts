import type { User } from '@/shared/types'
import pool from './pool'

const selectByUsername = async (
  username: string
): Promise<User | undefined> => {
  const { rows } = await pool.query<User>(
    'SELECT * FROM users WHERE username = $1',
    [username]
  )

  return rows[0]
}

const selectById = async (id: number): Promise<User | undefined> => {
  const { rows } = await pool.query<User>('SELECT * FROM users WHERE id = $1', [
    id
  ])

  return rows[0]
}

const insert = async ({
  name,
  username,
  salted_hash
}: Omit<User, 'id'>): Promise<User> => {
  const { rows } = await pool.query<User>(
    'INSERT INTO users (name, username, salted_hash) VALUES ($1::text, $2::text, $3::text) RETURNING *;',
    [name, username, salted_hash]
  )

  return rows[0]
}

const Users = {
  selectByUsername,
  selectById,
  insert
}

export default Users
