import React, {useState} from "react";
import styled from "styled-components";

import { IoPeopleOutline, IoPersonOutline, IoHeartCircleOutline } from "react-icons/io5";


const MainWrap = styled.div`
    width: 90%;
    height: 170px;
    background-color: var(--gray50);
    margin: 0 auto;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 20px 0;
    transition: 0.2s;
    cursor: pointer;

    h3, p, .tag-box{
        margin-left: 20px;
    }
    p{
        font-size: 13px;
    }

    :hover{
        background-color: var(--gray200);
    }
`
const CountWrap = styled.div`
    display: flex;
    width: 85%;
    height: 40px;
    margin: 0 auto;
    justify-content: space-between;

    .count-box{
        height: 100%;
        display: flex;
        align-items: center;
        width: 20%;
        justify-content: space-between;

        .icon{
        height: 100%;
        width: 30px;
        }
        span{
            font-size: 20px;
        }
    }


`

const StatePost = (props) => {

    const postId = props.id;

    const title = props.title;
    const date = props.date;
    const totalVisiter = props.totalVisiter;
    const todayVisiter = props.todayVisiter;
    const good = props.good;

    return(
        <MainWrap>
            <div>
                <h3>{title}</h3>
                <p>{date}</p>
            </div>
            

            <CountWrap>
                <div className="count-box">
                    <IoPeopleOutline className="icon"/>
                    <span>{totalVisiter}</span>
                </div>
                <div className="count-box">
                    <IoPersonOutline className="icon"/>
                    <span>{todayVisiter}</span>
                </div>
                <div className="count-box">
                    <IoHeartCircleOutline className="icon"/>
                    <span>{good}</span>
                </div>
            </CountWrap>
              {/* tags.map(tag => (<p className="tag-item" onClick={deleteList}>{tag}</p>)) */}

        </MainWrap>
    )
}
export default StatePost;