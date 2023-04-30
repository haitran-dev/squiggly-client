import { Canvas } from 'components/atoms/canvas';
import useDraw from 'hooks/useDraw';
import React from 'react';

const Playground = () => {
	const lineColor = '#555';
	const [lineWidth, setLineWidth] = React.useState(2);

	const drawLine = ({ ctx, currentPoint, prevPoint }: Draw) => {
		const startPoint = prevPoint ?? currentPoint;
		ctx.beginPath();
		ctx.lineWidth = lineWidth;
		ctx.strokeStyle = lineColor;
		ctx.moveTo(startPoint.x, startPoint.y);
		ctx.lineTo(currentPoint.x, currentPoint.y);
		ctx.stroke();

		ctx.beginPath();
		ctx.fillStyle = lineColor;
		ctx.arc(startPoint.x, startPoint.y, lineWidth / 2.4, 0, 2 * Math.PI);
		ctx.fill();
	};

	const { canvasRef, handleMouseDown } = useDraw({ onDrawLine: drawLine });

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
