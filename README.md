No manual creation of databases or collections is required.
MongoDB and Mongoose will automatically handle database and collection creation based on the backend logic.
You can seed the database with initial data by calling the /api/seed route.

Workflow:
When you run docker-compose up --build, MongoDB is spun up in a container, and it will be ready to accept connections.
The backend service will connect to MongoDB at mongodb://mongo:27017/usersdb.
When the POST /api/users or GET /api/users route is hit for the first time:
Mongoose will try to insert/find users.
If the database usersdb doesn't exist, MongoDB will create it automatically.
If the users collection doesn't exist, MongoDB will also create it automatically upon the first insert.
Optional MongoDB Seed:
If you'd like to pre-populate the database (seed data), you can:

Call the /api/seed route, which inserts default users into MongoDB.
This will create the usersdb database and users collection automatically when you insert the first user.