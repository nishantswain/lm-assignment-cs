import React, { useState } from 'react';
import { useEffect } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import { getCollegeStats } from '../../apiCalls/collegeCalls';

const defaultLabelStyle = {
  fontSize: '5px',
  fontFamily: 'sans-serif',
};
function PieChartComponent({ filter }) {
  const [state, setState] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    (async () => {
      let respone = await getCollegeStats(filter);
      setState(respone.data);
      setTotal(respone.total);
    })();
  }, [filter]);

  return (
    <>
      {`Stats by ${filter}`}
      <PieChart
        data={state}
        radius={40}
        onClick={(e) => {
          console.log(e.target);
        }}
        label={({ dataEntry }) =>
          ((dataEntry.value / total) * 100 + '').slice(0, 5) + '%'
        }
        labelStyle={{ ...defaultLabelStyle }}
      />
    </>
  );
}

export default PieChartComponent;
