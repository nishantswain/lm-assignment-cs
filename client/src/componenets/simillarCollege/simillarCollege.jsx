import React from 'react';
import { useEffect, useState } from 'react';
import { getSimillarCollege } from '../../apiCalls/collegeCalls';

function SimillarCollege({ collegeId, relation }) {
  const [state, setState] = useState(null);

  useEffect(() => {
    (async () => {
      let sm_collge = await getSimillarCollege(collegeId, relation);
      if (sm_collge.data) setState(sm_collge.data);
    })();
  }, [collegeId, relation]);

  function renderList() {
    if (state && state.length) {
      return state.map((college, idx) => (
        <div key={idx}>
          <span>{college.college_name}</span>
        </div>
      ));
    } else {
      return (
        <div>
          <span>NA</span>
        </div>
      );
    }
  }

  return (
    <div>
      {`Simillarity by ${relation}`}
      {renderList()}
    </div>
  );
}

export default SimillarCollege;
