import React from 'react';

type CanvasProps = {
	draw?: (props: object) => void;
	width?: number;
	height?: number;
	children?: React.ReactNode;
} & Record<string, unknown>;

const Canvas = React.forwardRef((props: CanvasProps, ref: React.Ref<HTMLCanvasElement>) => {
	const { draw, width, height, children, ...delegated } = props;
	const localRef = React.useRef<HTMLCanvasElement>(null);
	const canvasRef = ref ?? localRef;

	React.useEffect(() => {
		if (!canvasRef || typeof canvasRef === 'function') return;
		const canvas = canvasRef.current;
		const context = canvas?.getContext('2d');

		if (!canvas) return;

		const drawCanvas = () => {
			canvas.width = width ?? window.innerWidth;
			canvas.height = height ?? window.innerHeight;

			if (typeof draw === 'function') {
				draw({ context, windowWidth: canvas.width, windowHeight: canvas.height });
			}
		};

		// Initialize
		drawCanvas();

		// Handle resizing
		window.addEventListener('resize', drawCanvas);

		return () => window.removeEventListener('resize', drawCanvas);
	}, [draw, width, height, canvasRef]);

	return (
		<canvas ref={canvasRef} width={width} height={height} {...delegated}>
			{children}
		</canvas>
	);
});

Canvas.displayName = 'Canvas';

export default Canvas;
