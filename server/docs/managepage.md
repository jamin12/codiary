# managepage(url prefix = /manage)

## __<span style="color:#9999ff">유저 리스트 조회(admin유저만 가능)</span>__
## __<span style="color:#ff9933">요청</span>__ **[GET] /?offset=0&limit=5**
- |속성|타입|설명|
    |---|---|---|
    |offset *|int|현재 페이지 번호 (필수)|
    |limit|int|보여줄 개수|
- authentication 쿠키 필요
## __<span style="color:#ff9933">응답</span>__
- ``` json
  {
    "status": 200,
    "message": "userList",
    "result_data": [
            {
                "user_email": "string",
                "user_detail": {
                    "user_name": "string",
                    "user_unique_id": "string",
                    "user_nickname": "string",
                    "user_introduce": "string",
                    "user_img": "string"
                },
                "sns_info": {
                    "sns_name": "string"
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
    |user_email|string|유저 이메일|
    |user_detail.user_name|string|유저 이름|
    |user_detail.user_unique_id|string|유저 유니크 아이디|
    |user_detail.user_nickname|string|유저 닉네임|
    |user_detail.user_introduce|string|유저 소개|
    |user_detail.user_img|string|유저 이미지 url|
    |sns_info.sns_name|string|유저 sns 이름|

## __<span style="color:#9999ff">신고 목록 조회</span>__
## __<span style="color:#ff9933">요청</span>__ **[GET] /:reporttype/:reporttargettype?startDate=datetime&endDate=datetime&offset=1&limit=5**
- |속성|타입|설명|
    |---|---|---|
    |reporttype *|int|신고 타입</br>-1. 타입 없음</br>0. 욕설</br>1. 음란물</br>2.개인정보 노출</br>3. 불법 정보</br>4. 기타</br>(필수)|
    |reporttargettype *|int|신고 타겟 타입</br>-1. 타입 없음</br>0. 게시글</br>1. 댓글</br>(필수)|
    |startdate *|datetime|시작 날짜 (필수)|
    |enddate|datetime|마지막 날짜|
    |offset *|int|현재 페이지 번호 (필수)|
    |limit|int|보여줄 개수|
- authentication 쿠키 필요
## __<span style="color:#ff9933">응답</span>__
- ``` json
    {
        "status": 200,
        "message": "getReports",
        "result_data": [
            {
                "report_id": 4,
                "report_date": "2022-09-14 22:30",
                "report_user": "100625979022689944834",
                "report_type": 1,
                "report_body": "이건 아닌듯?",
                "report_target_type": 1,
                "report_target_id": 2,
                "created_at": "2022-09-14 22:30",
                "updated_at": "2022-09-14 22:30"
            },
        ]
    }  
- |속성|타입|설명|
    |---|---|---|
    |status|int|상태코드|
    |message|string|메시지|
    |**result_data**|json|결과 값|
    |||
    |report_id|int|신고 아이디|
    |report_date|datetime|신고 날짜|
    |report_user|string|신고 유저|
    |report_type|int|신고 타입</br>0. 욕설</br>1. 음란물</br>2.개인정보 노출</br>3. 불법 정보</br>4. 기타</br>|
    |report_body|string|신고 내용|
    |report_target_type|int|신고 타겟 타입</br>0. 게시글</br>1. 댓글</br>|
    |report_target_id|int|신고 타겟 아이디|
    |created_at|string|생성 날짜|
    |updated_at|string|업데이트 날짜|

## __<span style="color:#9999ff">신고 조회</span>__
## __<span style="color:#ff9933">요청</span>__ **[GET] /:reportid**
- |속성|타입|설명|
    |---|---|---|
    |reportid *|int|신고 아이디(필수)|

