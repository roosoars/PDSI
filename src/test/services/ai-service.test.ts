import { describe, it, expect, vi, beforeEach } from 'vitest';

// Create mock implementations
const mockGenerateContent = vi.fn();
const mockGetGenerativeModel = vi.fn(() => ({
    generateContent: mockGenerateContent,
}));

const mockChatCompletions = vi.fn();

// Mock Google Generative AI
vi.mock('@google/generative-ai', () => ({
    GoogleGenerativeAI: vi.fn(() => ({
        getGenerativeModel: mockGetGenerativeModel,
    })),
}));

// Mock OpenAI
vi.mock('openai', () => ({
    default: vi.fn(() => ({
        chat: {
            completions: {
                create: mockChatCompletions,
            },
        },
    })),
}));

// Import after mocks are set up
const { generateDescription, generateBatchDescriptions } = await import("../../services/ai-service");

// Mock file
const createMockFile = (name: string): File => {
    const blob = new Blob(['test'], { type: 'image/png' });
    return new File([blob], name, { type: 'image/png' });
};

describe('ai-service', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('generateDescription', () => {
        it('should generate description using Gemini', async () => {
            const mockResponse = {
                alt: 'A test image',
                description: 'This is a test image for accessibility',
            };

            mockGenerateContent.mockResolvedValue({
                response: {
                    text: () => JSON.stringify(mockResponse),
                },
            });

            const file = createMockFile('test.png');
            const result = await generateDescription(file, 'gemini', 'test-key', 'gemini-1.5-flash', 'pt-BR', 'concise', []);

            expect(result).toEqual(mockResponse);
            expect(mockGetGenerativeModel).toHaveBeenCalledWith({ model: 'gemini-1.5-flash' });
        });

        it('should generate description using OpenAI', async () => {
            const mockResponse = {
                alt: 'A test image',
                description: 'This is a test image for accessibility',
            };

            mockChatCompletions.mockResolvedValue({
                choices: [
                    {
                        message: {
                            content: JSON.stringify(mockResponse),
                        },
                    },
                ],
            });

            const file = createMockFile('test.png');
            const result = await generateDescription(file, 'openai', 'test-key', 'gpt-4o', 'pt-BR', 'concise', []);

            expect(result).toEqual(mockResponse);
        });

        it('should throw error when API fails', async () => {
            mockGenerateContent.mockRejectedValue(new Error('API Error'));

            const file = createMockFile('test.png');
            await expect(
                generateDescription(file, 'gemini', 'test-key', 'gemini-1.5-flash', 'pt-BR', 'concise', [])
            ).rejects.toThrow();
        });
    });

    describe('generateBatchDescriptions', () => {
        it('should process multiple images and report progress', async () => {
            const mockResponse = {
                alt: 'Test',
                description: 'Test description',
            };

            mockGenerateContent.mockResolvedValue({
                response: {
                    text: () => JSON.stringify(mockResponse),
                },
            });

            const files = [
                createMockFile('test1.png'),
                createMockFile('test2.png'),
            ];

            const progressCallback = vi.fn();
            const results = await generateBatchDescriptions(
                files,
                'gemini',
                'test-key',
                'gemini-1.5-flash',
                'pt-BR',
                'concise',
                [], // Empty glossary
                progressCallback
            );

            expect(results).toHaveLength(2);
            expect(results[0].filename).toBe('test1.png');
            expect(results[1].filename).toBe('test2.png');
            expect(progressCallback).toHaveBeenCalledWith(1, 2);
            expect(progressCallback).toHaveBeenCalledWith(2, 2);
        });
    });
});
