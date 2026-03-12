# Changelog

## 1.0.0 (2026-03-12)


### Features

* API now includes 'mdi:' into its default icon value ([73073c8](https://github.com/spuxx-dev/spuxx-dev-mono/commit/73073c8be0581a8f606a8ee0ce075d3743f02493))
* **deps:** Migeate towards @spuxx/nest-auth package and bump other @spuxx/nest-* package versions ([fa08218](https://github.com/spuxx-dev/spuxx-dev-mono/commit/fa082180a792fbe6a60cf7aba554535104ff61d8))
* **deps:** Migeate towards @spuxx/nest-auth package and bump other @spuxx/nest-* packages ([fbbc1b5](https://github.com/spuxx-dev/spuxx-dev-mono/commit/fbbc1b567aca10da459cd340527290e9a4e6d68b))
* **lists:** `PATCH /toledo/lists/:id` now accepts the `include` query parameter ([904b8aa](https://github.com/spuxx-dev/spuxx-dev-mono/commit/904b8aaa6178e28fa9a7206f9ccd6b167b245d13))
* **lists:** Users can now also get shared lists ([2206cfb](https://github.com/spuxx-dev/spuxx-dev-mono/commit/2206cfbefdfdb329ce0eda14227a604550bc8ce0))
* **toledo:** Basic implementation of recipes ([181e1c3](https://github.com/spuxx-dev/spuxx-dev-mono/commit/181e1c3416494ba4b0af070ba6ad21b2e8ebe381))


### Bug Fixes

* **auth:** Fixed an invalid type import ([a62fd1c](https://github.com/spuxx-dev/spuxx-dev-mono/commit/a62fd1c77c9f8c37dfc2966cbd5686e169687bc5))
* **auth:** Use CORS origins for validating returnTo param on login/logout ([ab331ab](https://github.com/spuxx-dev/spuxx-dev-mono/commit/ab331abc13eeb357216c7c8f371ec2ce0a2c40aa))
* **cors:** Fixed CORS_ALLOWED_ORIGINS env variable name ([921e35c](https://github.com/spuxx-dev/spuxx-dev-mono/commit/921e35c5c844bda5b3aedfb53e78cb506de200fe))
* **env:** Fixed validation of ALLOWED_CORS_ORIGINS ([e950c95](https://github.com/spuxx-dev/spuxx-dev-mono/commit/e950c959cd8db6649e359aed512212e8913f3498))
* **toledo:** Fixed an issue where list items would not be deleted properly ([23e6a39](https://github.com/spuxx-dev/spuxx-dev-mono/commit/23e6a39bb02f77c8466d369d439963107865ca7f))
* **toledo:** Fixed an issue where sharing lists would make them available globally ([225e944](https://github.com/spuxx-dev/spuxx-dev-mono/commit/225e94419b5ac40fc2a2236be0dc68f2039e12d4))
