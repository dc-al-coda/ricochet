var endState = {
    create: function(){
        this.bg = game.add.sprite(0, 0, 'ending1');
        this.bg.scale.x = 0.53;
        this.bg.scale.y = 0.58;
        
        this.playerBody = game.add.sprite(50, 270, 'rick');
        this.playerLeftArm = game.add.sprite(this.playerBody.x + 28, this.playerBody.y+12, 'leftArm');
        this.playerRightArm = game.add.sprite(this.playerBody.x + 28, this.playerBody.y+12, 'rightArm');
        
        this.playerBody.animations.add('walk', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], 20, true);
        
        this.player = game.add.group();
        this.player.add(this.playerBody);
        this.player.add(this.playerLeftArm);
        this.player.add(this.playerRightArm);
        
        game.physics.arcade.enable(this.player);
        this.player.setAll('body.immovable', true);
        this.player.setAll('body.allowGravity', false);
        
        this.player.scale.x = 1.75;
        this.player.scale.y = 1.75;
        
        this.shot = game.add.audio('enemyShot');
        this.hit = game.add.audio('rickHit');
        
        game.time.events.add(1000, this.dialog, this);
    },
    
    /*start: function(){
        console.log('start');
        this.playerBody.animations.play('walk');
        this.playerBody.body.velocity.x = 50;
        while(this.playerBody.x < 150){
            this.playerBody.body.velocity.x = 0;
            this.playerBody.animations.stop('walk');
        }
        //this.dialog();
    },**/
    
    dialog: function(){
        this.textBox = game.add.text(500, 200, "Congratulations, Rick. \nYour mission is completed.",
            {font: '30px Courier', fill: "#ffffff", align: 'center'});
        game.time.events.add(4000, this.noUse, this);
    },
    
    noUse: function(){
        this.textBox.text = "Your services are no \nlonger needed.";
        game.time.events.add(4000, this.nextScene, this);
    },
    
    nextScene: function(){
        //console.log('next scene');
        this.bg2 = game.add.sprite(0, 0, 'ending2');
        this.bg2.scale.x = 0.53;
        this.bg2.scale.y = 0.58;
        game.world.bringToTop(this.player);
        game.time.events.add(500, this.shotAt, this);
    },
    
    shotAt: function(){
        //console.log('shot at');
        this.playerBody.kill();
        this.bg.kill();
        this.bg2.kill();
        this.playerRightArm.kill();
        this.playerLeftArm.kill();
        this.shot.play();
        this.textBox.kill();
        game.time.events.add(500, this.killed, this);
    },
    
    killed: function(){
        //console.log('killed');
        this.hit.play();
        game.time.events.add(3000, this.credits1, this);
    },
    
    credits1: function(){
        this.credits = game.add.text(70, 150, "Ben Brown-McMillin:\tProject Manager, Programming\n\nJordan Kolb:\tProgramming, Audio, Level Design\n\nIsaak Hill:\tCreative Design, Writer\n\nJeremy Maline:\tArt Design", {font: '30px Courier', fill: "#ffffff", align: 'center'});
        game.time.events.add(4000, this.credits2, this);
    },
    
    credits2: function(){
        this.credits.kill();
        this.thanks = game.add.text(300, 200, "Thank you for playing.", {font: '30px Courier', fill: "#ffffff", align: 'center'});
    },
};