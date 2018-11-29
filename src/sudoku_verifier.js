export function sudokuVerifier({ problem, solution }) {

	// TO DO implement this function
	const square = [[0,1,2,9,10,11,18,19,20]];
	const row = [[0,1,2,3,4,5,6,7,8]];
	const column = [[0,9,18,27,36,45,54,63,72]];

	// Store game's current status
	var currentStatus = "status";


	var currentInvalidIndexes = [];

	// Long hand approach B would be to wrap a for each loop around 3 below functions
	function rowChecker(row){
		// for each loop that checks for dups
		return indexes; // .push()
	}

	function columnChecker(column) {
		// for each loop that checks for dups
		return indexes; // .push()
	}

	function squareChecker(square) {
		// for each loop that checks for dups
		return indexes // .push()
	}

	
	var invalidRowIndexes = rowChecker(row);


	// Define status
	// if any of the functions above return a null index value, then the currentStatus should be incomplete. 
	// if invalidRowIndexes is Not Empty
	if(invalidRowIndexes Is Not Empty) {
		currentStatus = "inValid";
		currentInvalidIndexes.push(invalidRowIndexes);
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

