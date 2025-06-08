CLASSMATES - Project Collaboration Platform
CLASSMATES is a web platform where students can showcase their ongoing academic or personal projectsTech Stack
- Frontend: Nuxt.js 3, Tailwind CSS, Pinia
- Backend: Django, Django REST Framework
- Database: MySQL
Features
- User registration & login
- Token-based authentication
- Project creation, editing, and deletion
- Filter/search projects by category and query
- Students can send contribution requests via email
- Admin-approved project listing
- Responsive and modern UI
Installation
Frontend (Nuxt.js)
 cd frontend
 npm install
 npm run dev
Backend (Django)
 cd backend
 python manage.py makemigrations
 python manage.py migrate
 python manage.py runserver
Project Structure
classmates/
■■■ frontend/ # Nuxt.js frontend
■■■ backend/ # Django backend
■ ■■■ api/ # API app
■ ■■■ users/ # User management
■ ■■■ ...
■■■ README.md
Contribution Flow
1. Browse listed projects
2. Click "Contribute"
3. Opens email to contact project lead directly
