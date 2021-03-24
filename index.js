import { fifaData } from './fifa.js';

// ⚽️ M  V P ⚽️ //

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 1: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Practice accessing data by console.log-ing the following pieces of data note, you may want to filter the data first 😉*/
const fifa2014Data = fifaData.filter((match) => {
    return match.Year === 2014;
})

const finals2014 = fifa2014Data.filter((teams) => {
    return teams.Stage === "Final"
})

console.log(finals2014)

//(a) Home Team name for 2014 world cup final
const finals2014HomeTeam = finals2014[0]['Home Team Name']

//(b) Away Team name for 2014 world cup final
const finals2014AwayTeam = finals2014[0]['Away Team Name']

//(c) Home Team goals for 2014 world cup final
const finals2014HomeTeamGoals = finals2014[0]['Home Team Goals']

//(d) Away Team goals for 2014 world cup final
const finals2014AwayTeamGoals = finals2014[0]['Away Team Goals']

//(e) Winner of 2014 world cup final */
const finals2014Winner = finals2014HomeTeam

console.log(`Task 1: 2014 Finals: Home (${finals2014HomeTeam}) vs Away (${finals2014AwayTeam}) | ${finals2014HomeTeam} ${finals2014HomeTeamGoals} - ${finals2014AwayTeam} ${finals2014AwayTeamGoals} | ${finals2014Winner} Wins!`)


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 2: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use getFinals to do the following:
1. Receive data as a parameter
2. Return an array of objects with the data of the teams that made it to the final stage

hint - you should be looking at the stage key inside of the objects
*/

function getFinals(data) {
    const finals = fifaData.filter((teams) => {
        return teams.Stage === "Final"
    })
    return finals
}

// console.log(`Task 2: `, getFinals(fifaData))


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 3: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function called getYears to do the following: 
1. Receive an array
2. Receive a callback function getFinals from task 2 
3. Return an array called years containing all of the years in the getFinals data set*/

function getYears(array, cbGetFinals) {
    const years = cbGetFinals(array).map((matches) => {
        return matches.Year
    })
    return years
}

console.log(`Task 3: ${getYears(fifaData, getFinals)}`)


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 4: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function getWinners to do the following:  
1. Receives an array
2. Receives the callback function getFinals from task 2 
3. Determines the winner (home or away) of each `finals` game. 
4. Returns the names of all winning countries in an array called `winners` */ 

function getWinners(array, cbGetFinals) {
    const winners = []
    cbGetFinals(array).forEach(element => {
        if (element['Home Team Goals'] > element['Away Team Goals']) {
            winners.push(element['Home Team Name'])
        } else {
            winners.push(element['Away Team Name'])
        }

    })
    return winners
}

console.log(`Task 4: ${getWinners(fifaData, getFinals)}`)


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 5: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use the higher-order function getWinnersByYear to do the following:
1. Receive an array
2. Receive a callback function getYears from task 3
3. Receive a callback function getWinners from task 4
4. Return an array of strings that say "In {year}, {country} won the world cup!" 

hint: the strings returned need to exactly match the string in step 4.
 */

function getWinnersByYear(array, cbGetYears, cbGetWinners, cbGetFinals) {
    // let test = cbGetFinals(array)
    // console.log(test)
    let winnersString = []
    let winners = cbGetWinners(array, cbGetFinals)
    let years = cbGetYears(array, cbGetFinals)

    for (let i = 0; i < winners.length; i++) {
        winnersString.push(`In ${years[i]}, ${winners[i]} won the world cup!`)
    }
    return winnersString
}

console.log('Task 5: ', getWinnersByYear(fifaData, getYears, getWinners, getFinals))


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 6: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher order function getAverageGoals to do the following: 
 1. Receive the callback function getFinals from task 2 ensure you pass in the data as an argument
 2. Return the the average number of the total home team goals and away team goals scored per match and round to the second decimal place. 
 
 (Hint: use .reduce and do this in 2 steps) 
 
 Example of invocation: getAverageGoals(getFinals(fifaData));
*/

