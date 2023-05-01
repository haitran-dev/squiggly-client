import { random } from 'utils/math';

export const drawPaper = ({ context }: { context: CanvasRenderingContext2D }): void => {
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
