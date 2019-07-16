//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    plan: {
      canvas: null,
      width: 0,
      height: 0
    },
    bg: {
      canvas: null,
      width: 0,
      height: 0
    },
    startX: null,
    startY: null,
    tool: 'line'
  },

  // 触摸开始
  touchstart(e) {
    switch (this.data.tool) {
      case 'line':
        this.startLine(e);
        break;
      case 'rect':
        // this.startLine(e);
        break;
      case 'round':
        // this.startLine(e);
        break;

      default:
        break;
    }
  },

  // 手指触摸后移动
  touchmove(e) {
    switch (this.data.tool) {
      case 'line':
        this.moveLine(e);
        break;
      case 'rect':
        // this.moveLine(e);
        break;
      case 'round':
        // this.moveLine(e);
        break;

      default:
        break;
    }
  },

  //手指触摸动作结束
  touchend(e) {
    console.log('touchend', e);
    const plan = this.data.plan;
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: plan.width,
      height: plan.height,
      destWidth: plan.width,
      destHeight: plan.height,
      canvasId: 'canvasPlan',
      fileType: 'png',
      quality: 1.0,
      success: (res) => {
        console.log('res', res);
      },
      fail: () => {},
      complete: () => {}
    }, this);
  },

  // 手指触摸后移动
  touchlongtap(e) {},

  // 手指触摸动作被打断，如来电提醒，弹窗
  touchcancel(e) {},

  // 当发生错误时触发 error 事件，detail = {errMsg}
  toucherror(e) {},

  // 开始画线
  startLine(e) {
    const data = this.data;
    console.log('touchstart', e);
    data.startX = e.changedTouches[0].x,
      data.startY = e.changedTouches[0].y;

    const cvsCtx = data.plan.canvas;

    cvsCtx.setStrokeStyle('#fa8072');
    cvsCtx.setLineWidth(2);
    cvsCtx.setLineCap('round');
    cvsCtx.beginPath();
  },

  // 移动画线
  moveLine(e) {
    const data = this.data;
    console.log('touchmove', e);
    let moveX = e.changedTouches[0].x,
      moveY = e.changedTouches[0].y;

    const cvsCtx = data.plan.canvas;
    cvsCtx.moveTo(data.startX, data.startY);
    cvsCtx.lineTo(moveX, moveY);
    cvsCtx.stroke();
    cvsCtx.draw(true);
    data.startX = moveX;
    data.startY = moveY;
  },

  changeTool(e) {
    const dataset = e.currentTarget.dataset;
    this.setData({
      tool: dataset.tool
    })
  },

  // 撤销操作
  cancelOperating() {
    const data = this.data;
    const cvsCtx = data.plan.canvas;

    cvsCtx.draw();
  },

  // 清除画板
  clearPlan() {
    const data = this.data;
    const cvsCtx = data.plan.canvas;
    cvsCtx.clearRect(0, 0, data.plan.width, data.plan.height);
    cvsCtx.draw();
  },

  // 初始化画板背景
  getCanvasBg() {
    const data = this.data;
    data.bg.canvas = wx.createCanvasContext('canvasBg');

    // 获取canvas背景组件实例
    const query = wx.createSelectorQuery();
    query.select('.canvas-bg').boundingClientRect();
    query.exec(res => {
      console.log('res', res);
      data.bg.width = res[0].width;
      data.bg.height = res[0].height;

      const cvsCtx = data.bg.canvas;
      console.log(data.bg.width, data.bg.height);
      cvsCtx.drawImage('../../imgs/cat_1.jpg', 0, 0, data.bg.width, data.bg.height);
      cvsCtx.draw();
    })
  },

  // 初始化画板
  getCanvasPlan() {
    const data = this.data;
    data.plan.canvas = wx.createCanvasContext('canvasPlan');

    // 获取canvas画板组件实例
    const query = wx.createSelectorQuery();
    query.select('.canvas-plan').boundingClientRect();
    query.exec(res => {
      console.log('res', res);
      data.plan.width = res[0].width;
      data.plan.height = res[0].height;
      this.touchend();
    })
  },

  onLoad() {
    this.getCanvasBg();
    this.getCanvasPlan();
  }
})