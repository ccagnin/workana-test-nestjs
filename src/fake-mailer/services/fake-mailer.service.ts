import { Injectable } from '@nestjs/common'

@Injectable()
export class FakeMailerService {
  async sendPasswordResetEmail(email: string, resetUrl: string, name: string) {
    console.log(`Email enviado para: ${email}`)
    console.log(`Link de redefinição de senha: ${resetUrl}`)
    console.log(`Nome do usuário: ${name}`)
  }
}
