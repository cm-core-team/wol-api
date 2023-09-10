use std::collections::HashMap;

use rocket_db_pools::sqlx;
use rocket_db_pools::{sqlx::postgres::PgPoolOptions, Database};
use rocket::tokio;
use rocket::serde::{Serialize, Deserialize, json};

const VERSES_JSON_PATH: &str = "../data/verses.json";
const BIBLE_BOOKS: [&str; 66] = [
    "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy", "Joshua", "Judges",
    "Ruth", "1 Samuel", "2 Samuel", "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles",
    "Ezra", "Nehemiah", "Esther", "Job", "Psalms", "Proverbs", "Ecclesiastes",
    "Song of Solomon", "Isaiah", "Jeremiah", "Lamentations", "Ezekiel", "Daniel",
    "Hosea", "Joel", "Amos", "Obadiah", "Jonah", "Micah", "Nahum",
    "Habakkuk", "Zephaniah", "Haggai", "Zechariah", "Malachi", "Matthew", "Mark",
    "Luke", "John", "Acts", "Romans", "1 Corinthians", "2 Corinthians", "Galatians",
    "Ephesians", "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians",
    "1 Timothy", "2 Timothy", "Titus", "Philemon", "Hebrews", "James", "1 Peter",
    "2 Peter", "1 John", "2 John", "3 John", "Jude", "Revelation"
];


#[derive(Database)]
#[database("wol-api")]
struct WolApiDb(sqlx::PgPool);

struct BibleVerse {
    book_num: i32,
    book_name: String,
    chapter: i32,
    verse_num: i32,
    verse_text: String,
}

#[derive(Debug, Serialize, Deserialize)]
struct JsonBibleVerse {
    book: i32,
    chapter: i32,
    verses: HashMap<String, String>,
}

#[tokio::main]
async fn main() -> Result<(), sqlx::Error> {
    // 1) Create a connection pool
    let pool = PgPoolOptions::new()
        .connect("postgresql://postgres:postgres@localhost:5432/postgres")
        .await?;

    create_verse_table(&pool).await?;
    generate_verses_from_json(&pool).await;

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

async fn insert_verse_into_table(verse: &BibleVerse, pool: &sqlx::PgPool) -> Result<(), sqlx::Error> {
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

async fn generate_verses_from_json(pool: &sqlx::PgPool) {
    /*

    Data example:

    {
        "book": 1,
        "chapter": 1,
        "verses": {
            "1": "In the beginning God created the heavens and the earth.",
        },
        ...
     */

    let data = std::fs::read_to_string(VERSES_JSON_PATH).unwrap();
    let json_data: json::Value = json::from_str(&data).unwrap();
    let verse_list = json_data.get::<&str>("data").unwrap().clone();
    let json_verses = json::from_value::<Vec<JsonBibleVerse>>(verse_list);
    let n_verses = json_verses.as_ref().unwrap().len();

    println!("Inserting {} verses into database...", n_verses);

    for (i, json_verse) in json_verses.unwrap().iter().enumerate() {
        for verse_text in json_verse.verses.iter() {
            let verse = BibleVerse {
                book_name: BIBLE_BOOKS[i].to_string(),
                book_num: json_verse.book,
                chapter: json_verse.chapter,
                verse_num: verse_text.0.parse::<i32>().unwrap(),
                verse_text: verse_text.1.to_string(),
            };
            let insert_result = insert_verse_into_table(&verse, pool).await;
            match insert_result {
                Ok(_) => println!("Inserted verse: {} {}:{}",
                    verse.book_name, verse.chapter, verse.verse_num),
                Err(e) => println!("Error inserting verse: {}", e),
            };
        }
    }
}
