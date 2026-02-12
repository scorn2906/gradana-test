import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Wallet } from './wallet.schema';
import { Model, Types } from 'mongoose';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { Topup, TopupDocument } from './topup.schema';

@Injectable()
export class WalletService {
  constructor(
    @InjectModel(Wallet.name) private walletModel: Model<Wallet>,
    @InjectModel(Topup.name) private topupModel: Model<TopupDocument>,
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,
  ) {}

  async getDashboard(userId: string) {
    try {
      this.logger.info(`Fetching wallet user`, { userId });

      const wallet = await this.walletModel.findOne({
        userId: new Types.ObjectId(userId),
      });

      if (!wallet) {
        this.logger.warn(`Wallet not found`, { userId });
        throw new NotFoundException('Wallet not found');
      }

      this.logger.info(`Wallet found`, {
        userId,
        balance: wallet.balance,
      });

      return {
        balance: wallet.balance,
        history: wallet.topupHistory,
      };
    } catch (error) {
      this.logger.error(`Error fetching wallet`, {
        userId,
        error: error instanceof Error ? error.message : String(error),
      });
      throw error;
    }
  }

  async topupWallet(userId: string, amount: number) {
    const wallet = await this.walletModel.findOne({
      userId: new Types.ObjectId(userId),
    });
    if (!wallet) {
      this.logger.error(`Wallet not found for user ${userId}`);
      throw new NotFoundException('Wallet not found');
    }

    const topup = await this.topupModel.create({
      userId: wallet.userId,
      balance: amount,
      date: new Date(),
    });

    wallet.balance += amount;
    wallet.topupHistory.push({
      userId: wallet.userId,
      balance: amount,
      date: topup.date,
    });

    await wallet.save();
    this.logger.info(`User ${userId} topup ${amount}`);
    return {
      balance: wallet.balance,
      topup: {
        amount,
        date: topup.date,
      },
    };
  }
}
