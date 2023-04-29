import React from 'react';

type CanvasProps = {
	draw?: (context: CanvasRenderingContext2D) => void;
	width?: number;
	height?: number;
	children?: React.ReactNode;
} & Record<string, unknown>;

type Point = {
	x: number;
	y: number;
};

const Canvas = ({ draw, width, height, children, ...delegated }: CanvasProps) => {
	const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

	// Initial canvas and static draw
	React.useEffect(() => {
		const canvasEle = canvasRef.current;
		if (!canvasEle) return;

		const context = canvasEle.getContext('2d');
		if (!context) return;

		const drawCanvas = () => {
			if (!width || !height) {
				canvasEle.width = window.innerWidth;
				canvasEle.height = window.innerHeight;
			}

			if (!draw) return;

			draw(context);
		};

		// Initialize
		drawCanvas();

		// Handle resizing
		window.addEventListener('resize', drawCanvas);

		return () => window.removeEventListener('resize', drawCanvas);
	}, [draw, width, height]);

	const prevPoint = React.useRef<Point | null>(null);

	// Event subscription for drawing
	React.useEffect(() => {
		const canvasEle = canvasRef.current;
		if (!canvasEle) return;

		const canvasElePosition = canvasEle.getBoundingClientRect();
		const context = canvasEle.getContext('2d');
		if (!context) return;

		const lineColor = '#222';
		const lineWidth = 3;

		const handleMouseMove = (e: MouseEvent) => {
			const currentPoint = {
				x: e.clientX - canvasElePosition.x,
				y: e.clientY - canvasElePosition.y,
			};

			const startPoint = prevPoint.current ?? currentPoint;
			context.beginPath();
			context.lineWidth = lineWidth;
			context.strokeStyle = lineColor;
			context.moveTo(startPoint.x, startPoint.y);
			context.lineTo(currentPoint.x, currentPoint.y);
			context.stroke();

			context.beginPath();
			context.fillStyle = lineColor;
			context.arc(startPoint.x, startPoint.y, lineWidth / 2.5, 0, 2 * Math.PI);
			context.fill();

			prevPoint.current = currentPoint;
		};

		canvasEle.addEventListener('mousemove', handleMouseMove);

		return () => canvasEle.removeEventListener('mousemove', handleMouseMove);
	}, []);

	return (
		<canvas ref={canvasRef} width={width} height={height} {...delegated}>
			{children}
		</canvas>
	);
};

export default Canvas;
