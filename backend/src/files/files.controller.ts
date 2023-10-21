import {
	Controller,
	Post,
	UploadedFile,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FileElementResponse } from './dto/file-element.response';
import { FilesService } from './files.service';
import { MFile } from './mfile.class';
//===========================================================================================================

@Controller('files')
export class FilesController {
	constructor(private readonly fileService: FilesService) {}

	/* Сохранение файлов на бэкенде */
	@Post('upload')
	@UseGuards(JwtAuthGuard)
	@UseInterceptors(FileInterceptor('file'))
	async uploadFiles(
		@UploadedFile() file: Express.Multer.File,
	): Promise<FileElementResponse[]> {
		const resultArray: MFile[] = [];

		if (file.mimetype.includes('image')) {
			const buffer = await this.fileService.convertToWebP(file.buffer);
			resultArray.push(
				new MFile({
					originalname: `${file.originalname.split('.')[0]}.webp`,
					buffer,
				}),
			);
		}

		if (file.mimetype.includes('audio')) {
			resultArray.push(
				new MFile({
					originalname: file.originalname,
					buffer: file.buffer,
				}),
			);
		}
		return this.fileService.saveFile(resultArray);
	}
}
