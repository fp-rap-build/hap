import React from 'react';
import '../../../../styles/progressBar.css';

const ProgressBar = props => {
  const { progress } = props;

  console.log('progress: ', progress);

  const statusBarWidth = (30 + 0.7 * progress).toString();

  return (
    <div className="progressBar">
      <div className="progressLabel">Your Progress</div>
      <div className="progressBarContainer">
        <div
          className="stepsBar"
          style={{ width: `${statusBarWidth}%` }}
        >{`Step ${((progress + 10) / 10).toString()} of 10`}</div>
      </div>
    </div>
  );
};

export default ProgressBar;
