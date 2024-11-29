# Virtual Programming Platform

## Overview
The Virtual Programming Platform is a secure and efficient online environment designed for conducting programming exams and assignments. It offers features tailored to professors and students, replacing traditional platforms like Moodle.

## Features

### For Professors (Authors)
- **Course Management**: Create and manage courses.
- **Assignment Creation**: 
  - Add programming assignments with:
    - Assignment name
    - Start and end time
    - Questions with C code and test cases.
    - Store file paths for question-related test case files (CSV) and correct code files (C format).
- **Automatic Grading**: Submissions are automatically evaluated.

### For Students
- **Assignment Portal**: 
  - View available assignments and attempt them.
  - Submit solutions via a secure code editor with anti-cheating measures.
- **Grading and Feedback**: Immediate feedback on submissions.

## System Highlights
- **Secure Exam Environment**: 
  - Anti-cheating mechanisms.
  - Offline capability for uninterrupted access.
- **Code Evaluation**: 
  - Powered by a locally deployed Judge0 instance.
  - Concurrency mechanisms for handling multiple submissions efficiently.

## Tech Stack
- **Backend**: Golang with Chi Router
- **Frontend**: React.js
- **Database**: PostgreSQL
- **Code Evaluation**: Judge0 (locally deployed)
- **Authentication**: JWT with HTTP cookies
