import React from 'react';
import Image from 'next/image';
import img from '../public/1.jpg';

const PetsPage = () => {
	return (
		<div>
			<Image src={img} placeholder='blur' alt='pet' height='420' width='280' />

			{['1', '2', '3', '4', '5'].map((pet) => {
				return (
					<div key={pet}>
						<Image
							src={`/${pet}.jpg`}
							placeholder='blur'
							blurDataURL={`/${pet}.jpg`}
							alt='pet'
							height='420'
							width='280'
						/>
					</div>
				);
			})}
		</div>
	);
};

export default PetsPage;
