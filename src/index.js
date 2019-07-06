module.exports = function solveSudoku(matrix) {
  for (var horizontal = 0; horizontal < 9; horizontal++) {
    if (matrix[horizontal].includes(0)) {
      for (var vertical = 0; vertical < 9; vertical++) {
        if (matrix[horizontal][vertical] == 0) {
          var incorrectVals = findIncorrectVals(matrix, horizontal, vertical);

          if (incorrectVals.length == 1) {
            matrix[horizontal][vertical] = incorrectVals[0];
          } else {
            for (var val of incorrectVals) {
              var matrixCopy = matrix.map(horizontal => [...horizontal]);
              matrixCopy[horizontal][vertical] = val;
              var result = solveSudoku(matrixCopy);
              if (result) {
                return result
              }
            }
            return false
          }
        }
      }
    }
  }
  return matrix;
}

function findIncorrectVals(matrix, horizontal, vertical) {
  var newHorizontal = Math.floor(horizontal / 3) * 3;
  var newVertical = Math.floor(vertical / 3) * 3;

  var values = matrix[horizontal].concat(matrix.map(a => a[vertical]));
  var subsquare = matrix.map(x => x.slice(newVertical, newVertical + 3)).slice(newHorizontal, newHorizontal + 3);
  values = values.concat([].concat(...subsquare)).filter(x => x != 0);
  values = [...new Set(values)];

  var incorrectVals = [];
  for (var i = 1; i <= 9; i++) {
    if (!values.includes(i))
      incorrectVals.push(i);
  }
  return incorrectVals;
}