<div align="center">
  <h1>FixMyResume</h1>
  <img src="https://socialify.git.ci/Swayam26262/FixMyResume/image?custom_description=An+AI-powered+tool+that+analyzes+resumes+against+job+descriptions%2C+providing+compatibility+scores+and+optimization+tips+to+help+job+seekers+beat+ATS+systems+and+land+more+interviews.&custom_language=Python&description=1&font=Raleway&language=1&name=1&owner=1&pattern=Charlie+Brown&theme=Dark" alt="FixMyResume Socialify" width="600" />
</div>

## ✨ Features

- **AI-Powered Analysis**: Get real-time feedback on your resume's strengths and weaknesses.
- **Job Description Matching**: See how well your resume aligns with job descriptions.
- **Beautiful Templates**: Choose from a variety of modern, professional templates.
- **Secure & Private**: Your data is encrypted and never shared with third parties.
- **User-Friendly**: Intuitive interface designed for a seamless experience.

---

## 🛠️ Tech Stack

### Backend
- **Django**: Robust, scalable, and secure.
- **Django REST Framework**: Powerful API development.
- **PostgreSQL**: Reliable and performant database.
- **JWT Authentication**: Secure user management.

### Frontend
- **React**: Modern, fast, and responsive UI.
- **Tailwind CSS**: Sleek, customizable design.
- **Vite**: Lightning-fast development and building.

---

## 🚀 Getting Started

### Prerequisites
- Python 3.8+
- Node.js 14+
- PostgreSQL

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/swayam26262/FixMyResume.git
   cd FixMyResume
   ```

2. **Backend Setup**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   python manage.py migrate
   python manage.py runserver
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Environment Variables**
   Create a `.env` file in the `backend` directory with the following variables:
   ```
   SECRET_KEY=your_secret_key
   DATABASE_URL=your_database_url
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_HOST_USER=your_email@gmail.com
   EMAIL_HOST_PASSWORD=your_app_specific_password
   EMAIL_FROM=your_email@gmail.com
   ```

---

## 📝 Usage

1. **Register**: Create an account and verify your email.
2. **Upload Resume**: Upload your resume in PDF or DOCX format.
3. **Analyze**: Get AI-powered insights and recommendations.
4. **Optimize**: Apply suggestions to improve your resume.
5. **Download**: Export your optimized resume in your preferred format.

---

## 🔒 Security

- **Encryption**: All data is encrypted in transit and at rest.
- **Privacy**: Your resume and personal information are never shared with third parties.
- **Compliance**: Adheres to GDPR and other privacy regulations.

---

## 🌟 Contributing

We welcome contributions! Here are some guidelines to get started:

- Fork the repository and create your feature branch (`git checkout -b feature/amazing-feature`).
- Commit your changes (`git commit -m 'Add some amazing feature'`).
- Push to the branch (`git push origin feature/amazing-feature`).
- Open a Pull Request.

Please ensure your code adheres to our coding standards and includes tests where applicable.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <p>Made with ❤️ by Swayam</p>
  <p>© 2025 FixMyResume. All rights reserved.</p>
</div> 