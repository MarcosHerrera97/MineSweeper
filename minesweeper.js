/*We will be using the readline module, that is part of Node.Js, in
order to get input from our user. 
First we create a readline module and interface in order to get input for the program*/

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true
});
rl.pause();

//This function generates a random number between 0 and a given maximum

function randomNumber(maxInt) {
  let myInt = Math.floor(Math.random() * maxInt);
  return myInt;
}

/*This function determines the difficulty that the user has chosen and calls the createGrid function
with the appropraite width and mine count that corresponds to that difficulty.*/

function difficultySelection (option) {

//difficulty 1 = Easy | difficulty 2 = Medium | difficulty 3 = Hard | difficulty 4 = Extreme 

  if (option === "1") {
    const gridWidth = 8;
    const mineAmount = 10;
    return createGrid(gridWidth, mineAmount);
  } else if (option === "2") {
    const gridWidth = 10;
    const mineAmount = 20;
    return createGrid(gridWidth, mineAmount);
  } else if (option === "3") {
    const gridWidth = 12;
    const mineAmount = 45;
    return createGrid(gridWidth, mineAmount);
  } else if (option === "4") {
    const gridWidth = 14;
    const mineAmount = 70;
    return createGrid(gridWidth, mineAmount);
  } else {
    console.log("There was an error selecting the difficulty.");
  }

}

//Function that creates the playing grid for the game.

function createGrid(gridWidth, mineAmount) {

//Create an array of length gridWidth

  const myGrid = new Array(gridWidth);

/*Populate the array with new arrays of the same length.
Doing this creates a square grid that we can use for our playing field.*/

  for (let i = 0; i < gridWidth; i++) {
    myGrid[i] = new Array(gridWidth);
  }

/*As long as the number of mines planted is less than the number needed for the specific difficulty
this loop will generate a random number and check if there has been a bomb planted in that spot on
the grid.*/

  let mineCount = 0;
  while (mineCount < mineAmount) {
    let mineLocation = randomNumber(gridWidth ** 2);

/*We get the x coordinate of our mine by taking the remainder of the grid number divided by the
width of our grid.*/

    let mineX = mineLocation % gridWidth;

/*We get the y coordinate of our mine by taking the integer division of the grid number by the
width of our grid.*/

    let mineY = Math.floor(mineLocation / gridWidth);

/*If there has already been a bomb planted in this location we skip this iteration without
increasing the bomb count. Otherwise we plant a bomb in that location and increase the bomb count.*/

    if (myGrid[mineY][mineX] === '*') {
      continue;
    }

    myGrid[mineY][mineX] = '*';
    mineCount++;
  }
//For Debugging
  console.log("\nHere is our current grid.");
  console.table(myGrid);
//For Debugging
  return myGrid;
}

/*This function creates a promise, using the question we input when it was called,
that must be resolved by the user before the program will continue. If we don't
establish the Promise then the program will continue executing before
we receive user input.*/

function question(newQuestion){
  return new Promise(resolve => rl.question(newQuestion, answer => resolve(answer)));
}

/*This function is used to validate user input and repeatedly prompt
the user to try again until a valid input has been received. If the
user chooses not to try again, then we close the readline interface and
exit the program.*/

async function repeatProcess() {
//we call our question funtion in order to prompt the user for an answer.
  const answer = await question("Would you like to try again?(y/n) ");
  switch (answer){
    case "y":
//For Debugging
      console.log(answer);
//For Debugging
      return true;
    case "n":
      rl.close();
      console.log("Now exiting process.");
      return false;
      break;
    case "Y":
      return true;
    case "N":
      rl.close();
      console.log("Now exiting process.");
      return false;
      break;
    default:
      console.log("\nThat is not a valid response.");
  }
//Here we recursively call our function as we received an invalid response.
  let repeat = repeatProcess();
  return repeat;
}

/*This function is for debugging purposes!
With this function we can test our random number generator funtion, with the
added benefit of allowing the user to input a maximun bound of their choosing.*/

async function debugRng(){
  console.log("This program will generate a random number for you.");
  let runRng = true;
  while (runRng === true){
    const answer = await question("Could you please provide an upper bound? ");
    let usrInt = randomNumber(answer.trim());
    console.log(usrInt);
    runRng = await repeatProcess();
  }
}

/*This is the main function of the minesweeper game. This will
become the main function of our program once it is closer to completion.*/

async function mineSweeper(){
  console.log("\nWelcome to Minesweeper!");
  console.log("We have four different difficulties for you to choose from.\n");
  console.log("1. Easy: An 8x8 grid with 10 hidden mines.");
  console.log("2. Medium: A 10x10 grid with 20 hidden mines.");
  console.log("3. Hard: A 12x12 grid with 45 hidden mines.");
  console.log("4. Extreme: A 14x14 grid with 70 hidden mines.\n");
  let playAgain = true;
  while (playAgain === true) {
    const reply = await question("Please select a difficulty by entering the corresponding number: ");
    let playGrid = difficultySelection(reply);
    playAgain = await repeatProcess();
  }
}

/*This is the main function of our program. Currently the user can access either the
minesweeper game or our random number generator for debugging and other purposes.*/

async function main () {
  let repeatAgain = true;
  while (repeatAgain === true){
    const option = await question("\nWould you like to access:\n1. Random Number Generator or\n2. MineSweeper? ")
    if (option.trim() === "1"){
      debugRng();
    } else if (option.trim() === "2"){
      mineSweeper();
    } else {
      console.log("\nThat is an invalid option.");
      repeatAgain = await repeatProcess();
    }
  }
  return;
}

main();
