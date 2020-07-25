// Nest
import { Module, NestModule, RequestMethod, MiddlewareConsumer } from '@nestjs/common';

// Modules
//import { AuthModule } from './modules/auth/auth.module';
import { RealtimeModule } from './modules/realtime/realtime.module';

//  Database import
import { DatabaseModule } from './database';

//  Gateway sockets
import { AppGateway } from './app.gateway';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { TokenMiddleware } from './common/middlewares/token.middleware';
import { TenantMiddleware } from './common/middlewares/tenant.middleware';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
@Module({
	imports: [
        //AuthModule,
        //UsersModule,
        DatabaseModule,
        //AuthModule
		//RealtimeModule
	],
	controllers: [],
	providers: [
		AppGateway,
	]
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
  	console.log('conchasumare');
		consumer
		.apply(LoggerMiddleware, TenantMiddleware, TokenMiddleware)
    .forRoutes('*');
  }
}