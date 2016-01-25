-- ORDERS NEW

  ALTER TABLE orders ADD COLUMN delivery_extra_cost integer DEFAULT 0,
  ALTER TABLE orders ADD COLUMN deliveryprice_id bigint,
  ALTER TABLE orders ADD COLUMN client_discount_current_percent integer,
  ALTER TABLE orders ADD COLUMN client_discount_next_percent integer,
  ALTER TABLE orders ADD COLUMN client_discount_next_sum integer,
  ALTER TABLE orders ADD COLUMN client_discount_total_order_sum integer,
  ALTER TABLE orders ADD COLUMN source character varying(255),
  ALTER TABLE orders ADD COLUMN source_discount integer,
  ALTER TABLE orders ADD COLUMN deliveryuser_id bigint,
  ALTER TABLE orders ADD COLUMN is_synchronized boolean DEFAULT false,
  ALTER TABLE orders ADD COLUMN paymethod character varying(255),
  ALTER TABLE orders ADD COLUMN site_order_number character varying(50),


-- UPDATE ORDER_NUMBER colymn
  ALTER TABLE orders ADD COLUMN order_number_str character varying(50),
  UPDATE orders set order_number_str = order_number;
  ALTER TABLE orders DROP COLUMN order_number;
  ALTER TABLE orders RENAME COLUMN order_number_str TO order_number;

-- WHEN ORDERS INTERAL
--  UPDATE orders set order_number_str = '0000' || order_number where siteorder_id is not null and 
-- WHEN ORDERS EXTERNAL
--  UPDATE orders set order_number_str = '0100' || order_number where siteorder_id is null
-- SET ALL OF THEM SYNCHED ALREADY TO SKIP ALL RECORDS SYNCHRONIZATION
  UPDATE orders set is_synchronized = true

-- ORDER HISTORY
  ALTER TABLE orders_history ADD COLUMN geo_latitude character varying(255);
  ALTER TABLE orders_history ADD COLUMN geo_longitude character varying(255);
  ALTER TABLE orders_history ADD COLUMN is_synchronized boolean;
  ALTER TABLE orders_history ADD COLUMN site_record_id bigint;
  ALTER TABLE orders_history ADD COLUMN order_id bigint;

-- SITE ORDERS
  ALTER TABLE orders_sites ADD COLUMN source character varying(255),
  ALTER TABLE orders_sites ADD COLUMN source_discount integer,
  ALTER TABLE orders_sites ADD COLUMN order_number character varying(50),

-- USERS
  ALTER TABLE users ADD COLUMN code character varying(50),
