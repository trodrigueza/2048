const LENGTH = 100;
let quadrille, board;
let row, col;
let lastKey;
let score;

matrixMovements = []

function preload() {
  pics = []
  for(var i = 2; i <= 2048; i*= 2){
    pics.push(loadImage(`assets/${i}.png`))
  }
}

function setup() {
  tiles = []
  createCanvas(4 * LENGTH, 4 * LENGTH);
  board = createQuadrille([[0, 0, 0, 0],
                          [0, 0, 0, 0],
                          [0, 0, 0, 0],
                          [0, 0, 0, 0]])
  visual = createQuadrille(4, 4)
  pushTile()
  pushTile()
}

function draw() {
  background('#FFFFFF');
  drawQuadrille(board, {cellLength: LENGTH, outline: '#BBBBBB14', board: true}); 
  drawQuadrille(visual, {outline: '#BBBBBB00'})
  showPics()
  upd = check()
  if (upd) {
    console.log('You lose')
  }
}

function combine() {
  tilesToCombine = []
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      if (board._memory2D[i][j] == board._memory2D[i][j + 1] & board._memory2D[i][j] != 0){
        tilesToCombine.push([i, j])
      }
    }
  }
  for (var tile of tilesToCombine){
    board._memory2D[tile[0]][tile[1] + 1] += board._memory2D[tile[0]][tile[1] + 1]
    board._memory2D[tile[0]][tile[1]] = 0
    score += board._memory2D[tile[0]][tile[1] + 1]
  }
}

function move(){
  tilesToMove = []
  for (var i = 0; i < 4; i++){
    for (var j = 0; j < 4; j++){
      if (board._memory2D[i][j] != 0 & board._memory2D[i][j + 1] == 0) {
        tilesToMove.push([i, j])
      }
    }
  }
  
  for (var tile of tilesToMove){
    if (board._memory2D[tile[0]][tile[1] + 1] == 0){
      board._memory2D[tile[0]][tile[1] + 1] = board._memory2D[tile[0]][tile[1]]
      board._memory2D[tile[0]][tile[1]] = 0
    }
    move()
  }
}

function pushTile(tile = 2){
  emptyCells = []
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      if (board._memory2D[i][j] == 0){
        emptyCells.push([i, j])
      }
    }
  }
  randomCell = emptyCells[parseInt(random(0, emptyCells.length))]
  board._memory2D[randomCell[0]][randomCell[1]] = tile
}

function keyPressed() {
  if (key == 'p') {
    console.log(board._memory2D)
  }
  if (key == 'd'){
    prev = getBoard()
    move()
    combine()
    move()
    post = getBoard()
    if (prev != post) {
      pushTile()
    }
    console.log('>')
    console.log(score)
  }
  if (key == 's'){
    prev = getBoard()
    board.transpose()
    move()
    combine()
    move()
    board.transpose()
    post = getBoard()
    if (prev != post) {
      pushTile()
    }
    console.log('v')
    console.log(score)
  }
  if (key == 'w'){
    prev = getBoard()
    console.log(prev)
    board.reflect()
    board.transpose()
    move()
    combine()
    move()
    board.transpose()
    board.reflect()
    post = getBoard()
    console.log(post)
    if (prev != post) {
      pushTile()
    }
    console.log('^')
    console.log(score)
  }
  if (key == 'a'){
    prev = getBoard()
    move()
    combine()
    move()
    board.transpose()
 
    board.reflect()
    board.transpose()
    move()
    board.transpose()
    board.reflect()
    
    board.transpose()
    post = getBoard()
    if (prev != post) {
      pushTile()
    }
    console.log('<')
    console.log(score)
  }
}

function showPics(){
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      tileNum = board.memory2D[i][j]
      switch (tileNum) {
        case 0:
        visual.fill(i, j, 0)
        break
        case 2:
        visual.fill(i, j, pics[0])
        break
        case 4:
        visual.fill(i, j, pics[1])
        break
        case 8:
        visual.fill(i, j, pics[2])
        break
        case 16:
        visual.fill(i, j, pics[3])
        break
        case 32:
        visual.fill(i, j, pics[4])
        break
        case 64:
        visual.fill(i, j, pics[5])
        break
        case 128:
        visual.fill(i, j, pics[6])
        break
        case 256:
        visual.fill(i, j, pics[7])
        break
        case 512:
        visual.fill(i, j, pics[8])
        break
        case 1024:
        visual.fill(i, j, pics[9])
        break
        case 2048:
        visual.fill(i, j, pics[10])
        break
      }
    }
  }
}
  
function check(){
  nonCombinable = []
  for (var i = 0; i < 4; i++){
     for (var j = 0; j < 4; j++){
       if(board._memory2D[i][j] != board._memory2D[i][j + 1]) {
         nonCombinable.push([i, j])
       }
     }
  }
  if (nonCombinable.length >= 16) {
    return true
  }
  return false
}
  
function getBoard(){
  tiles = ''
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      tiles += board._memory2D[i][j]
    }
  }
  return tiles
}