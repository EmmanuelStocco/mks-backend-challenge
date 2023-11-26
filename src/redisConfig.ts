import Redis from 'ioredis';
import { promisify } from 'util';

const redisClient = new Redis();

function getRedis(value: string) {
  const syncRedisGet = promisify(redisClient.get).bind(redisClient);
  return syncRedisGet(value);
}

function setRedis(key: string, value: string) {
  const syncRedisSet = promisify(redisClient.set).bind(redisClient);
  return syncRedisSet(key, value);
}

function deleteRedisKey(key: string) {
  const syncRedisDel = promisify(redisClient.del).bind(redisClient);
  return syncRedisDel(key);
}

async function deleteRedisKeyAll(keys: string[]) {
  const multi = redisClient.multi();
  keys.forEach((key) => {
    multi.del(key);
  });

  const execMulti = promisify(multi.exec).bind(multi);
  await execMulti();
}

export { redisClient, getRedis, setRedis, deleteRedisKey, deleteRedisKeyAll };
