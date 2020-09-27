import * as PIXI from 'pixi.js';

export const playGame = (app: PIXI.Application) => {
  // Create game container
  const gameContainer = new PIXI.Container();

  // Add player
  const player = new PIXI.Sprite(PIXI.Texture.from('player'));
  player.x = (app.renderer.screen.width - player.width) / 2;
  player.y = app.renderer.screen.height - 50;

  // Add ball
  const ball = new PIXI.Sprite(PIXI.Texture.from('ball'));
  ball.x = (app.renderer.screen.width - ball.width) / 2;
  ball.y = app.renderer.screen.height - 75;

  gameContainer.addChild(player);
  gameContainer.addChild(ball);
  app.stage.addChild(gameContainer);
};
