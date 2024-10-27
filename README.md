
# 🌐 Frontend for Quiz Management System

This project is the frontend for a quiz management system. It interacts with the FastAPI backend, providing users with a web interface to answer quiz questions, track their progress, and view correct answers. The design is styled using **Tailwind CSS** for a modern and responsive look.

## 🚀 Features

- **Event-driven interactions**: The frontend supports user input events such as form submissions and button clicks.
- **Dynamic rendering**: Questions and answers are dynamically rendered based on user input and API responses.
- **Responsive design**: Built with **Tailwind CSS**, the layout is fully responsive and optimized for various screen sizes.
- **Integration with FastAPI backend**: Fetches quiz questions and answers from the FastAPI backend.

## 🛠️ Technologies Used

- **HTML/CSS**: For structuring and styling the user interface.
- **TypeScript**: Provides type safety and modern JavaScript features.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **FastAPI Backend**: The backend API that provides quiz questions and handles responses.

## ⚙️ Setup Instructions

To run this frontend project, follow these steps:

### 1. Clone the repository
```bash
git clone https://github.com/psychpsych/cold-hard-facts-frontend.git
cd cold-hard-facts-frontend
```

### 2. Serve the application
You can serve the static files locally with any static file server. For example, using `http-server`:
```bash
npm install -g http-server
http-server .
```

The application will be available at `http://localhost:8080`.

## 🌟 Key Files

- **index.html**: The main HTML file that structures the user interface.
- **js/main.ts**: Contains the core TypeScript logic for fetching questions and handling user interactions.

## 🧑‍💻 Integration with Backend

This frontend interacts with the FastAPI backend through a REST API. It fetches quiz questions and updates the UI dynamically based on the data returned from the backend.

### Example API Request:
- Fetching a random question:
```http
GET /question/{id}
```

## 🛣️ Roadmap

### ✔️ Completed
- Dynamic quiz rendering.
- User interaction handling.
- Tailwind CSS for responsive design.
- Integration with the backend for question fetching.

### 🟢 Next Steps
- Implement user authentication to track individual quiz scores.
- Add animations using Tailwind CSS for smoother transitions between questions.
- Improve mobile responsiveness further.

## 📝 License

This project is licensed under the MIT License.
