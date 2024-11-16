package database

import (
	"DesignProjectBackend/models/RecievedData"
	"DesignProjectBackend/models/SentData"
)

type DatabaseRepo interface {
	SignUpUser(user RecievedData.User) error
	InsertOtp(otp int, email string) error
	VerifyOTP(data RecievedData.OtpDetails) (bool, error)
	MarkUserVerified(data RecievedData.OtpDetails) error
	DeleteOTP(data RecievedData.OtpDetails) error
	Login(email, password string) (string, bool, error)
	GetAllCoursesForStudent(name string) ([]SentData.CourseData, error)
	Get3RecentAssignments(name string) ([]SentData.AssignmentData, error)
	GetRoleFromUserName(name string) (string, error)
	GetAllCoursesForAuthor(name string) ([]SentData.CourseData, error)
	AddCourse(username, courseCode, courseName, batchYear, branch string) error
	GetAssignmentsForCourse(courseCode string) ([]SentData.AssignmentData, error)
	AddAssignment(assignment RecievedData.Assignment) error
	GetAllQuestionsForAssignment(assignmentId string) ([]SentData.Question, error)
}
