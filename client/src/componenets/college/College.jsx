import React, { useEffect, useState } from 'react';
import './college.css';
import { useParams } from 'react-router-dom';
import { getCollege, getSimillarCollege } from '../../apiCalls/collegeCalls';
import SimillarCollege from '../simillarCollege/simillarCollege';

function College() {
  let { collegeId } = useParams();

  const [college, setCollege] = useState(null);

  useEffect(() => {
    (async () => {
      let collegeRespone = await getCollege('id', collegeId);
      if (collegeRespone.data) setCollege(collegeRespone.data);
    })();
  }, [collegeId]);

  function renderCollege() {
    if (college) {
      return (
        <>
          <div>
            <label>College Name</label>
            <p>{college.college_name}</p>
          </div>
          <div>
            <label>Year Founded</label>
            <p>{college.year_founded}</p>
          </div>
          <div>
            <label>Location</label>
            <p>{college.location}</p>
          </div>
          <div>
            <label>Courses</label>
            {college.course_data.map((course, idx) => {
              return (
                <div key={idx}>
                  <span>{course.course_name}</span>
                </div>
              );
            })}
          </div>
        </>
      );
    } else {
      return (
        <div className="college-container">
          {'No info found for the college'}
        </div>
      );
    }
  }

  function renderSimillarCollege() {
    if (college) {
      return (
        <>
          <div>
            <SimillarCollege
              collegeId={college.collegeId}
              relation="location"
            />
          </div>
          <div className="simillar-course">
            <SimillarCollege collegeId={college.collegeId} relation="course" />
          </div>
        </>
      );
    } else {
      <div>{'Not available'}</div>;
    }
  }
  return (
    <div className="college-container">
      <div className="college-details">{renderCollege()}</div>
      <div className="simillar-college">{renderSimillarCollege()}</div>
    </div>
  );
}

export default College;
