/**
 * Created by Administrator on 2016/8/10 0010.
 */
var screenW=$(window).width();
var screenH=$(window).height();
var gridBox=screenW*0.9;
var gridCell=gridBox*0.2125;
var spaceCell=gridBox*0.03;
var fontSize=gridCell*0.4;
var h2Font=gridCell*0.34;
//获取小方格距离顶部距离
function getPosTop(i, j) {
    return spaceCell * (i + 1) + i * gridCell;
}
//获取小方格距离左边的距离
function getPosLeft(i, j) {
    return spaceCell * (j + 1) + j * gridCell;
}

//获取不同数字的背景色
function getNumberBgColor(number) {
    switch (number) {
        case 2:
            return "#eee4da";
            break;
        case 4:
            return "#ede0c8";
            break;
        case 8:
            return "#f69562";
            break;
        case 16:
            return "#f29461";
            break;
        case 32:
            return "#fb7a5b";
            break;
        case 64:
            return "#f7623a";
            break;
        case 128:
            return "#edcf75";
            break;
        case 256:
            return "#edcc61";
            break;
        case 512:
            return "#e2bf30";
            break;
        case 1024:
            return "#e4b905";
            break;
        case 2048:
            return "#edc811";
            break;
        case 4096:
            return "#edc811";
            break;
        case 8192:
            return "#93c";
            break;
    }
    return 'black';
}
//获取不同数字的文字颜色
function getNumberColor(number) {
    if (number <= 4) {
        return '#6b6157';
    }
    return 'white';
}

//棋盘格是否有空间生成新的数字
function noSpace(grid) {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (grid[i][j] == 0) {                     //当前棋盘格还有空间
                return false;
            }
        }
    }
    return true;
}

//显示数字时的动画
function showNumAnimate(i, j, randomNum) {
    var numberCell = $('#number-cell-' + i + "-" + j);

    //数字的样式
    numberCell.css({
        backgroundColor: getNumberBgColor(randomNum),
        color: getNumberColor(randomNum)
    });
    numberCell.text(randomNum);

    //数字的动画
    numberCell.animate({
        width: gridCell,
        height: gridCell,
        top: getPosTop(i, j),
        left: getPosLeft(i, j)
    }, 50);
}


//移动动画效果
function moveAnimate(fromX, fromY, toX, toY) {
    var numberCell = $('#number-cell-' + fromX + '-' + fromY);
    numberCell.animate({
        top: getPosTop(toX, toY),
        left: getPosLeft(toX, toY)
    }, 200);
}



//当前是否可以向左移动
function canMoveLeft(grid) {
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {               //不包括最左侧的一列
            if (grid[i][j] != 0) {                  //如果右边三列中有数字
                if (grid[i][j - 1] == 0 || grid[i][j - 1] == grid[i][j]) {  //每列左侧没有数字和左侧数字与本身相等
                    return true;
                }
            }
        }
    }
    return false;
}

//当前是否可以向右移动
function canMoveRight( grid ){

    for( var i = 0 ; i < 4 ; i ++ ) {
        for (var j = 2; j >= 0; j--) {
            if (grid[i][j] != 0) {
                if (grid[i][j + 1] == 0 || grid[i][j + 1] == grid[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}

//当前是否可以向上移动
function canMoveUp( grid ){

    for( var j = 0 ; j < 4 ; j ++ ) {
        for (var i = 1; i < 4; i++) {
            if (grid[i][j] != 0) {
                if (grid[i - 1][j] == 0 || grid[i - 1][j] == grid[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}

//当前是否可以向下移动
function canMoveDown( grid ){

    for( var j = 0 ; j < 4 ; j ++ ) {
        for (var i = 2; i >= 0; i--) {
            if (grid[i][j] != 0) {
                if (grid[i + 1][j] == 0 || grid[i + 1][j] == grid[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}




//判断有无障碍物
function noBarrierX(row, col1, col2, grid) {
    for (var i = col1 + 1; i < col2; i++) {
        if (grid[row][i] != 0) {                   //此时存在障碍物
            return false;
        }
    }
    return true;
}
function noBarrierY(col, row1, row2, grid) {
    for (var i = row1 + 1; i < row2; i++) {
        if (grid[i][col] != 0) {                  //此时存在障碍物
            return false;
        }
    }
    return true;
}


//判断是否可以移动
function noMove(grid){
    if(canMoveLeft(grid)||canMoveRight(grid)||canMoveUp(grid)||canMoveDown(grid)) {
        return false;
    }
    return true;
}

//更新得分
function updateScore(score) {
    $(".user-score").text(score);
}
