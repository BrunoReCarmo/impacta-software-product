import { router } from "@/adapters/router.adapter";
import { PostController } from "@/controllers/post/post.controller";
import MidVerifyToken from "@/middleware/token.middleware";

const postController = new PostController()

router.get('/post/tags', MidVerifyToken, async (req, res) => {
    await postController.PostTags(req, res);
});

router.post('/post', MidVerifyToken, async (req, res) => {
    await postController.CreatePost(req, res);
});
router.get('/post', async (req, res) => {
    await postController.GetPosts(req, res);
});

export default router;