//require underscore library
var underscoreLib = require('underscore');
//this walks through the directory
var walk = require('walk');
//this will read the individual files and get the content
var readTextFile = require('read-text-file');
// this checks if a file starts with...
var startsWith = require('starts-with')

//data pulled in from files in the directory
var exampleInputs = [];

// Walker options
// Inputs is the directory I saved the businessCards in...
var walker  = walk.walk('./Inputs', { followLinks: false });

walker.on('file', function(root, stat, next) {
	//.DS_Store was messing things up so we are ignoring files that start with "."
	if(!startsWith(stat.name, '.')){
		var contents = readTextFile.readSync(root + '/' + stat.name);
		exampleInputs.push(contents);
	}
    
    next();
});

walker.on('end', function() {
    //take the whole array of inputs and go through each one and call functions
	countNumberOfLines = underscoreLib._.select(exampleInputs, function(businessCard){ 
		parseBusinessCard(businessCard);
		return businessCard;
	});
});

//go through a single business card and split on the lines and count the number of lines...
function parseBusinessCard(businessCard){
	//split on line breaks
	var lines = businessCard.split("\n");
	var cardObject = {};
	switch (lines.length) {
    default: 
        console.log("Error: Business Card supplied is not supported. " +
		"This program only recognizes 5, 8 or 10 lined Business Card.\n");
        break;
		//if lines.length is 5 card it is a small business card and name is on the second line
    case 5:
		cardObject = parseCard(lines, 1, 3);
        break; 
		//if lines.length is 8 card it is a medium business card and name is on the third line
    case 8:
		cardObject = parseCard(lines, 2, 5);
		break;
		//if lines.length is 10 card it is a large business card and name is on the first line
	case 10:
		cardObject = parseCard(lines, 0, 7);
	}
	
	//check to make sure it is not undefined or empty
	if (cardObject !== undefined && !underscoreLib._.isEmpty(cardObject)){ 
		getName(cardObject);
		getPhoneNumber(cardObject);
		getEmailAddress(cardObject);
		console.log();
	}
};

function getName(cardObject){
	console.log("Name: " +cardObject.name);
};

function getPhoneNumber(cardObject){
	console.log("Phone: " +cardObject.phoneNumber.replace(/\D/g, ''));	
};

function getEmailAddress(cardObject){
	console.log("Email: " +cardObject.email);
};

function parseCard(lines, nameIndex, phoneIndex){
	var names = lines[nameIndex];
	var phoneNumber = lines[phoneIndex];
	var email = {};
	//check for email using regex - pulled regex example from ....http://emailregex.com 
	var emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	
	//go through each line and look for a match to the regex
	underscoreLib._.select(lines, function(line){ 
		var emailMatch = line.match(emailRegEx);
		//if the line does match it is our email address
		if(emailMatch !== null){
			email = emailMatch.input
		}
		
	});
	
	var cardObject = {name: names, phoneNumber: phoneNumber, email: email};
	return cardObject;
};