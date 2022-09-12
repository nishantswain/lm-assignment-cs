import React from 'react';
import PieChartComponenet from '../componenets/pie-charts/piechart';
import CollegeTable from '../componenets/tables/colllegeTable/collegeTable';
import './collegeList.css';
function CollegeList() {
  return (
    <div className="colleges-container">
      <div className="colleges-table">
        <CollegeTable />
      </div>
      <div className="colleges-pie-chart">
        <div className="colleges-chart-1">
          <PieChartComponenet filter="location" />
        </div>
        <div className="colleges-chart-2">
          <PieChartComponenet filter="year_founded" />
        </div>
      </div>
    </div>
  );
}

export default CollegeList;
