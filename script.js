class Board{

  // PROPERTIES

  turnPlayer; // Which player goes first and who's turn is right now.
  leftTurns; // How many turns are left.
  gameOver; // Is game over.
  scoreP1 = 0; // Player 1 score.
  scoreP2 = 0; // Player 2 score.
  arrowNumber1; // Help for arrow function resize.
  arrowNumber2; // Help for arrow function resize.

  constructor(){
    this.clear(); // Clear the fields and prepare game
  }

  clear(){
    fields.forEach(field => {
      field.innerText = '';
    });

    this.gameOver = false;
    this.leftTurns = 9;
    result.innerText = "";

    // Who goes first, if last time Player 1 went first, now Player 2 goes first.

    if(this.turnPlayer == undefined){
      this.turnPlayer = 1;
    }else if(this.turnPlayer === 1){
      this.turnPlayer = 2;
    }else{
      this.turnPlayer = 1;
    }

    // After game is over and new game starts, we call clear method, we need to remove winning line, 
    // But if its first game there is no winning line to remove in constructor

    if(winningLine !== null){
      winningLine.style.display = "none";
    }
  }

  drawShape(field){
    if(this.gameOver){
      return;
    }

    if(field.innerText !== ''){
      return;
    }

    if(this.turnPlayer === 1){
      field.innerText = 'X';
      this.turnPlayer = 2;
      this.leftTurns--;
    }else{
      field.innerText = 'O';
      this.turnPlayer = 1;
      this.leftTurns--;
    }

    if(this.checkForWin()){
      this.gameOver = true;

      // If game is over and Player 1 went 1st, next game Player 2 goes 1st.

      if(this.turnPlayer === 1){
        this.turnPlayer = 2;
      }else{
        this.turnPlayer = 1;
      }

      this.updateScoreBoard();

      return;
    }

    if(!this.isThereLeftTurns() && !this.gameOver){

      // Draw

      result.innerText = "DRAW!";
    }
  }

  isThereLeftTurns(){
    return this.leftTurns != 0;
  }

  updateScoreBoard(){
    scoreP1Span.innerText = this.scoreP1;
    scoreP2Span.innerText = this.scoreP2;
  }

  resetScore(){
    this.scoreP1 = 0;
    this.scoreP2 = 0;
    this.updateScoreBoard();
  }

  checkForWin(){

    /* PRVA KOMBINACIJA
        X X X
    */

    if(fields[0].innerText === fields[1].innerText && fields[0].innerText === fields[2].innerText && fields[0].innerText !== ''){
      const ax = this.getOffsetLeft(fields[0]);
      const ay = this.getOffsetTop(fields[0]);
      const bx = this.getOffsetLeft(fields[2]);
      const by = this.getOffsetTop(fields[2]);
      console.log("AX: " + ax + " AY: " + ay + " BX: " + bx + " BY: " + by);

      this.drawLine2(ax + (fields[0].offsetWidth / 2), ay + (fields[0].offsetWidth / 2), bx + (fields[0].offsetWidth / 2), by + (fields[0].offsetWidth / 2));

      if(fields[0].innerText === 'X'){
        this.scoreP1++;
        result.innerText = "Player 1 wins!";
      }else{
        this.scoreP2++;
        result.innerText = "Player 2 wins!";
      }

      this.arrowNumber1 = 0;
      this.arrowNumber2 = 2;

      return true;
    }

    /* DRUGA KOMBINACIJA
      X
        X
          X
    */

  if(fields[0].innerText === fields[4].innerText && fields[0].innerText === fields[8].innerText && fields[0].innerText !== ''){
    console.log("WIN");
    const ax = this.getOffsetLeft(fields[0]);
    const ay = this.getOffsetTop(fields[0]);
    const bx = this.getOffsetLeft(fields[8]);
    const by = this.getOffsetTop(fields[8]);
    console.log("AX: " + ax + " AY: " + ay + " BX: " + bx + " BY: " + by);
    this.drawLine2(ax + (fields[0].offsetWidth / 2), ay + (fields[0].offsetWidth / 2), bx + (fields[0].offsetWidth / 2), by + (fields[0].offsetWidth / 2));

    if(fields[0].innerText === 'X'){
      this.scoreP1++;
      result.innerText = "Player 1 wins!";
    }else{
      this.scoreP2++;
      result.innerText = "Player 2 wins!";
    }

    this.arrowNumber1 = 0;
    this.arrowNumber2 = 8;

    return true;
  }

    /* TRECA KOMBINACIJA
      X
      X
      X
    */

  if(fields[0].innerText === fields[3].innerText && fields[0].innerText === fields[6].innerText && fields[0].innerText !== ''){
    console.log("WIN");
    const ax = this.getOffsetLeft(fields[0]);
    const ay = this.getOffsetTop(fields[0]);
    const bx = this.getOffsetLeft(fields[6]);
    const by = this.getOffsetTop(fields[6]);
    console.log("AX: " + ax + " AY: " + ay + " BX: " + bx + " BY: " + by);
    this.drawLine2(ax + (fields[0].offsetWidth / 2), ay + (fields[0].offsetWidth / 2), bx + (fields[0].offsetWidth / 2), by + (fields[0].offsetWidth / 2));

    if(fields[0].innerText === 'X'){
      this.scoreP1++;
      result.innerText = "Player 1 wins!";
    }else{
      this.scoreP2++;
      result.innerText = "Player 2 wins!";
    }

    this.arrowNumber1 = 0;
    this.arrowNumber2 = 6;

    return true;
  }

    /* CETVRTA KOMBINACIJA
        X
        X
        X
    */

  if(fields[1].innerText === fields[4].innerText && fields[1].innerText === fields[7].innerText && fields[1].innerText !== ''){
    console.log("WIN");
    const ax = this.getOffsetLeft(fields[1]);
    const ay = this.getOffsetTop(fields[1]);
    const bx = this.getOffsetLeft(fields[7]);
    const by = this.getOffsetTop(fields[7]);
    console.log("AX: " + ax + " AY: " + ay + " BX: " + bx + " BY: " + by);
    this.drawLine2(ax + (fields[0].offsetWidth / 2), ay + (fields[0].offsetWidth / 2), bx + (fields[0].offsetWidth / 2), by + (fields[0].offsetWidth / 2));

    if(fields[1].innerText === 'X'){
      this.scoreP1++;
      result.innerText = "Player 1 wins!";
    }else{
      this.scoreP2++;
      result.innerText = "Player 2 wins!";
    }

    this.arrowNumber1 = 1;
    this.arrowNumber2 = 7;

    return true;
  }

    /* PETA KOMBINACIJA
          X
          X
          X
    */

  if(fields[2].innerText === fields[5].innerText && fields[2].innerText === fields[8].innerText && fields[2].innerText !== ''){
    console.log("WIN");
    const ax = this.getOffsetLeft(fields[2]);
    const ay = this.getOffsetTop(fields[2]);
    const bx = this.getOffsetLeft(fields[8]);
    const by = this.getOffsetTop(fields[8]);
    console.log("AX: " + ax + " AY: " + ay + " BX: " + bx + " BY: " + by);
    this.drawLine2(ax + (fields[0].offsetWidth / 2), ay + (fields[0].offsetWidth / 2), bx + (fields[0].offsetWidth / 2), by + (fields[0].offsetWidth / 2));

    if(fields[2].innerText === 'X'){
      this.scoreP1++;
      result.innerText = "Player 1 wins!";
    }else{
      this.scoreP2++;
      result.innerText = "Player 2 wins!";
    }

    this.arrowNumber1 = 2;
    this.arrowNumber2 = 8;

    return true;
  }

    /* SESTA KOMBINACIJA
          X
        X
      X
    */

  if(fields[2].innerText === fields[4].innerText && fields[2].innerText === fields[6].innerText && fields[2].innerText !== ''){
    console.log("WIN");
    const ax = this.getOffsetLeft(fields[2]);
    const ay = this.getOffsetTop(fields[2]);
    const bx = this.getOffsetLeft(fields[6]);
    const by = this.getOffsetTop(fields[6]);
    console.log("AX: " + ax + " AY: " + ay + " BX: " + bx + " BY: " + by);
    this.drawLine2(ax + (fields[0].offsetWidth / 2), ay + (fields[0].offsetWidth / 2), bx + (fields[0].offsetWidth / 2), by + (fields[0].offsetWidth / 2));

    if(fields[2].innerText === 'X'){
      this.scoreP1++;
      result.innerText = "Player 1 wins!";
    }else{
      this.scoreP2++;
      result.innerText = "Player 2 wins!";
    }

    this.arrowNumber1 = 2;
    this.arrowNumber2 = 6;

    return true;
  }

    /* SEDMA KOMBINACIJA
      
      X X X
      
    */

  if(fields[3].innerText === fields[4].innerText && fields[3].innerText === fields[5].innerText  && fields[3].innerText !== ''){
    console.log("WIN");
    const ax = this.getOffsetLeft(fields[3]);
    const ay = this.getOffsetTop(fields[3]);
    const bx = this.getOffsetLeft(fields[5]);
    const by = this.getOffsetTop(fields[5]);
    console.log("AX: " + ax + " AY: " + ay + " BX: " + bx + " BY: " + by);
    this.drawLine2(ax + (fields[0].offsetWidth / 2), ay + (fields[0].offsetWidth / 2), bx + (fields[0].offsetWidth / 2), by + (fields[0].offsetWidth / 2));

    if(fields[3].innerText === 'X'){
      this.scoreP1++;
      result.innerText = "Player 1 wins!";
    }else{
      this.scoreP2++;
      result.innerText = "Player 2 wins!";
    }

    this.arrowNumber1 = 3;
    this.arrowNumber2 = 5;

    return true;
  }

    /* OSMA KOMBINACIJA
      
      
      X X X
    */

    if(fields[6].innerText === fields[7].innerText && fields[6].innerText === fields[8].innerText  && fields[6].innerText !== ''){
      console.log("WIN");
      const ax = this.getOffsetLeft(fields[6]);
      const ay = this.getOffsetTop(fields[6]);
      const bx = this.getOffsetLeft(fields[8]);
      const by = this.getOffsetTop(fields[8]);
      console.log("AX: " + ax + " AY: " + ay + " BX: " + bx + " BY: " + by);
      this.drawLine2(ax + (fields[0].offsetWidth / 2), ay + (fields[0].offsetWidth / 2), bx + (fields[0].offsetWidth / 2), by + (fields[0].offsetWidth / 2));

      if(fields[6].innerText === 'X'){
        this.scoreP1++;
        result.innerText = "Player 1 wins!";
      }else{
        this.scoreP2++;
        result.innerText = "Player 2 wins!";
      }

      this.arrowNumber1 = 6;
      this.arrowNumber2 = 8;

      return true;
    }

    return false;
  }

  drawLine2(x1, y1, x2, y2){
    if (x2 < x1) {
      let tmp = x2;
      x2 = x1;
      x1 = tmp;
      tmp = y2;
      y2 = y1;
      y1 = tmp;
    }

    let lineLength = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    let m = (y2 - y1) / (x2 - x1);

    let degree = Math.atan(m) * 180 / Math.PI;

    let div = document.createElement('div');
    div.className = 'winning-line';
    div.style.transformOrigin = "top left";
    div.style.transform = "rotate(" + degree + "deg";
    div.style.width = lineLength + "px";
    div.style.height = "5px";
    div.style.backgroundColor = "red";
    div.style.position = "absolute";
    div.style.top = y1 + "px";
    div.style.left = x1 + "px";

    winningLine = div;

    document.body.appendChild(div);
  }

  updateWinningArrow(arrowNumber1, arrowNumber2) {
    if(arrowNumber1 === undefined || arrowNumber2 === undefined){
      return;
    }

    const ax = this.getOffsetLeft(fields[arrowNumber1]);
    const ay = this.getOffsetTop(fields[arrowNumber1]);
    const bx = this.getOffsetLeft(fields[arrowNumber2]);
    const by = this.getOffsetTop(fields[arrowNumber2]);
    console.log("AX: " + ax + " AY: " + ay + " BX: " + bx + " BY: " + by);
    console.log("AX: " + (ax + fields[0].offsetWidth / 2) + " AY: " + (ay + fields[0].offsetWidth / 2) + " BX: " + (bx + fields[0].offsetWidth / 2) + " BY: " + (by + fields[0].offsetWidth / 2));

    // IZBRISEMO PROSLU LINIJU JER SVAKI PUT DODAJEMO NOVU U HTML NA SVAKI RESIZE

    winningLine.remove();
    this.drawLine2(ax + fields[0].offsetWidth / 2, ay + fields[0].offsetWidth / 2, bx + fields[0].offsetWidth / 2, by + fields[0].offsetWidth / 2);
  }

  getOffsetLeft(field){
    let offsetLeft = 0;
    do {
      if (!isNaN(field.offsetLeft)){
        offsetLeft += field.offsetLeft;
      }
    } while(field = field.offsetParent);

    return offsetLeft;
  }

  getOffsetTop(field){
    let offsetTop = 0;
    do {
      if (!isNaN(field.offsetTop)){
        offsetTop += field.offsetTop;
      }
    } while(field = field.offsetParent);
    
    return offsetTop;
  }
}

const fields = document.querySelectorAll('[data-field]');
const shapes = document.querySelectorAll('[data-shape]');
const result = document.querySelector("[data-result]");
const resetScore = document.querySelector('[data-reset-score]');
const playAgain = document.querySelector('[data-play-again]');
const scoreP1Span = document.querySelector('[data-score-p1]');
const scoreP2Span = document.querySelector('[data-score-p2]');
let winningLine = document.querySelector('.winning-line');

const board = new Board();

fields.forEach(field => {
  field.addEventListener('click', () => {
    board.drawShape(field);
  });
});

playAgain.addEventListener('click', () => {
  board.clear();
});

resetScore.addEventListener('click', () => {
  board.resetScore();
});

window.onresize = function(){
  if(board.gameOver){
    board.updateWinningArrow(board.arrowNumber1, board.arrowNumber2);
  }
}