import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IoClose } from "react-icons/io5";
import '../App.css'
import axios from 'axios';
import { personal, user, img } from '../api';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, logout } from "../reducers/Action";


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


const Myinfo = () => {

  const [isLoaded, setLoad] = useState(false);
  const [nameValue, setName] = useState('');
  // 기본 정보
  const [myName, setMyName] = useState({})
  const [myUniqueName, setMyUniqueName] = useState({})
  const [myIntro, setMyIntro] = useState({})
  const [myProfileImg, setMyProfileImg] = useState("")
  const [myProfileImgUrl, setMyProfileImgrul] = useState("")
  const dispatch = useDispatch();
  const nevigate = useNavigate();
  const fileInput = React.createRef();
  // 회원탈퇴(setting에서) 버튼 클릭
  const clickWithdraw = () => {
    setLoad((prev) => !prev)
  }

  /**
   * 내 정보 가져오기
   */
  useEffect(() => {
    const getMyInfoFun = async () => {
      const getMyInfo = await axios.get(
        user.getMyInfo(),
        { withCredentials: true }
      );
      setMyName(getMyInfo.data.result_data.user_detail.user_name);
      setMyUniqueName(getMyInfo.data.result_data.user_detail.user_unique_id);
      setMyIntro(getMyInfo.data.result_data.user_detail.user_introduce);
      setMyProfileImg(getMyInfo.data.result_data.user_detail.user_img);
      setMyProfileImgrul(img.getImg(getMyInfo.data.result_data.user_detail.user_img));

    };
    getMyInfoFun();
  }, []);

  // 내 정보 수정 onChange
  const onChange = (e) => {
    const { id, value } = e.target;
    if (id === "user_nickname") {
      setMyUniqueName(value);
    } else {
      setMyIntro(value);
    }
  }

  // 적용 버튼 클릭 이벤트
  const clickSubmit = async () => {
    // 적어놓은 정보 백엔드에 전달
    if (window.confirm("적용하시겠습니까?")) {
      if (myUniqueName === '' || myIntro === '') {
        alert('빈칸을 모두 채운 후에 적용 버튼을 눌러주세요.');
      } else {
        const changeMyInfo = await axios.patch(user.updateUser(),
          {
            user_unique_id: myUniqueName,
            user_introduce: myIntro,
            user_img: myProfileImg
          },
          {
            withCredentials: true
          })
        setMyName(changeMyInfo.data.result_data.user_detail.user_name)
        setMyUniqueName(changeMyInfo.data.result_data.user_detail.user_unique_id)
        setMyIntro(changeMyInfo.data.result_data.user_detail.user_introduce)
        setMyProfileImg(changeMyInfo.data.result_data.user_detail.user_img)
        setMyProfileImgrul(img.getImg(changeMyInfo.data.result_data.user_detail.user_img));

        dispatch(login(changeMyInfo.data.result_data.user_detail.user_unique_id));

      }
    } else {
      alert("취소합니다.");
      // 취소 이벤트
    }
  }

  // 회원 탈퇴 이름 확인 onChange
  const withdrawNameChange = (e) => {
    setName(e.target.value);
  }

  // 회원탈퇴 확인 버튼
  const realWithdraw = async () => {

    if (nameValue === myName) {   // 백엔드에서 받아온 내 이름 확인
      // 유저 삭제
      await axios.delete(user.deleteUser(), {
        withCredentials: true
      });
      dispatch(logout(""))
      nevigate("/")
    } else {
      alert('이름이 올바르지 않습니다. 다시 확인해주세요.')
    }

  }

  // 회원탈퇴창 취소(닫기)버튼
  const withdrawCancle = () => {
    setLoad(false);
  }

  /**
   * 파일 탐색기 띄우기
   */
  const callFileInput = () => {
    fileInput.current.click();

  }

  /**
   * 이미지 변경
   * 
   * @param {*} e 이벤트 파라미터
   * @returns 
   */
  const changeMyImg = async (e) => {
    const blob = e.target.files[0]
    // blob -> file로 만든 후
    const fileReader = new File([blob], blob.name, {
      type: blob.type,
    });
    const filetype = blob.type.split("/")[1];
    if (
      !["jpg", "jpeg", "png"].includes(filetype)
    ) {
      alert("이미지 파일을 넣어주십시오");
      return;
    }
    // formdata에 삽입
    const formdata = new FormData();
    formdata.append("file", fileReader);
    // axios로 formdata 넣어서 전송
    const imgFile = await axios.post(
      img.createImg(),
      formdata,
      {
        "Content-Type": "multipart/form-data",
      }
    );
    setMyProfileImg(imgFile.data.result_data.fid);
    setMyProfileImgrul(img.getImg(imgFile.data.result_data.fid));
  }


  return (
    <MainWrap>
      <ImgBox onClick={callFileInput}>
        {/* TODO(경민 -> 이묘): 이미지랑 글자 css 적용 */}
        클릭 후 이미지 변경
        <img src={myProfileImgUrl} alt='asdf'></img>
        <input type="file" ref={fileInput} onChange={changeMyImg} style={{ display: "none" }}></input>
      </ImgBox>

      <InputGroup>
        <div className="user-name">
          <p>이름</p>
          <InputField disabled type="text" id="user_name"
            name='user_name'
            onChange={onChange} value={myName}></InputField>
        </div>

        <div className="user-nickname">
          <p>닉네임</p>
          <InputField type="text" id="user_nickname"
            name='user_nickname' placeholder="닉네임을 넣어주세요"
            onChange={onChange} value={myUniqueName}></InputField>
        </div>

        <div className="user-info">
          <p>한줄소개</p>
          <InputField type="text" id="user_info"
            name='user_info' placeholder="나만의 한줄소개를 넣어주세요"
            onChange={onChange} value={myIntro}></InputField>
        </div>
      </InputGroup>

      <Btn type='button' className='withdraw' onClick={clickWithdraw} bottom='10px' right='150px' color='#8a2020' hoverColor='#771313'>회원탈퇴</Btn>
      <Btn className='submit' type='submit' onClick={clickSubmit} bottom='10px' right='0px' color='var(--gray800)' hoverColor='var(--gray900)'>적용</Btn>

      {/* isLoaded가 true가 되어야만 회원 탈퇴 화면이 보임. 회원탈퇴 버튼을 누르면 활성화 */}
      <CheckBox isLoaded={isLoaded}>
        <div>
          <h1>회원탈퇴</h1>
          <IoClose className='btn-cancel' onClick={withdrawCancle} />
          <div>
            <p>회원 탈퇴를 하시면 현재까지 작성된 게시물 및 댓글이 모두 삭제되며, 복구하실 수 없습니다. <br />
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