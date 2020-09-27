import * as PIXI from 'pixi.js';
import * as WebFont from 'webfontloader';
import { renderHUD } from './hud';
import { playGame } from './game';

const width = 432;
const height = 768;
const canvas = <HTMLCanvasElement>document.getElementById('app');
const app = new PIXI.Application({
  view: canvas,
  width,
  height,
  backgroundColor: 0x2a164a,
  resolution: window.devicePixelRatio || 1,
  autoDensity: true,
  antialias: true,
});

/**
 * Resize function taken from https://medium.com/@michelfariarj/scale-a-pixi-js-game-to-fit-the-screen-1a32f8730e9c
 * @param app
 * @param baseWidth
 * @param baseHeight
 */
const resize = (app: PIXI.Application, baseWidth: number, baseHeight: number) => {
  const vpw = window.innerWidth;
  const vph = window.innerHeight;
  let nvw: number;
  let nvh: number;

  // If the screen's height-to-width aspect ratio is less than the game's ratio
  // then we make the game's new height equal to the viewport's height and scale
  // the new width
  if (vph / vpw < baseHeight / baseWidth) {
    nvh = vph;
    nvw = (nvh * baseWidth) / baseHeight;
  } else {
    // Otherwise, we let the game's new width be equal to the viewport's width
    // and scale it's height
    nvw = vpw;
    nvh = (nvw * baseHeight) / baseWidth;
  }

  // Make the game screen bigger
  app.renderer.resize(nvw, nvh);
  // Scale the game to main to originally desired aspect ratio
  app.stage.scale.set(nvw / baseWidth, nvh / baseHeight);
};

window.addEventListener('resize', () => {
  resize(app, width, height);
});

const webFontConfig: WebFont.Config = {
  custom: {
    families: ['Hikou Outline', 'Hikou Light'],
    urls: ['css/fonts.css']
  },
  active() {
    loadTextures();
  },
};

WebFont.load(webFontConfig);

const handleLoadComplete = () => {
  console.log('All textures loaded');
  // Setup the game
  init();
}

const handleLoadProgress = (loader, resource) => {
  console.debug(loader.progress + '% loaded');
};

const handleLoadError = (error) => {
  console.error(`encountered error loading: ${error}`);
};

const handleLoadAsset = (loader, resource) => {
  console.debug('asset loaded: ' + resource.name);
};

function loadTextures() {
  const loader = PIXI.Loader.shared;
  loader.onComplete.add(handleLoadComplete);
  loader.onLoad.add(handleLoadAsset);
  loader.onError.add(handleLoadError);
  loader.onProgress.add(handleLoadProgress);
  loader.add('player', './images/player.png')
    .add('ball', './images/ball.png')
    .add('brick1', './images/brick1.png')
    .add('brick2', './images/brick2.png')
    .load();
};

function init() {
  renderHUD(app, 3);
  playGame(app);
  // Resize after game elements are loaded
  resize(app, width, height);
};

