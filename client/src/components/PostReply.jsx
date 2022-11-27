import React, {useState} from "react";
import styled from "styled-components";
import { IoClose } from "react-icons/io5";

const PostReply = (props) => {
    const visible = props.ReplyVisible;
    const save = props.save;
    const id = props.id;
    // const onClickReplyCancle = props.onClickReplyCancle;
    const [replyValue, setReplyValue] = useState(props.input);


    const onChangeInputReply = (e) => {
        setReplyValue(e.target.value);
    }

    const onClickReplyCancle = (e) => {
        const id = (e.currentTarget.id).split("_")[1] + "_" + (e.currentTarget.id).split("_")[2]
		document.getElementById(`${id}`).style.display = 'none';
        setReplyValue("")
    }

    const onClickReplySave = (e) => {
        save(replyValue, Number((e.target.id).split("_")[1]))
        setReplyValue("")
    		document.getElementById(`${id}`).style.display = 'none';
    }

    return(
    <InputReplyBox visible={visible} id={id}>
    <div className='input-wrap'>
                            <button onClick={(e) => onClickReplyCancle(e)}
                                id={`btn_${id}`}
                                className='btn-cancel'>
                                    <IoClose className="icon"/>
                            </button>
      <textarea
        className="input-reply"
        placeholder="답글을 입력하세요"
        value={replyValue}
        onChange={(e) => onChangeInputReply(e)}
      ></textarea>
    </div>
    <button id={id} onClick={(e) => onClickReplySave(e)}>저장</button>
  </InputReplyBox>
    )
}
export default PostReply;

// 덧글 입력
const InputReplyBox = styled.div`
  display: none;
	flex-direction: column;
  width: 100%;
	/* background-color: red; */

  .input-wrap{
    display: flex;

    .btn-cancel{
      width: 20px;
      height: 30px;
      cursor: pointer;
      color: var(--gray400);
      transition: 0.3s;
	    border: none;
      border-radius: 0;
      position: relative;
      background-color: inherit;

        .icon{
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
        }

      :hover{
        color: var(--gray600);
      }
    }
		.input-reply {
			width: 100%;
			height: 80px;
			resize: none;
			margin: 0;
			border: 2px solid var(--gray200);
			border-radius: 10px;
			box-sizing: border-box;
			padding: 5px;
			
			:focus {
				outline: none;
			}
		}
  }

	button {
		margin-top: 5px;
		/* TODO(이묘): 버튼 우측정렬 나중에 해결할 것 */
		/* float: right; */
		padding: 2px 15px;
		width: 20%;
		border: 2px solid var(--gray400);
		border-radius: 10px;
		transition: 0.3s;

		:hover{
			color: var(--gray100);
			background-color: var(--gray500);
		}
	}
`;