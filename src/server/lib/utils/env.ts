import * as v from 'valibot'
import EnvSchema from '../../schemas/env.schema.js'

const env = { ...process.env, ...v.parse(EnvSchema, process.env) }

export default env
