import React from 'react';
import PropTypes from 'prop-types';

const Canvas = ({ draw, width, height, children, ...delegated }) => {
	const canvasRef = React.useRef();

	// Initial canvas and static draw
	React.useEffect(() => {
		const context = canvasRef.current.getContext('2d');
		const drawCanvas = () => {
			if (!width || !height) {
				canvasRef.current.width = window.innerWidth;
				canvasRef.current.height = window.innerHeight;
			}
			draw(context);
		};

		// Initialize
		drawCanvas();

		// Handle resizing
		window.addEventListener('resize', drawCanvas);

		return () => window.removeEventListener('resize', drawCanvas);
	}, [draw, width, height]);

	const prevPoint = React.useRef(null);

	// Event subscription for drawing
	React.useEffect(() => {
		const canvasEle = canvasRef.current;
		const canvasElePosition = canvasEle.getBoundingClientRect();
		const context = canvasRef.current.getContext('2d');

		const handleMouseMove = (e) => {
			const currentPoint = {
				x: e.clientX - canvasElePosition.x,
				y: e.clientY - canvasElePosition.y,
			};

			const startPoint = prevPoint.current ?? currentPoint;
			context.beginPath();
			context.lineWidth = 3;
			context.strokeStyle = 'black';
			context.moveTo(startPoint.x, startPoint.y);
			context.lineTo(currentPoint.x, currentPoint.y);
			context.stroke();
			prevPoint.current = currentPoint;
		};

		canvasEle.addEventListener('mousemove', handleMouseMove);

		return () => canvasEle.removeEventListener('mousemove', handleMouseMove);
	}, []);

	return (
		<canvas
			ref={canvasRef}
			width={width}
			height={height}
			{...delegated}
		>
			{children}
		</canvas>
	);
};

Canvas.propTypes = {
	draw: PropTypes.func.isRequired,
	width: PropTypes.number,
	height: PropTypes.number,
	children: PropTypes.any.isRequired,
};

export default Canvas;
