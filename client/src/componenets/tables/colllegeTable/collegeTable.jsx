import React, { useEffect, useState } from 'react';
import { getCollegeList } from '../../../apiCalls/collegeCalls';
import { Space, Table, Tag } from 'antd';

import { Link } from 'react-router-dom';
const columns = [
  {
    title: 'Collge Name',
    dataIndex: 'college_name',
    key: 'college_name',
    render: (collegeName, _) => {
      return <Link to={`/colleges/${_.collegeId}`}>{collegeName}</Link>;
    },
  },
  {
    title: 'Year Founded',
    dataIndex: 'year_founded',
    key: 'year_founded',
  },
  {
    title: 'Location',
    dataIndex: 'location',
    key: 'location',
  },
  {
    title: 'Courses',
    key: 'courses',
    dataIndex: 'courses',
    render: (coursesArray, aloo) => {
      return (
        <>
          {coursesArray.map((course, idx) => {
            // let color = tag.length > 5 ? 'geekblue' : 'green';
            let color = 'green';
            return (
              <Tag color={color} key={idx}>
                {course.course_name}
              </Tag>
            );
          })}
        </>
      );
    },
  },
  // {
  //   title: 'Action',
  //   key: 'action',
  //   render: (_, record) => (
  //     <Space size="middle">
  //       <a>Invite {record.name}</a>
  //       <a>Delete</a>
  //     </Space>
  //   ),
  // },
];
function formatData(rawData) {
  let cleanData = null;
  cleanData = rawData.map((item, idx) => {
    return {
      college_name: item.college_name,
      courses: item.course_data,
      location: item.location,
      year_founded: item.year_founded,
      collegeId: item.collegeId,
    };
  });
  return cleanData;
}
function CollegeTable() {
  const [collegList, setCollegeList] = useState([]);
  useEffect(() => {
    (async () => {
      let response = await getCollegeList();

      let cleanData = formatData(response.data);
      setCollegeList(cleanData);
    })();
  }, []);

  return (
    <div>
      <Table columns={columns} dataSource={collegList} />
    </div>
  );
}

export default CollegeTable;
