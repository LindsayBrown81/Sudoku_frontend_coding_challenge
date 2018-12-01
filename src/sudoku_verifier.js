export function sudokuVerifier({ problem, solution }) {
    // TODO implement this function

	// store functions' output; i.e., game's status and index positions of invalid entries
	var status = '';
	var invalidIndexes = [];

	function rowChecker(problem, solution){
		
		for(var row = 0; row < 9; row++){			
			var indexHistory = [];
			var valHistory = [];			
			
			for(var column = 0; column < 9; column++){
				var index = column + (row * 9); 
				indexHistory.push(index);				
				// if this number from the solution is already in this row and its a number, not a null
				if(valHistory.indexOf(solution[index]) !== -1 && solution[index] !== null){					
					// if invalidIndexes array does not contain this number and this dup number is user-inputted
					if(invalidIndexes.indexOf(index) === -1 && problem[index] === null){
						invalidIndexes.push(index);						
					}					
					// store orig index of dup value for this row
					var origIndex = valHistory.indexOf( 
						solution[index]
					);					
					// if invalidIndexes array does not contain orig index and problem's newly created indexHistory array is null at that index
					if(invalidIndexes.indexOf(indexHistory[origIndex]) === -1 && problem[indexHistory[origIndex]] === null){
						invalidIndexes.push(indexHistory[origIndex]);						
					}
					// identify the index of only one dup value per iteration. prevent future iterations from counting
					valHistory[origIndex] = '-';
				}
				valHistory.push(solution[index]);
			}

		}
		
	}

	function columnChecker(problem, solution){
		
		for(var column = 0; column < 9; column++){
			var indexHistory = [];
			var valHistory = [];
			
			for(var row = 0; row < 9; row ++){
				var index = column + (row * 9);
				indexHistory.push(index);				
				
				if(valHistory.indexOf(solution[index]) !== -1 && solution[index]!==null){ 
					
					if(invalidIndexes.indexOf(index) === -1 && problem[index] === null){ 
						invalidIndexes.push(index);
					}					
					var origIndex = valHistory.indexOf(
						solution[index]
					);					
					if(invalidIndexes.indexOf(indexHistory[origIndex]) === -1 && problem[indexHistory[origIndex]] === null){
						invalidIndexes.push(indexHistory[origIndex]);
					}
					valHistory[origIndex] = '-';
				}				
				valHistory.push(solution[index]);
			}

		}

	}

	function squareChecker(problem, solution) {
		
		for(var square = 0; square < 9; square++){
			var indexHistory = [];
			var valHistory = [];
			
			for(var row = 0; row < 3; row++){				
				for(var column = 0; column < 3; column++){
					
					var index =  (column + (row * 9) + ((square % 3) * 3)) + (Math.floor(square / 3) * 27);
					indexHistory.push(index);				
					
					if(valHistory.indexOf(solution[index]) !== -1 && solution[index] !== null){	

						if(invalidIndexes.indexOf(index) === -1 && problem[index] === null){ 
							invalidIndexes.push(index);
						}						
						var origIndex = valHistory.indexOf(
							solution[index]
						);
						if(invalidIndexes.indexOf(indexHistory[origIndex]) === -1 && problem[indexHistory[origIndex]] === null){
							invalidIndexes.push(indexHistory[origIndex]);
						}
						valHistory[origIndex] = '-';
					}
					valHistory.push(solution[index]);
				}
			}

		}

	}

	rowChecker(problem, solution); 
	columnChecker(problem, solution);
	squareChecker(problem, solution);
    
	// define game status
	// invalid status
 	if (Array.isArray(invalidIndexes) && invalidIndexes.length > 0) {
		status = "invalid";		
		invalidIndexes.sort();
	}
	
	// incomplete status
	function hasEmptyValue(solution){ 
		for (const value of solution){
			if (value === null){
				return true;
		 	}
		}
	}
	if (hasEmptyValue(solution) && status !== "invalid"){
		status = "incomplete";
	}

	// valid status	
   	if ((!hasEmptyValue(solution)) && status !== "invalid"){
		status = "valid";
   	}                    
   	
  	return {
  		status: status, 
	    invalidIndexes: invalidIndexes,
  	}

}
  


