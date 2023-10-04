use sqlx;

use crate::models::bible_verse::BibleVerse;

pub async fn get_verse_from_table(
    book: i32,
    chapter: i32,
    verse: i32,
    pool: &sqlx::PgPool,
) -> Result<BibleVerse, sqlx::Error> {
    let verse: BibleVerse = sqlx::query_as(
        "SELECT * FROM verses WHERE book_num = $1 AND chapter = $2 AND verse_num = $3",
    )
    .bind(book)
    .bind(chapter)
    .bind(verse)
    .fetch_one(pool)
    .await?;

    return Ok(verse);
}