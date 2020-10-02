import * as PIXI from 'pixi.js';
import { Brick2, Brick1, Brick } from './brick';
import MovingSprite from './movingSprite';

export default class Game {
  private container: PIXI.Container;
  private app: PIXI.Application;
  private player: MovingSprite;
  private ball: MovingSprite;
  private bricks: PIXI.Container;
  private _lives: number;
  private _score: number;
  private gameStarted: boolean;
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
    this.gameStarted = false;
    // Add player
    this.player = new MovingSprite(PIXI.Texture.from('player'));
    this.player.x = (this.app.renderer.screen.width - this.player.width) / 2;
    this.player.y = this.app.renderer.screen.height - 50;

    // Add ball
    this.ball = new MovingSprite(PIXI.Texture.from('ball'));
    this.ball.x = (this.app.renderer.screen.width - this.ball.width) / 2;
    this.ball.y = this.app.renderer.screen.height - 75;

    // Add rows of bricks
    this.bricks = new PIXI.Container();
    this.addBricks(this.bricks);

    // Set up listener for click events
    this.app.renderer.plugins.interaction.on('pointerdown',
      (event: PIXI.InteractionEvent) => this.handlePointerDown(event));
    this.app.renderer.plugins.interaction.on('pointerup',
      (event: PIXI.InteractionEvent) => this.handlePointerUp(event));

    this.container.addChild(this.player);
    this.container.addChild(this.ball);
    this.container.addChild(this.bricks);
    app.stage.addChild(this.container);
  }

  handlePointerDown(event: PIXI.InteractionEvent) {
    if (!this.gameStarted) {
      this.gameStarted = true;
      this.ball.vy = -4;
      const ballVelocities = [-4, -3, -2, 2, 3, 4];
      const ballVelcotyIndex = Math.floor(Math.random() * 6);
      this.ball.vx = ballVelocities[ballVelcotyIndex];
      return;
    }

    const clickOnLeft = event.data.global.x <= this.app.renderer.screen.width / 2;
    if (clickOnLeft) {
      this.player.vx = -5;
    } else {
      this.player.vx = 5;
    }
  }

  handlePointerUp(event: PIXI.InteractionEvent) {
    this.player.vx = 0;
  }

  update(delta: number) {
    const playerBounds = this.player.getBounds();
    const ballBounds = this.ball.getBounds();

    // Move player
    if (this.player.vx < 0 && playerBounds.left > 0 ||
      this.player.vx > 0 && playerBounds.right < this.app.renderer.screen.width) {
      this.player.x += this.player.vx * delta;
    }

    // Ball collisions
    // World collision
    if (ballBounds.left <= 0 || ballBounds.right >= this.app.renderer.screen.width) {
      this.ball.vx = -this.ball.vx;
    }

    if (ballBounds.top <= this.container.getBounds().top) {
      this.ball.vy = -this.ball.vy;
    }

    // Brick collision
    this.bricks.children.forEach((brick: Brick) => {
      if (this.collide(ballBounds, brick.getBounds())) {
        // Remove one from the hitpoints
        brick.hit();
        // If a brick that's type Brick2 got hit, change it's texture
        if (brick.brickType === 'brick2') {
          brick.texture = PIXI.Texture.from('brick1');
        }

        // Add to score
        this._score += brick.score;

        // Change the ball velocity
        this.ball.vy = -this.ball.vy;
      }

      // Clean up breaks as we're looping through them
      if (brick.hitPoints === 0) {
        brick.destroy();
      }
    });

    // Player collision
    if (this.collide(ballBounds, playerBounds)) {
      this.ball.vy = -this.ball.vy;
    }

    // Move ball
    this.ball.x += this.ball.vx * delta;
    this.ball.y += this.ball.vy * delta;
  }

  collide(rect1: PIXI.Rectangle, rect2: PIXI.Rectangle) {
    return (
      rect1.x + rect1.width > rect2.x &&
      rect1.x < rect2.x + rect2.width &&
      rect1.y + rect1.height > rect2.y &&
      rect1.y < rect2.y + rect2.height
    );
  };

  addBricks(container: PIXI.Container) {
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 3; j++) {
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
