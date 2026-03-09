import { tool } from '@langchain/core/tools';
import { TavilySearch } from '@langchain/tavily';
import z from 'zod';

const planObject = z.object({
    steps: z.array(z.string()).describe('different steps to follow, should be in sorted order'),
});

const responseObject = z.object({
    response: z.string().describe('Response to user.'),
});

export const responseTool = tool(() => {}, {
    name: 'response',
    description: 'Respond to the user.',
    schema: responseObject,
});

export const planTool = tool(() => {}, {
    name: 'plan',
    description: 'This tool is used to plan the steps to follow.',
    schema: planObject,
});

export const tools = [new TavilySearch({ maxResults: 3 })];
