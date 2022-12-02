import React,{useState, useEffect} from 'react';
import styled from 'styled-components';
import { IoSearch } from "react-icons/io5";
import axios from 'axios';
import { manage } from '../api';
import { Table } from 'react-bootstrap';

const SettingMember = () => {

	const [searchValue, setSearchValue] = useState("");
	const [pageNum, setPageNum] = useState(0);
	// setPageNum(pageNum-10 또는 +10)
	const [userList, setUserList] = useState([]);

	const onClickSearch = (e) => {
		console.log(e.currentTarget)
	}


	useEffect(() => {
		const getMemberListFun = async() => {
			const getMemberList = await axios.get(manage.getUsers(),
			{
				params:{
					offset: 0,
				},
				withCredentials: true
			},
			);
			setUserList(getMemberList.data.result_data);
		}
		getMemberListFun();
	}, [pageNum]);
	console.log(userList)

  /**
   * user 삭제 onClick 버튼
   */
  const onClickUserDelete = () => {
    alert("유저 삭제 관련 문서화 못찾음")
  }



	return (
		<Main>
			<Table hover>
				<Thead>
					<tr>
						<th>회원 번호</th>
						<th>닉네임</th>
						<th className='search-wrap'>					
							<input
								type="text"
								value={searchValue}
                placeholder="SEARCH"
								onChange={(e) => setSearchValue(e.target.value)}
							/>
					    <button className='btn-search'
					    	onClick={(e) => onClickSearch(e)}>
					    		<IoSearch/>
					    </button>
            </th>
					</tr>
				</Thead>

				<Tbody>
						{userList.map((user, index) => {
							return(
								<tr key={index}>
									<td className='user-num'>{index}</td>
									<td>{user.user_detail?.user_unique_id}</td>
									<td>
										<button className='btn-user-delete'
                    onClick={() => onClickUserDelete()}>
											삭제
										</button>
									</td>
								</tr>
							)
						})}
				</Tbody>
			</Table>
		</Main>
	);
};

export default SettingMember;

const Main = styled.div`
    width: 100%;
    height: 100%;
		
		.header{
			width: 100%;
			height: 10%;
			display: flex;
		}
`

const Thead = styled.thead`
	tr{
		th{
      text-align: center;
      :nth-child(1){
        width: 20%;
        text-align: left;
      }
      :nth-last-child(){
        width: 20%;
      }
			:nth-child(2){
        width: 60%;
			}
		}
    .search-wrap{
      display: flex;
      justify-content: center;

      input{
        width: 80%;
        border: 2px solid var(--gray400);
        border-radius: 10px 0 0 10px;
        box-sizing: border-box;
        padding-left: 10px;
        :focus{ outline: none;}
      }

      button{
        background-color: inherit;
        width: 20%;
        border: 2px solid var(--gray400);
        border-left: none;
        border-radius: 0 10px 10px 0;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: 0.2s;
        :hover{
          background-color: var(--gray50);
        }
        :active{
          background-color: var(--gray100);
        }
      }
    }
	}

`

const Tbody = styled.tbody`

  overflow-y: scroll;

  .user-num{
    text-align: left;
  }

  td{
    height: 100%;
    span{
      background-color: red;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      line-height: 20px;
    }
  }

  td:last-child{
    display: flex;
    justify-content: right;
  }
  .btn-user-delete{
    padding: 3px 10%;
    border: 2px solid var(--gray500);
    display: flex;
    transition: 0.2s;

    :hover{
      background-color: var(--gray600);
      color: var(--gray50);
    }

    :active{
      background-color: var(--gray900);
    }
  }
`