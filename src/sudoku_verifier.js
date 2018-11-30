// export function sudokuVerifier({ problem, solution }) {

(function wrap(){
  //When called with the second sudoku problem and a valid solution it should have a valid status and an empty invalidIndexes array
  function sudokuVerifier(json){
  // TODO implement this function
  var problem = "";
  var solution = "";
	var json={
	"problem": [
	1,
	null,
	null,
	4,
	8,
	9,
	null,
	null,
	6,
	7,
	3,
	null,
	null,
	null,
	null,
	null,
	4,
	null,
	null,
	null,
	null,
	null,
	null,
	1,
	2,
	9,
	5,
	null,
	null,
	7,
	1,
	2,
	null,
	6,
	null,
	null,
	5,
	null,
	null,
	7,
	null,
	3,
	null,
	null,
	8,
	null,
	null,
	6,
	null,
	9,
	5,
	7,
	null,
	null,
	9,
	1,
	4,
	6,
	null,
	null,
	null,
	null,
	null,
	null,
	2,
	null,
	null,
	null,
	null,
	null,
	3,
	7,
	8,
	null,
	null,
	5,
	1,
	2,
	null,
	null,
	4
	],
	"solution": [
	1,
	null,
	null,
	4,
	8,
	9,
	3,
	null,
	6,
	7,
	3,
	9,
	null,
	null,
	6,
	null,
	4,
	1,
	4,
	6,
	8,
	null,
	null,
	1,
	2,
	9,
	5,
	null,
	null,
	7,
	1,
	2,
	null,
	6,
	null,
	9,
	5,
	null,
	1,
	7,
	null,
	3,
	null,
	null,
	8,
	null,
	null,
	6,
	null,
	9,
	5,
	7,
	null,
	3,
	9,
	1,
	4,
	6,
	null,
	null,
	null,
	null,
	null,
	null,
	2,
	null,
	null,
	null,
	8,
	null,
	3,
	7,
	8,
	7,
	null,
	5,
	1,
	2,
	null,
	null,
	4
	]}
	console.log("json ", json);
	
	problem = json.problem;
	solution = json.solution;
	// console.log("L json.problem: ", problem);
	// console.log("L json.solution ", solution);

	// store functions' output; i.e., game's status and index positions of invalid entries
	var status = '';
	var invalidIndexes = [];

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
				if(valHistory.indexOf(solution[index]) !== -1 && (problem[index])){ // ~ proly no... && (problem[index])
					// if invalidIndexes array contains current index and this is a user-inputted dup number
					if(invalidIndexes.indexOf(index) === -1 && problem[index] == null){ // ~ === ~why need problem[index]? to ensure entry is user input?
						invalidIndexes.push(index);
					}
					console.log("valHistory ", valHistory);
					// ~ renamed valIndex to origIndex
					var origIndex = valHistory.indexOf( // store orig index of dup value for this row
							solution[index] // value <- ~VERIFY is val, not index
						);
					console.log("origIndex ", origIndex);
					if(invalidIndexes.indexOf(indexHistory[origIndex]) === -1 && problem[indexHistory[origIndex]] == null){
						invalidIndexes.push(indexHistory[origIndex]);
					}
					// identify the index of only one dup value per iteration. 
					valHistory[origIndex] = '-';

				}
				valHistory.push(solution[index]);
				console.log("valHistory ", valHistory);
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
		for(var square = 0; square < 9; square++){
			var indexHistory = [];
			var valHistory = [];
			
			for(var row = 0; row < 3; row++){
				
				for(var column = 0; column < 3; column++){

					var index =  column + (row * 9) + (square % 3);
					indexHistory.push(index);				
					
					// if this number or value is already in this square
					if(valHistory.indexOf(solution[index]) !== -1){
					    
						if(invalidIndexes.indexOf(index) === -1 && problem[index] == null){ 
							invalidIndexes.push(index);
						}
						
						var origIndex = valHistory.indexOf(solution[index]);
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
	rowChecker(problem, solution); //~ why are these args not colored? 
	columnChecker(problem, solution);
	squareChecker(problem, solution);
    
	
	// define game status
	// if invalidIndexes is an array and is not an empty array //removed Array.isArray(invalidIndexes) && 
 	if (Array.isArray(invalidIndexes) && invalidIndexes.length > 0) {
 		console.log("invalidIndexes.length", invalidIndexes.length);
		status = "invalid";
		console.log("invalidIndexes: ", invalidIndexes);
		invalidIndexes.sort(); // ~ to match Jasmine tests
		// return invalidIndexes;
	}
	
	// // if any of the functions above return a null value, then the status should be incomplete.
	// function hasEmptyValue(solution){ 
	// 	for (const value of solution){
	// 		if (value == null){
	// 			return true;
	// 	 	}
	// 	}
	// }

	// if (hasEmptyValue(solution) && status !== "invalid"){
	// 	status = "incomplete";
	// 	invalidIndexes = 0;//or undefined;
	// }

	   	
 //   	if ((!hasEmptyValue(solution)) && status !== "invalid"){
	// 	status = "valid";
	// 	invalidIndexes = 0;//or undefined;
 //   	}                    

 //  	return {
 //  		status: status, //invalidIndexes, // valid, invalid, incomplete. invalid takes precedence over incomplete. so if its both, just say its invalid. 
	//     invalidIndexes: invalidIndexes, // which indexes are invalid ~ Delete comma? Proly not
 //  	}
  }
  sudokuVerifier();
})(); // closes function wrap  ~ semicolons?

