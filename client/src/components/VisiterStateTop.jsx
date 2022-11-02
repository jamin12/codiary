import React from 'react';
import styled from 'styled-components';

import {
	IoPeopleOutline,
	IoPersonOutline,
	IoHeartCircleOutline,
} from "react-icons/io5";

function VisiterStateTop(props) {
  
  const id = props.id;
  const type = props.type;
  const title = props.title;
  const icon = [
    <IoPeopleOutline className="top-icon"/>,
    <IoPersonOutline className="top-icon" />,
    <IoHeartCircleOutline className="top-icon"/>
  ]
  const text = [
    <p>누적 방문자수 TOP</p>,
    <p>일일 방문자수 TOP</p>,
    <p>좋아요수 TOP</p>,
  ]

  const click = (e) => {
    props.setChartPostId(id)
    props.setChartPostTitle(title)
  }

  return (
      <TopPost onClick={click}>
        {icon[type]}
        {text[type]}
        <h4>{title}</h4>
      </TopPost>
  );
}

export default VisiterStateTop;

const TopPost = styled.div`
	width: 30%;
	height: 100%;
	background-color: var(--gray50);
	border-radius: 30px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	transition: 0.2s;
	.top-icon {
		width: 100px;
		height: 100px;
		color: var(--gray600);
	}
	p {
		color: var(--gray600);
	}
	h4 {
		color: var(--gray600);
	}

	:hover {
		background-color: var(--gray100);
		.top-icon {
			color: var(--gray800);
		}
		h4 {
			color: var(--gray800);
		}
	}

	:checked {
		background-color: var(--gray600);
	}
`