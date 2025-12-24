# Chat with Gemini

Final Project for System Administration and Maintenance Class.

A modern, AI-powered chatbot application utilizing Google's Gemini AI API. This project demonstrates API integration, data persistence, and containerized deployment using Docker.

## Author

* John Fred Macapaz

## Group 2 Members

* Jeddy Valencia
* Ranel Dahil
* Jhon Christian Andulana
* Joshua Pacaña

## Features

* AI Integration: Real-time communication with Google's Gemini Pro model.
* Data Persistence: Chat history is saved locally to LocalStorage.
* Dockerized: Fully containerized with Nginx for easy deployment.
* Responsive UI: Custom CSS styling mimicking modern mobile application aesthetics.

## Prerequisites

Before running this project, ensure you have the following installed:

* Docker Desktop
* Git

## Setup & Installation

### 1. Clone the Repository

Open your terminal and run:

```bash
git clone https://github.com/IamJoof/ChatWithGemini.git
cd ChatWithGemini

```

### 2. Configure Environment Variables

This project requires a valid Google Gemini API Key to function.

1. Locate the file named .env.example in the root directory.
2. Create a copy of this file and name it .env.
3. Open the new .env file and paste the API key.

Note to sir Aaron:
The VITE_GEMINI_API_KEY in the example file is set to SECRET_API_KEY_PLACEHOLDER.
I have sent the actual working API Key to you via private message. Please use that key to run the project.

The .env file should look like this:

```env
VITE_GEMINI_API_KEY=your_actual_api_key_here

```

## How to Run (Docker)

This project is configured with a Multi-Stage Docker Build utilizing Nginx.

1. Build and Run the Container:
Make sure Docker Desktop is running, then execute:
```bash
docker compose up --build

```


2. Access the Application:
Once the terminal shows the build is complete, open your browser and navigate to:
http://localhost:8080
3. Stop the Application:
To stop the container, press Ctrl + C in the terminal.

## Project Structure

* src/components/ - Contains React components (ChatInput, ChatList, ChatMessage)
* src/App.jsx - Main application logic and CRUD operations
* src/gemini.js - AI Service Configuration
* Dockerfile - Multi-stage build configuration (Node -> Nginx)
* docker-compose.yml - Container orchestration
* .env.example - Template for environment variables