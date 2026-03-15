import { AuthController } from "@/controllers";
import { router } from "@/adapters/router.adapter";

const authController = new AuthController()

router.post('/iam/login', async (req, res) => {
    await authController.login(req, res);
});

router.post('/iam/sign-up', async (req, res) => {
    await authController.signUp(req, res);
});

export default router;
