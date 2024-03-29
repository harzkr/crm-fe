import { faker } from '@faker-js/faker';
// import { faker } from '@faker-js/faker/locale/de';

export const USERS = [];

export function createRandomUser() {
  return {
    name: faker.name.firstName() + " " + faker.name.lastName(),
    email: faker.internet.email(),
    registeredAt: faker.date.past(),
    lastMessage: faker.lorem.sentence(),
  };
}

Array.from({ length: 5 }).forEach(() => {
  USERS.push(createRandomUser());
});