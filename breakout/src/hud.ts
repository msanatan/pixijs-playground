import * as PIXI from 'pixi.js';

export default class HUD {
  private container: PIXI.Container;
  constructor() {
    this.container = new PIXI.Container();
  }

  init(app: PIXI.Application, lives: number, score: number) {
    const titleText = new PIXI.Text('Breakout', {
      fontFamily: 'Hikou Outline',
      fontSize: 100,
      fill: 'white',
      align: 'center',
    });
    titleText.anchor.set(0.5);
    titleText.position.set(app.renderer.screen.width / 2, 50);

    // Write HUD info
    const livesText = new PIXI.Text('Lives:', {
      fontFamily: 'Hikou Light',
      fontSize: 20,
      fill: 'white',
      align: 'left',
    });
    livesText.anchor.set(0.5);
    livesText.position.set(35, 160);

    // Draw heart sprites
    for (let i = 0; i < lives; i++) {
      const heart = new PIXI.Sprite(PIXI.Texture.from('heart'));
      heart.position.set(livesText.getBounds().right + 10 + (i * 15), livesText.y);
      heart.scale.set(0.75, 0.75);
      heart.anchor.set(0.5);
      this.container.addChild(heart);
    }

    const scoreText = new PIXI.Text(`Score: ${score}`, {
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

    this.container.addChild(titleText);
    this.container.addChild(livesText);
    this.container.addChild(scoreText);
    this.container.addChild(graphics);
    app.stage.addChild(this.container);
  }
}
