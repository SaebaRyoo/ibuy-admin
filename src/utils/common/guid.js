import SnowflakeId from 'snowflake-id';

const guid = (num) => {
  const id = new SnowflakeId();
  return id.generate();
};
