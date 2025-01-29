// src/types.ts
export interface Module {
    id: number | null;
    name: string;
    link: string;
    image?: {
        path: string | null; // Optional
    };
    active: boolean;
}

// Define the Attachment interface
export interface Attachment {
    id: number;
    path: string;
    fileName: string;
    type: string;
}