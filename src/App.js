import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import axios from 'axios'

import moon from './assets/icon-moon.svg'
import sun from './assets/icon-sun.svg'
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
  @media (max-width: 600px) {
    width: 90%
  }
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
    @media (max-width: 600px) {
      font-size: 12px;
    }
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
  color: ${props => (props.mood ? '#25273c' : '#c3c3c3')};
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
  const [active, addActive] = useState([])
  const [complete, addComplete] = useState([])
  const [listArr, addlistArr] = useState(null)
  // const [item, addItem] = useState(null)
  // let listArr = null

  const onKeyUp =(event) => {
    if (event.charCode === 13) {
      axios.post('https://todo-13e9f-default-rtdb.firebaseio.com/list.json', 
      {item : event.target.value, complete: false})
      .then(res => {
        addListText(listText.concat({text: event.target.value, id: res.data.name, complete: false}))
        
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

const deleteCompleted = () => {
  let remain=[]
  for(const key in listArr) {
    if(listArr[key].props.complete=== true) {
      console.log(listArr[key].key)
      axios.delete(`https://todo-13e9f-default-rtdb.firebaseio.com/list/${listArr[key].key}.json`)
      
    }
    if(listArr[key].props.complete=== false) {
      remain.push({text: listArr[key].props.text, id: listArr[key].key, complete: listArr[key].props.complete})
    }
  }
  addListText(remain)
  
}

const activItemHandler = item => {
  
  // let active = [],
  // complete = []
  // for(const key in listText) {
    switch(item) {
      case 1:
      const activeArr = active.map(item => {
        return <ListItem 
        mood={mood} 
        text={item.text} 
        key={item.id} 
        complete={item.complete}
        deleteItem={deleteHandler.bind(this, item.id)} 
        completeItem={completeHandler.bind(this, item.id)}
        />
      })
      addlistArr(activeArr)
      break;
      case 2:
      const completeArr = complete.map(item => {
        return <ListItem 
        mood={mood} 
        text={item.text} 
        key={item.id} 
        complete={item.complete}
        deleteItem={deleteHandler.bind(this, item.id)} 
        completeItem={completeHandler.bind(this, item.id)}
        />
      })
      addlistArr(completeArr)
      break;
      case 3:
        const Arr = listText.map(item => {
          return <ListItem 
          mood={mood} 
          text={item.text} 
          key={item.id} 
          complete={item.complete}
          deleteItem={deleteHandler.bind(this, item.id)} 
          completeItem={completeHandler.bind(this, item.id)}
          />
        })
        addlistArr(Arr)
        break;
        default:
      
        addlistArr(Arr)
  // }
  // if(item) {
  //   addListText(active)
  // } else {
  //   addListText(complete)
  // }

}
}
// const initialData = () => {
//   if(listText) {
//     const Arr = listText.map(item => {
//       return <ListItem 
//       mood={mood} 
//       text={item.text} 
//       key={item.id} 
//       complete={item.complete}
//       deleteItem={deleteHandler.bind(this, item.id)} 
//       completeItem={completeHandler.bind(this, item.id)}
//       />
//     })
//     addlistArr(Arr)
//   }
// }

const getData = () => {
  axios.get('https://todo-13e9f-default-rtdb.firebaseio.com/list.json')
  .then(res => {
    const result = res.data
    const init = [],
    activeItems= [],
    completeItems= []
    for(const key in result) {
      init.push({text:result[key].item, id: key, complete: result[key].complete})
      if(result[key].complete=== false) {
        activeItems.push({text:result[key].item, id: key, complete: result[key].complete})
      }
      if(result[key].complete === true) {
        completeItems.push({text:result[key].item, id: key, complete: result[key].complete})
      }
      addListText(init)
      addActive(activeItems)
      addComplete(completeItems)
      
    }
  }).then(()=>{
    
    
    
  })
  .catch(err => {
    console.log(err)
  })
}

const completeHandler = id => {

  axios.patch(`https://todo-13e9f-default-rtdb.firebaseio.com/list/${id}.json`, {complete: true})
  .then(res=> {
    getData()
  })
  .catch(err=> {
    console.log(err)
  })

  
}



useEffect(()=> {
  getData()
  
},[])

useEffect(()=> {
  const activeItems= [],
  completeItems= []
  for(const key in listText) {
    
    if(listText[key].complete=== false) {
      activeItems.push({text:listText[key].text, id: key, complete: listText[key].complete})
    }
    if(listText[key].complete === true) {
      completeItems.push({text:listText[key].text, id: key, complete: listText[key].complete})
    }
  }
    addActive(activeItems)
    addComplete(completeItems)
    activItemHandler(3)
},[listText, mood])
// useEffect(()=> {
//   if(item) {
    
//   }
  
// },[listText])


// if(listText) {
//   listArr = listText.map(item => {
//     return <ListItem 
//     mood={mood} 
//     text={item.text} 
//     key={item.id} 
//     complete={item.complete}
//     deleteItem={deleteHandler.bind(this, item.id)} 
//     completeItem={completeHandler.bind(this, item.id)}
//     />
//   })
// }
  return (
    <Bg mood={mood}>
      
      <Container>
      <Header>
      <h1>TODO</h1>
      <img src={mood?moon:sun} alt="" onClick={() => setMood(!mood)} />
      </Header>
        <Input type="text" mood={mood} onKeyPress={onKeyUp} placeholder='Create your habit' />
        <UL mood={mood}>
          {listArr}
          <li>
            <span>{listText.filter(item => !item.complete).length} item left</span>
            <span onClick={activItemHandler.bind(this, 3)} >All</span>
            <span onClick={activItemHandler.bind(this, 1)}>Active</span>
            <span onClick={activItemHandler.bind(this, 2)}>Completed</span>
            <span onClick={deleteCompleted}>Clear Completed</span>
          </li>
        </UL>
      </Container>
      
    </Bg>
  );
}

export default App;
