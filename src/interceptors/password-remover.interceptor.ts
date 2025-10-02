import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class PasswordRemoverInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((v) => {
        if ('password' in v) {
          const { password, ...rest } = v;
          return rest;
        }
        return v;
      }),
    );
  }
}

// โค้ดนี้คือตัวอย่างของ Interceptor ใน NestJS ชื่อ PasswordRemoverInterceptor 
// ใช้สำหรับ “ลบข้อมูลรหัสผ่าน (password)” ออกจาก object ที่จะถูกส่ง response จาก API 
// ไปยัง client เพื่อป้องกันการเผยรหัสผ่านใน API Response
