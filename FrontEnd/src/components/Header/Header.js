import React from 'react';
import logo from './../../assets/logo.svg';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  // For navigation:
  const navigate = useNavigate();
  return (
    <div className="max-w-fit">
      {
        //   Logo
      }
      <button data-title="Egypt" onClick={() => navigate('/')}>
        <img
          src={logo}
          alt="nagwa logo"
          className="h-fit w-[10.1rem] mt-[1.35rem]"
        />
      </button>
    </div>
  );
};

export default Header;
