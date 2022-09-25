# personal page(url prefix = /personal)


## __<span style="color:#9999ff">사용자 카테고리 목록 조회</span>__
## __<span style="color:#ff9933">요청</span>__ __[GET] /category/:uniqueid__
- |속성|타입|설명|
    |---|---|---|
    |uniqueid *|int|사용자 유니크 아이디 (필수)|

## __<span style="color:#ff9933">응답</span>__
- ``` json
    {
        "status": 200,
        "message": "getCategory",
        "result_data": [
            {
                "category_id": 1,
                "sub_category_id": null,
                "category_name": "알고리즘"
            },
        ]
    }
- |속성|타입|설명|
    |---|---|---|
    |status|int|상태코드|
    |message|string|메시지|
    |**result_data**|json|결과 값|
    |||
    |category_id|int|카테고리 아이디|
    |sub_category_id|int|상위 카테고리 아이디|
    |category_name|string|카테고리 이름|


## __<span style="color:#9999ff">내 카테고리 목록 조회</span>__
## __<span style="color:#ff9933">요청</span>__ __[GET] /category__
- authentication 쿠키 필요

## __<span style="color:#ff9933">응답</span>__
- ``` json
    {
        "status": 200,
        "message": "getCategory",
        "result_data": [
            {
                "category_id": 1,
                "sub_category_id": null,
                "category_name": "알고리즘"
            },
        ]
    }
- |속성|타입|설명|
    |---|---|---|
    |status|int|상태코드|
    |message|string|메시지|
    |**result_data**|json[]|결과 값|
    |||
    |category_id|int|카테고리 아이디|
    |sub_category_id|int|상위 카테고리 아이디|
    |category_name|string|카테고리 이름|

## __<span style="color:#9999ff">사용자 카테고리 생성</span>__
## __<span style="color:#ff9933">요청</span>__ __[POST] /category__
- ``` json
    {
        "category_name": "create test",
        "sub_category_id": 1
    }
- |속성|타입|설명|
    |---|---|---|
    |category_name *|string|카테고리 명 (필수)|
    |sub_category_id|int|상위 카테고리 아이디|
- authentication 쿠키 필요

## __<span style="color:#ff9933">응답</span>__
- ``` json
    {
        "status": 201,
        "message": "create success",
        "result_data" : {
            "category_id" : 1
        }
    }
- |속성|타입|설명|
    |---|---|---|
    |status|int|상태코드|
    |message|string|메시지|
    |**result_data**|json[]|결과 값|
    |||
    |category_id|int|카테고리 아이디|

## __<span style="color:#9999ff">사용자 카테고리 수정</span>__
## __<span style="color:#ff9933">요청</span>__ __[PATCH] /category/:categoryid__
- |속성|타입|설명|
    |---|---|---|
    |categoryid *|int|카테고리 아이디 (필수)|
- ``` json
    {
        "category_name": "create test",
        "sub_category_id": 1
    }
- |속성|타입|설명|
    |---|---|---|
    |category_name|string|카테고리 명 |
    |sub_category_id|int|상위 카테고리 아이디|
- authentication 쿠키 필요

## __<span style="color:#ff9933">응답</span>__
- ``` json
    {
        "status": 200,
        "message": "update success",
    }
- |속성|타입|설명|
    |---|---|---|
    |status|int|상태코드|
    |message|string|메시지|

## __<span style="color:#9999ff">사용자 카테고리 삭제</span>__
## __<span style="color:#ff9933">요청</span>__ __[DELETE] /category/:categoryid__
- |속성|타입|설명|
    |---|---|---|
    |categoryid *|int|카테고리 아이디 (필수)|
- authentication 쿠키 필요
- 하위 카테고리까지 및 카테고리에 포함된 게시글 삭제됨
## __<span style="color:#ff9933">응답</span>__
- ``` json
    {
        "status": 200,
        "message": "delete success",
    }
- |속성|타입|설명|
    |---|---|---|
    |status|int|상태코드|

## __<span style="color:#9999ff">사용자 포스트 목록 조회</span>__
## __<span style="color:#ff9933">요청</span>__ __[GET] /posts/:uniqueid/:categoryid?offset=0&limit=0__
- |속성|타입|설명|
    |---|---|---|
    |uniqueid *|string|사용자 유니크 아이디 (필수)|
    |categoryid *|int|카테고리 아이디 (필수)</br> 0 : 카테고리 상관없이 날짜 순으로 가져옴|
    |offset *|int|현재 페이지 번호 (필수)|
    |limit|int|보여줄 개수|
## __<span style="color:#ff9933">응답</span>__
- ``` json
    {
        "status": 200,
        "message": "getPost",
        "result_data": [
            {
                "post_id": 25,
                "post_title": "테스으 생성",
                "post_body_md": "null",
                "post_body_html": "null",
                "post_txt": "qwer12v",
                "created_at": "2022-08-29 03:52",
                "updated_at": "2022-08-29 19:45",
                "users": {
                    "user_email": "rudals951004@gmail.com",
                    "user_detail": {
                        "user_name": "min ja",
                        "user_unique_id": "test",
                        "user_nickname": "",
                        "user_img": "이미지가 없다링"
                    }
                }
            },
        ]
    }
