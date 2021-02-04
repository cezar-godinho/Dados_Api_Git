import req from 'supertest';
import app from './index';

test('[GET] /data', async () => {
  const res = await req(app).get('/data');
  expect(typeof res.body.uptime).toBe('string');
});