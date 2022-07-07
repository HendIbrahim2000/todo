import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import axios from 'axios'

import moon from './assets/icon-moon.svg'
import darkBg from './assets/bg-desktop-dark.jpg'
import lightBg from './assets/bg-desktop-light.jpg'

import ListItem from './components/ListItem'

const Bg = styled.div`
  min-height: 100vh;
  background-image: url(${props => (props.mood ? lightBg : darkBg)});
  background-repeat: no-repeat;
  background-color: ${props => (props.mood ? '#fafafa' : '#181824')};
`

const Container = styled.div`
  width: 540px;
  margin: auto;
  padding-top: 100px;
  padding-bottom: 100px;
`

const Header = styled.div`
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

const UL = styled.ul`
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
  }
}
`

const Input = styled.input`
  background: ${props => (props.mood ? '#ffffff' : '#25273c')};
  width: 100%;
  height: 60px;
  border: none;
  border-radius: 6px;
  box-shadow: 0 0 6px rgb(0 0 0 / 50%);
  color: ${props => (props.mood ? '#25273c' : '#c3c3c3')};;
  font-size: 20px;
  padding: 0 20px;
  line-height: 3;
  box-sizing: border-box;

  &:focus-visible {
    outline: none;
}
`

const App = () => {

  const [mood, setMood] = useState(false)
  const [listText, addListText] = useState([])
  // const [item, addItem] = useState(null)
  

  const onKeyUp =(event) => {
    if (event.charCode === 13) {
      axios.post('https://todo-13e9f-default-rtdb.firebaseio.com/list.json', {item : event.target.value, active: true})
      .then(res => {
        addListText(listText.concat({text: event.target.value, id: res.data.name}))
        
      }).then(()=>{
        event.target.value = ''
      })
      .catch(err => {
        console.log(err)
      })
      
      // addItem(event.target.value)
      // event.target.value = ''
    }
}

const deleteHandler = id => {
    
  axios.delete(`https://todo-13e9f-default-rtdb.firebaseio.com/list/${id}.json`)
  .then(res => {
    addListText(listText.filter((item) => item.id !== id))
  })
} 



useEffect(()=> {
    axios.get('https://todo-13e9f-default-rtdb.firebaseio.com/list.json')
    .then(res => {
      const result = res.data
      const init = []
      for(const key in result) {
        init.push({text:result[key].item, id: key, active: result[key].active})
        addListText(init)
      }
    })
    .catch(err => {
      console.log(err)
    })
  
},[])



// useEffect(()=> {
//   if(item) {
    
//   }
  
// },[listText])
let listArr = null

if(listText) {
  listArr = listText.map(item => {
    return <ListItem mood={mood} text={item.text} key={item.id} deleteItem={deleteHandler.bind(this, item.id)} />
  })
}
  return (
    <Bg mood={mood}>
      
      <Container>
      <Header>
      <h1>TODO</h1>
      <img src={moon} alt="" onClick={() => setMood(!mood)} />
      </Header>
        <Input type="text" mood={mood} onKeyPress={onKeyUp} placeholder='Create your habit' />
        <UL mood={mood}>
          {listArr}
          <li>
            <span>{listText.length} item left</span>
            <span>All</span>
            <span>Active</span>
            <span>Completed</span>
            <span>Clear Completed</span>
          </li>
        </UL>
      </Container>
      
    </Bg>
  );
}

export default App;
