import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDTO } from './dto/register.dto';
import { Logger } from 'winston';
import { User, UserDocument } from '../users/users.schema';
import { Model } from 'mongoose';
import bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { LoginDTO } from './dto/login.dto';
import { Wallet } from '../wallet/wallet.schema';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Wallet.name) private walletModel: Model<Wallet>,
    private jwtService: JwtService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  async register(req: RegisterDTO) {
    const { name, email, phone, password } = req;

    const existing = await this.userModel.findOne({
      $or: [{ email }, { phone }],
    });

    if (existing) {
      this.logger.warn('Email or phone already used');
      throw new BadRequestException('Email or phone already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    await this.walletModel.create({
      userId: user._id,
      balance: 0,
      topupHistory: [],
    });
    return { userId: user._id };
  }

  async login(req: LoginDTO) {
    const user = await this.userModel.findOne({ email: req.email });

    if (!user) {
      this.logger.warn('Login failed: user not found', { email: req.email });
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(req.password, user.password);

    if (!isMatch) {
      this.logger.warn('Login failed: wrong password', { email: req.email });
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: user._id,
      email: user.email,
    };

    const token = this.jwtService.sign(payload);
    return { access_token: token };
  }
}
