var MAX=100000000.0;
class Cell {
	constructor() {
		this.f=MAX;
		this.g=MAX;
		this.h=MAX;
		this.parent_i=-1;
		this.parent_j=-1;
	}
}

function calculateHValue(row, col, end) 
{ 
		// Return using the distance formula 
    return Math.sqrt ((row-end[0])*(row-end[0]) 
                    + (col-end[1])*(col-end[1])); 
}

function findPath(Cells, end, Path) 
{ 
    var row = end[0]; 
    var col = end[1]; 
   
		var temp_row,temp_col;
    while (!(Cells[row][col].parent_i === row && Cells[row][col].parent_j === col )) 
    { 
        Path.push ([row, col]); 
        temp_row = Cells[row][col].parent_i; 
        temp_col = Cells[row][col].parent_j; 
        row = temp_row; 
        col = temp_col; 
    } 
  
    Path.push ([row, col]); 
    Path.reverse(); 
    return Path; 
} 

export default function AStar(grid,start,end,visitedNodeInorder,path) {
	var rows = grid.length;
	var cols = grid[0].length;

	var Cells = new Array(rows);
	for(let i=0;i<rows;++i) {
		Cells[i]=new Array(cols);
		for(let j=0;j<cols;++j) {
			Cells[i][j]=new Cell();
		}
	}
	
	var closed = new Array(rows);
	for(let i=0;i<rows;++i) {
		closed[i]=new Array(cols).fill(false);
	}

	var startY=start[0]; var startX=start[1];
	Cells[startY][startX].f=0.0;
	Cells[startY][startX].g=0.0;
	Cells[startY][startX].h=0.0;
	Cells[startY][startX].parent_i=startY;
	Cells[startY][startX].parent_j=startX;
	
	var open=[];
	open.push([0,startY,startX]);

	var dir=[[0,1],[0,-1],[1,0],[-1,0]];
	var p,i,j,nextRow,nextCol;
	while(open.length>0) {
		p=open.shift();

		i=p[1];
		j=p[2];
		closed[i][j]=true;
		visitedNodeInorder.push([i,j]);
		
		for(let k=0;k<dir.length;++k) {
			nextRow=i+dir[k][0]; nextCol=j+dir[k][1];
			if(nextRow>=0 && nextRow<rows && nextCol>=0 && nextCol<cols) {
				if(nextRow===end[0] && nextCol===end[1]) {
					console.log("Path found");
					Cells[nextRow][nextCol].parent_i=i;
					Cells[nextRow][nextCol].parent_j=j;
					findPath(Cells,end,path);
					return true;
				}
				else if(closed[nextRow][nextCol]===false && grid[nextRow][nextCol]===0) {
					var gNew=Cells[i][j].g + 1.0;			
					var hNew=calculateHValue(nextRow,nextCol,end);
					var fNew=gNew+hNew;

					if(Cells[nextRow][nextCol].f===MAX || Cells[nextRow][nextCol].f>fNew ) {
						open.push([fNew,nextRow,nextCol]);
						open.sort();
						Cells[nextRow][nextCol].f=fNew;
						Cells[nextRow][nextCol].g=gNew;
						Cells[nextRow][nextCol].h=hNew;
						Cells[nextRow][nextCol].parent_i=i;
						Cells[nextRow][nextCol].parent_j=j;
					}
				}
			}
		}
	}
	return false;
}
