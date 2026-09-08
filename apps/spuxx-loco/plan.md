Let me give you a thorough assessment of each requirement in the Rust/Loco ecosystem. I'll check the current state of relevant crates as well.

Good, I now have enough information from the verified sources. Here's my comprehensive assessment:

---

## Rust/Loco vs Your Requirements: Full Assessment

The short answer: **all 6 requirements are technically met**, but with meaningfully different ergonomics compared to the NestJS equivalents. Here's the honest breakdown.

---

### 1. Auth via OIDC ✅ (but manual integration required)

**Crate:** [`openidconnect`](https://docs.rs/openidconnect) — v4.0.1, maintained by Mozilla's former security engineer, very complete.

It supports full OIDC relying-party flows: Authorization Code + PKCE, token validation, ID token verification, userinfo endpoint, refresh tokens, and OIDC Discovery. Both sync and async (tokio) APIs are provided.

**The catch:** Loco has no built-in OIDC middleware. You'd wire this into Loco's auth layer yourself — roughly equivalent to writing a `PassportStrategy` in NestJS. It's ~100–200 lines of integration code, not a one-liner config, but the underlying crypto and protocol work is fully handled by the crate.

---

### 2. OpenAPI/Swagger from structs ✅ (annotation-based, not class-based)

**Crate:** [`utoipa`](https://docs.rs/utoipa) — v5.5, actively maintained, supports OpenAPI 3.1.

Works by decorating your handler functions and structs with proc macros:

```rust
#[derive(ToSchema)]
struct CreateUserDto {
    #[schema(example = "alice@example.com")]
    email: String,
    age: u8,
}

#[utoipa::path(
    post,
    path = "/users",
    request_body = CreateUserDto,
    responses((status = 201, body = UserDto))
)]
async fn create_user(...) { ... }
```

It integrates with Axum (Loco's underlying HTTP layer) via `utoipa-axum`, and serves Swagger UI via `utoipa-swagger-ui`. The experience is more verbose than NestJS decorators but very capable — including generic types, enums, response variants, and query/path parameter schemas.

---

### 3. Payload & query param validation ✅ (attribute-based, similar feel)

**Crate:** [`garde`](https://docs.rs/garde) — v0.23, the modern successor to `validator`.

```rust
#[derive(Validate)]
struct CreateUserDto {
    #[garde(email)]
    email: String,
    #[garde(length(min = 8))]
    password: String,
    #[garde(range(min = 0, max = 120))]
    age: u8,
}
```

Supports: email, URL, regex, length (bytes/graphemes/chars), range, credit card, phone number, custom closures, conditional rules, nested validation via `#[garde(dive)]`, and `Option<T>` handling. Framework integration is through `axum-valid` which plugs directly into Axum's extractor system — validation errors automatically become 422 responses.

This is very comparable to `class-validator`. The main difference is it's compile-time rather than runtime-reflective, so errors surface earlier.

---

### 4. Auto-mapping between layers ⚠️ (exists, but philosophically different)

**Crate:** [`o2o`](https://docs.rs/o2o) — v0.5.4 — generates `From`/`Into` impls via proc macros.

```rust
#[derive(o2o)]
#[from_owned(UserEntity)]
struct UserDto {
    id: u32,
    #[map(username)]   // field rename
    name: String,
    #[ghost(None)]     // field only on DTO side
    avatar_url: Option<String>,
}
```

This is where the gap vs NestJS is most significant. Because Rust has no runtime reflection, o2o (or the simpler `From` derive macros in general) must work from one side of the mapping only. It cannot auto-discover field correspondences the way Java/C# AutoMapper can. You still annotate explicitly, but the boilerplate is eliminated for the common case.

The idiomatic Rust alternative that many teams use instead is just writing `impl From<UserEntity> for UserDto` manually — it's explicit, zero-cost, and the compiler enforces it. Many Rust developers consider `o2o` overkill for this reason.

---

### 5. E2E testing (HTTP layer, like Supertest) ✅ (first-class in Loco)

Loco generates request tests by default when you scaffold a controller. The test infrastructure spins up the full app in-process and lets you make typed HTTP requests:

```rust
#[tokio::test]
async fn test_create_post() {
    let ctx = TestContext::new(testing::DB_NAME).await;
    let app = ctx.create_server().await.unwrap();

    let response = request(&app)
        .post("/api/posts")
        .json(&json!({"title": "hello", "content": "world"}))
        .await;

    response.assert_status_ok();
    response.assert_json_contains(&json!({"title": "hello"}));
}
```

This is actually one of Loco's strongest selling points — it's closer to Supertest's ergonomics than most frameworks. The full app stack (routes, middleware, DB) runs in the test process without a network, so tests are fast and isolated.

---

### 6. Test coverage reporting ✅ (much improved since you last checked)

**Tool:** [`cargo-llvm-cov`](https://docs.rs/cargo-llvm-cov) — v0.8.7, uses LLVM source-based coverage instrumentation.

```bash
cargo llvm-cov --html          # HTML report
cargo llvm-cov --lcov          # lcov for CI (Codecov, Coveralls, Sonar)
cargo llvm-cov --json          # JSON for custom tooling
cargo llvm-cov nextest         # Works with cargo-nextest
```

This is genuinely production-grade now. It integrates with all major CI coverage platforms and supports excluding test code, macros, and specific paths from the report. The old `cargo-tarpaulin` (which was indeed bare-bones) has largely been superseded by this.

---

## Summary Table

| Requirement        | Rust/Loco answer                               | Comparable to NestJS?                     |
| ------------------ | ---------------------------------------------- | ----------------------------------------- |
| OIDC auth          | `openidconnect` crate, manual Loco integration | ✅ Yes, ~150 LoC wiring                   |
| OpenAPI/Swagger    | `utoipa` + proc macros                         | ✅ Yes, slightly more verbose             |
| Validation         | `garde` + `axum-valid`                         | ✅ Very comparable                        |
| Auto-mapping       | `o2o` or manual `From` impls                   | ⚠️ No reflection — explicit but type-safe |
| E2E HTTP testing   | Loco's built-in `TestContext`                  | ✅ Yes, very ergonomic                    |
| Coverage reporting | `cargo-llvm-cov`                               | ✅ Fully mature now                       |

## Honest Caveats

- **OIDC**: Loco's built-in auth is JWT-only. OIDC is a manual integration, not a plugin.
- **Auto-mapping**: The biggest conceptual shift. Rust's type system means you get compile-time guarantees instead of runtime magic, but you trade away the "just works" experience of AutoMapper for struct mappings with renamed/transformed fields.
- **utoipa verbosity**: You annotate every handler and schema. It's more typing than NestJS's `@ApiProperty()` on a class, but `utoipa-axum` helps reduce duplication.
- **Ecosystem maturity**: All these crates are actively maintained and production-used, but the community is smaller than npm's. Googling errors will yield fewer StackOverflow hits.

The migration is feasible and all your requirements can be met. The biggest adjustment is the auto-mapping story — if you relied heavily on AutoMapper's convention-based magic for many DTOs, expect to write more explicit `From` implementations.
