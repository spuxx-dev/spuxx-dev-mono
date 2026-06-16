use loco_openapi::prelude::*;
use loco_rs::prelude::*;

use crate::home::view::{self, HomeResponse};

#[debug_handler]
#[utoipa::path(
    get,
    path = "/",
    responses(
        (status = 200, description = "Root", body = HomeResponse),
    ),
)]
async fn root() -> Result<Response> {
    format::json(HomeResponse::new())
}

#[debug_handler]
async fn robots_txt() -> Result<Response> {
    format::text(view::robots_txt())
}

#[debug_handler]
async fn security_txt() -> Result<Response> {
    format::text(view::security_txt())
}

pub fn routes() -> Routes {
    Routes::new()
        .prefix("")
        .add("/", openapi(get(root), routes!(root)))
        .add("/robots.txt", get(robots_txt))
        .add("/.well-known/security.txt", get(security_txt))
}
