import React, {useState, useEffect} from 'react'

import {Bg, Container, Header, UL, Input} from './style/components'
import axios from 'axios'

import moon from './assets/icon-moon.svg'
import sun from './assets/icon-sun.svg'


import ListItem from './components/ListItem'





const App = () => {

  const [mood, setMood] = useState(false)
  const [listText, addListText] = useState([])
  const [active, addActive] = useState([])
  const [complete, addComplete] = useState([])
  const [listArr, addlistArr] = useState(null)

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
    if(listArr[key].props.item.complete=== true) {
      axios.delete(`https://todo-13e9f-default-rtdb.firebaseio.com/list/${listArr[key].key}.json`)
      
    }
    if(listArr[key].props.item.complete=== false) {
      remain.push({text: listArr[key].props.item.text, id: listArr[key].key, complete: listArr[key].props.item.complete})
    }
  }
  addListText(remain)
  
}

const activItemHandler = item => {
  
    switch(item) {
      case 1:
      const activeArr = active.map(item => {
        return <ListItem 
        mood={mood} 
        key={item.id} 
        item={item}
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
        key={item.id} 
        item={item}
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
          text={item} 
          key={item.id} 
          item={item}
          deleteItem={deleteHandler.bind(this, item.id)} 
          completeItem={completeHandler.bind(this, item.id)}
          />
        })
        addlistArr(Arr)
        break;
        default:
      
        addlistArr(Arr)

}
}


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
