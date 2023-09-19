use rocket;

use crate::{guards::db_guard::DbGuard, services};

#[rocket::get("/verse/<book>/<chapter>/<verse>")]
pub async fn get_verse(
    book: i32,
    chapter: i32,
    verse: i32,
    db: DbGuard<'_>,
) -> Result<String, String> {
    let verse = match services::verse_services::get_verse_from_table(
        book, chapter, verse, &db.pool,
    )
    .await
    {
        Ok(verse) => verse,
        Err(e) => {
            return Err("Error getting verse from database: ".to_string()
                + &e.to_string());
        }
    };

    return Ok(verse.verse_text);
}
