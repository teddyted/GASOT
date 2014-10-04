function board(cols, rows, EMPTYCHAR, FIT_ATTEMPTS) {
    this.cols = cols;
    this.rows = rows;
    var activeWordList = []; //keeps array of words actually placed in board
    var acrossCount = 0;
    var downCount = 0;
    var coordList = [];
    if (!EMPTYCHAR) EMPTYCHAR = '&nbsp;';
    if (!FIT_ATTEMPTS) FIT_ATTEMPTS = 2;

    var grid = new Array(cols); //create 2 dimensional array for letter grid
    for (var i = 0; i < rows; i++) {
        grid[i] = new Array(rows);
    }

    for (var x = 0; x < cols; x++) {
        for (var y = 0; y < rows; y++) {
            grid[x][y] = {};
            grid[x][y].targetChar = EMPTYCHAR; //target character, hidden
            grid[x][y].indexDisplay = ''; //used to display index number of word start
            grid[x][y].value = '-'; //actual current letter shown on board
        }
    }

    function suggestCoords(word) { //search for potential cross placement locations
        var c = '';
        var coordCount = [];
        var coordCount = 0;
        for (i = 0; i < word.length; i++) { //cycle through each character of the word
            for (x = 0; x < rows; x++) {
                for (y = 0; y < cols; y++) {
                    c = word[i];
                    if (grid[x][y].targetChar == c) { //check for letter match in cell
                        if (x - i + 1> 0 && x - i + word.length-1 < rows) { //would fit vertically?
                            coordList[coordCount] = {};
                            coordList[coordCount].x = x - i;
                            coordList[coordCount].y = y;
                            coordList[coordCount].score = 0;
                            coordList[coordCount].vertical = true;
                            coordCount++;
                        }

                        if (y - i + 1 > 0 && y - i + word.length-1 < cols) { //would fit horizontally?
                            coordList[coordCount] = {};
                            coordList[coordCount].x = x;
                            coordList[coordCount].y = y - i;
                            coordList[coordCount].score = 0;
                            coordList[coordCount].vertical = false;
                            coordCount++;
                        }
                    }
                }
            }
        }
    }

    function checkFitScore(word, x, y, vertical) {
        var fitScore = 1; //default is 1, 2+ has crosses, 0 is invalid due to collision

        if (vertical) { //vertical checking
            for (i = 0; i < word.length; i++) {
                if (i == 0 && x > 0) { //check for empty space preceeding first character of word if not on edge
                    if (grid[x - 1][y].targetChar != EMPTYCHAR) { //adjacent letter collision
                        fitScore = 0;
                        break;
                    }
                } else if (i == word.length && x < rows) { //check for empty space after last character of word if not on edge
                    if (grid[x+i+1][y].targetChar != EMPTYCHAR) { //adjacent letter collision
                        fitScore = 0;
                        break;
                    }
                }
                if (x + i < rows) {
                    if (grid[x + i][y].targetChar == word[i]) { //letter match - aka cross point
                        fitScore += 1;
                    } else if (grid[x + i][y].targetChar != EMPTYCHAR) { //letter doesn't match and it isn't empty so there is a collision
                        fitScore = 0;
                        break;
                    } else { //verify that there aren't letters on either side of placement if it isn't a crosspoint
                        if (y < cols - 1) { //check right side if it isn't on the edge
                            if (grid[x + i][y + 1].targetChar != EMPTYCHAR) { //adjacent letter collision
                                fitScore = 0;
                                break;
                            }
                        }
                        if (y > 0) { //check left side if it isn't on the edge
                            if (grid[x + i][y - 1].targetChar != EMPTYCHAR) { //adjacent letter collision
                                fitScore = 0;
                                break;
                            }
                        }
                    }
                }

            }

        } else { //horizontal checking
            for (i = 0; i < word.length; i++) {
                if (i == 0 && y > 0) { //check for empty space preceeding first character of word if not on edge
                    if (grid[x][y-1].targetChar != EMPTYCHAR) { //adjacent letter collision
                        fitScore = 0;
                        break;
                    }
                } else if (i == word.length - 1 && y + i < cols -1) { //check for empty space after last character of word if not on edge
                    if (grid[x][y + i + 1].targetChar != EMPTYCHAR) { //adjacent letter collision
                        fitScore = 0;
                        break;
                    }
                }
                if (y + i < cols) {
                    if (grid[x][y + i].targetChar == word[i]) { //letter match - aka cross point
                        fitScore += 1;
                    } else if (grid[x][y + i].targetChar != EMPTYCHAR) { //letter doesn't match and it isn't empty so there is a collision
                        fitScore = 0;
                        break;
                    } else { //verify that there aren't letters on either side of placement if it isn't a crosspoint
                        if (x < rows) { //check top side if it isn't on the edge
                            if (grid[x + 1][y + i].targetChar != EMPTYCHAR) { //adjacent letter collision
                                fitScore = 0;
                                break;
                            }
                        }
                        if (x > 0) { //check bottom side if it isn't on the edge
                            if (grid[x - 1][y + i].targetChar != EMPTYCHAR) { //adjacent letter collision
                                fitScore = 0;
                                break;
                            }
                        }
                    }
                }

            }
        }

        return fitScore;
    }

    function placeWord(word, clue, x, y, vertical) { //places a new active word on the board

        var wordPlaced = false;

        if (vertical) {
            if (word.length + x < rows) {
                for (i = 0; i < word.length; i++) {
                    grid[x + i][y].targetChar = word[i];
                }
                wordPlaced = true;
            }
        } else {
            if (word.length + y < cols) {
                for (i = 0; i < word.length; i++) {
                    grid[x][y + i].targetChar = word[i];
                }
                wordPlaced = true;
            }
        }

        if (wordPlaced) {
            var currentIndex = activeWordList.length;
            activeWordList[currentIndex] = {};
            activeWordList[currentIndex].word = word;
            activeWordList[currentIndex].clue = clue;
            activeWordList[currentIndex].x = x;
            activeWordList[currentIndex].y = y;
            activeWordList[currentIndex].vertical = vertical;

            if (activeWordList[currentIndex].vertical) {
                downCount++;
                activeWordList[currentIndex].number = downCount;
            } else {
                acrossCount++;
                activeWordList[currentIndex].number = acrossCount;
            }
        }

    }

    function randomIntFromInterval(min,max)
    {
        return Math.floor(Math.random()*(max-min+1)+min);
    }

    function shuffleArray(arr){

        var r = [];

        var temp = arr;

        var newIndex = 0;

        do {
            newIndex = randomIntFromInterval(0, temp.length - 1);

            r.push( temp[newIndex] );

            temp.splice(newIndex, 1);

        } while (temp.length > 0);

        return r;
    }


    function isActiveWord(word) {
        if (activeWordList.length > 0) {
            for (var w = 0; w < activeWordList.length; w++) {
                if (word == activeWordList[w].word) {
                    //console.log(word + ' in activeWordList');
                    return true;
                }
            }
        }
        return false;
    }

    this.displayGrid = function displayGrid() {

        var rowStr = "";
        for (var x = 0; x < cols; x++) {

            for (var y = 0; y < rows; y++) {
                rowStr += "<td>" + grid[x][y].targetChar + "</td>";
            }
            $('#tableCrossword').append("<tr>" + rowStr + "</tr>");
            rowStr = "";

        }

    }

    this.clearBoard = function(){
        $('#tableCrossword').empty();
    }

//for each word in the source array we test where it can fit on the board and then test those locations for validity against other already placed words
    this.generateBoard = function generateBoard(wordArray) {

        var bestScoreIndex = 0;
        var top = 0;
        var fitScore = 0;
        var startTime;

        //manually place the longest word horizontally at 0,0
        placeWord(wordArray[0].word, wordArray[0].clue, 0, 0, false);

        //attempt to fill the rest of the board
        for (var iy = 0; iy < FIT_ATTEMPTS; iy++) { //usually 2 times is enough for max fill potential
            for (var ix = 1; ix < wordArray.length; ix++) {
                if (!isActiveWord(wordArray[ix].word)) { //only add if not already in the active word list
                    var topScore = 0;
                    bestScoreIndex = 0;

                    suggestCoords(wordArray[ix].word); //fills coordList and coordCount
                    coordList = shuffleArray(coordList); //adds some randomization

                    if (coordList[0]) {
                        for (c = 0; c < coordList.length; c++) { //get the best fit score from the list of possible valid coordinates
                            fitScore = checkFitScore(wordArray[ix].word, coordList[c].x, coordList[c].y, coordList[c].vertical);
                            if (fitScore > topScore) {
                                topScore = fitScore;
                                bestScoreIndex = c;
                            }
                        }
                    }

                    if (topScore > 1) { //only place a word if it has a fitscore of 2 or higher

                        placeWord(wordArray[ix].word, wordArray[ix].clue, coordList[bestScoreIndex].x, coordList[bestScoreIndex].y, coordList[bestScoreIndex].vertical);
                    }
                }

            }
        }
    }
}


