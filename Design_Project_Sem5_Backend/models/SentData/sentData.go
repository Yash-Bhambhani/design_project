package SentData

import "time"

type CourseData struct {
	CourseName string `json:"courseName"`
	CourseCode string `json:"courseCode"`
	CourseId   string `json:"courseId"`
	AuthorName string `json:"authorName"`
}
type AssignmentData struct {
	CourseName     string    `json:"courseName"`
	CourseCode     string    `json:"courseCode"`
	AssignmentName string    `json:"assignmentName"`
	AssignmentId   string    `json:"assignmentId"`
	StartTime      time.Time `json:"startTime"`
	EndTime        time.Time `json:"endTime"`
}
type Question struct {
	//AssignmentName string    `json:"assignmentName"`
	QuestionId   string `json:"questionId"`
	QuestionText string `json:"questionText"`
	MaxScore     int    `json:"maxScore"`
	//CodeFile      []byte    `json:"cfile"` // Stores the .c file content
	TestCasesFile []byte    `json:"csv"` // Stores the .csv file content
	CreatedAt     time.Time `json:"createdAt"`
}
