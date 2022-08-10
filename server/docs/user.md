# user

## __<span style="color:#ff9933">요청</span>__
- **[GET] /user** </br>
- 설명: 자신 정보 조회
## __<span style="color:#ff9933">응답</span>__
- |속성|타입|설명|
    |---|---|---|
    |status|int|상태코드|
    |message|string|메시지|
    |result_data.user_email|string|유저 이메일|
    |result_data.user_detail.user_name|string|유저 이름|
    |result_data.user_detail.user_unique_id|string|유저 유니크 아이디|
    |result_data.user_detail.user_nickname|string|유저 닉네임|
    |result_data.user_detail.user_introduce|string|유저 소개|
    |result_data.user_detail.user_img|string|유저 이미지 url|
    |result_data.sns_info.sns_name|string|유저 sns상 이름|



## __<span style="color:#ff9933">요청</span>__
- **[PATCH] /user** </br>
- 설명: 유저 정보 수정
- ```
    {
        "user_unique_id": String,
        "user_nickname": String,
        "user_introduce": String,
        "user_img": String
    }
- |속성|타입|설명|
    |---|---|---|
    |user_unique_id|string|유저 유니크 아이디|
    |user_nickname|string|유저 닉네임|
    |user_introduce|string|유저 소개|
    |user_img|string|유저 이미지 url|
## __<span style="color:#ff9933">응답</span>__
- |속성|타입|설명|
    |---|---|---|
    |status|int|상태코드|
    |message|string|메시지|
    |result_data.user_email|string|유저 이메일|
    |result_data.user_detail.user_name|string|유저 이름|
    |result_data.user_detail.user_unique_id|string|유저 유니크 아이디|
    |result_data.user_detail.user_nickname|string|유저 닉네임|
    |result_data.user_detail.user_introduce|string|유저 소개|
    |result_data.user_detail.user_img|string|유저 이미지 url|
    |result_data.sns_info.sns_name|string|유저 sns 이름|



## __<span style="color:#ff9933">요청</span>__
- **[delete] /user** </br>
- 설명: 유저 정보 삭제
## __<span style="color:#ff9933">응답</span>__
- |속성|타입|설명|
    |---|---|---|
    |status|int|상태코드|
    |message|string|메시지|
    |result_data.user_email|string|유저 이메일|
    |result_data.user_detail.user_name|string|유저 이름|
    |result_data.user_detail.user_unique_id|string|유저 유니크 아이디|
    |result_data.user_detail.user_nickname|string|유저 닉네임|
    |result_data.user_detail.user_introduce|string|유저 소개|
    |result_data.user_detail.user_img|string|유저 이미지 url|
    |result_data.sns_info.sns_name|string|유저 sns 이름|

## __<span style="color:#ff9933">요청</span>__
- **[get] /user/manage** </br>
- 설명: 유저 리스트 조회(admin유저만 가능)
## __<span style="color:#ff9933">응답</span>__
- |속성|타입|설명|
    |---|---|---|
    |status|int|상태코드|
    |message|string|메시지|
    |result_data.user_email|string|유저 이메일|
    |result_data.user_detail.user_name|string|유저 이름|
    |result_data.user_detail.user_unique_id|string|유저 유니크 아이디|
    |result_data.user_detail.user_nickname|string|유저 닉네임|
    |result_data.user_detail.user_introduce|string|유저 소개|
    |result_data.user_detail.user_img|string|유저 이미지 url|
    |result_data.sns_info.sns_name|string|유저 sns 이름|

