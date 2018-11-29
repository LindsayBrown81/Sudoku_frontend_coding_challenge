export function sudokuVerifier({ problem, solution }) {

	// TO DO implement this function
	//const square = [[0,1,2,9,10,11,18,19,20]];
	//const row = [[0,1,2,3,4,5,6,7,8],			 [9,10,11,12,13,14,15,16,17]];
	//const column = [[0,9,18,27,36,45,54,63,72]];

	// Store game's current status
	var currentStatus = "status";


	var currentInvalidIndexes = [];

	function rowChecker(problemn, solution){
		// for loop that checks for dups
		for(var row = 0; row < 9; row ++){
			var indexHistory = [];
			var currentNums = [];
			
			// scope of currentNums is current iteration
			for(var column = 0; column < 9; column ++){
				var index =  column + (row * 9);
				indexHistory.push(index);				
				
				if(currentNums.indexOf(solution[index]) !== -1){
				     //if this is a repeated number
				    
					if(currentInvalidIndexes.indexOf(index) === -1 && problem[index] == null){ 
						currentInvalidIndexes.push(index);
					}
					
					var numIndex = currentNums.indexOf( //grab orig index of duplicated value for this row
							solution[index] //grab value
						);
					if(currentInvalidIndexes.indexOf(indexHistory[numIndex]) === -1 && problem[indexHistory[numIndex]] == null){
						currentInvalidIndexes.push(indexHistory[numIndex]);
					}
					currentNums[numIndex] = '-';

				}
				currentNums.push(solution[index]);
			}
		}
		
	}

	function columnChecker(problem, solution) {
		// for loop that checks for dups
		for(var column = 0; column < 9; column ++){
			var indexHistory = [];
			var currentNums = [];
			
			// scope of currentNums is current iteration
			for(var row = 0; row < 9; row ++){
				var index =  column + (row * 9);
				indexHistory.push(index);				
				
				if(currentNums.indexOf(solution[index]) !== -1){
				     //if this is a repeated number
				    
					if(currentInvalidIndexes.indexOf(index) === -1 && problem[index] == null){ 
						currentInvalidIndexes.push(index);
					}
					
					var numIndex = currentNums.indexOf( //grab orig index of duplicated value for this row
							solution[index] //grab value
						);
					if(currentInvalidIndexes.indexOf(indexHistory[numIndex]) === -1 && problem[indexHistory[numIndex]] == null){
						currentInvalidIndexes.push(indexHistory[numIndex]);
					}
					currentNums[numIndex] = '-';

				}
				currentNums.push(solution[index]);
			}
		}
	}

	function squareChecker(solution) {
		// for loop that checks for dups
		for(var square = 0; square < 9; square ++){
			var indexHistory = [];
			var currentNums = [];
			for(var row = 0; row < 3; row ++){
				
				// scope of currentNums is current iteration
				for(var column = 0; column < 3; column ++){

					var index =  column + (row * 9) + (square % 3);
					indexHistory.push(index);				
					
					if(currentNums.indexOf(solution[index]) !== -1){
					     //if this is a repeated number
					    
						if(currentInvalidIndexes.indexOf(index) === -1 && problem[index] == null){ 
							currentInvalidIndexes.push(index);
						}
						
						var numIndex = currentNums.indexOf( //grab orig index of duplicated value for this row
								solution[index] //grab value
							);
						if(currentInvalidIndexes.indexOf(indexHistory[numIndex]) === -1 && problem[indexHistory[numIndex]] == null){
							currentInvalidIndexes.push(indexHistory[numIndex]);
						}
						currentNums[numIndex] = '-';

					}
					currentNums.push(solution[index]);
				}
			}
		}
	}

	rowChecker(problem, solution);
	columnChecker(problem, solution);
	squareChecker(problem, solution);
	
	// Define status
	// if any of the functions above return a null index value, then the currentStatus should be incomplete. 
	// if invalidRowIndexes is Not Empty
	if(currentInvalidIndexes Is Not Empty) { //psuedo
		currentStatus = "invalid";
	}
	// if ... column
	// if ... square 

	function hasEmptyValue(solution){ //pseudo
		forEach var value in solution
			if (value == null){
				return true;
			}
	}

	if(hasEmptyValue(solution) && currentStatus !== "invalid"){
			currentStatus = "incomplete"
		}


		currentInvalidIndexes.sort();

	  return {
	    status: currentInvalidIndexes, // valid, invalid, incomplete. invalid takes precedence over incomplete. so if its both, just say its invalid. 
	    invalidIndexes: currentInvalidIndexes, // which indexes are invalid
	  }
	}

