const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../../app');

const chaiAppServer = chai.request(app).keepOpen();

chai.should();

chai.use(chaiHttp);

describe('Some description', () => {
  after(() => {
    chaiAppServer.close();
  });

  it('Some task', (done) => {
    done();
  });
});
