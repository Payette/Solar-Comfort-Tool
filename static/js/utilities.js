twoDimensionalRoomArrayFromOneDimensional = (oneDimensionalArray, gridY, numSteps) => {
    let gridColorArray2D = [];
    let gridColorArray2DX  = 0;
    let gridColorArray2DY  = 0;
  
    for(let i=0; i<oneDimensionalArray.length; i++) {
      if(gridColorArray2DX === 0) {
        gridColorArray2D[gridColorArray2DY] = []; 
      }
  
      gridColorArray2D[gridColorArray2DY][gridY - gridColorArray2DX - 1] = oneDimensionalArray[i] / numSteps;
  
      gridColorArray2DX++;
      if(gridColorArray2DX === gridY) {
        gridColorArray2DX = 0;
        gridColorArray2DY++;
      }
    }
  
    return gridColorArray2D
  }