import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Address } from '../entities/address.entity'
import { HttpService } from '@nestjs/axios'
import { firstValueFrom } from 'rxjs'
import { User } from '../entities/user.entity'

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
    private httpService: HttpService,
  ) {}

  async findAddressByZip(zip: string): Promise<any> {
    const response = await firstValueFrom(
      this.httpService.get(`https://viacep.com.br/ws/${zip}/json`),
    )

    return response.data
  }

  async createWithUser(
    addressData: Partial<Address>,
    user: User,
  ): Promise<Address> {
    const address = this.addressRepository.create({
      ...addressData,
      user,
    })
    return this.addressRepository.save(address)
  }
}
