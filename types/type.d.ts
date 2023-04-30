type Draw = {
	ctx: CanvasRenderingContext2D;
	currentPoint: Vec2;
	prevPoint: Vec2 | null;
};

type Vec2 = { x: number; y: number };
