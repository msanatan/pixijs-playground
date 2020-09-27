import * as PIXI from 'pixi.js';

class Brick extends PIXI.Sprite {
  protected hitPoints: number;
  protected score: number;
  constructor(texture: PIXI.Texture) {
    super(texture);
  }
}

class Brick1 extends Brick {
  constructor() {
    super(PIXI.Texture.from('brick1'));
    this.hitPoints = 1;
    this.score = 5;
  }
}

class Brick2 extends Brick {
  constructor() {
    super(PIXI.Texture.from('brick2'));
    this.hitPoints = 2;
    this.score = 10;
  }
}

export {
  Brick1,
  Brick2
};