- |속성|타입|설명|
    |---|---|---|
    |status|int|상태코드|
    |message|string|메시지|
    |**result_data**|json[]|결과 값|
    |||
    |post_id|int|포스트 아이디|
    |post_title|string|포스트 제목|
    |post_body_md|string|포스트 md 텍스트|
    |post_body_html|string|포스트 html 텍스트|
    |post_txt|string|포스트 html 태그를 제외한 텍스트|
    |user_email|string|유저 이메일|
    |user_name|string|유저 이름|
    |user_unique_id|string|유저 유니크 아이디|
    |user_nickname|string|유저 닉네임|
    |user_img|string|유저 이미지|
    |created_at|string|생성 날짜|
    |updated_at|string|업데이트 날짜|

## __<span style="color:#9999ff">사용자 날짜 별 포스트 목록 조회</span>__
## __<span style="color:#ff9933">요청</span>__ __[GET] /posts/:uniqueid?startdate=2022:01:01 00:00:00&enddate=2022:01:01 00:00:00__
- |속성|타입|설명|
    |---|---|---|
    |uniqueid *|string|사용자 유니크 아이디 (필수)|
    |startdate *|datetime|시작 날짜 (필수)|
    |enddate *|datetime|마지막 날짜 (필수)|

## __<span style="color:#ff9933">응답</span>__
- ``` json
    {
        "status": 200,
        "message": "getPost",
        "result_data": [
            {
                "post_id": 4,
                "post_title": "test4",
                "post_body_md": null,
                "post_body_html": null,
                "post_txt": "qaz",
                "created_at": "2022-08-15 12:12",
                "updated_at": "2022-08-15 12:12",
                "users": {
                    "user_email": "rudals951004@gmail.com",
                    "user_detail": {
                        "user_name": "min ja",
                        "user_unique_id": "test",
                        "user_nickname": "",
                        "user_img": "이미지가 없다링"
                    }
                },
                "posts_update_history": [
                    {
                        "post_update_history_id": 6,
                        "post_id": 4,
                        "update_history": "2022-08-29 12:03",
                        "created_at": "2022-08-29 12:03",
                        "updated_at": "2022-08-30 23:51"
                    },
                ]
            },
        ]
    }
- |속성|타입|설명|
    |---|---|---|
    |status|int|상태코드|
    |message|string|메시지|
    |**result_data**|json[]|결과 값|
    |||
    |post_id|int|포스트 아이디|
    |post_title|string|포스트 제목|
    |post_body_md|string|포스트 md 텍스트|
    |post_body_html|string|포스트 html 텍스트|
    |post_txt|string|포스트 html 태그를 제외한 텍스트|
    |created_at|string|생성 날짜|
    |updated_at|string|업데이트 날짜|
    |user_email|string|유저 이메일|
    |user_name|string|유저 이름|
    |user_unique_id|string|유저 유니크 아이디|
    |user_nickname|string|유저 닉네임|
    |user_img|string|유저 이미지|
    |post_update_history_id|string|포스트 업데이트 기록 아이디|
    |update_history|datetime|포스트 업데이트 기록 날짜|

## __<span style="color:#9999ff">사용자 포스트 조회</span>__
## __<span style="color:#ff9933">요청</span>__ __[GET] /post/:uniqueid/:postid__
- |속성|타입|설명|
    |---|---|---|
    |uniqueid *|string|사용자 유니크 아이디 (필수)|
    |postid *|int|포스트 아이디 (필수)|
## __<span style="color:#ff9933">응답</span>__
- ``` json
    {
        "status": 200,
        "message": "getPost",
        "result_data": {
            "getPost": {
                "post_id": 26,
                "category_id": 2,
                "post_title": "테스으 생성",
                "post_body_md": "null",
                "post_body_html": "null",
                "post_txt": "qwer12v",
                "like_count": 0,
                "created_at": "2022-08-29 12:09",
                "updated_at": "2022-08-29 14:43",
                "comments": [
                    {
                        "comments_id": 3,
                        "sub_comments_id": null,
                        "post_id": 26,
                        "comments_body": "덧글",
                        "created_at": "2022-08-26 01:23",
                        "updated_at": "2022-08-31 15:09",
                        "users": {
                            "user_email": "rudals951004@gmail.com",
                            "user_detail": {
                                "user_name": "min ja",
                                "user_unique_id": "test",
                                "user_nickname": "",
                                "user_img": "이미지가 없다링"
                            }
                        }
                    }
                ],
                "tag": [
                    {
                        "tag_id": 36,
                        "post_id": 26,
                        "tag_name": "리스트 테스트2",
                        "created_at": "2022-08-29 12:09",
                        "updated_at": "2022-08-29 12:09"
                    },
                ],
                "category": {
                    "category_id": 2,
                    "sub_category_id": null,
                    "category_name": "코딩테스트",
                    "created_at": "2022-08-15 12:08",
                    "updated_at": "2022-08-15 12:08",
                    "posts": [
                        {
                            "post_id": 26,
                            "post_title": "테스으 생성"
                        },
                    ]
                },
                "measurement": {
                    "measurement_id": 2,
                    "post_id": 26,
                    "today_visit_count": 3,
                    "total_visit_count": 4,
                    "created_at": "2022-08-29 12:09",
                    "updated_at": "2022-08-31 15:08"
                }
            },
        "user": {
            "user_email": "rudals951004@gmail.com",
            "user_detail": {
                "user_name": "min ja",
                "user_unique_id": "test",
                "user_nickname": "",
                "user_introduce": "저에요~",
                "user_img": "이미지가 없다링"
            },
            "sns_info": {
                "sns_name": "min ja"
            }
        },
            "checkLike": false
        }
    }
