import { randomUUID } from 'node:crypto'

interface Login {
  email: string
  password: string
}

export class LoginEntity {
  public id: string
  public email: string
  public password: string

  constructor ({ email, password }: Login) {
    this.id = randomUUID()
    this.email = email
    this.password = password
  }
}
