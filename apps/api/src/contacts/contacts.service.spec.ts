import { NotFoundException } from "@nestjs/common"
import { ContactsService } from "./contacts.service"

const now = new Date("2026-06-23T00:00:00.000Z")

function createPrismaMock() {
  return {
    contact: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn()
    }
  }
}

describe("ContactsService", () => {
  it("creates an unverified contact with normalized email", async () => {
    const prisma = createPrismaMock()
    const mockObject = {
      id: "contact-1",
      firstName: "Alex",
      lastName: "Nguyen",
      email: "alex@example.com",
      phone: "0412 345 678",
      note: "Call after 2pm",
      verified: false,
      createdAt: now,
      updatedAt: now
    }
    prisma.contact.create.mockResolvedValue(mockObject)

    const service = new ContactsService(prisma as never)
    const result = await service.create({
      firstName: " Alex ",
      lastName: " Nguyen ",
      email: " ALEX@EXAMPLE.COM ",
      phone: " 0412 345 678 ",
      note: " Call after 2pm "
    })

    expect(prisma.contact.create).toHaveBeenCalledWith({
      data: {
        firstName: mockObject.firstName,
        lastName: mockObject.lastName,
        email: mockObject.email,
        phone: mockObject.phone,
        note: mockObject.note
      }
    })
  })

  it("lists contacts newest first", async () => {
    const prisma = createPrismaMock()
    prisma.contact.findMany.mockResolvedValue([])

    const service = new ContactsService(prisma as never)
    await service.findAll()

    expect(prisma.contact.findMany).toHaveBeenCalledWith({
      orderBy: {
        createdAt: "desc"
      }
    })
  })

  it("marks an existing contact as verified", async () => {
    const prisma = createPrismaMock()
    prisma.contact.findUnique.mockResolvedValue({ id: "contact-1" })
    prisma.contact.update.mockResolvedValue({ id: "contact-1", verified: true })

    const service = new ContactsService(prisma as never)
    const result = await service.update("contact-1", { verified: true })

    expect(result).toEqual({ id: "contact-1", verified: true })
    expect(prisma.contact.update).toHaveBeenCalledWith({
      where: { id: "contact-1" },
      data: { verified: true }
    })
  })

  it("deletes an existing contact", async () => {
    const prisma = createPrismaMock()
    prisma.contact.findUnique.mockResolvedValue({ id: "contact-1" })
    prisma.contact.delete.mockResolvedValue({ id: "contact-1" })

    const service = new ContactsService(prisma as never)
    await expect(service.remove("contact-1")).resolves.toEqual({ id: "contact-1" })
  })

  it("throws when updating a missing contact", async () => {
    const prisma = createPrismaMock()
    prisma.contact.findUnique.mockResolvedValue(null)

    const service = new ContactsService(prisma as never)
    await expect(service.update("missing", { verified: true })).rejects.toBeInstanceOf(NotFoundException)
  })
})
