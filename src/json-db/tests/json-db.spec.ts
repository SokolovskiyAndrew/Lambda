import * as fs from 'fs';
import request from 'supertest';
import jsonDbApp from '../json-db';
import * as createDbService from '../services/create-db.service';
import * as utilityFunctions from '../utils/utility.functions';

describe('json DB', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Need to check for special characters absence', () => {
    it('should return bad request status if special characters provided as a path', async () => {
      const res = await request(jsonDbApp).post('/.').send({
        name: 'test',
        surname: 'supertest'
      });

      expect(res.status).toEqual(400);
    });

    it('should return bad request status if url path is empty', async () => {
      const res = await request(jsonDbApp).post('').send({
        name: 'test',
        surname: 'supertest'
      });

      expect(res.status).toEqual(400);
    });

    it('should return bad request status if white spaces provided as a url path', async () => {
      const res = await request(jsonDbApp).post('/   ').send({
        name: 'test',
        surname: 'supertest'
      });

      expect(res.status).toEqual(400);
    });

    it('should return bad request status if one of a url paths is defined as special characters', async () => {
      const res = await request(jsonDbApp).post('/my-collection/*&+').send({
        name: 'test',
        surname: 'supertest'
      });

      expect(res.status).toEqual(400);
    });

    it('should return created status if one of a url paths consist of letter', async () => {
      jest.spyOn(createDbService, 'createDB').mockResolvedValue();
      const res = await request(jsonDbApp).post('/my-collection/users').send({
        name: 'test',
        surname: 'supertest'
      });

      expect(res.status).toEqual(201);
    });
  });

  describe('check collection existence POST request', () => {
    it('should return bad request status if collection has been already created', async () => {
      const createDbSpy = jest.spyOn(createDbService, 'createDB').mockResolvedValue();
      jest.spyOn(utilityFunctions, 'isEntityExist').mockResolvedValue(true);
      const res = await request(jsonDbApp).post('/my-collection/users').send({
        name: 'test',
        surname: 'supertest'
      });

      expect(createDbSpy).not.toHaveBeenCalled();
      expect(res.status).toEqual(400);
    });

    it('should return created status if collection has not been already created', async () => {
      const createDbSpy = jest.spyOn(createDbService, 'createDB').mockResolvedValue();
      jest.spyOn(utilityFunctions, 'isEntityExist').mockResolvedValue(false);
      const res = await request(jsonDbApp).post('/my-collection/users').send({
        name: 'test',
        surname: 'supertest'
      });

      expect(createDbSpy).toHaveBeenCalled();
      expect(res.status).toEqual(201);
    });
  });

  describe('check collection existence GET request', () => {
    it('should return bad request status if collection does not exist', async () => {
      const mockCollection = JSON.stringify([{ name: 'user' }]);
      const readFileSpy = jest.spyOn(fs.promises, 'readFile').mockResolvedValue(mockCollection);
      jest.spyOn(utilityFunctions, 'isEntityExist').mockResolvedValue(false);
      const res = await request(jsonDbApp).get('/my-collection/users');

      expect(readFileSpy).not.toHaveBeenCalled();
      expect(res.status).toEqual(400);
    });

    it('should return ok status if collection exists', async () => {
      const mockCollection = JSON.stringify([{ name: 'user' }]);
      const readFileSpy = jest.spyOn(fs.promises, 'readFile').mockResolvedValue(mockCollection);
      jest.spyOn(utilityFunctions, 'isEntityExist').mockResolvedValue(true);
      const res = await request(jsonDbApp).get('/my-collection/users');

      expect(readFileSpy).toHaveBeenCalled();
      expect(res.status).toEqual(200);
    });
  });
});
