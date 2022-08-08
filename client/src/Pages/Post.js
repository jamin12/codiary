import React from 'react';

import '../css/PostStyle.css';

import SearchProfile from '../components/SearchProfile';
import SimilarPost from '../components/SimilarPost';

const WritePage = () => {

    return (
        <>
            <SearchProfile/>

            <div className="wrap">

              {/* 카테고리창 - sticky 이용 */}
              <div className="category-box sticky-box">
                <h3>사용자's CODIARY</h3>
                <div className="category">
                카테고리명
                  <ul>
                    <li>Category 1</li>
                    <li>Category 1</li>
                    <li>Category 1</li>
                    <li>Category 1</li>
                  </ul>
                </div>
              </div>

              {/* subtitle창 - sticky 이용 */}
              <div className="subtitle-box sticky-box">
                <ul>
                  <li>Subtitle</li>
                  <li>What is Lorem Ipsum?</li>
                  <li>Why do we use it?</li>
                </ul>
              </div>

              <div className='content-wrap-box inner-width'>
                {/* 제목 및 헤더 */}
                <div className="header-box">
                  <span className="write-data-box">
                    <p className="userName">user1</p>
                    <p className="writeDate">2022.01.01</p>
                  </span>
                  <h1 className="title">TITLES</h1>
                  <span className="cor-del-box">
                    <p>수정</p>
                    /
                    <p>삭제</p>
                  </span>
                  {/* <hr/> */}
                </div>

                {/* 본문내용 */}
                <div className="content-box">
                  <h3 className="sub-title">SubTitle</h3>
                  <p>일단 뭔가를 적어야하니까 적어보겟읍니다.</p>
                  <h3 className="sub-title">What is Lorem Ipsum?</h3>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
                    The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.</p>
                  <h3 className="sub-title">Why do we use it?</h3>
                  <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
                </div>

                {/* 태그 & 방문자수 */}
                <div className="tag-visite-wrap">
                  <div className="tag-box">
                    <p>TAG</p>
                    <p>머시깽이머시깽이</p>
                  </div>

                  <div className="visite-box">
                    <div className="total-visite">
                      <ion-icon name="people-outline"></ion-icon>
                      200
                    </div>
                    <div className="today-visite">
                      <ion-icon name="people-outline"></ion-icon>
                      23
                    </div>
                    <div className="like-good">
                      <label for="good"><ion-icon name="heart-outline"></ion-icon></label>
                      <input type="checkbox" id="good"/>
                        {/* <ion-icon name="heart"></ion-icon> */}
                      <p>20</p>
                    </div>
                  </div>
                </div>

                {/* 댓글 */}
                <div className="comment-box">
                  <div className="comment-profile-box">
                    <img src='' alt=''></img>
                    <p>user2</p>
                  </div>
                  <p className="comment-text-box">너무 도움이 많이 되었어요~ 감사합니다^^ <br/> 번창하세요!~!~ <br/> 일단 글자를 한 번 ㅈㄴ 길게 적어봐야할 것 같아서 한 번test문자 넣어봄 It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
                  <div className="comment-date-reply-box">
                    <p className="btn-reply">답글쓰기</p>
                    <p className="comment-date">2022.02.02 12:12</p>
                  </div>
                </div>

                {/* 덧글 */}
                <div className="reply-box">
                  <div className="comment-profile-box">
                    <img src='' alt=''></img>
                    <p>user2</p>
                  </div>
                  <p className="comment-text-box">너무 도움이 많이 되었어요~ 감사합니다^^ <br/> 번창하세요!~!~</p>
                  <div className="comment-date-reply-box">
                    <p className="btn-reply">답글쓰기</p>
                    <p className="comment-date">2022.02.02 12:12</p>
                  </div>
                </div>

              </div>
              


            </div>

            {/* 비슷한 게시물 props로 태그같은거 보내야함 */}
            <SimilarPost/>

        </>

    )

}
export default WritePage;