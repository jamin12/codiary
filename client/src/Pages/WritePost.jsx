import React, { useRef } from "react";
import styled from "styled-components";

// TOAST UI Editor
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
// Toast ColorSyntax 플러그인
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
// 한국어 플러그인
import '@toast-ui/editor/dist/i18n/ko-kr';

import SearchProfile from "../components/SearchProfile";
import MessageBox from "../components/MessageBox";
import { useState } from "react";


//css

const WriteWrap = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--gray50);
`
const WriteBox = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--gray200);
`
const BtnWrap = styled.div`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 250px;
  height: 30px;
  display: flex;
  justify-content: space-between;

  button{
    width: 45%;
    height: 100%;
    border: none;
    background-color: var(--gray200);
    color: var(--gray900);
    transition: 0.2s;
    box-shadow: 0px 5px 10px 0px var(--gray400);
    :hover{
      background-color: var(--gray600);
      color: var(--gray50);
    }
  }
`



const WritePost = () => {

  const [modal, setModal] = useState(false);


  const editorRef = useRef();
  // editorRef.current().getInstance()의 형식으로 에디터의 설정값들을 갖고 올 수 있음

  // 각각 html, 마크다운 형태로 가져올 수 있음
  const toHTML = editorRef.current?.getInstance().getHTML()
  const toMARKDOWN = editorRef.current?.getInstance().getMarkdown()


  const onClickSave = () => {
    console.log(toHTML)
    console.log(toMARKDOWN)
    // 서버에 toHTML과 toMARKDOWN 전송
    setModal(true);
    // console.log(modal)
  }
  const onClickPresave = () => {
    // 서버에 임시저장 파일로 전송
    alert('서버에 임시저장 파일 전송 기능 추가 필요')
  }

  return(
    <div style={{height:'100vh', scrollbarWidth:'none'}}>


      {/* header */}
      <SearchProfile/>

      <WriteWrap>
        <WriteBox>
            <Editor
              ref={editorRef} // DOM 선택용 useRef
              initialValue = 'Hello World!' // 임시 내용
              previewStyle='vertical' // 미리보기 스타일
              height='100%'
              className='codeMirror-editor'
              initialEditType='markdown'  // 처음 언어 설정을 마크다운으로 설정
              useCommandShortcut={false}  // 키보드 입력 컨트롤 방지
              hideModeSwitch= {true}// 한 가지 타입(마크다운)만 사용하고싶으면 설정
              plugins={[colorSyntax]}
              language="ko-KR"
              toolbarItems={[
                ['heading', 'bold', 'italic', 'strike'],
                ['hr', 'quote'],
                ['ul', 'ol', 'task', 'indent', 'outdent'],
                ['table', 'image', 'link'],
                ['code', 'codeblock'],
                [{
                  name:'compiler',
                  tooltip: '코드 컴파일러',
                  command: '!~~!',
                  text: '⚙️',
                  className: 'btn-code-compiler',
                  styled: {
                    fontSize: '20px'
                  },
                  state: 'compiler'
                }, 'scrollSync']
              ]}
            />
        </WriteBox>

        <BtnWrap>
          <button type="button" onClick={onClickPresave}>임시저장</button>
          <button type="submit" onClick={onClickSave}>저장</button>
        </BtnWrap>
      </WriteWrap>

      
      {/* messageBox */}
      <MessageBox visible='true'/>

    </div>

  )
}
export default WritePost;