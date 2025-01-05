import React, { Component } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faTrash,
  faEdit,
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

class Statistics extends Component {
  state = {
    salaryData: [],
    loading: true,
    searchMonthData: "",
    searchYearData: "",
    columnDefs: [
      {
        headerName: "Lương cơ bản",
        field: "BasicSalary",
        sortable: true,
        type: "numberColumn",
        filter: "agNumberColumnFilter",
      },
      {
        headerName: "Thuế khấu trừ",
        field: "TaxDeduction",
        sortable: true,
      },
      {
        headerName: "Lương tổng kết",
        field: "FinalSalary",
        sortable: true,
        type: "numberColumn",
        filter: "agNumberColumnFilter",
      },
      {
        headerName: "Tên ngân hàng",
        field: "BankName",
        sortable: true,
      },
      {
        headerName: "Số tài khoản",
        field: "AccountNo",
        sortable: true,
      },

      {
        headerName: "Tên chủ tài khoản",
        field: "AccountHolderName",
        sortable: true,
      },
      {
        headerName: "Mã SWIFT",
        field: "IFSCcode",
        sortable: true,
      },
      {
        headerName: "Ngày nhận lương",
        field: "ReceivingDate",
        sortable: true,
      },
    ],
    rowData: [],
    defaultColDef: {
      resizable: true,
      width: 200,
      filter: "agTextColumnFilter",
    },
    getRowHeight: function (params) {
      return 35;
    },
  };
  salaryObj = [];
  rowDataT = [];

