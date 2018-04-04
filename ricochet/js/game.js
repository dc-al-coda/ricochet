// Initialize Phaser, and create a 1016px by 616px game
var game = new Phaser.Game(1016, 616, Phaser.AUTO, 'game');

// Add the 'mainState' and call it 'main'
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
//game.state.add('levelTest', levelTestState);
game.state.add('level0', level0State);
game.state.add('level1', level1State);
game.state.add('level2', level2State);
game.state.add('level3', level3State);
game.state.add('level4', level4State); 
game.state.add('level5', level5State); 
game.state.add('level6', level6State);
game.state.add('level7', level7State); 
game.state.add('end', endState);
game.state.add('opening', openingState);
game.state.add('matterblockinggatetest', matterblockinggatetestState);
game.state.add('leveleditor', leveleditorState);
game.state.add('BaseLevelEnemies', BaseLevelEnemiesState);
game.state.add('levelTest2', levelTest2State);

// Start the state to actually start the game
game.state.start('boot');