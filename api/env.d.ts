declare namespace NodeJS {
  interface ProcessEnv {
    SERVER_PORT: string
    DATABASE_URL: string
    DB_PORT: string
    DB_USER: string
    DB_PASSWORD: string
    DB_NAME: string
  }
}
