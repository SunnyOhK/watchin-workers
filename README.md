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

### Demo:

https://github.com/SunnyOhK/watchin-workers/assets/127900916/42b135a2-082b-4a8a-a006-9cf4785d1fd6


Or you can view the video at: https://watch.screencastify.com/v/Oswpez876fk4kNtAvTuO

## Technology Stack

|  | Tech Stack | Description |
| ---- | --- | --- |
| Foundation |  |  |
| <img height="20px" src="assets/jsIcon.png"> | JavaScript | Scripting language for webpages |
| <img height="20px" src="assets/mySQLIcon.png"> | MySQL | Open Source SQL database management system |
| npm Packages |  |  |
| <img height="20px" src="assets/nodeIcon.png"> | Node.js | Javascript Framework |
| <img height="20px" src="assets/expressJsIcon.png"> | Express | Node.js module |
| <img height="20px" src="assets/inquirerIcon.png"> | Inquirer | Command line interface for Node.js |
| <img height="20px" src="assets/figletIcon.png"> | Figlet | Implement FIGfont spec in JavaScript |
| <img height="20px" src="assets/consoleTableIcon.png"> | Console.table | Allows for command line table renderings |

## Credits

- Alex Gonzalez: EdX Tutor - Taught me about "async => await db.promise()" in order to receive information and return objects from the SQL database.
- Chat GPT helped with understanding overall concepts or explaining syntax errors. Any use of this tool is referenced within the code.
- Jessica Saddington - This fellow bootcamp student shared the Figlet npm package with the class for rendering decorative text at the start of our command line prompts.

## License
This project is licensed under: [MIT](https://choosealicense.com/licenses/mit/)
<br>

## Contact

For questions, please contact me:

### GitHub: 
  &nbsp;&nbsp;&nbsp; [SunnyOhK](https://github.com/SunnyOhK)
### Project Link: 
  &nbsp;&nbsp;&nbsp; https://github.com/SunnyOhK/watchin-workers
### Email: 
  &nbsp;&nbsp;&nbsp; 127900916+SunnyOhK@users.noreply.github.com