  loadSalaryData = () => {
    this.setState({ searchMonthData: "", searchYearData: "" });
    axios
      .get(
        process.env.REACT_APP_API_URL +
          "/api/employee-salary/" +
          this.props.data["_id"],
        {
          headers: {
            authorization: localStorage.getItem("token") || "",
          },
        }
      )
      .then((response) => {
        this.salaryObj = response.data;
        console.log("response", response.data);
        this.setState({ salaryData: response.data });
        this.setState({ loading: false });
        this.rowDataT = [];

        // ...existing code...
        this.salaryObj.map((data) => {
          const dateOfJoining = new Date(data["DateOfJoining"]);
          const currentDate = new Date();
          const terminateDate = data["TerminateDate"]
            ? new Date(data["TerminateDate"])
            : null;
          const endDate =
            terminateDate && terminateDate < currentDate
              ? terminateDate
              : currentDate;
          const monthsDifference =
            (endDate.getFullYear() - dateOfJoining.getFullYear()) * 12 +
            (endDate.getMonth() - dateOfJoining.getMonth());

          for (let i = 0; i <= monthsDifference; i++) {
            const receivingDate = new Date(
              dateOfJoining.getFullYear(),
              dateOfJoining.getMonth() + i,
              data["salary"][0]["ReceivingDate"]
            );

            if (receivingDate <= currentDate) {
              let temp = {
                data,
                EmployeeCode: data["EmployeeCode"] ? data["EmployeeCode"] : "N/A",
                EmployeeName:
                  (data["LastName"] ? data["LastName"] : "") +
                  " " +
                  (data["MiddleName"] ? data["MiddleName"] : "") +
                  " " +
                  (data["FirstName"] ? data["FirstName"] : ""),
                BasicSalary:
                  data["salary"] &&
                  data["salary"][0] &&
                  data["salary"][0]["BasicSalary"]
                    ? data["salary"][0]["BasicSalary"]
                    : "N/A",
                BankName:
                  data["salary"] &&
                  data["salary"][0] &&
                  data["salary"][0]["BankName"]
                    ? data["salary"][0]["BankName"]
                    : "N/A",
                AccountNo:
                  data["salary"] &&
                  data["salary"][0] &&
                  data["salary"][0]["AccountNo"]
                    ? data["salary"][0]["AccountNo"]
                    : "N/A",
                AccountHolderName:
                  data["salary"] &&
                  data["salary"][0] &&
                  data["salary"][0]["AccountHolderName"]
                    ? data["salary"][0]["AccountHolderName"]
                    : "N/A",
                IFSCcode:
                  data["salary"] &&
                  data["salary"][0] &&
                  data["salary"][0]["IFSCcode"]
                    ? data["salary"][0]["IFSCcode"]
                    : "N/A",
                TaxDeduction:
                  data["salary"] &&
                  data["salary"][0] &&
                  data["salary"][0]["TaxDeduction"]
                    ? data["salary"][0]["TaxDeduction"]
                    : "N/A",

                FinalSalary:
                  data["salary"][0]["AmountOfViolation"] &&
                  data["salary"][0]["AmountOfViolation"] > 0
                    ? data["salary"][0]["BasicSalary"] -
                      data["salary"][0]["AmountOfViolation"] -
                      data["salary"][0]["TaxDeduction"]
                    : data["salary"][0]["BasicSalary"] -
                      data["salary"][0]["TaxDeduction"],
                ReceivingDate: receivingDate.toLocaleDateString("en-GB"),
              };
              this.rowDataT.push(temp);
            }
          }
        });
        // ...existing code...
        this.setState({ rowData: this.rowDataT });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  handleSearchChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  searchSalaryData = () => {
    const { searchMonthData, searchYearData } = this.state;
    if (!searchYearData && !searchMonthData) {
      Swal.fire("Cảnh báo", "Nhập thông tin tìm kiếm", "warning");
      return;
    }

    const url = `${process.env.REACT_APP_API_URL}/api/employee-salary/${this.props.data["_id"]}/${searchYearData}/${searchMonthData}`;

    axios
      .get(url, {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      })
      .then((response) => {
        this.setState({ salaryData: response.data });
        this.setState({ loading: false });
        this.rowDataT = [];

        // ...existing code...
        const data = response.data;
        const dateOfJoining = new Date(data.DateOfJoining);
        const terminateDate = data.TerminateDate ? new Date(data.TerminateDate) : new Date();
        const currentDate = new Date();

        const searchDate = new Date(searchYearData, searchMonthData ? searchMonthData  : 0);
        console.log("searchDate", searchDate);

        if (searchDate < dateOfJoining || searchDate > terminateDate || searchDate > currentDate) {
          Swal.fire("Lỗi", "Thời gian không hợp lệ", "error");
          return;
        }

        let temp = {
          EmployeeName: data.EmployeeName,
          BasicSalary: data.BasicSalary,
          TaxDeduction: data.TaxDeduction,
          FinalSalary: data.FinalSalary,
          Month: data.Month,
          Year: data.Year,
          BankName: data.BankName,
          AccountNo: data.AccountNo,
          AccountHolderName: data.AccountHolderName,
          IFSCcode: data.IFSCcode,
          ReceivingDate: `${data.ReceivingDate}/${data.Month}/${data.Year}`,
        };
        this.rowDataT.push(temp);
        // ...existing code...

        this.setState({ rowData: this.rowDataT });
      })
      .catch((error) => {
        console.log(error);
        Swal.fire("Error", "Failed to fetch salary data", "error");
      });
  };

  componentDidMount() {
    this.loadSalaryData();
  }

  render() {
    return (
      <div id="table-outer-div-scroll">
        <h2 id="role-title">Chi tiết lương</h2>
        <div id="search-bar" className="d-flex align-items-center">
          <input
            type="text"
            placeholder="Tháng"
            value={this.state.searchMonthData}
            name="searchMonthData"
            className="search-input"
            style={{ height: "38px" }}
            onChange={this.handleSearchChange.bind(this)}
          />
          <input
            type="text"
            placeholder="Năm"
            value={this.state.searchYearData}
            name="searchYearData"
            className="search-input"
            style={{ height: "38px", marginLeft: "10px" }}
            onChange={this.handleSearchChange.bind(this)}
          />
          <Button
            variant="primary"
            id="search-button"
            className="ml-2"
            onClick={this.searchSalaryData.bind(this)}
          >
            <FontAwesomeIcon icon={faSearch} id="search-icon" />
          </Button>
          <Button
            variant="primary"
            id="reload-button"
            className="ml-2"
            onClick={this.loadSalaryData.bind(this)}
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

export default Statistics;
