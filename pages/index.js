import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Link from 'next/link';

export default function Home() {
	const { data: session, status } = useSession();

	return (
		<div className={styles.container}>
			<h1> Next JS pre-rendering </h1>

			<Link href='/posts'>
				<a> Posts </a>
			</Link>
		</div>
	);
}
