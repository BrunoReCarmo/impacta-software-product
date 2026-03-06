import { AuthController } from "@/controllers";
import { Request, Response } from "@common/models";
import { router } from "@/adapters/router.adapter";
import { LoginInputDTO, SignUpInputDTO } from "@common/dto";

const authController = new AuthController()

router.get('/iam/login', async (req: Request<LoginInputDTO>, res: Response<string>) => {
    await authController.login(req, res);
});

router.post('/iam/sign-up', async (req: Request<SignUpInputDTO>, res: Response<string>) => {
    await authController.signUp(req, res);
});

export default router;