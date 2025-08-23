import { registerSchema, loginSchema } from "../../common/validators/auth.validator";
import { HTTPSTATUS } from "../../config/http.config";
import { asyncHandler } from "../../midllewares/asyncHandler";
import { AuthService } from "./auth.service";
import { Request, Response } from "express";

export class AuthController {
    private authService: AuthService;

    constructor(authService: AuthService) {
        this.authService = authService;
    }
    public register  = asyncHandler(async (req: Request, res: Response): Promise<any> => {
   
        let body;
        try {
            body = registerSchema.parse({ ...req.body });
        } catch (error: any) {
            // Filter errors for missing required fields only
            const missingFields = (error.errors || [])
                .filter((err: any) => err.code === "invalid_type" && err.received === "undefined")
                .map((err: any) => ({
                    field: err.path?.[0],
                    message: err.message
                }));
            const errors = missingFields.length > 0
                ? missingFields
                : (error.errors || []).map((err: any) => ({
                    field: err.path?.[0],
                    message: err.message
                }));

            return res.status(HTTPSTATUS.BAD_REQUEST).json({
                message: "Validation failed",
                errors,
            });
        }
        const {user} = await this.authService.register(body);
        return res.status(HTTPSTATUS.CREATED).json({
            message: "User registered successfully",
            data: user,
        });
    });


    public login = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const userAgent = req.headers["user-agent"];
      const body = loginSchema.parse({
        ...req.body,
        userAgent,
      });

      const { user, accessToken, refreshToken, mfaRequired } =
        await this.authService.login(body);

      if (mfaRequired) {
        return res.status(HTTPSTATUS.OK).json({
          message: "Verify MFA authentication",
          mfaRequired,
          user,
        });
      }

      return setAuthenticationCookies({
        res,
        accessToken,
        refreshToken,
      })
        .status(HTTPSTATUS.OK)
        .json({
          message: "User login successfully",
          mfaRequired,
          user,
        });
    }
  );

//   public refreshToken = asyncHandler(
//     async (req: Request, res: Response): Promise<any> => {
//       const refreshToken = req.cookies.refreshToken as string | undefined;
//       if (!refreshToken) {
//         throw new UnauthorizedException("Missing refresh token");
//       }

//       const { accessToken, newRefreshToken } =
//         await this.authService.refreshToken(refreshToken);

//       if (newRefreshToken) {
//         res.cookie(
//           "refreshToken",
//           newRefreshToken,
//           getRefreshTokenCookieOptions()
//         );
//       }

//       return res
//         .status(HTTPSTATUS.OK)
//         .cookie("accessToken", accessToken, getAccessTokenCookieOptions())
//         .json({
//           message: "Refresh access token successfully",
//         });
//     }
//   );

//   public verifyEmail = asyncHandler(
//     async (req: Request, res: Response): Promise<any> => {
//       const { code } = verificationEmailSchema.parse(req.body);
//       await this.authService.verifyEmail(code);

//       return res.status(HTTPSTATUS.OK).json({
//         message: "Email verified successfully",
//       });
//     }
//   );

//   public forgotPassword = asyncHandler(
//     async (req: Request, res: Response): Promise<any> => {
//       const email = emailSchema.parse(req.body.email);
//       await this.authService.forgotPassword(email);

//       return res.status(HTTPSTATUS.OK).json({
//         message: "Password reset email sent",
//       });
//     }
//   );

//   public resetPassword = asyncHandler(
//     async (req: Request, res: Response): Promise<any> => {
//       const body = resetPasswordSchema.parse(req.body);

//       await this.authService.resePassword(body);

//       return clearAuthenticationCookies(res).status(HTTPSTATUS.OK).json({
//         message: "Reset Password successfully",
//       });
//     }
//   );

//   public logout = asyncHandler(
//     async (req: Request, res: Response): Promise<any> => {
//       const sessionId = req.sessionId;
//       if (!sessionId) {
//         throw new NotFoundException("Session is invalid.");
//       }
//       await this.authService.logout(sessionId);
//       return clearAuthenticationCookies(res).status(HTTPSTATUS.OK).json({
//         message: "User logout successfully",
//       });
//     }
//   );
// }
    }