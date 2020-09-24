const wordSearch = (letters, word) => {
    return horizontalSearch(letters, word) || verticalSearch(letters, word) || diagonalSearch(letters, word);
};

const horizontalSearch = (matrix, word) => {
    for (let row of matrix) {
        if(rowSearch(row.join(''), word) || rowSearch(row.reverse().join(''), word))
            return true;
    }
};

const rowSearch = (str, word) => str.match(word);

const verticalSearch = (matrix, word) => {
    let transposed = transpose(matrix);
    return horizontalSearch(transposed, word);
}
const transpose = (array) => {
    let temp = [];
    let maxLen = 0;
    maxLen = array.reduce((max, arr) => Math.max(arr.length, max), 0);
    for (let i = 0; i < maxLen; i++) //initialize array size
        temp.push([]);
    for (let i = 0; i < array.length; i++) { //Grab reverse position from input matrix
        for (let j = 0; j < array[i].length; j++) {
            temp[j][i] = array[i][j];
        }
    }
    //replaces undefined values with empty character ' ' 
    for (let i = 0; i < temp.length; i++) {
        for (let j = 0; j < temp[i].length; j++)
            if (temp[i][j] === undefined)
                temp[i][j] = ' ';
    }
    return temp;
}

const reverse = matrix => {
    let reversed = [];
    for (let row of matrix) {
        reversed.push(row.reverse());
    }
    return reversed;
}

const diagonalSearch = (matrix, word) => {
    let transposed = transpose(matrix);
    let reversed = reverse(matrix);
    let transposedReversed = reverse(transpose(matrix));

    return searchDiagonal(matrix, word) || searchDiagonal(reversed, word) || searchDiagonal(transposed, word) || searchDiagonal(transposedReversed, word);
}

const searchDiagonal = (matrix, word) => {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] === word[0]) {
                let row = i + 1;
                let col = j + 1;
                let wordIndex = 1;
                while (matrix[row] && matrix[row][col] && matrix[row][col] === word[wordIndex] && wordIndex < word.length) {
                    row++;
                    col++;
                    wordIndex++;
                }
                if (wordIndex === word.length)
                    return true;
                wordIndex = 1;
            }
        }
    }
    return false;
}

module.exports = wordSearch