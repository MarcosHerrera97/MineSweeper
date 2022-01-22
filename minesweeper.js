//Create a readline module and interface in order to get input for the program

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true
});
rl.pause();
//This function generates a random number between 0 and within a given maximum

function randomNumber(maxInt) {
  let myInt = Math.floor(Math.random() * maxInt);
  return myInt;
}

//create a grid with the appropraite width and mine count.

function difficulty (option) {

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

/*Function that creates the playing grid for the game. We use the difficulty selected by
the user to determine the size of the grid and number of mines.*/

function createGrid(gridWidth, mineAmount) {

//Create an array of length gridWidth

  const myGrid = new Array(gridWidth);

//Populate the array with new arrays of the same length.
//Doing this creates a square grid that we can use for our playing field 

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
  console.log("\nHere is our current grid.");
  console.table(myGrid);
  return myGrid;
}

function question(newQuestion){
  return new Promise(resolve => rl.question(newQuestion, answer => resolve(answer)));
}


async function repeatProcess() {
  const answer = await question("Would you like to try again?(y/n) ");
  switch (answer){
    case "y":
      console.log(answer);
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
  let repeat = repeatProcess();
  return repeat;
}


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
    let playGrid = difficulty(reply);
    playAgain = await repeatProcess();
  }
}

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