var level1State = {
    create: function() { 
        
        this.testbackground = game.add.sprite(0, 0, 'background1');
        this.testbackground.scale.x = 1.37;
        this.testbackground.scale.y = 1.6;
        
        //Create groups
        this.walls = game.add.group();
        this.bullets = game.add.group();
        this.enemyBullets = game.add.group();
        this.enemies = game.add.group();
        this.colliders = game.add.group();
        this.switches = game.add.group();
        this.deathLasers = game.add.group();
        
        this.ground = this.walls.create(0, 0, 'ceiling');
        this.ground2 = this.walls.create(1000, 0, 'ceiling');
        this.ground4 = this.walls.create(0, 0, 'floor');
        this.ground3 = this.walls.create(0, 600, 'floor');
        this.deathLaser1 = this.deathLasers.create(213, 0, 'deathLaserV');
        this.ground5 = this.walls.create(123, 470, 'floor');
        this.ground6 = this.walls.create(595, 0, 'ceiling');
        this.deathLaser2 = this.deathLasers.create(624, 367, 'deathLaserH');
        this.ground7 = this.walls.create(903, 367, 'floor');
        this.ground8 = this.walls.create(815, 480, 'floor');
        this.ground9 = this.walls.create(0, 350, 'floor');
        this.ground10 = this.walls.create(213, 280, 'ceiling');
        this.ground10.scale.y = 0.8;
        this.ground11 = this.walls.create(516, 238, 'floor');
        this.ground11.scale.x = 0.2;
        
        this.switch1 = this.switches.create(970, 170, 'switch');
        this.switch1.frame = 0;
        this.switch2 = this.switches.create(563, 180, 'switch');
        this.switch2.frame = 0;
        this.switchOn1 = false;
        this.switchOn2 = false;
        
        //player sprite
        //this.player = game.add.sprite(200, 340, 'player');
        //this.player.anchor.setTo(0.5, 0.5);
        
        this.player = this.game.add.sprite(50, 540, 'rick'); 
        //this.playerAnim.frame = 0;
        this.player.animations.add('walkRight', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], 20, true);
        this.player.animations.add('walkRightBack', [13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0], 20, true);
        this.player.animations.add('walkLeft', [20, 19, 18, 17, 16, 15, 14, 27, 26, 25, 24, 23, 22, 21], 20, true);
        this.player.animations.add('walkLeftBack', [21, 22, 23, 24, 25, 26, 27, 14, 15, 16, 17, 18, 19, 20], 20, true);
        
        this.door = game.add.sprite(900, 297, 'door');
        this.door.animations.add('doorOpen', [0, 1, 2, 3], 64, false);
        this.door.animations.add('doorClose', [3, 2, 1, 0], 64, false);
        
        this.deathLaser1.animations.add('active', [0, 1, 2, 3, 4, 5], 32, true);
        this.deathLaser2.animations.add('active2', [0, 1, 2, 3, 4, 5], 32, true);
        this.deathLaser1.alpha = 0.50;
        this.deathLaser2.alpha = 0.50;
        
        this.raycastRight = game.add.sprite(0, 0, 'rightArm');
        this.raycastRight.anchor.setTo(0, 0);
        this.raycastRight.frame = 0;
        this.raycastLeft = game.add.sprite(0, 0, 'leftArm');
        this.raycastLeft.anchor.setTo(0, 0);
        this.raycastLeft.frame = 0;
        
        this.enemiesLeft = 3;
        
        //this.enemy1 = this.enemies.create(800, 200, 'enemy');
        //this.enemy1.frame = 20;
        //this.enemyRightArm = game.add.sprite(800, 200, 'enemyRightArm');
        //this.enemyLeftArm = game.add.sprite(800, 200, 'enemyLeftArm');
        //this.enemyRightArm.frame = 1;
        //this.enemyRightArm.frame = 1;
        //this.enemy2 = this.enemies.create(300, 0, 'enemy');
        //this.enemy3 = this.enemies.create(50, 500, 'enemy');
        
        //Sounds
        this.backgroundMusic = game.add.audio('background');
        this.arpeggio = game.add.audio('arpeggio');
        this.bounce1 = game.add.audio('bounce1');
        this.bounce2 = game.add.audio('bounce2');
        this.bounce3 = game.add.audio('bounce3');
        this.enemydown1 = game.add.audio('3enemydown1');
        this.enemydown2 = game.add.audio('3enemydown2');
        this.enemydown3 = game.add.audio('3enemydown3');
        this.victory = game.add.audio('victory');
        this.victory2 = game.add.audio('victory2');
        this.hit = game.add.audio('rickHit');
        this.doorSound = game.add.audio('doorSound');
        this.switchOnSound = game.add.audio('switchOn');
        this.switchOffSound = game.add.audio('switchOff');
        
        this.backgroundMusic.play('', 0, 1, true);
        //this.backgroundMusic.onLoop.add(this.backgroundMusic, this);
        
        this.arpeggio.play('', 0, 0, true);
        //this.arpeggio.onLoop.add(this.arpeggio, this);
        this.playthemeOnce = true;
        
        //Physics
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.enable(this.walls);
        game.physics.arcade.enable(this.player);
        game.physics.arcade.enable(this.enemies);
        game.physics.arcade.enable(this.switches);
        game.physics.arcade.enable(this.deathLasers);
        this.game.physics.arcade.gravity.y = 470;
        
        //Switches
        this.switches.enableBody = true;
        this.switches.physicsBodyType = Phaser.Physics.ARCADE;
        this.switches.setAll('body.immovable', true);
        this.switches.setAll('body.allowGravity', false);
        
        //death lasers
        this.deathLasers.setAll('body.immovable', true);
        this.deathLasers.setAll('body.allowGravity', false);
        
        //Enemy physics
        //this.enemies.setAll('body.immovable', true);
        
        //Bullet physics
        this.bullets.enableBody = true;
        this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
        this.bullets.createMultiple(3, 'bullet');
        this.bullets.setAll('checkWorldBounds', true);
        this.bullets.setAll('outOfBoundsKill', true);
        this.bullets.setAll('body.allowGravity', false);
        this.bullets.setAll('anchor.x', 0.5);
        this.bullets.setAll('anchor.y', 0.5);
        
        this.enemyBullets.enableBody = true;
        this.enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
        this.enemyBullets.createMultiple(3, 'enemyBullet');
        this.enemyBullets.setAll('checkWorldBounds', true);
        this.enemyBullets.setAll('outOfBoundsKill', true);
        this.enemyBullets.setAll('body.allowGravity', false);
        this.enemyBullets.setAll('anchor.x', 0.5);
        this.enemyBullets.setAll('anchor.y', 0.5);
        
        /*this.colliders.enableBody = true;
        this.colliders.physicsBodyType = Phaser.Physics.ARCADE;
        this.colliders.createMultiple(3, 'collider');
        this.colliders.setAll('body.allowGravity', false);
        this.colliders.setAll('body.immovable', 'true');**/

        this.victoryCondition = false;
        
        //Player physics
        //this.player.body.allowRotation = false;
        
        //Adjusting size of walls to fit screen, I'm too lazy to make new ones
        this.ground.scale.x = 0.5;
        this.ground.scale.y = 1.535;
        this.ground2.scale.x = 0.5;
        this.ground2.scale.y = 1.535;
        
        //Adjusting size of ground to fit screen, I'm too lazy to make new ones
        this.ground3.scale.x = 2.535;
        this.ground3.scale.y = 0.5;
        this.ground4.scale.x = 2.535;
        this.ground4.scale.y = 0.5;
        this.ground5.scale.x = 0.3;
        this.ground5.scale.y = 1;
        this.ground7.scale.x = 0.3;
        this.ground8.scale.x = 0.5;
        this.ground9.scale.x = 0.3;
        
        this.deathLaser1.scale.y = 1.6;
        this.deathLaser2.scale.x = 0.7;
        
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
        this.playerTopPoint = game.add.sprite(this.player.x+30, this.player.y, 'sightPoint');
        this.playerMidPoint = game.add.sprite(this.player.x+30, this.player.y+28, 'sightPoint');
        this.playerBottomPoint = game.add.sprite(this.player.x+30, this.player.y+56, 'sightPoint');
        },

    update: function() {
        //console.log(this.rickDead);
        this.deathLaser1.animations.play('active');
        this.deathLaser2.animations.play('active2');
        
        if (this.switchOn1 == false){
            this.deathLaser1.x = 213;
            this.deathLaser1.y = 0;
        }
        
        if (this.switchOn2 == false){
            this.deathLaser2.x = 624;
            this.deathLaser2.y = 367;
        }
        
        //move sight points on player sprite
        this.playerTopPoint.x = this.player.x+30;
        this.playerTopPoint.y = this.player.y;
        this.playerMidPoint.x = this.player.x+28;
        this.playerMidPoint.y = this.player.y+28;
        this.playerBottomPoint.x = this.player.x+28;
        this.playerBottomPoint.y = this.player.y+56;
        
        this.player.body.velocity.x = 0;
        
        this.raycastRight.x = this.player.x+28;
        this.raycastRight.y = this.player.y+12;
        this.raycastLeft.x = this.player.x+28;
        this.raycastLeft.y = this.player.y+12;
        
        //Adjust player's angle based on mouse movement
        this.raycastRight.rotation = game.physics.arcade.angleToPointer(this.raycastRight);
        this.raycastLeft.rotation = game.physics.arcade.angleToPointer(this.raycastLeft);
        
        this.game.physics.arcade.collide(this.player, this.walls);
        //this.game.physics.arcade.collide(this.enemies, this.walls);
        this.game.physics.arcade.collide(this.bullets, this.walls, this.hitWall, null, this);
        //this.game.physics.arcade.collide(this.bullets, this.enemies, this.hitEnemy, null, this);
        //this.game.physics.arcade.collide(this.enemyBullets, this.player, this.hitRick, null, this);
        //this.game.physics.arcade.collide(this.enemyBullets, this.walls, this.killEnemyBullets, null, this);
        //this.game.physics.arcade.collide(this.player, this.colliders);
        this.game.physics.arcade.collide(this.bullets, this.switch1, this.activateSwitch1, null, this);
        this.game.physics.arcade.collide(this.bullets, this.switch2, this.activateSwitch2, null, this);
        this.game.physics.arcade.overlap(this.player, this.deathLasers, this.hitRick, null, this);
        this.game.physics.arcade.overlap(this.player, this.door, this.victoryCondition = true, null, this);

        if(this.switchOn1){
            this.switch1.frame = 1;
        }
        else{
            this.switch1.frame = 0;
        }
        
        if(this.switchOn2){
            this.switch2.frame = 1;
        }
        else{
            this.switch2.frame = 0;
        }
        
        /*
        //Check enemy's line of sight
        this.enemies.forEach(function(enemy) {
            //draw a line between enemy and Rick's midpoint
            if(enemy.alive && this.player.alive){
                this.ray = new Phaser.Line(enemy.x, enemy.y, this.playerMidPoint.x, this.playerMidPoint.y);
                //check if there's a wall in the way
                this.intersect = this.getWallIntersection(this.ray);
                if(this.intersect){
                    this.ray = new Phaser.Line(enemy.x, enemy.y, this.playerTopPoint.x, this.playerTopPoint.y);
                    this.intersect = this.getWallIntersection(this.ray);
                    if(this.intersect){
                        this.ray = new Phaser.Line(enemy.x, enemy.y, this.playerBottomPoint.x, this.playerBottomPoint.y);
                        this.intersect = this.getWallIntersection(this.ray);
                        if(this.intersect){
                            //console.log("out of sight");
                            return;
                        }
                        else{
                            //console.log("bottom");
                            this.enemyFire(enemy, this.playerBottomPoint);
                        }
                    }
                    else{
                        //console.log("top");
                        this.enemyFire(enemy, this.playerTopPoint);
                    }
                }
                else{
                    //console.log("middle");
                    //console.log(enemy.x);
                    //console.log(enemy.y);
                    this.enemyFire(enemy, this.playerMidPoint);
                }
            }
        }, this);
        
        //Victory
        if (this.enemiesLeft <= 0 && this.playthemeOnce == true){
            this.playthemeOnce = false;
            this.winscreen = game.add.text(100, 250, 'AREA SECURED', { fontSize: '100px', fill: '#3366cc' });
            this.victory2.play('', 0, 0, false);
            game.add.tween(this.victory2).to({volume:1}, 600).start();
            game.add.tween(this.backgroundMusic).to({volume:0}, 1200).start();
            game.add.tween(this.arpeggio).to({volume:0}, 1200).start();
            this.victoryCondition = true;
            
        }
        */
        
        if (this.enemiesLeft <= 0 && this.playthemeOnce == true){
            this.playthemeOnce = false;
            this.victory2.play('', 0, 0, false);
            game.add.tween(this.victory2).to({volume:1}, 600).start();
            game.add.tween(this.backgroundMusic).to({volume:0}, 1200).start();
            game.add.tween(this.arpeggio).to({volume:0}, 1200).start();
            this.victoryCondition = true;
            
        }
        
        if (this.victoryCondition == true){
            if (this.checkOverlap(this.player, this.door)){
                this.door.frame = 3;
                this.doorSound.play();
                game.add.tween(this.arpeggio).to({volume:0}, 1000).start();
                game.time.events.repeat(Phaser.Timer.SECOND * 2, 1, this.nextLevel, this);
            }
        }
        
        /*if (this.checkOverlap(this.player, this.door)){
            game.add.tween(this.arpeggio).to({volume:0}, 1000).start();
            game.add.tween(this.backgroundMusic).to({volume:0}, 1000).start();
            game.time.events.repeat(Phaser.Timer.SECOND * 2, 1, this.nextLevel, this);
        } **/
        
        if (this.checkOverlap(this.player, this.deathLaser1)){
            this.rickDead = true;
        }
        
        if (this.checkOverlap(this.player, this.deathLaser2)){
            this.rickDead = true;
        }
        
        //Flip Rick 
        if (game.input.mousePointer.x < this.player.x){
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
        else{
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
       if (this.upInputIsActive()) {
            
        }
        
        if (this.rightInputIsActive()) {
            
        }
    
        if (this.leftInputIsActive()) {
            
        }
        
        if (this.downInputIsActive()) {

        }
        
        if (this.wInputIsActive() && this.player.body.touching.down) {
            this.player.body.velocity.y = -350;
        }
        
        if(game.input.mousePointer.x >= this.player.x && !this.player.body.touching.down){
            this.player.frame = 28;
        }
        else if(game.input.mousePointer.x < this.player.x && !this.player.body.touching.down){
            this.player.frame = 29;
        }
        

        if (this.sInputIsActive()) {
            
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
        if (game.input.activePointer.isDown && !this.rickDead){
            this.fire();
        }
        
        if(this.rickDead){
            this.loseLevel;
        }
        
        //console.log(this.player.body.velocity.x);
        //console.log(this.player.body.velocity.y);
    },
    
    leftInputIsActive: function() {
        var isActive = false;
        
        isActive = this.input.keyboard.isDown(Phaser.Keyboard.LEFT);
        
        return isActive;
    },
    
    rightInputIsActive: function() {
        var isActive = false;
        
        isActive = this.input.keyboard.isDown(Phaser.Keyboard.RIGHT);
        
        return isActive;
    },
    
    upInputIsActive: function() {
        var isActive = false;
        
        isActive = this.input.keyboard.isDown(Phaser.Keyboard.UP);
        
        return isActive;
    },
    
    downInputIsActive: function() {
        var isActive = false;
        
        isActive = this.input.keyboard.isDown(Phaser.Keyboard.DOWN);
        
        return isActive;
        
    },
    
    wInputIsActive: function() {
        var isActive = false;
        
        isActive = this.input.keyboard.isDown(Phaser.Keyboard.W);
        
        return isActive;
    },
    
    sInputIsActive: function() {
        var isActive = false;
        
        isActive = this.input.keyboard.isDown(Phaser.Keyboard.S);
        
        return isActive;
    },
    
    aInputIsActive: function() {
        var isActive = false;
        
        isActive = this.input.keyboard.isDown(Phaser.Keyboard.A);
        
        return isActive;
    },
    
    dInputIsActive: function() {
        var isActive = false;
        
        isActive = this.input.keyboard.isDown(Phaser.Keyboard.D);
        
        return isActive;
    },
    
    rInputIsActive: function() {
        var isActive = false;
        
        isActive = this.input.keyboard.isDown(Phaser.Keyboard.R);
        
        return isActive;
    },
    
    fire: function() {
        //console.log("fire");
         if (game.time.now > this.nextShotAt && this.bullets.countDead() > 0){
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
             if (game.input.mousePointer.x < this.player.x){
                this.bullet.reset(this.raycastRight.x - 5, this.raycastRight.y + 12);
             }
            if (game.input.mousePointer.x >= this.player.x){
                this.bullet.reset(this.raycastRight.x + 5, this.raycastRight.y - 12);
             }
             game.physics.arcade.moveToPointer(this.bullet, 500);
             this.lastBounceX = this.raycastRight.x;
             this.lastBounceY = this.raycastRight.y;
             //this.wallbounce1x.setText(this.player.x);
             //this.wallbounce1y.setText(this.player.y);
             if (this.switchOn1 == true){
                 this.switchOn1 = false;
                 this.switchOffSound.play();
                 game.add.tween(this.arpeggio).to({volume:0}, 1000).start();

             }
             if (this.switchOn2 == true){
                 this.switchOn2 = false;
                 this.switchOffSound.play();
                 game.add.tween(this.arpeggio).to({volume:0}, 1000).start();
             }
         }
    },
    
    //kill bullet if it bounces more than three times against walls
    hitWall: function(bullet, wall) {
        this.currBounceX=bullet.x;
        this.currBounceY=bullet.y;
        //this.wallbounce2x.setText(this.currBounceX);
        //this.wallbounce2y.setText(this.currBounceY);

        switch(this.bounces) {
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
        this.lastBounceX=this.currBounceX;
        this.lastBounceY=this.currBounceY;
        //this.wallbounce1x.setText(this.lastBounceX);
        //this.wallbounce1y.setText(this.lastBounceY);
        if (this.bounces == 2){
            this.bounce1.play('', 0, 0.5, false);
        }
        if (this.bounces == 1){
            this.bounce2.play('', 0, 0.5, false);
        }
        if (this.bounces > 0){
            this.bounces--;
        }
        else{
            this.bounce3.play('', 0, 0.5, false);
            bullet.kill();
        }
    },
    
    /*
    enemyFire: function(enemy, playerPoint){
        if (game.time.now > this.nextEnemyShotAt && this.enemyBullets.countDead() > 0){
             this.nextEnemyShotAt = game.time.now + this.enemyShotDelay;
             this.enemyBullets.forEach(function (enemyBullet) {
                 enemyBullet.kill();
             }, this);
             this.enemyBullet = this.enemyBullets.getFirstDead();
             this.enemyBullet.body.immovable = true;
             this.enemyBullet.reset(enemy.x, enemy.y);
             this.game.physics.arcade.moveToXY(this.enemyBullet, playerPoint.x, playerPoint.y, 60, 1500);
         }
    },
    */
    
    createLine: function(line){
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
        this.lineWidth = Math.sqrt(Math.pow(this.currBounceX-this.lastBounceX, 2)+Math.pow(this.currBounceY-this.lastBounceY, 2), 2);
        this.collider.width = this.lineWidth;
        
        //vertical line from the bounce point to the lowest part of the line (allows us to find angle of line)
        this.vertical = this.currBounceY-this.lastBounceY;
        
        //find the angle
        this.angle = Math.asin(this.vertical/this.lineWidth);
        this.angle *= 180/Math.PI;
        
        //debugging
        //console.log(this.vertical);
        //console.log(this.lineWidth);
        //console.log(this.angle);
        
        //set the angle
        if(this.currBounceX < this.lastBounceX){
            this.collider.angle += (90 + (90-this.angle));
        }
        else{
            this.collider.angle += this.angle;
        }
        //this.collide.angle -= (90 + (90-this.angle));
        
        //add collider to group
        this.colliders.add(this.collider);
    },
    
    /*
    hitEnemy: function(){
        //Sound
        if (this.enemiesLeft == 3){
            this.enemydown1.play('', 0, 1, false);
        }
        if (this.enemiesLeft == 2){
            this.enemydown2.play('', 0, 1, false);
        }
        if (this.enemiesLeft == 1){
            this.enemydown3.play('', 0, 1, false);
        }
            
        for (i = 0; i < this.enemies.children.length; i++){
            if (this.checkOverlap(this.enemies.children[i], this.bullets)){
                this.enemies.children[i].kill();
                this.bullets.callAll('kill');
                this.enemiesLeft--;
            }
        }   
        game.add.tween(this.arpeggio).to({volume:0}, 1000).start();
    },
    */

    render: function() {
        /*this.blockingWalls.forEach(function(line) {
            game.debug.geom(line, '#FF0');
        }, this);
        this.blockingBeams.forEach(function(line) {
            game.debug.geom(line, '#FF0');
        }, this);**/
        //game.debug.geom(this.line2, '#FF0');
        //game.debug.geom(this.line3, '#FF0');
        //game.debug.soundInfo(this.backgroundMusic, 20, 32);
        //game.debug.soundInfo(this.arpeggio, 20, 200);

    },
    
    checkOverlap: function(spriteA, spriteB) {

        var boundsA = spriteA.getBounds();
        var boundsB = spriteB.getBounds();

        return Phaser.Rectangle.intersects(boundsA, boundsB);
    },
    
    activateSwitch1: function(){
        //console.log("Switch Function");
        if (this.switchOn1 == false){
            //console.log("Activate Switch");
            this.hitWall(this.bullet, this.switch1);
            this.bullet.kill();
            this.deathLaser1.x = 2000; //Send this out of bounds
            this.deathLaser1.y = 2000; //Send this out of bounds
            this.switchOn1 = true;
            this.switchOnSound.play();
            game.add.tween(this.arpeggio).to({volume:1}, 1000).start();
        }
        //console.log(this.switchOn);
    },
    
    activateSwitch2: function(){
        //console.log("Switch Function");
        if (this.switchOn2 == false){
            //console.log("Activate Switch");
            this.hitWall(this.bullet, this.switch2);
            this.bullet.kill();
            this.deathLaser2.x = 2000; //Send this out of bounds
            this.deathLaser2.y = 2000; //Send this out of bounds
            this.switchOn2 = true;
            this.switchOnSound.play();
            game.add.tween(this.arpeggio).to({volume:1}, 1000).start();
        }
        //console.log(this.switchOn);
    },
    
    hitRick: function(){
        //console.log("hit Rick");
        this.hit.play();
        this.player.kill();
        this.raycastRight.kill();
        this.raycastLeft.kill();
        this.playerTopPoint.kill();
        this.playerMidPoint.kill();
        this.playerBottomPoint.kill();
        this.rickDead = true;
        this.loseLevel();
    },
    
    doorOpen: function(){
        this.door.animations.play('doorOpen');
    },
    
    nextLevel: function(){
        game.add.tween(this.backgroundMusic).to({volume:0}, 1000).start();
        game.add.tween(this.arpeggio).to({volume:0}, 1000).start();
        this.backgroundMusic.stop();
        this.arpeggio.stop();
        game.state.start('level3');
    },
    
    loseLevel: function(){
        game.time.events.repeat(Phaser.Timer.SECOND * 2, 1, this.restartLevel, this);
        game.add.tween(this.backgroundMusic).to({volume:0}, 1000).start();
        game.add.tween(this.arpeggio).to({volume:0}, 1000).start();
        this.backgroundMusic.stop();
        this.arpeggio.stop();
    },
    
    restartLevel: function(){
        game.state.start('level1');
    },
};

