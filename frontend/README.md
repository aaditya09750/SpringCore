# SpringCore Frontend Console

> Modern, borderless developer console for SpringCore built with Next.js 14, TypeScript, and Tailwind CSS.

**Author:** [Aaditya Gunjal](https://github.com/aaditya09750)

---

## Live Cloud Deployments

| Component | Platform | Status | URL |
| :--- | :--- | :--- | :--- |
| **Frontend Console** | Vercel | Active | [https://spring-core.vercel.app](https://spring-core.vercel.app) |
| **Backend REST API** | Render | Active | [https://springcore-api.onrender.com](https://springcore-api.onrender.com) |

---

## 🚀 Quick Start (Local Development)

### 1. Install Dependencies

Always use **`pnpm`** as the package manager:

```bash
pnpm install
```

### 2. Configure Environment (Optional)

By default, Next.js will proxy backend requests to `http://localhost:8080`.
If you want the local frontend to proxy to the live Render backend instead, create a `.env.local` file:

```env
BACKEND_URL=https://springcore-api.onrender.com
```

### 3. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build and Lint Verification

```bash
pnpm lint
pnpm build
```

---

## ⚙️ Architecture & Reverse Proxy

The frontend uses Next.js rewrites (`next.config.mjs`) to eliminate browser CORS complications:

```javascript
const rawBackendUrl = process.env.BACKEND_URL || 'http://localhost:8080';
const BACKEND_URL = rawBackendUrl.trim().replace(/\/+$/, '');

const nextConfig = {
  async rewrites() {
    return [
      { source: '/api/:path*', destination: `${BACKEND_URL}/api/:path*` },
      { source: '/actuator/:path*', destination: `${BACKEND_URL}/actuator/:path*` },
      { source: '/hello', destination: `${BACKEND_URL}/hello` },
    ];
  },
};
```

### Key Design Pillars:
- **Trailing-Slash Normalization:** Automatically strips trailing slashes on `BACKEND_URL` to prevent `//hello` double-slash routing issues.
- **Resilient Content Negotiation:** `api-client.ts` safely reads raw text first and attempts JSON parsing, gracefully rendering both plain text and JSON responses.
- **Dark Mode Semantics:** High-contrast 5-color dark palette with frosted glassmorphic sticky navbar (`backdrop-filter: blur(16px)`).

---

## ☁️ Deploying to Vercel

1. Import the `SpringCore` GitHub repository into Vercel.
2. In the project setup, set the **Root Directory** to `frontend`.
3. Add the following **Environment Variable**:
   - `BACKEND_URL`: `https://springcore-api.onrender.com`
4. Click **Deploy**. Vercel will install dependencies via `pnpm`, run `next build`, and deploy edge routes globally.
