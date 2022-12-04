import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import default_img from '../IMG/codiary_default_img.png'
import getImg from '../utils/ImgUtil';

const SimilarPost = (props) => {

  const simPosts = props.post;
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    simPosts.map(post => {
      const arr = [];
      if(post.posts !== null){
        arr.push(post);
      }
      setPosts(arr)
    })
  }, [simPosts])



  const onErrorImg = (e) => {
    e.target.src = default_img;
  }

  const onClickPost = (user,id) => {
    window.location.replace(`/${user}/${id}`)
  }

    return(
        <Main>
          <h1>이 글과 비슷한 게시물</h1>

          <div className='container'>
            {
              simPosts.map(post => {
                
                // 관련 태그가 있는 경우
                if(post.tag_id>0 && post.posts !== null){

                  const postDate = (post.posts?.updated_at).split(" ")[0]
                  
                  const html = post.posts?.post_body_html
                  const imgStart = html.indexOf('src="') + 5
                  const imgEnd = html.indexOf('"', imgStart)
                  const imgSrc = html.slice(imgStart, imgEnd)

                  return(
                    <Post onClick={() => onClickPost(post.posts?.users.user_detail.user_unique_id ,post.posts?.post_id)}>
                    <div>
                      <h3>{post.posts?.post_title}</h3>

                      <div className='user'>
                        <img src={getImg(post.posts?.users.user_detail.user_img)} alt="사용자 프로필 이미지"/>
                        <span>{post.posts?.users.user_detail.user_unique_id}</span>
                      </div>

                      <p>{postDate}</p>
                    </div>
                    <img src={imgSrc} onError={onErrorImg} alt='게시물 대표 이미지'/>
                  </Post>
                  )
                
                }
                // 관련 태그가 없는 경우
                else if(post.post_id > 0){

                  const postDate = (post.updated_at).split(" ")[0]
                  
                  const html = post.post_body_html
                  const imgStart = html.indexOf('src="') + 5
                  const imgEnd = html.indexOf('"', imgStart)
                  const imgSrc = html.slice(imgStart, imgEnd)

                  return(
                    <Post onClick={() => onClickPost(post.users.user_detail.user_unique_id ,post.post_id)}>
                      <div>
                        <h3>{post.post_title}</h3>

                        <div className='user'>
                          <img src={getImg(post.users.user_detail.user_img)} alt="사용자 프로필 이미지"/>
                          <span>{post.users.user_detail.user_unique_id}</span>
                        </div>

                        <p>{postDate}</p>
                      </div>
                      <img src={imgSrc} onError={onErrorImg} alt='게시물 대표 이미지'/>
                    </Post>
                  )
                }
              })
            }
          </div>
        </Main> 
    )
}
export default SimilarPost;

const Main = styled.div`
  width: 100%;
  margin-bottom: 50px;
  
  h1{
    text-align: center;
    margin-bottom: 30px;
  }

  .container{
    width: 80%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;
  }
`

const Post = styled.div`
  width: 100%;
  height: 250px;
  background-color:var(--gray100);
  display: flex;
  border-radius: 30px;

  box-sizing: border-box;
  padding: 15px;

  >div{
    width: 50%;
    margin-right: 5%;
    height: 100%;
    position: relative;

    .user{
      display: flex;
      width: 100%;

      img{
        height: 30px;
        width: 30px;
        border-radius: 50%;
        margin-right: 10px;
      }
      span{
        line-height: 30px;
        color: var(--gray600);
      }
    }
    >p{
      position: absolute;
      bottom: 0;
      left: 0;
      color: var(--gray600);
    }
  }

  img{
    width: 50%;
    border-radius: 30px;
  }
`