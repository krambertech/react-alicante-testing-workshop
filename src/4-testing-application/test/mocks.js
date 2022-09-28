// I created some generators here, in real life you can use a library like
// faker to generate random data.
//
// Additionally you can generate mocks automatically out of TypeScript types
// or GraphQL schemas.

// Generates random numaric ID
const mockId = () => Math.floor(Math.random() * 1000);

// Generates UUID
const mockUuid = () => Math.random().toString(36).substring(2);

// Generates musing object
function mockMusing(overrides = {}) {
  return {
    id: mockId(),
    text: "Hello world",
    author_id: mockUuid(),
    created_at: new Date().toISOString(),
    ...overrides,
  };
}

// Generates user object
function mockUser(overrides = {}) {
  return {
    id: mockUuid(),
    email: "hello@test.com",
    ...overrides,
  };
}

export { mockId, mockMusing, mockUser, mockUuid };
