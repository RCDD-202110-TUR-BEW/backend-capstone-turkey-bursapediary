const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../../app');

chai.should();

chai.use(chaiHttp);

describe('Some description', () => {
  it('Some task', (done) => {
    done();
  });
});
