/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_TMDB_KEY: string;
    // 여기에 다른 환경변수도 추가할 수 있어요.
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  