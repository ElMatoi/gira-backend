
import { MinLength,IsEmail } from "class-validator";

export class ResetPasswordDto {
  @IsEmail()
  email: string;
  @MinLength(6)
  newPassword: string;
}