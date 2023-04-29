import { Canvas } from 'components/atoms/canvas';
import React from 'react';

const Playground = () => {
	return (
		<div>
			Playground
			<Canvas width={700} height={500} className='mx-auto border-solid border-2 border-black'>
				Playground canvas for drawing
			</Canvas>
		</div>
	);
};

export default Playground;