- |속성|타입|설명|
    |---|---|---|
    |status|int|상태코드|
    |message|string|메시지|
    |**result_data**|json|결과 값|
    |||
    |post_id|int|포스트 아이디|
    |post_title|string|포스트 제목|
    |post_body_md|string|포스트 md 텍스트|
    |post_body_html|string|포스트 html 텍스트|
    |post_txt|string|포스트 html 태그를 제외한 텍스트|
    |like_count|int|포스트 좋아요 숫자|
    |comments_id|int|댓글 아이디|
    |sub_comments_id|int|상위 댓글 아이디|
    |comments_body|string|댓글 본문|
    |tag_id|int|태그 아이디|
    |tag_name|string|태그 이름|
    |like_count|int|포스트 좋아요 숫자|
    |category_id|int|카테고리 아이디|
    |sub_category_id|int|상위 카테고리 아이디|
    |category_name|string|카테고리 이름|
    |measurement_id|int|방문자수 아이디|
    |today_visit_count|int|오늘 방문자 수|
    |total_visit_count|int|총 방문자 수|
    |user_email|string|유저 이메일|
    |user_name|string|유저 이름|
    |user_unique_id|string|유저 유니크 아이디|
    |user_introduce|string|유저 소개|
    |user_nickname|string|유저 닉네임|
    |user_img|string|유저 이미지|
    |sns_name|string|sns상 유저 이름|
    |checkLike|bool|좋아요 눌렀는지 안눌렀는지 체크|
    |created_at|string|생성 날짜|
    |updated_at|string|업데이트 날짜|

## __<span style="color:#9999ff">사용자 포스트 생성</span>__
## __<span style="color:#ff9933">요청</span>__ __[POST] /post__
- ``` json
    {
        "post": {
            "post_title": "테스으 생성",
            "post_body_md": "null",
            "post_body_html": "null",
            "post_txt": "qwer12v",
            "category_id": 2
        },
        "tag": {
            "tag_name": ["테스트 태그", "리스트 테스트2"]
        }
    }
- |속성|타입|설명|
    |---|---|---|
    |post_title *|string|포스트 제목 (필수)|
    |post_body_md|string|포스트 md 텍스트|
    |post_body_html|string|포스트 html 텍스트|
    |post_txt|string|포스트 html 태그를 제외한 텍스트|
    |category_id *|int|카테고리 아이디 (필수)|
    |tag_name *|string[]|태그 이름 (필수)|
- authentication 쿠키 필요
## __<span style="color:#ff9933">응답</span>__
- ``` json
    {
        "status": 201,
        "message": "create success",
        "result_data": {
            "post_id": 30
        }
    }
- |속성|타입|설명|
    |---|---|---|
    |status|int|상태코드|
    |message|string|메시지|
    |**result_data**|json|결과 값|
    |||
    |post_id|string|메시지|

## __<span style="color:#9999ff">사용자 포스트 수정</span>__
## __<span style="color:#ff9933">요청</span>__ __[PATCH] /post/:postid__
- |속성|타입|설명|
    |---|---|---|
    |postid *|int|포스트 아이디 (필수)|
- ``` json
    {
        "post": {
            "post_title": "테스으 생성",
            "post_body_md": "null",
            "post_body_html": "null",
            "post_txt": "qwer12v",
            "category_id": 2
        },
        "tag": {
            "tag_name": ["테스트 태그", "리스트 테스트2"]
        }
    }
- |속성|타입|설명|
    |---|---|---|
    |post_title *|string|포스트 제목 (필수)|
    |post_body_md|string|포스트 md 텍스트|
    |post_body_html|string|포스트 html 텍스트|
    |post_txt|string|포스트 html 태그를 제외한 텍스트|
    |category_id|int|카테고리 아이디|
    |tag_name|string[]|태그 이름 |
- authentication 쿠키 필요
## __<span style="color:#ff9933">응답</span>__
- ``` json
    {
        "status": 200,
        "message": "update success"
    }
