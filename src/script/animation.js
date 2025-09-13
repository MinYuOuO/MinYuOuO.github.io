// Responsive 4D Tesseract canvas
class Tesseract {
    constructor() {
        this.canvas = document.getElementById('canvas');
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.vertices4D = [];
        this.edges = [];
        this.angleXY = 0;
        this.angleZW = 0;
        this.angle3DX = 0;
        this.angle3DY = 0;
        this.angle3DZ = 0;
        this.rotSpeed4DXY = 0.01;
        this.rotSpeed4DZW = 0.01;
        this.rotSpeed3D = 0.02;
        this.perspective4D = 4;
        this.perspective3D = 400;
        this.animating = true;

        this.initVertices();
        this.edges = this.initEdges();
        this.setCanvasSize();
        window.addEventListener('resize', () => this.setCanvasSize(), { passive: true });

        this.animate();
    }

    setCanvasSize() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const rect = this.canvas.parentElement.getBoundingClientRect();
        const w = Math.max(300, rect.width);
        const h = Math.max(240, rect.height);

        this.canvas.width = Math.floor(w * dpr);
        this.canvas.height = Math.floor(h * dpr);
        this.canvas.style.width = `${w}px`;
        this.canvas.style.height = `${h}px`;
        this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        this.width = w;
        this.height = h;
    }

    initVertices() {
        for (let i = 0; i < 16; i++) {
            const x = (i & 1) ? 1 : -1;
            const y = (i & 2) ? 1 : -1;
            const z = (i & 4) ? 1 : -1;
            const w = (i & 8) ? 1 : -1;
            this.vertices4D.push([x, y, z, w]);
        }
    }

    initEdges() {
        const edges = [];
        for (let i = 0; i < 16; i++) {
            for (let j = i + 1; j < 16; j++) {
                let dist = 0;
                for (let k = 0; k < 4; k++) dist += Math.abs(this.vertices4D[i][k] - this.vertices4D[j][k]);
                if (dist === 2) edges.push([i, j]);
            }
        }
        return edges;
    }

    project4Dto3D([x, y, z, w]) {
        const cosXY = Math.cos(this.angleXY), sinXY = Math.sin(this.angleXY);
        const cosZW = Math.cos(this.angleZW), sinZW = Math.sin(this.angleZW);

        const x1 = x * cosXY - y * sinXY;
        const y1 = x * sinXY + y * cosXY;
        const z1 = z, w1 = w;

        const z2 = z1 * cosZW - w1 * sinZW;
        const w2 = z1 * sinZW + w1 * cosZW;

        const factor = this.perspective4D / (this.perspective4D + w2);
        return [x1 * factor, y1 * factor, z2 * factor];
    }

    project3Dto2D([x, y, z]) {
        const cosX = Math.cos(this.angle3DX), sinX = Math.sin(this.angle3DX);
        const cosY = Math.cos(this.angle3DY), sinY = Math.sin(this.angle3DY);
        const cosZ = Math.cos(this.angle3DZ), sinZ = Math.sin(this.angle3DZ);

        let y1 = y * cosX - z * sinX;
        let z1 = y * sinX + z * cosX;
        let x1 = x * cosY + z1 * sinY;
        z1 = -x * sinY + z1 * cosY;

        const x2 = x1 * cosZ - y1 * sinZ;
        const y2 = x1 * sinZ + y1 * cosZ;

        const factor = this.perspective3D / (this.perspective3D + z1 + 200);
        const screenX = this.width / 2 + x2 * factor * 100;
        const screenY = this.height / 2 + y2 * factor * 100;
        return [screenX, screenY, z1];
    }

    render() {
        this.ctx.clearRect(0, 0, this.width, this.height);

        const projected = this.vertices4D.map(v4 => this.project3Dto2D(this.project4Dto3D(v4)));

        this.ctx.strokeStyle = '#00ffff';
        this.ctx.shadowColor = '#00ffff';
        this.ctx.shadowBlur = 10;
        this.ctx.lineWidth = 2;

        // edges
        this.edges.forEach(([i, j]) => {
            const [x1, y1, z1] = projected[i];
            const [x2, y2, z2] = projected[j];
            const avgZ = (z1 + z2) / 2;
            const alpha = Math.max(0.3, 1 - avgZ / 500);
            this.ctx.globalAlpha = alpha;
            this.ctx.beginPath();
            this.ctx.moveTo(x1, y1);
            this.ctx.lineTo(x2, y2);
            this.ctx.stroke();
        });

        // vertices
        this.ctx.globalAlpha = 1;
        this.ctx.fillStyle = '#ffaa00';
        this.ctx.shadowColor = '#ffaa00';
        this.ctx.shadowBlur = 15;
        projected.forEach(([x, y, z]) => {
            const r = Math.max(3, 8 - z / 100);
            this.ctx.beginPath();
            this.ctx.arc(x, y, r, 0, Math.PI * 2);
            this.ctx.fill();
        });
        this.ctx.shadowBlur = 0;
    }

    update() {
        if (!this.animating) return;
        this.angleXY += this.rotSpeed4DXY;
        this.angleZW += this.rotSpeed4DZW;
        this.angle3DX += this.rotSpeed3D * 0.7;
        this.angle3DY += this.rotSpeed3D * 0.5;
        this.angle3DZ += this.rotSpeed3D * 0.3;
    }

    animate() {
        this.update();
        this.render();
        requestAnimationFrame(() => this.animate());
    }
}

window.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('canvas')) new Tesseract();
});
