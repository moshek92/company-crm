# company-crm

Mini CRM project aimed at managing customers, products and orders.

Tech Stack
Node.js
Express.js
MySQL
nodemon
Angular
Prepare The Environment
Create a new MySQL database, follow instructions in the docs folder.
Clone project in vscode: https://github.com/moshek92/company-crm.git
Install dependencies in vscode terminal: npm install
Install nodemon globally: npm i -g nodemon and update package.json accordingly.
In project, add configuration file: config/dev.js containing the database connection details.
In project, add folder exports.
Install dependencies for Angular client:
cd client-angular
npm install
Run The App
Run the server:
Windows: set DEBUG=company-crm:*; & npm start
MacOS/Linux: DEBUG=company-crm:* npm start
Run the client:
cd client-angular
ng serve
