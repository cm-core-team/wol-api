// use rocket::serde::{json::Json, Serialize};
// use sqlx::postgres::{PgPool, PgPoolOptions, PgRow};
// use sqlx::{FromRow, Row};

use rocket_db_pools::sqlx;
use rocket_db_pools::sqlx::Error;
use rocket_db_pools::sqlx::Postgres;
use rocket_db_pools::{sqlx::postgres::PgPoolOptions, Database};
use tokio;

#[derive(Database)]
#[database("wol-api")]
struct WolApiDb(sqlx::PgPool);

struct Verses {
    book_num: i32,
    book_name: String,
    chapter: i32,
    verse_num: i32,
    verse_text: String,
}

async fn create_table(pool: Result<sqlx::Pool<Postgres>, Error>) {
    sqlx::query(
        "CREATE TABLE verses (
    verse_id SERIAL PRIMARY KEY,
    book_num INTEGER NOT NULL,
    book_name TEXT NOT NULL,
    chapter INTEGER NOT NULL,
    verse_num INTEGER NOT NULL,
    verse_text TEXT NOT NULL
);",
    )
    .execute(&pool.unwrap())
    .await;
}

// fn insert_verse_into_table(verse: &Verse) {
//     let row: (i64,) = sqlx::query("INSERT INTO verses (book_num, book_name, chapter, verse_num, verse_text) VALUES ($1, $2, $3, $4)", verse.book_num, verse.book_name, verse.chapter, verse.verse_num, verse.verse_text).exec;
// }

#[tokio::main]
async fn main() -> Result<(), sqlx::Error> {
    // 1) Create a connection pool
    let pool = PgPoolOptions::new()
        .max_connections(5)
        .connect("postgres://postgres:postgres@db/wol-api")
        .await;

    create_table(pool);

    Ok(())
}
