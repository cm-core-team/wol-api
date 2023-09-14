use super::rocket;
use rocket::http::Status;
use rocket::local::blocking::Client;

// Just a default test to make sure CI is running properly
#[test]
fn home() {
    let client = Client::tracked(rocket()).expect("valid rocket instance");
    let response = client.get(uri!(super::home)).dispatch();
    assert_eq!(response.status(), Status::Ok);
    assert_eq!(response.into_string().unwrap(), "Hello, world!");
}
