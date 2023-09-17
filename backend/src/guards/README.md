# Guards

A collection of custom request guards for making common tasks easier in Rocket.

## DBGuard

- Custom request guard for the Rocket web framework that provides access to a database connection pool using `sqlx::PgPool`.
- Allows for easy and efficient database access within Rocket request handlers.
- Example:

```rust
#[get("/endpoint")]
async fn handler(db: DbGuard<'_>) -> String {
    // Use `db.pool` to interact with the database
    ...
}
```
