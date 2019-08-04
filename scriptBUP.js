class Board{

  // PROPERTIES

  startPlayer; // Which player goes first and who's turn is right now.
  turnPlayer; // Who's turn is now.
  leftTurns; // How many turns are left.
  gameOver; // Is game over.
  scoreP1; // Player 1 score.
  scoreP2; // Player 2 score.
  arrowNumber1; // Help for arrow function resize.
  arrowNumber2; // Help for arrow function resize.
  mode; // One player / Two players

  constructor(){
    fields.forEach(field => {
      field.innerText = '';
    }); // Clear the fields and prepare game.
    this.turnPlayer = 1; // Player 1 goes first.
    this.startPlayer = 1; // Player 1 starts.
    this.gameOver = false // Game is not over.
    this.scoreP1 = this.scoreP2 = 0; // Set scores to 0.
    this.leftTurns = 9; // Left moves.
    this.mode = 'two-players'; // Mode
  }

  // METHODS

  clear(){
    fields.forEach(field => {
      field.innerText = '';
    }); // Clear the fields and prepare game.

    this.leftTurns = 9; // Restart left moves.
    result.innerText = ""; // Delete win message.

    // Who goes first, if last time Player 1 went first, now Player 2 goes first. Check this only if game ended.

    if(this.gameOver){
      if(board.mode === "two-players"){
        if(this.startPlayer === 1){
          this.startPlayer = 2;
        }else{
          this.startPlayer = 1;
        }
      }else{
        if(this.startPlayer === 1){
          this.startPlayer = 3;
        }else{
          this.startPlayer = 1;
        }
      }
    }

    this.turnPlayer = this.startPlayer;
    
    this.gameOver = false; // Game starting again.
    
    // After game is over and new game starts, we call clear method, we need to remove winning line, 
    // But if its first game there is no winning line to remove in constructor

    if(winningLine !== null){
      winningLine.style.display = "none";
    }

    // When computer is first we need to manually call drawShape function

    if(this.startPlayer === 3){
      let shapeToDraw = this.findShape();
      this.drawShape(shapeToDraw);
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

      if(board.mode === "two-players"){
        this.turnPlayer = 2;
        this.leftTurns--;
      }else{
        this.leftTurns--;
        this.turnPlayer = 3;

        // Before computer plays his move with recursive function we need to check if game ended.

        if(this.checkForWin()){
          this.gameOver = true;
    
          // If game is over and Player 1 went 1st, next game Player 2 goes 1st.
    
          this.updateScoreBoard();
    
          return;
        }else{
          this.gameOver = false;
        }
    
        if(!this.isThereLeftTurns() && !this.gameOver){
    
          // Draw
          
          this.gameOver = true;
          result.innerText = "DRAW!";
        }

        // Find field for computer

        let shapeToDraw = this.findShape();
        this.drawShape(shapeToDraw);

        return; // We need to return here because of recursion.
      }
    }else if(this.turnPlayer === 2){
      field.innerText = 'O';
      this.turnPlayer = 1;
      this.leftTurns--;
    }else{
      field.innerText = 'O';
      this.turnPlayer = 1;
      this.leftTurns--;
    }
    
    if(this.checkForWin()){
      this.gameOver = true;

      // If game is over and Player 1 went 1st, next game Player 2 goes 1st.

      this.updateScoreBoard();

      return;
    }else{
      this.gameOver = false;
    }

    if(!this.isThereLeftTurns() && !this.gameOver){

      // Draw
      
      this.gameOver = true;
      result.innerText = "DRAW!";
    }
  }

  isThereLeftTurns(){
    return this.leftTurns != 0;
  }

  updateScoreBoard(){

    // We need to always select new elements because innerHTML deletes the old ones.

    let scoreP1Span = document.querySelector('[data-score-p1]');
    let scoreP2Span = document.querySelector('[data-score-p2]');

    scoreP1Span.innerText = this.scoreP1;
    scoreP2Span.innerText = this.scoreP2;
  }

  resetScore(){
    result.innerText = ""; // Delete win message.
    this.scoreP1 = 0; // Set scores to 0
    this.scoreP2 = 0; // Set scores to 0
    this.updateScoreBoard(); // Update scoreboard
    fields.forEach(field => {
      field.innerText = '';
    }); // Clear the fields and prepare game.
    this.turnPlayer = 1; // Player 1 goes first.
    this.startPlayer = 1; // Player 1 starts.
    this.gameOver = false // Game is not over.
    this.scoreP1 = this.scoreP2 = 0; // Set scores to 0.
    this.leftTurns = 9; // Left moves.

    if(winningLine !== null){
      winningLine.style.display = "none";
    }
  }

  twoPlayersMode(){
    this.mode = 'two-players';
    this.resetScore();
  
    twoPlayers.style.backgroundColor = "rgba(255, 255, 255, .1)";
    twoPlayers.disabled = true;
    twoPlayers.style.cursor = 'not-allowed';
  
    vsComputer.style.backgroundColor = "transparent";
    vsComputer.disabled = false;
    vsComputer.style.cursor = 'pointer';
  
    scoreboardResult.innerHTML = "<div class='scoreboard-result'>\
    Player 1: <span data-score-p1=''>0</span>\
    <br>\
    Player 2: <span data-score-p2=''>0</span>\
    </div>";
  }

  vsComputerMode(){
    this.mode = 'vs-computer';
    this.resetScore();
  
    vsComputer.style.backgroundColor = "rgba(255, 255, 255, .1)";
    vsComputer.disabled = true;
    vsComputer.style.cursor = 'not-allowed';
  
    twoPlayers.style.backgroundColor = "transparent";
    twoPlayers.disabled = false;
    twoPlayers.style.cursor = 'pointer';
  
    scoreboardResult.innerHTML = "<div class='scoreboard-result'>\
    Player: <span data-score-p1=''>0</span>\
    <br>\
    Computer: <span data-score-p2=''>0</span>\
    </div>";
  }

  isFieldEmpty(field){
    return field.innerText === '' ? 1 : 0;
  }
  
  findShape(){
  
    // COMP STARTS FIRST
  
    if(this.startPlayer === 3){
  
      if(this.leftTurns === 9){
        return fields[0];
      }
  
      if(this.leftTurns === 7){
        if(this.isFieldEmpty(fields[8])){
          return fields[8];
        }
  
        return fields[6];
      }
  
      return this.checkDanger().field;
  
    }else{
  
      // PLAYER GOES FIRST
  
      if(this.leftTurns === 8){
        // da li je prazno polje 5
        if(this.isFieldEmpty(fields[4])){
          return fields[4];
        }else{
          return fields[0];
        }
      }
  
      if(this.leftTurns === 6){
        if((fields[0].innerText === 'X' && fields[8].innerText === 'X') || (fields[2].innerText === 'X' && fields[6].innerText === 'X')){
          return fields[1];
        }
      }
  
      return this.checkDanger().field;
    }
  }

  tryToWin(){

    let x = this.checkDanger('tryToWIn');

    if(x.dangerFrom !== 'X'){
      // I can win
      return x;
    }

    if(x.lastCombination)

    x.dangerFrom = 'Z';

    return x;
  }

  checkDanger(caller){

    if(caller !== 'tryToWIn'){
      let win = this.tryToWin();

      if(win.dangerFrom !== 'Z'){
        return win.field;
      }
    }

    // CHECK ALL DANGERS FOR FIELD 0 ******************

    let x = {
      field: fields[0],
      dangerFrom: 'Z',
      lastCombination: 0
    }
  
    if(fields[0].innerText === fields[1].innerText && this.isFieldEmpty(fields[2]) && fields[0].innerText !== ''){
      x.field = fields[2];
      x.dangerFrom = fields[0].innerText;
      x.lastCombination = 0;

      return x;
    }
  
    if(fields[0].innerText === fields[2].innerText && this.isFieldEmpty(fields[1]) && fields[0].innerText !== ''){
      x.field = fields[1];
      x.dangerFrom = fields[0].innerText;
      x.lastCombination = 0;

      return x;
    }
  
    if(fields[0].innerText === fields[3].innerText && this.isFieldEmpty(fields[6]) && fields[0].innerText !== ''){
      x.field = fields[6];
      x.dangerFrom = fields[0].innerText;
      x.lastCombination = 0;

      return x;
    }
  
    if(fields[0].innerText === fields[6].innerText && this.isFieldEmpty(fields[3]) && fields[0].innerText !== ''){
      x.field = fields[3];
      x.dangerFrom = fields[0].innerText;
      x.lastCombination = 0;

      return x;
    }
  
    if(fields[0].innerText === fields[4].innerText && this.isFieldEmpty(fields[8]) && fields[0].innerText !== ''){
      x.field = fields[8];
      x.dangerFrom = fields[0].innerText;
      x.lastCombination = 0;

      return x;
    }
  
    if(fields[0].innerText === fields[8].innerText && this.isFieldEmpty(fields[4]) && fields[0].innerText !== ''){
      x.field = fields[4];
      x.dangerFrom = fields[0].innerText;
      x.lastCombination = 0;

      return x;
    }
  
    // CHECK ALL DANGERS FOR FIELD 1 ******************
  
    if(fields[1].innerText === fields[2].innerText && this.isFieldEmpty(fields[0]) && fields[1].innerText !== ''){
      x.field = fields[0];
      x.dangerFrom = fields[1].innerText;
      x.lastCombination = 0;

      return x;
    }
  
    if(fields[1].innerText === fields[4].innerText && this.isFieldEmpty(fields[7]) && fields[1].innerText !== ''){
      x.field = fields[7];
      x.dangerFrom = fields[1].innerText;
      x.lastCombination = 0;

      return x;
    }
  
    if(fields[1].innerText === fields[7].innerText && this.isFieldEmpty(fields[4]) && fields[1].innerText !== ''){
      x.field = fields[4];
      x.dangerFrom = fields[1].innerText;
      x.lastCombination = 0;

      return x;
    }
  
    // CHECK ALL DANGERS FOR FIELD 2 ******************
  
    if(fields[2].innerText === fields[4].innerText && this.isFieldEmpty(fields[6]) && fields[2].innerText !== ''){
      x.field = fields[6];
      x.dangerFrom = fields[2].innerText;
      x.lastCombination = 0;

      return x;
    }
  
    if(fields[2].innerText === fields[6].innerText && this.isFieldEmpty(fields[4]) && fields[2].innerText !== ''){
      x.field = fields[4];
      x.dangerFrom = fields[2].innerText;
      x.lastCombination = 0;

      return x;
    }
  
    if(fields[2].innerText === fields[5].innerText && this.isFieldEmpty(fields[8]) && fields[2].innerText !== ''){
      x.field = fields[8];
      x.dangerFrom = fields[2].innerText;
      x.lastCombination = 0;

      return x;
    }
  
    if(fields[2].innerText === fields[8].innerText && this.isFieldEmpty(fields[5]) && fields[2].innerText !== ''){
      x.field = fields[5];
      x.dangerFrom = fields[2].innerText;
      x.lastCombination = 0;

      return x;
    }
  
    // CHECK ALL DANGERS FOR FIELD 3 ******************
  
    if(fields[3].innerText === fields[6].innerText && this.isFieldEmpty(fields[0]) && fields[3].innerText !== ''){
      x.field = fields[2];
      x.dangerFrom = fields[0].innerText;
      x.lastCombination = 0;

      return x;
    }
  
    if(fields[3].innerText === fields[4].innerText && this.isFieldEmpty(fields[5]) && fields[3].innerText !== ''){
      x.field = fields[5];
      x.dangerFrom = fields[3].innerText;
      x.lastCombination = 0;

      return x;
    }
  
    if(fields[3].innerText === fields[5].innerText && this.isFieldEmpty(fields[4]) && fields[3].innerText !== ''){
      x.field = fields[4];
      x.dangerFrom = fields[3].innerText;
      x.lastCombination = 0;

      return x;
    }
  
    // CHECK ALL DANGERS FOR FIELD 4 ******************
  
    if(fields[4].innerText === fields[5].innerText && this.isFieldEmpty(fields[3]) && fields[4].innerText !== ''){
      x.field = fields[3];
      x.dangerFrom = fields[4].innerText;
      x.lastCombination = 0;

      return x;
    }

    if(fields[4].innerText === fields[6].innerText && this.isFieldEmpty(fields[2]) && fields[4].innerText !== ''){
      x.field = fields[2];
      x.dangerFrom = fields[4].innerText;
      x.lastCombination = 0;

      return x;
    }
  
    if(fields[4].innerText === fields[7].innerText && this.isFieldEmpty(fields[1]) && fields[4].innerText !== ''){
      x.field = fields[1];
      x.dangerFrom = fields[4].innerText;
      x.lastCombination = 0;

      return x;
    }
  
    if(fields[4].innerText === fields[8].innerText && this.isFieldEmpty(fields[0]) && fields[4].innerText !== ''){
      x.field = fields[0];
      x.dangerFrom = fields[4].innerText;
      x.lastCombination = 0;

      return x;
    }
  
    // CHECK ALL DANGERS FOR FIELD 5 ******************
  
    if(fields[5].innerText === fields[8].innerText && this.isFieldEmpty(fields[2]) && fields[5].innerText !== ''){
      x.field = fields[2];
      x.dangerFrom = fields[0].innerText;
      x.lastCombination = 0;

      return x;
    }
  
    // CHECK ALL DANGERS FOR FIELD 6 ******************
  
    if(fields[6].innerText === fields[7].innerText && this.isFieldEmpty(fields[8]) && fields[6].innerText !== ''){
      x.field = fields[8];
      x.dangerFrom = fields[6].innerText;
      x.lastCombination = 0;

      return x;
    }
  
    if(fields[6].innerText === fields[8].innerText && this.isFieldEmpty(fields[7]) && fields[6].innerText !== ''){
      x.field = fields[7];
      x.dangerFrom = fields[6].innerText;
      x.lastCombination = 0;

      return x;
    }
  
    // CHECK ALL DANGERS FOR FIELD 7 ******************

    if(fields[7].innerText === fields[8].innerText && this.isFieldEmpty(fields[6]) && fields[7].innerText !== ''){
      x.field = fields[6];
      x.dangerFrom = fields[0].innerText;
      x.lastCombination = 1;

      return x;
    }
  
    // IF THERE IS NO DANGER CHECK CORNERS
  
    if(this.isFieldEmpty(fields[0])){
      x.field = fields[0];

      return x;
    }
  
    if(this.isFieldEmpty(fields[2])){
      x.field = fields[2];

      return x;
    }
  
    if(this.isFieldEmpty(fields[6])){
      x.field = fields[6];

      return x;
    }
  
    if(this.isFieldEmpty(fields[8])){
      x.field = fields[8];

      return x;
    }

    // IF CORNER IS NOT AVAILABLE PLAY AT FIRST EMPTY SPOT
  
    for(let i = 0; i < fields.length; i++){
      if(this.isFieldEmpty(fields[i])){
        x.field = fields[i];

        return x;
      }
    }

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
        board.mode === "two-players" ? result.innerText = "Player 1 wins!" : result.innerText = "Player wins!";
      }else{
        this.scoreP2++;
        board.mode === "two-players" ? result.innerText = "Player 2 wins!" : result.innerText = "Computer wins!";
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
      board.mode === "two-players" ? result.innerText = "Player 1 wins!" : result.innerText = "Player wins!";
    }else{
      this.scoreP2++;
      board.mode === "two-players" ? result.innerText = "Player 2 wins!" : result.innerText = "Computer wins!";
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
      board.mode === "two-players" ? result.innerText = "Player 1 wins!" : result.innerText = "Player wins!";
    }else{
      this.scoreP2++;
      board.mode === "two-players" ? result.innerText = "Player 2 wins!" : result.innerText = "Computer wins!";
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
      board.mode === "two-players" ? result.innerText = "Player 1 wins!" : result.innerText = "Player wins!";
    }else{
      this.scoreP2++;
      board.mode === "two-players" ? result.innerText = "Player 2 wins!" : result.innerText = "Computer wins!";
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
      board.mode === "two-players" ? result.innerText = "Player 1 wins!" : result.innerText = "Player wins!";
    }else{
      this.scoreP2++;
      board.mode === "two-players" ? result.innerText = "Player 2 wins!" : result.innerText = "Computer wins!";
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
      board.mode === "two-players" ? result.innerText = "Player 1 wins!" : result.innerText = "Player wins!";
    }else{
      this.scoreP2++;
      board.mode === "two-players" ? result.innerText = "Player 2 wins!" : result.innerText = "Computer wins!";
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
      board.mode === "two-players" ? result.innerText = "Player 1 wins!" : result.innerText = "Player wins!";
    }else{
      this.scoreP2++;
      board.mode === "two-players" ? result.innerText = "Player 2 wins!" : result.innerText = "Computer wins!";
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
        board.mode === "two-players" ? result.innerText = "Player 1 wins!" : result.innerText = "Player wins!";
      }else{
        this.scoreP2++;
        board.mode === "two-players" ? result.innerText = "Player 2 wins!" : result.innerText = "Computer wins!";
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

// VARIABLES

let scoreboardResult = document.querySelector(".scoreboard-result");
const fields = document.querySelectorAll('[data-field]');
const shapes = document.querySelectorAll('[data-shape]');
const result = document.querySelector("[data-result]");
const resetScore = document.querySelector('[data-reset-score]');
const playAgain = document.querySelector('[data-play-again]');
const vsComputer = document.querySelector('[data-vs-computer]');
const twoPlayers = document.querySelector('[data-two-players]');
let winningLine = document.querySelector('.winning-line');

let modal = document.getElementById("myModal");
let closeModalSpan = document.getElementsByClassName("close")[0];
let playerRadio = document.getElementsByClassName("player-radio")[0];
let computerRadio = document.getElementsByClassName("computer-radio")[0];

const board = new Board();

// EVENTS, FUNCTIONS

function fadeOutModal(modalForFade){
  modalForFade.classList.add("fadeout");
  setTimeout(function() {
    modalForFade.style.display = "none";
  }, 1000);
}

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

twoPlayers.addEventListener('click', () => {
  board.twoPlayersMode();
  board.startPlayer = 1;
  board.turnPlayer = 1;
});

vsComputer.addEventListener('click', () => {
  modal.classList.remove("fadeout");
  modal.style.display = "block";
  playerRadio.checked = false;
  computerRadio.checked = false;
});

closeModalSpan.onclick = function() {
  fadeOutModal(modal);
}

playerRadio.onclick = function() {
  fadeOutModal(modal);
  board.vsComputerMode();
  board.clear();
  board.resetScore();
  board.startPlayer = 1;
  board.turnPlayer = 1;
}

computerRadio.onclick = function() {
  fadeOutModal(modal);
  board.vsComputerMode();
  board.clear();
  board.resetScore();
  board.startPlayer = 3;
  board.turnPlayer = 3;
  let shapeToDraw = board.findShape();
  board.drawShape(shapeToDraw);
}