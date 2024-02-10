# Recipe-App

- Welcome to the Recipe App! This application allows users to manage recipes, including adding new recipes, viewing existing recipes, updating recipes, and deleting recipes.

# Features

- Add Recipe: Users can add a new recipe by providing a title, category, list of ingredients, instructions, and an optional image.
- View Recipe List: Users can view a list of all recipes, including their titles, categories, ingredients, and a preview of the instructions.
- Update Recipe: Users can update existing recipes, modifying any of the recipe details.
- Delete Recipe: Users can delete recipes they no longer need.

# Technologies Used

- Frontend: React.js
- Backend: Node.js, Express.js
- Styling: Bootstrap and Toastify
- Image Upload: Multer
- Routing: React Router
- State Management: React Hooks
- Unique IDs: UUIDv4
- Newsletter Service: Newsletter Service:
- Our application uses a custom-built newsletter service hosted on the backend. This service manages newsletter subscriptions, sends out newsletters, and handles user interactions related to newsletters. The backend endpoint for accessing the newsletter service is [http://localhost:1111/api/recipes/subscribe].


# Setup

- Clone the repository to your local machine.
- Navigate to the project directory.
- Install dependencies by running npm install.
- Start the backend server by running npm start in the backend directory.
- Start the frontend development server by running npm start in the frontend directory.
- Access the application in your web browser at http://localhost:3000.

# Usage

- Navigate to the homepage to view a list of existing recipes.
- Click on "Add Recipe" to add a new recipe.
- Fill out the form with the recipe details and click "Submit".
- Once added, the new recipe will appear in the recipe list.
- To update or delete a recipe, click on the corresponding buttons next to the recipe in the list.
- To subscribe to the newsletter, enter your email address in the provided field and click "Subscribe".

# API Endpoints

- GET /api/recipes: Retrieve a list of all recipes.
- POST /api/recipes: Add a new recipe.
- GET /api/recipes/:id: Retrieve details of a specific recipe.
- PUT /api/recipes/:id: Update an existing recipe.
- DELETE /api/recipes/:id: Delete a recipe.
- Post /api/recipes/subscribe: Add a new name and email.

# Contributors

[Daniel Torres]

# License

- This project is licensed under the MIT License.