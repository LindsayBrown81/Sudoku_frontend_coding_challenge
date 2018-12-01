export function sudokuVerifier({ problem, solution }) {
    // TODO implement this function

	// store functions' output; i.e., game's status and index positions of invalid entries
	var status = '';
	var invalidIndexes;

	function rowChecker(problem, solution){
		console.log("problem ", problem);
		console.log("solution ", solution);
		// for loop that checks for dups
		for(var row = 0; row < 9; row++){
			// scope of histories is per row
			var indexHistory = [];
			var valHistory = [];			
			
			for(var column = 0; column < 9; column++){
				var index = column + (row * 9); 
				indexHistory.push(index);
				console.log("indexHistory ", indexHistory);				
				
				// if this number or value is already in this row
				console.log("solution[index] ", solution[index]);
				console.log("problem[index] ", problem[index]);
				// if this number or value is already in this row and its not null
				if(valHistory.indexOf(solution[index]) !== -1 && solution[index]!=null){ // ~ proly no... && (problem[index])
					invalidIndexes = [];
					// if invalidIndexes array contains current index and this is a user-inputted dup number
					if(invalidIndexes.indexOf(index) !== -1 && problem[index] === null){ // ~ === ~why need problem[index]? to ensure entry is user input?
						invalidIndexes.push(index);
					}
					// ~ renamed valIndex to origIndex
					var origIndex = valHistory.indexOf( // store orig index of dup value for this row
						solution[index] // value <- ~VERIFY is val, not index
					);
					console.log("origIndex ", origIndex);
					if(invalidIndexes.indexOf(indexHistory[origIndex]) === -1 && problem[indexHistory[origIndex]] === null){
						invalidIndexes.push(indexHistory[origIndex]);
					}
					// identify the index of only one dup value per iteration. 
					valHistory[origIndex] = '-';

				}
				valHistory.push(solution[index]);
				console.log("valHistory ", valHistory);
				console.log("invalidIndexes ", invalidIndexes); //0 good
			}
		}
		
	}

	function columnChecker(problem, solution){
		// for loop that checks for dups
		for(var column = 0; column < 9; column++){
			var indexHistory = [];
			var valHistory = [];
			
			for(var row = 0; row < 9; row ++){
				var index = column + (row * 9);
				indexHistory.push(index);				
				
				// if this number or value is already in this column and its not null
				if(valHistory.indexOf(solution[index]) !== -1 && solution[index]!=null){ // ~ proly no...&& (problem[index])
				    
				    invalidIndexes = [];                                            				    
					if(invalidIndexes.indexOf(index) !== -1 && problem[index] === null){ 
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
				console.log("valHistory ", valHistory);
				console.log("invalidIndexes ", invalidIndexes);
			}
		}
	}

	function squareChecker(problem, solution) {
		// for loop that checks for dups
		for(var square = 0; square < 9; square++){
			var indexHistory = [];
			var valHistory = [];
			
			for(var row = 0; row < 3; row++){
				
				for(var column = 0; column < 3; column++){

					var index =  column + (row * 9) + (square % 3);
					indexHistory.push(index);				
					
					// if this number or value is already in this square
					if(valHistory.indexOf(solution[index]) !== -1){
					    
					    invalidIndexes = [];
						if(invalidIndexes.indexOf(index) !== -1 && problem[index] === null){ 
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
					console.log("valHistory ", valHistory);
					console.log("invalidIndexes ", invalidIndexes);
				}
			}
		}
	}
	

	// invoke checker functions with input
	rowChecker(problem, solution); 
	columnChecker(problem, solution);
	squareChecker(problem, solution);
    
	// define game status
	// invalid status. if invalidIndexes is an array and is not an empty array //removed Array.isArray(invalidIndexes) && 
 	if (Array.isArray(invalidIndexes) && invalidIndexes.length > 0) {
 		console.log("invalidIndexes.length", invalidIndexes.length);
		status = "invalid";
		console.log("invalidIndexes: ", invalidIndexes);
		invalidIndexes.sort(); // ~ to match Jasmine tests
	}
	
	// incomplete status. if any of the functions above return a null value, then the status should be incomplete.
	function hasEmptyValue(solution){ 
		for (const value of solution){
			if (value === null && problem.indexOf(value) !== -1){
				return true;
		 	}
		}
	}

	if (hasEmptyValue(solution) && status !== "invalid"){
		status = "incomplete";
		// invalidIndexes = 0;//or undefined;
		
	}

	   	
   	if ((!hasEmptyValue(solution)) && status !== "invalid"){
		status = "valid";
		// invalidIndexes = 0;//or undefined;
   	}                    
   	console.log("status ", status);
   	console.log("invalidIndexes after sort ", invalidIndexes);
  	return {
  		status: status, //invalidIndexes, // valid, invalid, incomplete. invalid takes precedence over incomplete. so if its both, just say its invalid. 
	    invalidIndexes: invalidIndexes, // which indexes are invalid ~ Delete comma? Proly not
  	}
}
  


