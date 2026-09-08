use dotenvy::dotenv;
use spuxx_utils::env::config::EnvConfig;
use spuxx_utils::env::loader::required;
use std::sync::LazyLock;

pub struct Env {
    pub app_base_url: String,
}

impl EnvConfig for Env {
    fn load() -> Self {
        #[allow(unused_must_use)]
        dotenv();
        Self {
            app_base_url: required::<String>("APP_BASE_URL"),
        }
    }
}

pub static ENV: LazyLock<Env> = LazyLock::new(Env::load);
