# mainpage(url prefix = /measurement)

## __<span style="color:#9999ff">초기 화면 데이터</span>__
## __<span style="color:#ff9933">요청</span>__ **[GET] /** 
- authentication 쿠키 필요
## __<span style="color:#ff9933">응답</span>__
- ``` json
    {
        "status": 200,
        "message": "getMyPosts",
        "result_data": {
            "bestPosts": {
                "getBestLike": {
                    "post_id": 1,
                    "category_id": 1,
                    "post_title": "test1",
                    "post_body_md": null,
                    "post_body_html": null,
                    "post_txt": "qwer",
                    "like_count": 6,
                    "created_at": "2022-08-15 12:12",
                    "updated_at": "2022-10-15 13:14"
                },
                "getBestTodayVisit": {
                    "measurement_id": 1,
                    "post_id": 1,
                    "today_visit_count": 6,
                    "total_visit_count": 11,
                    "created_at": "2022-09-10T10:46:43.000Z",
                    "updated_at": "2022-10-07T15:26:43.000Z",
                    "posts": {
                        "post_id": 1,
                        "category_id": 1,
                        "post_title": "test1",
                        "post_body_md": null,
                        "post_body_html": null,
                        "post_txt": "qwer",
                        "like_count": 6,
                        "created_at": "2022-08-15 12:12",
                        "updated_at": "2022-10-15 13:14"
                    }
                },
                "getBestTotalVisit": {
                    "measurement_id": 5,
                    "post_id": 5,
                    "today_visit_count": 2,
                    "total_visit_count": 124,
                    "created_at": "2022-10-15T03:55:33.000Z",
                    "updated_at": "2022-10-15T03:55:33.000Z",
                    "posts": {
                        "post_id": 5,
                        "category_id": 4,
                        "post_title": "test5",
                        "post_body_md": null,
                        "post_body_html": null,
                        "post_txt": "wsx",
                        "like_count": 3,
                        "created_at": "2022-08-15 12:12",
                        "updated_at": "2022-10-15 13:14"
                    }
                }
            },
            "myPosts": [
                {
                    "measurement_id": 6,
                    "post_id": 6,
                    "today_visit_count": 3,
                    "total_visit_count": 2,
                    "created_at": "2022-10-15T03:55:33.000Z",
                    "updated_at": "2022-10-15T03:55:33.000Z",
                    "posts": {
                        "post_id": 6,
                        "category_id": 5,
                        "post_title": "test6",
                        "post_body_md": null,
                        "post_body_html": null,
                        "post_txt": "edc",
                        "like_count": 1,
                        "created_at": "2022-08-15 12:12",
                        "updated_at": "2022-10-15 13:14"
                    }
                },
            ],
            "graphData": [
                {
                    "measurement_date_id": 2,
                    "post_id": 5,
                    "created_at": "2022-10-13",
                    "updated_at": "2022-10-15T05:15:37.000Z",
                    "sum_visit_count": "15"
                }
            ]
        }
    }
- |속성|타입|설명|
    |---|---|---|
    |status|int|상태코드|
    |message|string|메시지|
    |**resoult_data**||
    |||
    |post_id|int|게시물 아이디|
    |category_id|int|카테고리 아이디|
    |post_title|string|게시물 제목|
    |post_body_md|string|게시물 md 텍스트|
    |post_body_html|string|게시물 html 텍스트|
    |post_txt|string|게시물 태그를 제외한 텍스트|
    |like_count|int|좋아요 숫자|
    |measurement_id|int|통계 아이디|
    |today_visit_count|int|하루 방문 숫자|
    |total_visit_count|int|총 방문 숫자|
    |measurement_date_id|int|날짜 별 통계 아이디|
    |sum_visit_count|int|단위의 따른 방문자수 합계|



## __<span style="color:#9999ff">그래프 데이터</span>__
## __<span style="color:#ff9933">요청</span>__ **[GET] /graph/:graphtype/:postid**
- |속성|타입|설명|
    |---|---|---|
    |graphtype *|int|그래프 집계 단위 </br> 0 : 하루 </br> 1 : 주 </br> 2: 월 </br>(필수)|
    |postid *|int|포스트 아이디 (필수)|
- authentication 쿠키 필요
## __<span style="color:#ff9933">응답</span>__
- ``` json
    {
        "status": 200,
        "message": "getGraphData",
        "result_data": [
            {
                "measurement_date_id": 1,
                "post_id": 1,
                "created_at": "2022-44",
                "updated_at": "2022-10-30T19:49:00.000Z",
                "sum_visit_count": "13",
                "posts": [
                    {
                        "post_title": "test1"
                    }
                ]
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
    |measurement_date_id|int|날짜 별 통계 아이디|
    |sum_visit_count|int|단위의 따른 방문자수 합계|

## __<span style="color:#9999ff">최고의 게시물</span>__
## __<span style="color:#ff9933">요청</span>__ **[GET] /best**
- authentication 쿠키 필요
## __<span style="color:#ff9933">응답</span>__
- ``` json
    {
        "status": 200,
        "message": "getBestPosts",
        "result_data": {
            "getBestLike": {
                "post_id": 1,
                "category_id": 1,
                "post_title": "test1",
                "post_body_md": null,
                "post_body_html": null,
                "post_txt": "qwer",
                "like_count": 6,
                "created_at": "2022-08-15 12:12",
                "updated_at": "2022-10-15 13:14"
            },
            "getBestTodayVisit": {
                "measurement_id": 1,
                "post_id": 1,
                "today_visit_count": 6,
                "total_visit_count": 11,
                "created_at": "2022-09-10T10:46:43.000Z",
                "updated_at": "2022-10-07T15:26:43.000Z",
                "posts": {
                    "post_id": 1,
                    "category_id": 1,
                    "post_title": "test1",
                    "post_body_md": null,
                    "post_body_html": null,
                    "post_txt": "qwer",
                    "like_count": 6,
                    "created_at": "2022-08-15 12:12",
                    "updated_at": "2022-10-15 13:14"
                }
            },
            "getBestTotalVisit": {
                "measurement_id": 5,
                "post_id": 5,
                "today_visit_count": 2,
                "total_visit_count": 124,
                "created_at": "2022-10-15T03:55:33.000Z",
                "updated_at": "2022-10-15T03:55:33.000Z",
                "posts": {
                    "post_id": 5,
                    "category_id": 4,
                    "post_title": "test5",
                    "post_body_md": null,
                    "post_body_html": null,
                    "post_txt": "wsx",
                    "like_count": 3,
                    "created_at": "2022-08-15 12:12",
                    "updated_at": "2022-10-15 13:14"
                }
            }
        }
    }
- |속성|타입|설명|
    |---|---|---|
    |status|int|상태코드|
    |message|string|메시지|
    |**resoult_data**||
    |||
    |post_id|int|게시물 아이디|
    |category_id|int|카테고리 아이디|
    |post_title|string|게시물 제목|
    |post_body_md|string|게시물 md 텍스트|
    |post_body_html|string|게시물 html 텍스트|
    |post_txt|string|게시물 태그를 제외한 텍스트|
    |like_count|int|좋아요 숫자|
    |measurement_id|int|통계 아이디|
    |today_visit_count|int|하루 방문 숫자|
    |total_visit_count|int|총 방문 숫자|
    |getBestLike|object|좋아요가 가장 많은 게시물|
    |getBestTodayVisit|object|일일 방문자 수가 가장 많은 게시물|
    |getBestTotalVisit|object|총 방문자 수가 가장 많은 게시물|

## __<span style="color:#9999ff">게시물 목록</span>__
## __<span style="color:#ff9933">요청</span>__ **[GET] /myposts/:porttype/:criterion?offset=1&limit=5**
- |속성|타입|설명|
    |---|---|---|
    |porttype *|int|집계 기준 </br> 0 : 총 방문자 </br> 1 : 일일 방문자 </br> 2: 좋아요 </br>3: 업데이트 시간</br>(필수)|
    |criterion *|int|정리 기준 </br> 0 : asc </br> 1 : desc </br>(필수)|
    |offset *|int|페이지 번호 (필수)|
    |limit|int|한번에 가져올 개수|
- authentication 쿠키 필요
## __<span style="color:#ff9933">응답</span>__
- ``` json
    {
        // porttype이 0 1일 떄
        "status": 200,
        "message": "getMyPosts",
        "result_data": [
            {
                "measurement_id": 3,
                "post_id": 3,
                "today_visit_count": 0,
                "total_visit_count": 20,
                "created_at": "2022-10-14T09:46:43.000Z",
                "updated_at": "2022-10-14T17:16:08.000Z",
                "posts": {
                    "post_id": 3,
                    "category_id": 1,
                    "post_title": "test3",
                    "post_body_md": null,
                    "post_body_html": null,
                    "post_txt": "asdf",
                    "like_count": 4,
                    "created_at": "2022-08-15 12:12",
                    "updated_at": "2022-10-15 13:14"
                }
            },
        ]
    }
    {
        // porttype이 2, 3일 떄
        "status": 200,
        "message": "getMyPosts",
        "result_data": [
            {
                "post_id": 4,
                "category_id": 4,
                "post_title": "test4",
                "post_body_md": null,
                "post_body_html": null,
                "post_txt": "qaz",
                "like_count": 1,
                "created_at": "2022-08-15 12:12",
                "updated_at": "2022-10-15 13:14",
                "measurement": {
                    "measurement_id": 7,
                    "post_id": 4,
                    "today_visit_count": 5,
                    "total_visit_count": 3,
                    "created_at": "2022-10-15T03:55:33.000Z",
                    "updated_at": "2022-10-15T03:55:33.000Z"
                }
            },
        ]
    }
- |속성|타입|설명|
    |---|---|---|
    |status|int|상태코드|
    |message|string|메시지|
    |**resoult_data**||
    |||
    |post_id|int|게시물 아이디|
    |category_id|int|카테고리 아이디|
    |post_title|string|게시물 제목|
    |post_body_md|string|게시물 md 텍스트|
    |post_body_html|string|게시물 html 텍스트|
    |post_txt|string|게시물 태그를 제외한 텍스트|
    |like_count|int|좋아요 숫자|
    |measurement_id|int|통계 아이디|
    |today_visit_count|int|하루 방문 숫자|
    |total_visit_count|int|총 방문 숫자|


