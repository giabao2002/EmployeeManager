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
        headerName: "Mã nhân viên",
        field: "EmployeeCode",
        sortable: true,
      },
      {
        headerName: "Tên nhân viên",
        field: "EmployeeName",
        sortable: true,
      },
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
      .get(process.env.REACT_APP_API_URL + "/api/salary", {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      })
      .then((response) => {
        this.salaryObj = response.data;
        console.log("response", response.data);
        this.setState({ salaryData: response.data });
        this.setState({ loading: false });
        this.rowDataT = [];

        this.salaryObj.map((data) => {
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
            ReceivingDate: data["salary"][0]["ReceivingDate"] + " hàng tháng",
          };
          this.rowDataT.push(temp);
        });
        this.setState({ rowData: this.rowDataT });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  onSalaryDelete = (e) => {
    console.log(e);
    Swal.fire({
      title: "Bạn chắc chắn muốn xóa?",
      text: "Bạn sẽ không thể khôi phục lại dữ liệu này!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(process.env.REACT_APP_API_URL + "/api/salary/" + e, {
            headers: {
              authorization: localStorage.getItem("token") || "",
            },
          })
          .then((res) => {
            this.componentDidMount();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };
  componentDidMount() {
    this.loadSalaryData();
  }
  renderButton(params) {
    console.log(params);
    return (
      <FontAwesomeIcon
        icon={faTrash}
        onClick={() => this.onSalaryDelete(params.data.data["_id"])}
      />
    );
  }
  renderEditButton(params) {
    console.log(params);
    return (
      <FontAwesomeIcon
        icon={faEdit}
        onClick={() => this.props.onEditSalary(params.data.data)}
      />
    );
  }

  handleSearchChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  searchSalaryData = () => {
    axios
      .get(
        process.env.REACT_APP_API_URL + "/api/salary/" + this.state.searchData,
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
        this.setState({ searchData: "" });
        this.setState({ loading: false });
        this.rowDataT = [];

        this.salaryObj.map((data) => {
          let temp = {
            data,
            EmployeeName:
              data["LastName"] +
              " " +
              data["MiddleName"] +
              " " +
              data["FirstName"],
            BasicSalary: data["salary"][0]["BasicSalary"],
            BankName: data["salary"][0]["BankName"],
            AccountNo: data["salary"][0]["AccountNo"],
            AccountHolderName: data["salary"][0]["AccountHolderName"],
            IFSCcode: data["salary"][0]["IFSCcode"],
            TaxDeduction: data["salary"][0]["TaxDeduction"],
            ReceivingDate: data["salary"][0]["ReceivingDate"],
          };
          this.rowDataT.push(temp);
        });
        this.setState({ rowData: this.rowDataT });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Lỗi",
          text: "Không tìm thấy nhân viên",
        });
      });
  };

  render() {
    return (
      <div id="table-outer-div-scroll">
        <h2 id="role-title">Chi tiết lương</h2>
        <Button
          variant="primary"
          id="add-button"
          onClick={this.props.onAddSalary}
        >
          <FontAwesomeIcon icon={faPlus} id="plus-icon" />
          Thêm
        </Button>
        <div id="search-bar" className="d-flex align-items-center">
          <input
            type="text"
            placeholder="Nhập mã nhân viên..."
            value={this.state.searchData}
            name="searchData"
            className="search-input"
            style={{ height: "38px" }}
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

export default SalaryTable;
