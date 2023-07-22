import {Outlet} from 'react-router-dom';
import ImageOne from '../../assets/images/Image-One.png';
import ImageTwo from '../../assets/images/Image-Two.png';
import './new-home.styles.scss';

const NewHome = () => {
  return (
    <div>
      <div>
        <h2 className='left'>Crown</h2>
        <img id='ImageOne' src={ImageOne} height='1900'></img>
      </div>
      <div>
        <h2 className='right'>Clothing</h2>
        <img id='ImageTwo' src={ImageTwo} height='1500'></img>
      </div>
      <Outlet />
    </div>
  );
};

export default NewHome;
