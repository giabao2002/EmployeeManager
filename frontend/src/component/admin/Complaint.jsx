import React, { Component } from "react";
import axios from "axios";
import ComplaintTable from "./ComplaintTable.jsx";

class Complaint extends Component {
  state = {
    table: true,
    data: [],
  };

  render() {
    return (
      <React.Fragment>
        <ComplaintTable
          data={this.state.data}
          prevData={this.props.data}
        />
      </React.Fragment>
    );
  }

  loadComplaintData = () => {
    axios
      .get(
        process.env.REACT_APP_API_URL +
          `/api/complaint`,
        {
          headers: {
            authorization: localStorage.getItem("token") || "",
          },
        }
      )
      .then((response) => {
        this.setState({ data: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.loadComplaintData();
  }

}

export default Complaint;
