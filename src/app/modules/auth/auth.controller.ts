import {
  Body,
  Controller,
  HttpStatus,
  Logger,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
// import { EmailExistGuard } from '../../guards/email-exists.guards';
import { exceptionHandler } from '../../helpers/exception-handler.helpers';
import { AuthService } from './auth.service';
import {
  default as CreateUserDto,
  default as SignUpDto,
} from './dto/sign-up.dto';
import TokensDto from './dto/tokens.dto';
@ApiTags('AuthController')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'регистрация пользователя' })
  @ApiResponse({ status: HttpStatus.OK, type: TokensDto })
  @ApiBody({ type: CreateUserDto, description: '' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'ошибка валидации полей',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'электронная почта уже существует',
  })
  //   @UseGuards(EmailExistGuard)
  @Post('signup')
  async signUp(@Body() createUserDto: SignUpDto): Promise<TokensDto> {
    try {
      return await this.authService.signUp(createUserDto);
    } catch (error) {
      throw exceptionHandler(error, this.logger);
    }
  }
}
