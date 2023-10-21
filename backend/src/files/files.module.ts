import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { path } from 'app-root-path';
import { ServeStaticModule } from '@nestjs/serve-static';
//===========================================================================================================

@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: `${path}/uploads`,
			serveRoot: '/static',
		}),
	],
	controllers: [FilesController],
	providers: [FilesService],
})
export class FilesModule {}
