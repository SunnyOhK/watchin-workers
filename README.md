# Watchin' Workers

![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![edX](https://img.shields.io/badge/edX-%2302262B.svg?style=for-the-badge&logo=edX&logoColor=white)  <br>
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://choosealicense.com/licenses/mit) 
[![MySQL](https://img.shields.io/badge/-MySQL-00758F.svg)](https://choosealicense.com/licenses/mit) 
<br>

## Description
This application is content management system (CMS) that relies on command-line queries to manage a company's employee database. With the implementation of Node.js, Inquirer, and MySQL, a user can access and update records for company departments, roles, and employees.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)
- [Contact](#contact)

## Installation

This application connects with your preferred company database and runs in a local terminal. 
1. Clone the GitHub repository to your local environment using the provided SSH key.

        git clone git@github.com:SunnyOhK/watchin-workers.git


2. From your command line:
    - Insure that all node packages have been installed

          /watchin-workers
              npm i
    - Connect with the MySQL shell from the db folder and source the schema and seeds files
    
          /watchin-workers/db
              mySQL -u <username> -p
              (on prompt)  <input password> 
              source schema.sql;
              source seeds.sql;
    - Start the server from the root folder
          
          /watchin-workers
              node index.js
      


## Usage 
E:
  1. Visit the 

Demo:

https://user-images.githubusercontent.com/127900916/236368158-053e2c97-d22e-4484-8dc7-0f36cff9e6dd.mp4


## Credits

- Alex Gonzalez: EdX Tutor 
- Express.js: https://expressjs.com/

## License
This project is licensed under: [MIT](https://choosealicense.com/licenses/mit/)
<br>

## Contact

For questions, please contact me:

### GitHub: 
  &nbsp;&nbsp;&nbsp; [SunnyOhK](https://github.com/SunnyOhK)

### Project Link: 
  &nbsp;&nbsp;&nbsp; https://express-yourself-note-taker.herokuapp.com/
### Email: 
  &nbsp;&nbsp;&nbsp; 127900916+SunnyOhK@users.noreply.github.com