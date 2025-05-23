class Tesseract {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;

        this.vertices4D = [];
        this.initVertices();

        this.edges = this.initEdges();

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

        this.animate();
    }

    initVertices() {
        // dimension 16 vertices
        // 4D超立方体的顶点坐标
        for (let i = 0; i < 16; i++) {
            const x = ((i & 1) ? 1 : -1);
            const y = ((i & 2) ? 1 : -1);
            const z = ((i & 4) ? 1 : -1);
            const w = ((i & 8) ? 1 : -1);
            this.vertices4D.push([x, y, z, w]);
        }
    }

    initEdges() {
        const edges = [];
        for (let i = 0; i < 16; i++) {
            for (let j = i + 1; j < 16; j++) {
                let distance = 0;
                for (let k = 0; k < 4; k++) {
                    distance += Math.abs(this.vertices4D[i][k] - this.vertices4D[j][k]);
                }
                if (distance === 2) {
                    edges.push([i, j]);
                }
            }
        }
        return edges;
    }

    project4Dto3D(vertex4D) {
        const [x, y, z, w] = vertex4D;

        const cosXY = Math.cos(this.angleXY);
        const sinXY = Math.sin(this.angleXY);
        const cosZW = Math.cos(this.angleZW);
        const sinZW = Math.sin(this.angleZW);

        const x1 = x * cosXY - y * sinXY;
        const y1 = x * sinXY + y * cosXY;
        const z1 = z;
        const w1 = w;

        const x2 = x1;
        const y2 = y1;
        const z2 = z1 * cosZW - w1 * sinZW;
        const w2 = z1 * sinZW + w1 * cosZW;

        const factor = this.perspective4D / (this.perspective4D + w2);
        return [x2 * factor, y2 * factor, z2 * factor];
    }

    project3Dto2D(vertex3D) {
        let [x, y, z] = vertex3D;

        const cosX = Math.cos(this.angle3DX);
        const sinX = Math.sin(this.angle3DX);
        const cosY = Math.cos(this.angle3DY);
        const sinY = Math.sin(this.angle3DY);
        const cosZ = Math.cos(this.angle3DZ);
        const sinZ = Math.sin(this.angle3DZ);

        let y1 = y * cosX - z * sinX;
        let z1 = y * sinX + z * cosX;

        let x1 = x * cosY + z1 * sinY;
        z1 = -x * sinY + z1 * cosY;

        x = x1 * cosZ - y1 * sinZ;
        y = x1 * sinZ + y1 * cosZ;
        z = z1;

        const factor = this.perspective3D / (this.perspective3D + z + 200);
        const screenX = this.width / 2 + x * factor * 100;
        const screenY = this.height / 2 + y * factor * 100;

        return [screenX, screenY, z];
    }

    render() {
        this.ctx.clearRect(0, 0, this.width, this.height);

        const projectedVertices = this.vertices4D.map(v4d => {
            const v3d = this.project4Dto3D(v4d);
            return this.project3Dto2D(v3d);
        });

        this.ctx.strokeStyle = '#00ffff';
        this.ctx.shadowColor = '#00ffff';
        this.ctx.shadowBlur = 10;
        this.ctx.lineWidth = 2;

        this.edges.forEach(([i, j]) => {
            const [x1, y1, z1] = projectedVertices[i];
            const [x2, y2, z2] = projectedVertices[j];

            const avgZ = (z1 + z2) / 2;
            const alpha = Math.max(0.3, 1 - avgZ / 500);

            this.ctx.globalAlpha = alpha;
            this.ctx.beginPath();
            this.ctx.moveTo(x1, y1);
            this.ctx.lineTo(x2, y2);
            this.ctx.stroke();
        });

        this.ctx.globalAlpha = 1;
        this.ctx.fillStyle = '#ffaa00';
        this.ctx.shadowColor = '#ffaa00';
        this.ctx.shadowBlur = 15;

        projectedVertices.forEach(([x, y, z]) => {
            const radius = Math.max(3, 8 - z / 100);
            this.ctx.beginPath();
            this.ctx.arc(x, y, radius, 0, Math.PI * 2);
            this.ctx.fill();
        });

        this.ctx.shadowBlur = 0;
    }

    update() {
        if (this.animating) {
            this.angleXY += this.rotSpeed4DXY;
            this.angleZW += this.rotSpeed4DZW;
            this.angle3DX += this.rotSpeed3D * 0.7;
            this.angle3DY += this.rotSpeed3D * 0.5;
            this.angle3DZ += this.rotSpeed3D * 0.3;
        }
    }

    animate() {
        this.update();
        this.render();
        requestAnimationFrame(() => this.animate());
    }
}