import { HttpService } from '@nestjs/axios'
import { firstValueFrom } from 'rxjs'

export class AddressValidation {
  static isZipValid(zip: string): boolean {
    return /^\d{8}$/.test(zip)
  }

  static async validateZip(
    zip: string,
    httpService: HttpService,
  ): Promise<boolean> {
    if (!this.isZipValid(zip)) {
      return false
    }

    const response = await firstValueFrom(
      httpService.get(`https://viacep.com.br/ws/${zip}/json/`),
    )

    const addressData = response.data

    return !addressData.erro
  }
}
