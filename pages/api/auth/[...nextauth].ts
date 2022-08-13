import NextAuth from 'next-auth/next';
import GitHubProvider from 'next-auth/providers/github';

export default NextAuth({
	providers: [
		GitHubProvider({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
		}),
	],
	callbacks: {
		async jwt({ token, user, account, profile, isNewUser }) {
			console.log(token, user, account, profile, isNewUser);
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
