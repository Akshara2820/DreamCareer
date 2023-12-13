import React, { useState } from 'react';
import '../App.css'
import styled from 'styled-components';
import ModelBox from './modelBox';


function Header() {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleClick = () => {
    setIsOpen(true);
  };


  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      <Header1>
        <div className="header-section flex justify-end">
          <div className="nav-bar flex flex-wrap gap-6">
            <div>Home</div>
            <div>Jobs</div>
            <div>Notification</div>
            <div>About Us</div>
            <div>
              <button className="button" onClick={handleClick}>Create Job</button>
              {isOpen && <ModelBox isOpen={setIsOpen} onClose={handleClose} />}
            </div>
          </div>
        </div>


      </Header1>

    </>
  )
}

export default Header;
const Header1 = styled.div`
  font-family: "Lexend Deca", sans-serif;
  .header-section{
    @media (max-width: 426px) {
      display: none;
    }
  }
  .nav-bar{
    align-items: center;
    @media (max-width: 426px) {
      display: none;
    }
  }
  .button{
    background-color: var(--primaryColor);
    padding: 15px 20px;
    color: var(--cardColor);
    font-size: 16px;
    font-weight: 700;
    border: none;
    border-radius: 5px;
  }


`