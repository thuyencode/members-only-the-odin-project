import EnvSchema from '@/server/schemas/env.schema'
import * as v from 'valibot'

const env = { ...process.env, ...v.parse(EnvSchema, process.env) }

export default env
