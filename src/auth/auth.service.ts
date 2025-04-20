import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthEntity } from './entity';
import { AuthUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(AuthEntity)
    private readonly authRepo: Repository<AuthEntity>,
  ) {}

  async validateUser(
    dto: AuthUserDto,
  ): Promise<{ access_token: string } | null> {
    const user = await this.authRepo.findOne({
      where: { username: dto.username },
    });

    if (!user) return null;

    const isMatch = await bcrypt.compare(dto.password, user.password);

    if (!isMatch) return null;

    const payload = { sub: user.id, username: user.username };
    const access_token = this.jwtService.sign(payload);

    return { access_token };
  }
}
