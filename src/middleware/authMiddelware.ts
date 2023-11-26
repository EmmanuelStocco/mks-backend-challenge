import * as jwt from 'jsonwebtoken';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { UserModel } from 'src/models/user.model';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

type JwtPayload = {
  id: number;
};

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @InjectRepository(UserModel) private userRepository: Repository<UserModel>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const { authorization } = req.headers;

    if (!authorization) {
      throw new UnauthorizedException('Unauthorized, access denied.');
    }

    const token = authorization.split(' ')[1];

    try {
      const { id } = jwt.verify(
        token,
        process.env.JWT_PASS ?? '',
      ) as JwtPayload;

      const user = await this.userRepository.findOneBy({ id });

      if (!user) {
        throw new UnauthorizedException('Unauthorized, access denied.');
      }

      const { password: _, ...loggedUser } = user;

      req.user = loggedUser;

      return true;
    } catch (error) {
      throw new UnauthorizedException(
        'Unauthorized, invalid token or access denied.',
      );
    }
  }
}
