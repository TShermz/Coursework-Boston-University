import {calc_dice, set_dice_events, reset_board} from "./dice.js";
// import{dice_arr, selected_dice_arr} from "./main.js";

let counter = {
    pair: 0,
    triple: 0,
    quad: 0,
    quint: 0,
    sext: 0,
    straight: 0,

    farkle: 0,
    visible_dice: 0,
    current_bonus: 0,
    stored_bonus: 0,


    player: 0,
    total_players: 0,


    count_dice: function(x){
        for(let i = 0; i <= 5; i++){
            this.visible_dice += x[i];
        };
    },

    next_player: function(){
        if(this.player == (this.total_players-1)){
            this.player = 0;
        } else{
          this.player++;  
        };    
    },

    increase_total_players: function(){
        this.total_players++;
    },

    reset: function(){
        this.pair = 0;
        this.triple = 0;
        this.quad = 0;
        this.quint = 0;
        this.sext = 0;
        this.straight = 0;
        this.farkle = 0;
        this.visible_dice = 0;
        this.current_bonus = 0;
    }
};

let combos =  {
    one_5: 50,
    one_1: 100,
    three_1: 300,
    three_2:200,
    three_3: 300,
    three_4:400,
    three_5: 500,
    three_6: 600,
    four_kind: 1000,
    five_kind: 2000,
    six_kind: 3000,
    three_pairs: 1500,
    four_kind_pair: 1500,
    two_triplets: 2500,
    straight: 1500
};

let score = {
    current: 0,
    previous: 0,
    display: 0,

    reset: function(){
        this.current = 0;
        this.previous = 0;
        this.display = 0;
    }
}

function highlight_scores (dice_arr){
    let totals = [];
    const counts = {};
    counter.reset();
    for (const num of dice_arr) {
        counts[num] = counts[num] ? counts[num] + 1 : 1;
    }

    for(let i = 1; i <= 6; i++){
        totals.push(counts[i]);
    }

    //Check for combos
    for (let i = 0; i <= 5; i++){
        if (totals[i] == 6){
            $('#six_kind').css("background-color","lightgreen");
            counter.farkle++;
            break;
        } else if(totals[i] == 5){
            $('#five_kind').css("background-color","lightgreen");
            counter.farkle++;
            break; 
        } else if(totals[i] == 4){
            $('#four_kind').css("background-color","lightgreen");
            counter.farkle++; 
            counter.quad++;
        } else if(totals[i] == 3){
            $(`#three_${i+1}`).css("background-color","lightgreen"); 
            counter.farkle++;
            counter.triple++;
        } else if(totals[i] == 2){
            counter.pair++;
        } else if(totals[i] == 1){
            counter.straight++;
        };
    }

    if (totals[0] > 0){$('#one_1').css("background-color","lightgreen"); counter.farkle++;}; 

    if (totals[4] > 0){$('#one_5').css("background-color","lightgreen"); counter.farkle++;};

    if(counter.triple == 2){$('#two_triplets').css("background-color","lightgreen"); counter.farkle++;};

    if(counter.pair == 3){$('#three_pairs').css("background-color","lightgreen"); counter.farkle++;};

    if(counter.quad == 1 && counter.pair == 1){$('#four_kind_pair').css("background-color","lightgreen"); counter.farkle++;};
    
    if(counter.straight == 6){$('#straight-li').css("background-color","lightgreen"); counter.farkle++;};

    if(counter.farkle == 0){
        $('#scoreBox h5').html(`FARKLE!`); 
        alert("FARRRKLLLEEEEE!");
        score.current = 0;
        score.display = 0;
        for(let i = 0; i <= 5; i++){
            $(`#playdice${i}`).off("click");
        }

        $('#roll-button').off("click");
        $('#roll-button').on("click", function (){
            alert("You have Farkled! Please continue by selecting 'Bank Points.'");
        });
    };
};

function clear_highlights () {
    $(".list-group-item").css("background-color", "white");
};

