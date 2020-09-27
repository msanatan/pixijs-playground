import * as PIXI from 'pixi.js';

export const renderHUD = (app: PIXI.Application, lives: number) => {
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
