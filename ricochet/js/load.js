var loadState = {
    preload: function() {
        var loadingLabel = game.add.text(80, 150, 'loading...', {font: '30px Courier', fill: '#ffffff'});
        //Load all objects
        game.load.image('player', 'Assets/rick.png');
        game.load.image('floor', 'Assets/Platform_Section_03.png');
        game.load.image('ceiling', 'Assets/Platform_Section_04.png');
        game.load.image('bullet', 'Assets/RaycastBullet.png');
        game.load.image('bouncePoint', 'Assets/bouncePoint.png');
        game.load.image('gun', 'Assets/gun.png');
        game.load.image('testbackground', 'Assets/testbackground.png');
        game.load.image('collider', 'Assets/collision_surface.png');
        //game.load.image('switchOff', 'Assets/Wall_Switch_02.png');
        game.load.image('absorbfloor', 'Assets/absorb.png');
        game.load.image('absorbceiling', 'Assets/absorbvertical.png');
        game.load.image('exit', 'Assets/exit.png');
        game.load.image('sightPoint', 'Assets/sightPoint.png');
        game.load.image('laserBaseV', 'Assets/shieldEmitterV.png');
        game.load.image('laserBaseH', 'Assets/shieldEmitter.png');
        game.load.image('buttonGround', 'Assets/buttonGround.png');
        game.load.image('buttonBase', 'Assets/buttonBase.png');
        game.load.image('elevator', 'Assets/Elevator.png');
        game.load.image('movingPlatform', 'Assets/Floating_Platform.png');
        //game.load.image('deathLaserH', 'Assets/LaserSpriteHorizontal.png');
        //game.load.image('deathLaserV', 'Assets/LaserSpriteVertical.png');
        game.load.image('glassPane', 'Assets/glass_pane.png');
        game.load.image('glassPaneV', 'Assets/glass_paneV.png');
        game.load.image('ending1', 'Assets/Final_Scene_1.png');
        game.load.image('ending2', 'Assets/Final_Scene_2.png');
        game.load.image('ending3', 'Assets/Final_Scene_3.png');
        game.load.image('elevatorBackground', 'Assets/Elevator_Background.png');
        game.load.image('elevatorWall', 'Assets/elevatorWall.png');
        game.load.image('elevatorCable', 'Assets/elevatorCable.png');
        
        game.load.audio('background', 'Sounds/background.wav');
        game.load.audio('arpeggio', 'Sounds/arpeggio.wav');
        game.load.audio('bounce1', 'Sounds/Bounce1.wav');
        game.load.audio('bounce2', 'Sounds/Bounce2.wav');
        game.load.audio('bounce3', 'Sounds/Bounce3.wav');
        game.load.audio('3enemydown1', 'Sounds/3enemydown1.wav');
        game.load.audio('3enemydown2', 'Sounds/3enemydown2.wav');
        game.load.audio('3enemydown3', 'Sounds/3enemydown3.wav');
        game.load.audio('victory', 'Sounds/Victory.wav');
        game.load.audio('victory2', 'Sounds/Victory2.wav');
        game.load.audio('hit', 'Sounds/Hit_Hurt.wav');
        game.load.audio('arpeggio2', 'Sounds/arpeggio2.wav');
        game.load.audio('background2', 'Sounds/background2.wav');
        game.load.audio('enemyShot', 'Sounds/enemyShot.wav');
        game.load.audio('vantablack', 'Sounds/vantablack.wav');
        game.load.audio('doorSound', 'Sounds/doorSound.wav');
        game.load.audio('rickHit', 'Sounds/rickHit.wav');
        game.load.audio('switchOff', 'Sounds/switchOff.wav');
        game.load.audio('switchOn', 'Sounds/switchOn.wav');
        
        game.load.spritesheet('rick', 'Assets/Walk_Sprite_Sheet.png', 64, 64);
        game.load.spritesheet('rightArm', 'Assets/Right_Arm.png', 36, 19);
        game.load.spritesheet('leftArm', 'Assets/Left_Arm.png', 19, 15);
        
        game.load.spritesheet('enemy', 'Assets/enemy.png', 64, 64);
        game.load.spritesheet('enemyRightArm', 'Assets/enemyRightArm.png', 31, 21);
        game.load.spritesheet('enemyLeftArm', 'Assets/enemyLeftArm.png', 20, 20);
        
        game.load.spritesheet('deathLaserH', 'Assets/LaserSpriteHorizontal.png', 400, 32, 6);
        game.load.spritesheet('deathLaserV', 'Assets/LaserSpriteVertical.png', 32, 400, 6);
        
        game.load.spritesheet('door', 'Assets/Door.png', 64, 72, 4);
        
        game.load.spritesheet('enemyBullet', 'Assets/enemyBullet.png', 16, 16, 4);
        
        game.load.spritesheet('switch', 'Assets/Wall_Switch_01.png', 32, 32, 2);

        game.load.image('splash', 'Assets/splashScreen.jpg');
        game.load.image('background1', 'Assets/Background_Base_Texture.png');
    },
    
    create: function() {
        game.state.start('menu');
    },
};