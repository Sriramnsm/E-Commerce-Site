import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import Directory from '../../components/directory/directory.component.jsx';


const Home = () => {	
	return (
    <Fragment>
      <Directory />
      <Outlet />
    </Fragment>  
  );
};
		
export default Home;		