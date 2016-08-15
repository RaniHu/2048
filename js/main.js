var grid = new Array();               //声明一个一维数组
var score = 0;
var isAdd = new Array();                //数字是否已经叠加过

var startX = 0;
var startY = 0;
var endX = 0;
var endY = 0;

var gridWidth=$(".grid-cell").width();

$(function () {
    newGame();

    var clientW = $(window).width();
    var clientH = $(window).height();

    if(clientW < 600){
        $(".container").css({
            width: clientW+'px',
            height: clientH+'px',
            margin:'0 auto'
        });
    }
/*
    if (clientW < 800){
        $(".container").css({
            width: clientW+'px',
            height: clientH+'px',
            margin:'0 auto'
        });
        $(".container .box").css({
            width: '90%',
            height: '93%',
            padding: '3.5% 5%'
        });
        $(".container .box header").css({
            width: '100%',
            height: '17%'
        });
        $(".container .box header h1").css({
            width: '19%',
            height: '90%',

        })
        $(".container .box .main").css({
            width: '100%',
            height: '78%',
            margin: '6% auto'

        }) ;
        $(".container .box .main ul#grid-box").css({
            width: '97%',
            height: '97%',
            padding: '1.5%'
        })
        $(".container .box .main ul#grid-box li.grid-cell").css({
            width: '22%',
            height: '22%'
        })
        $(".container .box .main ul#grid-box .number-cell").css({
            width: '22%',
            height: '22%',
            lineHeight: '22%'
        })

    }

*/



        })


function newGame() {
    //初始化期盼格子
    init();

    //随机两个格子中生成数字
    generateOneNumber();
    generateOneNumber();
}


//初始化期盼格子
function init() {

    for (var i = 0; i < 4; i++) {                           //i为行高,j为列高 设置每个小格子位置
        for (var j = 0; j < 4; j++) {
            var gridCell = $("#grid-cell-" + i + "-" + j);
            gridCell.css({
                top: getPosTop(i, j),
                left: getPosLeft(i, j)
            })
        }
    }

    //将一维数组变成二维数组
    for (var i = 0; i < 4; i++) {
        grid[i] = new Array();
        isAdd[i] = new Array();
        for (var j = 0; j < 4; j++) {
            grid[i][j] = 0;
            isAdd[i][j] = false;
        }
    }

    updateGridView();
    score = 0;

}


//根据grid变量的值对number-cell在页面中显示的进行操作
function updateGridView() {
    $(".number-cell").remove();
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            $("#grid-box").append('<div class="number-cell" id="number-cell-' + i + '-' + j + '"></div>')
            var numberCell = $("#number-cell-" + i + '-' + j);

            //此时没有number-cell
            if (grid[i][j] == 0) {
                numberCell.css({
                    width: '0px',
                    height: '0px',
                    top: getPosTop(i, j) +gridWidth/2 ,
                    left: getPosLeft(i, j) + gridWidth/2
                })
            }
            //此时number-cell完全覆盖grid-cell
            else {
                numberCell.css({
                    width: gridWidth/2,
                    height: gridWidth/2,
                    top: getPosTop(i, j),
                    left: getPosLeft(i, j),
                    backgroundColor: getNumberBgColor(grid[i][j]),
                    color: getNumberColor(grid[i][j])
                });
                numberCell.text(grid[i][j]);
            }
            isAdd[i][j] = false;
        }
    }

}


