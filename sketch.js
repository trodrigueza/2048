const LENGTH = 80;
let board, visual;
let row, col;
let score = 0; let scoreP;
let cols;
let play = false;
let playButton, restartButton, rowSlider;

function preload() {
  pics = [];
  for(var i = 2; i <= 2048; i*= 2){
    pics.push(loadImage(`assets/${i}.png`));
  }
}

function setup() {
  rowSlider = createSlider(4, 5, 4, 1).hide();
  cols = rowSlider.value();
  rowSlider.changed(restart);
  canvas = createCanvas(cols * LENGTH, cols * LENGTH);
  board = createQuadrille(cols, cols);
  visual = createQuadrille(cols, cols);
  pushTile();
  pushTile();

  playButton = createButton('Play');
  playButton.class('centerr');
  restartButton = createButton('Restart').hide();
  restartButton.class('leftt');
  scoreP = createP().hide();
  scoreP.class('downn');
}

function draw() {
  background('#FFFFFF');
  if(!play){
    playButton.mousePressed(() => {play = true; playButton.hide();});
  }

  if(play) {
    scoreP.show();
    scoreP.html(`Score: ${score}`);
    restartButton.show()
    restartButton.mousePressed(restart);
    drawQuadrille(board, {cellLength: LENGTH, outline: '#BBBBBB14', board: true}); 
    drawQuadrille(visual, {cellLength:LENGTH, outline: '#BBBBBB00'});
    showPics();
  }
}

function pushTile(){
  let emptyCells = [];
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < cols; j++) {
      if (board.read(i, j) == 0) {
        emptyCells.push([i, j]);
      }
    }
  }
  let randomCell = emptyCells[parseInt(random(0, emptyCells.length))];
  board.fill(randomCell[0], randomCell[1], random(2) > 0.5 ? 2 : 4);
}

function move(){
  let tilesToMove = [];
  for (var i = 0; i < cols; i++){
    for (var j = 0; j < cols; j++){
      if (board.read(i, j) != 0 & board.read(i, j + 1) == 0) {
        tilesToMove.push([i, j]);
      }
    }
  }
  
  for (var tile of tilesToMove){
    if (board.read(tile[0], tile[1] + 1) == 0) {
      board.fill(tile[0], tile[1] + 1, board.read(tile[0], tile[1]))
      board.fill(tile[0], tile[1], 0);
    }
    move();
  }
}

function combine() {
  let tilesToCombine = [];
  for (var i = cols - 1; i >= 0; i--) {
    for (var j = cols - 1; j >= 0; j--) {
      if (board.read(i, j) == board.read(i, j + 1) & board.read(i, j) != 0){
        tilesToCombine.push([i, j]);
        j--;
      }
    }
  }
  for (var tile of tilesToCombine) {
    sum = board.read(tile[0], tile[1]) * 2;
    score += sum
    board.fill(tile[0], tile[1] + 1, board.read(tile[0], tile[1] + 1) * 2);
    board.fill(tile[0], tile[1], 0);
  }
}

function moveCmove() {
    move();
    combine();
    move();
}

function checkAndPush(prev, post) {
  if (prev != post) {
    pushTile();
  }
}

function keyPressed() {
  let prev, post;
  if (key) {
    console.log(score);
  }
  if (keyCode === RIGHT_ARROW){
    prev = getBoard();
    moveCmove()
    post = getBoard();
    checkAndPush(prev, post)
  }
  if (keyCode === DOWN_ARROW){
    prev = getBoard();
    board.transpose();
    moveCmove()
    board.transpose();
    post = getBoard();
    checkAndPush(prev, post)
  }
  if (keyCode === UP_ARROW){
    prev = getBoard();
    board.reflect();
    board.transpose();
    moveCmove()
    board.transpose();
    board.reflect();
    post = getBoard();
    checkAndPush(prev, post)
  }
  if (keyCode === LEFT_ARROW){
    prev = getBoard();
    
    board.transpose();
 
    board.reflect();
    board.transpose();
    moveCmove()
    move();
    board.transpose();
    board.reflect();
    
    board.transpose();
    post = getBoard();
    checkAndPush(prev, post)
  }
}

function showPics(){
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < cols; j++) {
      let tileNum = board.read(i, j);
      switch (tileNum) {
        case 0:
        visual.fill(i, j, 0);
        break;
        case 2:
        visual.fill(i, j, pics[0]);
        break;
        case 4:
        visual.fill(i, j, pics[1]);
        break;
        case 8:
        visual.fill(i, j, pics[2]);
        break;
        case 16:
        visual.fill(i, j, pics[3]);
        break;
        case 32:
        visual.fill(i, j, pics[4]);
        break;
        case 64:
        visual.fill(i, j, pics[5]);
        break;
        case 128:
        visual.fill(i, j, pics[6]);
        break;
        case 256:
        visual.fill(i, j, pics[7]);
        break;
        case 512:
        visual.fill(i, j, pics[8]);
        break;
        case 1024:
        visual.fill(i, j, pics[9]);
        break;
        case 2048:
        visual.fill(i, j, pics[10]);
        break;
      }
    }
  }
}
  
function getBoard() {
  let tiles = '';
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < cols; j++) {
      tiles += board._memory2D[i][j];
    }
  }
  return tiles;
}

function restart() {
  cols = rowSlider.value();
  board._memory2D = Array(cols).fill(0);
  for (var i = 0; i < cols; i++) { 
    board._memory2D[i] = Array(cols).fill(0);
  }
  drawQuadrille(board, {cellLength: LENGTH, outline: '#BBBBBB14', board: true}); 
  drawQuadrille(visual, {cellLength:LENGTH, outline: '#BBBBBB00'});
  pushTile(); pushTile(); score = 0;
}