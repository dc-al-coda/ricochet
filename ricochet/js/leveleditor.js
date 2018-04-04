var leveleditorState = {
     create: function() {
         
        this.walls = game.add.group();
        this.manipulators = game.add.group();
        
        this.ground = this.walls.create(0, 0, 'ceiling');
        this.ground2 = this.walls.create(1000, 0, 'ceiling');
        this.ground4 = this.walls.create(0, 0, 'floor');
        this.ground3 = this.walls.create(0, 600, 'floor');
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
        
        this.lastClicked = 0;
        this.lastClickedTest = game.add.text(16, 100, '0', { fontSize: '20px', fill: '#ffffff' });
        
        this.onlySpawnOneQ = true;
        this.onlySpawnOneW = true;
         
        this.blockCoordinatesX = game.add.text(0, 0, 'X', { fontSize: '20px', fill: '#ffffff' });
        this.blockCoordinatesY = game.add.text(30, 0, 'Y', { fontSize: '20px', fill: '#ffffff' }); 
        this.scaleDisplay = game.add.text(0, 30, '0', { fontSize: '20px', fill: '#ffffff'});
        this.scaleDisplayY = game.add.text(30, 30, '0', { fontSize: '20px', fill: '#ffffff'});
         
        this.scaleArray = [];
        this.scaleArrayY = []; 
        this.onlyScaleOnceL = true;
        this.onlyScaleOnceR = true; 
        this.onlyScaleOnceU = true;
        this.onlyScaleOnceD = true;
         
        //instructions
        this.instructions1 = game.add.text(640, 30, 'Q: Spawn horizontal platform', { fontSize: '15px', fill: '#ffffff'});
        this.instructions2 = game.add.text(640, 45, 'W: Spawn vertical wall', { fontSize: '15px', fill: '#ffffff'});
        this.instructions3 = game.add.text(640, 60, '<- & ->: Change x-axis scale of last selected block', { fontSize: '15px', fill: '#ffffff'});
        this.instructions4 = game.add.text(640, 75, '^ & V: Change y-axis scale of last selected block', { fontSize: '15px', fill: '#ffffff'});
        this.instructions5 = game.add.text(640, 90, 'D: Delete last selected block', { fontSize: '15px', fill: '#ffffff'});
        this.instructions6 = game.add.text(640, 105, 'Mouse: Click, drag, and select platforms', { fontSize: '15px', fill: '#ffffff'});
        this.instructions7 = game.add.text(640, 120, 'Top row coordinates: x, y', { fontSize: '15px', fill: '#ffffff'});
        this.instructions8 = game.add.text(640, 135, 'Bottom row coordinates: x scale, y scale', { fontSize: '15px', fill: '#ffffff'});
        this.instructions8 = game.add.text(640, 150, 'Make levels. Love, Kolby', { fontSize: '15px', fill: '#ffffff'});
         
        //Controls
        this.game.input.keyboard.addKeyCapture([
            Phaser.Keyboard.Q,
            Phaser.Keyboard.W,
            Phaser.Keyboard.E,
            Phaser.Keyboard.R,
            Phaser.Keyboard.UP,
            Phaser.Keyboard.DOWN,
            Phaser.Keyboard.LEFT,
            Phaser.Keyboard.RIGHT,
            Phaser.Keyboard.D
        ]);
    },

    update: function() {
        for (i = 0; i < this.manipulators.length; i++){
            if (this.manipulators.children[i].input.pointerDown(game.input.activePointer.id)) {
                this.lastClicked = i;
                this.lastClickedTest.text = i;
                this.getCoordinates(this.manipulators.children[i]);
            }
        }
        
        //KEYBOARD CONTROLS
       if (this.qInputIsActive() && this.onlySpawnOneQ == true) {
            this.onlySpawnOneQ = false;
            this.platformHorizontal = this.manipulators.create(0, 0, 'floor');
            this.platformHorizontal.inputEnabled = true;
            this.platformHorizontal.input.enableDrag(true);
            this.platformHorizontal.input.useHandCursor;
            this.scaleArray.push(1);
            this.scaleArrayY.push(1);
        }
        
        if (this.qInputIsActive() == false){
            this.onlySpawnOneQ = true;
        }
        
        if (this.wInputIsActive() && this.onlySpawnOneW == true) {
            this.onlySpawnOneW = false;
            this.platformVertical = this.manipulators.create(0, 0, 'ceiling');
            this.platformVertical.inputEnabled = true;
            this.platformVertical.input.enableDrag(true);
            this.platformVertical.input.useHandCursor;
            this.scaleArray.push(1);
            this.scaleArrayY.push(1);
        }
        
        if (this.wInputIsActive() == false){
            this.onlySpawnOneW = true;
        }
    
        if (this.eInputIsActive()) {
        }
        
        if (this.rInputIsActive()) {

        }
        
        if (this.upInputIsActive() && this.onlyScaleOnceU == true) {
            this.onlyScaleOnceU = false;
            this.scaleArrayY[this.lastClicked] = this.scaleArrayY[this.lastClicked] + .1;
            this.manipulators.children[this.lastClicked].scale.y = this.scaleArrayY[this.lastClicked];
            this.scaleDisplayY.text = this.scaleArrayY[this.lastClicked];
        }
        
        if (this.upInputIsActive() == false){
            this.onlyScaleOnceU = true;
        }
    
        if (this.downInputIsActive() && this.onlyScaleOnceD == true) {
            this.onlyScaleOnceD = false;
            this.scaleArrayY[this.lastClicked] = this.scaleArrayY[this.lastClicked] - .1;
            this.manipulators.children[this.lastClicked].scale.y = this.scaleArrayY[this.lastClicked];
            this.scaleDisplayY.text = this.scaleArrayY[this.lastClicked];
        }
        
        if (this.downInputIsActive() == false){
            this.onlyScaleOnceD = true;
        }
        
        if (this.leftInputIsActive() && this.onlyScaleOnceL == true) {
            this.onlyScaleOnceL = false;
            this.scaleArray[this.lastClicked] = this.scaleArray[this.lastClicked] - .1;
            this.manipulators.children[this.lastClicked].scale.x = this.scaleArray[this.lastClicked];
            this.scaleDisplay.text = this.scaleArray[this.lastClicked];
        }
        
        if (this.leftInputIsActive() == false){
            this.onlyScaleOnceL = true;
        }
        
        if (this.rightInputIsActive() && this.onlyScaleOnceR == true) {
            this.onlyScaleOnceR = false;
            this.scaleArray[this.lastClicked] = this.scaleArray[this.lastClicked] + .1;
            this.manipulators.children[this.lastClicked].scale.x = this.scaleArray[this.lastClicked];
            this.scaleDisplay.text = this.scaleArray[this.lastClicked];
        }
        
        if (this.rightInputIsActive() == false){
            this.onlyScaleOnceR = true;
        }
        
        if (this.dInputIsActive()){
            this.manipulators.children[this.lastClicked].kill();
        }
        
        //console.log(this.player.body.velocity.x);
        //console.log(this.player.body.velocity.y);
    },
    
    qInputIsActive: function() {
        var isActive = false;
        
        isActive = this.input.keyboard.isDown(Phaser.Keyboard.Q);
        
        return isActive;
    },
    
    wInputIsActive: function() {
        var isActive = false;
        
        isActive = this.input.keyboard.isDown(Phaser.Keyboard.W);
        
        return isActive;
    },
    
    eInputIsActive: function() {
        var isActive = false;
        
        isActive = this.input.keyboard.isDown(Phaser.Keyboard.UP);
        
        return isActive;
    },
    
    rInputIsActive: function() {
        var isActive = false;
        
        isActive = this.input.keyboard.isDown(Phaser.Keyboard.DOWN);
        
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
    
    dInputIsActive: function() {
        var isActive = false;
        
        isActive = this.input.keyboard.isDown(Phaser.Keyboard.D);
        
        return isActive;
    },
    
    render: function() {
        //game.debug.geom(this.line1, '#FF0');
        //game.debug.geom(this.line2, '#FF0');
        //game.debug.geom(this.line3, '#FF0');
        //game.debug.soundInfo(this.backgroundMusic, 20, 32);
        //game.debug.soundInfo(this.arpeggio, 20, 200);

    },
    
    getCoordinates: function(platform){
        if (platform.x < 50){
            this.blockCoordinatesX.x = platform.x + 30;
            this.blockCoordinatesX.y = platform.y;
            this.blockCoordinatesY.x = platform.x + 80;
            this.blockCoordinatesY.y = platform.y;
        }
        if (platform.x > 50 && platform.x < 950){
            this.blockCoordinatesX.x = platform.x;
            this.blockCoordinatesX.y = platform.y;
            this.blockCoordinatesY.x = platform.x + 50;
            this.blockCoordinatesY.y = platform.y;
        }
        if (platform.x > 950){
            this.blockCoordinatesX.x = platform.x - 30;
            this.blockCoordinatesX.y = platform.y;
            this.blockCoordinatesY.x = platform.x + 20;
            this.blockCoordinatesY.y = platform.y;
        }
        this.blockCoordinatesX.text = platform.x;
        this.blockCoordinatesY.text = platform.y;
        this.scaleDisplay.x = platform.x;
        this.scaleDisplay.y = platform.y + 30;
        this.scaleDisplay.text = Math.round(this.scaleArray[this.lastClicked]);
        this.scaleDisplayY.x = platform.x + 30;
        this.scaleDisplayY.y = platform.y + 30;
        this.scaleDisplayY.text = Math.round(this.scaleArrayY[this.lastClicked]);
    },
    
};

   