const expect = require('chai').expect;
const { it } = require('mocha');
const request = require('supertest');
const token = 'a7becb822b803e05aed104c3b69ca51c700d483503dac9d737eb5a4b5c180484';

describe('Users', ()=>{
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
        const data = {
            "name": "Alya Novikova",
            "email": "test4@gmail.com",
            "gender": "female",
            "status": "active"
          }

        const res = await request('https://gorest.co.in/public/v2/')
            .post('users')
            .set('Authorization', `Bearer ${token}`)
            .send(data)
        console.log(res.body)
        //expect(res.body.email).to.eq(data.email);
        expect(res.body).to.deep.include(data);
    });

    it.only('PUT/users/:id', async () => {
        const data = {
            "status": "inactive"
          }

        const res = await request('https://gorest.co.in/public/v2/')
            .put('users/3215')
            .set('Authorization', `Bearer ${token}`)
            .send(data)
        console.log(res.body);
        expect(res.body.status).to.eq('inactive');;

    });
    
})



