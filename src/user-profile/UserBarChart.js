import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

export class UserCharactersBarChart extends React.Component {
  render() {
    return (
      <BarChart
        width={500}
        height={250}
        data={this.props.data}
        margin={{ top: 5, right: 10, left: 40, bottom: 5 }}
      >
        <XAxis dataKey="date" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Bar dataKey="Characters number" fill="#c94c4c" />
      </BarChart>
    );
  }
}

export class UserComicsBarChart extends React.Component {
  render() {
    return (
      <BarChart
        width={500}
        height={250}
        data={this.props.data}
        margin={{ top: 5, right: 10, left: 40, bottom: 5 }}
      >
        <XAxis dataKey="date" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Bar dataKey="Comics number" fill="#c94c4c" />
      </BarChart>
    );
  }
}
