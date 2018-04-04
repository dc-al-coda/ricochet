/**
 * Created by Isaak on 12/1/16.
 */
var menuState = {

    create: function () {

        var Background = game.add.image(0, 0, 'splash');
        Background.scale.setTo(.5,.5);

        var startLabel = game.add.text(160, game.world.height - 80, "Press 'K' to begin",
            {font: '25px Courier', fill: "#ffffff"});

        var Kkey = game.input.keyboard.addKey(Phaser.Keyboard.K);

        Kkey.onDown.addOnce(this.start, this);

    },

    start: function () {
        game.state.start('opening');
    }
};