- authentication 쿠키 필요
## __<span style="color:#ff9933">응답</span>__
- ``` json
    {
        "status": 200,
        "message": "getReport",
        "result_data": {
            "report": {
                "report_id": 3,
                "report_date": "2022-09-14 22:30",
                "report_user": "100625979022689944834",
                "report_type": 2,
                "report_body": null,
                "report_target_type": 1,
                "report_target_id": 1,
                "created_at": "2022-09-14 22:30",
                "updated_at": "2022-09-14 22:30"
            },
            // report target type이 comment일때
            "comment": {
                "comments_id": 1,
                "sub_comments_id": null,
                "post_id": 1,
                "user_id": "100625979022689944834",
                "comments_body": "좋아요",
                "created_at": "2022-09-14 22:28",
                "updated_at": "2022-09-14 22:28",
                "users": {
                    "user_id": "100625979022689944834",
                    "user_email": "rudals951004@gmail.com",
                    "user_detail": {
                        "user_name": "min ja",
                        "user_unique_id": "test",
                        "user_nickname": "",
                        "user_img": "이미지가 없다링"
                    }
                }
            },
            // report target type이 post일때
            "post": {
                "post_id": 2,
                "category_id": 4,
                "user_id": "100625979022689944834",
                "post_title": "test5",
                "post_body_md": null,
                "post_body_html": null,
                "post_txt": "wsx",
                "like_count": 3,
                "created_at": "2022-08-15 12:12",
                "updated_at": "2022-09-01 21:01",
                "users": {
                    "user_id": "100625979022689944834",
                    "user_email": "rudals951004@gmail.com",
                    "user_detail": {
                        "user_name": "min ja",
                        "user_unique_id": "test",
                        "user_nickname": "",
                        "user_img": "이미지가 없다링"
                }
            }
        }
    }
- |속성|타입|설명|
    |---|---|---|
    |status|int|상태코드|
    |message|string|메시지|
    |**result_data**|json|결과 값|
    |||
    |report_id|int|신고 아이디|
    |report_date|datetime|신고 날짜|
    |report_user|string|신고 유저|
    |report_type|int|신고 타입</br>0. 욕설</br>1. 음란물</br>2.개인정보 노출</br>3. 불법 정보</br>4. 기타</br>|
    |report_body|string|신고 내용|
    |report_target_type|int|신고 타겟 타입</br>0. 게시글</br>1. 댓글</br>|
    |report_target_id|int|신고 타겟 아이디|
    |||
    |**report target type**|**comment**||
    |comments_id|int|댓글 아이디|
    |sub_comments_id|int|상위 댓글 아이디|
    |comments_body|string|댓글 본문|
    |||
    |**report target type**|**post**||
    |post_id|int|포스트 아이디|
    |post_title|string|포스트 제목|
    |post_body_md|string|포스트 md 텍스트|
    |post_body_html|string|포스트 html 텍스트|
    |post_txt|string|포스트 html 태그를 제외한 텍스트|
    |user_id|string|유저 아이디|
    |user_email|string|유저 이메일|
    |user_name|string|유저 이름|
    |user_unique_id|string|유저 유니크 아이디|
    |user_introduce|string|유저 소개|
    |user_nickname|string|유저 닉네임|
    |user_img|string|유저 이미지|
    |created_at|string|생성 날짜|
    |updated_at|string|업데이트 날짜|

## __<span style="color:#9999ff">신고 삭제</span>__
## __<span style="color:#ff9933">요청</span>__ **[DELETE] /:reportid**
- |속성|타입|설명|
    |---|---|---|
    |reportid *|int|신고 아이디(필수)|

- authentication 쿠키 필요
## __<span style="color:#ff9933">응답</span>__
- ``` json
    {
        "status": 200,
        "message": "deleteReports",
    }  
- |속성|타입|설명|
    |---|---|---|
    |status|int|상태코드|
    |message|string|메시지|

## __<span style="color:#9999ff">신고 삭제</span>__
## __<span style="color:#ff9933">요청</span>__ **[POST] /**
- |속성|타입|설명|
    |---|---|---|
    |reportid *|int|신고 아이디(필수)|
- ``` json
    {
        "report_user": "1234",
        "report_target_type": 1,
        "report_target_id": 2,
        "report_type": 1,
        "report_body": "이건 아닌듯?"
    }
- |속성|타입|설명|
    |---|---|---|
    |report_user|string|신고 유저|
    |report_target_type *|int|신고 타겟 타입</br>0. 게시글</br>1. 댓글</br>(필수)|
    |report_target_id *|int|신고 타겟 아이디 (필수)|
    |report_type *|int|신고 타입</br>0. 욕설</br>1. 음란물</br>2.개인정보 노출</br>3. 불법 정보</br>4. 기타</br>(필수)|
    |report_body|string|신고 내용|

## __<span style="color:#ff9933">응답</span>__
- ``` json
    {
        "status": 200,
        "message": "createReports",
    }  
- |속성|타입|설명|
    |---|---|---|
    |status|int|상태코드|
    |message|string|메시지|