import React, { useState, useEffect } from "react";
import { ArrowUpDown, Loader2, ChevronDown, ChevronUp } from "lucide-react";
import Header from "./header";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

const Submission = () => {
  const [students, setStudents] = useState([]);
  const [cookie] = useCookies(["accessToken"]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: "rollId",
    direction: "asc",
  });
  const { assignmentId } = useParams();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
            `${import.meta.env.VITE_BE_URL}/verified/author/viewStudentSubmission/${assignmentId}`,
            {
              headers: {
                Authorization: `Bearer ${cookie.accessToken}`,
              },
              withCredentials: true,
            }
        );
        console.log(response.data);
        setStudents(response.data.subDetails || []); // Assuming response contains subDetails array
        setError(null);
      } catch (err) {
        setError("Failed to fetch student list. Please try again later.");
        console.error("Error fetching students:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [assignmentId, cookie.accessToken]);

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction:
          sortConfig.key === key && sortConfig.direction === "asc"
              ? "desc"
              : "asc",
    });
  };

  const sortedStudents = [...students].sort((a, b) => {
    if (sortConfig.direction === "asc") {
      return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
    }
    return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
  });

  const fetchStudentDetails = async (studentId) => {
    setSelectedStudent(null);
    setLoading(true);
    try {
      // Simulated student details data
      const mockDetails = {
        id: studentId,
        rollId: `12${studentId}`,
        name: `Student ${studentId}`,
        totalMarks: Math.floor(Math.random() * 101),
        submissionDate: new Date().toISOString(),
      };

      setSelectedStudent(mockDetails);
    } catch (err) {
      console.error("Error fetching student details:", err);
      setError("Failed to fetch student details.");
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-blue-50">
        {/* Shared Header */}
        <Header />
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
          <main className="container mx-auto px-4 py-8">
            {/* Header Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Student Submissions
              </h1>
              <p className="text-gray-600">
                Click on a student to view their details
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Student List */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="bg-gray-50 px-6 py-4">
                  <h2 className="text-lg font-semibold text-gray-700">
                    Student List
                  </h2>
                </div>
                <div className="overflow-y-auto max-h-[400px] divide-y divide-gray-200">
                  {loading ? (
                      <div className="px-6 py-16 text-center">
                        <Loader2 className="animate-spin" size={20} />
                        <span className="text-gray-500 ml-2">
                      Loading students...
                    </span>
                      </div>
                  ) : error ? (
                      <div className="px-6 py-16 text-center text-red-500">
                        {error}
                      </div>
                  ) : students.length === 0 ? (
                      <div className="px-6 py-16 text-center text-gray-500">
                        No student submissions available.
                      </div>
                  ) : (
                      sortedStudents.map((student) => (
                          <div
                              key={student.rollNumber}
                              className="px-6 py-4 cursor-pointer hover:bg-gray-50 transition-colors duration-150"
                              onClick={() => fetchStudentDetails(student.rollNumber)}
                          >
                            <div className="flex justify-between items-center">
                              <div className="text-gray-800 font-medium">
                                {student.username}
                              </div>
                              <ChevronDown size={20} className="text-gray-400" />
                            </div>
                            <div className="text-sm text-gray-500">
                              Roll ID: {student.rollNumber}
                            </div>
                          </div>
                      ))
                  )}
                </div>
              </div>

              {/* Student Details */}
              <div className="bg-white rounded-lg shadow-sm">
                <div className="bg-gray-50 px-6 py-4">
                  <h2 className="text-lg font-semibold text-gray-700">
                    Student Details
                  </h2>
                </div>
                <div className="px-6 py-4">
                  {loading && selectedStudent === null ? (
                      <div className="text-center">
                        <Loader2 className="animate-spin" size={20} />
                        <span className="text-gray-500 ml-2">
                      Loading details...
                    </span>
                      </div>
                  ) : selectedStudent ? (
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-4">
                          {selectedStudent.name}
                        </h3>
                        <p className="text-gray-700">
                          <span className="font-semibold">Roll ID:</span>{" "}
                          {selectedStudent.rollId}
                        </p>
                        <p className="text-gray-700">
                          <span className="font-semibold">Total Marks:</span>{" "}
                          {selectedStudent.totalMarks}
                        </p>
                        <p className="text-gray-700">
                          <span className="font-semibold">Submission Date:</span>{" "}
                          {new Date(
                              selectedStudent.submissionDate
                          ).toLocaleString()}
                        </p>
                      </div>
                  ) : (
                      <div className="text-center text-gray-500">
                        Select a student to view details
                      </div>
                  )}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
  );
};

export default Submission;
