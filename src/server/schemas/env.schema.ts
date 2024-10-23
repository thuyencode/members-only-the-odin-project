import * as v from 'valibot'

const StringToNumberSchema = v.pipe(
  v.string(),
  v.nonEmpty(),
  v.transform((input) => Number(input)),
  v.number()
)
const NonEmptyStringSchema = v.pipe(v.string(), v.nonEmpty())

const SecretKeySchema = v.pipe(NonEmptyStringSchema, v.minLength(15))

const EnvSchema = v.object({
  PORT: StringToNumberSchema,
  REFRESH_TOKEN_SECRET: SecretKeySchema,
  ACCESS_TOKEN_SECRET: SecretKeySchema,
  COOKIE_SECRET: v.pipe(NonEmptyStringSchema, v.minLength(15)),
  PGHOST: NonEmptyStringSchema,
  PGPORT: NonEmptyStringSchema,
  PGUSER: NonEmptyStringSchema,
  PGPASSWORD: NonEmptyStringSchema,
  PGDATABASE: NonEmptyStringSchema,
  POSTGRESQL_CONNECTION_URL: NonEmptyStringSchema
})

export default EnvSchema
