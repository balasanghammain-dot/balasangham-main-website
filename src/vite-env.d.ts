/// <reference types="vite/client" />

declare module '*/api/upload.js' {
  export default function handler(req: any, res: any): Promise<any>;
  export const config: any;
}