//随机生成一个新的数字
function generateOneNumber() {
    var times = 0;
    if (noSpace(grid)) {
        return false;           //此时棋盘格已经没有空间
    }
    else {

        //随机一个位置
        var randomPosX = Math.floor(Math.random() * 4);             //生成0-1之间的随机数*4 生成0-4之间的浮点随机数 再向下取整
        var randomPosY = Math.floor(Math.random() * 4);             //生成0-1之间的随机数*4 生成0-4之间的浮点随机数 再向下取整

        while (times < 50) {
            if (grid[randomPosX][randomPosY] == 0) {
                break;                                         //如果生成的随机数对应的位置的是0则停止

            } else {                                           //否则重新生成坐标
                randomPosX = Math.floor(Math.random() * 4);
                randomPosY = Math.floor(Math.random() * 4);
                times++;
            }
        }
        if (times == 50) {                                          //当随机到第50次时，寻找坐标为0的位置
            for (var i = 0; i < 4; i++) {
                for (var j = 0; j < 4; j++) {
                    if (grid[i][j] == 0) {
                        randomPosX = i;
                        randomPosY = j;
                    }
                }
            }
        }

        //随机一个数字(2或4)
        var randomNum = Math.random() < 0.5 ? 2 : 4;          //判断随机数是否小于0.5，如果小于则随机数为2否则为4

        //在随机位置显示数字
        grid[randomPosX][randomPosY] = randomNum;

        showNumAnimate(randomPosX, randomPosY, randomNum);

        return true;
    }
}

//玩家按下键盘时
$(document).keydown(function (event) {
    switch (event.keyCode) {
        case 37 :           //左
            event.preventDefault();                                 //阻止按下键盘是滚动条滚动
            if (moveLeft()) {
                setTimeout(generateOneNumber(), 200);
                setTimeout(isGameOver(), 300);
            }
            break;
        case 38 :           //上
            event.preventDefault();                                 //阻止按下键盘是滚动条滚动
            if (moveUp()) {
                setTimeout(generateOneNumber(), 200);
                setTimeout(isGameOver(), 300);
            }
            break;
        case 39 :           //右
            event.preventDefault();                                 //阻止按下键盘是滚动条滚动
            if (moveRight()) {
                setTimeout(generateOneNumber(), 200);
                setTimeout(isGameOver(), 300);
            }
            break;
        case 40 :           //下
            event.preventDefault();                                 //阻止按下键盘是滚动条滚动
            if (moveDown()) {
                setTimeout(generateOneNumber(), 200);
                setTimeout(isGameOver(), 300);
            }
            break;
        default :
            break;

    }
});

//手指触摸屏幕
document.addEventListener('touchstart', function (event) {
    startX = event.touches[0].pageX;
    startY = event.touches[0].pageY;
});
//手指离开屏幕
document.addEventListener('touchend', function (event) {
    endX = event.changedTouches[0].pageX;
    endY = event.changedTouches[0].pageY;

    var disX = endX - startX;
    var disY = endY - startY;

    if (Math.abs(disX) == 0 || Math.abs(disY) == 0) {
        return;
    }

    //x横向滑动
    if (Math.abs(disX) >= Math.abs(disY)) {
        //向右滑动
        if (disX > 0) {
            if (moveRight()) {
                setTimeout(generateOneNumber(), 200);
                setTimeout(isGameOver(), 300);
            }
        }
        //向左滑动
        else {
            if (moveLeft()) {
                setTimeout(generateOneNumber(), 200);
                setTimeout(isGameOver(), 300);
            }
        }
    }

    //y纵向滑动
    else {
        //向下滑动
        if (disX > 0) {
            if (moveDown()) {
                setTimeout(generateOneNumber(), 200);
                setTimeout(isGameOver(), 300);
            }
        }
        //向上滑动
        else {
            if (moveUp()) {
                setTimeout(generateOneNumber(), 200);
                setTimeout(isGameOver(), 300);
            }
        }
    }

});


//游戏结束
function isGameOver() {
    if (noSpace(grid) && noMove(grid)) {                       //当没有空格并且没有相同数字可以合并时
        gameOver();
    }
}
function gameOver() {
    alert("游戏结束")
}

