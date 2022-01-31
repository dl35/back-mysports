import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';


@Injectable()
export class LoggerMiddleware implements NestMiddleware {

private logger = new Logger('HTTP');

  use(req: Request, response: Response , next: () => void) {
    const { ip,method, originalUrl  } = req;
    const userAgent = req.get('user-agent') || '';
    
    response.on('finish', () => {
      const { statusCode }  = response;
      const contentLengh = (response.get('content-length')) ? response.get('content-length') : "0";
      

      this.logger.log(
          `${method} ${originalUrl} ${statusCode} ${contentLengh} `
          //`${method} ${originalUrl} ${statusCode} ${contentLengh} - ${userAgent}${ip}`

      )
    }
    )

    

    next();
  }
}
