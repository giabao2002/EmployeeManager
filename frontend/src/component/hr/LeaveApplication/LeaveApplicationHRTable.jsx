import React, { Component } from "react";
import "./LeaveApplicationHRTable.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faSearch } from "@fortawesome/free-solid-svg-icons";
import { RingLoader } from "react-spinners";
import { css } from "@emotion/core";
import { Button, Dropdown } from "react-bootstrap";
import Swal from "sweetalert2";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 45px;
  border-color: red;
`;

class LeaveApplicationHRTable extends Component {
  state = {
    leaveApplicationHRData: [],
    loading: true,
    searchData: "",
    columnDefs: [
      {
        headerName: "Mã nhân viên",
        field: "EmployeeCode",
        sortable: true,
      },
      {
        headerName: "Tên",
        field: "Name",
        sortable: true,
      },
      {
        headerName: "Loại nghỉ phép",
        field: "Leavetype",
        sortable: true,
      },
      {
        headerName: "Ngày bắt đầu",
        field: "FromDate",
        sortable: true,
        filter: true,
        type: ["dateColumn"],
        filter: "agDateColumnFilter",
      },
      {
        headerName: "Đến ngày",
        field: "ToDate",
        sortable: true,
        filter: true,
        type: ["dateColumn"],
        filter: "agDateColumnFilter",
      },
      {
        headerName: "Lý do",
        field: "Reasonforleave",
        sortable: true,
      },
      {
        headerName: "Trạng thái",
        field: "Status",
        sortable: true,
      },
      {
        headerName: "",
        field: "edit",
        filter: false,
        cellRendererFramework: this.renderEditButton.bind(this),
      },
    ],
    rowData: [],
    defaultColDef: {
      resizable: true,
      width: 170,
      filter: "agTextColumnFilter",
    },
    getRowHeight: function (params) {
      return 35;
    },
  };
  leaveApplicationHRObj = [];
  rowDataT = [];

  loadLeaveApplicationHRData = (status = "") => {
    let url = process.env.REACT_APP_API_URL + "/api/leave-application-hr/status/";
    if (status.length > 0) {
      url += status;
    }

    axios
      .get(url, {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      })
      .then((response) => {
        this.leaveApplicationHRObj = response.data;
        console.log("response", response.data);
        this.setState({ leaveApplicationHRData: response.data });
        this.setState({ loading: false });
        this.rowDataT = [];
        this.leaveApplicationHRObj.map((data) => {
          if (data["employee"].length == 0) {
            return;
          }
          let temp = {
            data,
            EmployeeCode: data["employee"][0]["EmployeeCode"],
            Name:
              data["employee"][0]["LastName"] +
              " " +
              data["employee"][0]["FirstName"],
            Leavetype: data["Leavetype"],
            FromDate: data["FromDate"].slice(0, 10),
            ToDate: data["ToDate"].slice(0, 10),
            Reasonforleave: data["Reasonforleave"],
            Status: this.status(data["Status"]),
          };

          this.rowDataT.push(temp);
        });
        this.setState({ rowData: this.rowDataT });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  onLeaveApplicationHRDelete = (e1, e2) => {
    console.log(e1, e2);
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
          .delete(
            process.env.REACT_APP_API_URL +
              "/api/leave-application-hr/" +
              e1 +
              "/" +
              e2,
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
            console.log(err);
          });
      }
    });
  };
  componentDidMount() {
    this.loadLeaveApplicationHRData();
  }
  renderButton(params) {
    console.log(params);
    return (
      <FontAwesomeIcon
        icon={faTrash}
        onClick={() =>
          this.onLeaveApplicationHRDelete(
            params.data.data["employee"][0]["_id"],
            params.data.data["_id"]
          )
        }
      />
    );
  }
  renderEditButton(params) {
    console.log(params);
    return (
      <FontAwesomeIcon
        icon={faEdit}
        onClick={() => this.props.onEditLeaveApplicationHR(params.data.data)}
      />
    );
  }

  status = (s) => {
    if (s == 1) {
      return "Đang xử lý";
    }
    if (s == 2) {
      return "Cho phép";
    }
    if (s == 3) {
      return "Từ chối";
    }
  };

  handleSearchChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  searchLeaveApplicationHRData = () => {
    axios
      .get(
        process.env.REACT_APP_API_URL +
          "/api/leave-application-hr/employee/" +
          this.state.searchData,
        {
          headers: {
            authorization: localStorage.getItem("token") || "",
          },
        }
      )
      .then((response) => {
        this.leaveApplicationHRObj = response.data;
        console.log("response", response.data);
        this.setState({ leaveApplicationHRData: response.data });
        this.setState({ loading: false });
        this.rowDataT = [];
        this.leaveApplicationHRObj.map((data) => {
          if (data["employee"].length == 0) {
            return;
          }
          let temp = {
            data,
            EmployeeCode: data["employee"][0]["EmployeeCode"],
            Name:
              data["employee"][0]["LastName"] +
              " " +
              data["employee"][0]["FirstName"],
            Leavetype: data["Leavetype"],
            FromDate: data["FromDate"].slice(0, 10),
            ToDate: data["ToDate"].slice(0, 10),
            Reasonforleave: data["Reasonforleave"],
            Status: this.status(data["Status"]),
          };

          this.rowDataT.push(temp);
        });
        this.setState({ rowData: this.rowDataT });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Lỗi",
          text: "Không tìm thấy dữ liệu",
        });
      });
  };

  render() {
    return (
      <div id="table-outer-div-scroll">
        <h2 id="role-title">Thông tin nghỉ phép</h2>
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
            onClick={this.searchLeaveApplicationHRData.bind(this)}
          >
            <FontAwesomeIcon icon={faSearch} id="search-icon" />
          </Button>
          <Button
            variant="primary"
            id="search-button"
            className="ml-2"
            onClick={this.loadLeaveApplicationHRData.bind(this)}
          >
            Tải lại
          </Button>
          <Dropdown className="col-2">
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Trạng thái
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => this.loadLeaveApplicationHRData("1")}
              >
                Đang xử lý
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => this.loadLeaveApplicationHRData("2")}
              >
                Cho phép
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => this.loadLeaveApplicationHRData("3")}
              >
                Từ chối
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
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

export default LeaveApplicationHRTable;
