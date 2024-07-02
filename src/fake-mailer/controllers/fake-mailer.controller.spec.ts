import { Test, TestingModule } from '@nestjs/testing'
import { FakeMailerController } from './fake-mailer.controller'
import { FakeMailerService } from '../services/fake-mailer.service'

describe('FakeMailerController', () => {
  let controller: FakeMailerController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FakeMailerController],
      providers: [FakeMailerService],
    }).compile()

    controller = module.get<FakeMailerController>(FakeMailerController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
