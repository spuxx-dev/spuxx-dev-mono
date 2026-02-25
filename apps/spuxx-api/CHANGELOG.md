# Changelog

## 1.0.0 (2026-02-25)


### Features

* Add /alive route ([7c27724](https://github.com/spuxx-dev/spuxx-dev-mono/commit/7c277245481d904096ceb79ae17355799d2230a1))
* API now includes 'mdi:' into its default icon value ([73073c8](https://github.com/spuxx-dev/spuxx-dev-mono/commit/73073c8be0581a8f606a8ee0ce075d3743f02493))
* **deps:** Migeate towards @spuxx/nest-auth package and bump other @spuxx/nest-* package versions ([fa08218](https://github.com/spuxx-dev/spuxx-dev-mono/commit/fa082180a792fbe6a60cf7aba554535104ff61d8))
* **deps:** Migeate towards @spuxx/nest-auth package and bump other @spuxx/nest-* packages ([fbbc1b5](https://github.com/spuxx-dev/spuxx-dev-mono/commit/fbbc1b567aca10da459cd340527290e9a4e6d68b))
* **http:** Enabled CORS ([39e85fd](https://github.com/spuxx-dev/spuxx-dev-mono/commit/39e85fd9ebfb1dcea737cf5d2e784c452de29242))
* **lists:** `PATCH /toledo/lists/:id` now accepts the `include` query parameter ([904b8aa](https://github.com/spuxx-dev/spuxx-dev-mono/commit/904b8aaa6178e28fa9a7206f9ccd6b167b245d13))
* **lists:** Added list items and corresponding functionality ([43776d2](https://github.com/spuxx-dev/spuxx-dev-mono/commit/43776d272e882c16cd6f32efb05715c18cf11905))
* **lists:** Implement include query param ([eb46ff5](https://github.com/spuxx-dev/spuxx-dev-mono/commit/eb46ff55f4ba7be7b54dc8ef84a5f71cfab9e038))
* **lists:** Implemented list invites ([8f9a2e3](https://github.com/spuxx-dev/spuxx-dev-mono/commit/8f9a2e322e7a3e3bfd6f1f1a068926b497c8e6e8))
* **lists:** Users can now also get shared lists ([2206cfb](https://github.com/spuxx-dev/spuxx-dev-mono/commit/2206cfbefdfdb329ce0eda14227a604550bc8ce0))
* **toledo:** Basic implementation of recipes ([181e1c3](https://github.com/spuxx-dev/spuxx-dev-mono/commit/181e1c3416494ba4b0af070ba6ad21b2e8ebe381))
* **toledo:** Implemented missing list crud operations ([26e52d6](https://github.com/spuxx-dev/spuxx-dev-mono/commit/26e52d6fbb26d3029c1f35884884b5d8cf26abfa))


### Bug Fixes

* **auth:** Fixed an invalid type import ([a62fd1c](https://github.com/spuxx-dev/spuxx-dev-mono/commit/a62fd1c77c9f8c37dfc2966cbd5686e169687bc5))
* **auth:** Use CORS origins for validating returnTo param on login/logout ([ab331ab](https://github.com/spuxx-dev/spuxx-dev-mono/commit/ab331abc13eeb357216c7c8f371ec2ce0a2c40aa))
* **cors:** Fixed CORS_ALLOWED_ORIGINS env variable name ([921e35c](https://github.com/spuxx-dev/spuxx-dev-mono/commit/921e35c5c844bda5b3aedfb53e78cb506de200fe))
* **env:** Fixed validation of ALLOWED_CORS_ORIGINS ([e950c95](https://github.com/spuxx-dev/spuxx-dev-mono/commit/e950c959cd8db6649e359aed512212e8913f3498))
* **http:** Patch endpoints now work as expected ([bdc9cc0](https://github.com/spuxx-dev/spuxx-dev-mono/commit/bdc9cc0ff947df34b96a1c1e7540525bacda453d))
* **lists:** Fixed default list icon ([ace6f8c](https://github.com/spuxx-dev/spuxx-dev-mono/commit/ace6f8c42ad36de092e762938e4846350dc9b86c))
* **toledo:** Fixed an issue where list items would not be deleted properly ([23e6a39](https://github.com/spuxx-dev/spuxx-dev-mono/commit/23e6a39bb02f77c8466d369d439963107865ca7f))
* **toledo:** Fixed an issue where sharing lists would make them available globally ([225e944](https://github.com/spuxx-dev/spuxx-dev-mono/commit/225e94419b5ac40fc2a2236be0dc68f2039e12d4))
