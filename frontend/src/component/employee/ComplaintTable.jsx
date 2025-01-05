import React, { Component } from "react";
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

class ComplaintTable extends Component {
  state = {
    complaintData: [],
    loading: true,
    columnDefs: [
      {
        headerName: "Tiêu đề",
        field: "Title",
        sortable: true,
      },
      {
        headerName: "Nội dung",
        field: "Description",
        sortable: true,
      },
      {
        headerName: "Thời gian",
        field: "Date",
        sortable: true,
        type: ["dateColumn"],
        filter: "agDateColumnFilter",
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
  complaintObj = [];
  rowDataT = [];

  loadComplaintData = () => {
    axios
      .get(process.env.REACT_APP_API_URL + `/api/employee-complaint/${this.props.prevData["_id"]}`, {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      })
      .then((response) => {
        this.complaintObj = response.data;
        this.setState({ complaintData: response.data });
        this.setState({ loading: false });
        this.rowDataT = [];
        this.complaintObj.map((data) => {
          let temp = {
            data,
            Title: data["Title"],
            Description: data["Description"],
            Date: data["Date"].slice(0, 10),
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

  onComplaintDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(process.env.REACT_APP_API_URL + "/api/complaint/" + id, {
            headers: {
              authorization: localStorage.getItem("token") || "",
            },
          })
          .then((res) => {
            this.loadComplaintData();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  componentDidMount() {
    this.loadComplaintData();
  }

  renderStatus(params){
    if(params == 'Pending'){
        return 'Đang chờ xử lý';
    } else {
        return 'Đã xử lý';
    }
  }

  render() {
    return (
      <div id="table-outer-div-scroll">
        <h2 id="role-title">Complaints</h2>

        <Button
          variant="primary"
          id="add-button"
          onClick={this.props.onAddComplaint}
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

export default ComplaintTable;