- |속성|타입|설명|
    |---|---|---|
    |status|int|상태코드|
    |message|string|메시지|

## __<span style="color:#9999ff">사용자 포스트 삭제</span>__
## __<span style="color:#ff9933">요청</span>__ __[DELETE] /post/:postid__
- |속성|타입|설명|
    |---|---|---|
    |postid *|int|포스트 아이디 (필수)|
- authentication 쿠키 필요
## __<span style="color:#ff9933">응답</span>__
- ``` json
    {
        "status": 200,
        "message": "delete success"
    }
- |속성|타입|설명|
    |---|---|---|
    |status|int|상태코드|
    |message|string|메시지|

## __<span style="color:#9999ff">임시 포스트 조회</span>__
## __<span style="color:#ff9933">요청</span>__ __[GET] /tmpposts/:tmppostid__
- |속성|타입|설명|
    |---|---|---|
    |tmppostid *|int|포스트 아이디 (필수)|
- authentication 쿠키 필요
## __<span style="color:#ff9933">응답</span>__
- ``` json
    {
        "status": 200,
        "message": "gettempPost",
        "result_data": {
            "tmppost_id": 1,
            "tmppost_title": "테스트1",
            "tmppost_body_md": null,
            "tmppost_body_html": null,
            "tmppost_txt": "qwer",
            "created_at": "2022-08-28 19:29",
            "updated_at": "2022-08-28 19:29"
        }
    }
- |속성|타입|설명|
    |---|---|---|
    |status|int|상태코드|
    |message|string|메시지|    
    |post_id|int|포스트 아이디|    
    |**result_data**|json|결과 값|
    |||
    |tmppost_id|int|임시 포스트 아이디|
    |tmppost_title|string|포스트 제목|
    |tmppost_body_md|string|포스트 md 텍스트|
    |tmppost_body_html|string|포스트 html 텍스트|
    |tmppost_txt|string|포스트 html 태그를 제외한 텍스트|
    |created_at|string|생성 날짜|
    |updated_at|string|업데이트 날짜|

## __<span style="color:#9999ff">임시 포스트 목록 조회</span>__
## __<span style="color:#ff9933">요청</span>__ __[GET] /tmpposts__
- authentication 쿠키 필요
## __<span style="color:#ff9933">응답</span>__
- ``` json
    {
        "status": 200,
        "message": "gettempPosts",
        "result_data": [
            {
                "tmppost_id": 1,
                "tmppost_title": "테스트1",
                "tmppost_body_md": null,
                "tmppost_body_html": null,
                "tmppost_txt": "qwer",
                "created_at": "2022-08-28 19:29",
                "updated_at": "2022-08-28 19:29"
            },
        ]
    }
- |속성|타입|설명|
    |---|---|---|
    |status|int|상태코드|
    |message|string|메시지|    
    |post_id|int|포스트 아이디|    
    |**result_data**|json[]|결과 값|
    |||
    |tmppost_id|int|임시 포스트 아이디|
    |tmppost_title|string|포스트 제목|
    |tmppost_body_md|string|포스트 md 텍스트|
    |tmppost_body_html|string|포스트 html 텍스트|
    |tmppost_txt|string|포스트 html 태그를 제외한 텍스트|
    |created_at|string|생성 날짜|
    |updated_at|string|업데이트 날짜|

## __<span style="color:#9999ff">임시 포스트 저장</span>__
## __<span style="color:#ff9933">요청</span>__ __[POST] /tmpposts__
- ``` json
    {
        "tmppost_title": "create test title1",
        "tmppost_body_md": "null",
        "tmppost_body_html": "null",
        "tmppost_txt": "create test txt1"
    }
- |속성|타입|설명|
    |---|---|---|
    |tmppost_title|string|포스트 제목|
    |tmppost_body_md|string|포스트 md 텍스트|
    |tmppost_body_html|string|포스트 html 텍스트|
    |tmppost_txt|string|포스트 html 태그를 제외한 텍스트|
- authentication 쿠키 필요
## __<span style="color:#ff9933">응답</span>__
- ``` json
    {
        "status": 201,
        "message": "create success",
        "result_data": {
            "tmppost_id": 9
        }
    }
- |속성|타입|설명|
    |---|---|---|
    |status|int|상태코드|
    |message|string|메시지|    
    |post_id|int|포스트 아이디|    
    |**result_data**|json|결과 값|
    |||
    |tmppost_id|int|임시 포스트 아이디|

## __<span style="color:#9999ff">임시 포스트 수정</span>__
## __<span style="color:#ff9933">요청</span>__ __[PATCH] /tmpposts/:tmppostid__
- |속성|타입|설명|
    |---|---|---|
    |tmppostid|int|포스트 아이디|
- ``` json
    {
        "tmppost_title": "update test title1",
        "tmppost_body_md": "null",
        "tmppost_body_html": "null",
        "tmppost_txt": "update test txt1"
    }
