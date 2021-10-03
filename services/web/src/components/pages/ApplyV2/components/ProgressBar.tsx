import React from 'react';
import '../../../../styles/progressBar.css';

const ProgressBar = props => {
  const { progress } = props;

  // a lot of the strange numbers and math here deal with the extras in /Navigation currentContentToProgress(currentContent) cases (address, status) not being included
  const statusBarWidth = (20 + 0.8 * (progress + 20)).toString();
  const stepNumber =
    progress < 40
      ? (Math.floor(progress / 10) + 1).toString()
      : Math.floor(progress / 10).toString();

  return (
    <div className="progressBar">
      <div className="progressLabel">
        {window.innerWidth < 450 ? 'Progress' : 'Your Progress'}
      </div>
      <div className="progressBarContainer">
        <div className="stepsBar" style={{ width: `${statusBarWidth}%` }}>
          {`Step ${stepNumber} of 8`}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
