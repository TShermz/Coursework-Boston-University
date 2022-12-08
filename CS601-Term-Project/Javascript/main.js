import {addPlayer, player_arr} from "./player.js";
import{set_dice_events, calc_dice, reset_board} from './dice.js';
import {counter, highlight_scores, clear_highlights, score, update_previous_score, disable_selected_dice, game_over} from "./scoring.js";

$(document).ready( () => {
    let dice_arr = [1,1,1,1,1,1];
    let selected_dice_arr = [0,0,0,0,0,0];


    $("#addPlayer").click(addPlayer);

    $("#scoringKey-col-container li").on("mouseenter", function (event) {
        $(this).css("color", "red");
    })

    $("#scoringKey-col-container li").on("mouseleave", function (event) {
        $(this).css("color", "black");
    })

    $("#startGame").click(() =>{
        if(player_arr.length == 0){
            alert("Please enter at least one player to begin.")
        }else{
            $("#start-buttons").hide();
            $("#game-buttons").show();
            $("#turn-tracker").html(`<u>Turn: </u><br> ${player_arr[counter.player].name}`); 
        }
    });

    $('#roll-button').on("click", function () {
        set_dice_events(dice_arr, selected_dice_arr);
        $('#roll-button').off("click");
        $('#roll-button').on("click", function (){
            alert("You must select a dice with value to keep or end your turn.");
        });
        clear_highlights();
        calc_dice(dice_arr, selected_dice_arr);
        update_previous_score();
        highlight_scores(dice_arr);
        disable_selected_dice(dice_arr);  
    });

    $('#end-button').on("click", function () {
        //update current player's score
        player_arr[counter.player].setscore(score.display);
        $(`#player-slot${counter.player} span`).html(player_arr[counter.player].getScore());
        game_over(player_arr, counter);

        //increment player
        counter.next_player();

        //display next player's name in turn
        $("#turn-tracker").html(`<u>Turn: </u><br> ${player_arr[counter.player].name}`);

        //reset round scores
        score.reset();
        $("#scorekeeper").html("Score: <span>0</span>");

        //resets dice event handlers
        // set_dice_events(dice_arr, selected_dice_arr);
        clear_highlights();
        reset_board();

        //resets roll event handler
        $('#roll-button').show();
        $('#roll-button').off("click");
        $('#roll-button').on("click", function () {
            set_dice_events(dice_arr, selected_dice_arr);
            $('#roll-button').off("click");
            $('#roll-button').on("click", function (){
                alert("You must select a dice with value to keep or end your turn.");
            });
            clear_highlights();
            calc_dice(dice_arr, selected_dice_arr);
            highlight_scores(dice_arr);
            update_previous_score();
            disable_selected_dice(dice_arr);  
        }); 

        counter.stored_bonus = 0;

        console.log(dice_arr);
        console.log(selected_dice_arr);
    });
})

