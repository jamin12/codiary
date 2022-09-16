import React, { useState } from 'react';
import styled from 'styled-components';
import { IoClose } from "react-icons/io5";
import '../App.css'

// 글자를 입력하면 하나씩 밖에 입력되는 현상 해결해야함.

const InputField = styled.input`
  width: 100%;
  padding-left: 10px;
  padding-right: 10px;
  border: none;
  box-sizing: border-box;
  background-color: transparent;
  overflow: hidden;
`

const Myinfo = () => {
  // css
  const MainWrap = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    float: left;
  `
  const ImgBox = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 221px;
    height: 204px;
    background-color: var(--gray100);
    box-sizing: border-box;
    border: 1px solid var(--gray900);
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: 0.89rem;
    
    @media screen and (max-width: 1300px) {
      width: 201px;
      height: 184px;
    }
  `
  const InputGroup = styled.div`
  div{
    display: flex;
    position: absolute;
    width: calc(100% - 250px);
    height: 56px;
    overflow: hidden;
    background-color: white;

    border-radius: 10px;
    border: 2px solid var(--gray200);
    box-sizing: border-box;
    font-size: 1.2rem;

    @media screen and (max-width: 1300px){
      height: 44px;
      font-size: 1rem;
    }

    p{
      background-color: var(--gray200);
      color: var(--gray600);
      display: flex;
      align-items: center;
      
      padding: 10px 20px;
      font-size: 1rem;
    }
  }
  .user-name{
    top: 10px;
    right: 0;
    p{
      min-width: 32px;
    }
  }
  .user-nickname{
    top: 120px;
    right: 0;
    p{
      min-width: 45px;
    }
  }
  .user-info{
    top: 250px;
    left: 0;
    width: 100%;
    p{
      min-width: 60px;
    }

    @media screen and (max-width: 1600px) {
      top: 230px;
      width: 100%;
    }
  }
`
  const Btn = styled.button`
    position: absolute;
    width: 130px;
    height: 40px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    transition: 0.3s;
    display: flex;
    justify-content: center;
    align-items: center;

    bottom: ${props => props.bottom};
    right: ${props => props.right};
    background-color: ${props => props.color};
    color: #fff;
    :hover{
    background-color: ${props => props.hoverColor};
    }
  `
  const CheckBox = styled.div`
    position: fixed;
    z-index: 999;
    display: ${props => (!props.isLoaded ? 'none' : 'flex')};
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,10,0.7);

    >div{
      position: relative;
      display: flex;
      flex-direction: column;
      margin:0 auto;
      margin-top: 10%;
      width: 40%;
      height: 40%;
      background-color: var(--gray100);
      border-radius: 12px;
      justify-content: space-between;
      padding: 20px;

      h1{
        text-align: center;
      }
      p{
        text-align: center;
        margin: -20px auto 20px auto;
        line-height: 2.5rem;
        color: #d06565;
      }

      .btn-cancel{
        position: absolute;
        top: 20px;
        right: 20px;
        font-size: 2.5rem;
        color: var(--gray600);
        cursor: pointer;
      }

      input{
        border-radius: 50px;
        padding: 5px 10px;
        width: 50%;
        margin: 10px auto;
      }
      div{
        width: 100%;
        display: flex;
        flex-direction: column;
        margin: 0 auto;
      }
    }
  `
  const BtnWithdraw = styled.button`
    background-color: #8a2020;
    color: #fff;
    width: 140px;
    height: 40px;
    border: none;
    border-radius: 12px;
    margin: 0 auto;

    :hover{
      background-color:#771313;
    }
  `
  // css End

  const [isLoaded, setLoad] = useState(false);
  const [nameValue, setName] = useState('');
  // 기본 정보
  const [inputInfo, setInfo] = useState({
    user_name: "임효현",  // 백엔드에서 받아온 기본 정보를 넣어줌
    nick_name: "",  
    info_line: ""
  })
  // 내 이름
  const MyName = '이묘';
  const {user_name, user_nickname, user_info} = inputInfo;

  const clickWithdraw = () => {
    setLoad((prev) => !prev)
  }

  const onChange = (e) => {
    const {name, value} = e.target;
    const nextInputs = {
      ...inputInfo,
      [name]: value
    };
    setInfo(nextInputs);
  }

  const clickSubmit = () =>{
    // 적어놓은 정보 백엔드에 전달
    if(window.confirm("적용하시겠습니까?")) {
      if(user_nickname==='' || user_info===''){
        alert('빈칸을 모두 채운 후에 적용 버튼을 눌러주세요.');
      }else{
        alert("적용되었습니다.");
        // 백엔드에 정보 전달
      }
    } else {
      alert("취소합니다.");
      // 취소 이벤트
    }
  }

  const withdrawNameChange = (e) => {
    setName(e.target.value);
  }

  const realWithdraw = () => {
    if(nameValue === MyName){   // 백엔드에서 받아온 내 이름 확인
      alert('계정이 삭제되었습니다');
      // 백엔드로 계정 삭제 요청
      // codiary 메인화면으로 이동
    }else{
      alert('이름이 올바르지 않습니다. 다시 확인해주세요.')
    }
  }

  const withdrawCancle = () => {
    setLoad(false);
  }




  return (
    <MainWrap>
      <ImgBox> 클릭해서 <br/> 이미지 변경 </ImgBox>

      <InputGroup>
        <div className="user-name">
          <p>이름</p>
          <InputField disabled type="text" id="user_name" 
            name='user_name'
            onChange={onChange} value={user_name}></InputField>
        </div>

        <div className="user-nickname">
          <p>닉네임</p>
          <InputField type="text" id="user_nickname" 
            name='user_nickname' placeholder="이묘"
            onChange={onChange} value={user_nickname}></InputField>
        </div>

        <div className="user-info">
          <p>한줄소개</p>
          <InputField type="text" id="user_info" 
            name='user_info' placeholder="프론트엔드 개발자가 될거야"
            onChange={onChange} value={user_info}></InputField>
        </div>
      </InputGroup>

      <Btn type='button' className='withdraw' onClick={clickWithdraw} bottom='10px' right='150px' color='#8a2020' hoverColor='#771313'>회원탈퇴</Btn>
      <Btn className='submit' type='submit' onClick={clickSubmit} bottom='10px' right='0px' color='var(--gray800)' hoverColor='var(--gray900)'>적용</Btn>

      {/* isLoaded가 true가 되어야만 회원 탈퇴 화면이 보임. 회원탈퇴 버튼을 누르면 활성화 */}
      <CheckBox isLoaded={isLoaded}>
        <div>
          <h1>회원탈퇴</h1>
          <IoClose className='btn-cancel' onClick={withdrawCancle}/>
          <div>
            <p>회원 탈퇴를 하시면 현재까지 작성된 게시물 및 댓글이 모두 삭제되며, 복구하실 수 없습니다. <br/>
              위 사항을 확인하신 후, 탈퇴를 원하시면 가입하실 때 입력하신 성함을 입력해주세요.
            </p>
            <input type='text' className='withdraw-name' 
              onChange={withdrawNameChange} value={nameValue}></input>
          </div>
          <BtnWithdraw onClick={realWithdraw}>회원탈퇴</BtnWithdraw>
        </div>
      </CheckBox>
    </MainWrap>
  )
}

export default Myinfo;