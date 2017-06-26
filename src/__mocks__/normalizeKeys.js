const norrmalizeKeysModuleMock = jest.genMockFromModule('./normalizeKeys');
norrmalizeKeysModuleMock.normalizeKeys = jest.fn().mockImplementation(key => key);
module.exports = norrmalizeKeysModuleMock;