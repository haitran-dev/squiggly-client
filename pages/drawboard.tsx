import { Canvas } from 'components/atoms/canvas';
import { drawLine, drawPaper } from 'helper/draw-helper';
import { socket } from 'helper/socket/draw';
import useDraw from 'hooks/useDraw';
import { Point } from 'package/SignaturePad/point';
import React from 'react';

const DrawBoard = () => {
	const drawLinePlay = ({ ctx, currentPoint, prevPoint }: Draw) => {
		const lineWidth = 3;
		const lineColor = '#555';
		drawLine({ ctx, currentPoint, prevPoint, lineWidth, lineColor });

		socket.emit('update-canvas', { data: { currentPoint, prevPoint } });
	};

	const { canvasRef, handleMouseDown } = useDraw({ onDrawLine: drawLinePlay });

	React.useEffect(() => {
		if (!canvasRef.current) return;
		const ctx = canvasRef.current.getContext('2d');

		if (!ctx) return;

		socket.emit('init');

		const onUpdate = ({
			data,
		}: {
			data: { ctx: CanvasRenderingContext2D; currentPoint: Point; prevPoint: Point };
		}) => {
			const { currentPoint, prevPoint } = data;

			drawLinePlay({ ctx, currentPoint, prevPoint });
		};

		socket.on('get-canvas-state', onInitSocket);
		socket.on('get-update-canvas', onUpdate);

		return () => {
			socket.off('get-canvas-state', onInitSocket);
			socket.off('get-update-canvas', onUpdate);
		};
	}, []);

	const onInitSocket = () => {
		console.log('sending content');
	};

	return (
		<Canvas draw={drawPaper} ref={canvasRef} onMouseDown={handleMouseDown}>
			Draw board
		</Canvas>
	);
};

export default DrawBoard;
