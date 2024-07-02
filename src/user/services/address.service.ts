import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Address } from '../entities/address.entity'
import { HttpService } from '@nestjs/axios'
import { User } from '../entities/user.entity'
import { AddressValidation } from '../validations/address.validation'

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
    private httpService: HttpService,
  ) {}

  async validateAddress(zip: string): Promise<void> {
    const isValid = await AddressValidation.validateZip(zip, this.httpService)
    if (!isValid) throw new BadRequestException('CEP inválido')
  }

  async createWithUser(
    addressData: Partial<Address>,
    user: User,
  ): Promise<Address> {
    await this.validateAddress(addressData.zip)

    const address = this.addressRepository.create({
      ...addressData,
      user,
    })
    return this.addressRepository.save(address)
  }
}
