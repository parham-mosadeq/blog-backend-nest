import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { AuthUserDto } from './dto/create-user.dto';
import { AuthEntity } from './entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(AuthEntity)
    private readonly authRepo: Repository<AuthEntity>,
  ) {}

  async login(dto: AuthUserDto) {
    const user = await this.authRepo.findOne({
      where: { username: dto.username },
    });

    if (!user) {
      throw new NotFoundException(`Invalid username - ${dto.username}`);
    }

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Invalid email or password');
    }

    const payload = { sub: user.id, username: user.username };
    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
      user: {
        id: user.id,
        username: user.username,
      },
    };
  }

  async register({ password, username }: AuthUserDto) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = this.authRepo.create({ password: hashedPassword, username });
    await this.authRepo.save(user);

    return this.authRepo.findOne({ where: { username } });
  }
}
