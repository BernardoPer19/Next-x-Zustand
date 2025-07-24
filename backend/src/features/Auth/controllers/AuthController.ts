import { catchAsync } from "../../../middlewares";
import { validateLogin, validateRegister } from "../schemas/AuthSchema"
import { AuthService } from "../services"
import { createToken, hashPassword } from '../utils/AuthUtils';
import { options } from "../utils/CookiesOptions";


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


    public login = catchAsync(async (req, res, _next) => {
        const { email, password } = validateLogin(req.body);

        const user = await AuthService.LoginValidateService({ email, password });

        const token = createToken({
            id: user.id,
            email: user.email,
            phone: user.phone,
            createdAt: user.createdAt,
        });

        res
        .status(200)
        .cookie("access_token", token, options)
        .json({
            message: "¡Sesión iniciada correctamente!",
            user,
        });
    });

}


export const useAuth = new AuthController()
