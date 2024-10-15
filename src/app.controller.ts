import { Controller, Get, HttpStatus, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { IResponse } from './core/interfaces/response.interface';
import { CreateImageDto } from './create.img.dto';

@Controller()
export class AppController {
  @Get('/health-check')
  healthCheck(): IResponse {
    return {
      _data: new Date(),
      _metadata: {
        message: 'Health check success.',
        statusCode: HttpStatus.OK,
      },
    };
  }

  @Post('/image')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateImageDto })
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (_, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  createImg(@UploadedFile() file: Express.Multer.File): IResponse {
    return {
      _data: { filename: file.filename },
      _metadata: {
        message: 'Image successfully uploaded.',
        statusCode: HttpStatus.OK,
      },
    };
  }
}
