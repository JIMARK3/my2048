data = [[0, 0, 0, 2],
[0, 0, 0, 2],
[0, 0, 0, 2],
[0, 0, 0, 2]]

_position = {
    up: 0,
    down: 1,
    left: 2,
    right: 3
}
Object.freeze(_position);

function mix(position) {
    if (position == _position.up) {

        return mixUp()
    }
    if (position == _position.down) {
        return mixDown();
    }
    if (position == _position.left) {
        return mixLeft();
    }
    if (position == _position.right) {
        return mixRight();
    }
}

function mixUp() {

    for (let i = 0; i < 4; i++) {
        mixColUp(i);
    }

}

function mixColUp(colIndex) {
    for (let i = 1; i < 4; i++) {
        if (data[i][colIndex] == data[i - 1][colIndex]) {
            data[i - 1][colIndex] *= 2;
            data[i][colIndex] = 0;
            return;
        };
    }
}


function mixDown() {

    for (let i = 0; i < 4; i++) {
        mixColDown(i);
    }
}

function mixColDown(colIndex) {
    for (let i = 2; i >= 0; i--) {
        if (data[i][colIndex] == data[i + 1][colIndex]) {
            data[i + 1][colIndex] *= 2;
            data[i][colIndex] = 0;
            return;
        };
    }
}

function mixLeft() {

    for (let i = 0; i < 4; i++) {
        mixRowLeft(i);
    }
}

function mixRowLeft(rowIndex) {
    for (let i = 1; i < 4; i++) {
        if (data[rowIndex][i] == data[rowIndex][i - 1]) {
            data[rowIndex][i - 1] *= 2;
            data[rowIndex][i] = 0;
            return;
        };
    }
}

function mixRight() {

    for (let i = 0; i < 4; i++) {
        mixRowRight(i);
    }
}

function mixRowRight(rowIndex) {
    for (let i = 2; i >= 0; i--) {
        if (data[rowIndex][i] == data[rowIndex][i + 1]) {
            data[rowIndex][i + 1] *= 2;
            data[rowIndex][i] = 0;
            return;
        };
    }
}

function move(position) {
    if (position == _position.up) {
        for (let i = 0; i < 4; i++) {
            moveColUp(i);
        }
        return;
    }
    if (position == _position.down) {
        for (let i = 0; i < 4; i++) {
            moveColDown(i);
        }
        return;
    }
    if (position == _position.left) {
        for (let i = 0; i < 4; i++) {
            moveRowLeft(i)
        }
        return;
    }
    if (position == _position.right) {
        for (let i = 0; i < 4; i++) {
            moveRowRight(i)
        }
        return;
    }
}


function moveRowLeft(rowIndex) {
    for (let i = 0; i < 4; i++) {
        moveItemLeft(rowIndex, i);
    }
}
function moveRowRight(rowIndex) {
    for (let i = 3; i >= 0; i--) {
        moveItemRight(rowIndex, i);
    }
}
function moveColUp(colindex) {
    for (let i = 0; i < 4; i++) {
        moveItemUp(i, colindex);
    }
}
function moveColDown(colindex) {
    for (let i = 3; i >= 0; i--) {
        moveItemDown(i, colindex);
    }
}
function moveItemUp(rowIndex, colindex) {
    if (rowIndex == 0) return;
    if (data[rowIndex - 1][colindex] == 0) {
        data[rowIndex - 1][colindex] = data[rowIndex][colindex];
        data[rowIndex][colindex] = 0;
    }
}
function moveItemDown(rowIndex, colindex) {
    if (rowIndex == 3) return;
    if (data[rowIndex + 1][colindex] == 0) {
        data[rowIndex + 1][colindex] = data[rowIndex][colindex];
        data[rowIndex][colindex] = 0;
    }
}

function moveItemRight(rowIndex, colindex) {
    if (colindex == 3) return;
    if (data[rowIndex][colindex + 1] == 0) {
        data[rowIndex][colindex + 1] = data[rowIndex][colindex];
        data[rowIndex][colindex] = 0;
    }
}
function moveItemLeft(rowIndex, colindex) {
    if (colindex == 0) return;
    if (data[rowIndex][colindex - 1] == 0) {
        data[rowIndex][colindex - 1] = data[rowIndex][colindex];
        data[rowIndex][colindex] = 0;
    }
}


function play(position) {

    backup = data.toString();
    move(position);
    while (backup != data.toString()) {
        backup = data.toString();
        move(position);
    }
    mix(position);
    if (backup != data.toString()) {
        play(position);
    }
    
}

function twoOrFour() {
    let random = Math.floor(Math.random() * 2);
    if (random == 0) return 2;
    if (random == 1) return 4;
}

function generateRandom() {
    let random = Math.floor(Math.random() * 4);
    let random2 = Math.floor(Math.random() * 4);
    if (data[random][random2] == 0) {
        data[random][random2] = twoOrFour();
        return;
    }
    generateRandom();
}

function game(position) {
    play(position);
    generateRandom();
}
document.addEventListener("keydown", function (event) {
    console.log(event.key)
    if (event.key === "w") {
        game(_position.up);
        console.log(data)
        updateInners();
        return
    }
    if (event.key === "s") {
        game(_position.down);
        console.log(data)
        updateInners();
        return
    }
    if (event.key === "a") {
        game(_position.left);
        console.log(data)
        updateInners();
        return
    }
    if (event.key === "d") {
        game(_position.right);
        console.log(data)
        updateInners();
        return
    }
})

function updateInners() {
    inners = document.querySelectorAll(".inner");
    for (let i = 0; i < 16; i++) {
        row = Math.floor(i / 4);
        col = i % 4;
        if (data[row][col] == 0) {
            inners[i].innerText = "";
            continue;
        }
        inners[i].innerText = data[row][col]
        // console.log(inners[i])
    }
    // console.log(inners)
}
updateInners();

