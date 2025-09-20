# portfolio frontend

## Project Objective
The objective of the Portfolio Frontend is to design and develop an interactive, user-friendly, and responsive web interface that showcases personal information, skills, achievements, and projects.

This frontend project ensures:

  . A visually appealing and modern UI/UX.
  
  . Seamless navigation between different sections.
  
  . Integration with the backend API for handling user interactions like submitting the contact form.
  
  . Responsiveness across devices.

  The aim of this project is to create a complete MERN-based Portfolio Website that highlights personal skills, achievements, and projects while providing a professional platform for visitors to connect.

---

## Brief Description
The Portfolio Frontend is a React-based web application that provides an elegant and responsive interface for showcasing personal information, skills, projects, and achievements.It also includes a contact form where users can send messages, which are forwarded to the backend for storage in MongoDB.
---

## Links
-** GitHub Repository:** https://github.com/kpragati03/portfolio_frontend.git

**Live Demo:** **https://portfolio-frontend-one-opal.vercel.app**
---

**##Technologies Used**
HTML5 & CSS3

JavaScript (ES6+)

React.js (Vite)

React Bootstrap

**##How to Run Locally**

Clone the repository

Bash

git clone https://github.com/kpragati03/portfolio_frontend.git
Navigate into the project folder

Bash

cd portfolio-frontend
Install dependencies

Bash

npm install
Start the development server

Bash

npm run dev


**##Challenges Faced & Solutions**
*Challenge:* Cross-Origin Resource Sharing (CORS) Errors

*Solution:* Configured the backend Node.js server with a flexible CORS policy to accept requests from both the main Vercel production domain and dynamic preview URLs generated during development.

*Challenge:* Deployment Bugs on Render

*Solution:* Debugged several Module Not Found errors caused by case-sensitivity differences between the local Windows environment and the Linux-based deployment server. Corrected all file import paths to ensure they matched the exact casing of the filenames.

*Challenge:* Corrupted Local Git Repository

*Solution:* Resolved a fatal: in unpopulated submodule error by identifying and removing a nested, accidental Git repository within the project structure, which allowed for a clean commit and push history.


## Screenshots

![img1](https://github.com/user-attachments/assets/901a90a6-40f2-4d9b-a13e-ed88649bdc5e)
The screenshot shows the homepage of a personal portfolio website for a "MERN Stack Developer" and self-introduction.
![img2](https://github.com/user-attachments/assets/c1368204-6c0e-4aad-a731-ec1503f6b632)
The screenshot shows the "About Me" page of a personal portfolio website.
![img3](https://github.com/user-attachments/assets/09e4a229-bb44-4028-b984-40b9beae3a07)
This screenshot demonstrates the Frontend Projects Page of your portfolio website, where different projects are showcased with their status.
![img4](https://github.com/user-attachments/assets/2cdb63f9-86fa-40a4-902a-383174a40358)
The screenshot shows the "Resume & Experience" page of a personal portfolio website being viewed in a web browser.
![img5](https://github.com/user-attachments/assets/be8b4f33-9a6d-4ecb-bc2b-41468ccd833f)
The screenshot shows a "Contact" page with a form to send a message.
---

## Feature List
- Homepage
- About Section
- Projects Section, Resume Section, Contact Section
- Dark/Light Mode Toggle
- Responsive Design
- Fast Performance

---

## Sample Input & Output
✅ Sample Input 

A visitor fills out the contact form on your portfolio website:

 1. Name: Pragati Kumari

 2. Email: pragati123@gmail.com

 3. Message: "Hi, I really liked your projects. Can we connect for a collaboration?"

✅ Sample Output

. User clicks "Submit" button.

. A success notification (e.g., "Your message has been sent successfully!") appears on the frontend.

. The form fields are cleared for new input.

📷 Screenshot Evidence (Frontend Output)

 . Contact form page after submission.

 . Form resets showing empty fields.

---

## Evaluation Criteria Mapping

| Criteria                |                  	              Implementation in Project                                                    |
|---------------------    | --------------------------------------------------------------------------------------------------------------|
| Project Objective       |  Built a personal portfolio website to showcase projects, skills, and provide a way for visitors to connect.  |
| Frontend Development    |  Created using React (Vite), with reusable components for Home, About, Projects, Resume, and Contact sections.|
|Design & Responsiveness  |  Fully responsive layout with modern UI/UX design, smooth navigation, and theme customization.                |
|Features Implemented     |  Project showcase cards, resume download link, contact form with validation, smooth scroll navigation,        |
|                         |     dark/light theme toggle.                                                                                  |
|Interactivity            |  Contact form input and submission, responsive navigation bar, interactive project status labels.             |
|Challenges & Solutions   |  Faced issues with routing, CSS styling conflicts, and form validation — solved using React Router,           |
|                         |       modular CSS, and custom hooks.                                                                          |
|Documentation            |  README includes objective, description, technologies used, setup instructions, screenshots,                  |
|                         |          sample input/output, and proof of working.                                                           |
| Sample Input/Output     |  Demonstrated contact form submission, success alert on frontend, and MongoDB entry on backend.               |

---

**#Team Contributions**

This project was a collaborative effort where each team member took ownership of key areas of the development lifecycle, from conception to deployment. The main responsibilities were distributed as follows:




****##Pragati Kumari (Project Lead & Lead Full-Stack Developer)****

As the project lead, Pragati spearheaded the technical direction and was responsible for the entire frontend development and the successful deployment of the full-stack application.

*Project Leadership & Architecture:* Led the project initiation, defined the technical architecture, and selected the MERN stack technologies.

*Lead Frontend Development:* Single-handedly designed and developed the entire frontend application using React. This included creating all components, implementing the UI/UX, styling, and adding light/dark mode theme functionalities.

*Full-Stack Deployment & DevOps:* Managed the complete end-to-end deployment pipeline, deploying the frontend to Vercel and the backend to Render.

*Critical Bug Resolution:* Systematically troubleshooted and resolved complex integration issues, including Cross-Origin Resource Sharing (CORS) policies, case-sensitivity bugs, and server-side deployment errors.

*Version Control & Documentation:* Established the final GitHub repositories and authored the comprehensive technical documentation, including setup guides, deployment links, and documenting project challenges.





****##Saroj Padhi (Lead Backend Developer)****

Saroj was responsible for building the entire server-side of the application, ensuring a robust and scalable backend to support the frontend's features.

*Backend Architecture:*  Architected and implemented the entire server-side application using Node.js and Express.js.

*Database Management:* Designed the MongoDB schema for the contact form and managed the complete database integration and connectivity.

*API Development:* Developed, tested, and secured all the API endpoints required for the frontend to interact with the database.





****##Dommaraju Jyothshna Sree (Project Contributor)****
Jyothshna played a key role in the initial phase of the project, helping to set up the foundational elements.

*Initial Setup & Scaffolding:* Contributed to the project's kickoff by creating the initial GitHub repository.

*Documentation:* Authored the first draft of the project's README file, which laid the groundwork for the final documentation.



## Author

*Name:*   PRAGATI KUMARI,
          SAROJ PADHI,
          DOMMARAJU JYOTHSHNA SREE.

*Date:* 20 september 2025