- |속성|타입|설명|
    |---|---|---|
    |tmppost_title|string|포스트 제목|
    |tmppost_body_md|string|포스트 md 텍스트|
    |tmppost_body_html|string|포스트 html 텍스트|
    |tmppost_txt|string|포스트 html 태그를 제외한 텍스트|
- authentication 쿠키 필요
## __<span style="color:#ff9933">응답</span>__
- ``` json
    {
        "status": 200,
        "message": "update success",
    }
- |속성|타입|설명|
    |---|---|---|
    |status|int|상태코드|
    |message|string|메시지|

## __<span style="color:#9999ff">임시 포스트 삭제</span>__
## __<span style="color:#ff9933">요청</span>__ __[DELETE] /tmpposts/:tmppostid__
- |속성|타입|설명|
    |---|---|---|
    |tmppostid|int|포스트 아이디|
- authentication 쿠키 필요
## __<span style="color:#ff9933">응답</span>__
- ``` json
    {
        "status": 200,
        "message": "delete success",
    }
- |속성|타입|설명|
    |---|---|---|
    |status|int|상태코드|
    |message|string|메시지|

## __<span style="color:#9999ff">방문 기록 조회</span>__
## __<span style="color:#ff9933">요청</span>__ __[GET] /visitrecord?offset=1&limit=0__
- |속성|타입|설명|
    |---|---|---|
    |offset *|int|현재 페이지 번호 (필수)|
    |limit|int|보여줄 개수|
- authentication 쿠키 필요
## __<span style="color:#ff9933">응답</span>__
- ``` json
    {
        "status": 200,
        "message": "getVisitRecord",
        "result_data": [
            {
                "visit_record_id": 3,
                "post_id": 3,
                "created_at": "2022-09-01 21:01",
                "updated_at": "2022-09-01 21:01",
                "posts": {
                    "post_id": 3,
                    "post_title": "test6",
                    "post_body_md": null,
                    "post_body_html": null,
                    "post_txt": "edc",
                    "created_at": "2022-08-15 12:12",
                    "updated_at": "2022-09-01 21:01",
                    "users": {
                        "user_email": "rudals951004@gmail.com",
                        "user_detail": {
                            "user_name": "min ja",
                            "user_unique_id": "test",
                            "user_nickname": "",
                            "user_img": "이미지가 없다링"
                        }
                    }
                }
            },
        ]
    }
- |속성|타입|설명|
    |---|---|---|
    |status|int|상태코드|
    |message|string|메시지|
    |**result_data**|json[]|결과 값|
    |||
    |visit_record_id|int|방문 기록 아이디|
    |post_id|int|포스트 아이디|
    |post_title|string|포스트 제목|
    |post_body_md|string|포스트 md 텍스트|
    |post_body_html|string|포스트 html 텍스트|
    |post_txt|string|포스트 html 태그를 제외한 텍스트|
    |user_email|string|유저 이메일|
    |user_name|string|유저 이름|
    |user_unique_id|string|유저 유니크 아이디|
    |user_introduce|string|유저 소개|
    |user_nickname|string|유저 닉네임|
    |user_img|string|유저 이미지|
    |created_at|string|생성 날짜|
    |updated_at|string|업데이트 날짜|


## __<span style="color:#9999ff">방문 기록 저장</span>__
## __<span style="color:#ff9933">요청</span>__ __[POST] /visitrecord__
- ``` json
    {
        "post_id": 2
    }
- |속성|타입|설명|
    |---|---|---|
    |post_id *|int|포스트 번호 (필수)|
- authentication 쿠키 필요
## __<span style="color:#ff9933">응답</span>__
- ``` json
    {
        "status": 201,
        "message": "create success",
        "result_data": {
            "visit_record_id" : 2
        }
    }
- |속성|타입|설명|
    |---|---|---|
    |status|int|상태코드|
    |message|string|메시지|
    |**result_data**|json[]|결과 값|
    |||
    |visit_record_id|int|생성된 방문 기록 아이디|
## __<span style="color:#9999ff">방문 기록 삭제</span>__
## __<span style="color:#ff9933">요청</span>__ __[DELETE] /visitrecord/:visitrecordid__

- |속성|타입|설명|
    |---|---|---|
    |visitrecordid *|int|방문 기록 아이디(필수)|
- authentication 쿠키 필요
## __<span style="color:#ff9933">응답</span>__
- ``` json
    {
        "status": 200,
        "message": "delete success"
    }
- |속성|타입|설명|
    |---|---|---|
    |status|int|상태코드|
    |message|string|메시지|

