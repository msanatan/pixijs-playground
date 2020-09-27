import * as PIXI from 'pixi.js';
import { Brick2, Brick1 } from './brick';

export default class Game {
  private container: PIXI.Container;
  private _lives: number;
  private _score: number;
  constructor() {
    this.container = new PIXI.Container();
  }

  get lives(): number {
    return this._lives;
  }

  get score(): number {
    return this._score;
  }

  init(app: PIXI.Application) {
    this._lives = 3;
    this._score = 0;
    // Add player
    const player = new PIXI.Sprite(PIXI.Texture.from('player'));
    player.x = (app.renderer.screen.width - player.width) / 2;
    player.y = app.renderer.screen.height - 50;

    // Add ball
    const ball = new PIXI.Sprite(PIXI.Texture.from('ball'));
    ball.x = (app.renderer.screen.width - ball.width) / 2;
    ball.y = app.renderer.screen.height - 75;

    // Add rows of bricks
    const bricks = new PIXI.Container();
    this.addBricks(bricks);

    this.container.addChild(player);
    this.container.addChild(ball);
    this.container.addChild(bricks);
    app.stage.addChild(this.container);
  }

  addBricks(container: PIXI.Container) {
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 4; j++) {
        const brick = j < 2 ? new Brick2() : new Brick1();
        brick.x = 25 + (i * 80);
        brick.y = 200 + (j * 100);
        container.addChild(brick);
      }
    }

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 3; j++) {
        const brick = j < 1 ? new Brick2() : new Brick1();
        brick.x = 65 + (i * 80);
        brick.y = 250 + (j * 100);
        container.addChild(brick);
      }
    }
  }
}
