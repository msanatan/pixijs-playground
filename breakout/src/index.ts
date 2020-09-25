import * as PIXI from 'pixi.js';

const canvas = <HTMLCanvasElement>document.getElementById('app');

const app = new PIXI.Application({
  view: canvas,
  width: 432,
  height: 768,
  backgroundColor: 0x2a164a,
  resolution: window.devicePixelRatio || 1,
  autoDensity: true,
  antialias: true,
});

