const {
  Employee,
  EmployeeValidation,
  EmployeeValidationUpdate,
} = require("../Models/Employee");
const Joi = require("joi");

exports.getAllEmployees = (req, res) => {
  Employee.find()
    .populate({
      path: "role",
      select: "RoleName",
    })
    .populate({
      path: "department",
      select: "DepartmentName",
    })
    .select("-salary -education -familyInfo -workExperience -Password")
    .exec(function (err, employees) {
      if (err) {
        return res.status(500).send(err);
      }
      res.send(employees);
    });
};

exports.createEmployee = (req, res) => {
  Joi.validate(req.body, EmployeeValidation, async (err, result) => {
    if (err) {
      console.log(err);
      return res.status(400).send(err.details[0].message);
    }

    try {
      const existingEmployee = await Employee.findOne({
        EmployeeCode: req.body.EmployeeCode,
      });
      if (existingEmployee) {
        return res
          .status(400)
          .send({ type: "EmployeeCode", message: "Mã nhân viên đã tồn tại" });
      }

      const existingEmail = await Employee.findOne({
        Email: req.body.Email,
      });
      if (existingEmail) {
        return res
          .status(400)
          .send({ type: "Email", message: "Email đã tồn tại" });
      }

      const newEmployee = {
        Email: req.body.Email,
        Password: req.body.Password,
        role: req.body.RoleID,
        Account: req.body.Account,
        Gender: req.body.Gender,
        FirstName: req.body.FirstName,
        MiddleName: req.body.MiddleName,
        LastName: req.body.LastName,
        DOB: req.body.DOB,
        ContactNo: req.body.ContactNo,
        EmployeeCode: req.body.EmployeeCode,
        department: req.body.DepartmentID,
        DateOfJoining: req.body.DateOfJoining,
        TerminateDate: req.body.TerminateDate,
      };

      const employee = await Employee.create(newEmployee);
      res.send(employee);
    } catch (err) {
      console.log(err);
      res.status(500).send("Lỗi tạo nhân viên");
    }
  });
};

exports.updateEmployee = (req, res) => {
  Joi.validate(req.body, EmployeeValidationUpdate, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send(err.details[0].message);
    } else {
      let newEmployee = {
        Email: req.body.Email,
        Account: req.body.Account,
        role: req.body.RoleID,
        Gender: req.body.Gender,
        FirstName: req.body.FirstName,
        MiddleName: req.body.MiddleName,
        LastName: req.body.LastName,
        DOB: req.body.DOB,
        ContactNo: req.body.ContactNo,
        EmployeeCode: req.body.EmployeeCode,
        department: req.body.DepartmentID,
        DateOfJoining: req.body.DateOfJoining,
        TerminateDate: req.body.TerminateDate,
      };

      Employee.findByIdAndUpdate(
        req.params.id,
        newEmployee,
        function (err, employee) {
          if (err) {
            res.send("Error");
          } else {
            res.send(newEmployee);
          }
        }
      );
    }
  });
};

exports.updateEmployeeStatus = (req, res) => {
  const { Status } = req.body;
  if (!["Active", "Inactive"].includes(Status)) {
    return res.status(400).send("Không tồn tại giá trạng thái");
  }

  Employee.findByIdAndUpdate(
    req.params.id,
    { Status },
    { new: true },
    (err, employee) => {
      if (err) {
        return res.status(500).send("Lỗi cập nhật trạng thái nhân viên");
      }
      if (!employee) {
        return res.status(404).send("Không tìm thấy nhân viên");
      }
      res.send(employee);
    }
  );
};

exports.deleteEmployee = (req, res) => {
  const employeeId = req.params.id;

  Employee.findByIdAndDelete(employeeId, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Lỗi xóa nhân viên");
    }

    if (!result) {
      return res.status(404).send("Không tìm thấy nhân viên");
    }

    console.log(`Deleted employee with ID: ${employeeId}`);
    res.status(200).send("Xóa thành công");
  });
};

exports.searchEmployees = (req, res) => {
  const data = req.body.searchData;
  const type = req.body.searchType;

  if (type === "Department") {
    Employee.find()
      .populate({
        path: "department",
        select: "DepartmentName",
      })
      .populate({
        path: "role",
        select: "RoleName",
      })
      .exec(function (err, employees) {
        if (err) {
          return res.status(500).send(err);
        }
        let filteredEmployees = employees.filter((employee) => {
          if (!employee.department[0]) {
            return false;
          }
          const departmentName = employee.department[0]["DepartmentName"];
          return (
            typeof departmentName === "string" &&
            departmentName
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .toLowerCase()
              .includes(data)
          );
        });
        res.send(filteredEmployees);
      });
  } else {
    Employee.find()
      .populate({
        path: "department",
        select: "DepartmentName",
      })
      .populate({
        path: "role",
        select: "RoleName",
      })
      .exec((err, employees) => {
        if (err) {
          console.error(err);
          return res
            .status(500)
            .send("Error occurred while searching for employees");
        }

        let filteredEmployees = employees.filter((employee) => {
          const fieldValue = employee[type];
          return (
            typeof fieldValue === "string" &&
            fieldValue
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .toLowerCase()
              .includes(data)
          );
        });

        if (filteredEmployees.length === 0) {
          return res.status(404).send("No employees found");
        }

        res.status(200).json(filteredEmployees);
      });
  }
};
