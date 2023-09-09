#[macro_use]
extern crate rocket;

use rocket::serde::{json::Json, Serialize};
// use rocket_db_pools::{sqlx, Database};

// for now
#[get("/")]
fn home() -> &'static str {
    "Hello, world!"
}

// idk rust well enough to properly refactor this
// lemme cook
#[derive(Serialize)]
#[serde(crate = "rocket::serde")]
struct BibleVerses {
    num_verses: u32,
    book: (u32, &'static str),
    chapter: u32,
    data: Vec<String>,
}

#[get("/bible-verses")]
fn bible_verses() -> Json<BibleVerses> {
    let example_bible_verses = BibleVerses {
        num_verses: 1,
        book: (1, "Genesis"),
        chapter: 1,
        data: vec![String::from(
            "In the beginning God created the heavens and the earth.",
        )],
    };

    return Json(example_bible_verses);
}

#[launch]
fn rocket() -> _ {
    rocket::build()
        .mount("/", routes![home])
        .mount("/api/v1/", routes![bible_verses])
}
