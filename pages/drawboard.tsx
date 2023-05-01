import { Canvas } from 'components/atoms/canvas';
import SignaturePad, { PointGroup } from 'package/SignaturePad/signature_pad';
import React from 'react';
import { random } from 'utils/math';

const DrawBoard = () => {
	const canvasRef = React.useRef<HTMLCanvasElement>(null);

	React.useEffect(() => {
		if (!canvasRef.current) return;
		const signaturePad = new SignaturePad(canvasRef.current);
	}, []);

	const draw = ({ context }: { context: CanvasRenderingContext2D }): void => {
		const strokeStyle = 'rgba(0, 0, 0, 0.072)';
		const spaceBetweenLine = 27;
		const windowHeight = window.innerHeight;
		const windowWidth = window.innerWidth;

		for (let i = 0; i < windowWidth - 20; i = i + spaceBetweenLine) {
			context.beginPath();
			context.moveTo(i, random(10, 20));
			context.strokeStyle = strokeStyle;
			context.lineWidth = 1;
			context.lineTo(i, windowHeight - random(10, 20));
			context.stroke();
		}

		for (let i = 0; i < windowHeight; i = i + spaceBetweenLine) {
			context.beginPath();
			context.moveTo(random(10, 20), i);
			context.strokeStyle = strokeStyle;
			context.lineWidth = 1;
			context.lineTo(windowWidth - random(10, 20), i);
			context.stroke();
		}
	};

	return (
		<Canvas draw={draw} ref={canvasRef}>
			Draw board
		</Canvas>
	);
};

export default DrawBoard;
