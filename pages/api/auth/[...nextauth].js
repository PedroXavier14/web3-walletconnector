import NextAuth from 'next-auth';
import { MoralisNextAuthProvider } from '@moralisweb3/next';

export default NextAuth({
    providers: [MoralisNextAuthProvider()],
    secret: process.env.NEXTAUHT_SECRET,
    // adding user info to the user session object
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = user;
            }
            return token;
        },
        async session({ session, token }) {
            session.user = token.user;
            return session;
        },
    },
});