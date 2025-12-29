# Chat with Gemini

Final Project for System Administration and Maintenance Class.

A robust, full-stack chatbot application built using the MERN Stack (MongoDB, Express, React, Node.js). This project demonstrates advanced system administration concepts including multi-container orchestration with Docker, API development, cloud AI integration, and persistent database management.

## Author

* John Fred Macapaz

## Group 2 Members

* Jeddy Valencia
* Ranel Dahil
* Jhon Christian Andulana
* Joshua Pacaña

## Features

* Full-Stack Architecture: Built on the MERN stack for a complete client-server-database workflow.
* AI Integration: Real-time communication with Google's Gemini Pro model.
* Database Persistence: Messages are stored in a self-hosted MongoDB container, ensuring data persists even after restarting the application.
* Docker Orchestration: Runs three linked containers (Frontend, Backend, Database) simultaneously using Docker Compose.
* Enhanced UI/UX: Features suggestion chips, markdown rendering for code blocks, interactive loading states, and a modern neumorphic design.

## Prerequisites

Before running this project, ensure you have the following installed:

* Docker Desktop
* Git

## Setup & Installation

### 1. Clone the Repository

Open your terminal and run:

```bash
git clone [https://github.com/IamJoof/ChatWithGemini.git](https://github.com/IamJoof/ChatWithGemini.git)
cd ChatWithGemini

```

### 2. Configure Environment Variables

This project requires a valid Google Gemini API Key to function.

1. Locate the file named .env.example in the root directory.
2. Create a copy of this file and name it .env.
3. Open the new .env file and paste the API key.

Note to Sir Aaron:
The VITE_GEMINI_API_KEY in the example file is set to SECRET_API_KEY_PLACEHOLDER.
I have sent the actual working API Key to you via private message. Please use that key to run the project.

Your .env file should look like this:

```env
VITE_GEMINI_API_KEY=your_actual_api_key_here

```

## How to Run (Docker)

This project uses Docker Compose to orchestrate the Client, Server, and Database containers automatically.

1. Build and Run the Application:
Make sure Docker Desktop is running, then execute:
```bash
docker compose up --build

```


This command will:
* Download and start the MongoDB container.
* Build the Node.js/Express Backend.
* Build the React Frontend and serve it via Nginx.


2. Access the Application:
Once the terminal shows the build is complete, open your browser and navigate to:
http://localhost:8080
3. Stop the Application:
To stop the containers, press Ctrl + C in the terminal.

## Project Structure

* client/ - React Frontend application
* server/ - Express.js Backend API
* docker-compose.yml - Orchestration for Client, Server, and MongoDB services
* client/Dockerfile - Multi-stage build for the frontend (Node -> Nginx)
* server/Dockerfile - Build configuration for the backend API
* .env.example - Template for environment variables

```

```