## __<span style="color:#9999ff">좋아요 기록 조회</span>__
## __<span style="color:#ff9933">요청</span>__ __[GET] /likerecord?offset=1&limit=0__
- |속성|타입|설명|
    |---|---|---|
    |offset *|int|현재 페이지 번호 (필수)|
    |limit|int|보여줄 개수|
- authentication 쿠키 필요
## __<span style="color:#ff9933">응답</span>__
- ``` json
    {
        "status": 200,
        "message": "getLikeRecord",
        "result_data": [
            {
                "like_record_id": 3,
                "post_id": 3,
                "created_at": "2022-09-01 21:01",
                "updated_at": "2022-09-01 21:01",
                "posts": {
                    "post_id": 3,
                    "post_title": "test6",
                    "post_body_md": null,
                    "post_body_html": null,
                    "post_txt": "edc",
                    "created_at": "2022-08-15 12:12",
                    "updated_at": "2022-09-01 21:01",
                    "users": {
                        "user_email": "rudals951004@gmail.com",
                        "user_detail": {
                            "user_name": "min ja",
                            "user_unique_id": "test",
                            "user_nickname": "",
                            "user_img": "이미지가 없다링"
                        }
                    }
                }
            },
        ]
    }
- |속성|타입|설명|
    |---|---|---|
    |status|int|상태코드|
    |message|string|메시지|
    |**result_data**|json[]|결과 값|
    |||
    |like_record_id|int|방문 기록 아이디|
    |post_id|int|포스트 아이디|
    |post_title|string|포스트 제목|
    |post_body_md|string|포스트 md 텍스트|
    |post_body_html|string|포스트 html 텍스트|
    |post_txt|string|포스트 html 태그를 제외한 텍스트|
    |user_email|string|유저 이메일|
    |user_name|string|유저 이름|
    |user_unique_id|string|유저 유니크 아이디|
    |user_introduce|string|유저 소개|
    |user_nickname|string|유저 닉네임|
    |user_img|string|유저 이미지|
    |created_at|string|생성 날짜|
    |updated_at|string|업데이트 날짜|

## __<span style="color:#9999ff">좋아요 기록 저장</span>__
## __<span style="color:#ff9933">요청</span>__ __[POST] /likerecord__
- ``` json
    {
        "post_id": 2
    }
- |속성|타입|설명|
    |---|---|---|
    |post_id *|int|포스트 번호 (필수)|
- authentication 쿠키 필요
## __<span style="color:#ff9933">응답</span>__
- ``` json
    {
        "status": 201,
        "message": "create success",
        "result_data": {
            "like_record_id": 1
        }
    }
- |속성|타입|설명|
    |---|---|---|
    |status|int|상태코드|
    |message|string|메시지|
    |**result_data**||
    |||
    |like_record_id|int|좋아요 기록 아이디|

## __<span style="color:#9999ff">좋아요 기록 삭제</span>__
## __<span style="color:#ff9933">요청</span>__ __[DELETE] /likerecord/:likerecordid__

- |속성|타입|설명|
    |---|---|---|
    |likerecordid *|int|방문 기록 아이디(필수)|
- authentication 쿠키 필요
## __<span style="color:#ff9933">응답</span>__
- ``` json
    {
        "status": 200,
        "message": "delete success"
    }
- |속성|타입|설명|
    |---|---|---|
    |status|int|상태코드|
    |message|string|메시지|

## __<span style="color:#9999ff">좋아요 기록 포스트 아이디로 삭제</span>__
## __<span style="color:#ff9933">요청</span>__ __[DELETE] /likerecord/post/:postid__

- |속성|타입|설명|
    |---|---|---|
    |postid *|int|방문 기록 아이디(필수)|
- authentication 쿠키 필요
## __<span style="color:#ff9933">응답</span>__
- ``` json
    {
        "status": 200,
        "message": "delete success"
    }
- |속성|타입|설명|
    |---|---|---|
    |status|int|상태코드|
    |message|string|메시지|

## __<span style="color:#9999ff">댓글 생성</span>__
## __<span style="color:#ff9933">요청</span>__ __[POST] /comments__
- ``` json
    {
        "post_id": 1,
        "comments_body": "테스트 댓글입니다.",
        "sub_comments_id": 3
    }
- |속성|타입|설명|
    |---|---|---|
    |postid *|int|댓글 아이디(필수)|
    |comments_body *|string|댓글 본문(필수)|
    |sub_comments_id|int|상위 댓글 아이디|
- authentication 쿠키 필요
## __<span style="color:#ff9933">응답</span>__
- ``` json
    {
        "status": 201,
        "message": "create success",
        "result_data": {
            "comment_id" : 1,
        }
    }
- |속성|타입|설명|
    |---|---|---|
    |status|int|상태코드|
    |message|string|메시지|
    |**result_data**||
    ||||
    |comment_id|int|댓글 아이디|

## __<span style="color:#9999ff">댓글 수정</span>__
## __<span style="color:#ff9933">요청</span>__ __[PATCH] /comments/:commentid__
- |속성|타입|설명|
    |---|---|---|
    |commentid *|int|댓글 아이디(필수)|
- ``` json
    {
        "comments_body": "테스트 댓글입니다.",
    }
