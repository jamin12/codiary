import React, { useState } from 'react';
import { DateRange } from 'react-date-range';
import styled from 'styled-components';
import { IoClose } from "react-icons/io5";
import ko from 'date-fns/locale/ko';

import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

const Datepicker = (props) => {

	const setShowCalender = props.setShowCalender;

	const onClickCloseCalender = () => {
		setShowCalender(false);
	}

	return(
		<Main>

			<button className='btn-calender-close'
			onClick={onClickCloseCalender}>
				<IoClose className='x-mark'/>
			</button>

			<DateRange
				editableDateInputs={true}
				onChange={item => props.setState([item.selection])}
				moveRangeOnFirstSelection={false}
				ranges={props.state}
				months={1}

				locale={ko}
			/>
		</Main>
	)
}

const Main = styled.div`
	box-sizing: border-box;
	position: absolute;
  box-shadow: 5px 5px 5px 5px var(--gray500);
	right: 0;
	top: 1rem;

	/* 닫기버튼 */
	.btn-calender-close{
		border: none;
		width: 25px;
		height: 25px;
		display: flex;
		justify-content: center;
		align-items: center;

		position: absolute;
		
		.x-mark{
			color: var(--gray600);
			transition: 0.2s;
			z-index: 999;
			font-size: 1.2rem;
		}

		:hover .x-mark{
			color: var(--gray800);
		}
		:active .x-mark{
			color: var(--gray900);
		}
	}

	/* 캘린더 */
	.rdrDateDisplayWrapper{
		display: none;
	}
	.rdrCalendarWrapper{
		position: relative;
		.rdrMonthAndYearWrapper{
			margin-top: 10px;
		}
	}
`

export default Datepicker;