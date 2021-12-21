var x = true;
const body = document.querySelector("body");
const x_class ="x", o_class = "o";
const cell = document.querySelectorAll('[data-cell]');
const board = document.querySelector(".container");
const win_combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
const win_msg = document.querySelector(".win-msg");
const winner = document.querySelector("[data-cell-win-msg] h1");
const start_btn = document.querySelector("[data-start-btn]");
const win_msg_background = document.querySelector(".win-msg");
const global_container = document.querySelector(".global-container");

function check_win(currentClass){
    return win_combinations.some(comb => {
        return comb.every( index => {
            return (cell[index].classList.contains(currentClass));
        })
    })
}

function check_draw(){
    return [...cell].every( c => {
        return (c.classList.contains(x_class) || c.classList.contains(o_class));
    })
}

function start_game(){
    cell.forEach(cell => {
        cell.classList.remove(x_class, o_class);
        
        global_container.classList.remove("blue", "red", "show");
        cell.addEventListener('click', mark, {once: true});
    });
    win_msg.classList.remove("show");
    set_board();
}

function set_board(){
    board.classList.remove(x_class);
    board.classList.remove(o_class);
    if(x){
        board.classList.add(x_class);
        body.classList.remove("red");
        body.classList.add("blue");
    }else{
        board.classList.add(o_class);
        body.classList.remove("blue");
        body.classList.add("red");
    }
}

function swap_board(){
    x = !x;
    set_board();
}

function mark(e){
    const c = e.target;
    let current_class = (x)?x_class:o_class;
    c.classList.add(current_class);
    if(check_draw()){
        winner.innerText = `Draw`;
        win_msg.classList.add("show");
    } else if(check_win(current_class)) {
        winner.innerText = `${x?"BLUE":"RED"} Wins`;
        win_msg_background.classList.add(`${ x? "blue" :"red"}`);
        global_container.classList.add(`${ x? "blue" :"red"}`,"show");
        win_msg.classList.add("show");
    } else {
        swap_board();
    }
}

start_btn.addEventListener('click', start_game);

start_game();