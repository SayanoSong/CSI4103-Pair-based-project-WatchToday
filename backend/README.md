## Running

Before running your app, make sure you have all node modules install by running
```node
npm i
```

(Note: This might require sudo). Also make sure docker is installed and running, either by opening docker desktop on windows or running the following command on linux
```bash
sudo service docker start
```
Next, in order to ensure the database is started and connected, run
```
docker-compose up
```

Next, we make sure our prisma migrations are done with
```
npx prisma migrate dev
```

Finally, we make sure our database is up to date with
```
npx prisma db pull
```

To run the express app, run the following command from within this directory
```node
node app.js
```

### Notes
This should probably not be a sub directory of the react project, but it will work for the project