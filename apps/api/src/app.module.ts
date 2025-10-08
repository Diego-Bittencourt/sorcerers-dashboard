import { Module } from '@nestjs/common';
import { SoulcoreModule } from './modules/soulcore/soulcore.module';
import { MongooseModule } from '@nestjs/mongoose';

import { ConfigModule, ConfigService } from '@nestjs/config';
console.log('HEREEEEEEEEEEEEE', process.env.MONGO_CONNECT);
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // makes ConfigService available everywhere
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_CONNECT'),
      }),
    }),
    SoulcoreModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
