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
        return res.status(HTTPSTATUS.CREATED).json({
            message: "User registered successfully",
        });
    });
    }