import NextAuth, { NextAuthConfig } from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
// import { PrismaClient } from '@prisma/client/edge'
import { PrismaClient } from '@prisma/client'
import GitHub from 'next-auth/providers/github'

export const prisma = new PrismaClient()

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [GitHub]
})
