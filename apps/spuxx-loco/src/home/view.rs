use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize)]
pub struct HomeResponse {
    pub name: String,
    pub version: String,
    pub robots_txt: String,
    pub security_txt: String,
}

impl HomeResponse {
    #[allow(clippy::new_without_default)]
    pub fn new() -> Self {
        Self {
            name: env!("CARGO_PKG_NAME").to_string(),
            version: env!("CARGO_PKG_VERSION").to_string(),
            robots_txt: concat!("/robots.txt").to_string(),
            security_txt: "/security.txt".to_string(),
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
