# Task Manager App

A modern, full-stack task management application built with Node.js, MySQL, and vanilla JavaScript. Features a beautiful Kanban board interface, drag-and-drop functionality, and real-time task tracking.


[🔗 View Interactive Prototype](prototype/index.html)

## 📖 What is this?

A personal task management application designed to help users organize their work with a visual Kanban board. Built as a portfolio project to showcase full-stack development skills including:

- RESTful API design with Node.js/Express
- Database management with MySQL
- Modern frontend development with vanilla JavaScript
- UI/UX design with responsive layouts
- Authentication & security implementation

**Ideal for:** Developers, students, freelancers, or anyone needing a simple yet effective task tracker.

## ✨ Features

- 🔐 **Authentication System** - Secure JWT-based login and registration
- 📋 **Kanban Board** - Visual task management with drag-and-drop
- 🏷️ **Priority Levels** - High, Medium, Low priority badges
- 📅 **Due Dates** - Track task deadlines with visual indicators
- 📊 **Dashboard Analytics** - Task overview charts and progress tracking
- 🎨 **Modern UI** - Clean, responsive design with smooth animations
- 🔄 **Real-time Updates** - Instant task status synchronization
- 📱 **Responsive** - Works seamlessly on desktop and mobile

## 🛠️ Tech Stack

**Frontend:**
- HTML5 & CSS3
- Vanilla JavaScript (ES6+)
- Bootstrap 5
- Bootstrap Icons
- Chart.js for analytics
- SortableJS for drag-and-drop

**Backend:**
- Node.js
- Express.js
- MySQL Database
- JWT Authentication
- bcrypt for password hashing

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MySQL Server
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/task-manager.git
   cd task-manager
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Setup Database**
   - Create a MySQL database
   - Run the migration script:
   ```bash
   mysql -u root -p your_database < backend/migration.sql
   ```

4. **Configure Environment Variables**
   Create a `.env` file in the backend directory:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=task_manager
   JWT_SECRET=your_secret_key
   PORT=5000
   ```

5. **Start the Backend Server**
   ```bash
   npm start
   # or
   npx nodemon server.js
   ```

6. **Open the Frontend**
   - Navigate to `frontend/login.html`
   - Or use a local server like Live Server in VS Code

## 📁 Project Structure

```
task-manager/
├── backend/
│   ├── config/
│   │   └── db.js              # Database configuration
│   ├── controllers/
│   │   ├── authController.js  # Authentication logic
│   │   └── taskController.js  # Task CRUD operations
│   ├── middleware/
│   │   └── auth.js            # JWT verification
│   ├── models/
│   │   └── taskModel.js       # Database queries
│   ├── routes/
│   │   ├── authRoutes.js      # Auth endpoints
│   │   └── taskRoutes.js      # Task endpoints
│   ├── server.js              # Express server entry
│   └── migration.sql          # Database schema
├── frontend/
│   ├── login.html             # Login page
│   ├── register.html          # Registration page
│   ├── dashboard.html         # Analytics dashboard
│   ├── board.html             # Kanban board
│   ├── app.js                 # Main JavaScript logic
│   └── styles.css             # Global styles
└── README.md
```

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Tasks (Requires JWT Token)
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## 🎨 Key Features Explained

### Kanban Board
- Three columns: Pending, In Progress, Completed
- Drag and drop tasks between columns
- Visual priority badges (High 🔴, Medium 🟡, Low 🟢)
- Due date indicators
- Edit and delete actions

### Dashboard
- Task distribution pie chart
- Progress bar visualization
- Quick action buttons
- Task statistics counters

### Responsive Design
- Mobile-friendly interface
- Adaptive layouts
- Touch-friendly interactions

## 🔒 Security

- JWT-based authentication
- Password hashing with bcrypt
- Protected API routes
- SQL injection prevention
- XSS protection

## 📝 Environment Variables

| Variable | Description |
|----------|-------------|
| `DB_HOST` | MySQL host |
| `DB_USER` | MySQL username |
| `DB_PASSWORD` | MySQL password |
| `DB_NAME` | Database name |
| `JWT_SECRET` | Secret key for JWT |
| `PORT` | Server port (default: 5000) |

## 🎯 Future Improvements

- [ ] Task categories/tags
- [ ] Task search and filter
- [ ] Email notifications
- [ ] Dark mode
- [ ] Task attachments
- [ ] Team collaboration
- [ ] Activity history

## 👨‍💻 Author

**Your Name**
- GitHub: LearningNerdGirl(https://github.com/LearningNerdGirl)
- Email: theresialiem88@gmail.com
## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Bootstrap team for the amazing UI framework
- Chart.js for beautiful charts
- SortableJS for drag-and-drop functionality

---

⭐ Star this repo if you find it helpful!
