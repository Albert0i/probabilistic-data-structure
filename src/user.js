import { faker } from '@faker-js/faker';

function formatDateToYYYYMMDD(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Ensure two-digit month
  const day = String(date.getDate()).padStart(2, "0"); // Ensure two-digit day

  return Number(`${year}${month}${day}`);
}

export function generateUser() {
    return {
      id: faker.string.ulid(),
      fullname: faker.person.fullName(),
      email: faker.internet.email(),
      birthdate: formatDateToYYYYMMDD(faker.date.birthdate()),
      gender: faker.person.sex(),
      phone: faker.phone.imei(),
      // jobTitle: faker.person.jobTitle(),
      // jobType: faker.person.jobType(), 
      // jobDescription: faker.lorem.sentences({ min: 5, max: 10 }), 
      createdAt: faker.date.past().toISOString(),
    };
  } 
/*
   @faker-js/faker
   https://www.npmjs.com/package/@faker-js/faker

   API Reference
   https://fakerjs.dev/api/

      jobTitle: faker.person.jobTitle(),
      jobType: faker.person.jobType(), 
      jobDescription: faker.lorem.sentences({ min: 5, max: 10 }), 
*/