- |속성|타입|설명|
    |---|---|---|
    |comments_body *|string|댓글 본문(필수)|
- authentication 쿠키 필요
## __<span style="color:#ff9933">응답</span>__
- ``` json
    {
        "status": 200,
        "message": "update success"
    }
- |속성|타입|설명|
    |---|---|---|
    |status|int|상태코드|
    |message|string|메시지|

## __<span style="color:#9999ff">댓글 삭제</span>__
## __<span style="color:#ff9933">요청</span>__ __[DELETE] /comments/:commentid__
- |속성|타입|설명|
    |---|---|---|
    |commentid *|int|댓글 아이디(필수)|
- authentication 쿠키 필요
## __<span style="color:#ff9933">응답</span>__
- ``` json
    {
        "status": 200,
        "message": "delete success"
    }
- |속성|타입|설명|
    |---|---|---|
    |status|int|상태코드|
    |message|string|메시지|

## __<span style="color:#9999ff">개인 페이지 검색</span>__
## __<span style="color:#ff9933">요청</span>__ __[GET] /search/personal/:searchword/:searchtype?offset=1&limit=0__
- |속성|타입|설명|
    |---|---|---|
    |searchword *|int|검색 단어(필수)</br>없으면 날짜순으로 전송됨|
    |searchtype *|int|검색 타입(필수)</br>0 : 개인 포스트 페이지에서 검색</br>1 : 개인 임시저장 페이지에서 검색</br>2 : 개인 방문 목록에서 검색</br>3 : 개인 좋아요 목록에서 검색|
    |offset *|int|현재 페이지 번호 (필수)|
    |limit|int|보여줄 개수|
