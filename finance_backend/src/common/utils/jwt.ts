import jwt, { SignOptions, VerifyOptions } from "jsonwebtoken";
import { SessionDocument } from "../../databse/models/session.model";
import { UserDocument } from "../../databse/models/user.model";
import { config } from "../../config/app.config";

export type AccessTPayload = {
  userId: UserDocument["_id"];
  sessionId: SessionDocument["_id"];
};

export type RefreshTPayload = {
  sessionId: SessionDocument["_id"];
};

type SignOptsAndSecret = SignOptions & {
  secret: string;
};

const defaults: SignOptions = {
  audience: ["user"],
};

export const accessTokenSignOptions: SignOptsAndSecret = {
  secret: config.JWT.SECRET,
};

export const refreshTokenSignOptions: SignOptsAndSecret = {
  secret: config.JWT.REFRESH_SECRET,
};

export const signJwtToken = (
  payload: AccessTPayload | RefreshTPayload,
  options?: SignOptsAndSecret
) => {
  const { secret, ...opts } = options || accessTokenSignOptions;
  return jwt.sign(payload, secret, {
    ...defaults,
    ...opts,
  });
};

// export const verifyJwtToken = <TPayload extends object = AccessTPayload>(
//   token: string,
//   options?: VerifyOptions & { secret: string }
// ) => {
//   try {
//     const { secret = config.JWT.SECRET, ...opts } = options || {};
//     const payload = jwt.verify(token, secret, {
//       ...defaults,
//       ...opts,
//     }) as TPayload;
//     return { payload };
//   } catch (err: any) {
//     return {
//       error: err.message,
//     };
//   }
// };