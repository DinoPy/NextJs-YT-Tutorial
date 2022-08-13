import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Link from 'next/link';

export default function Home() {
	const [inputValue, setInputValue] = useState('');
	const { data: session, status } = useSession();
	console.log(session, status);

	const regex = new RegExp(
		`^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/gm`
	);

	return (
		<div className={styles.container}>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					console.log(inputValue);
				}}
			>
				<input
					className={styles.testInput}
					type='password'
					onChange={(e) => {
						setInputValue(e.target.value);
						console.log(regex.test(inputValue));
					}}
					value={inputValue}
					onInvalid={(e) => {
						e.target.setCustomValidity(
							'Please enter 2 digits, 2 upercase, 2 symbols and at least 6 characters'
						);
					}}
					// pattern for password 2 digits 2 or more lowercase 2  upercase 2 special
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
