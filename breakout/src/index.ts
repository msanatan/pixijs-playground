import * as PIXI from 'pixi.js';
import * as WebFont from 'webfontloader';
import HUD from './hud';
import Game from './game';

let hud: HUD;
let game: Game;
const BASE_WIDTH = 432;
const BASE_HEIGHT = 768;

const canvas = <HTMLCanvasElement>document.getElementById('app');

const app = new PIXI.Application({
  view: canvas,
  width: BASE_WIDTH,
  height: BASE_HEIGHT,
  backgroundColor: 0x2a164a,
  resolution: window.devicePixelRatio || 1,
  autoDensity: true,
  antialias: true,
});

// Resize game at startup
resize(app, BASE_WIDTH, BASE_HEIGHT);

window.addEventListener('resize', () => {
  resize(app, BASE_WIDTH, BASE_HEIGHT);
});

const webFontConfig: WebFont.Config = {
  custom: {
    families: ['Hikou Outline', 'Hikou Light', 'Hikou Regular'],
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
    .add('heart', './images/heart.png')
    .load();
};

/**
 * Initializes the game
 */
function init() {
  game = new Game();
  game.init(app);
  hud = new HUD();
  hud.init(app, game.lives, game.score);
  // Start game loop
  app.ticker.add((delta: number) => {
    game.update(delta);
    hud.update(delta, game.lives, game.score);
  });
};

/**
 * Resizes PIXI application window
 * Taken from https://medium.com/@michelfariarj/scale-a-pixi-js-game-to-fit-the-screen-1a32f8730e9c
 * However, the scaling didn't work across devices
 * Resizing the canvas element was best, that's taken from
 * https://stackoverflow.com/questions/30554533/dynamically-resize-the-pixi-stage-and-its-contents-on-window-resize-and-window
 * @param app
 * @param width
 * @param height
 */
function resize(app: PIXI.Application, width: number, height: number) {
  const viewportWidth: number = window.innerWidth;
  const viewportHeight: number = window.innerHeight;
  let resizedWidth: number;
  let resizedHeight: number;

  // The aspect ratio is the ratio of the screen's sizes in different dimensions.
  // The height-to-width aspect ratio of the game is HEIGHT / WIDTH.
  if (viewportHeight / viewportWidth < height / width) {
    resizedHeight = viewportHeight;
    resizedWidth = (resizedHeight * width) / height;
  } else {
    resizedWidth = viewportWidth;
    resizedHeight = (resizedWidth * height) / width;
  }

  // Scale app for resized dimensions
  app.renderer.view.style.width = `${resizedWidth}px`;
  app.renderer.view.style.height = `${resizedHeight}px`;
};
