import { router } from "@/adapters/router.adapter";
import MidVerifyToken from "@/middleware/token.middleware";
import { UserController } from "@/controllers/user/user.controller";

const userController = new UserController()

router.get('/user/me', MidVerifyToken, async (req, res) => {
    await userController.userMe(req, res);
});

export default router;