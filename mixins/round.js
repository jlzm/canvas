export default {
    startRound(e) {
        console.log('startRound', e);
        const data = this.data;
        const cvsOverlay = data.overlay.canvas;

        // cvsOverlay.setStrokeStyle('#fa8072');
        cvsOverlay.setLineWidth(2);
        cvsOverlay.beginPath();
    },

    moveRound(e) {
        console.log('moveRound', e);
        const data = this.data;
        const cvsOverlay = data.overlay.canvas;
        cvsOverlay.setStrokeStyle('#fa8072');
        cvsOverlay.arc(data.startX, data.startY, data.moveX || data.moveBy, 0, 2 * Math.PI);
        cvsOverlay.stroke();
        cvsOverlay.draw();

    },

    renderRound() {
        const data = this.data;
        const cvsPlan = data.plan.canvas;
        if(data.moveX < 4 || data.moveY < 4) return;
        cvsPlan.setStrokeStyle('#fa8072');
        cvsPlan.arc(data.startX, data.startY, data.moveX || data.moveBy, 0, 2 * Math.PI);;
        cvsPlan.stroke();
        cvsPlan.draw(true);
    }
}