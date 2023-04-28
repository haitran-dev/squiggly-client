import React from 'react';
import PropTypes from 'prop-types';

const Canvas = ({ draw, width, height, fallbackText }) => {
	const canvasRef = React.useRef();

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

	return (
		<canvas ref={canvasRef} width={width} height={height}>
			{fallbackText}
		</canvas>
	);
};

Canvas.propTypes = {
	draw: PropTypes.func.isRequired,
	width: PropTypes.number,
	height: PropTypes.number,
	fallbackText: PropTypes.string.isRequired,
};

export default Canvas;
