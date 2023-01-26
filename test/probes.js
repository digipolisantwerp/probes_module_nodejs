import { strict as assert } from 'assert';
import express from 'express';
import request from 'supertest';

import loadRoutes from '../src/router';
import { configResolve, configReject } from './mocks/config';

const app = express();
app.use(loadRoutes());

describe('Without config', () => {
  it('should return alive check', (done) => {
    request(app)
      .get('/status/alive')
      .expect(200)
      .end((err, res) => {
        assert.equal(err, null, 'err should be null');
        assert.equal(res.body.status, 200, 'status should be 200');
        assert.equal(res.body.message, 'ok', 'message should be ok');

        return done();
      });
  });

  it('should return ready check', (done) => {
    request(app)
      .get('/status/ready')
      .expect(200)
      .end((err, res) => {
        assert.equal(err, null, 'err should be null');
        assert.equal(res.body.status, 200, 'status should be 200');
        assert.equal(res.body.message, 'ok', 'message should be ok');

        return done();
      });
  });
});

const app2 = express();
app2.use(loadRoutes(configResolve));

describe('With resolve config', () => {
  it('should return alive check', (done) => {
    request(app2)
      .get('/status/alive')
      .expect(200)
      .end((err, res) => {
        assert.equal(err, null, 'err should be null');
        assert.equal(res.body.status, 200, 'status should be 200');
        assert.equal(res.body.message, 'ok', 'message should be ok');

        return done();
      });
  });

  it('should return ready check', (done) => {
    request(app2)
      .get('/status/ready')
      .expect(200)
      .end((err, res) => {
        assert.equal(err, null, 'err should be null');
        assert.equal(res.body.status, 200, 'status should be 200');
        assert.equal(res.body.message, 'ok', 'message should be ok');

        return done();
      });
  });
});

const app3 = express();
app3.use(loadRoutes(configReject));

describe('With reject config', () => {
  it('should return alive check', (done) => {
    request(app3)
      .get('/status/alive')
      .expect(400)
      .end((err, res) => {
        assert.equal(err, null, 'err should be null');
        assert.equal(res.body.message, 'Uh oh! This app is not ready.', 'err.message should be equal.');

        return done();
      });
  });

  it('should return ready check', (done) => {
    request(app3)
      .get('/status/ready')
      .expect(400)
      .end((err, res) => {
        assert.equal(err, null, 'err should be null');
        assert.equal(res.body.message, 'Uh oh! This app is not ready.', 'err.message should be equal.');

        return done();
      });
  });
});
