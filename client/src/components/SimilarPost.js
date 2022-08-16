import React from 'react';
import '../css/SimilarStyle.css';

// 태그같은것들을 인자로 받아야할 듯
const SimilarPost = () => {

    return(
        <div className="similar-wrap">
            <h1>이 글과 비슷한 게시물</h1>

            <div className="thumbnail-wrap">
              <div className="thumbnail"/>
              <div className="thumbnail"/>
              <div className="thumbnail"/>
              <div className="thumbnail"/>
              <div className="thumbnail"/> 
            </div>
        </div>
    )
}
export default SimilarPost;