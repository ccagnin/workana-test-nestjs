import { Test, TestingModule } from '@nestjs/testing'
import { FakeMailerService } from './fake-mailer.service'

describe('FakeMailerService', () => {
  let service: FakeMailerService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FakeMailerService],
    }).compile()

    service = module.get<FakeMailerService>(FakeMailerService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
