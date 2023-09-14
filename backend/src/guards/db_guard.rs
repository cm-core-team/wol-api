use rocket::{
    self,
    request::{FromRequest, Outcome},
};

pub struct DbGuard<'r> {
    pool: &'r sqlx::PgPool,
}

#[rocket::async_trait]
impl<'r> FromRequest<'r> for DbGuard<'r> {
    type Error = std::convert::Infallible;

    async fn from_request(
        request: &'r rocket::Request<'_>,
    ) -> rocket::request::Outcome<Self, Self::Error> {
        // Extract the database pool from the request's managed state
        let pool = request.rocket().state::<sqlx::PgPool>().unwrap();

        // Here, you can add any additional logic or checks related to the database

        Outcome::Success(DbGuard { pool })
    }
}
