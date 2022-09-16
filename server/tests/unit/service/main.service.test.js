const { mainService } = require("../../../src/service/index");
const logger = require("../../../src/config/logger");

const mService = new mainService();

describe("mainService", () => {
  // 인기 게시글
  it("getPopularContents", async () => {
    const posts = await mService.getPopularPosts(1);
    expect(posts.length).toEqual(5);
  });

  // 인기 게시글 에러
  it("getPopularContents", async () => {
    await mService.getPopularPosts(3).catch((err) => {
      expect(err.message).toEqual("not found posts");
    });
  });

  // 메인페이지 게시글 검색
  it("searchContentsInMain", async () => {
    const searchedContents = await mService.searchPostsInMain("qwer",0);
    expect(searchedContents.length).toEqual(2);
  });
});
