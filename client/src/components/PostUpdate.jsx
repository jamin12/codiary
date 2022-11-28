import React, {useState} from "react";
import styled from "styled-components";

const PostUpdate = (props) => {

    const thisId = props.id
    const update = props.update;

    const [inputValue, setInputValue] = useState(props.content);

    const onChangeValue = (e) => {
        setInputValue(e.target.value)
    }
    const onClickSave = (thisId, inputValue) => {
        update(thisId, inputValue)
    }

    return (
        <Main id={`update_${thisId}`}>
            <textarea
            value={inputValue}
            onChange={onChangeValue}>
            </textarea>

            <button
            onClick={() => onClickSave(thisId, inputValue)}>
                저장
            </button>
        
        </Main>
        // <p>{thisId}</p>
    )
}
export default PostUpdate;

const Main = styled.div`
    width: 95%;
    height: 80px;
    float: right;

    textarea{
        width: 100%;
        border-radius: 10px;
        box-sizing: border-box;
        padding: 3px 5px;
        border: 2px solid var(--gray400);

        outline: none;
    }


    button {
		/* margin-top: 5px; */
		/* TODO(이묘): 버튼 우측정렬 나중에 해결할 것 */
		float: right;
		padding: 2px 15px;
		width: 10%;
		border: 2px solid var(--gray400);
		border-radius: 10px;
		transition: 0.3s;

		:hover{
			color: var(--gray100);
			background-color: var(--gray500);
		}
	}
`