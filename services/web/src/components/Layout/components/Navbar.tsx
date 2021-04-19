import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { useHistory } from 'react-router-dom';

import logo from '../../../assets/logo.png';

import { logOut } from '../../../redux/users/userActions';

import styles from '../../../styles/Layout/navbar.module.css';

function Navbar() {
  const history = useHistory();

  const dispatch = useDispatch();

  const isLoggedIn = useSelector(state => state.user.isLoggedIn);

  const redirectToHome = () => {
    history.push('/');
  };

  const handleLogout = () => {
    dispatch(logOut(history));
  };

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <img alt="Family promise logo" onClick={redirectToHome} src={logo} />
        <ul className={styles.navActions}>
          {isLoggedIn && <li onClick={handleLogout}>Logout</li>}
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
