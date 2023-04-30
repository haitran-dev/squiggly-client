import React from 'react';

type useDrawProps = {
	onDrawLine: ({ ctx, currentPoint, prevPoint }: Draw) => void;
};

const useDraw = ({ onDrawLine }: useDrawProps) => {
	const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
	const prevPoint = React.useRef<Vec2 | null>(null);
	const [isMouseDown, setMouseDown] = React.useState<boolean>(false);

	const handleMouseDown = () => setMouseDown(true);

	const handleMouseUp = () => {
		setMouseDown(false);
		prevPoint.current = null;
	};

	React.useEffect(() => {
		const canvasEle = canvasRef.current;
		if (!canvasEle) return;

		const ctx = canvasEle.getContext('2d');
		if (!ctx) return;

		const canvasElePosition = canvasEle.getBoundingClientRect();

		const handleMouseMove = (e: MouseEvent) => {
			if (!isMouseDown) return;

			const currentPoint = {
				x: e.clientX - canvasElePosition.x,
				y: e.clientY - canvasElePosition.y,
			};

			onDrawLine({ ctx, currentPoint, prevPoint: prevPoint.current });
			prevPoint.current = currentPoint;
		};

		canvasEle.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('mouseup', handleMouseUp);

		return () => {
			canvasEle.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('mouseup', handleMouseUp);
		};
	}, [onDrawLine, isMouseDown]);

	return { canvasRef, handleMouseDown };
};

export default useDraw;
