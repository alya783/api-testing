require('dotenv').config();
const conf = require("../config/conf") 
const expect = require('chai').expect;
const { faker } = require('@faker-js/faker');
const request = require('supertest');
const token = process.env.TOKEN;
let name = faker.name.fullName({ sex: 'male' });
const dataUser = {
    "name": `${name}`,
    "gender": "male",
    "status": "active"
};

describe('Users', () => {
    it('401 Authentification failed', async () => {
        const res = await request(conf.baseUrl)
                    .post('users')
                    .send(dataUser)
        expect(res.body.message).to.eq('Authentication failed');
    });

    it('422 Data validation failed', async () => {
        const res = await request(conf.baseUrl)
                    .post('users')
                    .set('Authorization', `Bearer ${token}`)
                    .send(dataUser)
        expect(res.body[0].message).to.eq("can't be blank");
    });
});