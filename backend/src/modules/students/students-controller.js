const asyncHandler = require("express-async-handler");
const { getAllStudents, addNewStudent, getStudentDetail, setStudentStatus, updateStudent } = require("./students-service");

const handleGetAllStudents = asyncHandler(async (req, res) => {
    const students = await getAllStudents(req.query); // User req.query to filter
    res.status(200).json(students);
});

const handleAddStudent = asyncHandler(async (req, res) => {
    const result = await addNewStudent(req.body);
    res.status(201).json(result); // Sends a message text
});


const handleUpdateStudent = asyncHandler(async (req, res) => {
    const result = await updateStudent({ id: req.params.id, ...req.body });
    res.status(200).json(result); 
});


const handleGetStudentDetail = asyncHandler(async (req, res) => {
    const student = await getStudentDetail(req.params.id);
    res.status(200).json(student); // Returns student data
});


const handleStudentStatus = asyncHandler(async (req, res) => {
    const result = await setStudentStatus({
        userId: req.params.id,
        reviewerId: req.user.id, 
        status: req.body.status
    });
    res.status(200).json(result); 
});

module.exports = {
    handleGetAllStudents,
    handleGetStudentDetail,
    handleAddStudent,
    handleStudentStatus,
    handleUpdateStudent,
};
