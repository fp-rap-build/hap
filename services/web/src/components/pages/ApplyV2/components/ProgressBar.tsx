import React from 'react';
import '../../../../styles/progressBar.css';

const ProgressBar = props => {
  const { progress } = props;

  console.log('progress: ', progress);

  const statusBarWidth = (25 + 0.75 * (progress + 10)).toString();
  const stepNumber = (Math.floor(progress / 10) + 1).toString();

  return (
    <div className="progressBar">
      <div className="progressLabel">Your Progress</div>
      <div className="progressBarContainer">
        <div className="stepsBar" style={{ width: `${statusBarWidth}%` }}>
          {`Step ${stepNumber} of 9`}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
