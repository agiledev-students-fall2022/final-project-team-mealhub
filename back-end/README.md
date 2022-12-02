
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

#### Backend:

`PORT=3001`

`NODE_ENV=development`

`MONGO_URI=mongodb+srv://mealhub12345:mealhub12345@cluster0.rx68d3c.mongodb.net/?retryWrites=true&w=majority`

`JWT_SECRET="catdog"`

`HEADER_URL=http://localhost:3000`

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

