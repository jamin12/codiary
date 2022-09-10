# mainpage

## **인기 게시글 조회**
## __<span style="color:#ff9933">요청</span>__ **[GET] /main?offset=1&limit=10** 
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
                "contents_id": int,
                "contents_title": "string",
                "contents_body_md": "string",
                "contents_body_html": "string",
                "contents_txt": "string"
            },
        ]
    }
- |속성|타입|설명|
    |---|---|---|
    |status|int|상태코드|
    |message|string|메시지|
    |result_data.contents_id|string|게시물 아이디|
    |result_data.contents_title|string|게시물 제목|
    |result_data.contents_body_md|string|게시물 md 텍스트|
    |result_data.contents_body_html|string|게시물 html 텍스트|
    |result_data.contents_txt|string|게시물 태그를 제외한 텍스트|


## **게시글 검색**
## __<span style="color:#ff9933">요청</span>__ **[GET] /main/:searchword?offset=0&limit=5**
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
                "contents_id": int,
                "contents_title": "string",
                "contents_txt": "string",
                "contents_body_html": "string",
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
    |result_data.contents_id|string|게시물 아이디|
    |result_data.contents_title|string|게시물 제목|
    |result_data.contents_body_md|string|게시물 md 텍스트|
    |result_data.contents_body_html|string|게시물 html 텍스트|
    |result_data.contents_txt|string|게시물 태그를 제외한 텍스트|
    |result_data.user.user_email|string|유저 이메일|
    |result_data.user.user_detail.user_name|string|유저 이름|
    |result_data.user.user_detail.user_unique_id|string|유저 유니크 아이디|
    |result_data.user.user_detail.user_nickname|string|유저 닉네임|
    |result_data.user.user_detail.user_img|string|유저 이미지 url|


