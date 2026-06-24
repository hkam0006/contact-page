import { Injectable, NotFoundException } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"
import { CreateContactDto } from "./dto/create-contact.dto"
import { UpdateContactDto } from "./dto/update-contact.dto"

@Injectable()
export class ContactsService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateContactDto) {
    return this.prisma.contact.create({
      data: {
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        email: data.email.trim().toLowerCase(),
        phone: data.phone.trim(),
        note: data.note?.trim() || null
      }
    })
  }

  findAll() {
    return this.prisma.contact.findMany({
      orderBy: {
        createdAt: "desc"
      }
    })
  }

  async update(id: string, data: UpdateContactDto) {
    const existing = await this.prisma.contact.findUnique({ where: { id } })
    if (!existing) {
      throw new NotFoundException("Contact not found")
    }

    return this.prisma.contact.update({
      where: { id },
      data: {
        verified: data.verified
      }
    })
  }

  async remove(id: string) {
    const existing = await this.prisma.contact.findUnique({ where: { id } })
    if (!existing) {
      throw new NotFoundException("Contact not found")
    }

    await this.prisma.contact.delete({ where: { id } })
    return { id }
  }
}
