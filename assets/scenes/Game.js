import {
  Player_Movements,
  shapeDelay,
  shapes,
  TRIANGULE,
  SQUARE,
  ROMBO,
} from "../../utils.js";

export default class Game extends Phaser.Scene {
  constructor() {
    // key of the scene
    // the key will be used to start the scene by other scenes
    super("game");
  }

  init() {
    let shapesRecolected = [
      { type: "triangule", count: 0 },
      { type: "square", count: 0 },
      { type: "rombo", count: 0 },
    ];
    // this is called before the scene is created
    // init variables
    // take data passed from other scenes
    // data object param {}
  }

  preload() {
    this.load.image("sky", "assets/images/Cielo.png");
    this.load.image("platform", "assets/images/platform.png");
    this.load.image("character", "assets/images/Ninja.png");
    this.load.image(TRIANGULE, "assets/images/Triangulo.png");
    this.load.image(SQUARE, "assets/images/Cuadrado.png");
    this.load.image(ROMBO, "assets/images/Rombo.png");
  }

  create() {
    this.add.image(400, 300, "sky").setScale(0.555);

    this.character = this.physics.add.sprite(400, 200, "character");
    this.character.setCollideWorldBounds(true);

    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(400, 580, "platform").setScale(2).refreshBody();

    this.shapes = this.physics.add.group();
    this.shapes.create(400, 0, TRIANGULE);
    this.shapes.create(200, 0, SQUARE);
    this.shapes.create(600, 0, ROMBO);

    this.physics.add.collider(this.character, this.platforms);

    this.physics.add.collider(this.shapes, this.platforms);

    this.physics.add.overlap(this.shapes, this.character);

    this.physics.add.overlap(
      this.character,
      this.shapes,
      this.collectShape,
      null,
      this
    );

    this.cursors = this.input.keyboard.createCursorKeys();

    this.time.addEvent({
      delay: shapeDelay,
      callback: this.addShape,
      callbackScope: this,
      loop: true,
    });
  }

  collectShape(character, shapes) {
    console.log("uwu");
    shapes.disableBody(true, true);
  }

  addShape() {
    const randomShape = Phaser.Math.RND.pick(shapes);

    const randomX = Phaser.Math.RND.between(0, 800);

    console.log(randomX, randomShape);

    this.shapes.create(randomX, 0, randomShape);

    console.log("figura", randomX, randomShape);
  }

  update() {
    if (this.cursors.left.isDown) {
      this.character.setVelocityX(-Player_Movements.x);
    } else if (this.cursors.right.isDown) {
      this.character.setVelocityX(Player_Movements.x);
    } else {
      this.character.setVelocityX(0);
    }

    if (this.cursors.up.isDown && this.character.body.touching.down) {
      this.character.setVelocityY(-Player_Movements.y);
    }
  }
}
