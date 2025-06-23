import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {
  // This module is global, so it can be imported in any other module without needing to re-import it.
  // The PrismaService is provided globally, allowing it to be injected anywhere in the application.
}
