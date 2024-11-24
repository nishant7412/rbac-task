 ## Overview
This project is a React-based implementation of a Role-Based Access Control (RBAC) User Interface. It provides an intuitive and user-friendly way to manage users, roles, and permissions within a system. The application allows administrators to define roles, assign permissions, and manage users efficiently.

 ## Features
1. User Management
View the list of all users with details such as name, email, role, and status (Active/Inactive).
Add new users with mandatory fields validation.
Edit existing users to update details like name, email, or assigned role.
Delete users with a confirmation prompt to prevent accidental deletions.
Assign roles dynamically while creating or editing a user.


2. Role Management
View a list of all roles with their associated permissions.
Create new roles with a name and customizable permissions.
Edit existing roles to modify the name or assigned permissions.
Delete roles safely, with validation to prevent breaking dependencies.


3. Dynamic Permissions
Assign specific permissions (e.g., Read, Write, Delete) to roles during creation or editing.
Display permissions in a clear and understandable way.
Modify permissions dynamically to adapt to changing requirements.


4. Custom API Simulation (Optional)
Mock API calls for Create, Read, Update, and Delete (CRUD) operations.
Simulated server responses to validate the functionality of the application.
Axios is used for API communication, enabling easy integration with a real backend.
Technologies Used
React: For building the UI components and managing application state.
Material-UI (MUI): For a modern, responsive, and aesthetically pleasing design.
Axios: To handle API calls for CRUD operations.
JavaScript: The primary programming language for the project.
Mock Server: (Optional) To simulate backend functionality.


## Getting Started
1. Prerequisites
Node.js and npm installed on your system.
Basic understanding of React and JavaScript.
2. Installation
--> Clone the repository:
--> Navigate to the project directory:
--> Install dependencies:npm i

--> Start the development server:npm start
--> Open your browser and navigate to http://localhost:8080.

## Usage
# Adding a User
-> Navigate to the User Management section.
-> Fill in the required fields (Name, Email, Role).
-> Click Add User to create the user. Validation ensures no empty fields.
# Editing a User
-> Click the Edit icon next to a user.
-> Modify the desired fields and save changes.
# Adding a Role
-> Navigate to the Role Management section.
-> Enter the role name and define its permissions.
-> Click Add Role to save the role.
# Editing a Role
-> Click the Edit icon next to a role.
-> Update the name or permissions and save changes.


## Feedback and Contribution
Feel free to fork the repository and contribute to this project. Suggestions and feedback are always welcome! For any issues or feature requests, please open an issue on the repository.

## AUTHOR
Nishant Sharma
nsnishant5930@gmail.com
