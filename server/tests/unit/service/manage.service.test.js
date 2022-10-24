const { manageService } = require("../../../src/service/index");
const logger = require("../../../src/config/logger");

const mService = new manageService();

// 관리 서비스 테스트
describe("manageService", () => {
	const reportBody = {
		report_id: 150,
		report_user: "100625979022689944834",
		report_target_type: 1,
		report_target_id: 2,
		report_type: 1,
		report_body: "이게 리포트 바디야",
	};
	// 유저 목록 조회
	it("getUsers", async () => {
		const users = await mService.getUsers(0, 10);
		expect(users.length).toEqual(2);
	});

	// 신고 목록 조회
	it("getReports", async () => {
		const getReports = await mService.getReports(
			-1,
			0,
			"2022-08-01 00:00:00",
			"2022-09-30 00:00:00",
			0,
			10
		);
		expect(getReports.length).toEqual(2);
	});

	// 신고 조회
	it("getReport", async () => {
		const getReport = await mService.getReport(3);
		expect(getReport.report.report_id).toEqual(3);
		expect(getReport.comment.comments_id).toEqual(1);
	});

	// 신고 하기
	it("createReport", async () => {
		await mService.createReport(reportBody);
	});

	// 신고 하기 에러 : 같은 신고
	it("createReport error : same report already exists", async () => {
		await mService.createReport(reportBody).catch((err) => {
			expect(err.message).toEqual("same report already exists");
		});
	});

	// 신고 삭제
	it("deleteReport", async () => {
		await mService.deleteReport(150);
	});
});
