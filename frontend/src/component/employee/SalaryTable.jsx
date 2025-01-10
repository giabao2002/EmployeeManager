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

class SalaryTable extends Component {
  state = {
    salaryData: [],
    loading: true,
    searchData: "",
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

        const dateOfJoining = new Date(this.salaryObj["DateOfJoining"]);
          const currentDate = new Date();
          const terminateDate = this.salaryObj["TerminateDate"]
            ? new Date(this.salaryObj["TerminateDate"])
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
              this.salaryObj["salary"][0]["ReceivingDate"]
            );

            const bonus = this.salaryObj['rewards'].reduce((total, reward) => {
              console.log('REWARD: ', reward)
              const rewardDate = new Date(reward.Date);
              if (
                rewardDate.getFullYear() === receivingDate.getFullYear() &&
                rewardDate.getMonth() === receivingDate.getMonth()
              ) {
                if(reward.Type == 1){
                  return total + reward.Amount;
                } else {
                  return total - reward.Amount;
                }
              }
              return total;
            }, 0);

            let temp = {
              EmployeeCode: this.salaryObj["EmployeeCode"] ? this.salaryObj["EmployeeCode"] : "N/A",
              EmployeeName:
                (this.salaryObj["LastName"] ? this.salaryObj["LastName"] : "") +
                " " +
                (this.salaryObj["MiddleName"] ? this.salaryObj["MiddleName"] : "") +
                " " +
                (this.salaryObj["FirstName"] ? this.salaryObj["FirstName"] : ""),
              BasicSalary:
                this.salaryObj["salary"] &&
                this.salaryObj["salary"][0] &&
                this.salaryObj["salary"][0]["BasicSalary"]
                  ? this.salaryObj["salary"][0]["BasicSalary"]
                  : "N/A",
              BankName:
                this.salaryObj["salary"] &&
                this.salaryObj["salary"][0] &&
                this.salaryObj["salary"][0]["BankName"]
                  ? this.salaryObj["salary"][0]["BankName"]
                  : "N/A",
              AccountNo:
                this.salaryObj["salary"] &&
                this.salaryObj["salary"][0] &&
                this.salaryObj["salary"][0]["AccountNo"]
                  ? this.salaryObj["salary"][0]["AccountNo"]
                  : "N/A",
              AccountHolderName:
                this.salaryObj["salary"] &&
                this.salaryObj["salary"][0] &&
                this.salaryObj["salary"][0]["AccountHolderName"]
                  ? this.salaryObj["salary"][0]["AccountHolderName"]
                  : "N/A",
              IFSCcode:
                this.salaryObj["salary"] &&
                this.salaryObj["salary"][0] &&
                this.salaryObj["salary"][0]["IFSCcode"]
                  ? this.salaryObj["salary"][0]["IFSCcode"]
                  : "N/A",
              TaxDeduction:
                this.salaryObj["salary"] &&
                this.salaryObj["salary"][0] &&
                this.salaryObj["salary"][0]["TaxDeduction"]
                  ? this.salaryObj["salary"][0]["TaxDeduction"]
                  : "N/A",

              FinalSalary:
                this.salaryObj["salary"][0]["BasicSalary"] -
                (this.salaryObj["salary"][0]["BasicSalary"] * this.salaryObj["salary"][0]["TaxDeduction"] / 100) +
                bonus,
              ReceivingDate: receivingDate.toLocaleDateString("en-GB"),
            };
            this.rowDataT.push(temp);
          }
        // ...existing code...
        this.setState({ rowData: this.rowDataT });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  componentDidMount() {
    this.loadSalaryData();
  }

  render() {
    console.log("data", this.state.salaryData);
    return (
      <div id="table-outer-div-scroll">
        <h2 id="role-title">Thông tin lương</h2>
        <div id="search-bar" className="d-flex align-items-center">
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

export default SalaryTable;
