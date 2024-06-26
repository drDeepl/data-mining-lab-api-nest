import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from '../auth/auth.module';
import { PrismaModule } from '../prisma/prisma.module';
import { ResearchPaperModule } from '../research-paper/research-paper.module';
import { UserModule } from '../user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContestModule } from '../contest/contest.module';
import { TeamModule } from '../team/team.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env`],
      cache: true,
    }),
    ServeStaticModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => [
        {
          rootPath: join(__dirname, '../../../..', 'wwwroot'),
          serveRoot: `/${configService.get<string>('SWAGGER_URL')}/wwwroot`,
        },
      ],
    }),
    PrismaModule,
    AuthModule,
    UserModule,
    ResearchPaperModule,
    ContestModule,
    TeamModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
