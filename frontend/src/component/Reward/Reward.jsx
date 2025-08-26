import React, { Component } from "react";
import RewardTable from "./RewardTable.jsx";
import RewardForm from "./RewardForm.jsx";
import RewardFormEdit from "./RewardFormEdit.jsx";
import axios from "axios";

class Reward extends Component {
  state = {
    table: true,
    editForm: false,
    editData: {},
  };

  handleAddReward = () => {
    this.setState({ table: false });
  };

  handleEditReward = (reward) => {
    this.setState({ editForm: true, editData: reward });
  };

  handleFormClose = () => {
    this.setState({ table: true });
  };

  handleEditFormClose = () => {
    this.setState({ editForm: false });
  };

  handleRewardSubmit = (event) => {
    event.preventDefault();
    const body = {
      Type: event.target[0].value,
      Description: event.target[1].value,
      Date: event.target[2].value,
      employee: event.target[3].value,
      Amount: event.target[4].value,
    };

    axios
      .post(process.env.REACT_APP_API_URL + "/api/reward", body, {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        this.setState({ table: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleRewardEditUpdate = (info, newInfo) => {
    newInfo.preventDefault();
    const body = {
      Type: newInfo.target[0].value,
      Description: newInfo.target[1].value,
      Date: newInfo.target[2].value,
      employee: newInfo.target[3].value,
      Amount: newInfo.target[4].value,
    };

    axios
      .put(process.env.REACT_APP_API_URL + "/api/reward/" + info["_id"], body, {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        this.setState({ editForm: false, table: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <React.Fragment>
        {this.state.table ? (
          this.state.editForm ? (
            <RewardFormEdit
              onRewardEditUpdate={this.handleRewardEditUpdate}
              onFormEditClose={this.handleEditFormClose}
              editData={this.state.editData}
            />
          ) : (
            <RewardTable
              onAddReward={this.handleAddReward}
              onEditReward={this.handleEditReward}
            />
          )
        ) : (
          <RewardForm
            onRewardSubmit={this.handleRewardSubmit}
            onFormClose={this.handleFormClose}
          />
        )}
      </React.Fragment>
    );
  }
}

export default Reward;
