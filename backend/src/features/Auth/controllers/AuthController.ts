import { catchAsync } from "../../../middlewares";
import { validateLogin, validateRegister } from "../schemas/AuthSchema";
import { AuthServices } from "../services";
import { createToken, hashPassword } from "../utils/AuthUtils";
import { options } from "../utils/CookiesOptions";
;

export class AuthController {
  constructor(private readonly service: AuthServices) { }

  public register = catchAsync(async (req, res, _next) => {
    const validatedData = validateRegister(req.body);
    const hashedPassword = await hashPassword(validatedData.password);

    const newUser = await this.service.RegisterUser({
      ...validatedData,
      password: hashedPassword,
    });

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

    const user = await this.service.LoginValidateService({ email, password });

    const token = createToken({
      id: user.id,
      email: user.email,
      phone: user.phone,
      createdAt: user.createdAt,
    });

    res.cookie("access_token", token, options).json({
      message: "¡Sesión iniciada correctamente!",
      user,
    });
  });

  public logout = catchAsync(async (_req, res, _next) => {
    res.clearCookie("access_token").status(200).json({
      success: true,
      message: "Sesión cerrada correctamente",
    });
  });

  public getProfile = catchAsync(async (req, res, _next) => {
    const userId = req.user.id;
    const profile = await this.service.getUserProfile(userId);

    res.status(200).json({
      success: true,
      user: profile,
    });
  });
}
