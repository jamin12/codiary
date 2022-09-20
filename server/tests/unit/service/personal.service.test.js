const { personalService } = require("../../../src/service/index");
const logger = require("../../../src/config/logger");

const pService = new personalService();

describe("PersonalService", () => {
  const categoryBody = {
    category_id: 50,
    category_name: "create test"
  }
  describe("Catogory", () => {
    // 사용자 카테고리 목록 조회
    it("getPersonalCategory", async () => {
      const getCategory = await pService.getPersonalCategory("test");
      expect(getCategory.length).toEqual(7);
    });

    // 내 카테고리 목록 조회
    it("getPersonalMyCategory", async () => {
      const getCategory = await pService.getPersonalMyCategory("100625979022689944834");
      expect(getCategory.length).toEqual(7);
    });

    // 사용자 카테고리 생성
    it("createPersonalCategory", async () => {
      await pService.createPersonalCategory("100625979022689944834", categoryBody);
    });

    // 사용자 카테고리 생성 에러: 서브 카테고리
    it("createCategory Error : sub category already exists", async () => {
      categoryBody.sub_category_id = 5;
      await pService.createPersonalCategory("100625979022689944834", categoryBody).catch((err) => {
        expect(err.message).toEqual("sub category already exists");
      });
    });

    // 사용자 카테고리 수정 에러 : 서브 카테고리
    it("updateCategory Error : sub category already exists", async () => {
      categoryBody.sub_category_id = 5;
      await pService.updatePersonalCategory("100625979022689944834", 50, categoryBody).catch((err) => {
        expect(err.message).toEqual("sub category already exists");
      })
    });

    // 사용자 카테고리 수정 에러: 없는 카테고리
    it("updateCategory Error : category not found", async () => {
      await pService.updatePersonalCategory("100625979022689944834", 51, categoryBody).catch((err) => {
        expect(err.message).toEqual("category not found");
      })
    });

    // 사용자 카테고리 수정
    it("updatePersonalCategory", async () => {
      categoryBody.category_name = "update category";
      delete categoryBody.sub_category_id;
      await pService.updatePersonalCategory("100625979022689944834", 50, categoryBody);
    });

    // 사용자 카테고리 삭제 에러: 없는 카테고리
    it("deleteCategory Error : category not found", async () => {
      await pService.deletePersonalCategory("100625979022689944834", 51).catch((err) => {
        expect(err.message).toEqual("category not found");
      })
    });

    // 사용자 카테고리 삭제
    it("deletePersonalCategory", async () => {
      await pService.deletePersonalCategory("100625979022689944834", 50);
    });
  });
  describe("post", () => {
    // 사용자 포스트 목록 조회
    it("getPersonalPosts", async () => {
      const postList = await pService.getPersonalPosts("test", 1, 1, 10);
      expect(postList.length).toEqual(3);
    });

    // 사용자 포스트 목록 조회 에러 : 유저 없음
    it("getPersonalPosts", async () => {
      await pService.getPersonalPosts("test1", 1, 1, 10).catch((err) => {
        expect(err.message).toEqual("user not found");

      });
    });
  });

});
