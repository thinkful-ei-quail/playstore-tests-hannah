const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app');

describe('Playstore App', () => {
    it('should return an array of objects with specific keys', () => {
        return supertest(app)
            .get('/apps')
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array');
                expect(res.body).to.have.lengthOf.at.least(1);
                const app = res.body[0];
                expect(app).to.include.all.keys(
                    'App', 'Category', 'Rating', 'Reviews', 'Size', 'Installs', 'Type',
                    'Price', 'Content Rating', 'Genres', 'Last Updated', 'Current Ver',
                    'Android Ver'
                ) 
            })
    })
    it('should return 400 if sort is invalid', () => {
        return supertest(app)
            .get('/apps')
            .query({sort: 'MISTAKE'})
            .expect(400, 'Sort must be one of Rating or App')
    })
    it('should sort by rating', () => {
        return supertest(app)
            .get('/apps')
            .query({sort: 'rating'})
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array');
                let sorted = true;

                let i = 0;

                while(i < res.body.length -1) {
                    const appAtI = res.body[i];
                    const appAtIPlus1 = res.body[i + 1];

                    if(appAtIPlus1.Rating < appAtI.Rating) {
                        sorted = false;
                        break;
                    }
                    i++;
                }
                expect(sorted).to.be.true;
            })
    })
    it('should sort by App title', () => {
        return supertest(app)
            .get('/apps')
            .query({sort: 'app'})
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array');
                let sorted = true;

                let i = 0;

                while(i < res.body.length -1) {
                    const appAtI = res.body[i];
                    const appAtIPlus1 = res.body[i + 1];

                    if(appAtIPlus1.App < appAtI.App) {
                        sorted = false;
                        break;
                    }
                    i++;
                }
                expect(sorted).to.be.true;
            })
    })
})