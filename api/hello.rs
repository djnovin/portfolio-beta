use dotenv::dotenv;
use serde_json::json;
use vercel_runtime::{
    process_request, process_response, run_service, service_fn, Body, Error, Request, Response,
    ServiceBuilder, StatusCode,
};

trait Handler {
    async fn get_hello(req: Request) -> Result<Response<Body>, Error>;
}

struct HelloHandler;

impl Handler for HelloHandler {
    async fn get_hello(req: Request) -> Result<Response<Body>, Error> {
        if req.method() == "GET" && req.uri().path() == "/api/hello" {
            let response = Response::builder()
                .status(StatusCode::OK)
                .header("Content-Type", "application/json")
                .body(Body::from(
                    json!({ "message": "Hello, World!" }).to_string(),
                ))?;
            Ok(response)
        } else {
            let response = Response::builder()
                .status(StatusCode::NOT_FOUND)
                .body(Body::from("Not Found"))?;
            Ok(response)
        }
    }
}

#[tokio::main]
async fn main() -> Result<(), Error> {
    dotenv().ok();

    let handler = ServiceBuilder::new()
        .map_request(process_request)
        .map_response(process_response)
        .service(service_fn(HelloHandler::get_hello));

    run_service(handler).await
}
