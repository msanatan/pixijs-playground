import * as PIXI from 'pixi.js';

class Brick extends PIXI.Sprite {
  protected _hitPoints: number;
  protected _score: number;
  protected _brickType: string;

  constructor(texture: PIXI.Texture) {
    super(texture);
  }

  get brickType(): string {
    return this._brickType;
  }


  get hitPoints(): number {
    return this._hitPoints;
  }

  get score(): number {
    return this._score;
  }

  hit(): void {
    this._hitPoints--;
  }
}

class Brick1 extends Brick {
  constructor() {
    super(PIXI.Texture.from('brick1'));
    this._hitPoints = 1;
    this._score = 5;
    this._brickType = 'brick1';
  }
}

class Brick2 extends Brick {
  constructor() {
    super(PIXI.Texture.from('brick2'));
    this._hitPoints = 2;
    this._score = 10;
    this._brickType = 'brick2';
  }
}

export {
  Brick,
  Brick1,
  Brick2
};
