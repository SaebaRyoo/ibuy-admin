import SnowflakeId from 'snowflake-id';

export const guid = () => {
  const id = new SnowflakeId();
  return id.generate();
};
