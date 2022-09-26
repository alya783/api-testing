const request = require('supertest');
const token = 'a7becb822b803e05aed104c3b69ca51c700d483503dac9d737eb5a4b5c180484';

describe('Users', ()=>{
    it('GET /users', ()=>{
        request('https://gorest.co.in/public/v2/')
            .get(`users?access-token=${token}`)
            .end((err, res) => {
                console.log(err);
                console.log(res.body);
            })
    });
})



