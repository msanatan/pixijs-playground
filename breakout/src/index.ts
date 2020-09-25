import * as PIXI from 'pixi.js';
import * as WebFont from 'webfontloader';

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

const webFontConfig: WebFont.Config = {
  custom: {
    families: ['Hikou Outline', 'Hikou Light'],
    urls: ['css/fonts.css']
  },
  active() {
    init();
  },
};

WebFont.load(webFontConfig);

const renderHUD = (app: PIXI.Application, lives: number) => {
  const hudContainer: PIXI.Container = new PIXI.Container();
  const titleText = new PIXI.Text('Breakout', {
    fontFamily: 'Hikou Outline',
    fontSize: 100,
    fill: 'white',
    align: 'center',
  });
  titleText.anchor.set(0.5);
  titleText.position.set(app.renderer.screen.width / 2, 50);

  // Write HUD info
  const livesText = new PIXI.Text('Lives', {
    fontFamily: 'Hikou Light',
    fontSize: 20,
    fill: 'white',
    align: 'left',
  });
  livesText.anchor.set(0.5);
  livesText.position.set(35, 160);

  // TODO: draw heart sprites

  const scoreText = new PIXI.Text('Score', {
    fontFamily: 'Hikou Light',
    fontSize: 20,
    fill: 'white',
    align: 'left',
  });
  scoreText.anchor.set(0.5);
  scoreText.position.set(app.renderer.screen.width / 2, 160);

  // Draw horizontal line below HUD info
  const graphics = new PIXI.Graphics();
  graphics.lineStyle(2, 0xffffff, 1);
  graphics.moveTo(0, 180);
  graphics.lineTo(app.renderer.screen.width, 180);
  graphics.closePath();
  graphics.endFill();

  hudContainer.addChild(titleText);
  hudContainer.addChild(livesText);
  hudContainer.addChild(scoreText);
  hudContainer.addChild(graphics);
  app.stage.addChild(hudContainer);
};

function init() {
  renderHUD(app, 3);
}

