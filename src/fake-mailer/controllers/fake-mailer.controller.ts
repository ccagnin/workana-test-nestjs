import { Controller } from '@nestjs/common'
import { FakeMailerService } from '../services/fake-mailer.service'

@Controller('fake-mailer')
export class FakeMailerController {
  constructor(private readonly fakeMailerService: FakeMailerService) {}
}
