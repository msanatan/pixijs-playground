import * as PIXI from 'pixi.js';

export default class MovingSprite extends PIXI.Sprite {
  public vx: number = 0;
  public vy: number = 0;
  constructor(texture: PIXI.Texture) {
    super(texture);
  }
}
