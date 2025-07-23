import { catchAsync } from "../../../middlewares";
import { validateRegister } from "../schemas/AuthSchema"
import { AuthService } from "../services"
import { hashPassword } from '../utils/AuthUtils';


class AuthController {

    /**
     * Register User Controller
     */
    public register = catchAsync(async (req, res, _next) => {
        const validatedData = validateRegister(req.body);

        const hashedPassword = await hashPassword(validatedData.password);

        const newUser = await AuthService.RegisterUser({
            ...validatedData,
            password: hashedPassword,
        });

        // await sendEmail(newUser.email, newUser.name);
        res.status(201).json({
            message: "Usuario registrado correctamente.",
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
            },
        });
    });

}


export const useAuth = new AuthController()
