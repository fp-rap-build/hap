import { Tooltip } from 'antd';

const StatusCircle = ({ color, tooltip, clickable, onClick }) => {
  return (
    <Tooltip title={tooltip}>
      <svg
        onClick={onClick}
        viewBox="0 0 100 100"
        height="30px"
        xmlns="http://www.w3.org/2000/svg"
        style={{ marginLeft: '10px', cursor: clickable ? 'pointer' : '' }}
      >
        <circle
          cx="50"
          cy="50"
          r="48"
          fill={color}
          stroke="grey"
          strokeWidth="4"
        />
      </svg>
    </Tooltip>
  );
};

export default StatusCircle;
