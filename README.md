# COSC360-G12-Project

## Overview
This project is a web blog called MyBlogPost, allowing users to post, view, and comment on blog posts.

It is created with the following technologies.

- <b>Frontend</b>: Next.js (React)
- <b>Backend</b>: Express (Node.js)
- <b>Database</b>: MariaDB (MySQL)

## Getting Started
### How to develop

1. Install the latest LTS version of [Node.js](https://nodejs.org/en/)
2. In both /frontend and /backend, run `npm install`. This will need to be done whenever another developer has added a new library since you last ran the command. You'll know this by an error message that comes up when you try to follow steps 1 or 2 in 'How to run' below.
3. Install a database client such as [HeidiSQL](https://www.heidisql.com/), used to interact with the database directly
    - To access the database, use this info:
      - IP/Port: finnigan.me:3306
      - Database: COSC360
      - Username: cosc360
      - Password: cosc360
4. <i>(optional)</i> For writing code, [VS Code](https://code.visualstudio.com/) is recommended.
5. <i>(optional)</i> For testing and developing the API, [Postman](https://www.postman.com/downloads/) is recommended.

In general, whenever adding something new, copy the format of existing code if possible.

### How to run

1. Frontend - in /frontend, run `npm run dev`
    - To access the test page with examples of most basics you'll need to create the frontend, visit the address http://localhost:3000/test
2. Backend - in /backend, run `node app.js`

If an error occurs, see step 2 in 'How to develop'.


# Helpful resources

## Frontend
### React
- [For beginners](https://www.freecodecamp.org/news/react-components-jsx-props-for-beginners/)
- [Using the state hook](https://reactjs.org/docs/hooks-state.html)
- [Other hooks (very nice)](https://reactjs.org/docs/hooks-overview.html)
- [Next.js blog tutorial](https://nextjs.org/learn/basics/create-nextjs-app)

## Backend
### Sequelize (database connection)
- [Data types](https://codewithhugo.com/sequelize-data-types-a-practical-guide/)
- [Query functions](https://sequelize.org/master/manual/model-querying-basics.html)
- [Foreign keys](https://stackoverflow.com/a/23035179/1807012)

## Database
### MariaDB (MySQL)
- [MariaDB basics](https://mariadb.com/kb/en/mariadb-basics/)
- Note: Sequelize will automatically create tables in the database, based off of models defined in backend/models/
