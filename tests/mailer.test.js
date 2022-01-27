/* eslint-disable no-undef */
/* eslint-disable node/no-unpublished-require */
/* eslint-disable no-unused-expressions */

require('mocha-sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const logger = require('../src/utils/logger');

const { expect } = chai;

const sendEmail = require('../src/utils/mailer');

chai.should();

chai.use(chaiHttp);

const user = {
  email: 'sofelmez@gmail.com',
};

const userWithWrongEmail = {
  email: 'email',
};

describe('Mailer Functionality', () => {
  beforeEach(function () {
    this.sinon.stub(logger, 'info');
  });
  it('should send email to the user passed if email is valid', () => {
    sendEmail(user);
    expect(logger.info.calledOnce).to.be.true;
    expect(logger.info.calledWith('250 2.0.0 OK')).to.be.true;
  });

  it('should not send email to the user passed if email is not valid', () => {
    sendEmail(userWithWrongEmail);
    expect(logger.info.calledOnce).to.be.true;
    expect(logger.info.calledWith('No recipients defined')).to.be.true;
  });
});
