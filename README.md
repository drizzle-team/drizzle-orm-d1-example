Example project for [Drizzle ORM D1 SQLite package](https://github.com/drizzle-team/drizzle-orm/tree/main/drizzle-orm-sqlite)  
Subscribe to our updates on [Twitter](https://twitter.com/_alexblokh)!

## Initial project setup
### create wrangler.toml file
```toml
name = {{YOU PROJECT NAME}}
main = "src/index.ts"
compatibility_date = "2022-11-07"
node_compat = true

[[ d1_databases ]]
binding = "DB"
database_name = {{YOU DB NAME}}
database_id = {{YOUR DB ID}}
```

Init local database and run server locally
```bash
wrangler d1 execute <DATABASE_NAME> --local --file=./drizzle/20221126113135/migration.sql
wrangler dev --local --persist
```
To automatically generate migration .sql files, when src/schema.ts chages
```bash
npm run generate
```
To publish and run migrations to the D1 in the cloud - please refer to [official docs](https://developers.cloudflare.com/d1/)