const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const validate = require("../middleware/validate");
const { personalValidation } = require("../validations/index");
const { personalController } = require("../controller");

router
	.route("/post/:uniqueid/:postid")
	.get(
		validate(personalValidation.output.getPsersonalPost),
		personalController.output.getPersonalPost
	);

// category
router
	.route("/category/:uniqueid")
	.get(
		validate(personalValidation.output.getPsersonalCategory),
		personalController.output.getPersonalCategory
	);

router
	.route("/category")
	.get(auth("user"), personalController.output.getPersonalMyCategory)
	.post(
		auth("user"),
		validate(personalValidation.input.createPersonalCategory),
		personalController.input.createPersonalCategory
	);

router
	.route("/category/:categoryid")
	.patch(
		auth("user"),
		validate(personalValidation.input.updatePersonalCategory),
		personalController.input.updatePersonalCategory
	)
	.delete(
		auth("user"),
		validate(personalValidation.input.deletePersonalCategory),
		personalController.input.deletePersonalCategory
	);

// tmpposts
router
	.route("/tmpposts")
	.get(auth("user"), personalController.output.getPersonalTmppost)
	.post(
		auth("user"),
		validate(personalValidation.input.createPersonalTmpPost),
		personalController.input.createPersonalTmpPost
	);

router
	.route("/tmpposts/:tmppostid")
	.patch(
		auth("user"),
		validate(personalValidation.input.updatePersonalTmpPost),
		personalController.input.updatePersonalTmpPost
	)
	.delete(
		auth("user"),
		validate(personalValidation.input.deletePersonalTmpPost),
		personalController.input.deletePersonalTmpPost
	);

// visitrecord
router
	.route("/visitrecord")
	.get(
		auth("user"),
		validate(personalValidation.output.getPsersonalVisitRecord),
		personalController.output.getPersonalVisitRecord
	)
	.post(
		auth("user"),
		validate(personalValidation.input.createPersonalVisitRecord),
		personalController.input.createPersonalVisitRecord
	);

router
	.route("/visitrecord/:visitrecordid")
	.delete(
		auth("user"),
		validate(personalValidation.input.deletePersonalVisitRecord),
		personalController.input.deletePersonalVisitRecord
	);

// likerecord
router
	.route("/likerecord")
	.get(
		auth("user"),
		validate(personalValidation.output.getPsersonalLikeRecord),
		personalController.output.getPersonalLikeRecord
	)
	.post(
		auth("user"),
		validate(personalValidation.input.createPersonalLikeRecord),
		personalController.input.createPersonalLikeRecord
	);

router
	.route("/likerecord/:likerecordid")
	.delete(
		auth("user"),
		validate(personalValidation.input.deletePersonalLikeRecord),
		personalController.input.deletePersonalLikeRecord
	);

// posts list
router
	.route("/posts/:uniqueid")
	.get(
		validate(personalValidation.output.getPsersonalPostsByDate),
		personalController.output.getPersonalPostsByDate
	);

router
	.route("/posts/:uniqueid/:categoryid")
	.get(
		validate(personalValidation.output.getPsersonalPosts),
		personalController.output.getPsersonalPosts
	);

// commnets
router
	.route("/comments")
	.post(
		auth("user"),
		validate(personalValidation.input.createComment),
		personalController.input.createComment
	);

router
	.route("/comments/:commentid")
	.patch(
		auth("user"),
		validate(personalValidation.input.updateComment),
		personalController.input.updateComment
	)
	.delete(
		auth("user"),
		validate(personalValidation.input.deleteComment),
		personalController.input.deleteComment
	);

// search
router
	.route("/:uniqueid/:searchword/:searchtype")
	.get(
		validate(personalValidation.output.searchPsersonalContents),
		personalController.output.searchPersonalposts
	);

module.exports = router;
