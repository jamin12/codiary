import React from 'react';

// 태그같은것들을 인자로 받아야할 듯
const SimilarPost = () => {

    return(
        <>
            <h1>이 글과 비슷한 게시물</h1>
            <hr></hr>

            <div style={{display: 'flex', width: '100%'}}>
                <div style={{width: '300px', height: '200px', backgroundColor: 'red', margin:'20px'}}/>
                <div style={{width: '300px', height: '200px', backgroundColor: 'red', margin:'20px'}}/>
                <div style={{width: '300px', height: '200px', backgroundColor: 'red', margin:'20px'}}/>
                <div style={{width: '300px', height: '200px', backgroundColor: 'red', margin:'20px'}}/>
                <div style={{width: '300px', height: '200px', backgroundColor: 'red', margin:'20px'}}/>
            </div>
        </>
    )
}
export default SimilarPost;