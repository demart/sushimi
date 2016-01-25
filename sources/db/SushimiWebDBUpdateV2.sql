-- ORDERS ON SUSHIMI WEB
-- Table: orders
-- new fields
 ALTER TABLE orders ADD COLUMN reason character varying(255);
 ALTER TABLE orders ADD COLUMN delivery_extra_price integer;
 ALTER TABLE orders ADD COLUMN promo_discount integer;
 ALTER TABLE orders ADD COLUMN promo_name character varying(255);
 ALTER TABLE orders ADD COLUMN promo_product_code character varying(255);
 ALTER TABLE orders ADD COLUMN promo_value_type character varying(255);
 ALTER TABLE orders ADD COLUMN client_discount integer;
 ALTER TABLE orders ADD COLUMN cook_code character varying(255);
 ALTER TABLE orders ADD COLUMN courier_code character varying(255);
 ALTER TABLE orders ADD COLUMN operator_code character varying(255);

-- update existing column values
 UPDATE orders set order_number = '0000' || order_number;



-- Table: orders_history
-- DROP TABLE orders_history;
CREATE TABLE orders_history
(
  id bigint NOT NULL,
  console_record_id bigint,
  date timestamp without time zone,
  geo_latitude character varying(255),
  geo_longitude character varying(255),
  is_synchronized boolean,
  orderstate character varying(255),
  user_name character varying(255),
  order_id integer,
  CONSTRAINT orders_history_pkey PRIMARY KEY (id),
  CONSTRAINT fkc64393a73a767df FOREIGN KEY (order_id)
      REFERENCES orders (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);
ALTER TABLE orders_history OWNER TO postgres;


-- Sequence: user_seq
-- DROP SEQUENCE user_seq;
CREATE SEQUENCE user_seq INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;
ALTER TABLE user_seq OWNER TO postgres;



-- Sequence: user_tracking_seq
-- DROP SEQUENCE user_tracking_seq;
CREATE SEQUENCE user_tracking_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;
ALTER TABLE user_tracking_seq OWNER TO postgres;


-- Table: users
-- DROP TABLE users;
CREATE TABLE users
(
  id bigint NOT NULL,
  enabled boolean,
  last_geolocation_sync_time timestamp without time zone,
  last_latitude character varying(255),
  last_longitude character varying(255),
  login character varying(20),
  name character varying(255),
  password character varying(20),
  role character varying(255),
  city_id integer,
  m_app_verison character varying(255),
  m_operation_system integer,
  m_operation_system_version character varying(255),
  m_auth_token character varying(255),
  m_push_key character varying(255),
  code character varying(50),
  CONSTRAINT users_pkey PRIMARY KEY (id),
  CONSTRAINT fk6a68e0846517f66 FOREIGN KEY (city_id)
      REFERENCES cities (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);
ALTER TABLE users OWNER TO postgres;


-- Table: users_trackings
-- DROP TABLE users_trackings;
CREATE TABLE users_trackings
(
  id bigint NOT NULL,
  track_date timestamp without time zone,
  latitude character varying(255),
  longitude character varying(255),
  user_id bigint,
  CONSTRAINT users_trackings_pkey PRIMARY KEY (id),
  CONSTRAINT fkc43d572523677aee FOREIGN KEY (user_id)
      REFERENCES users (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);
ALTER TABLE users_trackings OWNER TO postgres;