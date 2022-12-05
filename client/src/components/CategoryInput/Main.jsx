import React, { useState } from "react";

const InputMain = (props) => {
  const [value, setValue] = useState(props.value);
  const updateCategory = props.updateCategory;

  const onChangeValue = (e) => {
    setValue(e.target.value)
  }

  const onClickSave = (id, content, sub_id) => {
    updateCategory(id, content, sub_id)
  }

  return (
    <>
      <input
        id={`main_${props.id}`}
        className='maintitle'
        type='text'
        name='maintitle'
        value={value}
        onChange={onChangeValue}></input>

      <button className="btn-save"
        onClick={
          () => onClickSave(props.id, value, props.sub_id)}
      >저장</button>

      {/* <IoChevronDown className='drop-down off'/> */}
    </>

  )
}
export default InputMain;