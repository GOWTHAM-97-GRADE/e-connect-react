import React from 'react';
import styled from 'styled-components';
import GlobalStyle from './Clubs';

const prof_pic = {
  borderRadius: '50%',
  width: '250px',
  height: '250px',
  margin: '20px 40px',
  border: '2px solid #fff',
  boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)'
};

const Header = styled.div`
  display: flex;
  padding: 20px 40px;
`;

const WelcomeContainer = styled.div`
  display: flex;
`;

const TextContainer = styled.div`
  margin: 40px 20px;
`;

const HeaderItem = styled.div`
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 0px;
  font-size: 18px;
  font-family: 'Arial', sans-serif;
  font-weight: bold;
`;

const Messenger = styled.div`
  display: flex;
  padding: 40px;
`;



const Connect = () => {
  return (
    <div>
      <Header>
        <HeaderItem>User Profile</HeaderItem>
        <HeaderItem>My Posts</HeaderItem>
        <HeaderItem>Friends</HeaderItem>
        <HeaderItem>Communities</HeaderItem>
      </Header>
      <WelcomeContainer>
        <img
          src={require('../Asserts/C_pro.jpg')}
          alt="PSG iTech Logo"
          style={prof_pic}
        />
        <TextContainer>
          <h1 style={{ fontSize: '40px' }}>Connect +</h1>
          <h1 style={{ fontSize: '18px', fontWeight: 'normal' }}>Welcome Nick!</h1>
        </TextContainer>
      </WelcomeContainer>
      
    </div>
  );
}

export default Connect;
