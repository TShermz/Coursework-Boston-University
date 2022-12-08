import {counter} from "./scoring.js";

class player {
    //Name, Score, Turn#
    constructor(name) {
        this.name = name;
        this.turn = 0;
        this.total_score = 0;
    };

    setscore(x){
        this.total_score += x;
    }

    getScore(){
        return this.total_score;
    };


};

let player_arr = [];

function addPlayer(){
    // let player_name = $('#username').val();
    // console.log(player_name);

    if($('#username').val() == ''){
        alert("Please enter a name before submitting");
        return false;
    }

    if(counter.total_players == 5){
        alert("You have reached the max limit of participants.");
        return false;
    }

    player_arr.push(new player);

    $("#no-players-text").hide();
    let username = $("#username").val();
    player_arr[counter.total_players].name = username;

    let div = document.createElement('div');
    div.classList = "player-slot";
    div.id = `player-slot${counter.total_players}`;
    div.innerHTML = `${username} <span>0</span>`;

    $("#players-display").append(div);

    $('#username').value = '';
    $('#username').val('');
    counter.increase_total_players();
    return false;
};

export {addPlayer, player_arr};