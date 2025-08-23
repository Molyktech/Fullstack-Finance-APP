export interface RegisterDto {

  email: string;
  password: string;
    address1: string;
    city: string;
    state: string;
    postalCode: string;
    dateOfBirth: Date;
    ssn: string;
  firstName: string;
  lastName: string;
  userAgent?: string;
}

export interface LoginDto {
  email: string;
  password: string;
  userAgent?: string;
}

export interface resetPasswordDto {
  password: string;
  verificationCode: string;
}