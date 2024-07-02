import { Module } from '@nestjs/common'
import { FakeMailerService } from '../services/fake-mailer.service'

@Module({
  providers: [FakeMailerService],
  exports: [FakeMailerService],
})
export class FakeMailerModule {}
