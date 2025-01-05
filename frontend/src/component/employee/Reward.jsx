import React, { Component } from "react";
import RewardTable from "./RewardTable.jsx";
import axios from "axios";

class Reward extends Component {
  state = {
    table: true,
    data: [],
  };

  loadRewardData = () => {
    axios
      .get(
        process.env.REACT_APP_API_URL +
          "/api/employee-reward/" +
          this.props.data["_id"],
        {
          headers: {
            authorization: localStorage.getItem("token") || "",
          },
        }
      )
      .then((response) => {
        const rewards = response.data.map((reward) => ({
          ...reward,
          EmployeeName: `${reward.employee[0].FirstName} ${reward.employee[0].LastName}`,
        }));
        this.setState({ data: rewards });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  calculateTotals = () => {
    const totalsByMonth = this.state.data.reduce((acc, reward) => {
      const month = new Date(reward.Date).getMonth() + 1;
      if (!acc[month]) {
        acc[month] = { totalRewardAmount: 0, totalPenaltyAmount: 0, totalAmount: 0 };
      }
      if (reward.Type === 1) {
        acc[month].totalRewardAmount += reward.Amount;
      } else if (reward.Type === 2) {
        acc[month].totalPenaltyAmount += reward.Amount;
      }
      acc[month].totalAmount = acc[month].totalRewardAmount - acc[month].totalPenaltyAmount;
      return acc;
    }, {});

    const totalAmount = Object.values(totalsByMonth).reduce(
      (sum, monthTotals) => sum + monthTotals.totalAmount,
      0
    );

    return { totalsByMonth, totalAmount };
  };

  componentDidMount() {
    this.loadRewardData();
  }

  render() {
    console.log("Reward.jsx: this.state.data: ", this.state.data);
    const { totalsByMonth, totalAmount } = this.calculateTotals();
    return (
      <React.Fragment>
        <RewardTable
          onAddReward={this.handleAddReward}
          onEditReward={this.handleEditReward}
          data={this.props.data}
        />
        <div style={{ maxHeight: '400px', overflowY: 'auto', border: '1px solid black', margin: '10px'}}>
          {Object.keys(totalsByMonth).map((month) => (
            <div key={month} style={{ padding: '10px', margin: '10px' }}>
              <p>Tháng {month}:</p>
              <p>Tổng số tiền thưởng: {totalsByMonth[month].totalRewardAmount}</p>
              <p>Tổng số tiền vi phạm: {totalsByMonth[month].totalPenaltyAmount}</p>
              <p>Tổng số tiền nhận được: {totalsByMonth[month].totalAmount}</p>
            </div>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default Reward;
