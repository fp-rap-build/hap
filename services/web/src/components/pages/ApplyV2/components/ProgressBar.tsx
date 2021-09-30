import '../../../../styles/progressBar.css';

function ProgressBar() {
  return (
    <div className="progressBar">
      {/* <div style={{ width: `${currentContentToProgress(currentContent)}%` }}> */}
      <div className="progressLabel">Your Progress</div>
      <div className="progressBarContainer">
        <div className="stepsBar">{`Step 2 of 10`}</div>
      </div>
    </div>
  );
}

export default ProgressBar;
