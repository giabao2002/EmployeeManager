const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Employee } = require('../Models/Employee');
require('dotenv').config();

// Thêm các options cho MongoDB
mongoose.connect(process.env.DATABASEURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
.then(() => console.log('Connected to MongoDB for seeding'))
.catch(err => console.error('Could not connect to MongoDB:', err));

const createEmployees = async () => {
  try {
    // Kiểm tra xem có employee nào chưa
    const existingBoss = await Employee.findOne({ Email: "boss@gmail.com" });
    if (existingBoss) {
      console.log('Employees already exist, skipping seeding');
      process.exit();
      return;
    }

    const employees = [
      {
        FirstName: "A",
        MiddleName: "Văn",
        LastName: "Nguyễn",
        Email: "boss@gmail.com",
        Password: "123123",
        Gender: "Nam",
        DOB: new Date("1990-01-01"),
        DateOfJoining: new Date(),
        ContactNo: "0123456789",
        EmployeeCode: "BOSS001",
        Account: 1,
        Status: "Active",
        EmergencyContactNo: "0123456789",
        PANcardNo: "123456789",
        Hobbies: "Không có",
        PresentAddress: "Hà Nội",
        PermanentAddress: "Hà Nội",
        Photo:""
      },
      {
        FirstName: "B",
        MiddleName: "Văn",
        LastName: "Nguyễn",
        Email: "quanly@gmail.com",
        Password: "123123",
        Gender: "Nam",
        DOB: new Date("1992-01-01"),
        DateOfJoining: new Date(),
        ContactNo: "0123456788",
        EmployeeCode: "QLNS001",
        Account: 2,
        Status: "Active",
        EmergencyContactNo: "0123456789",
        PANcardNo: "123456789",
        Hobbies: "Không có",
        PresentAddress: "Hà Nội",
        PermanentAddress: "Hà Nội",
        Photo:""
      },
      {
        FirstName: "C",
        MiddleName: "Văn",
        LastName: "Nguyễn",
        Email: "employee@gmail.com",
        Password: "123123",
        Gender: "Nam",
        DOB: new Date("1995-01-01"),
        DateOfJoining: new Date(),
        ContactNo: "0123456787",
        EmployeeCode: "EMP001",
        Account: 3,
        Status: "Active",
        EmergencyContactNo: "0123456789",
        PANcardNo: "123456789",
        Hobbies: "Không có",
        PresentAddress: "Hà Nội",
        PermanentAddress: "Hà Nội",
        Photo:""
      },
    ];

    // Tạo các employee mới
    await Employee.create(employees);

  } catch (error) {
    console.error('Error seeding employees:', error);
  } finally {
    process.exit();
  }
};

createEmployees();

//cd backend
//node src/Seeder/employeeSeeder.js