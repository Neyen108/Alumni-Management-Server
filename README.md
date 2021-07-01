# Alumni-Management-Server    

The server/backend code for an Alumni Management System built with [NodeJs](https://nodejs.dev/), [Express](https://expressjs.com/) and [Firebase](https://firebase.google.com/).        
[Firebase Admin SDK](https://firebase.google.com/docs/admin/setup) has been used for facilitating the use of Firebase on a server.    
[FireStore](https://firebase.google.com/docs/firestore) is used as the Alumni Database.     
The client/frontend can be found [here](https://github.com/Neyen108/Alumni-Management-Client).      

## 🛠 Installing     
1. Install dependencies     

   ```bash
   npm install
   ```     

2. Fire up the server and watch files      

   ```bash
   npm start
   ```    
   
## 🛠 Local Development Environment     

   To run this project on your own Development Environment.      
  
   Create a .env file in the working directory.     
   The .env file should look like this:
  
   GOOGLE_CREDS={ [your firebase service account details json](https://firebase.google.com/docs/admin/setup#initialize-sdk) }        
   
   Once set up, run:
   ```bash
   npm install
   npm start
   ```
   And the project should load up.     

## 🛠 Built with   

- [NodeJs](https://nodejs.dev/)      
- [ExpressJs](https://expressjs.com/)   
- [Firebase](https://firebase.google.com/)    
