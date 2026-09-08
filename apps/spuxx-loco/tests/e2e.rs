use std::future::Future;

/// Runs the given test code inside a context enabling end-to-end testing.
///
/// # Examples
///
/// ```rust
/// #[tokio::test]
/// #[serial]
/// async fn my_test() {
///     e2e(|| async {
///         //  ... test code codes here ...
///     })
///     .await;
/// }
/// ```
pub async fn run<F, Fut>(test: F)
where
    F: FnOnce() -> Fut,
    Fut: Future<Output = ()>,
{
    let env_vars = [("APP_BASE_URL", Some("http://localhost:5150"))];
    temp_env::async_with_vars(env_vars, test()).await;
}
