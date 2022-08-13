import React from 'react';
import { getSession, useSession } from 'next-auth/react';

const Blog = ({ data }) => {
	const { data: session, status } = useSession();
	console.log(session);
	return <div>Blog - User: {data}</div>;
};

export default Blog;

export async function getServerSideProps(context) {
	const session = await getSession(context);

	if (!session) {
		return {
			redirect: {
				destination: '/api/auth/signin?callbackUrl=/blog',
				permanent: false,
			},
		};
	}

	return {
		props: {
			data: session ? 'authenticated' : 'unauthenticated',
			session,
		},
	};
}
