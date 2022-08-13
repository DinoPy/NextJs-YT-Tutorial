import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Link from 'next/link';

export default function Home() {
	const [inputValue, setInputValue] = useState('');
	const { data: session, status } = useSession();

	return (
		<div className={styles.container}>
			<form
				onSubmit={(e) => {
					e.preventDefault();
				}}
			>
				<input
					className={styles.testInput}
					type='password'
					onChange={(e) => {
						setInputValue(e.target.value);
					}}
					value={inputValue}
					onInvalid={(e) => {
						e.target.setCustomValidity(
							'Please enter 2 digits, 2 upercase, 2 symbols and at least 6 characters'
						);
					}}
					pattern='/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/gm'
					required
				/>
			</form>
			<h1> {session ? `${session.user.name}, ` : ''} Next JS pre-rendering </h1>

			<Link href='/posts'>
				<a> Posts </a>
			</Link>
		</div>
	);
}
