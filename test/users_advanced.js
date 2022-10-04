require('dotenv').config();
const expect = require('chai').expect;
const request = require('supertest');
const token = process.env.TOKEN;
const dataUser = {
                    "name": "Fler Rox",
                    "email": "test6@gmail.com",
                    "gender": "female",
                    "status": "active"
                };
const changedInfo = {"status": "inactive"};

describe('Users', ()=>{
    let userID;
    describe('POST', () => {
        it('/users', async () => {
            const res = await request('https://gorest.co.in/public/v2/')
                .post('users')
                .set('Authorization', `Bearer ${token}`)
                .send(dataUser)

            expect(res.body).to.deep.include(dataUser);
            userID = res.body.id;
        });
    });

    describe('GET', () => {
        it('/users', async () => {
            const res = await request('https://gorest.co.in/public/v2/')
                .get(`users?access-token=${token}`);
            expect(res.body).to.not.be.empty;
        });

        it('/users/:id', async () => {
            const res = await request('https://gorest.co.in/public/v2/')
                .get(`users/${userID}?access-token=${token}`);
            expect(res.body.id).to.be.eq(userID);
        });

        it('/users/different parameters', async () => {
            const res = await request('https://gorest.co.in/public/v2/')
                .get(`users?access-token=${token}&page=4&status=active`);
            expect(res.body).to.not.be.empty;
            
            await res.body.forEach(element => {
                expect(element.status).to.eq('active');
            });
        });

    });

    describe('PUT', () => {
        it('/users/:id', async () => {
            const res = await request('https://gorest.co.in/public/v2/')
                .put(`users/${userID}`)
                .set('Authorization', `Bearer ${token}`)
                .send(changedInfo)
            expect(res.body.status).to.eq('inactive');

        });
    });
    
    describe('DELETE', () => {
        it('DELETE/users/:id', async () => {
            const res = await request('https://gorest.co.in/public/v2/')
            .delete(`users/${userID}`)
            .set('Authorization', `Bearer ${token}`)
            expect(res.body[0]).to.eq(undefined);
        });

    });  
})

