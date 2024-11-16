import React, { useState, useRef, useEffect } from "react";
import { Editor } from "@monaco-editor/react";
import { BookOpen, AlertCircle } from "lucide-react"; // Added icons
import Modal from "./_modal.jsx";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditorWindow = () => {
  const { testId, courseCode, assignment } = useParams(); // Get additional params
  const navigate = useNavigate(); // Hook for navigation
  const [activity, setActivity] = useState("");
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");
  const [questionText, setQuestionText] = useState("Loading question...");
  const editorRef = useRef(null);

  // Fetch question text
  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BE_URL}/getQuestion/${testId}`
        );
        if (response.data.success) {
          setQuestionText(response.data.questionText || "Question not found.");
        } else {
          setQuestionText("Failed to load question.");
        }
      } catch (error) {
        console.error("Error fetching question text:", error);
        setQuestionText("Error fetching question text.");
      }
    };
    fetchQuestion();
  }, [testId]);

  // Load saved code from localStorage
  useEffect(() => {
    const editorId = testId + "_code";
    const tempCode = localStorage.getItem(editorId) || "";
    const time = tempCode.split("|||")[0];
    if (time < new Date().getTime()) {
      return;
    }
    setCode(tempCode.split("|||")[1]);
  }, [testId]);

  const options = {
    selectOnLineNumbers: true,
    mouseWheelZoom: true,
    fontSize: 18,
    contextmenu: false,
    formatOnType: true,
    smoothScrolling: true,
    wordWrap: "on",
    minimap: { enabled: true },
    scrollBeyondLastLine: false,
    renderLineHighlight: "all",
    parameterHints: { enabled: true },
    lineHeight: 24,
  };

  const onMount = (editor, monaco) => {
    editorRef.current = editor;
    editor.focus();

    editor.onKeyDown((event) => {
      const { keyCode, ctrlKey, metaKey } = event;
      if ((keyCode === 33 || keyCode === 52) && (metaKey || ctrlKey)) {
        event.preventDefault();
        setActivity("copypaste");
      }
    });
  };

  // Handle submit
  const handleSubmit = async () => {
    try {
      const file = new Blob([code], { type: "text/plain" });
      const formData = new FormData();
      formData.append("codeFile", file, `${testId}.c`);

      const response = await axios.post(
        `${import.meta.env.VITE_BE_URL}/submitCode/${testId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data.success) {
        alert("Code submitted successfully!");
        navigate(`/enrolled/${courseCode}/${assignment}`); // Redirect after success
      } else {
        alert("Failed to submit code.");
      }
    } catch (error) {
      console.error("Error submitting code:", error);
      alert("Error submitting code. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-300">
      <div className="max-w-screen-2xl mx-auto px-4">
        {/* Header Section */}
        <div className="py-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <BookOpen className="h-6 w-6 text-indigo-400 animate-pulse" />
              <h1 className="text-2xl font-bold text-white">{questionText}</h1>
            </div>
          </div>
        </div>

        {/* Editor Section */}
        <div className="mt-6">
          <div className="rounded-lg overflow-hidden border border-gray-700 shadow-lg bg-gray-800 transition hover:shadow-xl">
            <Editor
              height="70vh"
              theme="vs-dark"
              language="c"
              options={options}
              defaultValue="// Write your code here..."
              onMount={onMount}
              value={code}
              onChange={(value) => {
                const time = new Date().getTime() + 300000;
                localStorage.setItem(testId + "_code", time + "|||" + value);
                setCode(value);
              }}
              className="w-full"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6 text-right">
          <button
            className="inline-flex items-center px-6 py-3 bg-purple-600 text-white text-base font-medium rounded-md shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition"
            onClick={handleSubmit}
          >
            Submit Code
          </button>
        </div>

        <Modal activity={activity} open={open} onClose={() => setOpen(false)} />
      </div>
    </div>
  );
};

export default EditorWindow;