//index.js
//获取应用实例
const app = getApp()

import line from '../../mixins/line';
import rect from '../../mixins/rect';
import round from '../../mixins/round';

Page({
  mixins: [line, rect, round],
  data: {
    overlay: {
      canvas: null,
      width: 0,
      height: 0
    },
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
    moveX: null,
    moveY: null,
    toolData: {
      index: 0,
      tool: 'line',
      list: [
        {
          name: 'LINE',
          tool: 'line'
        },
        {
          name: 'RECT',
          tool: 'rect'
        },
        {
          name: 'ROUND',
          tool: 'round'
        },
      ]
    }
  },

  // 触摸开始
  touchstart(e) {
    const data = this.data;
    data.startX = e.changedTouches[0].x,
    data.startY = e.changedTouches[0].y;
    switch (data.toolData.tool) {
      case 'line':
        this.startLine(e);
        break;
      case 'rect':
        this.startRect(e);
        break;
      case 'round':
        this.startRound(e);
        break;

      default:
        break;
    }
  },

  // 手指触摸后移动
  touchmove(e) {
    const data = this.data;
    data.moveX = e.changedTouches[0].x,
    data.moveY = e.changedTouches[0].y;
    switch (data.toolData.tool) {
      case 'line':
        this.moveLine(e);
        break;
      case 'rect':
        this.moveRect(e);
        break;
      case 'round':
        this.moveRound(e);
        break;

      default:
        break;
    }
  },

  // 手指触摸动作结束
  touchend(e) {
    console.log('touchend', e);
    const data = this.data;
    const plan = data.plan;
    switch (data.toolData.tool) {
      case 'line':
        this.renderLine(e);
        break;
      case 'rect':
        this.renderRect(e);
        break;
      case 'round':
        this.renderRound(e);
        break;

      default:
        break;
    }
    this.resetData();
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
    }, this);
  },

  // 手指长按 500ms 之后触发，触发了长按事件后进行移动不会触发屏幕的滚动
  touchlongtap(e) {},

  // 手指触摸动作被打断，如来电提醒，弹窗
  touchcancel(e) {},

  // 当发生错误时触发 error 事件，detail = {errMsg}
  toucherror(e) {},

  changeTool(e) {
    const dataset = e.currentTarget.dataset;
    this.setData({
      'toolData.tool': dataset.tool,
      'toolData.index': dataset.index
    })
  },

  // 重置数据
  resetData() {
    const data = this.data;
    const cvsOverlay = data.overlay.canvas;
    cvsOverlay.clearRect(0, 0, data.overlay.width, data.overlay.height);
    cvsOverlay.closePath();
    cvsOverlay.draw();
    data.startX = 0;
    data.startY = 0;
    data.moveX = 0;
    data.moveY = 0;
    console.log('data', data);
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

  // 初始化面板
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
    })
  },

  // 初始化画板
  getCanvasOverlay() {
    const data = this.data;
    data.overlay.canvas = wx.createCanvasContext('canvasOverlay');

    // 获取canvas画板组件实例
    const query = wx.createSelectorQuery();
    query.select('.canvas-overlay').boundingClientRect();
    query.exec(res => {
      console.log('res', res);
      data.overlay.width = res[0].width;
      data.overlay.height = res[0].height;
      this.touchend();
    })
  },

  onLoad() {
    this.getCanvasBg();
    this.getCanvasPlan();
    this.getCanvasOverlay();
  }
})