function getAverageGoals(data) {

    // let testvar = cbGetFinals(array)
    // console.log(testvar)

    let averageHomeGoals = data.reduce((total, match) => {
       return total + match['Home Team Goals']
    }, 0);
    
    let averageAwayGoals = data.reduce((total, match) => {
       return total + match['Away Team Goals']
    }, 0);

    let averageGoals = ((averageHomeGoals + averageAwayGoals) / data.length).toFixed(2)

   return averageGoals
}
let finalsData = getFinals(fifaData)
console.log('Task 6: ', getAverageGoals(finalsData))



/// 🥅 STRETCH 🥅 ///

/* 💪💪💪💪💪 Stretch 1: 💪💪💪💪💪 
Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

function getCountryWins(data, team_initials) {
// Get the finals the team has played in
    const teamGames = data.filter(match => 
        match['Stage'] === "Final" && (match['Home Team Initials'] === team_initials || match['Away Team Initials'] === team_initials) 
    )
    
// Just do the math to see if they won, and increment a counter(?)
    let teamWins = 0

    teamGames.forEach(element => {
        if(element['Home Team Initials'] === team_initials && element['Home Team Goals'] > element['Away Team Goals'])
            teamWins++
        else if (element['Away Team Initials'] === team_initials && element['Away Team Goals'] > element['Home Team Goals'])
            teamWins++
    });
    return teamWins

    // for (let i = 0; i < teamGames.length; i++) {
    //     if (teamGames[i]["Home Team Initials"] == team_initials && teamGames[i]["Home Team Goals"] > teamGames[i]["Away Team Goals"]) {
    //         teamWins++
    //     } else if (teamGames[i]["Away Team Initials"] == team_initials && teamGames[i]["Away Team Goals"] > teamGames[i]["Home Team Goals"]){
    //         teamWins++
    //     }
    // }
    // return teamGames
// Burp out counter
    // return teamWins
}

console.log('STRETCH #1: ', getCountryWins(fifaData, "BRA"))


/* 💪💪💪💪💪 Stretch 2: 💪💪💪💪💪 
Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

// function getGoals(data) {
// // Get list of finals games
// const finals = fifaData.filter(teams => 
//     teams.Stage === "Final"
// )
// // Make an object for each countries score
// let teamTotalFinalsGoals = {};
// finals.forEach(match => {
//     if(teamTotalFinalsGoals[match['Home Team Name']]) {
//         teamTotalFinalsGoals[match['Home Team Name']] += match['Home Team Goals']
//     } else {
//         teamTotalFinalsGoals[match['Home Team Name']] = match['Home Team Goals']
//     }

//     if(teamTotalFinalsGoals[match['Away Team Name']]) {
//         teamTotalFinalsGoals[match['Away Team Name']] += match['Away Team Goals']
//     } else {
//         teamTotalFinalsGoals[match['Away Team Name']] = match['Away Team Goals']
//     }
// })

// let teamTotalFinalsAppearances = {};
// finals.forEach(match => {
//     if(teamTotalFinalsAppearances[match['Home Team Name']]) {
//         teamTotalFinalsAppearances[match['Home Team Name']] ++
//     } else {
//         teamTotalFinalsAppearances[match['Home Team Name']] = 1
//     }

//     if(teamTotalFinalsAppearances[match['Away Team Name']]) {
//         teamTotalFinalsAppearances[match['Away Team Name']] ++
//     } else {
//         teamTotalFinalsAppearances[match['Away Team Name']] = 1
//     }
// })


// let teamNamesArray = Object.keys(teamTotalFinalsGoals)
// let teamTotalFinalsAverageGoals = [];

// for (let i = 0; i < teamNamesArray.length; i++) {
//     teamTotalFinalsAverageGoals[teamNamesArray[i]] = teamTotalFinalsGoals[teamNamesArray[i]] / teamTotalFinalsAppearances[teamNamesArray[i]]
// }

// ///// USE A FOR IN LOOP????

// return teamTotalFinalsAverageGoals
// }

// Create an object with key-value pairs of Name - Average Goals Per Appearance
// console.log("STRETCH #2: ", getGoals(fifaData))


/* 💪💪💪💪💪 Stretch 3: 💪💪💪💪💪
Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(/* code here */) {

    /* code here */

}


/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */


/* 🛑🛑🛑🛑🛑 Please do not modify anything below this line 🛑🛑🛑🛑🛑 */
function foo(){
    console.log('its working');
    return 'bar';
}
export default{
    foo,
    getFinals,
    getYears,
    getWinners,
    getWinnersByYear,
    getAverageGoals
}
