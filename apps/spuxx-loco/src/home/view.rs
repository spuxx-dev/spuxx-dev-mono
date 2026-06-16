use crate::config::env::ENV;
use loco_openapi::config::{get_openapi_config, OpenAPIType};
use loco_openapi::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize, ToSchema)]
pub struct HomeResponse {
    pub name: String,
    pub version: String,
    pub robots_txt: String,
    pub security_txt: String,
    pub swagger_ui: String,
}

impl HomeResponse {
    #[allow(clippy::new_without_default)]
    pub fn new() -> Self {
        let swagger_path = get_openapi_config()
            .and_then(|c| c.swagger.as_ref())
            .and_then(|s| match s {
                OpenAPIType::Swagger { url, .. } => Some(url.as_str()),
                _ => None,
            })
            .unwrap_or("/api-docs/swagger-ui");

        Self {
            name: env!("CARGO_PKG_NAME").to_string(),
            version: env!("CARGO_PKG_VERSION").to_string(),
            robots_txt: format!("{}/robots.txt", ENV.app_base_url),
            security_txt: format!("{}/.well-known/security.txt", ENV.app_base_url),
            swagger_ui: format!("{}{}", ENV.app_base_url, swagger_path),
        }
    }
}

pub fn robots_txt() -> &'static str {
    "User-agent: *\nDisallow: /\n"
}

pub fn security_txt() -> &'static str {
    concat!(
        "Contact: ",
        env!("CARGO_PKG_AUTHORS"),
        "\n",
        "Preferred-Languages: en, de\n",
    )
}
