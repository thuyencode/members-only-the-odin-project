import pg from 'pg'

const SQL_QUERY = `
CREATE TABLE IF NOT EXISTS
  users (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(100),
    username VARCHAR(25),
    salted_hash VARCHAR(500)
);

CREATE TABLE IF NOT EXISTS
  messages (
    id int NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    create_time DATE DEFAULT NOW(),
    message VARCHAR(255),
    user_id INT NOT NULL,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users (id)
);`

const main = async () => {
  console.log('Seeding...')

  const client = new pg.Client()

  await client.connect()
  await client.query(SQL_QUERY)
  await client.end()

  console.log('Done')
}

await main()
