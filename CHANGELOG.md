# Changelog

All notable changes to the **SpringCore** project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Planned
- Spring Security 6 integration with stateless JWT authentication
- PostgreSQL / Spring Data JPA persistence starter
- Redis distributed cache configuration
- Testcontainers integration for automated integration testing

---

## [2.0.0] - 2026-09-20

### Added
- **Live Cloud Production Deployments:**
  - **Frontend Console on Vercel:** [https://spring-core.vercel.app](https://spring-core.vercel.app) with edge proxying and responsive dark mode UI.
  - **Backend REST API on Render:** [https://springcore-api.onrender.com](https://springcore-api.onrender.com) running multi-stage Docker container on Java 17.
  - **Edge Proxy Trailing-Slash Sanitizer:** Hardened `next.config.mjs` with `rawBackendUrl.trim().replace(/\/+$/, '')` to prevent `//hello` double-slash URL concatenation errors.
  - **Multi-Segment Path Aliasing:** Added `{"/hello", "//hello"}` mapping to `HelloController` to handle double-slash proxy variations gracefully.
  - **Global CORS Authorization:** Configured `allowedOriginPatterns("*")` in `WebConfig.java` to support universal cross-origin requests.
- **SpringCore Branding & Renaming:** Official repository renaming to `SpringCore` across backend `pom.xml`, Maven artifactId, Spring Boot configuration, Next.js metadata, and documentation.
- **Resilient Content Negotiation & Non-Breaking Parser:** Added `produces = MediaType.TEXT_PLAIN_VALUE` support and implemented resilient dual-mode response parsing in both the embedded console (`index.html`) and Next.js client (`api-client.ts`), ensuring plain-text endpoints (`/hello`) and JSON payloads (`/api/greet`, `/api/info`) execute flawlessly without client deserialization errors.
- **Sticky Glassmorphic Navbar:** Pinned floating header with smooth frosted-glass backdrop blur (`backdrop-filter: blur(16px)`) and responsive mobile menu.
- **Custom Dropdown Component:** Engineered a keyboard-accessible, sleek custom dropdown for HTTP method selection (`GET`, `POST`, `PUT`, `DELETE`).
- **Custom Slim Scrollbar:** Cross-browser slim scrollbars matching the 5-color dark palette across JSON payload editors, response inspectors, and page windows.
- **Comprehensive Documentation Suite:**
  - `README.md`: Complete enterprise guide with ASCII diagrams, scenario walkthroughs 1-10, architecture diagrams, live cloud deployment links, and quick-start instructions.
  - `ARCHITECTURE.md`: Deep technical design blueprint detailing clean layering, request lifecycle, filter mechanics, and cloud production architecture.
  - `CONTRIBUTING.md`: Contributor workflow, branching strategy, Conventional Commits guidelines, and testing requirements.
  - `CHANGELOG.md`: Detailed version history following Keep a Changelog standards.
  - `SECURITY.md`: Vulnerability reporting process and security posture.
  - `CODE_OF_CONDUCT.md`: Contributor Covenant v2.1 standard.
  - `LICENSE`: Standard MIT Open Source license.

### Changed
- **Aesthetic Refinements:**
  - Standardized card corner radii to a restrained `14px` (`rounded-[14px]`).
  - Standardized all icon backgrounds, status badges, and dots to circular `rounded-full` (50%).
  - Removed harsh dark box shadows across all buttons and interactive cards in favor of subtle borderless depth.
- **Ignored Build Artifacts:** Enhanced `.gitignore` to comprehensively ignore `frontend/node_modules/`, `frontend/.next/`, `.pnpm-store/`, and local test logs.

### Fixed
- Fixed HTTP 500 error on Vercel frontend caused by trailing slash on `BACKEND_URL` creating double-slash request routes (`//hello`).
- Fixed JSX unclosed tag syntax error in `ApiConsole.tsx` blocking Vercel production build.
- Fixed browser JSON parse syntax errors when invoking plain text endpoints (`/hello`, `/api/hello-world`).
- Fixed port binding conflict on 8080 by standardizing process daemon controls.

---

## [1.0.0] - 2026-09-19

### Added
- **Initial Spring Boot 4 Starter:** Foundational enterprise microservice scaffold running on Java 17 and Spring Boot 4.1.1.
- **Layered Clean Architecture:**
  - `HelloController`: REST endpoints for health, info, and greetings.
  - `HelloService`: Decoupled domain greeting logic with multi-language support.
  - `com.example.demo.dto`: Immutable Java 17 records (`HelloResponse`, `GreetRequest`, `GreetResponse`, `SystemInfoResponse`, `ErrorResponse`).
- **Validation & Error Handling:**
  - Jakarta Bean Validation on request payloads (`@NotBlank`, `@Size`, `@Pattern`).
  - RFC 7807 Global Exception Handler (`@RestControllerAdvice`) with structured error details.
- **Distributed Tracing Filter:**
  - `CorrelationIdFilter` generating and propagating `X-Correlation-ID` via SLF4J MDC.
- **Spring Boot Actuator:**
  - Production `/actuator/health`, `/actuator/info`, and metric probes enabled.
- **Decoupled Frontend:**
  - Next.js 14, TypeScript, Tailwind CSS developer console using `pnpm`.
- **Embedded Static Dashboard:**
  - Fallback zero-dependency interactive dashboard hosted at `/index.html` on port 8080.
- **Test Suite:**
  - Full suite of 9 unit and integration tests passing (`HelloControllerTest`, `HelloServiceTest`, `DemoApplicationTests`).

