export interface ImageMetadata {
    objects: string[];
    people: boolean;
    decorative: boolean;
    dominant_colors: string[];
    confidence: number;
}

export interface Result {
    filename: string;
    alt: string;
    description: string;
    metadata?: ImageMetadata;
    status: 'generated' | 'edited' | 'approved';
    originalAlt?: string;
    imageUrl?: string;
}

export type AIProvider = 'gemini' | 'openai';
export type Language = 'pt-BR' | 'en-US' | 'es-ES';
export type DescriptionStyle = 'concise' | 'detailed' | 'formal' | 'informal';

export const GEMINI_MODELS = [
    'gemini-3-pro-preview',
    'gemini-2.5-pro',
    'gemini-2.5-flash',
    'gemini-2.5-flash-preview-09-2025',
    'gemini-2.0-flash',
    'gemini-2.0-flash-lite',
    'gemini-1.5-flash',
    'gemini-1.5-pro',
];

export const OPENAI_MODELS = [
    'gpt-4o',
    'gpt-4o-mini',
    'gpt-4-turbo',
];
