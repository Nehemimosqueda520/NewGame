// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/

export default class MainMenu extends Phaser.Scene {
  constructor() {
    // key of the scene
    // the key will be used to start the scene by other scenes
    super("main-menu");
  }

  init() {
    // this is called before the scene is created
    // init variables
    // take data passed from other scenes
    // data object param {}
  }

  preload() {
    this.load.image('fondoMenu', 'assets/images/FondoMenu.jpg');
  }
  create() {
    // create game objects
    this.add.image(400, 300, 'fondoMenu');
  }

  update() {
    // update game objects
  }
}
