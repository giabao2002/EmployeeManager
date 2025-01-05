import React, { Component } from "react";
import "./RoleTable.css";
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

class RoleTable extends Component {
  state = {
    roleData: [],
    loading: true,

    columnDefs: [
      {
        headerName: "Chức vụ",
        field: "RoleName",
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
      width: 590,
      filter: "agTextColumnFilter",
    },
    getRowHeight: function (params) {
      return 35;
    },
  };
  roleObj = [];
  rowDataT = [];

  loadRoleData = () => {
    axios
      .get(process.env.REACT_APP_API_URL + "/api/role", {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      })
      .then((response) => {
        this.roleObj = response.data;
        console.log("response", response.data);
        this.setState({ roleData: response.data });
        this.setState({ loading: false });
        this.rowDataT = [];
        this.roleObj.map((data) => {
          let temp = {
            data,
            RoleName: data["RoleName"],
          };
          this.rowDataT.push(temp);
        });
        this.setState({ rowData: this.rowDataT });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  onRoleDelete = (e) => {
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
          .delete(process.env.REACT_APP_API_URL + "/api/role/" + e, {
            headers: {
              authorization: localStorage.getItem("token") || "",
            },
          })
          .then((res) => {
            this.componentDidMount();
          })
          .catch((err) => {
            Swal.fire({
              title: err.response.data || "Xảy ra lỗi",
              icon: "error",
              confirmButtonText: "OK",
            });
          });
      }
    });
  };

  componentDidMount() {
    this.loadRoleData();
  }
  renderButton(params) {
    console.log(params);
    return (
      <FontAwesomeIcon
        icon={faTrash}
        onClick={() => this.onRoleDelete(params.data.data["_id"])}
      />
    );
  }
  renderEditButton(params) {
    console.log(params);
    return (
      <FontAwesomeIcon
        icon={faEdit}
        onClick={() => this.props.onEditRole(params.data.data)}
      />
    );
  }

  render() {
    return (
      <div id="table-outer-div-scroll">
        <h2 id="role-title">Thông tin chức vụ</h2>
        <Button
          variant="primary"
          id="add-button"
          onClick={this.props.onAddRole}
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

export default RoleTable;
