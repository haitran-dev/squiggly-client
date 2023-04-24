import React from 'react';
import PropTypes from 'prop-types';

const Canvas = ({ draw, width, height, fallbackText }) => {
	const canvasRef = React.useRef();

	React.useEffect(() => {
		if (!width || !height) {
			canvasRef.current.width = window.innerWidth;
			canvasRef.current.width = window.innerHeight;
		}

		const context = canvasRef.current.getContext('2d');
		draw(context);
	}, []);

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
