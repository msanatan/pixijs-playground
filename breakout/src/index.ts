import * as PIXI from 'pixi.js';
import * as WebFont from 'webfontloader';
import { renderHUD } from './hud';
import { playGame } from './game';

const canvas = <HTMLCanvasElement>document.getElementById('app');

const app = new PIXI.Application({
  view: canvas,
  width: 432,
  height: 768,
  backgroundColor: 0x2a164a,
  resolution: window.devicePixelRatio || 1,
  autoDensity: true,
  antialias: true,
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
  // Run actual game
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
};

