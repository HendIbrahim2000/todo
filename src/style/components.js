import styled from 'styled-components'
import darkBg from '../assets/bg-desktop-dark.jpg'
import lightBg from '../assets/bg-desktop-light.jpg'

export const Bg = styled.div`
  min-height: 100vh;
  background-image: url(${props => (props.mood ? lightBg : darkBg)});
  background-repeat: no-repeat;
  background-color: ${props => (props.mood ? '#fafafa' : '#181824')};
`

export const Container = styled.div`
  width: 540px;
  margin: auto;
  padding-top: 100px;
  padding-bottom: 100px;
  @media (max-width: 600px) {
    width: 90%
  }
`

export const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: white;

    h1 {
      letter-spacing: 12px;
    }

  img {
    height: fit-content;
    cursor: pointer;
  }
`

export const UL = styled.ul`
list-style:none;
padding: 0;
margin-top: 30px;
border-radius: 6px;
box-shadow: 0 0 6px rgb(0 0 0 / 20%);
overflow: hidden;
background: ${props => (props.mood ? '#ffffff' : '#25273c')};
color: ${props => (props.mood ? '#25273c' : '#c3c3c3')};

li {
  padding: 20px;
  display:flex;
  align-items: center;
  justify-content: space-between;

  span {
    cursor: pointer;
    @media (max-width: 600px) {
      font-size: 12px;
    }
  }
}
`

export const Input = styled.input`
  background: ${props => (props.mood ? '#ffffff' : '#25273c')};
  width: 100%;
  height: 60px;
  border: none;
  border-radius: 6px;
  box-shadow: 0 0 6px rgb(0 0 0 / 50%);
  color: ${props => (props.mood ? '#25273c' : '#c3c3c3')};
  font-size: 20px;
  padding: 0 20px;
  line-height: 3;
  box-sizing: border-box;

  &:focus-visible {
    outline: none;
}
`