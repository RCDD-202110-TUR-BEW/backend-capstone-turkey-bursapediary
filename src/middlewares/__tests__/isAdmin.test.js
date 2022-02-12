const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../../app');

chai.should();
chai.use(chaiHttp);

const chaiAppServer = chai.request(app).keepOpen();

describe('Some description', () => {
  after(() => {
    chaiAppServer.close();
  });

  it('Some task', (done) => {
    done();
  });
});
