export default {
    // 开始画矩形
    startRect(e) {
        console.log('touchstart', e);
        const data = this.data;
        const cvsCtx = data.overlay.canvas;
        cvsCtx.setStrokeStyle('#fa8072');
        cvsCtx.setLineWidth(2);
        cvsCtx.beginPath();

    },

    // 移动画矩形
    moveRect(e) {
        console.log('touchmove', e);
        const data = this.data;
        const cvsCtx = data.overlay.canvas;
        cvsCtx.setStrokeStyle('#fa8072');
        cvsCtx.rect(data.startX, data.startY, data.moveX, data.moveY);
        cvsCtx.stroke();
        cvsCtx.draw(); 
    },

    renderRect() {
        const data = this.data;
        const cvsPlan = data.plan.canvas;
        if(data.moveX < 4 || data.moveY < 4) return
        cvsPlan.setStrokeStyle('#fa8072');
        cvsPlan.strokeRect(data.startX, data.startY, data.moveX, data.moveY);
        cvsPlan.draw(true);
    },
}