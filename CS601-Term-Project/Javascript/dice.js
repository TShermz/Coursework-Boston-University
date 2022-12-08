import { highlight_scores, tally_round } from "./scoring.js";

const set_dice_events = function (dice_arr, selected_dice_arr) {
    for(let i = 0; i <= 5; i++){
        dice_arr[i] = 1;
        selected_dice_arr[i] = 0;
        $(`#playdice${i}`).off("click");
        $(`#playdice${i}`).on("click", function () {
            let text = $( this ).html();
            let id = $(this).attr('id');
            select_dice(dice_arr, selected_dice_arr, text, id);
            tally_round(dice_arr, selected_dice_arr);
        });
        $(`#selected-dice${i}`).off("click");
        $(`#selected-dice${i}`).on("click", function () {
            let id = $(this).attr('id');
            deselect_dice(dice_arr, selected_dice_arr, id);
            tally_round(dice_arr, selected_dice_arr);
        });
    };
};

const random_num = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max-min) +min)
}

const calc_dice = function (dice_arr, selected_dice_arr){
    for(let i = 0; i <= 5; i++){
        dice_arr[i] = random_num(1,7);

        switch(dice_arr[i]){
            case 1:
                $(`#playdice${i}`).html(`<img src="./images/dice${dice_arr[i]}.png">`)
            case 2:
                $(`#playdice${i}`).html(`<img src="./images/dice${dice_arr[i]}.png">`)
            case 3:
                $(`#playdice${i}`).html(`<img src="./images/dice${dice_arr[i]}.png">`)
            case 4:
                $(`#playdice${i}`).html(`<img src="./images/dice${dice_arr[i]}.png">`)
            case 5:
                $(`#playdice${i}`).html(`<img src="./images/dice${dice_arr[i]}.png">`)
            case 6:
                $(`#playdice${i}`).html(`<img src="./images/dice${dice_arr[i]}.png">`)
        }
    }
    for(let i = 0; i <= 5; i++){
        if (selected_dice_arr[i] > 0){
            dice_arr[i] = 0;
            selected_dice_arr[i] = 7;
        }
    };
};

const select_dice = function (dice_arr, selected_dice_arr, text, id){
    let location = id.slice(-1);

    selected_dice_arr[location]= dice_arr[location];
    dice_arr[location] = 0;

    $(`#playdice${location}`).hide();
    $(`#selected-dice${location}`).show();
    $(`#selected-dice${location}`).append(text);

    console.log("dice on board: "+dice_arr);
    console.log("selected dice: "+selected_dice_arr);

    return[dice_arr, selected_dice_arr]
};

const deselect_dice = function (dice_arr, selected_dice_arr, id){
    let location = id.slice(-1);

    dice_arr[location] = selected_dice_arr[location];
    selected_dice_arr[location] = 0;

    $(`#selected-dice${location}`).hide();
    $(`#playdice${location}`).show();
    $(`#selected-dice${location}`).empty();

    console.log("dice on board: "+dice_arr);
    console.log("selected dice: "+selected_dice_arr);

    return[dice_arr, selected_dice_arr]
};

const reset_board = function () {
    for(let i = 0; i <= 5; i++){
        $(`#playdice${i}`).html('<img src="./images/dice1.png">');
        $(`#playdice${i}`).css("display", "block");
        $(`#playdice${i}`).off("click");

        $(`#selected-dice${i}`).html('');
        $(`#selected-dice${i} img`).css("border","black 5px solid");
    };
}


export{set_dice_events, calc_dice, reset_board};