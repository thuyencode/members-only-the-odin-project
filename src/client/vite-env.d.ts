/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PORT: string
  readonly VITE_ACCESS_TOKEN_SECRET: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
