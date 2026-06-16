use loco_openapi::prelude::*;

pub fn loco_openapi_initializer() -> std::boxed::Box<loco_openapi::OpenapiInitializerWithSetup> {
    Box::new(loco_openapi::OpenapiInitializerWithSetup::new(
        |ctx| {
            #[derive(OpenApi)]
            #[openapi(
                    modifiers(&SecurityAddon),
                    info(
                        title = env!("CARGO_PKG_NAME").to_string(),
                        description = env!("CARGO_PKG_DESCRIPTION").to_string()

                    )
                )]
            struct ApiDoc;
            set_jwt_location(ctx.into());
            ApiDoc::openapi()
        },
        None,
    ))
}
