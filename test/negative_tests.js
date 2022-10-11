require('dotenv').config();
const conf = require("../config/conf") 
const expect = require('chai').expect;

const request = require('supertest');
const token = process.env.TOKEN;
const dataUser = {
    "name": "Piter Rox",
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
        const dataUser = {
            "name": "Piter Rox",
            "gender": "male",
            "status": "active"
        };
        const res = await request(conf.baseUrl)
                    .post('users')
                    .set('Authorization', `Bearer ${token}`)
                    .send(dataUser)
        expect(res.body[0].message).to.eq("can't be blank");
    });
});