import { Canvas } from 'components/atoms/canvas';
import { drawLine } from 'helper/draw-helper';
import useDraw from 'hooks/useDraw';
import React from 'react';

const Playground = () => {
	const [lineColor, setLineColor] = React.useState('#555');
	const [lineWidth, setLineWidth] = React.useState(2);

	const drawLinePlay = ({ ctx, currentPoint, prevPoint }: Draw) => {
		drawLine({ ctx, currentPoint, prevPoint, lineWidth, lineColor });
	};

	const { canvasRef, handleMouseDown } = useDraw({ onDrawLine: drawLinePlay });

	return (
		<div>
			Playground
			<Canvas
				ref={canvasRef}
				onMouseDown={handleMouseDown}
				width={700}
				height={500}
				className='mx-auto border-solid border-2 border-black'
			>
				Playground canvas for drawing
			</Canvas>
		</div>
	);
};

export default Playground;