- authentication 쿠키 필요
## __<span style="color:#ff9933">응답</span>__
- ``` json
    // 0 : 개인 포스트페이지에서 검색
    {
        "status": 200,
        "message": "searchContents",
        "result_data": [
            {
                "post_id": 25,
                "post_title": "테스으 생성",
                "post_body_md": "null",
                "post_body_html": "null",
                "post_txt": "qwer12v",
                "created_at": "2022-08-29 03:52",
                "updated_at": "2022-09-03 10:57",
                "users": {
                    "user_email": "rudals951004@gmail.com",
                    "user_detail": {
                        "user_name": "min ja",
                        "user_unique_id": "test",
                        "user_nickname": "",
                        "user_img": "이미지가 없다링"
                    }
                }
            },
        ]
    }

    // 1 : 개인 임시저장 페이지에서 검색
    {
        "status": 200,
        "message": "searchContents",
        "result_data": [
            {
                "tmppost_id": 1,
                "tmppost_title": "테스트1",
                "tmppost_body_md": null,
                "tmppost_body_html": null,
                "tmppost_txt": "qwer",
                "created_at": "2022-08-28 19:29",
                "updated_at": "2022-08-28 19:29"
            }
        ]
    }

    // 2 : 개인 방문 목록에서 검색
    {
        "status": 200,
        "message": "searchContents",
        "result_data": [
            {
                "visit_record_id": 1,
                "post_id": 5,
                "created_at": "2022-09-01 21:00",
                "updated_at": "2022-09-03 11:12",
                "posts": {
                    "post_id": 5,
                    "post_title": "테스으 생성",
                    "post_body_md": "",
                    "post_body_html": "",
                    "post_txt": "qwer12v",
                    "created_at": "2022-08-29 03:25",
                    "updated_at": "2022-09-01 21:01",
                    "users": {
                        "user_email": "rudals951004@gmail.com",
                        "user_detail": {
                            "user_name": "min ja",
                            "user_unique_id": "test",
                            "user_nickname": "",
                            "user_img": "이미지가 없다링"
                        }
                    }
                }
            },
        ]
    }

    // 3 : 개인 좋아요 목록에서 검색
    {
        "status": 200,
        "message": "searchContents",
        "result_data": [
            {
                "like_record_id": 2,
                "post_id": 26,
                "created_at": "2022-09-03 11:31",
                "updated_at": "2022-09-03 11:31",
                "posts": {
                    "post_id": 26,
                    "post_title": "테스으 생성",
                    "post_body_md": "null",
                    "post_body_html": "null",
                    "post_txt": "qwer12v",
                    "created_at": "2022-08-29 12:09",
                    "updated_at": "2022-09-03 10:55",
                    "users": {
                        "user_email": "rudals951004@gmail.com",
                        "user_detail": {
                            "user_name": "min ja",
                            "user_unique_id": "test",
                            "user_nickname": "",
                            "user_img": "이미지가 없다링"
                        }
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
    |post_id|int|포스트 아이디|
    |post_title|string|포스트 제목|
    |post_body_md|string|포스트 md 텍스트|
    |post_body_html|string|포스트 html 텍스트|
    |post_txt|string|포스트 html 태그를 제외한 텍스트|
    |tmppost_id|int|임시포스트 아이디|
    |tmppost_title|string|임시포스트 제목|
    |tmppost_body_md|string|임시포스트 md 텍스트|
    |tmppost_body_html|string|임시포스트 html 텍스트|
    |tmppost_txt|string|임시포스트 html 태그를 제외한 텍스트|
    |visit_record_id|int|방문 목록 아이디|
    |like_record_id|int|좋아요 목록 아이디|
    |user_email|string|유저 이메일|
    |user_name|string|유저 이름|
    |user_unique_id|string|유저 유니크 아이디|
    |user_introduce|string|유저 소개|
    |user_nickname|string|유저 닉네임|
    |user_img|string|유저 이미지|
    |sns_name|string|sns상 유저 이름|
    |created_at|string|생성 날짜|
    |updated_at|string|업데이트 날짜|

## __<span style="color:#9999ff">공용 검색</span>__
## __<span style="color:#ff9933">요청</span>__ __[GET] /search/common/:uniqueid/:searchword?offset=1&limit=0__
- |속성|타입|설명|
    |---|---|---|
    |uniqueid *|String|사용자 유니크 아이디(필수)|
    |searchword *|int|검색 단어(필수)</br>없으면 날짜순으로 전송됨|
    |offset *|int|현재 페이지 번호 (필수)|
    |limit|int|보여줄 개수|
## __<span style="color:#ff9933">응답</span>__
- ``` json
    {
        "status": 200,
        "message": "associateContents",
        "result_data": [
            {
                "post_id": 2,
                "post_title": "test5",
                "post_body_md": null,
                "post_body_html": null,
                "post_txt": "wsx",
                "created_at": "2022-08-15 12:12",
                "updated_at": "2022-09-01 21:01",
                "users": {
                    "user_email": "rudals951004@gmail.com",
                    "user_detail": {
                        "user_name": "min ja",
                        "user_unique_id": "test",
                        "user_nickname": "",
                        "user_img": "이미지가 없다링"
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
    |post_id|int|포스트 아이디|
    |post_title|string|포스트 제목|
    |post_body_md|string|포스트 md 텍스트|
    |post_body_html|string|포스트 html 텍스트|
    |post_txt|string|포스트 html 태그를 제외한 텍스트|
    |user_email|string|유저 이메일|
    |user_name|string|유저 이름|
    |user_unique_id|string|유저 유니크 아이디|
    |user_introduce|string|유저 소개|
    |user_nickname|string|유저 닉네임|
    |user_img|string|유저 이미지|
    |created_at|string|생성 날짜|
    |updated_at|string|업데이트 날짜|

## __<span style="color:#9999ff">연관 포스트 검색</span>__
## __<span style="color:#ff9933">요청</span>__ __[GET] /associate/:postid__
- |속성|타입|설명|
    |---|---|---|
    |postid *|int|포스트 아이디(필수)|
- authentication 쿠키 필요
## __<span style="color:#ff9933">응답</span>__
- ``` json
    {
        "status": 200,
        "message": "associateContents",
        "result_data": [
            {
                "tag_id": 49,
                "tag_name": "테스트 태그",
                "posts": {
                    "post_id": 30,
                    "post_title": "테스으 생성",
                    "post_body_md": "null",
                    "post_body_html": "null",
                    "post_txt": "qwer12v",
                    "created_at": "2022-09-01 19:18",
                    "updated_at": "2022-09-01 19:18",
                    "users": {
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
        ]
    }

    // 연관된 게시물을 못 찾았을 때 
    {
        "status": 200,
        "message": "associateContents",
        "result_data": [
            {
                "post_id": 2,
                "post_title": "test5",
                "post_body_md": null,
                "post_body_html": null,
                "post_txt": "wsx",
                "created_at": "2022-08-15 12:12",
                "updated_at": "2022-09-01 21:01",
                "users": {
                    "user_email": "rudals951004@gmail.com",
                    "user_detail": {
                        "user_name": "min ja",
                        "user_unique_id": "test",
                        "user_nickname": "",
                        "user_img": "이미지가 없다링"
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
    |post_id|int|포스트 아이디|
    |post_title|string|포스트 제목|
    |post_body_md|string|포스트 md 텍스트|
    |post_body_html|string|포스트 html 텍스트|
    |post_txt|string|포스트 html 태그를 제외한 텍스트|
    |tag_id|int|태그 아이디|
    |tag_name|string|태그 이름|
    |user_email|string|유저 이메일|
    |user_name|string|유저 이름|
    |user_unique_id|string|유저 유니크 아이디|
    |user_introduce|string|유저 소개|
    |user_nickname|string|유저 닉네임|
    |user_img|string|유저 이미지|
    |created_at|string|생성 날짜|
    |updated_at|string|업데이트 날짜|