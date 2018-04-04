/**
 * Created by Isaak on 12/9/16.
 */
var openingState = {
    create: function () {

        this.background = game.add.sprite(0, 0, 'elevatorBackground');
        this.background.scale.x = (1016/1920);
        this.background.scale.y = (616/1080);
        
        this.elevatorWall = game.add.sprite(420, 200, 'elevatorWall');

//Create groups
        this.walls = game.add.group();
        this.bullets = game.add.group();
        this.colliders = game.add.group();

        this.ground = this.walls.create(583, 225, 'ceiling');
        this.ground2 = this.walls.create(415, 225, 'ceiling');
        this.ground3 = this.walls.create(415, 193, 'floor');
        this.ground4 = this.walls.create(415, 384, 'floor');

        this.ground.scale.y = 0.4;
        this.ground2.scale.y = 0.4;
        this.ground3.scale.x = 0.5;
        this.ground4.scale.x = 0.5;
        
        this.game.world.bringToTop(this.walls);
        
        this.elevatorCable = game.add.sprite(465, 0, 'elevatorCable');

//player sprite
//this.player = game.add.sprite(200, 340, 'player');
//this.player.anchor.setTo(0.5, 0.5);

        this.player = this.game.add.sprite(500, 320, 'rick');
//this.playerAnim.frame = 0;
        this.player.animations.add('walkRight', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], 20, true);
        this.player.animations.add('walkRightBack', [13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0], 20, true);
        this.player.animations.add('walkLeft', [20, 19, 18, 17, 16, 15, 14, 27, 26, 25, 24, 23, 22, 21], 20, true);
        this.player.animations.add('walkLeftBack', [21, 22, 23, 24, 25, 26, 27, 14, 15, 16, 17, 18, 19, 20], 20, true);

        this.raycastRight = game.add.sprite(0, 0, 'rightArm');
        this.raycastRight.anchor.setTo(0, 0);
        this.raycastRight.frame = 0;
        this.raycastLeft = game.add.sprite(0, 0, 'leftArm');
        this.raycastLeft.anchor.setTo(0, 0);
        this.raycastLeft.frame = 0;


//Sounds
        this.backgroundMusic = game.add.audio('background');
        this.arpeggio = game.add.audio('arpeggio');
        this.bounce1 = game.add.audio('bounce1');
        this.bounce2 = game.add.audio('bounce2');
        this.bounce3 = game.add.audio('bounce3');
        this.victory = game.add.audio('victory');
        this.victory2 = game.add.audio('victory2');
        this.hit = game.add.audio('rickHit');

        this.backgroundMusic.play('', 0, 1, true);
//this.backgroundMusic.onLoop.add(this.backgroundMusic, this);

        this.arpeggio.play('', 0, 0, true);
//this.arpeggio.onLoop.add(this.arpeggio, this);
        this.playthemeOnce = true;

//Physics
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.enable(this.walls);
        game.physics.arcade.enable(this.player);
        this.game.physics.arcade.gravity.y = 470;

//Bullet physics
        this.bullets.enableBody = true;
        this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
        this.bullets.createMultiple(3, 'bullet');
        this.bullets.setAll('checkWorldBounds', true);
        this.bullets.setAll('outOfBoundsKill', true);
        this.bullets.setAll('body.allowGravity', false);
        this.bullets.setAll('anchor.x', 0.5);
        this.bullets.setAll('anchor.y', 0.5);

        this.victoryCondition = false;


//Walls
        this.walls.enableBody = true;
        this.walls.physicsBodyType = Phaser.Physics.ARCADE;
        this.walls.setAll('body.immovable', true);
        this.walls.setAll('body.allowGravity', false);


        this.playerVelocity = 100;
//this.player.body.gravity.y = 10000;

        this.game.input.keyboard.addKeyCapture([
            Phaser.Keyboard.LEFT,
            Phaser.Keyboard.RIGHT,
            Phaser.Keyboard.UP,
            Phaser.Keyboard.DOWN,
            Phaser.Keyboard.W,
            Phaser.Keyboard.S,
            Phaser.Keyboard.A,
            Phaser.Keyboard.D,
            Phaser.Keyboard.R
        ]);

//Laser properties
        this.nextShotAt = 0;
        this.shotDelay = 300;
        this.bounces = 2;
        this.initialXPos = 0;
        this.initialYPos = 0;
        this.numLasers = 0;

//enemy properties
        this.nextEnemyShotAt = 0;
        this.enemyShotDelay = 3000;

//Ricochet properties
        this.lastBounceX = this.player.x;
        this.lastBounceY = this.player.y;
        this.currBounceX = 0;
        this.currBounceY = 0;

        this.rickDead = false;

//Floor properties

//Debugging shit
//this.wallbounce1x = game.add.text(16, 75, '0', { fontSize: '20px', fill: '#ffffff' });
//this.wallbounce1y = game.add.text(16, 100, '0', { fontSize: '20px', fill: '#ffffff' });

//this.wallbounce2x = game.add.text(16, 125, '0', { fontSize: '20px', fill: '#ffffff' });
//this.wallbounce2y = game.add.text(16, 150, '0', { fontSize: '20px', fill: '#ffffff' });


        var line1;
        var line2;
        var line3;

//points on player for enemies to shoot at
        this.playerTopPoint = game.add.sprite(this.player.x + 30, this.player.y, 'sightPoint');
        this.playerMidPoint = game.add.sprite(this.player.x + 30, this.player.y + 28, 'sightPoint');
        this.playerBottomPoint = game.add.sprite(this.player.x + 30, this.player.y + 56, 'sightPoint');


        game.time.events.add(1000, this.dialog, this);
        game.time.events.add(6000, this.dialog2, this);
        game.time.events.add(11000, this.dialog3, this);
        game.time.events.add(16000, this.startGame, this);


    },


    update: function () {

        //move sight points on player sprite
        this.playerTopPoint.x = this.player.x + 30;
        this.playerTopPoint.y = this.player.y;
        this.playerMidPoint.x = this.player.x + 28;
        this.playerMidPoint.y = this.player.y + 28;
        this.playerBottomPoint.x = this.player.x + 28;
        this.playerBottomPoint.y = this.player.y + 56;

        this.player.body.velocity.x = 0;

        this.raycastRight.x = this.player.x + 28;
        this.raycastRight.y = this.player.y + 12;
        this.raycastLeft.x = this.player.x + 28;
        this.raycastLeft.y = this.player.y + 12;

        //Adjust player's angle based on mouse movement
        this.raycastRight.rotation = game.physics.arcade.angleToPointer(this.raycastRight);
        this.raycastLeft.rotation = game.physics.arcade.angleToPointer(this.raycastLeft);

        this.game.physics.arcade.collide(this.player, this.walls);
        this.game.physics.arcade.collide(this.bullets, this.walls, this.hitWall, null, this);


        //Flip Rick
        if (game.input.mousePointer.x < this.player.x) {
            this.raycastRight.frame = 1;
            this.raycastLeft.frame = 1;
            this.raycastRight.x = this.player.x + 35;
            this.raycastRight.y = this.player.y + 11;
            this.raycastLeft.x = this.player.x + 35;
            this.raycastLeft.y = this.player.y + 11;
            this.raycastRight.anchor.setTo(0.1, 0.9);
            this.raycastLeft.anchor.setTo(0.1, 0.9);
            this.game.world.bringToTop(this.raycastLeft);
        }
        else {
            this.raycastRight.frame = 0;
            this.raycastLeft.frame = 0;
            this.raycastRight.anchor.setTo(0.1, 0.1);
            //this.raycastRight.scale.x = 1;
            this.raycastLeft.anchor.setTo(0.1, 0.1);
            //this.raycastLeft.scale.x = 1;
            this.game.world.bringToTop(this.player);

            this.game.world.bringToTop(this.raycastRight);
        }


        //KEYBOARD CONTROLS

        if (this.wInputIsActive() && this.player.body.touching.down) {
            this.player.body.velocity.y = -350;
        }

        if (this.wInputIsActive() && this.player.body.touching.down) {
            this.player.body.velocity.y = -350;
        }
        
        if(game.input.mousePointer.x >= this.player.x && !this.player.body.touching.down){
            this.player.frame = 28;
            if (this.aInputIsActive()) {
                this.player.body.velocity.x = this.playerVelocity * -1;
            }
            else if (this.dInputIsActive()) {
                this.player.body.velocity.x = this.playerVelocity * 1;
            }
        }
        else if(game.input.mousePointer.x < this.player.x && !this.player.body.touching.down){
            this.player.frame = 29;
            if (this.aInputIsActive()) {
                this.player.body.velocity.x = this.playerVelocity * -1;
            }
            else if (this.dInputIsActive()) {
                this.player.body.velocity.x = this.playerVelocity * 1;
            }
        }
        else if (this.aInputIsActive()) {
            this.player.body.velocity.x = this.playerVelocity * -1;
            if (game.input.mousePointer.x >= this.player.x){
                this.player.animations.play('walkRightBack');
            }
            else{
               this.player.animations.play('walkLeft'); 
            }
        }
        
        else if (this.dInputIsActive()) {
            this.player.body.velocity.x = this.playerVelocity;
            if (game.input.mousePointer.x >= this.player.x){
                this.player.animations.play('walkRight');
            }
            else{
                this.player.animations.play('walkLeftBack');
            }
        }
        else{
            this.player.animations.stop('walkLeft');
            this.player.animations.stop('walkRight');
            this.player.animations.stop('walkLeftBack');
            this.player.animations.stop('walkRightBack');
            if (game.input.mousePointer.x >= this.player.x){
                this.player.frame = 0;
            }
            else{
                this.player.frame = 20;
            }
        }

        if (this.rInputIsActive()) {
            this.loseLevel();
        }

        //ON CLICK FIRE THE BULLET
        if (game.input.activePointer.isDown && !this.rickDead) {
            this.fire();
        }


        //console.log(this.player.body.velocity.x);
        //console.log(this.player.body.velocity.y);
    },

    wInputIsActive: function () {
        var isActive = false;

        isActive = this.input.keyboard.isDown(Phaser.Keyboard.W);

        return isActive;
    },

    sInputIsActive: function () {
        var isActive = false;

        isActive = this.input.keyboard.isDown(Phaser.Keyboard.S);

        return isActive;
    },

    aInputIsActive: function () {
        var isActive = false;

        isActive = this.input.keyboard.isDown(Phaser.Keyboard.A);

        return isActive;
    },

    dInputIsActive: function () {
        var isActive = false;

        isActive = this.input.keyboard.isDown(Phaser.Keyboard.D);

        return isActive;
    },

    rInputIsActive: function () {
        var isActive = false;

        isActive = this.input.keyboard.isDown(Phaser.Keyboard.R);

        return isActive;
    },

    fire: function () {
        //console.log("fire");
        if (game.time.now > this.nextShotAt && this.bullets.countDead() > 0) {
            this.nextShotAt = game.time.now + this.shotDelay;
            this.bullets.forEach(function (bullet) {
                bullet.kill();
            }, this);
            this.colliders.forEach(function (collider) {
                collider.kill();
            }, this);
            this.bullet = this.bullets.getFirstDead();
            this.bullet.body.bounce.setTo(1, 1);
            this.bullet.body.setSize(1, 1, 0, 0);
            this.bullet.scale.x = 0.6;
            this.bullet.scale.y = 0.6;
            this.bounces = 2;
            if (game.input.mousePointer.x < this.player.x) {
                this.bullet.reset(this.raycastRight.x - 5, this.raycastRight.y + 12);
            }
            if (game.input.mousePointer.x >= this.player.x) {
                this.bullet.reset(this.raycastRight.x + 5, this.raycastRight.y - 12);
            }
            game.physics.arcade.moveToPointer(this.bullet, 500);
            this.lastBounceX = this.raycastRight.x;
            this.lastBounceY = this.raycastRight.y;
            //this.wallbounce1x.setText(this.player.x);
            //this.wallbounce1y.setText(this.player.y);
            if (this.switchOn1 == true) {
                this.switchOn1 = false;
                this.switchOffSound.play();
                game.add.tween(this.arpeggio).to({volume: 0}, 1000).start();

            }
            if (this.switchOn2 == true) {
                this.switchOn2 = false;
                this.switchOffSound.play();
                game.add.tween(this.arpeggio).to({volume: 0}, 1000).start();
            }
        }
    },

