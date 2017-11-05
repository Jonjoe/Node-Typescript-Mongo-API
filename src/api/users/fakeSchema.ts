import * as Faker from 'faker'

export default {
  firstName: () => Faker.name.firstName(),
  lastName: () => Faker.name.lastName(),
  emailAddress: () => Faker.internet.email(),
  password: () => Faker.internet.password()
}
