import React, { Component } from "react";
// import "./PersonalInfoTable.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { RingLoader } from "react-spinners";
import { css } from "@emotion/core";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
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

class PersonalInfoTable extends Component {
  state = {
    personalInfoData: [],
    loading: true,
    columnDefs: [
      {
        headerName: "Mã nhân viên",
        field: "EmployeeCode",
        sortable: true,
        width: 110,
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
      },
      {
        headerName: "Giới tính",
        field: "Gender",
        sortable: true,
        width: 90,
        cellRendererFramework: function (params) {
          return params.value === "male" ? "Nam" : "Nữ";
        },
      },
      {
        headerName: "Thông tin liên hệ",
        field: "ContactNo",
        sortable: true,
      },
      {
        headerName: "Email",
        field: "Email",
        sortable: true,
      },
      {
        headerName: "Mã định danh",
        field: "PANcardNo",
        sortable: true,
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
        headerName: "Sở thích",
        field: "Hobbies",
        sortable: true,
      },
      {
        headerName: "Địa chỉ hiện tại",
        field: "PresentAddress",
        sortable: true,
        width: 150,
      },
      {
        headerName: "",
        field: "edit",
        filter: false,
        width: 30,
        cellRendererFramework: this.renderEditButton.bind(this),
      },
    ],
    rowData: [],
    defaultColDef: {
      resizable: true,
      width: 120,
      filter: "agTextColumnFilter",
    },
    getRowHeight: function (params) {
      return 35;
    },
  };
  personalInfoObj = [];
  rowDataT = [];
  loadPersonalInfoData = () => {
    axios
      .get(
        process.env.REACT_APP_API_URL +
          "/api/personal-info/" +
          this.props.data["_id"],
        {
          headers: {
            authorization: localStorage.getItem("token") || "",
          },
        }
      )
      .then((response) => {
        this.personalInfoObj = response.data;
        this.setState({ personalInfoData: response.data });
        this.setState({ loading: false });
        this.rowDataT = [];
        let data = this.personalInfoObj;
        let temp = {
          data,
          EmployeeCode: data["EmployeeCode"] || "Trống",
          FirstName: data["FirstName"] || "Trống",
          MiddleName: data["MiddleName"] || "Trống",
          LastName: data["LastName"] || "Trống",
          Gender: data["Gender"] || "Trống",
          ContactNo: data["ContactNo"] || "Trống",
          Email: data["Email"] || "Trống",
          PANcardNo: data["PANcardNo"] || "Trống",
          DOB: data["DOB"].slice(0, 10) || "Trống",
          Hobbies: data["Hobbies"] || "Trống",
          PresentAddress: data["PresentAddress"] || "Trống",
        };
        this.rowDataT.push(temp);
        this.setState({ rowData: this.rowDataT });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  onPersonalInfoDelete = (e) => {
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
          .delete(process.env.REACT_APP_API_URL + "/api/personalInfo/" + e, {
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
    this.loadPersonalInfoData();
  }
  renderEditButton(params) {
    console.log(params);
    if (this.props.back) {
      return <React.Fragment />;
    }
    return (
      <FontAwesomeIcon
        icon={faEdit}
        onClick={() => this.props.onEditPersonalInfo(params.data.data)}
      />
    );
  }

  render() {
    return (
      <div id="table-outer-div-scroll">
        <h2 id="role-title">
          Thông tin cá nhân{" "}
          {this.props.back
            ? "của " +
              this.props.data["FirstName"] +
              " " +
              this.props.data["LastName"]
            : ""}
        </h2>
        {this.props.back ? (
          <Link to="/hr/employee">
            <Button variant="primary" id="add-button">
              Back
            </Button>
          </Link>
        ) : (
          <React.Fragment />
        )}

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

export default PersonalInfoTable;