function tally_round (dice_arr, selected_dice_arr) {
    score.current = 0;
    let totals = [];
    const counts = {};
    counter.reset();
    for (const num of selected_dice_arr) {
        counts[num] = counts[num] ? counts[num] + 1 : 1;
    }

    for(let i = 1; i <= 6; i++){
        totals.push(counts[i]);
    }

    console.log("This is number of 5s: " + totals[4]);

    for (let i = 0; i <= 5; i++){
        if (totals[i] == 6){
            counter.sext++;
        } else if(totals[i] == 1){
            counter.straight++;
        } else if(totals[i] == 5){
            counter.quint++;
        } else if(totals[i] == 4){
            counter.quad++;
        } else if(totals[i] == 3){
            counter.triple++;
        } else if(totals[i] == 2){
            counter.pair++;
        };
    };

    let ones = 0;
    let fives = 0;

    if (totals[0] > 0){
        ones = totals[0]; 
        score.current += (totals[0]*combos.one_1); 
        counter.current_bonus += totals[0];
    };

    if (totals[4] > 0){
        fives = totals[4];
        score.current += (totals[4]*combos.one_5); 
        counter.current_bonus += totals[4];
    };

    //Three of a Kind
    if(totals[0] == 3){score.current += combos.three_1-300; counter.current_bonus = 3 + fives;};
    if(totals[1] == 3){score.current += combos.three_2; counter.current_bonus += 3;};
    if(totals[2] == 3){score.current += combos.three_3; counter.current_bonus += 3;};
    if(totals[3] == 3){score.current += combos.three_4; counter.current_bonus += 3;};
    if(totals[4] == 3){score.current += combos.three_5-150; counter.current_bonus = 3 + ones;};
    if(totals[5] == 3){score.current += combos.three_6; counter.current_bonus += 3;};

    if(counter.triple == 2){score.current = combos.two_triplets; counter.current_bonus = 6;};

    //Three Pairs
    if(counter.pair == 3){score.current = combos.three_pairs; counter.current_bonus = 6;};

    //Four of a Kind
    if(counter.quad == 1){
        if(totals[0] == 4){
            score.current += combos.four_kind-400;
            counter.current_bonus = 4 + fives;
        }else if(totals[4] == 4){
            score.current += combos.four_kind-200;
            counter.current_bonus = 4 + ones;
        } else{
          score.current += combos.four_kind;  
          counter.current_bonus = 4 + ones + fives; 
        };
    };

    //Four of a Kind and a Pair
    if(counter.quad == 1 && counter.pair == 1){
        if(totals[0] == 2){score.current += combos.four_kind_pair-200}
        else if(totals[4] == 2){score.current += combos.four_kind_pair-100}
        else if(totals[0] == 4){score.current += combos.four_kind_pair-combos.four_kind}
        else if(totals[4] == 4){score.current += combos.four_kind_pair-combos.four_kind}
        else if(totals[0] == 4 && totals[4] == 2){score.current += combos.four_kind_pair-1100}
        else if(totals[0] == 2 && totals[4] == 4){score.current += combos.four_kind_pair-1200}
        else {score.current = combos.four_kind_pair};
        counter.current_bonus = 6;
    };
    
    //Five of a Kind
    if(counter.quint == 1){
        if(totals[0] == 5){score.current += combos.five_kind-500; counter.current_bonus = 5 + fives;}
        else if(totals[4] == 5){score.current += combos.five_kind-250; counter.current_bonus = 5 + ones}
        else{score.current += combos.five_kind; counter.current_bonus = 5;};
    };

    //Six of a Kind
    if(counter.sext == 1){score.current = combos.six_kind; counter.current_bonus = 6};

    //Straight
    if(counter.straight == 6 ){score.current = combos.straight; counter.current_bonus = 6};

    //Manages score display based on rolls

    score.display = score.current + score.previous;

    counter.current_bonus += counter.stored_bonus;
    console.log('Current Bonus Counter: ' + counter.current_bonus);

    $('#scoreBox span').html(`${score.display}`);

    //Allows another roll if there are dice on the table; proves dice of value have been saved
    counter.count_dice(dice_arr);
    if (counter.visible_dice == 0){
        if (counter.current_bonus == 6){
            bonus_round(dice_arr, selected_dice_arr);
        } else{
            $('#roll-button').off("click");
            $('#roll-button').on("click", function (){
            alert("You have no dice on the board to roll; either add one back or bank points/end turn.'");
            });
        }
    }

    //it's recalculating because previous score is the same ?
    if (score.previous < score.display && counter.visible_dice != 0){
        $('#roll-button').off("click");
        $('#roll-button').on("click", function () {
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
    };

    if (score.current == 0){
        $('#roll-button').off("click");
        $('#roll-button').on("click", function (){
            alert("You must select a dice with value to keep or end your turn.");
        });
    }
};

function update_previous_score () {
    score.previous = score.display;
    console.log('Bonus Counter: ' + counter.current_bonus);
    counter.stored_bonus = counter.current_bonus;
    console.log('Stored Bonus Counter: ' + counter.stored_bonus);
}

function bonus_round(dice_arr, selected_dice_arr){
    alert("You've cleared the board! You can roll all 6 dice one more time to earn more points. A Farkle will clear all your points for the round, so be careful!");
    $('#roll-button').off("click");
    $('#roll-button').on("click", function (){
        reset_board();
        set_dice_events(dice_arr, selected_dice_arr);
        clear_highlights();
        calc_dice(dice_arr, selected_dice_arr);
        update_previous_score();
        highlight_scores(dice_arr);

        $('#roll-button').hide();
    });
};

function disable_selected_dice (dice_arr){
    for (let i = 0; i <=5; i++){
        if(dice_arr[i] == 0){
            $(`#selected-dice${i}`).off("click");
            $(`#selected-dice${i} img`).css("border","green 5px solid");
        };
    };
};

function game_over(player_arr, counter){
    let score = player_arr[counter.player].total_score;
    if(score >= 5000){
        alert(`${player_arr[counter.player].name} has won the game!`)
    };
}

export {counter, tally_round, highlight_scores, clear_highlights, score, update_previous_score, disable_selected_dice, game_over};