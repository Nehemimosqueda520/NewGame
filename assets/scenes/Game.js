export default class Game extends Phaser.Scene {
    constructor() {
      // key of the scene
      // the key will be used to start the scene by other scenes
      super("game");
    }
  
    init() {
        let shapesRecolected = [
            { type: "triangule", count: 0}, 
            { type: "square",  count: 0},
            { type: "rombo", count: 0},
        ];
      // this is called before the scene is created
      // init variables
      // take data passed from other scenes
      // data object param {}
    }
  
    preload() {
      this.load.image('sky', 'assets/images/Cielo.png');
      this.load.image('platform', 'assets/images/platform.png');
      this.load.image('character', 'assets/images/Ninja.png');
      this.load.image('triangle', 'assets/images/Triangulo.png');
      this.load.image('square', 'assets/images/Cuadrado.png');
      this.load.image('rombo', 'assets/images/Rombo.png');
    }

    create() {
      this.add.image(400, 300, 'sky').setScale(0.555);
      
    
      this.character = this.physics.add.sprite(400, 200, 'character');
      this.character.setCollideWorldBounds(true);

      this.platforms = this.physics.add.staticGroup();
      this.platforms.create(400, 580, 'platform').setScale(2).refreshBody();

      this.shapes = this.physics.add.group();
      this.shapes.create (400, 0, 'triangle');
      this.shapes.create (200, 0, 'square');
      this.shapes.create (600, 0, 'rombo');

      this.physics.add.collider(this.character, this.platforms);

      this.physics.add.collider(this.shapes, this.platforms);

      this.physics.add.overlap(this.shapes, this.character);

      this.physics.add.overlap(this.character, this.shapes, this.collectShape, null, this);

      this.cursors = this.input.keyboard.createCursorKeys();
    }

    collectShape(character, shapes) {
        console.log("uwu")
        shapes.disableBody(true, true);
    }
  
    update() {
      if (this.cursors.left.isDown) {
        this.character.setVelocityX(-500);
      } else if (this.cursors.right.isDown) {
        this.character.setVelocityX(500);
      }else {
        this.character.setVelocityX(0);
      }

    }
  }
  