import { WalletModule } from './modules/wallet/wallet.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseConfig } from './config/database.config';
import { UserModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { loggerConfig } from './config/winston.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    WalletModule,
    AuthModule,
    UserModule,
    DatabaseConfig,
    WinstonModule.forRoot(loggerConfig),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
