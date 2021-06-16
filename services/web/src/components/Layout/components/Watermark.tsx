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
    

    

      
      
      


    </div>
  );
}
