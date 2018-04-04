var matterblockinggatetestState = {
    create: function() { 
        
        this.testbackground = game.add.sprite(0, 0, 'testbackground');
        this.testbackground.scale.x = 1.37;
        this.testbackground.scale.y = 1.6;
        
        //Create groups
        this.walls = game.add.group();
        this.bullets = game.add.group();
        this.enemies = game.add.group();
        this.colliders = game.add.group();
        this.switches = game.add.group();
        this.matterBlockers = game.add.group();
        this.buttons = game.add.group();
    
        //Walls and ground
        this.ground = this.walls.create(0, 0, 'ceiling');
        this.ground2 = this.walls.create(1000, 0, 'ceiling');
        this.ground4 = this.walls.create(0, 0, 'floor');
        this.ground3 = this.walls.create(0, 600, 'floor');
        
        this.game.world.bringToTop(this.walls);
        
        //Laser Switch
        this.switch1 = this.switches.create(410, 35, 'switch');
        this.switchOn = false;
        
        //Player Buttons
        this.button1 = this.buttons.create(250, 595, 'buttonGround');
        this.buttonBase1 = game.add.sprite(250, 595, 'buttonBase'); //Always place this under button. Its height is 5, so place it 5 + the height of its associated button.
        this.button1.anchor.setTo(0, 0);
        this.button1.scale.y = -1; //This was the only way I could figure out how to make the button's animation scale downward instead of up
        //this.buttonOn = false;
        
        //Matter blocking surfaces
        this.matterBlocker = this.matterBlockers.create(500, 16, 'matterblockerceiling');
        this.matterBlocker.scale.y = 1.5;
        this.matterBlocker.alpha = 0.5;
        
        this.player = game.add.sprite(200, 340, 'player');
        this.player.anchor.setTo(0.5, 0.5);
        
        this.raycast = game.add.sprite(0, 0, 'gun');
        this.raycast.anchor.setTo(0, 1);
        
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
        game.physics.arcade.enable(this.matterBlockers);
        game.physics.arcade.enable(this.buttons);
        this.game.physics.arcade.gravity.y = 470;
        
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
        
        //adjusting size of switch
        this.switch1.scale.y = 2;
        
        //Walls
        this.walls.enableBody = true;
        this.walls.physicsBodyType = Phaser.Physics.ARCADE;
        this.walls.setAll('body.immovable', true);
        this.walls.setAll('body.allowGravity', false);
        
        //Switches
        this.switches.enableBody = true;
        this.switches.physicsBodyType = Phaser.Physics.ARCADE;
        this.switches.setAll('body.immovable', true);
        this.switches.setAll('body.allowGravity', false);
        
        //Buttons
        this.buttons.enableBody = true;
        this.buttons.physicsBodyType = Phaser.Physics.ARCADE;
        this.buttons.setAll('body.immovable', true);
        this.buttons.setAll('body.allowGravity', false);
        
        //Matter blockers
        this.matterBlockers.enableBody = true;
        this.matterBlockers.physicsBodyType = Phaser.Physics.ARCADE;
        this.matterBlockers.setAll('body.immovable', 'true');
        this.matterBlockers.setAll('body.allowGravity', false);
        
        //Player speed
        this.playerVelocity = 80;
        //this.player.body.gravity.y = 10000;
        
        //Controls
        this.game.input.keyboard.addKeyCapture([
            Phaser.Keyboard.LEFT,
            Phaser.Keyboard.RIGHT,
            Phaser.Keyboard.UP,
            Phaser.Keyboard.DOWN,
            Phaser.Keyboard.W,
            Phaser.Keyboard.S,
            Phaser.Keyboard.A,
            Phaser.Keyboard.D
        ]);
        
        //Laser properties
        this.nextShotAt = 0;
        this.shotDelay = 300;
        this.bounces = 2;
        this.initialXPos = 0;
        this.initialYPos = 0;
        this.numLasers = 0;
        
        //Ricochet properties
        this.lastBounceX = this.player.x;
        this.lastBounceY = this.player.y;
        this.currBounceX = 0;
        this.currBounceY = 0;

        //Floor properties

        //Debugging shit
        //this.wallbounce1x = game.add.text(16, 75, '0', { fontSize: '20px', fill: '#ffffff' });
        //this.wallbounce1y = game.add.text(16, 100, '0', { fontSize: '20px', fill: '#ffffff' });
        
        //this.wallbounce2x = game.add.text(16, 125, '0', { fontSize: '20px', fill: '#ffffff' });
        //this.wallbounce2y = game.add.text(16, 150, '0', { fontSize: '20px', fill: '#ffffff' });
        
        

        var line1;
        var line2;
        var line3;
        
        this.exit = game.add.sprite(925, 300, 'exit');
        },

    update: function() {
        this.player.body.velocity.x = 0;
        
        this.raycast.x = this.player.x - 8;
        this.raycast.y = this.player.y - 15;
        
        //Adjust player's angle based on mouse movement
        this.raycast.rotation = game.physics.arcade.angleToPointer(this.raycast);
        
        this.game.physics.arcade.collide(this.player, this.walls);
        this.game.physics.arcade.collide(this.enemies, this.walls);
        this.game.physics.arcade.collide(this.bullets, this.walls, this.hitWall, null, this);
        this.game.physics.arcade.collide(this.bullets, this.enemies, this.hitEnemy, null, this);
        //Switch code
        this.game.physics.arcade.collide(this.bullets, this.switch1, this.activateSwitch1, null, this);
        this.game.physics.arcade.collide(this.player, this.matterBlockers);
        this.game.physics.arcade.collide(this.player, this.button1, this.activateButton1, null, this);
        
        //Victory      
        if (this.checkOverlap(this.player, this.exit)){
            this.playthemeOnce = false;
            this.winscreen = game.add.text(100, 250, 'AREA SECURED', { fontSize: '100px', fill: '#3366cc' });
            this.victory2.play('', 0, 0, false);
            game.add.tween(this.victory2).to({volume:1}, 600).start();
            game.add.tween(this.backgroundMusic).to({volume:0}, 1200).start();
            game.add.tween(this.arpeggio).to({volume:0}, 1200).start();
            this.victoryCondition = true;
            
        }
        
        if (this.victoryCondition = true){
            //if you win
        }
        
        
        //Flip Rick 
        if (game.input.mousePointer.x < this.player.x){
            this.raycast.x = this.player.x + 16;
            this.raycast.y = this.player.y - 20;
            this.player.scale.x = -1;
        }
        if (game.input.mousePointer.x > this.player.x){
            this.raycast.anchor.setTo(0, 1);
            this.raycast.scale.x = 1;
            this.player.scale.x = 1;
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
        

        if (this.sInputIsActive()) {
            
        }
        
        if (this.aInputIsActive()) {
            this.player.body.velocity.x = this.playerVelocity * -1;
        }
        
        if (this.dInputIsActive()) {
            this.player.body.velocity.x = this.playerVelocity;
        }
        
        //ON CLICK FIRE THE BULLET
        if (game.input.activePointer.isDown){
            this.fire();
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
    
    fire: function() {
         if (game.time.now > this.nextShotAt && this.bullets.countDead() > 0){
             game.add.tween(this.arpeggio).to({volume:1}, 1000).start();
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
             this.bounces = 2;
             if (game.input.mousePointer.x < this.player.x){
                this.bullet.reset(this.raycast.x - 5, this.raycast.y + 12);
             }
            if (game.input.mousePointer.x >= this.player.x){
                this.bullet.reset(this.raycast.x + 5, this.raycast.y - 12);
             }
             game.physics.arcade.moveToPointer(this.bullet, 300);
             this.lastBounceX = this.raycast.x;
             this.lastBounceY = this.raycast.y;
             //this.wallbounce1x.setText(this.player.x);
             //this.wallbounce1y.setText(this.player.y);
             
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
                this.createLine(this.line1);
                
                
            case 1:
                this.line2 = new Phaser.Line(this.lastBounceX, this.lastBounceY, this.currBounceX, this.currBounceY);
                this.createLine(this.line2);
                
            case 0:
                this.line3 = new Phaser.Line(this.lastBounceX, this.lastBounceY, this.currBounceX, this.currBounceY);
                this.createLine(this.line3);
                
                   

        }
        this.lastBounceX=this.currBounceX;
        this.lastBounceY=this.currBounceY;
        //this.wallbounce1x.setText(this.lastBounceX);
        //this.wallbounce1y.setText(this.lastBounceY);
        if (this.bounces == 2){
            this.bounce1.play('', 0, 1, false);
        }
        if (this.bounces == 1){
            this.bounce2.play('', 0, 1, false);
        }
        if (this.bounces > 0){
            this.bounces--;
        }
        else{
            this.bounce3.play('', 0, 1, false);
            game.add.tween(this.arpeggio).to({volume:0}, 1000).start();
            bullet.kill();
        }
    },
    
    createLine: function(line){
        //create sprite
        this.collider = game.add.sprite(this.lastBounceX, this.lastBounceY, 'collider');
        
        //set physics (Unaffected by gravity)
        game.physics.arcade.enable(this.collider);
        this.collider.body.allowGravity = false;
        this.collider.body.immovable = true;
        
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
    
    activateSwitch1: function(){
        this.bullets.callAll('kill'); //kill bullet once it hits switch
        game.add.tween(this.arpeggio).to({volume:0}, 1000).start();
        console.log("Switch Function");
        if (this.switchOn == false){   
            //Activation effect
        }
        
        else if (this.switchOn == true){
            //Activation effect
        }
        //console.log(this.switchOn);
    },
    
    //Button code
    activateButton1: function(){
        console.log("Button Function");
        var newTween = this.add.tween(this.button1.scale).to({ x: 1, y: 0}, 200);
        newTween.start();
        newTween.onComplete.add(this.killButton, this);
        

    },
    
    killButton: function() {
        this.button1.kill();
    },
    
    render: function() {
        //game.debug.geom(this.line1, '#FF0');
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
};
