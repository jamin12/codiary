import React, { useEffect } from "react";
import styled from "styled-components";
import "../css/reset.css";
import { IoClose } from "react-icons/io5";
import { auth } from "../api/index";
import axios from "axios";

const Login = ({ setLogin }) => {

	/**
	 * 모달 취소버튼 onClick
	 */
	const closeModal = () => {
		setLogin(false);
	}

	/**
	 * 구글 로그인 버튼 onClick
	 */
	const loginGoogle = () => {
		alert('로그인 기능 추가해야함')
	}

	useEffect(() => {
		document.body.style.cssText = `
		position: fixed; 
		top: -${window.scrollY}px;
		overflow-y: none;
		width: 100%;`;
		return () => {
			const scrollY = document.body.style.top;
			document.body.style.cssText = '';
			window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
		};
	}, []);

	return (
		<MainWrap>
			<div>
				<h4 onClick={closeModal}>
					<IoClose></IoClose>
				</h4>

				<TextBox>
					<h1>CODIARY</h1>
					<p>소셜 로그인하기</p>
				</TextBox>

				<LoginBtn>
					<a href="/auth/login">구글 로그인</a>
					<img src="img/google-logo.png" alt="구글 로그인" />
				</LoginBtn>
			</div>
		</MainWrap>
	);
};
export default Login;

const MainWrap = styled.div`
	background-color: rgba(22, 22, 22, 0.5);
	width: 100%;
	height: 100vh;
	z-index: 999;
	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed;
    top: 0;
    left: 0;

	> div {
		background-color: var(--gray50);
		width: 40%;
		height: 300px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		border-radius: 50px;
		position: relative;

		h4 {
			position: absolute;
			top: 15px;
			right: 25px;
			font-size: 30px;
			text-align: center;
			align-items: center;
			color: var(--gray400);
			transition: 0.2s;
			cursor: pointer;

			:hover {
				color: var(--gray600);
			}
		}
	}

	h1 {
		color: var(--gray800);
	}
	p {
		color: var(--gray600);
	}
`;

const TextBox = styled.div`
	text-align: center;
`;

const LoginBtn = styled.div`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    border: 2px solid var(--gray200);
    margin-top: 40px;
    > img{
        width:100%;
        height:100%;
        cursor:pointer;
    }
`
