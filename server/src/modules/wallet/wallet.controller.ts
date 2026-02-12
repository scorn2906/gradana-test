import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import type { AuthUser } from 'src/common/interface/auth-user.interface';
import { TopupDTO } from './dto/topup.dto';

@Controller('wallet')
export class WalletController {
  constructor(private walletService: WalletService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getDashboard(@CurrentUser() user: AuthUser) {
    return this.walletService.getWallet(user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('topup')
  async topup(@CurrentUser() user: AuthUser, @Body() dto: TopupDTO) {
    return this.walletService.topupWallet(user.userId, dto.amount);
  }
}