//kill bullet if it bounces more than three times against walls
    hitWall: function (bullet, wall) {
        this.currBounceX = bullet.x;
        this.currBounceY = bullet.y;
        //this.wallbounce2x.setText(this.currBounceX);
        //this.wallbounce2y.setText(this.currBounceY);

        switch (this.bounces) {
            case 2:
                this.line1 = new Phaser.Line(this.lastBounceX, this.lastBounceY, this.currBounceX, this.currBounceY);
                this.blockingBeam1 = this.line1;
                this.createLine(this.line1);
            //this.blockingBeams.push(this.blockingBeam1);

            case 1:
                this.line2 = new Phaser.Line(this.lastBounceX, this.lastBounceY, this.currBounceX, this.currBounceY);
                this.blockingBeam2 = this.line2;
                this.createLine(this.line2);
            //this.blockingBeams.push(this.blockingBeam2);

            case 0:
                this.line3 = new Phaser.Line(this.lastBounceX, this.lastBounceY, this.currBounceX, this.currBounceY);
                this.blockingBeam3 = this.line3;
                this.createLine(this.line3);
            //this.blockingBeams.push(this.blockingBeam3);


        }
        this.lastBounceX = this.currBounceX;
        this.lastBounceY = this.currBounceY;
        //this.wallbounce1x.setText(this.lastBounceX);
        //this.wallbounce1y.setText(this.lastBounceY);
        if (this.bounces == 2) {
            this.bounce1.play('', 0, 0.5, false);
        }
        if (this.bounces == 1) {
            this.bounce2.play('', 0, 0.5, false);
        }
        if (this.bounces > 0) {
            this.bounces--;
        }
        else {
            this.bounce3.play('', 0, 0.5, false);
            bullet.kill();
        }
    },

    createLine: function (line) {
        //create sprite
        this.collider = game.add.sprite(this.lastBounceX, this.lastBounceY, 'collider');

        //set physics (Unaffected by gravity)
        game.physics.arcade.enable(this.collider);
        this.collider.body.allowGravity = false;
        this.collider.body.immovable = true;
        //this.collider.body.checkCollision.left = false;
        //this.collider.body.checkCollision.right = false;
        //this.collider.body.checkCollision.down = false;

        //set line width (distance between bounce points
        this.lineWidth = Math.sqrt(Math.pow(this.currBounceX - this.lastBounceX, 2) + Math.pow(this.currBounceY - this.lastBounceY, 2), 2);
        this.collider.width = this.lineWidth;

        //vertical line from the bounce point to the lowest part of the line (allows us to find angle of line)
        this.vertical = this.currBounceY - this.lastBounceY;

        //find the angle
        this.angle = Math.asin(this.vertical / this.lineWidth);
        this.angle *= 180 / Math.PI;

        //debugging
        //console.log(this.vertical);
        //console.log(this.lineWidth);
        //console.log(this.angle);

        //set the angle
        if (this.currBounceX < this.lastBounceX) {
            this.collider.angle += (90 + (90 - this.angle));
        }
        else {
            this.collider.angle += this.angle;
        }
        //this.collide.angle -= (90 + (90-this.angle));

        //add collider to group
        this.colliders.add(this.collider);
    },


    checkOverlap: function (spriteA, spriteB) {

        var boundsA = spriteA.getBounds();
        var boundsB = spriteB.getBounds();

        return Phaser.Rectangle.intersects(boundsA, boundsB);
    },
    dialog: function () {
        this.textBox = game.add.text(0, 0,"Hey Rick, it looks like you got into the test labs okay." +
            " And you’ve already got the device! Excellent!",
            {font: '30px Courier', fill: "#ffffff"});
    },
    dialog2: function () {
        this.textBox.text = "Have you gotten a chance to test it out yet? " +
            "\nIt might be helpful in getting back out of the place, " +
            "\nso you should probably learn how to use it soon.";
    },
    dialog3: function () {
        this.textBox.text = "Try to make it back in one piece… But more importantly, " +
            "\nany damage to the device will be docked from your pay.";
    },
    startGame: function() {
        game.state.start('level0');
    }
}