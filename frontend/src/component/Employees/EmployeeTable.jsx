import React, { Component } from "react";
import "./EmployeeTable.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faLock,
  faEdit,
  faInfoCircle,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { RingLoader } from "react-spinners";
import { css } from "@emotion/core";
import { Button } from "react-bootstrap";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import Swal from "sweetalert2";

const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 45px;
  border-color: red;
`;

class AdminEmployeeTable extends Component {
  state = {
    employeeData: [],
    loading: true,
    searchData: "",
    searchType: "EmployeeCode",
    columnDefs: [
      {
        headerName: "Mã nhân viên",
        field: "EmployeeCode",
        sortable: true,
        width: 140,
      },
      {
        headerName: "Email",
        field: "Email",
        sortable: true,
        width: 150,
      },
      {
        headerName: "Tài khoản truy cập",
        field: "Account",
        sortable: true,
      },
      {
        headerName: "Tên",
        field: "FirstName",
        sortable: true,
        width: 110,
      },
      {
        headerName: "Tên đệm",
        field: "MiddleName",
        sortable: true,
        width: 130,
      },
      {
        headerName: "Họ",
        field: "LastName",
        sortable: true,
        width: 110,
      },
      {
        headerName: "Ngày sinh",
        field: "DOB",
        sortable: true,
        filter: true,
        type: ["dateColumn"],
        filter: "agDateColumnFilter",
      },
      {
        headerName: "Liên lạc",
        field: "ContactNo",
        sortable: true,
        width: 117,
      },
      {
        headerName: "Chức vụ",
        field: "RoleName",
        sortable: true,
        width: 120,
      },
      {
        headerName: "Phòng ban",
        field: "DepartmentName",
        sortable: true,
        width: 120,
      },
      {
        headerName: "Ngày tham gia",
        field: "DateOfJoining",
        sortable: true,
        width: 120,
      },
      {
        headerName: "Trạng thái",
        field: "Status",
        sortable: true,
        width: 120,
        cellRendererFramework: (params) => {
          if (params.data.data.Status === "Active") {
            return "Đang làm việc";
          } else {
            return "Đã nghỉ việc";
          }
        },
      },
      {
        headerName: "",
        field: "info",
        filter: false,
        width: 30,
        cellRendererFramework: this.renderInfoButton.bind(this),
      },
      {
        headerName: "",
        field: "edit",
        filter: false,
        width: 30,
        cellRendererFramework: this.renderEditButton.bind(this),
      },
      {
        headerName: "",
        field: "delete",
        filter: false,
        width: 30,
        cellRendererFramework: this.renderButton.bind(this),
      },
    ],
    rowData: [],
    defaultColDef: {
      resizable: true,
      width: 100,
      filter: "agTextColumnFilter",
    },
    getRowHeight: function (params) {
      return 35;
    },
  };
  employeeObj = [];
  rowDataT = [];

  loadEmployeeData = () => {
    axios
      .get(process.env.REACT_APP_API_URL + "/api/employee", {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      })
      .then((response) => {
        this.employeeObj = response.data;
        this.setState({ employeeData: response.data });
        this.setState({ loading: false });
        this.rowDataT = [];
        this.employeeObj.map((data) => {
          let temp = {
            data,
            Email: data["Email"],
            Password: data["Password"],
            Account:
              data["Account"] === 1
                ? "Giám đốc"
                : data["Account"] === 2
                ? "Quản lý nhân sự"
                : data["Account"] === 3
                ? "Nhân viên"
                : "",
            FirstName: data["FirstName"],
            MiddleName: data["MiddleName"],
            LastName: data["LastName"],
            DOB: data["DOB"].slice(0, 10),
            RoleName:
              data["role"] && data["role"].length > 0
                ? data["role"][0]["RoleName"]
                : "N/A",
            ContactNo: data["ContactNo"],
            EmployeeCode: data["EmployeeCode"],
            DepartmentName:
              data["department"] && data["department"].length > 0
                ? data["department"][0]["DepartmentName"]
                : "N/A",
            DateOfJoining: data["DateOfJoining"].slice(0, 10),
            Status: data["Status"],
          };
          // console.log(temp);
          this.rowDataT.push(temp);
        });
        this.setState({ rowData: this.rowDataT });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  onEmployeeDelete = (e,status) => {
    console.log("Delete: ", e);
    Swal.fire({
      title: "Bạn có chắc chắn không?",
      text: status === "Active" ? "Bạn chắc chắn muốn khóa tài khoản" : "Bạn chắc chắn muốn mở khóa tài khoản",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(
            process.env.REACT_APP_API_URL + "/api/employee/status/" + e,
            {
              Status: status === "Active" ? "Inactive" : "Active",
            },
            {
              headers: {
                authorization: localStorage.getItem("token") || "",
              },
            }
          )
          .then((res) => {
            this.componentDidMount();
          })
          .catch((err) => {
            Swal.fire({
              title: "Xảy ra lỗi",
              icon: "error",
              confirmButtonText: "OK",
            });
          });
      }
    });
  };
  componentDidMount() {
    this.loadEmployeeData();
  }
  handleClick = (e) => {
    console.log(e);
  };
  renderInfoButton(params) {
    return (
      <div>
        <FontAwesomeIcon
          icon={faInfoCircle}
          onClick={() => this.props.onEmpInfo(params.data.data)}
        />
      </div>
    );
  }
  renderButton(params) {
    if (params.data.data.Account === 3) {
      return (
        <FontAwesomeIcon
          icon={faLock}
          onClick={() =>
            this.onEmployeeDelete(
              params.data.data["_id"],
              params.data.data["Status"]
            )
          }
        />
      );
    } else {
      return <></>;
    }
  }
  renderEditButton(params) {
    // console.log('On Edit: ',params.data.data);
    return (
      <FontAwesomeIcon
        icon={faEdit}
        onClick={() => this.props.onEditEmployee(params.data.data)}
      />
    );
  }

  handleSearchChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  searchEmployee = () => {
    const normalizedSearchData = this.state.searchData
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

    axios
      .post(
        process.env.REACT_APP_API_URL + "/api/employee/search",
        {
          searchData: normalizedSearchData,
          searchType: this.state.searchType,
        },
        {
          headers: {
            authorization: localStorage.getItem("token") || "",
          },
        }
      )
      .then((response) => {
        this.employeeObj = response.data;
        console.log(response.data);
        this.setState({ employeeData: response.data });
        this.setState({ loading: false });
        this.setState({ searchData: "" });
        this.setState({ searchType: "EmployeeCode" });
        this.rowDataT = [];
        this.employeeObj.map((data) => {
          let temp = {
            data,
            Email: data["Email"],
            Password: data["Password"],
            Account:
              data["Account"] === 1
                ? "Giám đốc"
                : data["Account"] === 2
                ? "Quản lý nhân sự"
                : data["Account"] === 3
                ? "Nhân viên"
                : "",
            FirstName: data["FirstName"],
            MiddleName: data["MiddleName"],
            LastName: data["LastName"],
            DOB: data["DOB"].slice(0, 10),
            RoleName:
              data["role"] && data["role"].length > 0
                ? data["role"][0]["RoleName"]
                : "N/A",
            ContactNo: data["ContactNo"],
            EmployeeCode: data["EmployeeCode"],
            DepartmentName:
              data["department"] && data["department"].length > 0
                ? data["department"][0]["DepartmentName"]
                : "N/A",
            DateOfJoining: data["DateOfJoining"].slice(0, 10),
          };
          // console.log(temp);
          this.rowDataT.push(temp);
        });
        this.setState({ rowData: this.rowDataT });
      })
      .catch((error) => {
        Swal.fire({
          title: "Không tìm thấy",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };

  render() {
    // console.log(this.state.searchType + ": " + this.state.searchData);
    return (
      <div id="table-outer-div-scroll">
        <h2 id="role-title">Thông tin nhân viên</h2>
        <Button
          variant="primary"
          id="add-button"
          onClick={this.props.onAddEmployee}
        >
          <FontAwesomeIcon icon={faPlus} id="plus-icon" />
          Thêm
        </Button>
        <div id="search-bar" className="d-flex align-items-center">
          <input
            type="text"
            placeholder="Tìm kiếm nhân viên..."
            value={this.state.searchData}
            name="searchData"
            className="search-input"
            style={{ height: "38px" }}
            onChange={this.handleSearchChange.bind(this)}
          />
          <select
            name="searchType"
            class="form-select mx-2 p-2"
            onClick={this.handleSearchChange.bind(this)}
          >
            <option value="EmployeeCode" selected>
              Mã nhân viên
            </option>
            <option value="FirstName">Tên nhân viên</option>
            <option value="Department">Phòng ban</option>
          </select>
          <Button
            variant="primary"
            id="search-button"
            onClick={this.searchEmployee.bind(this)}
          >
            <FontAwesomeIcon icon={faSearch} id="search-icon" />
          </Button>
          <Button
            variant="primary"
            id="search-button-reload"
            className="ml-2"
            onClick={this.loadEmployeeData.bind(this)}
          >
            Tải lại
          </Button>
        </div>
        <div id="clear-both" />
        {!this.state.loading ? (
          <div id="table-div" className="ag-theme-balham">
            <AgGridReact
              columnDefs={this.state.columnDefs}
              defaultColDef={this.state.defaultColDef}
              columnTypes={this.state.columnTypes}
              rowData={this.state.rowData}
              pagination={true}
              paginationPageSize={10}
              getRowHeight={this.state.getRowHeight}
            />
          </div>
        ) : (
          <div id="loading-bar">
            <RingLoader
              css={override}
              sizeUnit={"px"}
              size={50}
              color={"#0000ff"}
              loading={true}
            />
          </div>
        )}
      </div>
    );
  }
}

export default AdminEmployeeTable;
