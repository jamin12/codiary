import React, { useState } from "react";
import { IoRemove } from "react-icons/io5";


const InputSub = (props) => {

  const [value, setValue] = useState(props.value);
  const save = props.updateCategory;
  const deleteCategory = props.onClickDelete;

  const onChangeValue = (e) => {
    setValue(e.target.value)
  }

  const onClickSave = (id, content, sub_id) => {
    // console.log(save(id, content, sub_id))
    props.updateCategory(id, content, sub_id)
  }

  const onClickDelete = (id) => {
    deleteCategory(id)
  }

  return (
    <>
      <input
        id={`sub_${props.id}`}
        className="input-sub-category"
        type='text'
        name='subtitle'
        value={value}
        onChange={onChangeValue}></input>


      <button className="btn-save"
        onClick={
          () => onClickSave(props.id, value, props.sub_id)}
      >저장</button>

      <IoRemove 
        className='folder-remove' 
        onClick={() => onClickDelete(props.id)}/>

    </>
  )
}
export default InputSub;