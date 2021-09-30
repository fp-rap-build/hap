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
          className={
            statusBarWidth === '100' ? 'stepsBar stepsBarDone' : 'stepsBar'
          }
          style={{ width: `${statusBarWidth}%` }}
        >
          {progress === 90
            ? `You're Done!`
            : `Step ${(Math.floor(progress / 10) + 1).toString()} of 8`}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
