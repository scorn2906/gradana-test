/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Wallet, WalltetSchema } from './wallet.schema';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { Topup, TopupSchema } from './topup.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Wallet.name, schema: WalltetSchema },
      { name: Topup.name, schema: TopupSchema },
    ]),
  ],
  controllers: [WalletController],
  providers: [WalletService],
  exports: [WalletService],
})
export class WalletModule {}
