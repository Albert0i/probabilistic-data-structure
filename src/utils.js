import { faker } from '@faker-js/faker';

export function generateUser() {
    return {
      id: faker.string.ulid(),
      fullname: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      birthdate: faker.date.birthdate(),
      sex: faker.person.sex(),
      phone: faker.phone.number(),
      registeredAt: faker.date.past().toISOString(),
    };
  } 
/*
   @faker-js/faker
   https://www.npmjs.com/package/@faker-js/faker

   API Reference
   https://fakerjs.dev/api/
*/