# MealPlanner

MealPlanner is an application that helps users plan their weekly meals, create shopping lists, and share meal plans with household members. It allows users to add recipes, plan meals for the week, and generate a shopping list based on the planned meals.

## Features

- Add and manage recipes
- Plan weekly meals with a calendar-like interface
- Generate shopping lists based on planned meals
- Share meal plans with household members
- User authentication and management

## Technologies

- **Frontend:** React
- **Backend:** Flask, SQLAlchemy
- **Database:** PostgreSQL

## Setup

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/mealplanner.git
   cd mealplanner
   ```

2. Backend:
    ```bash
    cd backend
    python -m venv venv
    venv\Scripts\activate
    pip install -r requirements.txt
    flask run
    ```

3. Frontend:
    ```bash
    cd ../frontend
    npm install
    npm start
    ```

4. Access the application:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000