import * as PIXI from 'pixi.js';
import { Brick2, Brick1 } from './brick';
import MovingSprite from './movingSprite';

export default class Game {
  private container: PIXI.Container;
  private app: PIXI.Application;
  private player: MovingSprite;
  private ball: MovingSprite;
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
    this.app = app;
    this._lives = 3;
    this._score = 0;
    // Add player
    this.player = new MovingSprite(PIXI.Texture.from('player'));
    this.player.x = (this.app.renderer.screen.width - this.player.width) / 2;
    this.player.y = this.app.renderer.screen.height - 50;

    // Add ball
    this.ball = new MovingSprite(PIXI.Texture.from('ball'));
    this.ball.x = (this.app.renderer.screen.width - this.ball.width) / 2;
    this.ball.y = this.app.renderer.screen.height - 75;

    // Add rows of bricks
    const bricks = new PIXI.Container();
    this.addBricks(bricks);

    this.container.addChild(this.player);
    this.container.addChild(this.ball);
    this.container.addChild(bricks);
    app.stage.addChild(this.container);
  }

  update(delta: number) {
    this.player.x += this.player.vx;
    this.ball.x += this.player.vx;
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
