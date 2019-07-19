export default {
    // 开始画线
    startLine(e) {
        console.log('touchstart', e);
        const data = this.data;
        const cvsCtx = data.plan.canvas;

        cvsCtx.setStrokeStyle('#fa8072');
        cvsCtx.setLineCap('round');
        cvsCtx.setLineWidth(2);
        cvsCtx.beginPath();
    },

    // 移动画线
    moveLine(e) {
        console.log('touchmove', e);
        const data = this.data;
        const cvsCtx = data.plan.canvas;
        
        cvsCtx.moveTo(data.startX, data.startY);
        cvsCtx.lineTo(data.moveX, data.moveY);
        cvsCtx.stroke();
        cvsCtx.draw(true);
        data.startX = data.moveX;
        data.startY = data.moveY;
    },

    renderLine() {
        const data = this.data;
        const cvsPlan = data.plan.canvas;
        cvsPlan.setStrokeStyle('#fa8072');
        cvsPlan.setLineCap('round');
        cvsPlan.setLineWidth(2);
        cvsPlan.moveTo(data.startX, data.startY);
        cvsPlan.stroke();
        cvsPlan.draw(true);
        cvsPlan.draw(true);
    },
}