import React, { Component } from "react";
// import "./AdminProjectBidTable.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { RingLoader } from "react-spinners";
import { css } from "@emotion/core";
import { Button } from "react-bootstrap";
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

class AdminProjectBidTable extends Component {
  state = {
    projectBidData: [],
    loading: true,

    columnDefs: [
      {
        headerName: "Tên dự án",
        field: "ProjectTitle",
        sortable: true,
      },
      {
        headerName: "Đường dẫn (URL)",
        field: "ProjectURL",
        sortable: true,
      },
      {
        headerName: "Thời gian dự kiến",
        field: "EstimatedTime",
        sortable: true,
      },
      {
        headerName: "Chi phí dự kiến",
        field: "EstimatedCost",
        sortable: true,
        type: "numberColumn",
        filter: "agNumberColumnFilter",
      },
      {
        headerName: "Trạng thái",
        field: "Status",
        sortable: true,
        cellRendererFramework: this.redenrStatus.bind(this),
      },
      {
        headerName: "Ghi chú",
        field: "Remark",
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
  projectBidObj = [];
  rowDataT = [];

  loadProjectBidData = () => {
    axios
      .get(process.env.REACT_APP_API_URL + "/api/admin/project-bid", {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      })
      .then((response) => {
        this.projectBidObj = response.data;
        console.log("response", response.data);
        this.setState({ projectBidData: response.data });
        this.setState({ loading: false });
        this.rowDataT = [];

        this.projectBidObj.map((data) => {
          let temp = {
            data,
            ProjectTitle: data["ProjectTitle"],
            ProjectURL: data["ProjectURL"],
            EstimatedTime: data["EstimatedTime"],
            EstimatedCost: data["EstimatedCost"],
            Remark: data["Remark"],
            Status: data["Status"],
          };

          this.rowDataT.push(temp);
        });
        this.setState({ rowData: this.rowDataT });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  onProjectBidDelete = (e) => {
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
          .delete(
            process.env.REACT_APP_API_URL + "/api/admin/project-bid/" + e,
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
    this.loadProjectBidData();
  }
  renderButton(params) {
    console.log(params);
    return (
      <FontAwesomeIcon
        icon={faTrash}
        onClick={() => this.onProjectBidDelete(params.data.data["_id"])}
      />
    );
  }
  renderEditButton(params) {
    console.log(params);
    return (
      <FontAwesomeIcon
        icon={faEdit}
        onClick={() => this.props.onEditProjectBid(params.data.data)}
      />
    );
  }

  redenrStatus(params) {
    if (params.value == 1) {
      return "Hoạt động";
    } else if (params.value == 2) {
      return "Tạm đóng";
    } else if (params.value == 3) {
      return "Đã hủy";
    } else {
      return "Kết thúc";
    }
  }

  render() {
    return (
      <div id="table-outer-div-scroll">
        <h2 id="role-title">Thông tin dự án </h2>
        <Button
          variant="primary"
          id="add-button"
          onClick={this.props.onAddProjectBid}
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

export default AdminProjectBidTable;