//向左移动
function moveLeft() {

    if (!canMoveLeft(grid)) {
        return false;
    }
    else {
        //moveLeft
        for (var i = 0; i < 4; i++) {
            for (var j = 1; j < 4; j++) {
                if (grid[i][j] != 0) {

                    for (var k = 0; k < j; k++) {                               //k为左侧数字的坐标
                        if (grid[i][k] == 0 && noBarrierX(i, k, j, grid)) {     //左侧没有数字且与要移动数字间没有障碍物
                            //move
                            moveAnimate(i, j, i, k);
                            grid[i][k] = grid[i][j];                            //左侧数字直接移动到左侧某位置
                            grid[i][j] = 0;
                            continue;
                        }
                        else if (grid[i][k] == grid[i][j] && noBarrierX(i, k, j, grid) && !isAdd[i][k]) {
                            //move
                            moveAnimate(i, j, i, k);                            //左侧与左侧数字相等、无障碍物且没有叠加过
                            //add
                            grid[i][k] += grid[i][j];                           //左侧数字=右侧+本身
                            grid[i][j] = 0;

                            //add score
                            score += grid[i][k];                                  //更新页面分数
                            updateScore(score);

                            isAdd[i][k] = true;

                            continue;
                        }
                    }
                }
            }
        }
        setTimeout("updateGridView()", 200);
        return true;

    }
}

//向右移动
function moveRight() {
    if (!canMoveRight(grid)) {
        return false;
    }

    //moveRight
    else {
        for (var i = 0; i < 4; i++) {
            for (var j = 2; j >= 0; j--) {
                if (grid[i][j] != 0) {
                    for (var k = 3; k > j; k--) {

                        if (grid[i][k] == 0 && noBarrierX(i, j, k, grid)) {
                            moveAnimate(i, j, i, k);
                            grid[i][k] = grid[i][j];
                            grid[i][j] = 0;
                            continue;
                        }
                        else if (grid[i][k] == grid[i][j] && noBarrierX(i, j, k, grid) && !isAdd[i][k]) {
                            moveAnimate(i, j, i, k);
                            grid[i][k] *= 2;
                            grid[i][j] = 0;
                            score += grid[i][k];
                            updateScore(score);

                            isAdd[i][k] = true;

                            continue;
                        }
                    }
                }
            }
        }

        setTimeout("updateGridView()", 200);
        return true;
    }
}

//向上移动
function moveUp() {

    if (!canMoveUp(grid)) {
        return false;
    }

    //moveUp
    else {
        for (var j = 0; j < 4; j++) {
            for (var i = 1; i < 4; i++) {
                if (grid[i][j] != 0) {
                    for (var k = 0; k < i; k++) {

                        if (grid[k][j] == 0 && noBarrierY(j, k, i, grid)) {
                            moveAnimate(i, j, k, j);
                            grid[k][j] = grid[i][j];
                            grid[i][j] = 0;
                            continue;
                        }
                        else if (grid[k][j] == grid[i][j] && noBarrierY(j, k, i, grid) && !isAdd[k][j]) {
                            moveAnimate(i, j, k, j);
                            grid[k][j] *= 2;
                            grid[i][j] = 0;
                            score += grid[k][j];
                            updateScore(score);

                            isAdd[i][k] = true;

                            continue;
                        }
                    }
                }
            }
        }
        setTimeout("updateGridView()", 200);
        return true;
    }
}

//向下移动
function moveDown() {
    if (!canMoveDown(grid)) {
        return false;
    }
    else {
        //moveDown
        for (var j = 0; j < 4; j++) {
            for (var i = 2; i >= 0; i--) {
                if (grid[i][j] != 0) {
                    for (var k = 3; k > i; k--) {

                        if (grid[k][j] == 0 && noBarrierY(j, i, k, grid)) {
                            moveAnimate(i, j, k, j);
                            grid[k][j] = grid[i][j];
                            grid[i][j] = 0;
                            continue;
                        }
                        else if (grid[k][j] == grid[i][j] && noBarrierY(j, i, k, grid) && !isAdd[k][j]) {
                            moveAnimate(i, j, k, j);
                            grid[k][j] *= 2;
                            grid[i][j] = 0;
                            score += grid[k][j];
                            updateScore(score);

                            isAdd[i][k] = true;
                            continue;
                        }
                    }
                }
            }
        }
        setTimeout("updateGridView()", 200);
        return true;
    }
}
