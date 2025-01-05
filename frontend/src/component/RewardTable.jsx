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
        headerName: "Nhân viên",
        field: "EmployeeName",
        sortable: true,
        filter: true,
      },
      {
        headerName: "Khoản tiền",
        field: "Amount",
        sortable: true,
        filter: true,
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
        cellRendererFramework: this.renderDeleteButton.bind(this),
      },
    ],
    rowData: [],
  };

  componentDidMount() {
    this.loadRewardData();
  }

  loadRewardData = () => {
    axios
      .get(process.env.REACT_APP_API_URL + "/api/reward", {
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

  renderEditButton(params) {
    return (
      <FontAwesomeIcon
        icon={faEdit}
        onClick={() => this.props.onEditReward(params.data)}
      />
    );
  }

  renderDeleteButton(params) {
    return (
      <FontAwesomeIcon
        icon={faTrash}
        onClick={() => this.onRewardDelete(params.data["_id"])}
      />
    );
  }

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
        <Button
          variant="primary"
          id="add-button"
          onClick={this.props.onAddReward}
        >
          Thêm
        </Button>
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
