module.exports = function solveSudoku(matrix) {
  
  let matrixCopy = matrix; 
  let possibleValues = createEmptyArr();
  
  let changeFlag = true;
  extendCheckFlag = false;
  for (let i = 0 ; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (matrixCopy[i][j] == 0) {
        if (possibleValues[i][j].length == 0) {
          possibleValues[i][j] = [1, 2, 3, 4, 5, 6, 7, 8, 9];          
        }                     
          let iArr = matrixCopy[i];         
          possibleValues[i][j] = excludeKnown(possibleValues[i][j], iArr).splice(0,9);  
          if (possibleValues[i][j].length == 1) {
            matrixCopy[i][j] = possibleValues[i][j][0];
            possibleValues[i][j] = [];
            changeFlag = true;    

          } else {
              let jArr = getCol(j, matrixCopy);              
              possibleValues[i][j] = excludeKnown(possibleValues[i][j], jArr); 
              if (possibleValues[i][j].length == 1) {
                matrixCopy[i][j] = possibleValues[i][j][0]; 
                possibleValues[i][j] = [];
                changeFlag = true;   
                     
              } else {                
                  let sqArr = getSq(i, j, matrixCopy);                  
                  possibleValues[i][j] = excludeKnown(possibleValues[i][j], sqArr);  
                  if (possibleValues[i][j].length == 1) {
                    matrixCopy[i][j] = possibleValues[i][j][0];
                    possibleValues[i][j] = [];
                    changeFlag = true; 
                           
                    } else if (extendCheckFlag) {  
                        possibleValues[i][j] = takeOne(i, j, possibleValues);
                        if (possibleValues[i][j].length == 1) {
                          matrixCopy[i][j] = possibleValues[i][j][0];
                          possibleValues[i][j] = [];
                          changeFlag = true;
                          
                        } else {
                            possibleValues[i][j] = takeOne_Line(i, j, possibleValues);  
                                                  
                            if (possibleValues[i][j].length == 1) {
                              matrixCopy[i][j] = possibleValues[i][j][0];
                              possibleValues[i][j] = [];
                              changeFlag = true;

                           } else {
                                

                                possibleValues[i][j] = takeOne_Row(i, j, possibleValues);
                                
                                if (possibleValues[i][j].length == 1) {
                                  matrixCopy[i][j] = possibleValues[i][j][0];
                                  possibleValues[i][j] = [];
                                  changeFlag = true;
                                  
                                } 
                            }
                           }  
                         }      
                }  
            }            
      }
        let x = 0, y = 0;
        if (i === 8 && j === 8){
          checkAgain: {
          for (x = 0; x < 9; x++) {
            for (y = 0; y < 9; y++) {    
              if (matrixCopy[x][y] == 0 && changeFlag) { 
                i = 0;
                j = -1;
                changeFlag = false;
                extendCheckFlag = true;  
                break checkAgain;   
              } 
              else if (matrixCopy[x][y] == 0 && !changeFlag){

                  

                  matrix[x][y] = possibleValues[x][y][0];
                  possibleValues[x][y]=[];                  
                  i = 0;
                  j = -1;  
                  break checkAgain; 
              }    
            }
          }
        }
      }   
                
    }
  } 
  

  return matrixCopy; 
}




   function getCol(colNum, curMatrix){
     let columnAsArr = [];     
     for (let i = 0; i < 9; i++){      
      columnAsArr[i] = curMatrix[i][colNum];  
         
     } 
      return columnAsArr;
    }

    function getSq(i, j, curMatrix){
      let squareAsArr = []; 
      iStart = Math.trunc(i / 3) * 3;
      jStart = Math.trunc(j / 3) * 3;
      for(let k = 0; k < 3; k++) {
        for (let m = 0; m < 3; m++) {          
          squareAsArr.push(curMatrix[iStart+k][jStart+m]);          
        }        
      } 
      return squareAsArr;      
    }      
      
    function excludeKnown(possible, known) {
      let possibleAfterCheck = possible.slice(0,9);
      for (let i = 0, lenPos = possible.length ; i < lenPos; i++) {
        for (let k = 0, lenKnown = known.length; k < lenKnown; k++) {
          if (possibleAfterCheck[i] == known[k]) {
            possibleAfterCheck.splice(i, 1);           
            i--;
          }
        }     
      }
       return possibleAfterCheck;
    }

    function takeOne(i, j, possibleValues){
      iStart = Math.trunc(i / 3) * 3;
      jStart = Math.trunc(j / 3) * 3;
      let unSetValues = possibleValues[i][j].slice(0,9);      
      for (let n = 0, lenN = unSetValues.length; n < lenN; n++){
        for(let k = 0; k < 3; k++) {
          for (let m = 0; m < 3; m++) { 
            if (iStart+k == i && jStart+m == j) {
              continue;
            } else {     
                let neibor = possibleValues[iStart+k][jStart+m].slice(0,9);
                let lenP = neibor.length;
                if (lenP){
                  for (let p = 0; p < lenP; p++) {  
                    if (unSetValues[n] == neibor[p]) {
                      unSetValues.splice(n, 1);                      
                      lenN--;                                         
                      if (!unSetValues.length) {return possibleValues[i][j]; }  
                      k = 0;
                      m = -1;
                      break;
                    }
                  }   
                }
            }  
          } 
        } 
      } 
      if (unSetValues.length == 1) {      
        return unSetValues;
      } else return possibleValues[i][j];  
    }

    function takeOne_Line(i, j, possibleValues){
      let unSetValues = possibleValues[i][j].slice(0,9);      
      for (let n = 0, lenN = unSetValues.length; n < lenN; n++){
        for(let k = 0; k < 9; k++) {          
            if (k != j ) {               
                let neibor = possibleValues[i][k].slice(0,9);
                let lenP = neibor.length;
                if (lenP){
                  for (let p = 0; p < lenP; p++) {                               
                    if (unSetValues[n] == neibor[p]) {
                      unSetValues.splice(n, 1);                      
                      lenN--;                                         
                      if (!unSetValues.length) {return possibleValues[i][j]; }  
                      k = -1;                      
                      break;                                   
                    }
                  }   
                }
            } 
        } 
      } 
      if (unSetValues.length == 1) {
        return unSetValues;
      } else return possibleValues[i][j];  
    }

    function takeOne_Row(i, j, possibleValues){
      let unSetValues = possibleValues[i][j].slice(0,9);  
      for (let n = 0, lenN = unSetValues.length; n < lenN; n++){
        for(let k = 0; k < 9; k++) {
            if (k != i ) {               
                let neibor = possibleValues[k][j].slice(0,9);
                let lenP = neibor.length;
                if (lenP){                 
                  for (let p = 0; p < lenP; p++) {                          
                    if (unSetValues[n] == neibor[p]) {
                      unSetValues.splice(n, 1);                      
                      lenN--;                                         
                      if (!unSetValues.length) {return possibleValues[i][j]; }  
                      k = -1;                      
                      break;                                   
                    }
                  }   
                }
            } 
        } 
      } 
      if (unSetValues.length == 1) {       
        return unSetValues;
      } else return possibleValues[i][j];  
    }

    function createEmptyArr(){
      this.arr = [];
      for (let i = 0; i < 9; i++) {
        arr[i] = [];
        for (let j = 0; j < 9; j++){
          arr[i][j] = [];
        }
      } return arr;
    }
