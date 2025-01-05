import React, { Component } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import Swal from "sweetalert2";

class RewardTable extends Component {
  state = {
    columnDefs: [
      {
        headerName: "Loại",
        field: "Type",
        sortable: true,
        filter: true,
        cellRendererFramework: this.renderType.bind(this),
      },
      {
        headerName: "Nội dung",
        field: "Description",
        sortable: true,
        filter: true,
      },
      {
        headerName: "Ngày",
        field: "Date",
        sortable: true,
        filter: true,
        cellRendererFramework: this.renderDate.bind(this),
      },
      {
        headerName: "Khoản tiền",
        field: "Amount",
        sortable: true,
        filter: true,
      },
    ],
    rowData: [],
  };

  componentDidMount() {
    this.loadRewardData();
  }

  loadRewardData = () => {
    axios
      .get(process.env.REACT_APP_API_URL + "/api/employee-reward/" + this.props.data['_id'], {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      })
      .then((response) => {
        const rewards = response.data.map((reward) => ({
          ...reward,
          EmployeeName: `${reward.employee[0].FirstName} ${reward.employee[0].LastName}`,
        }));
        this.setState({ rowData: rewards });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  renderType(params) {
    if (params.value === 1) {
      return "Khen thưởng";
    } else {
      return "Kỷ luật";
    }
  }

  renderDate(params) {
    return params.value.slice(0, 10);
  }

  onRewardDelete = (id) => {
    Swal.fire({
      title: "Bạn có chắc chắn không?",
      text: "Sau khi thực hiện, phần thưởng này sẽ bị xóa!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(process.env.REACT_APP_API_URL + "/api/reward/" + id, {
            headers: {
              authorization: localStorage.getItem("token") || "",
            },
          })
          .then((res) => {
            this.loadRewardData();
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

  render() {
    return (
      <div id="table-outer-div-scroll">
        <h2 id="role-title">Danh sách khen thưởng/kỷ luật</h2>
        <div id="clear-both" />
        <div id="table-div" className="ag-theme-balham">
          <AgGridReact
            columnDefs={this.state.columnDefs}
            rowData={this.state.rowData}
            pagination={true}
            paginationPageSize={10}
          />
        </div>
      </div>
    );
  }
}

export default RewardTable;
