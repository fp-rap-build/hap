import React from 'react';
import '../../../../styles/progressBar.css';

const ProgressBar = props => {
  const { statusBarWidth } = props;

  const progressBarWidth = statusBarWidth + '%';
  console.log('props: ', props);
  console.log('statusBarWidth: ', statusBarWidth);
  console.log('progressBarWidth: ', progressBarWidth);
  return (
    <div className="progressBar">
      {/* <div style={{ width: `${currentContentToProgress(currentContent)}%` }}> */}
      <div className="progressLabel">Your Progress</div>
      <div className="progressBarContainer">
        <div
          className="stepsBar"
          style={{ width: `${statusBarWidth.toString()}%` }}
        >{`Step 2 of 10`}</div>
      </div>
    </div>
  );
};

export default ProgressBar;
