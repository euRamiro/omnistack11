const generateUniqueId = require('../../src/utils/genrateUniqueId');

describe('Generate Unique Id', () => {
  it('deve gerar um id único', () => {
    const id = generateUniqueId();

    expect(id).toHaveLength(8);
  });
});