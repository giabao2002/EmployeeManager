import React, { Component } from "react";
// import "./Country.css";
import axios from "axios";
import CountryTable from "./CountryTable.jsx";
import CountryForm from "./CountryForm.jsx";
import CountryFormEdit from "./CountryFormEdit.jsx";

class Country extends Component {
  state = {
    table: true,
    editForm: false,
    editData: {},
  };

  render() {
    return (
      <React.Fragment>
        {this.state.table ? (
          this.state.editForm ? (
            <CountryFormEdit
              onCountryEditUpdate={this.handleCountryEditUpdate}
              onFormEditClose={this.handleEditFormClose}
              editData={this.state.editData}
            />
          ) : (
            <CountryTable
              onAddCountry={this.handleAddCountry}
              onEditCountry={this.handleEditCountry}
            />
          )
        ) : (
          <CountryForm
            onCountrySubmit={this.handleCountrySubmit}
            onFormClose={this.handleFormClose}
          />
        )}
      </React.Fragment>
    );
  }
  handleCountrySubmit = (event) => {
    event.preventDefault();
    console.log("name", event.target[0].value);
    this.setState({ table: true });

    let body = {
      CountryName: event.target[0].value,
    };
    axios
      .post(process.env.REACT_APP_API_URL + "/api/country", body, {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        this.setState({ table: false });
        this.setState({ table: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  handleAddCountry = () => {
    console.log("clicked1");
    this.setState({ table: false });
  };
  handleEditCountry = (e) => {
    console.log(e);
    console.log("clicked6");
    this.setState({ editForm: true });
    this.setState({ editData: e });
  };
  handleFormClose = () => {
    console.log("clicked1");
    this.setState({ table: true });
  };
  handleEditFormClose = () => {
    console.log("clicked5");
    this.setState({ editForm: false });
  };
  handleFormClose = () => {
    console.log("clicked1");
    this.setState({ table: true });
  };
  handleCountryEditUpdate = (info, newInfo) => {
    let body = {
      CountryName: newInfo.target[0].value,
    };
    console.log("update", body);
    axios
      .put(
        process.env.REACT_APP_API_URL + "/api/country/" + info["_id"],
        body,
        {
          headers: {
            authorization: localStorage.getItem("token") || "",
          },
        }
      )
      .then((res) => {
        this.setState({ table: false });
        this.setState({ table: true });
      })
      .catch((err) => {
        console.log(err);
      });

    this.setState({ editForm: false });
  };
}

export default Country;
