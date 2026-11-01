/// <reference types="vite/client" />

declare module '*/api/upload.js' {
  export default function handler(req: any, res: any): Promise<any>;
  export const config: any;
}

declare module '*/server/firestoreSync.js' {
  export function syncEventToFirestore(event: any): Promise<boolean>;
  export function deleteEventFromFirestore(eventId: string, slug?: string): Promise<boolean>;
  export function syncMediaToFirestore(media: any): Promise<boolean>;
  export function deleteMediaFromFirestore(mediaId: string): Promise<boolean>;
}
