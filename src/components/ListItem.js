import React from 'react'
import styled from 'styled-components'
import close from '../assets/icon-cross.svg'

const Item = styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: ${props => (props.mood ? '#ffffff' : '#25273c')};
    width: 100%;
    height: 60px;
    color: ${props => (props.mood ? '#25273c' : '#c3c3c3')};
    font-size: 20px;
    padding: 0 20px;
    line-height: 3;
    box-sizing: border-box;

    &:not(:last-child) {
        border-bottom: 1px solid ${props => (props.mood ? '#dbdbdb' : '#4d4e5a')};
    }

    img {
        height: fit-content;
        display: none;
        cursor: pointer;
    }

    &:hover {
        img {
            display: initial;
        }
    }

    div {
        display: flex;
        align-items: center;

        span {
            display: inline-block;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            border: 1px solid #ddd;
            backgroung: ${props => (props.mood ? '#dbdbdb' : '#4d4e5a')};
            margin-right: 20px
        }
    }
    
`;

const ListItem = props => { 
    return (
        <Item mood={props.mood} 
        complete={props.complete}>
            <div>
                <span mood={props.mood} onClick={props.completeHandler}></span>
                {props.text} 
            </div>
            <img src={close} alt='' onClick={props.deleteItem} />
        </Item>
    )
}

export default ListItem;