const { mainService } = require("../../../src/service/index");
const logger = require("../../../src/config/logger");

const mService = new mainService();

describe("mainService", () => {
  // 인기 게시글
  it("getPopularContents", async () => {
    const contents = await mService.getPopularContents(1);
    expect(contents.length).toEqual(5);
  });

  // 인기 게시글 에러
  it("getPopularContents", async () => {
    await mService.getPopularContents(3).catch((err) => {
      expect(err.message).toEqual("not found contents");
    });
  });
});
