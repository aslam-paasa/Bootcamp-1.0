import { PrismaClient } from '@prisma/client'
import { beforeEach } from 'vitest'
import { mockDeep, mockReset } from 'vitest-mock-extended'

// 2
beforeEach(() => { mockReset(prismaClient) })

// 3
export const prismaClient = mockDeep<PrismaClient>()

/**
 * We don't have to write like this?
 * > export const prismaClient = {
 *      request: {
 *         create: vi.fn()
 *      }
 *   }
 * 
 * We can simply write:
 * > export const prismaClient = mockDeep<PrismaClient>()
*/