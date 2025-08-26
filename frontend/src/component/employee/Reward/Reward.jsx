import React, { Component } from "react";
import RewardTable from "./RewardTable.jsx";
import axios from "axios";
import "./Reward.css";

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

  formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  render() {
    console.log("Reward.jsx: this.state.data: ", this.state.data);
    const { totalsByMonth, totalAmount } = this.calculateTotals();
    const hasData = Object.keys(totalsByMonth).length > 0;

    return (
      <div className="reward-container">
        <RewardTable
          onAddReward={this.handleAddReward}
          onEditReward={this.handleEditReward}
          data={this.props.data}
        />
        
        {hasData ? (
          <div className="monthly-summary">
            <div className="monthly-summary-header">
              <span>Thống kê thưởng & phạt theo tháng</span>
              <span>Tổng cộng: {this.formatCurrency(totalAmount)}</span>
            </div>
            <div className="monthly-summary-content">
              {Object.keys(totalsByMonth)
                .sort((a, b) => b - a) // Sắp xếp tháng giảm dần
                .map((month) => (
                <div key={month} className="month-item">
                  <div className="month-title">Tháng {month}</div>
                  <div className="amount-row">
                    <span className="amount-label">Tổng tiền thưởng:</span>
                    <span className="amount-value reward-amount">
                      {this.formatCurrency(totalsByMonth[month].totalRewardAmount)}
                    </span>
                  </div>
                  <div className="amount-row">
                    <span className="amount-label">Tổng tiền phạt:</span>
                    <span className="amount-value penalty-amount">
                      {this.formatCurrency(totalsByMonth[month].totalPenaltyAmount)}
                    </span>
                  </div>
                  <div className="amount-row">
                    <span className="amount-label">Hiệu số:</span>
                    <span className="amount-value total-amount">
                      {this.formatCurrency(totalsByMonth[month].totalAmount)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Reward;
