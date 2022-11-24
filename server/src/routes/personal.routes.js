const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const validate = require("../middleware/validate");
const { personalValidation } = require("../validations/index");
const { personalController } = require("../controller");

/**
 * post
 */
router
	.route("/posts/:uniqueid")
	.get(
		validate(personalValidation.output.getPersonalPostsByDate),
		personalController.output.getPersonalPostsByDate
	);

router
	.route("/posts/count/:uniqueid")
	.get(
		validate(personalValidation.output.getPersonalPostsByDate),
		personalController.output.getPersonalPostCountByDate
	);

router
	.route("/posts/:uniqueid/:categoryid")
	.get(
		validate(personalValidation.output.getPersonalPosts),
		personalController.output.getPsersonalPosts
	);

router
	.route("/post/:uniqueid/:postid")
	.get(
		validate(personalValidation.output.getPersonalPost),
		personalController.output.getPersonalPost
	);

router
	.route("/post")
	.post(
		auth("user"),
		validate(personalValidation.input.createPersonalPost),
		personalController.input.createPersonalPost
	);

router
	.route("/post/:postid")
	.patch(
		auth("user"),
		validate(personalValidation.input.updatePersonalPost),
		personalController.input.updatePersonalPost
	)
	.delete(
		auth("user"),
		validate(personalValidation.input.deletePersonalPost),
		personalController.input.deletePersonalPost
	);

/**
 * category
 */
router
	.route("/category/:uniqueid")
	.get(
		validate(personalValidation.output.getPersonalCategory),
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

/**
 * tmpposts
 */
router
	.route("/tmpposts")
	.get(auth("user"), personalController.output.getPersonalTmpposts)
	.post(
		auth("user"),
		validate(personalValidation.input.createPersonalTmpPost),
		personalController.input.createPersonalTmpPost
	);

router
	.route("/tmpposts/:tmppostid")
	.get(
		auth("user"),
		validate(personalValidation.output.getPersonalTmpPost),
		personalController.output.getPersonalTmppost
	)
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

/**
 * visitrecord
 */
router
	.route("/visitrecord")
	.get(
		auth("user"),
		validate(personalValidation.output.getPersonalVisitRecord),
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

/**
 * likerecord
 */
router
	.route("/likerecord")
	.get(
		auth("user"),
		validate(personalValidation.output.getPersonalLikeRecord),
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

router
	.route("/likerecord/post/:postid")
	.delete(
		auth("user"),
		validate(personalValidation.input.deletePersonalLikeRecordByPostId),
		personalController.input.deletePersonalLikeRecordByPostId
	);
/**
 * commnets
 */
router
	.route("/comments/g/:postid")
	.get(
		validate(personalValidation.output.getPersonalComments),
		personalController.output.getPersonalComments
	);
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

/**
 * search
 */
router
	.route("/search/personal/:searchword/:searchtype")
	.get(
		auth("user"),
		validate(personalValidation.output.searchPersonalContents),
		personalController.output.searchPersonalposts
	);
router
	.route("/search/common/:uniqueid/:searchword")
	.get(
		validate(personalValidation.output.searchCommonContents),
		personalController.output.searchCommonposts
	);

/**
 * associate
 */
router
	.route("/associate/:postid")
	.get(
		validate(personalValidation.output.associatePersonalContents),
		personalController.output.associatePersonalposts
	);
module.exports = router;
