use rocket;
use sqlx::{postgres::PgPoolOptions, Pool, Postgres};

mod guards;
mod models;
mod routes;
mod services;

#[rocket::get("/")]
fn home() -> &'static str {
    "Hello, world!"
}

#[rocket::launch]
async fn entrypoint() -> rocket::Rocket<rocket::Build> {
    rocket::build()
        .manage(init_db_pool().await)
        .mount("/api/v1", rocket::routes![home, routes::verse::get_verse])
}

async fn init_db_pool() -> Pool<Postgres> {
    println!("Connecting to database...");
    let pool_result = PgPoolOptions::new()
        .acquire_timeout(std::time::Duration::from_secs(10))
        .connect("postgresql://postgres:postgres@localhost:5432/postgres")
        .await;

    return pool_result.unwrap();
}
