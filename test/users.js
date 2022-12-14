require('dotenv').config();
const expect = require('chai').expect;
const request = require('supertest');
const { faker } = require('@faker-js/faker');
const token = process.env.TOKEN;
let name = faker.name.fullName({ sex: 'female' });
let email = faker.internet.email();
const dataUser = {
                    "name": `${name}`,
                    "email": `${email}`,
                    "gender": "female",
                    "status": "active"
                };

describe('Users', ()=>{
    let userID;
    /*it('GET /users', (done)=>{
        request('https://gorest.co.in/public/v2/')
            .get(`users?access-token=${token}`)
            .end((err, res) => {
                //console.log("errors: ", err);
                //console.log("body: ", res.body);
                //console.log("body type: ", typeof(res.body));
                //console.log("body keys: ", Object.keys(res.body));
                //console.log("Body['0']: ", res.body['0']);
                expect(res.body).to.not.be.empty;
                done();
            })
    });*/
    it('GET /users', async () => {
        const res = await request('https://gorest.co.in/public/v2/')
            .get(`users?access-token=${token}`);
        expect(res.body).to.not.be.empty;
    });

    /*it('GET /users/:id', async () => {
        const res = await request('https://gorest.co.in/public/v2/')
            .get(`users?access-token=${token}`);
        expect(res.body[0].id).to.be.eq(2528);
    });*/

    it('GET /users/different parameters', async () => {
        const res = await request('https://gorest.co.in/public/v2/')
            .get(`users?access-token=${token}&page=4&status=active`);
        expect(res.body).to.not.be.empty;
        
        await res.body.forEach(element => {
            expect(element.status).to.eq('active');
        });
    });

    it('POST /users', async () => { 
        const res = await request('https://gorest.co.in/public/v2/')
            .post('users')
            .set('Authorization', `Bearer ${token}`)
            .send(dataUser)
        console.log(res.body)
        //expect(res.body.email).to.eq(data.email);
        expect(res.body).to.deep.include(dataUser);
        userID = res.body.id;
    });

    it('PUT/users/:id', async () => {
        const data = {
            "status": "inactive"
          }

        const res = await request('https://gorest.co.in/public/v2/')
            .put(`users/${userID}`)
            .set('Authorization', `Bearer ${token}`)
            .send(data)
        console.log(res.body);
        expect(res.body.status).to.eq('inactive');

    });

    it('DELETE/users/:id', async () => {
        const res = await request('https://gorest.co.in/public/v2/')
        .delete(`users/${userID}`)
        .set('Authorization', `Bearer ${token}`)
        console.log(res.body[0]);
        expect(res.body[0]).to.eq(undefined);
    });  
})



