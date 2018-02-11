# code_challenge
Code Challenge

My name is Ashlee Flanagan and this is my code for the Business Card OCR Code Challenge.

Assumptions

* Data is formatted in 1 of 3 specific business card types.
  1. A small business card
      * has 5 total lines
      * the name is defined on line 2
      * the phone number is defined on line 4
  2. A medium business card
      * has 8 total lines
      * the name is defined on line 3
      * the phone number is defined on line 6
  3. A large business card
      * has 10 total lines
      * the name is defined on line 1
      * the phone number is defined on line 8

* Any business card not following this specification will be rejected

* All input files are stored in a 'Inputs' directory at the current level as the businessCard.js file

* Input files cannot start with a '.'

Prerequisites Programs
* node
* npm

Prerequisites Libraries
  Note: npm install <lib>
  - underscore
  - walk
  - readTextFile
  - startsWith

How to run program:
* Open a terminal
* Run 'node businessCard.js'

In the terminal window you will see the results of the business cards displayed as required.
