use rocket_db_pools::sqlx;
use rocket_db_pools::{sqlx::postgres::PgPoolOptions, Database};
use rocket::tokio;

#[derive(Database)]
#[database("wol-api")]
struct WolApiDb(sqlx::PgPool);

struct Verse {
    book_num: i32,
    book_name: String,
    chapter: i32,
    verse_num: i32,
    verse_text: String,
}

#[tokio::main]
async fn main() -> Result<(), sqlx::Error> {
    // 1) Create a connection pool
    let pool = PgPoolOptions::new()
        .connect("postgresql://postgres:postgres@localhost:5432/postgres")
        .await?;

    create_verse_table(&pool).await?;
    let verse: Verse = Verse {
        book_num: 1,
        book_name: String::from("Genesis"),
        chapter: 1,
        verse_num: 1,
        verse_text: String::from("In the beginning God created the heavens and the earth."),
    };
    insert_verse_into_table(&verse, &pool).await?;

    return Ok(());
}

async fn create_verse_table(pool: &sqlx::PgPool) -> Result<(), sqlx::Error> {
    sqlx::query(
        "CREATE TABLE IF NOT EXISTS verses (
            verse_id SERIAL PRIMARY KEY,
            book_num INTEGER NOT NULL,
            book_name TEXT NOT NULL,
            chapter INTEGER NOT NULL,
            verse_num INTEGER NOT NULL,
            verse_text TEXT NOT NULL
        );",
    )
    .execute(pool)
    .await?;

    return Ok(());
}

async fn insert_verse_into_table(verse: &Verse, pool: &sqlx::PgPool) -> Result<(), sqlx::Error> {
    sqlx::query(
        r#"INSERT INTO verses
        (book_num, book_name, chapter, verse_num, verse_text)
        VALUES ($1, $2, $3, $4, $5)"#
    )
        .bind(verse.book_num)
        .bind(verse.book_name.clone())
        .bind(verse.chapter)
        .bind(verse.verse_num)
        .bind(verse.verse_text.clone())
        .execute(pool)
        .await?;

    return Ok(());
}


