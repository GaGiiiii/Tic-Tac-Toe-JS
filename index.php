<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>TIC-TAC-TOE</title>
  <link href="//db.onlinewebfonts.com/c/ae8f19f441b335c3fda30febf5069c5a?family=Gotham+Rounded" rel="stylesheet" type="text/css">
  <link rel="stylesheet" href="style.css">
  <script src="script.js" defer></script>
</head>
<body>

  <div class="tictactoe-grid">
    <div class="header">
      TIC-TAC-TOE GAME
      <span data-result class="result"></span>
    </div>
    <div class="scoreboard">
      <div class="scoreboard-result">
        Player 1: <span data-score-p1>0</span>
        <br>
        Player 2: <span data-score-p2>0</span>
      </div>

      <button data-play-again class="play-again">Play Again</button>
      <br>
      <button data-reset-score class="reset-score">Reset Score</button>
      <br>
      <button data-vs-computer class="vs-computer">VS Computer</button>
      <br>
      <button data-two-players disabled class="two-players">Two players</button>
    </div>
    <div class="empty"></div>
    <button data-field class="no-top-border no-left-border"><span data-shape></span></button>
    <button data-field class="no-top-border"><span data-shape></span></button>
    <button data-field class="no-top-border no-right-border"><span data-shape></span></button>
    <button data-field class="no-left-border"><span data-shape></span></button>
    <button data-field><span data-shape></span></button>
    <button data-field class="no-right-border"><span data-shape></span></button>
    <button data-field class="no-left-border no-bottom-border"><span data-shape></span></button>
    <button data-field class="no-bottom-border"><span data-shape></span></button>
    <button data-field class="no-right-border no-bottom-border"><span data-shape></span></button>
  </div>

  <div id="myModal" class="modal">
    <div class="modal-content">
      <span class="close">&times;</span>
      <p>First goes:</p>
      <input type="radio" class="player-radio" name="player" value="player"> Player<br>
      <input type="radio" class="computer-radio" name="computer" value="computer"> Computer<br>
    </div>
  </div>

</body>
</html>