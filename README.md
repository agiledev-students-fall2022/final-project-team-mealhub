# MealHub

## Product Vision Statement
An application that allows you to meet new people and enjoy the restaurant down the street you have been dying to try.

## More about the project 
We will group you with others looking to go to the same restaurant. By going as a larger group, you will be able to meet new people. 

Each user has the ability to either create a room for a specific cuisine, or join an existing one. Once a room has reached the desired number of people that is set by the creator of the room, the room closes. The time and date are also set.


## Core Team members
* Gomda, Abdul Samad| <a href="https://github.com/asgomda">GitHub</a></br>

* Badr| <a href="https://github.com/ubadr">GitHub</a></br>

* Kalavadiya, Dev| <a href="https://github.com/Dev-Kalavadia">GitHub</a></br>

* Hamdani Hussain, Hassan| <a href="https://github.com/hassanhamdani"> GitHub</a></br>

* Seo, Misha| <a href="https://github.com/mishaseo"> GitHub </a>

## Project History
Being part of the billions of people who enjoy hanging out with others and eating, we wanted to find an easier way to coordinate this favorite pastime of ours.  Originally, we discussed and agreed on the fact that meeting new people nowadays has become very difficult, so we thought to ourselves, "Why not create an application where you can meet new people?".  However, being the foodies we are, we also considered creating an application where we could find local good eats.  Then the magic happened, and we realized that we should combine the two, since finding people to eat with can be difficult, and sometimes going alone to new places to eat can be a bit boring or lonely, but more importantly sometimes the best bonds can be made over a good meal.  These ideas ultimately led to the creation of MealHub.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

#### Backend:

`PORT=3001`

`NODE_ENV=development`

`MONGO_URI=mongodb+srv://mealhub12345:mealhub12345@cluster0.rx68d3c.mongodb.net/?retryWrites=true&w=majority`

`JWT_SECRET="catdog"`

`HEADER_URL=http://localhost:3000`

`CLOUDINARY_CLOUD_NAME=asgomda`

`CLOUDINARY_API_KEY=681632229379417`

`CLOUDINARY_API_SECRET=77uyU1Xp2Kek_gOVvFWPgzlrXX4`

`CLOUDINARY_URL=cloudinary://681632229379417:77uyU1Xp2Kek_gOVvFWPgzlrXX4@asgomda`

#### Frontend:

`PORT=3000`

`REACT_APP_URL=http://localhost:3001`

## Run Locally

Clone the project

```bash
git clone https://github.com/agiledev-students-fall2022/final-project-team-mealhub.git
```

Go to the project directory

```bash
cd final-project-team-mealhub
```

Install dependencies (in both frontend and backend)

```bash
cd front-end
npm install
```
AND
```bash
cd back-end
npm install
```

Start the server

```bash
nodemon server
```

Start the front-end

```bash
npm start
```


## Running Tests

To run tests, run the following command

```bash
npm test
```


## Contributions
For a guide on contributing, please reference <a href="https://github.com/agiledev-students-fall2022/final-project-team-mealhub/blob/master/CONTRIBUTING.md">CONTRIBUTING.MD</a>

## Other information
Check back at a later time for any updates!
