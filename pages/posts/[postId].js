import React from 'react';
import { useRouter } from 'next/router';

const Post = ({ post }) => {
	const router = useRouter();

	if (router.isFallback) {
		return <p> isLoading... </p>;
	}

	return (
		<>
			<h2>
				{' '}
				{post.id} {post.title}{' '}
			</h2>
			<p> {post.body} </p>
		</>
	);
};

export default Post;

export async function getStaticPaths() {
	const response = await fetch(`https://jsonplaceholder.typicode.com/posts/`);
	const data = await response.json();

	const paths = data.slice(0, 3).map((post) => {
		return {
			params: { postId: `${post.id}` },
		};
	});
	return {
		paths: paths,
		fallback: true,
	};
}

export async function getStaticProps(context) {
	const { params } = context;
	const response = await fetch(
		`https://jsonplaceholder.typicode.com/posts/${params.postId}`
	);
	const data = await response.json();

	if (!data.id) {
		return {
			notFound: true,
		};
	}
	return {
		props: {
			post: data,
		},
	};
}
