export class Circle {
	constructor(
		public x: number,
		public y: number,
		public dx: number,
		public dy: number,
		public radius: number,
		public color: string
	) {}

	draw(ctx: CanvasRenderingContext2D) {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		ctx.strokeStyle = this.color;
		ctx.stroke();
	}

	update(ctx: CanvasRenderingContext2D) {
		if (this.x + this.radius > ctx.canvas.width || this.x - this.radius < 0) {
			this.dx = -this.dx;
		}
		if (this.y + this.radius > ctx.canvas.height || this.y - this.radius < 0) {
			this.dy = -this.dy;
		}
		this.x += this.dx;
		this.y += this.dy;

		this.draw(ctx);
	}
}
