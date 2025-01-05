import React, { Component } from "react";
// import "./LeaveApplicationEmpTable.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
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

class LeaveApplicationEmpTable extends Component {
  state = {
    leaveApplicationEmpData: [],
    loading: true,

    columnDefs: [
      {
        headerName: "Loại",
        field: "Leavetype",
        sortable: true,
      },

      {
        headerName: "Từ ngày",
        field: "FromDate",
        sortable: true,
        type: ["dateColumn"],
        filter: "agDateColumnFilter",
      },
      {
        headerName: "Đến ngày",
        field: "ToDate",
        sortable: true,
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
    ],
    rowData: [],

    defaultColDef: {
      resizable: true,
      width: 235,
      filter: "agTextColumnFilter",
    },
    getRowHeight: function (params) {
      return 35;
    },
  };
  leaveApplicationEmpObj = [];
  rowDataT = [];

  loadLeaveApplicationEmpData = () => {
    axios
      .get(
        process.env.REACT_APP_API_URL +
          "/api/leave-application-emp/" +
          this.props.data["_id"],
        {
          headers: {
            authorization: localStorage.getItem("token") || "",
          },
        }
      )
      .then((response) => {
        this.leaveApplicationEmpObj = response.data;
        console.log("response", response.data);
        this.setState({ leaveApplicationEmpData: response.data });
        this.setState({ loading: false });
        this.rowDataT = [];
        this.leaveApplicationEmpObj.leaveApplication.map((data) => {
          let temp = {
            data,
            Leavetype: data["Leavetype"],
            FromDate: data["FromDate"].slice(0, 10),
            ToDate: data["ToDate"].slice(0, 10),
            Reasonforleave: data["Reasonforleave"],
            Status: this.status(data["Status"]),
          };
          console.log("temp", temp);
          this.rowDataT.push(temp);
        });
        this.setState({ rowData: this.rowDataT });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  onLeaveApplicationEmpDelete = (e1, e2) => {
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
              "/api/leave-application-emp/" +
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
    this.loadLeaveApplicationEmpData();
  }

  renderButton(params) {
    return (
      <FontAwesomeIcon
        icon={faTrash}
        onClick={() =>
          this.onLeaveApplicationEmpDelete(
            this.props.data["_id"],
            params.data.data["_id"]
          )
        }
      />
    );
  }
  renderEditButton(params) {
    return (
      <FontAwesomeIcon
        icon={faEdit}
        onClick={() => this.onEdit(params.data.data)}
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
  onEdit = (data) => {
    if (data["Status"] === 1) {
      this.props.onEditLeaveApplicationEmp(data);
    } else {
      Swal.fire({
        title: "Thông báo",
        text: "Bạn không thể chỉnh sửa đơn nghỉ phép sau khi nó được chấp thuận hoặc từ chối",
        icon: "warning",
        confirmButtonText: "OK",
      });
    }
  };

  render() {
    return (
      <div id="table-outer-div-scroll">
        <h2 id="role-title">Đơn xin nghỉ phép</h2>
        <Button
          variant="primary"
          id="add-button"
          onClick={this.props.onAddLeaveApplicationEmp}
        >
          <FontAwesomeIcon icon={faPlus} id="plus-icon" />
          Thêm
        </Button>

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

export default LeaveApplicationEmpTable;
