import React, { Component } from "react";
// import "./EducationTable.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
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

class EducationTable extends Component {
  state = {
    educationData: [],
    loading: true,

    columnDefs: [
      {
        headerName: "Trường/Đại học",
        field: "SchoolUniversity",
        sortable: true,
      },
      {
        headerName: "Bằng cấp",
        field: "Degree",
        sortable: true,
      },
      {
        headerName: "Loại",
        field: "Grade",
        sortable: true,
      },
      {
        headerName: "Năm tốt nghiệp",
        field: "PassingOfYear",
        sortable: true,
        type: ["dateColumn"],
        filter: "agDateColumnFilter",
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
      width: 295,
      filter: "agTextColumnFilter",
    },
    getRowHeight: function (params) {
      return 35;
    },
  };
  educationObj = [];
  rowDataT = [];

  loadEducationData = () => {
    axios
      .get(
        process.env.REACT_APP_API_URL +
          "/api/education/" +
          this.props.data["_id"],
        {
          headers: {
            authorization: localStorage.getItem("token") || "",
          },
        }
      )
      .then((response) => {
        this.educationObj = response.data;
        console.log("response", response.data);
        this.setState({ educationData: response.data });
        this.setState({ loading: false });
        this.rowDataT = [];
        this.educationObj.education.map((data) => {
          let temp = {
            data,
            SchoolUniversity: data["SchoolUniversity"],
            Degree: data["Degree"],
            Grade: data["Grade"],
            PassingOfYear: data["PassingOfYear"],
          };
          this.rowDataT.push(temp);
        });
        this.setState({ rowData: this.rowDataT });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  onEducationDelete = (e1, e2) => {
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
            process.env.REACT_APP_API_URL + "/api/education/" + e1 + "/" + e2,
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
    this.loadEducationData();
  }
  renderButton(params) {
    console.log(params);
    if (this.props.back) {
      return <React.Fragment />;
    }
    return (
      <FontAwesomeIcon
        icon={faTrash}
        onClick={() =>
          this.onEducationDelete(
            this.props.data["_id"],
            params.data.data["_id"]
          )
        }
      />
    );
  }
  renderEditButton(params) {
    console.log(params);
    if (this.props.back) {
      return <React.Fragment />;
    }
    return (
      <FontAwesomeIcon
        icon={faEdit}
        onClick={() => this.props.onEditEducation(params.data.data)}
      />
    );
  }

  render() {
    return (
      <div id="table-outer-div-scroll">
        <h2 id="role-title">
          Thông tin học vấn{" "}
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
              Trở lại
            </Button>
          </Link>
        ) : (
          <Button
            variant="primary"
            id="add-button"
            onClick={this.props.onAddEducation}
          >
            <FontAwesomeIcon icon={faPlus} id="plus-icon" />
            Thêm
          </Button>
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

export default EducationTable;
