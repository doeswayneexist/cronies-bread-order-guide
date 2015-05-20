//get current bread
var currentBread;
var extraPeople;

//set the sandwich ratio. this is how many people out of 10 get sandwiches
var sandwichRatio = 3;

//set the backup supply. this is what portion of the daily usage we should add as backup. set at an extra 75%
//backUp is set to what we want to have in the freezer in case of emergency
var backUp = 48;
//connect with the submit button
document.getElementById("sub").onclick = function () {
    extraPeople = document.getElementById("extraPeople").value;
    currentBread = document.getElementById('rolls').value;
    calculateBread(currentBread);
};

//figure out what the estimatedUsage is
var today = new Date();
var weekday = today.getDay();

//setting the values for the weekdays
var sundayAverage = 35;
var mondayAverage = 37;
var tuesdayAverage = 27;
var wednesdayAverage = 39;
var thursdayAverage = 25;
var fridayAverage = 48;
var saturdayAverage = 46;


function calculateBread(cB) {

    //finding the estimated usage for the day and the bread par
    //what is the breadpar? the next days usage, plus some extra
    var estimatedUsage;
    var breadPar;

    if (weekday == 0) {
        estimatedUsage = sundayAverage;
        breadPar = mondayAverage + backUp;
    } else if (weekday == 1) {
        estimatedUsage = mondayAverage;
        breadPar = tuesdayAverage + backUp;
    } else if (weekday == 2) {
        estimatedUsage = tuesdayAverage;
        breadPar = wednesdayAverage + backUp;
    } else if (weekday == 3) {
        estimatedUsage = wednesdayAverage;
        breadPar = thursdayAverage + backUp;
    } else if (weekday == 4) {
        estimatedUsage = thursdayAverage;
        //breadPar = fridayAverage + (fridayAverage * backUp);
        breadPar = fridayAverage + backUp;
    } else if (weekday == 5) {
        estimatedUsage = fridayAverage;
        //just gonna throw 3 dozen in for extra on the weekend
        //this is temporary
        breadPar = saturdayAverage + sundayAverage + backUp;
    } else if (weekday == 6) {
        estimatedUsage = saturdayAverage;
    }

    //determine what you should have left at the end of the day
    var projectedLeftovers = cB - estimatedUsage;

    //dont let projected leftovers be negative
    if (projectedLeftovers < 0) {
        projectedLeftovers = 0;
    }

    //add any extra parties for tomorrow
    if (extraPeople > 0) {
        breadPar += parseInt(extraPeople / sandwichRatio, 10);
    }

    //get the bread order
    var breadOrder = breadPar - projectedLeftovers;

    //dont let bread order be negative
    if (breadOrder < 0) {
        breadOrder = 0;
    }

    //convert to dozen
    var asDozen = parseInt(breadOrder / 12, 10);
    if (breadOrder % 12 >= 6) {
        asDozen++;
    }

    //spit out a reading
    alert("Order " + asDozen + " dozen rolls. ");
}