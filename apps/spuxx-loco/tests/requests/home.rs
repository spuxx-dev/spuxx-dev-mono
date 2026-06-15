use loco_rs::testing::prelude::*;
use serial_test::serial;
use spuxx_loco::app::App;

#[tokio::test]
#[serial]
async fn can_get_home() {
    request::<App, _, _>(|request, _ctx| async move {
        let res = request.get("/").await;
        assert_eq!(res.status_code(), 200);
    })
    .await;
}
