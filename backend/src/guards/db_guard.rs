use rocket::{
    self,
    request::{FromRequest, Outcome},
};

use sqlx;

#[derive(Debug)]
pub struct DbGuardError;

pub struct DbGuard<'r> {
    pub pool: &'r sqlx::PgPool,
}

#[rocket::async_trait]
impl<'r> FromRequest<'r> for DbGuard<'r> {
    type Error = std::convert::Infallible;

    async fn from_request(
        request: &'r rocket::Request<'_>,
    ) -> rocket::request::Outcome<Self, Self::Error> {
        // Extract the database pool from the request's managed state
        let pool = request.rocket().state::<sqlx::PgPool>().unwrap();
        Outcome::Success(DbGuard { pool })
    }
}
