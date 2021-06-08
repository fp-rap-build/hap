import { useLocation } from 'react-router-dom';

export default function Watermark() {
  const { pathname } = useLocation();

  return (
    <div
      style={
        pathname === '/'
          ? { display: 'none' }
          : { position: 'fixed', zIndex: 3, bottom: '4%', left: '1%' }
      }
    >
      <a href="http://www.familypromiseofspokane.org/" target="_blank">
        Powered by Family Promise of Spokane
      </a>

      <br />

      <p>Need Technical Help?  Email us at: <a href = "mailto: hap@fpspokane.org">HAP@fpspokane.org</a></p>
      


    </div>
  );
}
