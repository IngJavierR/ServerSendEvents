process.env.NODE_ENV = 'test'

import { expect } from "chai";
import { sseService } from "../../src/services";

describe('sseService Test', () => {

  describe('FindAll', async() => {
    it('should return one user', async () => {
      expect(sseService.findAll());
    });
  });

});