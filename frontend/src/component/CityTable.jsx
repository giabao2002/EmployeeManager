import React, { Component } from "react";
// import "./CityTable.css";
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
class CityTable extends Component {
  state = {
    cityData: [],
    loading: true,

    columnDefs: [
      {
        headerName: "Quốc gia",
        field: "CountryName",
        sortable: true,
      },
      {
        headerName: "Khu vực",
        field: "StateName",
        sortable: true,
      },
      {
        headerName: "Thành phố",
        field: "CityName",
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
      width: 400,
      filter: "agTextColumnFilter",
    },
    getRowHeight: function (params) {
      return 35;
    },
  };
  cityObj = [];
  rowDataT = [];

  loadCityData = () => {
    axios
      .get(process.env.REACT_APP_API_URL + "/api/city", {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      })
      .then((response) => {
        this.cityObj = response.data;
        this.setState({ cityData: response.data });
        this.setState({ loading: false });
        this.rowDataT = [];
        this.cityObj.map((data) => {
          let temp = {
            data,
            CountryName: data["state"][0] ? data["state"][0]["country"][0]["CountryName"] : "",
            StateName: data["state"][0]  ? data["state"][0]["StateName"] : "",
            CityName: data["CityName"],
          };
          this.rowDataT.push(temp);
        });
        this.setState({ rowData: this.rowDataT });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  onCityDelete = (e) => {
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
          .delete(process.env.REACT_APP_API_URL + "/api/city/" + e, {
            headers: {
              authorization: localStorage.getItem("token") || "",
            },
          })
          .then((res) => {
            this.componentDidMount();
          })
          .catch((err) => {
            console.log(err);
            console.log(err.response);
            if (err.response.status === 403) {
              Swal.fire({
                title: err.response.data,
                icon: "warning",
                confirmButtonText: "OK",
              });
            }
          });
      }
    });
  };
  componentDidMount() {
    this.loadCityData();
  }
  renderButton(params) {
    return (
      <FontAwesomeIcon
        icon={faTrash}
        onClick={() => this.onCityDelete(params.data.data["_id"])}
      />
    );
  }
  renderEditButton(params) {
    return (
      <FontAwesomeIcon
        icon={faEdit}
        onClick={() => this.props.onEditCity(params.data.data)}
      />
    );
  }

  render() {
    return (
      <div id="table-outer-div-scroll">
        <h2 id="role-title">Thông tin thành phố</h2>
        <Button
          variant="primary"
          id="add-button"
          onClick={this.props.onAddCity}
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

export default CityTable;
