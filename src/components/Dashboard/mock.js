import { faker } from '@faker-js/faker';
// import { faker } from '@faker-js/faker/locale/de';

export const USERS = [];

export function createRandomUser() {
  return {
    name: faker.name.firstName() + " " + faker.name.lastName(),
    email: faker.internet.email(),
    registeredAt: faker.date.past(),
  };
}

Array.from({ length: 100 }).forEach(() => {
  USERS.push(createRandomUser());
});