# mainpage(url prefix = /main)

## __<span style="color:#9999ff">인기 게시글 조회</span>__
## __<span style="color:#ff9933">요청</span>__ **[GET] /?offset=1&limit=10** 
- |속성|타입|설명|
    |---|---|---|
    |offet *|int|페이지 번호 (필수)|
    |limit|int|한번에 가져올 개수|
## __<span style="color:#ff9933">응답</span>__
- ``` json
    {
        "status": 200,
        "message": "getPopularContents",
        "result_data": [
            {
                "post_id": 9,
                "post_title": "test9",
                "post_body_md": null,
                "post_body_html": null,
                "post_txt": "123",
                "created_at": "2022-08-15 12:12",
                "updated_at": "2022-08-15 12:12",
                "users": {
                    "user_email": "kmeoung@gmail.com",
                    "user_detail": {
                        "user_name": "test2",
                        "user_unique_id": "11f7d65e-720e-45e1-82ef-d16b001585de",
                        "user_nickname": "",
                        "user_img": "https://lh3.googleusercontent.com/a/AItbvmkcEhowVpW6ELAAfVG8ZxJH90ca4GQT0ghVaVpi380=s96-c"
                    }
                }
            }
        ]
    }
- |속성|타입|설명|
    |---|---|---|
    |status|int|상태코드|
    |message|string|메시지|
    |post_id|string|게시물 아이디|
    |post_title|string|게시물 제목|
    |post_body_md|string|게시물 md 텍스트|
    |post_body_html|string|게시물 html 텍스트|
    |post_txt|string|게시물 태그를 제외한 텍스트|
    |user_email|string|유저 이메일|
    |user_name|string|유저 이름|
    |user_unique_id|string|유저 유니크 아이디|
    |user_nickname|string|유저 닉네임|
    |user_img|string|유저 이미지 url|



## __<span style="color:#9999ff">게시글 검색</span>__
## __<span style="color:#ff9933">요청</span>__ **[GET] /:searchword?offset=0&limit=5**
- |속성|타입|설명|
    |---|---|---|
    |searchword *|string|검색 단어 (필수)|
    |offset *|int|페이지 번호 (필수)|
    |limit|int|한번에 가져올 개수|
## __<span style="color:#ff9933">응답</span>__
- ``` json
    {
        "status": 200,
        "message": "searchContents",
        "result_data": [
            {
                "post_id": int,
                "post_title": "string",
                "post_txt": "string",
                "post_body_md": null,
                "post_body_html": "string",
                "created_at": "2022-08-15 12:12",
                "updated_at": "2022-08-15 12:12",
                "user": {
                    "user_email": "string",
                    "user_detail": {
                        "user_name": "string",
                        "user_unique_id": "string",
                        "user_nickname": "string",
                        "user_img": "string"
                    }
                }
            },
        ]
    }
- |속성|타입|설명|
    |---|---|---|
    |status|int|상태코드|
    |message|string|메시지|
    |**result_data**|json|결과 값|
    |||
    |post_id|string|게시물 아이디|
    |post_title|string|게시물 제목|
    |post_body_md|string|게시물 md 텍스트|
    |post_body_html|string|게시물 html 텍스트|
    |post_txt|string|게시물 태그를 제외한 텍스트|
    |user_email|string|유저 이메일|
    |user_name|string|유저 이름|
    |user_unique_id|string|유저 유니크 아이디|
    |user_nickname|string|유저 닉네임|
    |user_img|string|유저 이미지 url|


