# team-warhol

Harvard Art Museums API key: a935e3b6-39b3-439a-baab-64f82bef02df
Documentation is at https://github.com/harvardartmuseums/api-docs.

***`Artworks`***

***Story***

Your millionaire art connoisseur friend has hired you and your team, to create a website for them. Your team is not enough to create this project, so you will need to join forces with other teams.

You will need to team up with students from other courses and cooperate to work on this project (frontend and backend devs, manual testers, sysadmin).

What are you going to learn?
Parallel working

***Tasks*** Frontend requirements (This is only for the Frontend course students)

Create the frontend and the user handling backend part of this project.
There is a page where artworks are listed and users can browse and save artworks (there are some APIs included in the background materials).
There is a user management system (register/login) with authorization. Authorization could be third party (Google, Facebook) or Email/Password.
Users can browse, search and saved artworks. Users saved artworks are stored in a database (as well as other user data).
Artworks have their own page with all their details.
Users can add tags to their saved artworks (and browse their tags as well).
When you have to store and image for a saved artwork send it to the Backend students' image server.

***Backend requirements*** (This is only for the Backend course students)

Create an image server part of this project.
You have to create a image server for save images arrived from the Frontend students' server. (POST request arrive)
Send back a link where the stored image are available. (GET request arrive)

***Test requirements*** (This is only for the Testing course students)

Create the test part of this project.
There is a test plan.
There are acceptance criteria for every story.
There are test cases for main functions.
Testers done exploratory testing.
Test case design is reactive.
There is a bug report.
There are bug confirmation tests.

***Sysadmin requirements*** (This is only for the Sysadmin course students)

Create the sysadmin part of this project.
Docker files and development environment are set up.
Deploy the project (preferably with an automated build from github).
Sysadmins figured out the best infrastructure and if load-balancer is necessary.

***General requirements***

***Hints***

"Weeks of coding can save you hours of planning" is a funny quote, meaning you should carefully plan the whole project first before jumping into coding
You don't need to use the example APIs, you can find an other one you prefer
Background materials
 Example API#1  https://harvardartmuseums.org/collections/api
 Example API#2  https://metmuseum.github.io/
 Example API#3  https://developers.artsy.net/ 
 Example API#4  https://www.artpi.co/ 