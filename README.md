---- SERVER ----

1. Install dependencies using npm install
2. To start the server, run npm start. This command will start the server using `nodemon`, which means the server will automatically restart whenever you save changes to the files.
3. For connecting to the MongoDB database hosted in MongoDB Atlas, use this link in MongoDB Compass: mongodb+srv://AFPruebaAdmin:PeGo0BNlRqq27jKp@clusteraf.5iymifo.mongodb.net/ (alternatively, you can change the MongoDB database in the .env)
4. for run the tests, use the command npm test. This will run tests using Jest.

## Technologies Used

- Express.js
- Mongoose
- Socket.io
- CORS
- Dotenv
- Nodemon (for development only)
- Jest (for testing only)


---- CLIENT ----

Install dependencies using npm install.

To start the development server, run npm run dev. This command will start the server using Vite.

For building the production version of the application, run npm run build.

To preview the production build locally, run npm run preview.

Technologies Used

React.js
React Router DOM
Bootstrap
React Bootstrap
Moment.js
Socket.io Client
## Development Dependencies

Vite (for development server and build)
ESLint (for linting)
eslint-plugin-react (for React linting)
eslint-plugin-react-hooks (for React hooks linting)
eslint-plugin-react-refresh (for React Refresh linting)
@vitejs/plugin-react (Vite plugin for React)
@types/react (TypeScript types for React)
@types/react-dom (TypeScript types for ReactDOM)
Notes

Make sure to have the backend server running to connect to the WebSocket server provided by Socket.io.





