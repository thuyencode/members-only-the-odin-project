import * as v from 'valibot'

const StringToNumberSchema = v.pipe(
  v.string(),
  v.nonEmpty(),
  v.transform((input) => Number(input)),
  v.number()
)
const NonEmptyStringSchema = v.pipe(v.string(), v.nonEmpty())

const EnvSchema = v.object({
  PORT: StringToNumberSchema,
  PGHOST: NonEmptyStringSchema,
  PGPORT: NonEmptyStringSchema,
  PGUSER: NonEmptyStringSchema,
  PGPASSWORD: NonEmptyStringSchema,
  PGDATABASE: NonEmptyStringSchema,
  POSTGRESQL_CONNECTION_URL: NonEmptyStringSchema
})

export default EnvSchema
