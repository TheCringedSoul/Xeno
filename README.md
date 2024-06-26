I bootstrapped this project with Next.js to ensure a robust and scalable foundation.

To access the platform, you'll need to clone the repository and install the necessary dependencies. 

I use concurrently to run both the frontend and backend servers simultaneously, so the overall commands remains the same (npm run dev). The frontend runs on port 3000, and the backend runs on port 5000. The backend has been segmented into routes, controllers, and models, which eventually feed the API. You can find the backend code under the backend folder. This structure ensures that the backend is primarily used for data ingestion.

For user authentication, I've integrated Google authentication using NextAuth. This allows users to log in using their Google accounts. After a successful login, users can access the rule-setting feature to send campaigns and then view the campaigns.

The personalised campaign messages are stored in the communicationlogs collection in the database. I have used MongoDB for storing the data, and Mongoose is the npm package used to interact with the database. This setup ensures that the data is stored efficiently and can be retrieved quickly when needed.

I have hosted this project on Vercel. However, it currently lacks a connection with the database because the server is still operating on localhost. Despite this, the UI is fully interactive and functional including the authentication. So we can fully explore the interface and understand how the platform works, even though the full backend functionality is not directly connected.
