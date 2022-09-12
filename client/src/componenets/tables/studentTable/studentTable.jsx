import React, { useEffect, useState } from 'react';
import { getCollegeList } from '../../../apiCalls/collegeCalls';
import { getStudentList } from '../../../apiCalls/studentCalls';

function StudentTable() {
  const [studentList, setStudentList] = useState(null);
  useEffect(() => {
    (async () => {
      let response = await getStudentList();
      setStudentList(response.data);
    })();
  }, []);
  return (
    <div>
      {/* Student List */}
      {/* {JSON.stringify(studentList)} */}
    </div>
  );
}

export default StudentTable;
