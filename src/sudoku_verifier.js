export function sudokuVerifier({ problem, solution }) {

	// TODO implement this function

	// store functions' output; i.e., game's status and index positions of invalid entries
	var status = "status";
	var invalidIndexes = [];

	function rowChecker(problem, solution){
		// for loop that checks for dups
		for(var row = 0; row < 9; row ++){
			// scope of histories is per row
			var indexHistory = [];
			var valHistory = [];			
			
			for(var column = 0; column < 9; column ++){
				var index = column + (row * 9); 
				indexHistory.push(index);				
				
				// if this number or value is already in this row
				if(valHistory.indexOf(solution[index]) !== -1){ // ~ proly no... && (problem[index])
					// if invalidIndexes array contains current index and this is a user-inputted dup number
					if(invalidIndexes.indexOf(index) === -1 && problem[index] == null){ // ~ === ~why need problem[index]? to ensure entry is user input?
						invalidIndexes.push(index);
					}
					// ~ renamed valIndex to origIndex
					var origIndex = valHistory.indexOf( // store orig index of dup value for this row
							solution[index] // value <- ~VERIFY is val, not index
						);
					if(invalidIndexes.indexOf(indexHistory[origIndex]) === -1 && problem[indexHistory[origIndex]] == null){
						invalidIndexes.push(indexHistory[origIndex]);
					}
					// identify the index of only one dup value per iteration. 
					valHistory[origIndex] = '-';

				}
				valHistory.push(solution[index]);
			}
		}
		
	}

	function columnChecker(problem, solution){
		// for loop that checks for dups
		for(var column = 0; column < 9; column ++){
			var indexHistory = [];
			var valHistory = [];
			
			for(var row = 0; row < 9; row ++){
				var index = column + (row * 9);
				indexHistory.push(index);				
				
				// if this number or value is already in this column
				if(valHistory.indexOf(solution[index]) !== -1){ // ~ proly no...&& (problem[index])
				                                                				    
					if(invalidIndexes.indexOf(index) === -1 && problem[index] == null){ 
						invalidIndexes.push(index);
					}
					
					var origIndex = valHistory.indexOf(
							solution[index]
						);
					if(invalidIndexes.indexOf(indexHistory[origIndex]) === -1 && problem[indexHistory[origIndex]] == null){
						invalidIndexes.push(indexHistory[origIndex]);
					}
					valHistory[origIndex] = '-';

				}
				valHistory.push(solution[index]);
			}
		}
	}

	function squareChecker(solution) {
		// for loop that checks for dups
		for(var square = 0; square < 9; square ++){
			var indexHistory = [];
			var valHistory = [];
			
			for(var row = 0; row < 3; row ++){
				
				for(var column = 0; column < 3; column ++){

					var index =  column + (row * 9) + (square % 3);
					indexHistory.push(index);				
					
					// if this number or value is already in this square
					if(valHistory.indexOf(solution[index]) !== -1){
					    
						if(invalidIndexes.indexOf(index) === -1 && problem[index] == null){ 
							invalidIndexes.push(index);
						}
						
						var origIndex = valHistory.indexOf(
								solution[index]
							);
						if(invalidIndexes.indexOf(indexHistory[origIndex]) === -1 && problem[indexHistory[origIndex]] == null){
							invalidIndexes.push(indexHistory[origIndex]);
						}
						valHistory[origIndex] = '-';

					}
					valHistory.push(solution[index]);
				}
			}
		}
	}

	// invoke checker functions with input
	rowChecker(problem, solution); //~ why are these args not colored? Do I need to pass in args?
	columnChecker(problem, solution);
	squareChecker(problem, solution);
	
	// define game status
	// if invalidIndexes is an array and is not an empty array
 	if (Array.isArray(invalidIndexes) && invalidIndexes.length) {
		status = "invalid";
	}
	
	// if any of the functions above return a null value, then the status should be incomplete.
	function hasEmptyValue(solution){ //pseudo
		// forEach var value in solution
		// 	if (value == null){
		// 		return true;
		// 	}
		 for (const value of solution){
		 	if (value == null){
		 		return true;
		 	}
		 }
	}

	if (hasEmptyValue(solution) && status !== "invalid"){
			status = "incomplete"
		}

	console.log("invalidIndexes: ", invalidIndexes);
	invalidIndexes.sort(); // ~ what was I thinking here?

  	return {
  		status: status, //invalidIndexes, // valid, invalid, incomplete. invalid takes precedence over incomplete. so if its both, just say its invalid. 
	    invalidIndexes: invalidIndexes, // which indexes are invalid ~ Delete comma? Proly not
  	}
}

