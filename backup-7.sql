--
-- PostgreSQL database dump
--

-- Dumped from database version 9.4.0
-- Dumped by pg_dump version 9.4.0
-- Started on 2015-10-21 13:40:09 ALMT

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- TOC entry 214 (class 3079 OID 12123)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2556 (class 0 OID 0)
-- Dependencies: 214
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 172 (class 1259 OID 49559)
-- Name: announcements; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE announcements (
    id bigint NOT NULL,
    content character varying(4000),
    description character varying(255),
    end_date timestamp without time zone,
    image_link_original character varying(255),
    image_link_small character varying(255),
    image_link_middle character varying(255),
    image_link_slide character varying(255),
    deleted boolean,
    published boolean,
    slide boolean,
    publish_date timestamp without time zone,
    title character varying(255),
    type integer,
    unique_name character varying(255),
    publish_year integer
);


ALTER TABLE announcements OWNER TO postgres;

--
-- TOC entry 201 (class 1259 OID 49881)
-- Name: brc_email_brc_addr_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE brc_email_brc_addr_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE brc_email_brc_addr_seq OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 49883)
-- Name: brc_email_brc_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE brc_email_brc_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE brc_email_brc_seq OWNER TO postgres;

--
-- TOC entry 203 (class 1259 OID 49885)
-- Name: brc_email_brc_tmp_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE brc_email_brc_tmp_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE brc_email_brc_tmp_seq OWNER TO postgres;

--
-- TOC entry 193 (class 1259 OID 49795)
-- Name: brc_email_broadcast_addressees; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE brc_email_broadcast_addressees (
    id bigint NOT NULL,
    created_date timestamp without time zone,
    error_date timestamp without time zone,
    opened_date timestamp without time zone,
    reason character varying(255),
    sent_date timestamp without time zone,
    status character varying(255),
    addressee_id bigint,
    broadcast_id bigint
);


ALTER TABLE brc_email_broadcast_addressees OWNER TO postgres;

--
-- TOC entry 194 (class 1259 OID 49803)
-- Name: brc_email_broadcast_templates; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE brc_email_broadcast_templates (
    id bigint NOT NULL,
    created_date timestamp without time zone,
    is_active boolean,
    modified_date timestamp without time zone,
    template character varying(255)
);


ALTER TABLE brc_email_broadcast_templates OWNER TO postgres;

--
-- TOC entry 195 (class 1259 OID 49808)
-- Name: brc_email_broadcasts; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE brc_email_broadcasts (
    id bigint NOT NULL,
    content character varying(255),
    created_date timestamp without time zone,
    finished_date timestamp without time zone,
    modified_date timestamp without time zone,
    start_date timestamp without time zone,
    started_date timestamp without time zone,
    status character varying(255),
    title character varying(255),
    template_id bigint
);


ALTER TABLE brc_email_broadcasts OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 49887)
-- Name: brc_email_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE brc_email_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE brc_email_seq OWNER TO postgres;

--
-- TOC entry 196 (class 1259 OID 49816)
-- Name: brc_emails; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE brc_emails (
    id bigint NOT NULL,
    created_date timestamp without time zone,
    email character varying(255),
    is_subscribed boolean,
    modified_date timestamp without time zone,
    name character varying(255),
    unique_key character varying(255),
    unsubscribed_date timestamp without time zone
);


ALTER TABLE brc_emails OWNER TO postgres;

--
-- TOC entry 205 (class 1259 OID 49889)
-- Name: brc_phone_brc_addr_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE brc_phone_brc_addr_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE brc_phone_brc_addr_seq OWNER TO postgres;

--
-- TOC entry 206 (class 1259 OID 49891)
-- Name: brc_phone_brc_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE brc_phone_brc_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE brc_phone_brc_seq OWNER TO postgres;

--
-- TOC entry 197 (class 1259 OID 49824)
-- Name: brc_phone_broadcast; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE brc_phone_broadcast (
    id bigint NOT NULL,
    content character varying(255),
    content_provider_group_key character varying(255),
    created_date timestamp without time zone,
    finished_date timestamp without time zone,
    modified_date timestamp without time zone,
    start_date timestamp without time zone,
    started_date timestamp without time zone,
    status character varying(255),
    title character varying(255)
);


ALTER TABLE brc_phone_broadcast OWNER TO postgres;

--
-- TOC entry 198 (class 1259 OID 49832)
-- Name: brc_phone_broadcast_addressees; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE brc_phone_broadcast_addressees (
    id bigint NOT NULL,
    created_date timestamp without time zone,
    error_date timestamp without time zone,
    opened_date timestamp without time zone,
    reason character varying(255),
    sent_date timestamp without time zone,
    status character varying(255),
    addressee_id bigint,
    broadcast_id bigint
);


ALTER TABLE brc_phone_broadcast_addressees OWNER TO postgres;

--
-- TOC entry 207 (class 1259 OID 49893)
-- Name: brc_phone_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE brc_phone_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE brc_phone_seq OWNER TO postgres;

--
-- TOC entry 199 (class 1259 OID 49840)
-- Name: brc_phones; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE brc_phones (
    id bigint NOT NULL,
    created_date timestamp without time zone,
    is_subscribe boolean,
    modified_date timestamp without time zone,
    name character varying(255),
    phone character varying(255),
    unique_key character varying(255),
    unsubscribed_date timestamp without time zone
);


ALTER TABLE brc_phones OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 66179)
-- Name: brc_push_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE brc_push_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE brc_push_seq OWNER TO postgres;

--
-- TOC entry 200 (class 1259 OID 49848)
-- Name: brc_pushes; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE brc_pushes (
    id bigint NOT NULL,
    application_version character varying(255),
    created_date timestamp without time zone,
    is_subscribe boolean,
    modified_date timestamp without time zone,
    name character varying(255),
    platform character varying(255),
    platform_version character varying(255),
    push_key character varying(255),
    unique_key character varying(255),
    unsubscribed_date timestamp without time zone
);


ALTER TABLE brc_pushes OWNER TO postgres;

--
-- TOC entry 173 (class 1259 OID 49565)
-- Name: cart; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE cart (
    session character varying(255) NOT NULL,
    timeout bigint,
    city_id integer
);


ALTER TABLE cart OWNER TO postgres;

--
-- TOC entry 174 (class 1259 OID 49568)
-- Name: cart_items; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE cart_items (
    id integer NOT NULL,
    count integer,
    cart_session character varying(255),
    product_id bigint
);


ALTER TABLE cart_items OWNER TO postgres;

--
-- TOC entry 175 (class 1259 OID 49571)
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE categories (
    id bigint NOT NULL,
    deleted boolean,
    published boolean,
    name character varying(255),
    category_id bigint,
    order_number integer,
    unique_name character varying(255),
    code character varying(255),
    type character varying(255),
    image_link character varying(255),
    mobilecategory_id bigint,
    mobile_order_number integer,
    top_menu_available boolean,
    top_menu_image_link character varying(255)
);


ALTER TABLE categories OWNER TO postgres;

--
-- TOC entry 176 (class 1259 OID 49577)
-- Name: cities; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE cities (
    id integer NOT NULL,
    min_order_sum integer,
    name character varying(255),
    deleted boolean,
    published boolean,
    end_work_hour integer,
    start_work_hour integer
);


ALTER TABLE cities OWNER TO postgres;

--
-- TOC entry 177 (class 1259 OID 49580)
-- Name: delivery_service_points; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE delivery_service_points (
    id integer NOT NULL,
    address character varying(255),
    addres_geo_latitude real,
    address_geo_longitude real,
    delivery_area character varying(255),
    delivery_area_image_url character varying(255),
    delivery_area_remarks character varying(255),
    deleted boolean,
    published boolean,
    min_order_sum character varying(255),
    order_number integer,
    phone_number character varying(255),
    title character varying(255),
    workhours character varying(255)
);


ALTER TABLE delivery_service_points OWNER TO postgres;

--
-- TOC entry 178 (class 1259 OID 49586)
-- Name: departments; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE departments (
    id integer NOT NULL,
    address character varying(255),
    name character varying(255),
    city_id integer,
    deleted boolean,
    published boolean,
    end_work_hour integer,
    start_work_hour integer,
    latitude character varying(255),
    longitude character varying(255)
);


ALTER TABLE departments OWNER TO postgres;

--
-- TOC entry 191 (class 1259 OID 49774)
-- Name: feedbacks; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE feedbacks (
    id bigint NOT NULL,
    city_name character varying(255),
    client_name character varying(255),
    created_date timestamp without time zone,
    published boolean,
    order_number character varying(255),
    phone_number character varying(255),
    reason character varying(255),
    restaurant_name character varying(255),
    status character varying(255),
    type character varying(255),
    text character varying(255)
);


ALTER TABLE feedbacks OWNER TO postgres;

--
-- TOC entry 179 (class 1259 OID 49592)
-- Name: hibernate_sequence; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE hibernate_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE hibernate_sequence OWNER TO postgres;

--
-- TOC entry 180 (class 1259 OID 49594)
-- Name: ingredients; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE ingredients (
    id bigint NOT NULL,
    image_link character varying(255),
    name character varying(255)
);


ALTER TABLE ingredients OWNER TO postgres;

--
-- TOC entry 181 (class 1259 OID 49600)
-- Name: order_sequence; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE order_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 9999999999
    CACHE 1;


ALTER TABLE order_sequence OWNER TO postgres;

--
-- TOC entry 182 (class 1259 OID 49602)
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE orders (
    id integer NOT NULL,
    address_building character varying(255),
    address_city_name character varying(255),
    address_corpus character varying(255),
    address_door_code character varying(255),
    address_flat character varying(255),
    address_floor character varying(255),
    address_house character varying(255),
    address_office character varying(255),
    address_porch character varying(255),
    address_room character varying(255),
    address_street_name character varying(255),
    delivery_time timestamp without time zone,
    delivery_type character varying(255),
    order_number character varying(255),
    order_sum integer,
    order_time timestamp without time zone,
    pay_method character varying(255),
    person_cash integer,
    person_count integer,
    person_name character varying(255),
    person_phone character varying(255),
    person_remark character varying(500),
    processed character varying(255),
    city_id integer,
    department_id integer,
    geo_latitude character varying(255),
    geo_longitude character varying(255),
    key character varying(255),
    person_email character varying(256),
    source character varying(100) DEFAULT 'WEB'::character varying,
    source_discount integer DEFAULT 0 NOT NULL,
    source_app_version character varying(250),
    source_system_name character varying(250),
    source_system_version character varying(250),
    reason character varying(255),
    delivery_extra_price integer,
    promo_discount integer,
    promo_name character varying(255),
    promo_product_code character varying(255),
    promo_value_type character varying(255),
    client_discount integer,
    cook_code character varying(255),
    courier_code character varying(255),
    operator_code character varying(255)
);


ALTER TABLE orders OWNER TO postgres;

--
-- TOC entry 2557 (class 0 OID 0)
-- Dependencies: 182
-- Name: COLUMN orders.source; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN orders.source IS 'MOBI, WEB, CALL_CENTER';


--
-- TOC entry 208 (class 1259 OID 49940)
-- Name: orders_history; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE orders_history (
    id bigint NOT NULL,
    console_record_id bigint,
    date timestamp without time zone,
    geo_latitude character varying(255),
    geo_longitude character varying(255),
    is_synchronized boolean,
    orderstate character varying(255),
    user_name character varying(255),
    order_id integer
);


ALTER TABLE orders_history OWNER TO postgres;

--
-- TOC entry 183 (class 1259 OID 49610)
-- Name: orders_items; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE orders_items (
    id integer NOT NULL,
    count integer,
    price integer,
    sum integer,
    order_id integer,
    product_id bigint,
    free_count integer
);


ALTER TABLE orders_items OWNER TO postgres;

--
-- TOC entry 192 (class 1259 OID 49782)
-- Name: pages; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE pages (
    id bigint NOT NULL,
    html_footer character varying(5000),
    is_active boolean,
    meta_description character varying(500),
    meta_title character varying(500),
    page_id character varying(255),
    title character varying(500),
    meta_content character varying(500),
    meta_keywords character varying(500),
    category_id bigint
);


ALTER TABLE pages OWNER TO postgres;

--
-- TOC entry 184 (class 1259 OID 49613)
-- Name: products; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE products (
    id bigint NOT NULL,
    cost integer,
    description character varying(500),
    deleted boolean,
    published boolean,
    item_count integer,
    name character varying(255),
    category_id bigint,
    image_link character varying(255),
    small_image_link character varying(255),
    is_hit boolean,
    is_new boolean,
    recomended boolean,
    carbohydrates real,
    fats real,
    proteins real,
    is_hot boolean,
    is_vegatable boolean,
    popular boolean,
    popular_age integer,
    popular_sex integer,
    icon_image_link character varying(255),
    order_number integer,
    code character varying(255),
    weight character varying(100),
    calories character varying(100),
    type character varying(50) DEFAULT 'NONE'::character varying NOT NULL,
    rating real
);


ALTER TABLE products OWNER TO postgres;

--
-- TOC entry 185 (class 1259 OID 49620)
-- Name: products_ingredients; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE products_ingredients (
    products_id bigint NOT NULL,
    ingredients_id bigint NOT NULL
);


ALTER TABLE products_ingredients OWNER TO postgres;

--
-- TOC entry 186 (class 1259 OID 49623)
-- Name: restaurants; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE restaurants (
    id bigint NOT NULL,
    address character varying(255),
    description character varying(255),
    image_url character varying(255),
    deleted boolean,
    published boolean,
    latitude real,
    longitude real,
    modified_date timestamp without time zone,
    order_number integer,
    phone_number character varying(255),
    title character varying(255),
    workhours character varying(255)
);


ALTER TABLE restaurants OWNER TO postgres;

--
-- TOC entry 187 (class 1259 OID 49629)
-- Name: restaurants_photos; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE restaurants_photos (
    id integer NOT NULL,
    description character varying(255),
    image_url character varying(255),
    modified_date timestamp without time zone,
    small_url character varying(255),
    restaurant_id bigint,
    is_promo boolean
);


ALTER TABLE restaurants_photos OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 49966)
-- Name: user_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE user_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE user_seq OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 49981)
-- Name: user_tracking_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE user_tracking_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE user_tracking_seq OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 49953)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE users (
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
    code character varying(50)
);


ALTER TABLE users OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 49968)
-- Name: users_trackings; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE users_trackings (
    id bigint NOT NULL,
    track_date timestamp without time zone,
    latitude character varying(255),
    longitude character varying(255),
    user_id bigint
);


ALTER TABLE users_trackings OWNER TO postgres;

--
-- TOC entry 188 (class 1259 OID 49635)
-- Name: vacancy; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE vacancy (
    id integer NOT NULL,
    conditions character varying(4000),
    count integer,
    description character varying(4000),
    deleted boolean,
    published boolean,
    name character varying(255),
    requirements character varying(4000),
    vacancygroup_id integer,
    publish_date timestamp without time zone
);


ALTER TABLE vacancy OWNER TO postgres;

--
-- TOC entry 189 (class 1259 OID 49641)
-- Name: vacancy_app; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE vacancy_app (
    id integer NOT NULL,
    application_date timestamp without time zone,
    birthday character varying(255),
    filelink character varying(500),
    email character varying(255),
    name character varying(255),
    phone character varying(255),
    vacancy_id integer,
    uploaded_file oid
);


ALTER TABLE vacancy_app OWNER TO postgres;

--
-- TOC entry 190 (class 1259 OID 49647)
-- Name: vacancy_groups; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE vacancy_groups (
    id integer NOT NULL,
    description character varying(4000),
    deleted boolean,
    published boolean,
    name character varying(4000)
);


ALTER TABLE vacancy_groups OWNER TO postgres;

--
-- TOC entry 2546 (class 2613 OID 112354)
-- Name: 112354; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('112354');


ALTER LARGE OBJECT 112354 OWNER TO postgres;

--
-- TOC entry 2547 (class 2613 OID 112358)
-- Name: 112358; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('112358');


ALTER LARGE OBJECT 112358 OWNER TO postgres;

--
-- TOC entry 2504 (class 0 OID 49559)
-- Dependencies: 172
-- Data for Name: announcements; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO announcements (id, content, description, end_date, image_link_original, image_link_small, image_link_middle, image_link_slide, deleted, published, slide, publish_date, title, type, unique_name, publish_year) VALUES (4, 'Мы открылись!', 'Мы открылись!!! «Сушими» рада для Вас готовить свежие и вкусные роллы', '2014-07-01 00:00:00', 'opening-original.jpg', 'opening-120x120.jpg', 'opening-middle.jpg', NULL, false, true, false, '2014-07-01 00:00:00', 'Мы открылись!', 0, 'opening', 2014);
INSERT INTO announcements (id, content, description, end_date, image_link_original, image_link_small, image_link_middle, image_link_slide, deleted, published, slide, publish_date, title, type, unique_name, publish_year) VALUES (3, 'В день рождения мы дарим скидку в 22 процента!', 'День рождение? Хочется побольше приятных мелочей? 22 процента - самое то!', '2020-07-01 00:00:00', 'birthday-discount-original.jpg', 'birthday-discount-120x120.jpg', 'birthday-discount-original.jpg', 'birthday-discount-slide.jpg', false, true, true, '2014-07-01 00:00:00', 'Скидка именинникам', 1, 'birthday-discount', 2014);
INSERT INTO announcements (id, content, description, end_date, image_link_original, image_link_small, image_link_middle, image_link_slide, deleted, published, slide, publish_date, title, type, unique_name, publish_year) VALUES (6, '<p><b>Осенние скидки и подарки!</b></p>

<p>При заказе <b>от 3500</b> тысяч скидка <b>5%</b></p>

<br/>

<p>При заказе <b>от 4500</b> тысяч скидка <b>10%</b></p>

<br/>

<p>При заказе <b>от 5500</b> тысяч скидка <b>15%</b></p>

<br/>

<br/>

<p>При заказе на сумму <b>свыше 4000</b> один любой ролл из(Бонито с лососем, чука, вулкан с угрем, темпура с лососем) в подарок</p>

', 'Пришла Осень! Мы объявляем новые скидки и подарки!', '2014-12-01 00:00:00', 'autumn-mega-presents-original.jpg', 'autumn-mega-presents-120x120.jpg', 'autumn-mega-presents-middle.jpg', 'autumn-mega-presents-slide.jpg', false, true, false, '2014-09-18 17:00:00', 'Осенение скидки и подарки!', 1, 'autumn-discount', 2014);
INSERT INTO announcements (id, content, description, end_date, image_link_original, image_link_small, image_link_middle, image_link_slide, deleted, published, slide, publish_date, title, type, unique_name, publish_year) VALUES (1, 'Если Вы живете рядом с нами, или просто будете проезжать мимо, то Вы можете забрать заказ сами, при этом сэкономив 10 процентов.', 'Возращаетесь домой и не хотите ждать курьера?', '2020-07-01 00:00:00', 'self-service-discount-original.jpg', 'self-service-discount-120x120.jpg', 'self-service-discount-original.jpg', 'self-service-discount-slide.jpg', false, true, true, '2014-07-01 00:00:00', 'Скидка при самовывозе', 1, 'self-service-discount', 2014);
INSERT INTO announcements (id, content, description, end_date, image_link_original, image_link_small, image_link_middle, image_link_slide, deleted, published, slide, publish_date, title, type, unique_name, publish_year) VALUES (5, '<p>Мы дополняем 15%-ую летнюю скидку!</p>

<p>Теперь если вы оформляете заказ суши на сумму свыше 3600 вы получаете 15% скидку и еще в подарок Ролл Темпура с лососем</p>

<br/>

<p>Если вы оформляете заказ суши на сумму свыше 4700 вы получаете 15% скидку и еще в подарок Ролл Калифорния</p>

<br/>

<p>Если вы оформляете заказ суши на сумму свыше 5900 вы получаете 15% скидку и еще в подарок Ролл Сливочный Угорь или Ролл Дракон</p>', 'Мы приготовили для Вас подарки!', '2014-09-01 00:00:00', 'summer-mega-presents-original.jpg', 'summer-mega-presents-120x120.jpg', 'summer-mega-presents-middle.jpg', 'summer-mega-presents-slide.jpg', false, true, false, '2014-07-04 00:00:00', 'Всем подарки от Сушими', 1, 'mega-presents', 2014);
INSERT INTO announcements (id, content, description, end_date, image_link_original, image_link_small, image_link_middle, image_link_slide, deleted, published, slide, publish_date, title, type, unique_name, publish_year) VALUES (2, 'Мы решили, что скидка в 15% на суши продукцию, сможет дополнить приятные ощущения лета.', 'Летом самое время кушать любимые суши со скидкой!', '2014-09-01 00:00:00', 'summer-discount-original.jpg', 'summer-discount-120x120.jpg', 'summer-discount-original.jpg', 'summer-discount-slide.jpg', false, true, false, '2014-07-01 00:00:00', 'Летняя скидка', 1, 'summer-discount', 2014);
INSERT INTO announcements (id, content, description, end_date, image_link_original, image_link_small, image_link_middle, image_link_slide, deleted, published, slide, publish_date, title, type, unique_name, publish_year) VALUES (7, '<p>На новый год мы работаем по следующей схеме</p><br/>

<p>31 декабря - <b>до 18:00</b></p>

<br/>

<p>1 января - <b>выходной</b></p>

<br/>

<p>С наступающим Новым Годом, дорогие клиенты!</p>', 'Режим работы в период НГ', '2015-01-03 00:00:00', 'workhours-new-year-original.jpg', 'workhours-new-year-120x120.jpg', 'workhours-new-year-middle.jpg', NULL, false, true, false, '2014-12-18 00:00:00', 'Режим работы на НГ', 0, 'workhours-new-year-2014', 2014);
INSERT INTO announcements (id, content, description, end_date, image_link_original, image_link_small, image_link_middle, image_link_slide, deleted, published, slide, publish_date, title, type, unique_name, publish_year) VALUES (8, '<p><b>Зимние скидки и подарки!</b></p>

<p>При заказе <b>от 3500</b> тысяч кола в подарок</p>

<br/>

<p>При заказе <b>от 4500</b> тысяч Ролл лосось гриль или скидка <b>5%</b></p>

<br/>

<p>При заказе <b>от 5500</b> тысяч Ролл темпура лосось гриль или скидка <b>7%</b></p>

<br/>

<p>При заказе <b>от 6500</b> тысяч Ролл бонито с лососем или скидка <b>10%</b></p>

<br/>

<br/>

', 'Зимние подарки и акции', '2015-03-01 00:00:00', 'winter-mega-presents-original.jpg', 'winter-mega-presents-120x120.jpg', 'winter-mega-presents-middle.jpg', 'winter-mega-presents-slide.jpg', false, true, false, '2014-12-18 00:00:00', 'Зимние скидки и подарки', 1, 'winter-discount-2014', 2014);
INSERT INTO announcements (id, content, description, end_date, image_link_original, image_link_small, image_link_middle, image_link_slide, deleted, published, slide, publish_date, title, type, unique_name, publish_year) VALUES (9, '<p><b>Весенние подарки!</b></p>
<p>При заказе <b>от 4 000</b> тысяч кола в подарок</p>
<p>При заказе <b>от 5 000</b> тысяч Ролл лосось гриль</p>
<p>При заказе <b>от 6 000</b> тысяч Ролл темпура лосось гриль или Пицца Маргарита</p>
<p>При заказе <b>от 7 000</b> тысяч Ролл Бонито с лососем или Пицца Пеперони</p>
<p>При заказе <b>от 8 000</b> тысяч Ролл Филадельфия или Пицца Болоньезе</p>
<p>При заказе <b>от 10 000</b> тысяч Ролл Сливочный угорь или Пицца Мясная</p>', 'Пришла Весна! Время подарков.', '2015-06-15 00:00:00', 'spring-discount-original.jpg', 'spring-discount-120x120.jpg', 'spring-discount-middle.jpg', '', false, true, false, '2015-04-15 00:00:00', 'Весенняя акция!', 1, 'spring-discount', 2015);
INSERT INTO announcements (id, content, description, end_date, image_link_original, image_link_small, image_link_middle, image_link_slide, deleted, published, slide, publish_date, title, type, unique_name, publish_year) VALUES (10, '<p><b>Дорогие клиенты</b></p>
<p>Мы дарим <b>скидку 7 %</b> на всё меню при заказе <b>с 11:30 по 17:00 в будние дни.</b></p>', 'Скидка 7% на всё меню во время обеда в будние дни.', '2016-01-01 00:00:00', 'lunch-time-original.jpg', 'lunch-time-120x120.jpg', 'lunch-time-middle.jpg', '', false, true, false, '2015-04-15 04:21:07.75212', 'Ланч-Тайм', 1, 'lunch-time', 2015);
INSERT INTO announcements (id, content, description, end_date, image_link_original, image_link_small, image_link_middle, image_link_slide, deleted, published, slide, publish_date, title, type, unique_name, publish_year) VALUES (11, '<p>Дорогие клиенты!</p>
<p>Сообщаем Вам, что постоянно растущие цены на продукты и очередное увеличение цены бензина, вынуждают нас сделать некоторые изменения.</p>
<p>Для того чтобы наша продукция осталась на должном уровне, без потери качества и выхода продукции с 13 Июля мы изменили минимальную сумму заказа с 2500 на 3000.</p>
<p>Также мы ввели новую возможность - теперь при заказе на сумму ниже 3000 тенге вы можете оплатить стоимость доставки отдельно. Например: вы хотите Филадельфию и не хотите заказывать ничего больше, в данном случае вы покупаете Ролл и оплачиваете доставку.</p>
<p>Надеемся на понимание, с уважением Компания "Сушими"</p>
', 'Внесение изменений в режим работы доставки.', '2020-07-01 00:00:00', '', '', '', '', false, true, false, '2015-07-15 11:43:29.351013', 'Изменение суммы бесплатной доставки', 0, 'increase_min_order_sum', 2015);
INSERT INTO announcements (id, content, description, end_date, image_link_original, image_link_small, image_link_middle, image_link_slide, deleted, published, slide, publish_date, title, type, unique_name, publish_year) VALUES (12, '<p>Рады сообщить Вам, что мы ввели накопительную скидку!</p>
<p>Каждый раз когда вы заказываете нашу продукцию мы суммируем сумму ваших заказов.</p>
<p>Суммы и размер скидок вы можете увидеть в таблице ниже:</p>
<ul>
 <li>При накоплении суммы 30 тыс тенге вы получаете скидку в размере 2%.</li>
 <li>При накоплении суммы 50 тыс тенге вы получаете скидку в размере 3%.</li>
<li>При накоплении суммы 85 тыс тенге вы получаете скидку в размере 4%.</li>
<li>При накоплении суммы 120 тыс тенге вы получаете скидку в размере 5%.</li>
<li>При накоплении суммы 155 тыс тенге вы получаете скидку в размере 6%.</li>
<li>При накоплении суммы 190 тыс тенге вы получаете скидку в размере 7%.</li>
<li>При накоплении суммы 225 тыс тенге вы получаете скидку в размере 8%.</li><li>При накоплении суммы 260 тыс тенге вы получаете скидку в размере 9%.</li>
<li>При накоплении суммы 295 тыс тенге вы получаете скидку в размере 10%.</li>
</ul>

<p>P/S Для того чтобы в системе засчитывались суммы за вами, просим Вас корректно называть ваше Телефон или ФИО</p>
<p>С уважением компания "Сушими"</p>', '', '2015-07-15 12:06:48.359041', '', '', '', '', false, true, false, '2015-07-15 12:06:48.359041', 'Персональная скидка для клиентов', 0, 'personal_discount', 2015);


--
-- TOC entry 2558 (class 0 OID 0)
-- Dependencies: 201
-- Name: brc_email_brc_addr_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('brc_email_brc_addr_seq', 1, false);


--
-- TOC entry 2559 (class 0 OID 0)
-- Dependencies: 202
-- Name: brc_email_brc_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('brc_email_brc_seq', 1, false);


--
-- TOC entry 2560 (class 0 OID 0)
-- Dependencies: 203
-- Name: brc_email_brc_tmp_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('brc_email_brc_tmp_seq', 1, false);


--
-- TOC entry 2525 (class 0 OID 49795)
-- Dependencies: 193
-- Data for Name: brc_email_broadcast_addressees; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 2526 (class 0 OID 49803)
-- Dependencies: 194
-- Data for Name: brc_email_broadcast_templates; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 2527 (class 0 OID 49808)
-- Dependencies: 195
-- Data for Name: brc_email_broadcasts; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 2561 (class 0 OID 0)
-- Dependencies: 204
-- Name: brc_email_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('brc_email_seq', 4, true);


--
-- TOC entry 2528 (class 0 OID 49816)
-- Dependencies: 196
-- Data for Name: brc_emails; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO brc_emails (id, created_date, email, is_subscribed, modified_date, name, unique_key, unsubscribed_date) VALUES (2, '2015-09-02 22:46:11.62', 'artem.123@gmail.com', true, '2015-09-02 22:46:11.62', 'Temka', '4578fcd7-482c-43ce-b1ce-14c58c802aa4', NULL);
INSERT INTO brc_emails (id, created_date, email, is_subscribed, modified_date, name, unique_key, unsubscribed_date) VALUES (3, '2015-09-02 22:48:20.695', 'artem.demidovich@gmai.com', true, '2015-09-02 22:48:20.695', 'Artem', '53b7d5ed-3a4f-49bc-bf0c-901473e31191', NULL);
INSERT INTO brc_emails (id, created_date, email, is_subscribed, modified_date, name, unique_key, unsubscribed_date) VALUES (4, '2015-09-13 22:12:03.491', 'artem.demidovich@gmal.com', true, '2015-09-13 22:12:03.491', 'Артем', 'fb6793a3-823c-4d64-a908-f9f769197c4a', NULL);
INSERT INTO brc_emails (id, created_date, email, is_subscribed, modified_date, name, unique_key, unsubscribed_date) VALUES (1, '2015-09-02 22:41:43.202', 'artem.demidovich@gmail.com', true, '2015-09-14 14:10:49.383', 'Артем Демидович', '', NULL);


--
-- TOC entry 2562 (class 0 OID 0)
-- Dependencies: 205
-- Name: brc_phone_brc_addr_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('brc_phone_brc_addr_seq', 1, false);


--
-- TOC entry 2563 (class 0 OID 0)
-- Dependencies: 206
-- Name: brc_phone_brc_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('brc_phone_brc_seq', 1, false);


--
-- TOC entry 2529 (class 0 OID 49824)
-- Dependencies: 197
-- Data for Name: brc_phone_broadcast; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 2530 (class 0 OID 49832)
-- Dependencies: 198
-- Data for Name: brc_phone_broadcast_addressees; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 2564 (class 0 OID 0)
-- Dependencies: 207
-- Name: brc_phone_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('brc_phone_seq', 23, true);


--
-- TOC entry 2531 (class 0 OID 49840)
-- Dependencies: 199
-- Data for Name: brc_phones; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO brc_phones (id, created_date, is_subscribe, modified_date, name, phone, unique_key, unsubscribed_date) VALUES (3, '2015-09-02 22:47:23.563', true, '2015-09-02 22:47:23.563', 'Arem', '7015515103', 'f014ba17-4ee0-4cf9-a313-5a88acaf8537', NULL);
INSERT INTO brc_phones (id, created_date, is_subscribe, modified_date, name, phone, unique_key, unsubscribed_date) VALUES (4, '2015-09-02 22:50:33.183', true, '2015-09-02 22:50:33.184', 'Mixa', '7015524232', 'ed5c1891-8494-4035-91e4-505a7fcd7130', NULL);
INSERT INTO brc_phones (id, created_date, is_subscribe, modified_date, name, phone, unique_key, unsubscribed_date) VALUES (5, '2015-09-04 13:42:58.799', true, '2015-09-04 13:44:01.609', 'Никита', '7015515104', 'd92b0ce3-a8f3-40ff-b132-7b4a31864692', NULL);
INSERT INTO brc_phones (id, created_date, is_subscribe, modified_date, name, phone, unique_key, unsubscribed_date) VALUES (16, '2015-09-14 18:32:39.524', true, '2015-09-14 18:32:39.881', 'Демидович Олимп Артемович', '87017017012', 'b5db8779-2c12-4620-81a5-ceacee8371d1', NULL);
INSERT INTO brc_phones (id, created_date, is_subscribe, modified_date, name, phone, unique_key, unsubscribed_date) VALUES (8, '2015-09-04 23:33:03.211', true, '2015-09-04 23:33:03.211', 'Никита петрович 2', '7015515157', 'c14141d4-5796-44c2-b9a9-698fc98b9150', NULL);
INSERT INTO brc_phones (id, created_date, is_subscribe, modified_date, name, phone, unique_key, unsubscribed_date) VALUES (6, '2015-09-04 13:51:59.239', true, '2015-09-04 23:33:03.208', 'Никита петрович', '7015515151', '9e9347bc-2df2-4225-bdd8-cd53a8b4fe74', NULL);
INSERT INTO brc_phones (id, created_date, is_subscribe, modified_date, name, phone, unique_key, unsubscribed_date) VALUES (21, '2015-09-14 18:32:39.94', true, '2015-09-14 18:32:39.94', 'Федоров Артем Иванович', '7028899703', '5bf4c4d3-e964-4566-ac1b-e44cfe5919f8', NULL);
INSERT INTO brc_phones (id, created_date, is_subscribe, modified_date, name, phone, unique_key, unsubscribed_date) VALUES (9, '2015-09-04 23:40:21.917', true, '2015-09-14 18:32:39.981', 'Artemkin', '70144144141', '110b84f7-8cab-4ab3-84d5-d6bf12e8c6ca', NULL);
INSERT INTO brc_phones (id, created_date, is_subscribe, modified_date, name, phone, unique_key, unsubscribed_date) VALUES (19, '2015-09-14 18:32:39.615', true, '2015-09-14 18:32:39.615', 'Алигазинов Арман', '77880006666', 'f7fc6987-0776-470e-85fc-c051eafef3e4', NULL);
INSERT INTO brc_phones (id, created_date, is_subscribe, modified_date, name, phone, unique_key, unsubscribed_date) VALUES (2, '2015-09-02 22:43:25.66', true, '2015-09-14 18:56:11.335', 'Киря', '7015515102', '35d0dad0-d74b-4605-b621-4e3fdc863ce9', NULL);
INSERT INTO brc_phones (id, created_date, is_subscribe, modified_date, name, phone, unique_key, unsubscribed_date) VALUES (22, '2015-09-15 23:21:50.81', true, '2015-09-15 23:21:50.81', 'Степанчук Артем ', '7018099994', '6525fc7a-3722-4001-99a5-8b75a8226ad5', NULL);
INSERT INTO brc_phones (id, created_date, is_subscribe, modified_date, name, phone, unique_key, unsubscribed_date) VALUES (17, '2015-09-14 18:32:39.541', true, '2015-09-15 23:35:39.444', 'Андреевский Артем', '87715514560', 'b328c2af-1b02-49e0-b313-cc850f710d89', NULL);
INSERT INTO brc_phones (id, created_date, is_subscribe, modified_date, name, phone, unique_key, unsubscribed_date) VALUES (20, '2015-09-14 18:32:39.836', true, '2015-09-15 23:45:39.892', 'Артем', '7471413666', '7fc27ff4-18d9-404b-ab59-2873f17e7924', NULL);
INSERT INTO brc_phones (id, created_date, is_subscribe, modified_date, name, phone, unique_key, unsubscribed_date) VALUES (13, '2015-09-14 18:32:39.478', true, '2015-10-02 00:41:34.335', 'Демидович Александр Олимпович', '87015445584', '7d7363e0-c8e1-4a01-91a8-2b32b4f5588f', NULL);
INSERT INTO brc_phones (id, created_date, is_subscribe, modified_date, name, phone, unique_key, unsubscribed_date) VALUES (14, '2015-09-14 18:32:39.491', true, '2015-10-04 21:09:30.856', 'Демидович Артем Александрович', '87015515101', 'd0094819-1824-47cd-a6f9-57f0569414a0', NULL);
INSERT INTO brc_phones (id, created_date, is_subscribe, modified_date, name, phone, unique_key, unsubscribed_date) VALUES (1, '2015-09-02 22:41:43.207', true, '2015-10-08 19:39:47.743', 'Artem', '7015515101', '', NULL);
INSERT INTO brc_phones (id, created_date, is_subscribe, modified_date, name, phone, unique_key, unsubscribed_date) VALUES (23, '2015-10-10 23:32:30.6', true, '2015-10-10 23:32:30.6', 'artem', '7015815151', '1e24d2e4-8e35-4547-8e0c-4bc15376b9a4', NULL);
INSERT INTO brc_phones (id, created_date, is_subscribe, modified_date, name, phone, unique_key, unsubscribed_date) VALUES (10, '2015-09-04 23:58:16.469', true, '2015-09-14 18:32:39.438', 'Dinara Dildabek', '7054546464', 'd97a00ee-092a-4de8-a892-458c724ac3f4', NULL);
INSERT INTO brc_phones (id, created_date, is_subscribe, modified_date, name, phone, unique_key, unsubscribed_date) VALUES (11, '2015-09-05 00:01:01.59', true, '2015-09-14 18:32:39.451', 'Анна', '7012427072', '8da7d1a7-3fb0-4247-bc33-9912104026ef', NULL);
INSERT INTO brc_phones (id, created_date, is_subscribe, modified_date, name, phone, unique_key, unsubscribed_date) VALUES (12, '2015-09-14 18:32:39.464', true, '2015-09-14 18:32:39.464', 'Протасова Анастасия', '7051703663', 'a784407d-e273-4b9d-b60b-730a0b75cd45', NULL);
INSERT INTO brc_phones (id, created_date, is_subscribe, modified_date, name, phone, unique_key, unsubscribed_date) VALUES (15, '2015-09-14 18:32:39.505', true, '2015-09-14 18:32:39.505', 'Ауганова Сабина Даутовна', '7072922266', '043f47b1-5feb-4b44-b384-61b0acbefe3b', NULL);
INSERT INTO brc_phones (id, created_date, is_subscribe, modified_date, name, phone, unique_key, unsubscribed_date) VALUES (18, '2015-09-14 18:32:39.569', true, '2015-09-14 18:32:39.569', 'Комаров Артем', '87011558000', 'e28e655f-8410-4ddf-850a-afee4352ef6b', NULL);


--
-- TOC entry 2565 (class 0 OID 0)
-- Dependencies: 213
-- Name: brc_push_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('brc_push_seq', 2, true);


--
-- TOC entry 2532 (class 0 OID 49848)
-- Dependencies: 200
-- Data for Name: brc_pushes; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO brc_pushes (id, application_version, created_date, is_subscribe, modified_date, name, platform, platform_version, push_key, unique_key, unsubscribed_date) VALUES (1, NULL, '2015-10-10 23:30:45.282', true, '2015-10-10 23:30:45.282', NULL, 'IOS', NULL, '<570a0f7f 3a57652c b2ea080f 297f4212 fc3b65ab e696b7a6 440d393c 1c5af07d>', '338e8cad-25cf-4c91-af3a-6193a44c15e4', NULL);
INSERT INTO brc_pushes (id, application_version, created_date, is_subscribe, modified_date, name, platform, platform_version, push_key, unique_key, unsubscribed_date) VALUES (2, NULL, '2015-10-10 23:35:38.47', true, '2015-10-10 23:35:38.47', NULL, 'IOS', NULL, '<0ecb0acc cac0935a 36657278 07328b8b a4285ce5 8f1ae3ba 66785cc4 f48e2bee>', 'c4134ba4-e75c-4bb8-af85-3c5802dd2244', NULL);


--
-- TOC entry 2505 (class 0 OID 49565)
-- Dependencies: 173
-- Data for Name: cart; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 2506 (class 0 OID 49568)
-- Dependencies: 174
-- Data for Name: cart_items; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 2507 (class 0 OID 49571)
-- Dependencies: 175
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO categories (id, deleted, published, name, category_id, order_number, unique_name, code, type, image_link, mobilecategory_id, mobile_order_number, top_menu_available, top_menu_image_link) VALUES (3, false, false, 'Детское', NULL, 60, 'children', '3', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO categories (id, deleted, published, name, category_id, order_number, unique_name, code, type, image_link, mobilecategory_id, mobile_order_number, top_menu_available, top_menu_image_link) VALUES (26, false, false, 'Гарниры', 21, 350, 'garniri', '26', 'ANTISUSHI', NULL, NULL, NULL, NULL, NULL);
INSERT INTO categories (id, deleted, published, name, category_id, order_number, unique_name, code, type, image_link, mobilecategory_id, mobile_order_number, top_menu_available, top_menu_image_link) VALUES (21, false, false, 'Вторые блюда', NULL, 300, 'hot_dishes', '21', 'ANTISUSHI', NULL, NULL, NULL, NULL, NULL);
INSERT INTO categories (id, deleted, published, name, category_id, order_number, unique_name, code, type, image_link, mobilecategory_id, mobile_order_number, top_menu_available, top_menu_image_link) VALUES (27, false, false, 'Горячее', 21, 220, 'second_hot', '27', 'ANTISUSHI', NULL, NULL, NULL, NULL, NULL);
INSERT INTO categories (id, deleted, published, name, category_id, order_number, unique_name, code, type, image_link, mobilecategory_id, mobile_order_number, top_menu_available, top_menu_image_link) VALUES (29, false, true, 'Сашими', 1, 500, 'sashimi', '29', 'SUSHI', 'sashimi-losos-210x167.jpg', NULL, 200, NULL, NULL);
INSERT INTO categories (id, deleted, published, name, category_id, order_number, unique_name, code, type, image_link, mobilecategory_id, mobile_order_number, top_menu_available, top_menu_image_link) VALUES (28, false, true, 'Салаты', 2, 240, 'sushi_salads', '28', 'SUSHI', 'salad-chuka-seafood-210x167.jpg', NULL, 400, NULL, NULL);
INSERT INTO categories (id, deleted, published, name, category_id, order_number, unique_name, code, type, image_link, mobilecategory_id, mobile_order_number, top_menu_available, top_menu_image_link) VALUES (24, false, false, 'Шашлык', 21, 230, 'shashlik', '24', 'ANTISUSHI', NULL, NULL, 500, NULL, NULL);
INSERT INTO categories (id, deleted, published, name, category_id, order_number, unique_name, code, type, image_link, mobilecategory_id, mobile_order_number, top_menu_available, top_menu_image_link) VALUES (20, false, false, 'Салаты', NULL, 200, 'salads', '20', 'ANTISUSHI', 'salad-chuka-seafood-210x167.jpg', NULL, NULL, NULL, NULL);
INSERT INTO categories (id, deleted, published, name, category_id, order_number, unique_name, code, type, image_link, mobilecategory_id, mobile_order_number, top_menu_available, top_menu_image_link) VALUES (23, false, true, 'Горячее и Закуски', 2, 220, 'zakuski', '23', 'SUSHI', 'shashl-losos-210x167.jpg', NULL, 600, NULL, NULL);
INSERT INTO categories (id, deleted, published, name, category_id, order_number, unique_name, code, type, image_link, mobilecategory_id, mobile_order_number, top_menu_available, top_menu_image_link) VALUES (22, false, true, 'Соусы', NULL, 600, 'extra', '22', 'SUSHI', 'sauce-tobico-spacy-210x167.jpg', NULL, 700, NULL, NULL);
INSERT INTO categories (id, deleted, published, name, category_id, order_number, unique_name, code, type, image_link, mobilecategory_id, mobile_order_number, top_menu_available, top_menu_image_link) VALUES (5, false, true, 'Гункан', 1, 10, 'guncan', '5', 'SUSHI', 'gunkan-ugor-spaysi-210x167.jpg', 1, 100, NULL, NULL);
INSERT INTO categories (id, deleted, published, name, category_id, order_number, unique_name, code, type, image_link, mobilecategory_id, mobile_order_number, top_menu_available, top_menu_image_link) VALUES (6, false, true, 'Нигири', 1, 200, 'nigiry', '6', 'SUSHI', 'nigiri-kopcheniy-losos-210x167.jpg', 1, 200, NULL, NULL);
INSERT INTO categories (id, deleted, published, name, category_id, order_number, unique_name, code, type, image_link, mobilecategory_id, mobile_order_number, top_menu_available, top_menu_image_link) VALUES (15, false, true, 'Безалкогольные', 4, 15, 'nonalcohol', '15', 'BOTH', 'drinks-red-bull-210x167.jpg', 4, 100, NULL, NULL);
INSERT INTO categories (id, deleted, published, name, category_id, order_number, unique_name, code, type, image_link, mobilecategory_id, mobile_order_number, top_menu_available, top_menu_image_link) VALUES (16, false, true, 'Алкогольные', 4, 16, 'alcohol', '16', 'BOTH', 'drinks-tuborg-210x167.jpg', 4, 200, NULL, NULL);
INSERT INTO categories (id, deleted, published, name, category_id, order_number, unique_name, code, type, image_link, mobilecategory_id, mobile_order_number, top_menu_available, top_menu_image_link) VALUES (1, false, true, 'Суши', NULL, 0, 'sushi', '1', 'SUSHI', 'nigiri-kopcheniy-losos-210x167.jpg', NULL, 100, true, 'nigiri-kopcheniy-losos-210x167.jpg');
INSERT INTO categories (id, deleted, published, name, category_id, order_number, unique_name, code, type, image_link, mobilecategory_id, mobile_order_number, top_menu_available, top_menu_image_link) VALUES (2, false, true, 'Антисуши', NULL, 350, 'antisushi', '2', 'ANTISUSHI', NULL, NULL, NULL, true, 'antisushi.jpg');
INSERT INTO categories (id, deleted, published, name, category_id, order_number, unique_name, code, type, image_link, mobilecategory_id, mobile_order_number, top_menu_available, top_menu_image_link) VALUES (4, false, true, 'Напитки', NULL, 700, 'drinks', '4', 'BOTH', 'drinks-red-bull-210x167.jpg', NULL, 800, true, 'napitki.jpg');
INSERT INTO categories (id, deleted, published, name, category_id, order_number, unique_name, code, type, image_link, mobilecategory_id, mobile_order_number, top_menu_available, top_menu_image_link) VALUES (8, false, true, 'Роллы', NULL, 25, 'rolls', '8', 'SUSHI', 'roll-filadelfiya-210x167.jpg', NULL, 0, true, 'rolli.jpg');
INSERT INTO categories (id, deleted, published, name, category_id, order_number, unique_name, code, type, image_link, mobilecategory_id, mobile_order_number, top_menu_available, top_menu_image_link) VALUES (9, false, true, 'Сеты', NULL, 35, 'sets', '9', 'SUSHI', 'set-warm-210x167.jpg', NULL, 300, true, 'set-warm-210x167.jpg');
INSERT INTO categories (id, deleted, published, name, category_id, order_number, unique_name, code, type, image_link, mobilecategory_id, mobile_order_number, top_menu_available, top_menu_image_link) VALUES (25, false, true, 'Пицца', NULL, 50, 'pizza', '25', 'BOTH', 'pizza-four-seasons-210x167.jpg', NULL, NULL, true, 'pizza.jpg');


--
-- TOC entry 2508 (class 0 OID 49577)
-- Dependencies: 176
-- Data for Name: cities; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO cities (id, min_order_sum, name, deleted, published, end_work_hour, start_work_hour) VALUES (1, 3000, 'Астана', false, true, 24, 12);


--
-- TOC entry 2509 (class 0 OID 49580)
-- Dependencies: 177
-- Data for Name: delivery_service_points; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO delivery_service_points (id, address, addres_geo_latitude, address_geo_longitude, delivery_area, delivery_area_image_url, delivery_area_remarks, deleted, published, min_order_sum, order_number, phone_number, title, workhours) VALUES (1, 'ул. Тархана 9', 51.1609001, 71.4517975, 'от Алматинского (до ул. Калдаякова и Айнаколь), Сарыаркинского (до вокзала и ул. Байсетовой), Есильского (до ул. Сыганак) районов', 'mobile/delivery/astana_delivery_area_3.png', 'в другие регионы цена доставки от 500 тенге', false, true, '3000 + бесплатная доставка', 1, '+77012528252', 'Доставка в Астане', 'с 11:00 до 24:00');


--
-- TOC entry 2510 (class 0 OID 49586)
-- Dependencies: 178
-- Data for Name: departments; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO departments (id, address, name, city_id, deleted, published, end_work_hour, start_work_hour, latitude, longitude) VALUES (1, 'ул. Тархана д. 9', 'Тархана 9', 1, false, true, 24, 12, '51.1801', '71.44598');


--
-- TOC entry 2523 (class 0 OID 49774)
-- Dependencies: 191
-- Data for Name: feedbacks; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO feedbacks (id, city_name, client_name, created_date, published, order_number, phone_number, reason, restaurant_name, status, type, text) VALUES (1, 'Астана', 'Артем', '2014-07-07 00:00:00', true, NULL, '7015515101', NULL, 'Ресторан на Тархана', 'ACCEPTED', 'RESTAURANT', 'Всё было супер');
INSERT INTO feedbacks (id, city_name, client_name, created_date, published, order_number, phone_number, reason, restaurant_name, status, type, text) VALUES (2, 'Астана', 'Никита', '2015-07-08 00:00:00', false, NULL, '7014242312', NULL, 'Ресторан на Тархана', 'DECLINED', 'RESTAURANT', 'Плохо обслужили');
INSERT INTO feedbacks (id, city_name, client_name, created_date, published, order_number, phone_number, reason, restaurant_name, status, type, text) VALUES (3, 'Астана', 'Владимир', '2015-07-21 00:00:00', false, NULL, '7023231212', NULL, 'Ресторан на Тархана', 'NEW', 'RESTAURANT', 'Кола не холодная');
INSERT INTO feedbacks (id, city_name, client_name, created_date, published, order_number, phone_number, reason, restaurant_name, status, type, text) VALUES (4, 'Астана', 'Кайрат', '2015-06-07 00:00:00', true, '1231', '7015232310', NULL, NULL, 'ACCEPTED', 'DELIVERY', 'Долго везли');
INSERT INTO feedbacks (id, city_name, client_name, created_date, published, order_number, phone_number, reason, restaurant_name, status, type, text) VALUES (5, 'Астана', 'Нурбек', '2015-05-12 00:00:00', false, '3231', '7015533221', NULL, NULL, 'DECLINED', 'DELIVERY', 'Вы просто задницы');
INSERT INTO feedbacks (id, city_name, client_name, created_date, published, order_number, phone_number, reason, restaurant_name, status, type, text) VALUES (16643, 'Астана', 'Никита Смоленский', '2015-07-22 00:08:41.361', true, '', '7015515101', NULL, NULL, 'ACCEPTED', 'FEEDBACK', 'Крута');
INSERT INTO feedbacks (id, city_name, client_name, created_date, published, order_number, phone_number, reason, restaurant_name, status, type, text) VALUES (16644, 'Астана', 'Прогулкин', '2015-07-22 00:09:29.381', true, '', '7015515101', NULL, NULL, 'ACCEPTED', 'DELIVERY', 'Ку');
INSERT INTO feedbacks (id, city_name, client_name, created_date, published, order_number, phone_number, reason, restaurant_name, status, type, text) VALUES (16645, 'Астана', 'Вредный', '2015-07-22 00:09:57.614', true, '', '7015515101', NULL, NULL, 'ACCEPTED', 'MOBILE', 'Новые фишки нужны');
INSERT INTO feedbacks (id, city_name, client_name, created_date, published, order_number, phone_number, reason, restaurant_name, status, type, text) VALUES (6, 'Астана', 'Женя', '2015-02-01 00:00:00', false, '2341', '7015151511', NULL, NULL, 'NEW', 'DELIVERY', 'Всё очень понравилось');
INSERT INTO feedbacks (id, city_name, client_name, created_date, published, order_number, phone_number, reason, restaurant_name, status, type, text) VALUES (7, 'Астана', 'Карина', '2015-04-21 00:00:00', true, NULL, '7014141414', NULL, NULL, 'ACCEPTED', 'FEEDBACK', 'Классно работаете, очень нравитесь, давайте в том же духе');
INSERT INTO feedbacks (id, city_name, client_name, created_date, published, order_number, phone_number, reason, restaurant_name, status, type, text) VALUES (8, 'Астана', 'Айсулу', '2015-03-07 00:00:00', true, NULL, '7473324212', NULL, NULL, 'ACCEPTED', 'WEB', 'Добавьте пожалуйста поиск');
INSERT INTO feedbacks (id, city_name, client_name, created_date, published, order_number, phone_number, reason, restaurant_name, status, type, text) VALUES (9, 'Астана', 'Берик', '2015-07-16 00:00:00', true, NULL, '7014142948', NULL, NULL, 'ACCEPTED', 'MOBILE', 'Классное приложение, добавьте PUSH уведомления');
INSERT INTO feedbacks (id, city_name, client_name, created_date, published, order_number, phone_number, reason, restaurant_name, status, type, text) VALUES (16646, 'Астана', 'Артурчик', '2015-07-22 00:10:33.165', true, '4142', '7015515101', NULL, NULL, 'ACCEPTED', 'DELIVERY', 'Кризис, давайте цены снижайте');
INSERT INTO feedbacks (id, city_name, client_name, created_date, published, order_number, phone_number, reason, restaurant_name, status, type, text) VALUES (16647, 'Астана', 'Artem', '2015-07-22 00:11:18.808', true, '453', '7015515101', NULL, NULL, 'ACCEPTED', 'DELIVERY', 'Reqw');
INSERT INTO feedbacks (id, city_name, client_name, created_date, published, order_number, phone_number, reason, restaurant_name, status, type, text) VALUES (16648, 'Астана', 'Ara', '2015-07-22 00:12:02.352', true, '', '7015515101', NULL, 'Бараева', 'ACCEPTED', 'RESTAURANT', 'Tres');
INSERT INTO feedbacks (id, city_name, client_name, created_date, published, order_number, phone_number, reason, restaurant_name, status, type, text) VALUES (16631, NULL, 'Artem', '2015-07-21 23:21:26.564', true, NULL, '7015515101', NULL, NULL, 'ACCEPTED', 'DELIVERY', 'привезли гавно как-ето через  3 часа!');
INSERT INTO feedbacks (id, city_name, client_name, created_date, published, order_number, phone_number, reason, restaurant_name, status, type, text) VALUES (16632, NULL, 'Nikita', '2015-07-21 23:24:46.233', true, NULL, '7014424442', NULL, NULL, 'ACCEPTED', 'MOBILE', 'Классно!, сделайте еще звонок');
INSERT INTO feedbacks (id, city_name, client_name, created_date, published, order_number, phone_number, reason, restaurant_name, status, type, text) VALUES (16633, NULL, 'Колька', '2015-07-21 23:26:51.397', true, NULL, '7015515101', NULL, NULL, 'ACCEPTED', 'WEB', 'Долго грузиться');
INSERT INTO feedbacks (id, city_name, client_name, created_date, published, order_number, phone_number, reason, restaurant_name, status, type, text) VALUES (16649, 'Астана', 'Art', '2015-07-22 00:13:35.09', true, '', '1231231231', NULL, NULL, 'ACCEPTED', 'WEB', 'Fdfsd');
INSERT INTO feedbacks (id, city_name, client_name, created_date, published, order_number, phone_number, reason, restaurant_name, status, type, text) VALUES (16655, 'Астана', 'asdasdasd', '2015-07-24 22:31:58.4', true, '123123', '1231312312', NULL, NULL, 'ACCEPTED', 'DELIVERY', 'хуйня гавно');
INSERT INTO feedbacks (id, city_name, client_name, created_date, published, order_number, phone_number, reason, restaurant_name, status, type, text) VALUES (16634, NULL, 'Гвидон', '2015-07-21 23:29:22.017', true, NULL, '7014414141', NULL, NULL, 'ACCEPTED', 'RESTAURANT', 'Письки вы');
INSERT INTO feedbacks (id, city_name, client_name, created_date, published, order_number, phone_number, reason, restaurant_name, status, type, text) VALUES (16635, NULL, 'Fd', '2015-07-21 23:32:14.059', true, NULL, '1231123112', NULL, NULL, 'ACCEPTED', 'DELIVERY', 'Cerb!');
INSERT INTO feedbacks (id, city_name, client_name, created_date, published, order_number, phone_number, reason, restaurant_name, status, type, text) VALUES (16636, NULL, 'Какарин', '2015-07-21 23:40:52.222', true, NULL, '7015515101', NULL, NULL, 'ACCEPTED', 'DELIVERY', 'Ну и гамно же');
INSERT INTO feedbacks (id, city_name, client_name, created_date, published, order_number, phone_number, reason, restaurant_name, status, type, text) VALUES (16637, 'Астана', 'Пираты ', '2015-07-21 23:52:35.531', true, NULL, '7015515101', NULL, 'Бараева', 'ACCEPTED', 'RESTAURANT', 'Привет');
INSERT INTO feedbacks (id, city_name, client_name, created_date, published, order_number, phone_number, reason, restaurant_name, status, type, text) VALUES (16638, 'Астана', 'Artem', '2015-07-21 23:56:37.499', true, NULL, '7015515101', NULL, 'Бараева', 'ACCEPTED', 'DELIVERY', 'gfdfd');
INSERT INTO feedbacks (id, city_name, client_name, created_date, published, order_number, phone_number, reason, restaurant_name, status, type, text) VALUES (16639, 'Астана', 'Arte', '2015-07-21 23:57:38.41', true, NULL, '7015515101', NULL, 'Бараева', 'ACCEPTED', 'DELIVERY', '12313');
INSERT INTO feedbacks (id, city_name, client_name, created_date, published, order_number, phone_number, reason, restaurant_name, status, type, text) VALUES (16640, 'Астана', 'Genius', '2015-07-21 23:59:44.981', true, NULL, '7015515101', NULL, 'Бараева', 'ACCEPTED', 'DELIVERY', 'asdad');
INSERT INTO feedbacks (id, city_name, client_name, created_date, published, order_number, phone_number, reason, restaurant_name, status, type, text) VALUES (16641, 'Астана', 'Gavno', '2015-07-22 00:04:08.499', true, '123', '7015515101', NULL, 'Бараева', 'ACCEPTED', 'DELIVERY', 'asd');
INSERT INTO feedbacks (id, city_name, client_name, created_date, published, order_number, phone_number, reason, restaurant_name, status, type, text) VALUES (16642, 'Астана', 'Артем Демидович', '2015-07-22 00:08:01.501', true, '', '7015515101', NULL, 'Бараева', 'ACCEPTED', 'RESTAURANT', 'Вот официанты казлы же');
INSERT INTO feedbacks (id, city_name, client_name, created_date, published, order_number, phone_number, reason, restaurant_name, status, type, text) VALUES (16656, 'Астана', 'asdasd', '2015-07-29 22:17:43.373', false, NULL, '1231231232', NULL, NULL, 'NEW', 'FEEDBACK', 'asdasdasdasd');
INSERT INTO feedbacks (id, city_name, client_name, created_date, published, order_number, phone_number, reason, restaurant_name, status, type, text) VALUES (16657, 'Астана', 'sdfsdf', '2015-07-29 22:23:02.606', false, NULL, '1231231321', NULL, NULL, 'NEW', 'FEEDBACK', 'dsfsd');
INSERT INTO feedbacks (id, city_name, client_name, created_date, published, order_number, phone_number, reason, restaurant_name, status, type, text) VALUES (16658, 'Астана', 'sdasdasdasdasa', '2015-07-29 22:24:44.774', false, NULL, '1231231231', NULL, NULL, 'NEW', 'FEEDBACK', 'sdasdas');
INSERT INTO feedbacks (id, city_name, client_name, created_date, published, order_number, phone_number, reason, restaurant_name, status, type, text) VALUES (16659, 'Астана', 'qqeqweq', '2015-07-30 00:29:53.752', false, NULL, '1231232131', NULL, 'Бараева', 'NEW', 'RESTAURANT', 'sfsdfsd');
INSERT INTO feedbacks (id, city_name, client_name, created_date, published, order_number, phone_number, reason, restaurant_name, status, type, text) VALUES (16660, 'Астана', 'asdasdasd', '2015-07-30 00:42:36.547', false, NULL, '1212312312', NULL, NULL, 'NEW', 'FEEDBACK', 'sdas');
INSERT INTO feedbacks (id, city_name, client_name, created_date, published, order_number, phone_number, reason, restaurant_name, status, type, text) VALUES (16661, 'Астана', 'asdasdasd', '2015-07-30 00:43:23.623', false, NULL, '2312312312', NULL, NULL, 'NEW', 'FEEDBACK', 'sdasdsas');
INSERT INTO feedbacks (id, city_name, client_name, created_date, published, order_number, phone_number, reason, restaurant_name, status, type, text) VALUES (16662, 'Астана', 'qqeqweqeqwe', '2015-07-30 00:52:13.796', false, NULL, '1231231231', NULL, NULL, 'NEW', 'FEEDBACK', 'asdadads');
INSERT INTO feedbacks (id, city_name, client_name, created_date, published, order_number, phone_number, reason, restaurant_name, status, type, text) VALUES (16663, 'Астана', 'sdfadfa', '2015-07-30 00:57:35.91', false, NULL, '1231212312', NULL, NULL, 'NEW', 'FEEDBACK', 'sdfsdfs');
INSERT INTO feedbacks (id, city_name, client_name, created_date, published, order_number, phone_number, reason, restaurant_name, status, type, text) VALUES (16664, 'Астана', 'safdasdfasdfsadf', '2015-07-30 00:58:23.376', false, NULL, '3424234234', NULL, NULL, 'NEW', 'FEEDBACK', 'sdfsdfs');
INSERT INTO feedbacks (id, city_name, client_name, created_date, published, order_number, phone_number, reason, restaurant_name, status, type, text) VALUES (16665, 'Астана', 'dsadasd', '2015-07-30 01:10:52.749', false, NULL, '1231123123', NULL, NULL, 'NEW', 'FEEDBACK', 'sadasdasda');
INSERT INTO feedbacks (id, city_name, client_name, created_date, published, order_number, phone_number, reason, restaurant_name, status, type, text) VALUES (16666, 'Астана', 'dsfsdfsdf', '2015-07-30 01:11:29.81', false, NULL, '1231231231', NULL, NULL, 'NEW', 'FEEDBACK', 'fsdfasdasd');
INSERT INTO feedbacks (id, city_name, client_name, created_date, published, order_number, phone_number, reason, restaurant_name, status, type, text) VALUES (16667, 'Астана', 'dfsdfsdfsdfsdf', '2015-07-30 01:13:52.766', false, NULL, '1231231231', NULL, NULL, 'NEW', 'FEEDBACK', 'dsdfsdf');
INSERT INTO feedbacks (id, city_name, client_name, created_date, published, order_number, phone_number, reason, restaurant_name, status, type, text) VALUES (16668, 'Астана', 'sdfsadfas', '2015-07-30 01:15:01.417', false, NULL, '2134231412', NULL, NULL, 'NEW', 'FEEDBACK', 'sdfsdfasd');
INSERT INTO feedbacks (id, city_name, client_name, created_date, published, order_number, phone_number, reason, restaurant_name, status, type, text) VALUES (16669, 'Астана', 'sadfsfasdfa', '2015-07-30 01:15:48.093', false, NULL, '2342141241', NULL, NULL, 'NEW', 'FEEDBACK', 'zdfasdfads');
INSERT INTO feedbacks (id, city_name, client_name, created_date, published, order_number, phone_number, reason, restaurant_name, status, type, text) VALUES (16670, 'Астана', 'sdfadfasdfa', '2015-07-30 01:17:09.177', false, NULL, '3214123412', NULL, NULL, 'NEW', 'FEEDBACK', 'asdfsafasd');
INSERT INTO feedbacks (id, city_name, client_name, created_date, published, order_number, phone_number, reason, restaurant_name, status, type, text) VALUES (16671, 'Астана', 'sdfasdfasdfasdf', '2015-07-30 01:18:23.511', false, NULL, '2342134123', NULL, NULL, 'NEW', 'FEEDBACK', 'adfsdf');
INSERT INTO feedbacks (id, city_name, client_name, created_date, published, order_number, phone_number, reason, restaurant_name, status, type, text) VALUES (16672, 'Астана', 'sadfsadfasf', '2015-07-30 01:40:38.018', false, NULL, '2314134123', NULL, NULL, 'NEW', 'FEEDBACK', 'sdfasdfafs');
INSERT INTO feedbacks (id, city_name, client_name, created_date, published, order_number, phone_number, reason, restaurant_name, status, type, text) VALUES (16673, 'Астана', 'sdfsdfsdfsd', '2015-07-30 01:48:33.709', false, NULL, '1231231231', NULL, NULL, 'NEW', 'FEEDBACK', 'sdfsdfsd');
INSERT INTO feedbacks (id, city_name, client_name, created_date, published, order_number, phone_number, reason, restaurant_name, status, type, text) VALUES (16674, 'Астана', 'safasdf', '2015-07-30 01:50:32.686', false, NULL, '2313242341', NULL, NULL, 'NEW', 'FEEDBACK', '`sdf`sd');
INSERT INTO feedbacks (id, city_name, client_name, created_date, published, order_number, phone_number, reason, restaurant_name, status, type, text) VALUES (16675, 'Астана', 'afasdfasdfsadf', '2015-07-30 01:53:55.722', false, NULL, '3312423412', NULL, NULL, 'NEW', 'FEEDBACK', 'sdfsadfad');
INSERT INTO feedbacks (id, city_name, client_name, created_date, published, order_number, phone_number, reason, restaurant_name, status, type, text) VALUES (16676, 'Астана', 'sdfsadfasdfasdfa', '2015-07-30 01:57:18.073', false, NULL, '2134231242', NULL, 'Бараева', 'NEW', 'RESTAURANT', 'sdfsadfasdf');
INSERT INTO feedbacks (id, city_name, client_name, created_date, published, order_number, phone_number, reason, restaurant_name, status, type, text) VALUES (16677, 'Астана', 'artem', '2015-07-31 19:51:22.897', false, NULL, '7015515101', NULL, NULL, 'NEW', 'DELIVERY', 'Bad delivery timeadsadadadasdasdasdadaadasdasdasdas');
INSERT INTO feedbacks (id, city_name, client_name, created_date, published, order_number, phone_number, reason, restaurant_name, status, type, text) VALUES (16678, 'Астана', 'Afgan', '2015-07-31 19:51:50.888', false, NULL, '7015515101', NULL, 'Бараева', 'NEW', 'RESTAURANT', '1231');
INSERT INTO feedbacks (id, city_name, client_name, created_date, published, order_number, phone_number, reason, restaurant_name, status, type, text) VALUES (16679, 'Астана', 'artem', '2015-07-31 19:52:39.43', false, NULL, '7015515101', NULL, NULL, 'NEW', 'FEEDBACK', 'sdfsd');
INSERT INTO feedbacks (id, city_name, client_name, created_date, published, order_number, phone_number, reason, restaurant_name, status, type, text) VALUES (16680, 'Астана', 'arte', '2015-07-31 19:54:33.031', false, NULL, '1231231133', NULL, NULL, 'NEW', 'FEEDBACK', 'fsdfsdfsd');
INSERT INTO feedbacks (id, city_name, client_name, created_date, published, order_number, phone_number, reason, restaurant_name, status, type, text) VALUES (16681, 'Астана', 'dasdasdasd', '2015-07-31 19:54:47.591', false, NULL, '2312312312', NULL, NULL, 'NEW', 'FEEDBACK', 'sdasdasda');
INSERT INTO feedbacks (id, city_name, client_name, created_date, published, order_number, phone_number, reason, restaurant_name, status, type, text) VALUES (16682, 'Астана', 'Artem', '2015-07-31 19:59:28.21', false, NULL, '7015515101', NULL, NULL, 'NEW', 'FEEDBACK', 'Whatta fuck>');
INSERT INTO feedbacks (id, city_name, client_name, created_date, published, order_number, phone_number, reason, restaurant_name, status, type, text) VALUES (16683, 'Астана', 'Artem', '2015-07-31 20:06:28.134', false, NULL, '7015515101', NULL, NULL, 'NEW', 'FEEDBACK', 'asdasdas');
INSERT INTO feedbacks (id, city_name, client_name, created_date, published, order_number, phone_number, reason, restaurant_name, status, type, text) VALUES (16684, 'Астана', 'Artem', '2015-07-31 20:16:18.562', false, NULL, '7015515101', NULL, NULL, 'NEW', 'FEEDBACK', 'sdfsdfssd');
INSERT INTO feedbacks (id, city_name, client_name, created_date, published, order_number, phone_number, reason, restaurant_name, status, type, text) VALUES (16685, 'Астана', 'Artem', '2015-07-31 20:18:13.195', false, NULL, '7015515101', NULL, NULL, 'NEW', 'FEEDBACK', 'asdasdad');
INSERT INTO feedbacks (id, city_name, client_name, created_date, published, order_number, phone_number, reason, restaurant_name, status, type, text) VALUES (16686, 'Астана', 'Artem', '2015-07-31 20:18:58.058', false, NULL, '7015515101', NULL, NULL, 'NEW', 'FEEDBACK', 'dfsdfsdfsd');
INSERT INTO feedbacks (id, city_name, client_name, created_date, published, order_number, phone_number, reason, restaurant_name, status, type, text) VALUES (16687, 'Астана', 'Artem', '2015-08-02 23:45:28.451', false, NULL, '7015515101', NULL, NULL, 'NEW', 'FEEDBACK', 'werwerwewerwrewrwerwerwerwerwerwe');
INSERT INTO feedbacks (id, city_name, client_name, created_date, published, order_number, phone_number, reason, restaurant_name, status, type, text) VALUES (16688, 'Астана', 'Artem', '2015-08-02 23:46:48.097', false, NULL, '7015515101', NULL, NULL, 'NEW', 'FEEDBACK', 'sdfsdfsdf');
INSERT INTO feedbacks (id, city_name, client_name, created_date, published, order_number, phone_number, reason, restaurant_name, status, type, text) VALUES (16689, 'Астана', 'Artem', '2015-08-03 09:35:19.1', false, NULL, '7015515101', NULL, NULL, 'NEW', 'FEEDBACK', 'sdsd');
INSERT INTO feedbacks (id, city_name, client_name, created_date, published, order_number, phone_number, reason, restaurant_name, status, type, text) VALUES (102, 'Астана', 'Артем', '2015-08-04 21:00:00', true, NULL, '7701551122', NULL, NULL, 'ACCEPTED', 'FEEDBACK', 'Очень интересное меню, вся семья была рада, только вот сделайте скидки по больше');
INSERT INTO feedbacks (id, city_name, client_name, created_date, published, order_number, phone_number, reason, restaurant_name, status, type, text) VALUES (16690, 'Астана', 'Artem', '2015-08-03 21:41:58.341', false, NULL, '7015515101', NULL, NULL, 'NEW', 'FEEDBACK', 'Ghbdt');
INSERT INTO feedbacks (id, city_name, client_name, created_date, published, order_number, phone_number, reason, restaurant_name, status, type, text) VALUES (16691, 'Астана', 'Artem', '2015-08-03 21:42:30.991', false, NULL, '7015515101', NULL, NULL, 'NEW', 'FEEDBACK', 'Fdsfd');
INSERT INTO feedbacks (id, city_name, client_name, created_date, published, order_number, phone_number, reason, restaurant_name, status, type, text) VALUES (16692, 'Астана', 'Artem', '2015-08-03 22:23:36.263', false, NULL, '7015515101', NULL, NULL, 'NEW', 'DELIVERY', 'asdasdas');
INSERT INTO feedbacks (id, city_name, client_name, created_date, published, order_number, phone_number, reason, restaurant_name, status, type, text) VALUES (16693, 'Астана', 'Artem', '2015-08-03 22:26:32.01', false, NULL, '7015515101', NULL, NULL, 'NEW', 'WEB', 'Change design pleas');
INSERT INTO feedbacks (id, city_name, client_name, created_date, published, order_number, phone_number, reason, restaurant_name, status, type, text) VALUES (16694, 'Астана', 'sddsfsdfs', '2015-08-04 23:27:13.823', false, NULL, '1231232313', NULL, NULL, 'NEW', 'FEEDBACK', 'sdfsdfsd');
INSERT INTO feedbacks (id, city_name, client_name, created_date, published, order_number, phone_number, reason, restaurant_name, status, type, text) VALUES (16727, 'Астана', 'Mixa', '2015-09-02 22:50:33.18', false, '', '7015524232', NULL, NULL, 'NEW', 'FEEDBACK', 'sdadasd');
INSERT INTO feedbacks (id, city_name, client_name, created_date, published, order_number, phone_number, reason, restaurant_name, status, type, text) VALUES (17276, 'Астана', 'asdads', '2015-10-08 19:38:59.637', false, NULL, '7014441414', NULL, 'Тархана 9', 'NEW', 'RESTAURANT', 'asdasdas');


--
-- TOC entry 2566 (class 0 OID 0)
-- Dependencies: 179
-- Name: hibernate_sequence; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('hibernate_sequence', 17289, true);


--
-- TOC entry 2512 (class 0 OID 49594)
-- Dependencies: 180
-- Data for Name: ingredients; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO ingredients (id, image_link, name) VALUES (1, '/public/images/ingredients/rice.jpg', 'Рис');
INSERT INTO ingredients (id, image_link, name) VALUES (2, '/public/images/ingredients/cucumber.jpg', 'Огурец');
INSERT INTO ingredients (id, image_link, name) VALUES (3, '/public/images/ingredients/nori.jpg', 'Нори');
INSERT INTO ingredients (id, image_link, name) VALUES (4, '/public/images/ingredients/sesame.jpg', 'Кунжут');
INSERT INTO ingredients (id, image_link, name) VALUES (5, '/public/images/ingredients/cream-cheese.jpg', 'Крем-сыр');
INSERT INTO ingredients (id, image_link, name) VALUES (6, '/public/images/ingredients/ginger.jpg', 'Имбирь маринованный');
INSERT INTO ingredients (id, image_link, name) VALUES (7, '/public/images/ingredients/wasabi.jpg', 'Васаби');
INSERT INTO ingredients (id, image_link, name) VALUES (8, '/public/images/ingredients/avocado.jpg', 'Авокадо');
INSERT INTO ingredients (id, image_link, name) VALUES (9, '/public/images/ingredients/fresh-salmon.jpg', 'Свежий лосось');
INSERT INTO ingredients (id, image_link, name) VALUES (10, '/public/images/ingredients/soy-sauce.jpg', 'Соевый соус');
INSERT INTO ingredients (id, image_link, name) VALUES (11, '/public/images/ingredients/smoked-perch.jpg', 'Копченый окунь');
INSERT INTO ingredients (id, image_link, name) VALUES (12, '/public/images/ingredients/bulgarian-pepper.jpg', 'Перец болгарский');
INSERT INTO ingredients (id, image_link, name) VALUES (13, '/public/images/ingredients/shrimp.jpg', 'Креветка');
INSERT INTO ingredients (id, image_link, name) VALUES (14, '/public/images/ingredients/batter-tempura.jpg', 'Кляр «Темпура»');
INSERT INTO ingredients (id, image_link, name) VALUES (15, '/public/images/ingredients/smoked-salmon.jpg', 'Копченый лосось');
INSERT INTO ingredients (id, image_link, name) VALUES (16, '/public/images/ingredients/black-sesame.jpg', 'Кунжут черный');
INSERT INTO ingredients (id, image_link, name) VALUES (17, '/public/images/ingredients/sauce-chile.jpg', 'Соус «Чили»');
INSERT INTO ingredients (id, image_link, name) VALUES (18, '/public/images/ingredients/tuna-partial.jpg', 'Стружка тунца');
INSERT INTO ingredients (id, image_link, name) VALUES (19, '/public/images/ingredients/tuna.jpg', 'Тунец');
INSERT INTO ingredients (id, image_link, name) VALUES (20, '/public/images/ingredients/smelt-roe.jpg', 'Икра летучей рыбы');
INSERT INTO ingredients (id, image_link, name) VALUES (21, '/public/images/ingredients/sauce-walnut.jpg', 'Соус ореховый');
INSERT INTO ingredients (id, image_link, name) VALUES (22, '/public/images/ingredients/hiashi-wakame.jpg', 'Хияши вакаме');
INSERT INTO ingredients (id, image_link, name) VALUES (23, '/public/images/ingredients/eel.jpg', 'Угорь');
INSERT INTO ingredients (id, image_link, name) VALUES (24, '/public/images/ingredients/sause-thai.jpg', 'Соус «Тайский»');
INSERT INTO ingredients (id, image_link, name) VALUES (25, '/public/images/ingredients/crab-sticks.jpg', 'Крабовые палочки');
INSERT INTO ingredients (id, image_link, name) VALUES (26, '/public/images/ingredients/mayonnaise.jpg', 'Майонез');
INSERT INTO ingredients (id, image_link, name) VALUES (27, '/public/images/ingredients/sauce-unagi.jpg', 'Соус «Унаги»');
INSERT INTO ingredients (id, image_link, name) VALUES (28, '/public/images/ingredients/scallop.jpg', 'Гребешок');
INSERT INTO ingredients (id, image_link, name) VALUES (29, '/public/images/ingredients/green-onion.jpg', 'Лук зеленый');
INSERT INTO ingredients (id, image_link, name) VALUES (31, '/public/images/ingredients/chicken.jpg', 'Курица');
INSERT INTO ingredients (id, image_link, name) VALUES (32, '/public/images/ingredients/green-lettuce-salad.jpg', 'Салат зеленый');
INSERT INTO ingredients (id, image_link, name) VALUES (33, '/public/images/ingredients/red-grouper.jpg', 'Красный окунь');
INSERT INTO ingredients (id, image_link, name) VALUES (34, '/public/images/ingredients/vegetable-oil.jpg', 'Масло растительное');
INSERT INTO ingredients (id, image_link, name) VALUES (35, '/public/images/ingredients/sauce-teriyaki.jpg', 'Соус «Терияки»');
INSERT INTO ingredients (id, image_link, name) VALUES (36, '/public/images/ingredients/zucchini.jpg', 'Цуккини');
INSERT INTO ingredients (id, image_link, name) VALUES (37, '/public/images/ingredients/mushrooms.jpg', 'Шампиньоны');
INSERT INTO ingredients (id, image_link, name) VALUES (38, '/public/images/ingredients/leeks.jpg', 'Лук порей');
INSERT INTO ingredients (id, image_link, name) VALUES (39, '/public/images/ingredients/mustard-seeds.jpg', 'Горчица');
INSERT INTO ingredients (id, image_link, name) VALUES (40, '/public/images/ingredients/salad-lolo-rosso.jpg', 'Салат лолло россо');
INSERT INTO ingredients (id, image_link, name) VALUES (41, '/public/images/ingredients/salad-romen.jpg', 'Салат ромен');
INSERT INTO ingredients (id, image_link, name) VALUES (42, '/public/images/ingredients/french-sauce.jpg', 'Соус французский');
INSERT INTO ingredients (id, image_link, name) VALUES (43, '/public/images/ingredients/beef.jpg', 'Телятина');
INSERT INTO ingredients (id, image_link, name) VALUES (44, '/public/images/ingredients/egg.jpg', 'Яйцо');
INSERT INTO ingredients (id, image_link, name) VALUES (45, '/public/images/ingredients/egg-noodle.jpg', 'Яичная лапша');
INSERT INTO ingredients (id, image_link, name) VALUES (46, '/public/images/ingredients/chineese-cabbage.jpg', 'Пекинская капуста');
INSERT INTO ingredients (id, image_link, name) VALUES (47, '/public/images/ingredients/salad-radiccio.jpg', 'Салат радичио');
INSERT INTO ingredients (id, image_link, name) VALUES (48, '/public/images/ingredients/rice-noodles.jpg', 'Рисовая лапша');
INSERT INTO ingredients (id, image_link, name) VALUES (49, '/public/images/ingredients/carrot.jpg', 'Морковь');
INSERT INTO ingredients (id, image_link, name) VALUES (50, '/public/images/ingredients/mussel.jpg', 'Мидии');
INSERT INTO ingredients (id, image_link, name) VALUES (51, '/public/images/ingredients/kler-ostryj.jpg', 'Клер острый');
INSERT INTO ingredients (id, image_link, name) VALUES (52, '/public/images/ingredients/squid.jpg', 'Кальмар');
INSERT INTO ingredients (id, image_link, name) VALUES (53, '/public/images/ingredients/pork.jpg', 'Свинина');
INSERT INTO ingredients (id, image_link, name) VALUES (54, '/public/images/ingredients/oyster-sauce.jpg', 'Соус устричный');
INSERT INTO ingredients (id, image_link, name) VALUES (55, '/public/images/ingredients/wood-mushrooms.png', 'Грибы древесные');
INSERT INTO ingredients (id, image_link, name) VALUES (56, '/public/images/ingredients/french-bean.jpg', 'Стручковая фасоль');
INSERT INTO ingredients (id, image_link, name) VALUES (57, '/public/images/ingredients/buckwheat-noodles.png', 'Гречневая лапша');
INSERT INTO ingredients (id, image_link, name) VALUES (58, '/public/images/ingredients/radish.jpg', 'Редька дайкон');
INSERT INTO ingredients (id, image_link, name) VALUES (59, '/public/images/ingredients/broccoli.jpg', 'Брокколи');
INSERT INTO ingredients (id, image_link, name) VALUES (60, '/public/images/ingredients/miso.png', 'Мисо');
INSERT INTO ingredients (id, image_link, name) VALUES (61, '/public/images/ingredients/squid.jpg', 'Сыр тофу');
INSERT INTO ingredients (id, image_link, name) VALUES (62, '/public/images/ingredients/shutterstock.jpg', 'Мука');


--
-- TOC entry 2567 (class 0 OID 0)
-- Dependencies: 181
-- Name: order_sequence; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('order_sequence', 1264, true);


--
-- TOC entry 2514 (class 0 OID 49602)
-- Dependencies: 182
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 2540 (class 0 OID 49940)
-- Dependencies: 208
-- Data for Name: orders_history; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 2515 (class 0 OID 49610)
-- Dependencies: 183
-- Data for Name: orders_items; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 2524 (class 0 OID 49782)
-- Dependencies: 192
-- Data for Name: pages; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO pages (id, html_footer, is_active, meta_description, meta_title, page_id, title, meta_content, meta_keywords, category_id) VALUES (1, NULL, true, 'Доставка суши Астана', 'Доставка суши Астана', 'NEWS', 'Новости - Компания «Сушими»', 'Доставка суши Астана', 'Доставка суши Астана', NULL);
INSERT INTO pages (id, html_footer, is_active, meta_description, meta_title, page_id, title, meta_content, meta_keywords, category_id) VALUES (2, NULL, true, 'Доставка суши Астана', 'Доставка суши Астана', 'NEWS_PREVIEW', 'Новость - Компания «Сушими»', 'Доставка суши Астана', 'Доставка суши Астана', NULL);
INSERT INTO pages (id, html_footer, is_active, meta_description, meta_title, page_id, title, meta_content, meta_keywords, category_id) VALUES (3, NULL, true, 'Доставка суши Астана', 'Доставка суши Астана', 'PROMO', 'Акции - Компания «Сушими»', 'Доставка суши Астана', 'Доставка суши Астана', NULL);
INSERT INTO pages (id, html_footer, is_active, meta_description, meta_title, page_id, title, meta_content, meta_keywords, category_id) VALUES (4, NULL, true, 'Доставка суши Астана', 'Доставка суши Астана', 'PROMO_PREVIEW', 'Акция - Компания «Сушими»', 'Доставка суши Астана', 'Доставка суши Астана', NULL);
INSERT INTO pages (id, html_footer, is_active, meta_description, meta_title, page_id, title, meta_content, meta_keywords, category_id) VALUES (5, NULL, true, 'О нас - Компания «Сушими»', 'О нас - Компания «Сушими»', 'ABOUT', 'О нас - Компания «Сушими»', 'О нас - Компания «Сушими»', 'О нас - Компания «Сушими»', NULL);
INSERT INTO pages (id, html_footer, is_active, meta_description, meta_title, page_id, title, meta_content, meta_keywords, category_id) VALUES (6, NULL, true, 'Контакты - Компания «Сушими»', 'Контакты - Компания «Сушими»', 'CONTACTS', 'Контакты - Компания «Сушими»', 'Контакты - Компания «Сушими»', 'Контакты - Компания «Сушими»', NULL);
INSERT INTO pages (id, html_footer, is_active, meta_description, meta_title, page_id, title, meta_content, meta_keywords, category_id) VALUES (10, NULL, true, 'Правила доставки - Компания «Сушими»', 'Правила доставки - Компания «Сушими»', 'DELIVERY_TERMS', 'Правила доставки - Компания «Сушими»', 'Правила доставки - Компания «Сушими»', 'Правила доставки - Компания «Сушими»', NULL);
INSERT INTO pages (id, html_footer, is_active, meta_description, meta_title, page_id, title, meta_content, meta_keywords, category_id) VALUES (8, NULL, true, 'Пожелания и Впечатления - Сушими', 'Пожелания и Впечатления - Сушими', 'FEEDBACK', 'Пожелания и Впечатления - Сушими', 'Пожелания и Впечатления - Сушими', 'Пожелания и Впечатления - Сушими', NULL);
INSERT INTO pages (id, html_footer, is_active, meta_description, meta_title, page_id, title, meta_content, meta_keywords, category_id) VALUES (11, NULL, true, 'Вакансии - Компания «Сушими»', 'Вакансии - Компания «Сушими»', 'VACANCIES', 'Вакансии - Компания «Сушими»', 'Вакансии - Компания «Сушими»', 'Вакансии - Компания «Сушими»', NULL);
INSERT INTO pages (id, html_footer, is_active, meta_description, meta_title, page_id, title, meta_content, meta_keywords, category_id) VALUES (12, NULL, true, 'Sushimi.kz - Заказ', 'Sushimi.kz - Заказ', 'COMPLETED_ORDER', 'Sushimi.kz - Заказ', 'Sushimi.kz - Заказ', 'Sushimi.kz - Заказ', NULL);
INSERT INTO pages (id, html_footer, is_active, meta_description, meta_title, page_id, title, meta_content, meta_keywords, category_id) VALUES (14, NULL, true, 'Меню - Компания «Сушими»', 'Меню - Компания «Сушими»', 'MENU', 'Меню - Компания «Сушими»', 'Меню - Компания «Сушими»', 'Меню - Компания «Сушими»', NULL);
INSERT INTO pages (id, html_footer, is_active, meta_description, meta_title, page_id, title, meta_content, meta_keywords, category_id) VALUES (19, '<p>
	<b>Доставка пиццы в Астане</b> – это отличный способ вкусно и сытно перекусить, а также весело провести время. Сегодня мы живем в настолько активном ритме жизни, что у нас нет времени на полноценный домашний обед, поэтому приходится кушать тогда, когда есть на это время. Но спешить отчаиваться не стоит, ведь еда с доставкой способна решить множество проблем. <b class="spoiler_title">Читать далее...</b>
</p>
<div class="spoiler_block"> 
	<p>
	<b>Доставка пиццы в Астане – порадуйте себя вкусненьким</b><br>
	Если у вас нет времени сходить на обед, а может быть, у вас просто нет желания проводить вечер стоя у плиты, или же к вам неожиданно пришли гости, доставка пиццы в Астане может решить любую проблему. Просто выберите то, что вам по вкусу, а оперативные курьеры привезут вам пиццу в Астане максимально быстро. Таким образом, вы сможете накормить всех своих гостей, и при этом вам не придется тратить время на приготовление. 
	Конечно, это не основная причина, когда можете понадобиться пицца на заказ в Астане. К примеру, вы настолько заняты, что у вас нет времени выйти из офиса, и в этом случае спешить отчаиваться тоже не стоит, ведь пицца на заказ в Астане — это верное решение. 
	Также если вы не хотите, или не можете выйти из дома, а на приготовление еды у вас нет настроения, то побалуйте себя, просто оформите доставку пицц в Астане.
	Перечислять преимущества доставки можно до бесконечности, поэтому стоит лишь сказать, что это выгодно и удобно. Пицца на заказ в Астане — это всегда вкусно, быстро и легко.
	Оформляя доставку пиццы в Астане, не забудьте уточнить время, так как можно делать предварительный заказ, то есть, если вам нужно, чтобы доставку пиццы в Астане сделали на какое-то определенное время, то просто во время заказа уточните этот вопрос.
	</p>
	<p>
	<b>Пицца в Астане – экономия вашего времени</b><br>
	Зачем тратить свое время, если сегодня в мире столько всего интересного. Времена, когда нужно было каждый вечер готовить вкусную еду дома, а если этого не сделать, то люди могут подумать, что вы плохая хозяйка, давно уже прошли. Сегодня пицца в Астане пользуется неимоверной популярностью. Если вы хотите порадовать свою семью чем-то вкусненьким, но при этом не хотите тратить время на простаивание у плиты, то пицца с доставкой в Астане — это то, что вам нужно. 
	К тому же, если вы планируете устроить вечеринку и пригласить друзей, то нет смысла тратить свободное время на накрытие банкета, просто оформите пиццу на заказ в Астане, а оставшееся время потратьте на себя. У данной услуги есть множество неоспоримых преимуществ, среди которых можно выделить следующие:
		<ul>
			<li>пицца в Астане — это экономия времени;</li>
			<li>можно вкусно покушать и весело провести время;</li>
			<li>пицца с доставкой в Астане — отличная возможность сэкономить, так как покупать продукты может быть намного дороже. </li>
		</ul>
	<br>
	Также, если у вас нет желания мыть горы посуды после вечеринки, просто закажите пиццу с доставкой в Астане. Другими словами, пиццы на заказ в Астане — это всегда выгодно.
	</p>
	<p>
	<b>Самые вкусные пиццы в Астане</b><br>
	Это прекрасное, традиционное итальянское блюдо, всегда пользовалось большой популярностью. Пиццы с доставкой в Астане могут быть выбраны на любой вкус. Так, к примеру, если вы любите классику, то просто закажите лепешку с сыром и овощами в Астане, если вам больше по душе морепродукты, то обратите свое внимание на итальянское блюдо на заказ в Астане с морским коктейлем. Также пицца с доставкой в Астане может быть с мясом или птицей. В любом случае, какую лучше доставить итальянскую еду в Астане — решать только вам отталкиваясь от своих индивидуальных вкусовых предпочтений. 
	</p>
	<p>
	<b>Лучшая пиццерия в Астане</b>
	Сегодня свои блюда предлагают многие пиццерии в Астане, единственная их разница — цена и качество продуктов. Наша пиццерия в Астане предлагает вашему вниманию самую вкусную еду, приготовленную исключительно из свежих продуктов. <br>
	Наша пиццерия в Астане строго следит за всем процессом приготовления, наши повара — мастера своего дела, каждое блюдо они готовят с любовью. Если вас заинтересовала итальянская лепешка с сыром с доставкой в Астане, тогда просто посмотрите наше меню, там наверняка вы найдете именно то, что будет соответствовать вашим вкусовым предпочтениям. <br>
	Своим клиентам мы предлагаем:
		<ul>
			<li>лояльные цены;;</li>
			<li>богатое меню;</li>
			<li>индивидуальный подход;</li>
			<li>оперативную доставку.</li>
		</ul>
		<br>
		Зачем идти в ресторан в Астане, когда можно просто сделать заказ и все вкусности будут доставлены прямо к вам домой?
		<br>
		Посетите нашу пиццерию в Астане и убедитесь в том, что у нас действительно самая вкусная еда и наиболее лояльные цены, чем в каком-либо кафе в Астане.
	</p>

</div>
', true, 'Пицца - Компания «Сушими»', 'Пицца - Компания «Сушими»', 'MENU_PIZZA', 'Пицца - Компания «Сушими»', 'Пицца - Компания «Сушими»', 'Пицца - Компания «Сушими»', 25);
INSERT INTO pages (id, html_footer, is_active, meta_description, meta_title, page_id, title, meta_content, meta_keywords, category_id) VALUES (7, NULL, true, 'Доставка суши Астана, доставка суши в Астане, доставка суши Астана, доставка суши на дом Астана, доставка еды Астана, роллы на дом Астана, Астана роллы на дом, Астана суши на дом, Астана суши, суши роллы доставка Астана, бесплатная доставка суши Астана, Казахстан', 'Доставка суши Астана, доставка суши в Астане, доставка суши Астана, доставка суши на дом Астана, доставка еды Астана, роллы на дом Астана, Астана роллы на дом, Астана суши на дом, Астана суши, суши роллы доставка Астана, бесплатная доставка суши Астана, Казахстан', 'DELIVERY', 'Доставка суши Астана, доставка суши в Астане, доставка суши Астана, доставка суши на дом Астана, доставка еды Астана, роллы на дом Астана, Астана роллы на дом, Астана суши на дом, Астана суши, суши роллы доставка Астана, бесплатная доставка суши Астана, Казахстан', 'Доставка суши Астана, доставка суши в Астане, доставка суши Астана, доставка суши на дом Астана, доставка еды Астана, роллы на дом Астана, Астана роллы на дом, Астана суши на дом, Астана суши, суши роллы доставка Астана, бесплатная доставка суши Астана, Казахстан', 'Доставка суши Астана, доставка суши в Астане, доставка суши Астана, доставка суши на дом Астана, доставка еды Астана, роллы на дом Астана, Астана роллы на дом, Астана суши на дом, Астана суши, суши роллы доставка Астана, бесплатная доставка суши Астана, Казахстан', NULL);
INSERT INTO pages (id, html_footer, is_active, meta_description, meta_title, page_id, title, meta_content, meta_keywords, category_id) VALUES (13, NULL, true, 'Астана суши, Астана суши на дом, доставка суши Астана, доставка суши на дом Астана, доставка еды Астана, доставка суши Астана, доставка суши в Астане, Казахстан', 'Астана суши, Астана суши на дом, доставка суши Астана, доставка суши на дом Астана, доставка еды Астана, доставка суши Астана, доставка суши в Астане, Казахстан', 'PRODUCT_DETAILS', 'Астана суши, Астана суши на дом, доставка суши Астана, доставка суши на дом Астана, доставка еды Астана, доставка суши Астана, доставка суши в Астане, Казахстан', 'Астана суши, Астана суши на дом, доставка суши Астана, доставка суши на дом Астана, доставка еды Астана, доставка суши Астана, доставка суши в Астане, Казахстан', 'Астана суши, Астана суши на дом, доставка суши Астана, доставка суши на дом Астана, доставка еды Астана, доставка суши Астана, доставка суши в Астане, Казахстан', NULL);
INSERT INTO pages (id, html_footer, is_active, meta_description, meta_title, page_id, title, meta_content, meta_keywords, category_id) VALUES (15, NULL, true, 'Заказ - Доставка суши и роллов Sushimi.kz', 'Заказ - Доставка суши и роллов Sushimi.kz', 'ORDER', 'Заказ - Доставка суши и роллов Sushimi.kz', 'Заказ - Доставка суши и роллов Sushimi.kz', 'Заказ - Доставка суши и роллов Sushimi.kz', NULL);
INSERT INTO pages (id, html_footer, is_active, meta_description, meta_title, page_id, title, meta_content, meta_keywords, category_id) VALUES (16, NULL, true, 'Суши - Компания «Сушими»', 'Суши - Компания "Сушими"', 'MENU_SUSHI', 'Суши Меню - Компания "Сушими"', 'Суши Меню - Компания "Сушими"', 'Суши Меню - Компания "Сушими"', 1);
INSERT INTO pages (id, html_footer, is_active, meta_description, meta_title, page_id, title, meta_content, meta_keywords, category_id) VALUES (17, NULL, true, 'Роллы - Компания «Сушими»', 'Роллы - Компания «Сушими»', 'MENU_ROLLS', 'Роллы - Компания «Сушими»', 'Роллы - Компания «Сушими»', 'Роллы - Компания «Сушими»', 8);
INSERT INTO pages (id, html_footer, is_active, meta_description, meta_title, page_id, title, meta_content, meta_keywords, category_id) VALUES (18, NULL, true, 'Сеты - Компания «Сушими»', 'Сеты - Компания «Сушими»', 'MENU_SETS', 'Сеты - Компания «Сушими»', 'Сеты - Компания «Сушими»', 'Сеты - Компания «Сушими»', 9);
INSERT INTO pages (id, html_footer, is_active, meta_description, meta_title, page_id, title, meta_content, meta_keywords, category_id) VALUES (20, NULL, true, 'Антисуши - Компания «Сушими»', 'Антисуши - Компания «Сушими»', 'MENU_ANTI', 'Антисуши - Компания «Сушими»', 'Антисуши - Компания «Сушими»', 'Антисуши - Компания «Сушими»', 2);
INSERT INTO pages (id, html_footer, is_active, meta_description, meta_title, page_id, title, meta_content, meta_keywords, category_id) VALUES (21, NULL, true, 'Соусы - Компания «Сушими»', 'Соусы - Компания «Сушими»', 'MENU_SAUCE', 'Соусы - Компания «Сушими»', 'Соусы - Компания «Сушими»', 'Соусы - Компания «Сушими»', 22);
INSERT INTO pages (id, html_footer, is_active, meta_description, meta_title, page_id, title, meta_content, meta_keywords, category_id) VALUES (22, NULL, true, 'Напитки - Компания «Сушими»', 'Напитки - Компания «Сушими»', 'MENU_DRINKS', 'Напитки - Компания «Сушими»', NULL, 'Напитки - Компания «Сушими»', 4);
INSERT INTO pages (id, html_footer, is_active, meta_description, meta_title, page_id, title, meta_content, meta_keywords, category_id) VALUES (9, '<p><b>Доставка суши в Астане</b> — это отличный способ побаловать себя любимой едой даже не выходя из дома. Если у вас нет желания куда-то идти, то просто закажите суши с доставкой в Астане. Ваш заказ будет доставлен в максимально короткие сроки, а вы сможете наслаждаться любимой едой, и при этом вам не придется тратить свое время на поход в кафе, или же на приготовление блюда в домашних условиях. Астана суши на заказ — обедайте тогда, когда вам угодно, и там, где вам удобно. <b class="spoiler_title">Читать далее...</b>
</p>
<div class="spoiler_block"> 
	<p>
		<b>Доставка суши в Астане — экономьте свое время</b><br>
		Сегодня все мы живем в очень активном ритме жизни. Чтобы быть успешным необходимо все и везде успевать. Зачастую нет времени даже выйти на обед, но спешить отчаиваться не стоит, доставка суши в Астане может быть осуществлена туда, куда вам удобно. К примеру, вы можете собраться с коллегами и заказать большой сет, и все вместе насладиться любимым блюдом.  
	</p>
	<p>
		Сегодня суши в астане бывают какие угодно, как говорится, на любой вкус и цвет. К примеру, если вам не нравится сырая рыба, то вы можете обратить свое внимание на суши в астане с крабовой палочкой, креветками, или с другой начинкой из готовых морепродуктов. Тут, как говорится, все дело вкуса, к тому же разнообразие суши в астане способно удивить кого угодно. 
		Чтобы оформить доставку суши в Астане, просто позвоните и продиктуйте выбранные вами блюда, после этого вам останется лишь дождаться оперативную доставку суши в Астане.
		<br>
	</p>
	<p>
		Заказывая любимые блюда через интернет, вы получаете множество неоспоримых преимуществ, в частности, таких как:
		<ul>
			<li>цены, которые на порядок ниже, чем в стационарных кафе;</li>
			<li>богатое меню;</li>
			<li>вам могут привезти роллы в Астане туда, куда удобно именно вам;</li>
			<li>вы можете сделать предварительный заказ, и когда придет время обеда, вам не придется дожидаться пока выбранные вами блюда будут приготовлены.
			</li>
		</ul>
	</p>
	<p>
		Другими словами, японская кухня с доставкой в Астане — это всегда выгодно, удобно и вкусно.
	</p>
	<p>
		<b>Суши на заказ в Астане — устройте себе праздник</b>
		Если у вас намечается какое-то торжество, или же вы решили устроить дома вечеринку с друзьями, то нет необходимости тратить уйму времени и сил на приготовления еды и накрытие праздничного стола. Суши на заказ в Астане способны с легкостью решить такую проблему. Просто сделайте предварительный заказ, укажите время, на которое лучше привезти вам суши в Астане, а тем временем, займитесь своими делами. Таким образом, когда к вам придут гости, ваш стол уже будет накрыт, а вы будете шикарно выгладить и заряжены силами, ведь вам не придется весь день стоять у плиты. Суши на заказ в Астане избавят вас от множества забот и хлопот. Астана суши — порадуйте себя вкусненьким. 
	</p>
	<p>
		<b>Заказать суши в Астане можно быстро и легкостью</b>
		Сегодня заказать суши в Астане предлагают многие кафе, единственная их разница — это качество продуктов и цена. Не стоит лишний раз рисковать, заказывая суши в Астане в непонятном месте. Лучше обращаться в надежное и проверено кафе.
		Японские блюда в Астане, которые предлагаем мы, всегда отличаются высоким качеством, наши повара готовят всегда с любовью, вкладывая частичку своей души в каждое блюдо. Своим клиентам мы даем гарантию того, что готовим только из свежих и качественных продуктов. Заказать суши в Астане у нас, обозначает довериться действительно качественной компании. 
	</p>
	<p>
		Если вас интересует качественная суши доставка в Астане, тогда вы обратились по верному адресу. Своим клиентам мы предлагаем:
	</p>
	<ul>
		<li>в Астане сделать заказ суши по выгодной цене;</li>
		<li>качественный сервис на высшем уровне;</li>
		<li>оперативную доставку;</li>
		<li>индивидуальный подход;</li>
		<li>вкуснейшие блюда.</li>
	</ul>
	<p>
		Наши суши доставка в Астане станут правильным выбором. Вам больше нет необходимости тратить свое время на походы по кафе и ресторанам, просто закажите любимую еду прямо к себе домой. Суши доставка в Астане — это экономия вашего времени. 
	</p>
	<p>
		<b>Какие мы предлагаем роллы на заказ в Астане</b>
		Наше меню очень богатое и разнообразное, поэтому у нас вы сможете выбрать и заказать роллы с доставкой такие, как вам нравятся. 
		Поспешите суши заказать в Астане у нас, и убедитесь, что мы предлагаем самую вкусную еду по выгодным ценам. Оформите суши на доставку в Астане сейчас, и уже в скором времени вы сможете наслаждаться любимой едой.
	</p>
</div>', true, 'Доставка суши Астана, доставка суши в Астане, доставка суши Астана, доставка суши на дом Астана, доставка еды Астана, роллы на дом Астана, Астана роллы на дом, Астана суши на дом, Астана суши, суши роллы доставка Астана, бесплатная доставка суши Астана, Казахстан', 'Доставка суши Астана, доставка суши в Астане, доставка суши Астана, доставка суши на дом Астана, доставка еды Астана, роллы на дом Астана, Астана роллы на дом, Астана суши на дом, Астана суши, суши роллы доставка Астана, бесплатная доставка суши Астана, Казахстан', 'INDEX', 'Доставка суши Астана, доставка суши в Астане, доставка суши Астана, доставка суши на дом Астана, доставка еды Астана, роллы на дом Астана, Астана роллы на дом, Астана суши на дом, Астана суши, суши роллы доставка Астана, бесплатная доставка суши Астана, Казахстан', 'Доставка суши Астана, доставка суши в Астане, доставка суши Астана, доставка суши на дом Астана, доставка еды Астана, роллы на дом Астана, Астана роллы на дом, Астана суши на дом, Астана суши, суши роллы доставка Астана, бесплатная доставка суши Астана, Казахстан', 'Доставка суши Астана, доставка суши в Астане, доставка суши Астана, доставка суши на дом Астана, доставка еды Астана, роллы на дом Астана, Астана роллы на дом, Астана суши на дом, Астана суши, суши роллы доставка Астана, бесплатная доставка суши Астана, Казахстан', NULL);
INSERT INTO pages (id, html_footer, is_active, meta_description, meta_title, page_id, title, meta_content, meta_keywords, category_id) VALUES (23, NULL, true, 'Пожелания и Впечатления - Сушими', 'Пожелания и Впечатления - Сушими', 'FEEDBACK_DETAIL', 'Пожелания и Впечатления - Сушими', 'Пожелания и Впечатления - Сушими', NULL, NULL);


--
-- TOC entry 2516 (class 0 OID 49613)
-- Dependencies: 184
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (55, 100, 'Соевый Соус', false, true, 1, 'Соевый соус', 22, 'sauce-soy/sauce-soy.jpg', 'sauce-soy/sauce-soy-210x167.jpg', false, false, false, 0, 0, 0, false, false, false, 0, 0, 'sauce-soy/sauce-soy-32x32.png', 0, '55', '50 мл.', NULL, 'SOY', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (49, 1400, 'Ролл с тигровыми креветками Темпура, нежным лососем, авокадо, салатом Лоло-Россо и соусом Спайси.', false, true, 8, 'Ролл Эби Темпура', 8, 'roll-ebi-tempura/roll-ebi-tempura.jpg', 'roll-ebi-tempura/roll-ebi-tempura-210x167.jpg', false, false, false, 0, 0, 0, true, false, false, 0, 0, 'roll-ebi-tempura/roll-ebi-tempura-32x32.png', 550, '49', '255  гр.', '379 ккал', 'SUSHI', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (13, 950, 'Вегетарианский ролл с авокадо, огурцом, болгарским перцем - гриль, водорослями чукка, белым и черным кунжутом.', false, true, 8, 'Ролл Вегетарианский', 8, 'roll-vegetarianskiy/roll-vegetarianskiy.jpg', 'roll-vegetarianskiy/roll-vegetarianskiy-210x167.jpg', false, false, false, 0, 0, 0, false, true, false, 0, 0, 'roll-vegetarianskiy/roll-vegetarianskiy-32x32.png', 400, '13', '250  гр.', '287 ккал', 'SUSHI', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (43, 300, 'Coca-Cola бут. 1л.', false, true, 8, 'Coca-Cola', 15, 'drinks-coca-cola/drinks-coca-cola-435x346.jpg', 'drinks-coca-cola/drinks-coca-cola-210x167.jpg', false, false, false, 0, 0, 0, false, false, false, 0, 0, 'drinks-coca-cola/drinks-coca-cola-32x32.png', 0, '43', '1 л.', '440 ккал', 'NONE', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (45, 300, 'Coca-cola Light 0,25 л.', false, false, 8, 'Coca-cola Light 0,25 л.', 15, 'drinks-coca-cola-light/drinks-coca-cola-light.jpg', 'drinks-coca-cola-light/drinks-coca-cola-light-210x167.jpg', false, false, false, 0, 0, 0, false, false, false, 0, 0, 'drinks-coca-cola-light/drinks-coca-cola-light-32x32.png', 0, '45', '0,25 л.', '120 ккал', 'NONE', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (110, 500, NULL, false, true, 1, 'Пиво Tuborg Green', 16, 'drinks-tuborg/drinks-tuborg.jpg', 'drinks-tuborg/drinks-tuborg-210x167.jpg', false, false, false, 0, 0, 0, false, false, false, 0, 0, 'drinks-tuborg/drinks-tuborg-32x32.png', 0, '110', '0,5 л.', NULL, 'NONE', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (17, 1500, 'Классический ролл с нежным лососем и сливочным сыром, салатом, обжаренный в темпуре.', true, false, 8, 'Теплая Филадельфия Романо', 8, 'roll-filadelfiya-romano/roll-filadelfiya-romano.jpg', 'roll-filadelfiya-romano/roll-filadelfiya-romano-210x167.jpg', false, false, false, 0, 0, 0, true, false, false, 0, 0, 'roll-filadelfiya-romano/roll-filadelfiya-romano-32x32.png', 600, '17', '175  гр.', '514 ккал', 'SUSHI', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (18, 1350, 'Теплый ролл с Лососем, огурецом, сыром Филадельфия,Темпура, икра Тобико,соусом Спайси.', false, true, 8, 'Теплый Ролл Сушими', 8, 'tepliy-roll-yaposha/tepliy-roll-yaposha.jpg', 'tepliy-roll-yaposha/tepliy-roll-yaposha-210x167.jpg', true, false, true, 0, 0, 0, false, false, false, 0, 0, 'tepliy-roll-yaposha/tepliy-roll-yaposha-32x32.png', 600, '18', '160  гр.', '306 ккал', 'SUSHI', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (9, 1250, 'Классический ролл с нежным филе лосося, авокадо, икрой Тобико и японским майонезом.', false, true, 8, 'Ролл Калифорния с лососем', 8, 'roll-kaliforniya-s-lososem/roll-kaliforniya-s-lososem.jpg', 'roll-kaliforniya-s-lososem/roll-kaliforniya-s-lososem-210x167.jpg', false, false, false, 0, 0, 0, false, false, false, 0, 0, 'roll-kaliforniya-s-lososem/roll-kaliforniya-s-lososem-32x32.png', 50, '9', '230  гр.', '418 ккал', 'SUSHI', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (48, 1100, 'Ролл с сыром Филадельфия, лососем, огурцами, икрой Тобико,кунжутом.', false, true, 8, 'Ролл Чука', 8, 'roll-chuka-nat/roll-chuka-nat.jpg', 'roll-chuka-nat/roll-chuka-nat-210x167.jpg', false, false, false, 0, 0, 0, false, false, false, 0, 0, 'roll-chuka-nat/roll-chuka-nat-32x32.png', 350, '48', '230  гр.', '587 ккал', 'SUSHI', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (50, 950, 'Теплый ролл с лососем, соусом Спайси, икрой Тобико в хрустящей панировке Темпура.', false, true, 8, 'Теплый Ролл Майами с лососем', 8, 'tepliy-roll-mayami-s-lososem/tepliy-roll-mayami-s-lososem.jpg', 'tepliy-roll-mayami-s-lososem/tepliy-roll-mayami-s-lososem-210x167.jpg', false, false, false, 0, 0, 0, false, false, false, 0, 0, 'tepliy-roll-mayami-s-lososem/tepliy-roll-mayami-s-lososem-32x32.png', 600, '50', '240  гр.', '677 ккал', 'SUSHI', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (10, 1350, 'Классический ролл с креветкой, авокадо, икрой Тобико и японским майонезом.', false, true, 8, 'Ролл Калифорния с креветкой', 8, 'roll-kaliforniya-s-krabom/roll-kaliforniya-s-krabom.jpg', 'roll-kaliforniya-s-krabom/roll-kaliforniya-s-krabom-210x167.jpg', true, false, false, 0, 0, 0, false, false, false, 0, 0, 'roll-kaliforniya-s-krabom/roll-kaliforniya-s-krabom-32x32.png', 51, '10', '220  гр.', '358 ккал', 'SUSHI', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (7, 750, 'Классический Ролл с японским рисом и свежим филе Тунца.  ', false, true, 8, 'Ролл Тунец', 8, 'roll-tunec/roll-tunec.jpg', 'roll-tunec/roll-tunec-210x167.jpg', false, false, false, 0, 0, 0, false, false, false, 0, 0, 'roll-tunec/roll-tunec-32x32.png', 1000, '7', '100  гр.', '158 ккал', 'SUSHI', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (5, 500, 'Классический Ролл с японским рисом, огурцом,  и свежим норвежским Лососем.', false, true, 8, 'Ролл Лосось', 8, 'roll-losos/roll-losos.jpg', 'roll-losos/roll-losos-210x167.jpg', false, false, false, 0, 0, 0, false, false, false, 0, 0, 'roll-losos/roll-losos-32x32.png', 1000, '5', '105  гр.', '183 ккал', 'SUSHI', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (8, 400, 'Легкий, диетический нежный Ролл с японским рисом, с соломкой экзотического плода Авокадо и кунжутом .', false, true, 8, 'Ролл Авокадо', 8, 'roll-avokado/roll-avokado.jpg', 'roll-avokado/roll-avokado-210x167.jpg', false, false, false, 0, 0, 0, false, true, false, 0, 0, 'roll-avokado/roll-avokado-32x32.png', 1000, '8', '110  гр.', '164 ккал', 'SUSHI', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (23, 450, 'Одна из популярных разновидностей суши в виде колодца овальной формы с копченым угрем в остром соусе Спайси.', false, true, 8, 'Гункан Угорь Спайси', 5, 'gunkan-ugor-spaysi/gunkan-ugor-spaysi.jpg', 'gunkan-ugor-spaysi/gunkan-ugor-spaysi-210x167.jpg', false, false, false, 0, 0, 0, true, false, false, 0, 0, 'gunkan-ugor-spaysi/gunkan-ugor-spaysi-32x32.png', 0, '23', '25  гр.', '36 ккал', 'SUSHI', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (22, 400, 'Одна из популярных разновидностей суши в виде колодца овальной формы с икрой летучей рыбы Тобико с цветом на Ваш выбор.', false, true, 8, 'Гункан Тобико', 5, 'gunkan-tobiko/gunkan-tobiko.jpg', 'gunkan-tobiko/gunkan-tobiko-210x167.jpg', false, false, false, 0, 0, 0, false, false, false, 0, 0, 'gunkan-tobiko/gunkan-tobiko-32x32.png', 0, '22', '25  гр.', '36 ккал', 'SUSHI', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (46, 300, 'Пиво Гиннесс', false, false, 8, 'Пиво Гиннесс 0.5 л.', 16, 'drinks-pivo-ginness/drings-pivo-ginness.jpg', 'drinks-pivo-ginness/drinks-pivo-ginness-210x167.jpg', false, false, false, 0, 0, 0, false, false, false, 0, 0, 'drinks-pivo-ginness/drinks-pivo-ginness-32x32.png', 0, '46', '0,5  л.', '440 ккал', 'NONE', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (56, 100, 'Имбирь', false, true, 1, 'Имбирь', 22, 'sauce-imbir/sauce-imbir.jpg', 'sauce-imbir/sauce-imbir-210x167.jpg', false, false, false, 0, 0, 0, false, false, false, 0, 0, 'sauce-imbir/sauce-imbir-32x32.png', 200, '56', '50 гр.', NULL, 'IMBIR', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (42, 300, 'Sprite бут.0,5', false, false, 8, 'Sprite 0,25 л.', 15, 'drinks-sprite/drinks-sprite.jpg', 'drinks-sprite/drinks-sprite-210x167.jpg', false, false, false, 0, 0, 0, false, false, false, 0, 0, 'drinks-sprite/drinks-sprite-32x32.png', 0, '42', '0,25  л.', '120 ккал', 'NONE', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (52, 1500, 'Изысканный ролл с лососем,сыром Филадельфия,авокадо и красной икрой.', false, true, 8, 'Ролл Филадельфия Грин', 8, 'roll-filadelfiya-green/roll-filadelfiya-green.jpg', 'roll-filadelfiya-green/roll-filadelfiya-green-210x167.jpg', false, false, false, 0, 0, 0, false, false, false, 0, 0, 'roll-filadelfiya-green/roll-filadelfiya-green-32x32.png', 300, '52', '180  гр.', '199 ккал', 'SUSHI', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (21, 1350, 'Ролл с копченым угрем, японским омлетом, икрой Тобико, и соусом Спайси.', false, true, 8, 'Ролл Вулкан с угрем', 8, 'tepliy-roll-vulcan-s-ugrem/tepliy-roll-vulcan-s-ugrem.jpg', 'tepliy-roll-vulcan-s-ugrem/tepliy-roll-vulcan-s-ugrem-210x167.jpg', false, false, true, 0, 0, 0, false, false, false, 0, 0, 'tepliy-roll-vulcan-s-ugrem/tepliy-roll-vulcan-s-ugrem-32x32.png', 900, '21', '270  гр.', '499 ккал', 'SUSHI', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (2, 1250, 'Ролл с лососем Гриль  с сыром Филадельфия, с огурцом в стружке Тунца (Японский «Рафаэлло»).', false, true, 8, 'Бонито Ролл с лососем', 8, 'bonito-roll-s-lososem/bonito-roll-s-lososem.jpg', 'bonito-roll-s-lososem/bonito-roll-s-lososem-210x167.jpg', true, false, false, 0, 0, 0, false, false, false, 0, 0, 'bonito-roll-s-lososem/bonito-roll-s-lososem-32x32.png', 250, '2', '210  гр.', '353 ккал', 'SUSHI', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (53, 900, 'Теплый Ролл с сыром Филадельфия, норвежским лососем в хрустящей корочке Темпура.', false, true, 8, 'Ролл Темпура с лососем', 8, 'tepliy-rell-tempura-losos/tepliy-rell-tempura-losos.jpg', 'tepliy-rell-tempura-losos/tepliy-rell-tempura-losos-210x167.jpg', false, false, true, 0, 0, 0, false, false, false, 0, 0, 'tepliy-rell-tempura-losos/tepliy-rell-tempura-losos-32x32.png', 600, '53', '190  гр.', '299 ккал', 'SUSHI', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (4, 600, 'Классический Ролл с японским рисом, огурцом,  и свежим норвежским лососем в остром соусе Спайси.', false, true, 8, 'Ролл Лосось Спайси', 8, 'roll-losos-spaysi/roll-losos-spaysi.jpg', 'roll-losos-spaysi/roll-losos-spaysi-210x167.jpg', false, false, false, 0, 0, 0, true, false, false, 0, 0, 'roll-losos-spaysi/roll-losos-spaysi-32x32.png', 1000, '4', '110  гр.', '216 ккал', 'SUSHI', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (25, 500, 'Одна из популярных разновидностей суши в виде колодца овальной формы с филе тунца в остром соусе Спайси.', false, true, 8, 'Гункан Тунец Спайси', 5, 'gunkan-tunec-spaysi/gunkan-tunec-spaysi.jpg', 'gunkan-tunec-spaysi/gunkan-tunec-spaysi-210x167.jpg', false, false, false, 0, 0, 0, true, false, false, 0, 0, 'gunkan-tunec-spaysi/gunkan-tunec-spaysi-32x32.png', 0, '25', '34  гр.', '55 ккал', 'SUSHI', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (24, 550, 'Одна из популярных разновидностей суши в виде колодца овальной формы с креветкой в остром соусе Спайси.', false, true, 8, 'Гункан Креветка Спайси', 5, 'gunkan-krevetka-spaysi/gunkan-krevetka-spaysi.jpg', 'gunkan-krevetka-spaysi/gunkan-krevetka-spaysi-210x167.jpg', false, false, false, 0, 0, 0, true, false, false, 0, 0, 'gunkan-krevetka-spaysi/gunkan-krevetka-spaysi-32x32.png', 0, '24', '31  гр.', '47 ккал', 'SUSHI', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (26, 500, 'Одна из популярных разновидностей суши в виде колодца овальной формы с норвежским лососем в остром соусе Спайси.', false, true, 8, 'Гункан Лосось Спайси', 5, 'gunkan-losos-spaysi/gunkan-losos-spaysi.jpg', 'gunkan-losos-spaysi/gunkan-losos-spaysi-210x167.jpg', false, false, false, 0, 0, 0, true, false, false, 0, 0, 'gunkan-losos-spaysi/gunkan-losos-spaysi-32x32.png', 0, '26', '34  гр.', '66 ккал', 'SUSHI', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (37, 6573, 'Ролл Эби Темпура, Ролл Окинава, Ролл Тунец, Ролл Копченый Лосось Спайси, Ролл Огурец, Ролл Сакура', false, false, 8, 'Топ Сет', 9, 'set-top/set-top.jpg', 'set-top/set-top-210x167.jpg', false, false, false, 0, 0, 0, false, false, false, 0, 0, 'set-top/set-top-32x32.png', 0, '37', '1033  гр.', '1577 ккал', 'SUSHI', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (38, 9350, 'Ролл Дракон, Лонг ролл Унаги, ролл Калифорния с лососем, ролл Эбико, ролл Филадельфия, Гунканы: Гребешок спайси, Тунец спайси, Филадельфия с лососем.', false, false, 8, 'Золотая Сушими', 9, 'set-sushimi-gold/set-sushimi-gold.jpg', 'set-sushimi-gold/set-sushimi-gold-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'set-sushimi-gold/set-sushimi-gold-32x32.png', 0, '38', '1338  гр.', '2772 ккал', 'SUSHI', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (44, 300, 'Coca-cola 0,5 л.', false, true, 8, 'Coca-cola 0,25 л.', 15, 'drinks-coca-cola/drinks-coca-cola-435x346.jpg', 'drinks-coca-cola/drinks-coca-cola-210x167.jpg', false, false, false, 0, 0, 0, false, false, false, 0, 0, 'drinks-coca-cola/drinks-coca-cola-32x32.png', 0, '44', '0,25 л.', '120 ккал', 'NONE', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (41, 300, 'Sprite бут. 1л.', false, false, 8, 'Sprite', 15, 'drinks-sprite/drinks-sprite.jpg', 'drinks-sprite/drinks-sprite-210x167.jpg', false, false, false, 0, 0, 0, false, false, false, 0, 0, 'drinks-sprite/drinks-sprite-32x32.png', 0, '41', '1 л.', '440 ккал', 'NONE', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (47, 300, 'Хайнекен светлое 0,33', false, false, 8, 'Пиво Хайнекен светлое', 16, 'drinks-pivo-hayneken-svetloe/drinks-pivo-hayneken-svetloe.jps', 'drinks-pivo-hayneken-svetloe/drinks-pivo-hayneken-svetloe-210x167.jpg', false, false, false, 0, 0, 0, false, false, false, 0, 0, 'drinks-pivo-hayneken-svetloe/drinks-pivo-hayneken-svetloe-32x32.png', 0, '47', '0,5  л.', '440 ккал', 'NONE', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (130, 1100, 'Традиционное блюдо японской кухни с тигровыми креветками.', false, true, 0, 'Сашими с креветкой', 29, 'sashimi-krevetka/sashimi-krevetka.jpg', 'sashimi-krevetka/sashimi-krevetka-210x167.jpg', false, false, false, 0, 0, 0, false, false, false, 0, 0, 'sashimi-krevetka/sashimi-krevetka-32x32.png', 0, '130', NULL, NULL, 'SUSHI', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (28, 250, 'Классический вид суши с ломтиком свежего норвежского лосося на нежной подушечке с риса.', false, true, 8, 'Нигири лосось', 6, 'nigiri-losos/nigiri-losos.jpg', 'nigiri-losos/nigiri-losos-210x167.jpg', false, false, false, 0, 0, 0, false, false, false, 0, 0, 'nigiri-losos/nigiri-losos-32x32.png', 0, '28', '31  гр.', '55 ккал', 'SUSHI', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (31, 450, 'Классический вид суши с ломтиком свежего копченного угря на нежной подушечке японского риса.', false, true, 8, 'Нигири угорь', 6, 'nigiri-ugor/nigiri-ugor.jpg', 'nigiri-ugor/nigiri-ugor-210x167.jpg', false, false, false, 0, 0, 0, false, false, false, 0, 0, 'nigiri-ugor/nigiri-ugor-32x32.png', 0, '31', '30  гр.', '66 ккал', 'SUSHI', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (20, 1450, 'Ролл с лососем, японским омлетом, огурцом,тигровой  креветкой, сливочным сыром Филадельфия,икрой Тобико, соусом Спайси.', false, true, 8, 'Ролл Вулкан с лососем', 8, 'tepliy-roll-vulkan-s-lososem/tepliy-roll-vulkan-s-lososem.jpg', 'tepliy-roll-vulkan-s-lososem/tepliy-roll-vulkan-s-lososem-210x167.jpg', false, false, false, 0, 0, 0, false, false, false, 0, 0, 'tepliy-roll-vulkan-s-lososem/tepliy-roll-vulkan-s-lososem-32x32.png', 900, '20', '270  гр.', '476 ккал', 'SUSHI', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (15, 1350, 'Нежный Ролл с тигровыми креветками, сыром Филадельфия, огурцом, соусом Спайси, икрой Тобико.', false, true, 8, 'Ролл Эбико', 8, 'roll-ebiko/roll-ebiko.jpg', 'roll-ebiko/roll-ebiko-210x167.jpg', false, false, false, 0, 0, 0, true, false, false, 0, 0, 'roll-ebiko/roll-ebiko-32x32.png', 450, '15', '212  гр.', '359 ккал', 'SUSHI', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (51, 1050, 'Хот - ролл с тигровыми креветками, соусом Спайси, икрой Тобико  в хрустящей панировке Темпура.', false, true, 8, 'Теплый Ролл Майами с креветками', 8, 'tepliy-roll-mayami-s-krevetkami/tepliy-roll-mayami-s-krevetkami.jpg', 'tepliy-roll-mayami-s-krevetkami/tepliy-roll-mayami-s-krevetkami-210x167.jpg', false, false, false, 0, 0, 0, true, false, false, 0, 0, 'tepliy-roll-mayami-s-krevetkami/tepliy-roll-mayami-s-krevetkami-32x32.png', 600, '51', '215  гр.', '376 ккал', 'SUSHI', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (6, 700, 'Классический Ролл с японским рисом, огурцом, кунжутом и копченым угрем в японском соусе Унаги.', false, true, 8, 'Ролл Угорь', 8, 'roll-ugor/roll-ugor.jpg', 'roll-ugor/roll-ugor-210x167.jpg', true, false, false, 0, 0, 0, false, false, false, 0, 0, 'roll-ugor/roll-ugor-32x32.png', 1000, '6', '105  гр.', '236 ккал', 'SUSHI', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (3, 350, 'Легкий, диетический нежный Ролл с японским рисом, с соломкой свежего огурчика и кунжутом .', false, true, 8, 'Ролл Огурец', 8, 'roll-ogurec/roll-ogurec-big.jpg', 'roll-ogurec/roll-ogurec-210x167.jpg', false, false, false, 0, 0, 0, false, true, false, 0, 0, 'roll-ogurec/roll-ogurec-32x32.png', 1000, '3', '110  гр.', '140 ккал', 'SUSHI', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (33, 9873, 'Ролл Калифорния с Лососем, Ролл Филадельфия, Ролл Сливочный Лосось, Ролл Сливочный Угорь, Ролл Лосось, Ролл Тунец, Ролл Огурец, Нигири: Сливочный Лосось 2 шт., Сливочный Угорь 2 шт., Гункан Чукка 2 шт.', false, false, 8, 'Сет Mega', 9, 'set-mega/set-mega.jpg', 'set-mega/set-mega-210x167.jpg', true, false, false, 0, 0, 0, false, false, false, 0, 0, 'set-mega/set-mega-32x32.png', 0, '33', '1357  гр.', '2318 ккал', 'SUSHI', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (35, 4483, 'Ролл Филадельфия, Ролл Авокадо, Ролл Тунец, Ролл Сливочный Угорь.', false, false, 8, 'Классик Сет', 9, 'set-klassik/set-klassik.jpg', 'set-klassik/set-klassik-210x167.jpg', true, false, false, 0, 0, 0, false, false, false, 0, 0, 'set-klassik/set-klassik-32x32.png', 0, '35', '645  гр.', '1137 ккал', 'SUSHI', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (39, 7150, 'Теплый ролл Майами с креветкой, Теплая филадельфия романо, ролл Кемури, Теплый ролл Япоша, Лонг ролл Киото', false, false, 8, 'Серебряная Сушими', 9, 'set-sushimi-silver/set-sushimi-silver.jpg', 'set-sushimi-silver/set-sushimi-silver-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'set-sushimi-silver/set-sushimi-silver-32x32.png', 0, '39', '1185  гр.', '2805 ккал', 'SUSHI', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (40, 2475, 'Ролл Огурец 2 шт, Ролл Авокадо, Ролл Вегетарианский, Гункан Чукка 2 шт.', false, false, 8, 'Вегетарианский Сет', 9, 'set-vegetarianskiy/set-vegetarianskiy.jpg', 'set-vegetarianskiy/set-vegetarianskiy-210x167.jpg', false, false, false, 0, 0, 0, false, true, false, 0, 0, 'set-vegetarianskiy/set-vegetarianskiy-32x32.png', 0, '40', '644  гр.', '747 ккал', 'SUSHI', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (59, 200, NULL, false, true, 1, 'Соус Терияки', 22, 'sauce-soy/sauce-soy.jpg', 'sauce-soy/sauce-soy-210x167.jpg', false, false, false, 0, 0, 0, false, false, false, 0, 0, 'sauce-soy/sauce-soy-32x32.png', 0, '59', '40 мл.', NULL, 'NONE', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (58, 200, NULL, false, true, 1, 'Соус Ореховый', 22, 'sauce-nut/sauce-nut.jpg', 'sauce-nut/sauce-nut-210x167.jpg', false, false, false, 0, 0, 0, false, false, false, 0, 0, 'sauce-nut/sauce-nut-32x32.png', 0, '58', '40 мл.', NULL, 'NONE', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (113, 700, NULL, false, true, 1, 'Red Bull', 15, 'drinks-red-bull/drinks-red-bull.jpg', 'drinks-red-bull/drinks-red-bull-210x167.jpg', false, false, false, 0, 0, 0, false, false, false, 0, 0, 'drinks-red-bull/drinks-red-bull-32x32.png', 0, '113', '0,25 л.', NULL, 'NONE', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (115, 200, NULL, false, true, 1, 'Вода Tassay 1 л.', 15, 'drinks-tassay/drinks-tassay.jpg', 'drinks-tassay/drinks-tassay-210x167.jpg', false, false, false, 0, 0, 0, false, false, false, 0, 0, 'drinks-tassay/drinks-tassay-32x32.png', 0, '115', '1 л.', NULL, 'NONE', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (57, 200, NULL, false, true, 1, 'Соус Унаги', 22, 'sauce-soy/sauce-soy.jpg', 'sauce-soy/sauce-soy-210x167.jpg', false, false, false, 0, 0, 0, false, false, false, 0, 0, 'sauce-soy/sauce-soy-32x32.png', 0, '57', '40 мл.', NULL, 'NONE', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (114, 150, NULL, false, true, 1, 'Вода Tassay 0,5 л.', 15, 'drinks-tassay/drinks-tassay.jpg', 'drinks-tassay/drinks-tassay-mini-210x167.jpg', false, false, false, 0, 0, 0, false, false, false, 0, 0, 'drinks-tassay/drinks-tassay-32x32.png', 0, '114', '0,5 л.', NULL, 'NONE', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (111, 500, NULL, false, true, 1, 'Пиво Zatecky Gus', 16, 'drinks-zhateckiy-gus/drinks-zhateckiy-gus.jpg', 'drinks-zhateckiy-gus/drinks-zhateckiy-gus-210x167.jpg', false, false, false, 0, 0, 0, false, false, false, 0, 0, 'drinks-zhateckiy-gus/drinks-zhateckiy-gus-32x32.png', 0, '111', '0,5 л.', NULL, 'NONE', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (112, 500, NULL, false, true, 1, 'Пиво Carlsberg', 16, 'drinks-carlsberg/drinks-carlsberg.jpg', 'drinks-carlsberg/drinks-carlsberg-210x167.jpg', false, false, false, 0, 0, 0, false, false, false, 0, 0, 'drinks-carlsberg/drinks-carlsberg-32x32.png', 0, '112', '0,5 л.', NULL, 'NONE', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (60, 200, NULL, false, true, 1, 'Соус Спайси', 22, 'sauce-tobico-spacy/sauce-tobico-spacy.jpg', 'sauce-tobico-spacy/sauce-tobico-spacy-210x167.jpg', false, false, false, 0, 0, 0, false, false, false, 0, 0, 'sauce-tobico-spacy/sauce-tobico-spacy-32x32.png', 0, '60', '40 мл.', NULL, 'NONE', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (14, 1250, 'Ролл с лососем, авокадо, японским майонезом, сливочным сыром, японским омлетом, красной икрой и укропом.', true, false, 8, 'Ролл Панке', 8, 'roll-panke/roll-panke.jpg', 'roll-panke/roll-panke-210x167.jpg', false, false, false, 0, 0, 0, false, false, false, 0, 0, 'roll-panke/roll-panke-32x32.png', 500, '14', '255  гр.', '640 ккал', 'SUSHI', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (125, 1400, 'Нежный Ролл с лососем гриль  сыром Филадельфия, огурцом и японским соусом Терияки.', false, true, 8, 'Ролл Филадельфия гриль', 8, 'roll-filadelfiya-grill/roll-filadelfiya-grill.jpg', 'roll-filadelfiya-grill/roll-filadelfiya-grill-210x167.jpg', false, false, false, 0, 0, 0, false, false, false, 0, 0, 'roll-filadelfiya-grill/roll-filadelfiya-grill-32x32.png', 20, '125', NULL, NULL, 'SUSHI', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (126, 1500, 'Авторский Ролл с копченым угрем, лососем,тигровой креветкой, сыром Филадельфия, водорослями Чука, икрой Тобико mix, красной икрой,и овощной Сальсой', false, true, 8, 'Калифорния Мix делюкс', 8, 'roll-california-mix-deluxe/roll-california-mix-deluxe.jpg', 'roll-california-mix-deluxe/roll-california-mix-deluxe-210x167.jpg', false, false, false, 0, 0, 0, false, false, false, 0, 0, 'roll-california-mix-deluxe/roll-california-mix-deluxe-32x32.png', 55, '126', NULL, NULL, 'SUSHI', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (127, 1400, 'Нежный Ролл с копченым угрем, лососем, огурцом, икрой Тобико mix,и соусом Спайси.', false, true, 8, 'Калифорния Мix', 8, 'roll-california-mix/roll-california-mix.jpg', 'roll-california-mix/roll-california-mix-210x167.jpg', false, false, false, 0, 0, 0, false, false, false, 0, 0, 'roll-california-mix/roll-california-mix-32x32.png', 56, '127', NULL, NULL, 'SUSHI', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (128, 1000, 'Салат с водорослями чука и кунжутом', false, true, 8, 'Салат Чука', 28, 'salad-chuka/salad-chuka.jpg', 'salad-chuka/salad-chuka-210x167.jpg', false, false, false, 0, 0, 0, false, false, false, 0, 0, 'salad-chuka/salad-chuka-32x32.png', 0, '128', NULL, NULL, 'SUSHI', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (119, 1400, 'Эксклюзивный Ролл  с копченым угрем  и икрой Тобико mix ,в мозайке.', false, true, 8, 'Ролл Мозайка с Угрем', 8, 'roll-mozaika-s-ugrem/roll-mozaika-s-ugrem.jpg', 'roll-mozaika-s-ugrem/roll-mozaika-s-ugrem-210x167.jpg', false, false, false, 0, 0, 0, false, false, false, 0, 0, 'roll-mozaika-s-ugrem/roll-mozaika-s-ugrem-32x32.png', 320, '119', NULL, NULL, 'SUSHI', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (121, 1200, 'Эксклюзивный Ролл  с икрой Тобико mix , и сыром Филадельфия в мозайке.', false, true, 8, 'Ролл Мозайка Филадельфия', 8, 'roll-mozaika-fila/roll-mozaika-fila.jpg', 'roll-mozaika-fila/roll-mozaika-fila-210x167.jpg', false, false, false, 0, 0, 0, false, false, false, 0, 0, 'roll-mozaika-fila/roll-mozaika-fila-32x32.png', 322, '121', NULL, NULL, 'SUSHI', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (120, 1250, 'Эксклюзивный Ролл с икрой Тобико  mix,и лососем в мозайке.', false, true, 8, 'Ролл Мозайка с Лососем', 8, 'roll-mozaika-s-lososem/roll-mozaika-s-lososem.jpg', 'roll-mozaika-s-lososem/roll-mozaika-s-lososem-210x167.jpg', false, false, false, 0, 0, 0, false, false, false, 0, 0, 'roll-mozaika-s-lososem/roll-mozaika-s-lososem-32x32.png', 321, '120', NULL, NULL, 'SUSHI', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (122, 1000, 'Двойной Ролл с копченым угрем, лососем, икрой Тобико,в хрустящей панировке Панко.', false, true, 8, 'Ролл Инь Янь', 8, 'roll-yin-yang/roll-yin-yang.jpg', 'roll-yin-yang/roll-yin-yang-210x167.jpg', false, false, false, 0, 0, 0, false, false, false, 0, 0, 'roll-yin-yang/roll-yin-yang-32x32.png', 140, '122', NULL, NULL, 'SUSHI', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (123, 1150, 'Острый Ролл с тигровой креветкой Темпура, огурцом, кунжутом и соусом Тобаско.', false, true, 8, 'Ролл Хиросима', 8, 'roll-hirosima/roll-hirosima.jpg', 'roll-hirosima/roll-hirosima-210x167.jpg', false, false, false, 0, 0, 0, false, false, false, 0, 0, 'roll-hirosima/roll-hirosima-32x32.png', 230, '123', NULL, NULL, 'SUSHI', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (124, 1650, 'Ролл с тунцом, с сыром Филадельфия, огурцом и икрой Тобико.', false, true, 8, 'Ролл Филадельфия Туна ', 8, 'roll-filadelfiya-tuna/roll-filadelfiya-tuna.jpg', 'roll-filadelfiya-tuna/roll-filadelfiya-tuna-210x167.jpg', false, false, false, 0, 0, 0, false, false, false, 0, 0, 'roll-filadelfiya-tuna/roll-filadelfiya-tuna-32x32.png', 10, '124', NULL, NULL, 'SUSHI', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (118, 2200, 'Авторский Ролл с тигровой креветкой, икрой Тобико, осьминогом baby, сыром Филадельфия и соусом Спайси. 6 штук.', false, true, 6, 'Ролл Осьминог Бэби', 8, 'roll-octopus-baby/roll-octopus-baby.jpg', 'roll-octopus-baby/roll-octopus-baby-210x167.jpg', false, false, false, 0, 0, 0, false, false, false, 0, 0, 'roll-octopus-baby/roll-octopus-baby-32x32.png', 200, '118', NULL, NULL, 'SUSHI', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (19, 1400, 'Теплый ролл с тигровыми креветками, копченым угрем, японским омлетом, авокадо, соусом Спайси и икрой Тобико в хрустящей Темпуре.', false, true, 8, 'Теплый Ролл Эби Хотто', 8, 'tepliy-roll-ebi-hotto/tepliy-roll-ebi-hotto.jpg', 'tepliy-roll-ebi-hotto/tepliy-roll-ebi-hotto-210x167.jpg', false, false, true, 0, 0, 0, true, false, false, 0, 0, 'tepliy-roll-ebi-hotto/tepliy-roll-ebi-hotto-32x32.png', 600, '19', '230  гр.', '346 ккал', 'SUSHI', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (16, 2200, 'Ролл с сочным угрем в соусе Унаги,с кунжутом, сыром Филадельфия, японским омлетом, авокадо,икрой Тобико с соусом спайси.', false, true, 8, 'Ролл Дракон', 8, 'roll-drakon/roll-drakon.jpg', 'roll-drakon/roll-drakon-210x167.jpg', false, false, false, 0, 0, 0, true, false, false, 0, 0, 'roll-drakon/roll-drakon-32x32.png', 100, '16', '270  гр.', '571 ккал', 'SUSHI', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (12, 2000, 'Нежный ролл с копченым угрем, авокадо,с японским соусом Унаги, с сыром Филадельфия, икрой Тобико, кунжутом.', false, true, 8, 'Ролл Сливочный Угорь', 8, 'roll-slivochniy-ugor/roll-slivochniy-ugor.jpg', 'roll-slivochniy-ugor/roll-slivochniy-ugor-210x167.jpg', false, false, true, 0, 0, 0, false, false, false, 0, 0, 'roll-slivochniy-ugor/roll-slivochniy-ugor-32x32.png', 300, '12', '225  гр.', '461 ккал', 'SUSHI', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (11, 1100, 'Нежный ролл с Лососем,копченным Угрем сыром Филадельфия, икрой Тобико, и огурцом', false, true, 8, 'Ролл Сливочный Лосось', 8, 'roll-slivochniy-losos/roll-slivochniy-losos.jpg', 'roll-slivochniy-losos/roll-slivochniy-losos-210x167.jpg', true, false, false, 0, 0, 0, false, false, false, 0, 0, 'roll-slivochniy-losos/roll-slivochniy-losos-32x32.png', 300, '11', '215  гр.', '373 ккал', 'SUSHI', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (27, 550, 'Одна из популярных разновидностей суши в виде колодца овальной формы с сыром Филадельфия и копченым угрем.', false, true, 8, 'Гункан Филадельфия с угрем', 5, 'gunkan-filadelfiya-s-ugrem/gunkan-filadelfiya-s-ugrem.jpg', 'gunkan-filadelfiya-s-ugrem/gunkan-filadelfiya-s-ugrem-210x167.jpg', true, false, false, 0, 0, 0, false, false, false, 0, 0, 'gunkan-filadelfiya-s-ugrem/gunkan-filadelfiya-s-ugrem-32x32.png', 0, '27', '45  гр.', '84 ккал', 'SUSHI', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (61, 350, 'Одна из популярных разновидностей суши в виде колодца,овальной формы с морскими водорослями Чукка', false, true, 1, 'Гункан Чукка', 5, 'gunkan-chukka/gunkan-chukka.jpg', 'gunkan-chukka/gunkan-chukka-210x167.jpg', false, false, false, 0, 0, 0, false, true, false, 0, 0, 'gunkan-chukka/gunkan-chukka-32x32.png', 0, '61', '32 гр.', '36 ккал', 'NONE', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (132, 1200, 'Традиционное блюдо японской кухни в виде нарезки филе тунца.', false, true, 0, 'Сашими с тунцом', 29, 'sashimi-tuna/sashimi-tuna.jpg', 'sashimi-tuna/sashimi-tuna-210x167.jpg', false, false, false, 0, 0, 0, false, false, false, 0, 0, 'sashimi-tuna/sashimi-tuna-32x32.png', 0, '132', NULL, NULL, 'SUSHI', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (134, 1500, 'Изысканный ролл с японским рисом, икрой Тобико, семечками кунжута,японские водоросли Вакаме  запеченным сыром Мацарелла и начинкой на Ваше усмотрение (Лосось, Креветка, Угорь).', false, true, 0, 'Ролл Пирамида', 8, 'roll-piramida/roll-piramida.jpg', 'roll-piramida/roll-piramida-210x167.jpg', false, false, false, 0, 0, 0, false, false, false, 0, 0, 'roll-piramida/roll-piramida-32x32.png', 0, '134', NULL, NULL, 'SUSHI', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (131, 950, 'Традиционное блюдо японской кухни в виде нарезки филе норвежского лосося.', false, true, 0, 'Сашими с лосось', 29, 'sashimi-losos/sashimi-losos.jpg', 'sashimi-losos/sashimi-losos-210x167.jpg', false, false, false, 0, 0, 0, false, false, false, 0, 0, 'sashimi-losos/sashimi-losos-32x32.png', 0, '131', NULL, NULL, 'SUSHI', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (116, 1500, 'Ролл с тунцом, копченым угрем, икрой Тобико, огурцом и соусом Спайси.', false, true, 8, 'Тунец Блю Фин Гриль (Магура Татаки)', 8, 'roll-tunec-blue-fin-grill/roll-tunec-blue-fin-grill.jpg', 'roll-tunec-blue-fin-grill/roll-tunec-blue-fin-grill-210x167.jpg', false, false, false, 0, 0, 0, false, false, false, 0, 0, 'roll-tunec-blue-fin-grill/roll-tunec-blue-fin-grill-32x32.png', 0, '116', NULL, NULL, 'SUSHI', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (117, 1450, 'Ролл с тигровой креветкой,  сыром Филадельфия, Лососем Гриль,огурцом, салатом и красной икрой.', false, true, 8, 'Ролл Сливочный Лосось гриль', 8, 'roll-slivochniy-losos-grill/roll-slivochniy-losos-grill.jpg', 'roll-slivochniy-losos-grill/roll-slivochniy-losos-grill-210x167.jpg', false, false, false, 0, 0, 0, false, false, false, 0, 0, 'roll-slivochniy-losos-grill/roll-slivochniy-losos-grill-32x32.png', 301, '117', NULL, NULL, 'SUSHI', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (129, 1050, 'Традиционное блюдо японской кухни в виде нарезки  филе  лосося холодного копчения.', false, true, 0, 'Сашими с копченым лососем', 29, 'sashimi-smoked-losos/sashimi-smoked-losos.jpg', 'sashimi-smoked-losos/sashimi-smoked-losos-210x167.jpg', false, false, false, 0, 0, 0, false, false, false, 0, 0, 'sashimi-smoked-losos/sashimi-smoked-losos-32x32.png', 0, '129', NULL, NULL, 'SUSHI', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (1, 1300, 'Рис Японский,норвежский лосось филе, сыр Филадельфия, водоросли Нори', false, true, 8, 'Ролл Филадельфия', 8, 'roll-filadelfiya/roll-filadelfiya.jpg', 'roll-filadelfiya/roll-filadelfiya-210x167.jpg', true, false, true, 0, 0, 0, false, false, false, 0, 0, 'roll-filadelfiya/roll-filadelfiya-32x32.png', 0, '1', '210  гр.', '410 ккал', 'SUSHI', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (137, 3000, 'Ролл Филадельфия 4 шт.

Ролл сливочный Угорь 4 шт.

Ролл Калифорния с креветкой 4 шт.

Ролл огурец 4 шт.

Ролл лосось 4 шт.

', false, true, 0, 'Сет для двоих(20шт.)', 9, 'set-for-two/set-for-two.jpg', 'set-for-two/set-for-two-210x167.jpg', false, false, false, 0, 0, 0, false, false, false, 0, 0, 'set-for-two/set-for-two-32x32.png', 0, '137', NULL, NULL, 'SUSHI', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (136, 6000, 'Ролл Филадельфия

Ролл Чука

Ролл Калифорния с лососем

Нигиги Лосось 2шт.

Нигири угорь 2шт.

Нигири креветка 2шт.

Нигири копченый лосось 2шт.

', false, true, 0, 'Сет Дары моря(32шт.)', 9, 'set-sea-gifts/set-sea-gifts.jpg', 'set-sea-gifts/set-sea-gifts-210x167.jpg', false, false, false, 0, 0, 0, false, false, false, 0, 0, 'set-sea-gifts/set-sea-gifts-32x32.png', 0, '136', NULL, NULL, 'SUSHI', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (34, 17325, 'Роллы: Окинава, Калифорния с Лососем, Филадельфия, Сливочный Угорь, Огурец, Сливочный Лосось, Лосось, Копченый Лосось Спайси, Авокадо, Цезарь, Тунец, Эбико, Банзай, Чука Нат, Токио. Нигири Сливочный Лосось 2 шт., Нигири Сливочный Угорь 2 шт., Гункан Филадельфия с Лососем 2 шт., Нигири Сливочная Крев', false, false, 8, 'Сет «Все включено»', 9, 'set-vse-vklucheno/set-vse-vklucheno.jpg', 'set-vse-vklucheno/set-vse-vklucheno-210x167.jpg', true, false, false, 0, 0, 0, false, false, false, 0, 0, 'set-vse-vklucheno/set-vse-vklucheno-32x32.png', 0, '34', '3060  гр.', '5322 ккал', 'SUSHI', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (36, 4043, 'Ролл Калифорния с Лососем, Ролл Огурец, Ролл Угорь, Филадельфия Романо.', false, false, 8, 'Американ Сет', 9, 'set-amerikan/set-amerikan.jpg', 'set-amerikan/set-amerikan-210x167.jpg', false, false, false, 0, 0, 0, false, false, false, 0, 0, 'set-amerikan/set-amerikan-32x32.png', 0, '36', '600  гр.', '1252 ккал', 'SUSHI', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (140, 9500, 'Калифорния Mix 16 шт.

Филадельфия Green

Филадельфия

Сливочный угорь

Теплый Ролл Сушими

Теплый Ролл Эби Хотто

', false, true, 0, 'Сет Теплый прием(56шт.)', 9, 'set-warm/set-warm.jpg', 'set-warm/set-warm-210x167.jpg', false, false, false, 0, 0, 0, false, false, false, 0, 0, 'set-warm/set-warm-32x32.jpg', 0, '140', NULL, NULL, 'SUSHI', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (142, 6800, 'Ролл Филадельфия

Ролл Калифорния Mix

Ролл бонито с лососем

Ролл Сливочный Угорь 4шт.

Ролл филадельфия Green 4 шт.

Ролл Лосось

Ролл Лосось Спайси

', false, true, 0, 'Сет Хороший(48шт.)', 9, 'set-good/set-good.jpg', 'set-good/set-good-210x167.jpg', false, false, false, 0, 0, 0, false, false, false, 0, 0, 'set-good/set-good-32x32.png', 0, '142', NULL, NULL, 'SUSHI', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (144, 1500, 'Теплый ролл с копченным угрем, огуречной соломкой и японском соусе терияки', false, true, 0, 'Ролл темпура с угрем', 8, 'tepliy-roll-tempura-ugor/tepliy-roll-tempura-ugor.jpg', 'tepliy-roll-tempura-ugor/tepliy-roll-tempura-ugor-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'tepliy-roll-tempura-ugor/tepliy-roll-tempura-ugor-32x32.png', 645, '144', NULL, NULL, 'SUSHI', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (139, 3500, 'Ролл Огурец 8 шт.

Ролл Угорь 8 шт.

Ролл Лосось 8 шт.

Ролл Авокадо 8 шт.

Гункан Чука

Нигири Угорь

Гункан Лосось спайси

Нигири Креветка

', false, true, 0, 'Сет Фитнес(36шт.)', 9, 'set-fitnes/set-fitnes.jpg', 'set-fitnes/set-fitnes-210x167.jpg', false, false, false, 0, 0, 0, false, false, false, 0, 0, 'set-fitnes/set-fitnes-32x32.png', 0, '139', NULL, NULL, 'SUSHI', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (161, 2200, 'Норвежский Нежнейший стейк из семги ….на выбор на пару или  гриль', false, true, 0, 'Стейк из семги.(гриль…на пару)', 23, 'salmon-steak/salmon-steak.jpg', 'salmon-steak/salmon-steak-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'salmon-steak/salmon-steak-32x32.png', 100, '161', NULL, NULL, 'NONE', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (147, 1000, 'Теплый ролл с лососем гриль огурцом и сыром филадельфия.', false, true, 0, 'Темпура Лосось гриль', 8, 'tepliy-roll-tempura-losos-grill/tepliy-roll-tempura-losos-grill.jpg', 'tepliy-roll-tempura-losos-grill/tepliy-roll-tempura-losos-grill-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'tepliy-roll-tempura-losos-grill/tepliy-roll-tempura-losos-grill-32x32.png', 646, '147', NULL, NULL, 'SUSHI', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (138, 3400, 'Ролл Филадельфия 8 шт.

Ролл Лосось 8 шт.

Ролл Огурец 8 шт.

Ролл Угорь 8 шт.

Ролл Лосось Гриль 8 шт.', false, true, 0, 'Сет Классический(40шт.)', 9, 'set-classica/set-classica.jpg', 'set-classica/set-classica-210x167.jpg', false, false, false, 0, 0, 0, false, false, false, 0, 0, 'set-classica/set-classica-32x32.png', 0, '138', NULL, NULL, 'SUSHI', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (148, 650, 'Классический  ролл с лососем гриль огурцом и соусом терияки.', false, true, 0, 'Лосось гриль', 8, 'roll-losos-grill/roll-losos-grill.jpg', 'roll-losos-grill/roll-losos-grill-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'roll-losos-grill/roll-losos-grill-32x32.png', 1001, '148', NULL, NULL, 'SUSHI', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (145, 600, 'Классический ролл с  традиционным  японскими маринованными водорослями Чука', false, true, 0, 'Ролл чука маки', 8, 'roll-chuka-maki/roll-chuka-maki.jpg', 'roll-chuka-maki/roll-chuka-maki-210x167.jpg', false, true, true, 0, 0, 0, false, false, false, 0, 0, 'roll-chuka-maki/roll-chuka-maki-32x32.png', 1010, '145', NULL, NULL, 'SUSHI', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (146, 900, 'Икра красная (икура) огурец, лист салата,лосось и  соусом терияки', false, true, 0, 'Ролл икура маки', 8, 'roll-ikura-maki/roll-ikura-maki.jpg', 'roll-ikura-maki/roll-ikura-maki-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'roll-ikura-maki/roll-ikura-maki-32x32.png', 900, '146', NULL, NULL, 'SUSHI', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (149, 1600, 'Креветка тигровая, тунец, угорь копченный, авокадо, лосось, японский омлет и соус спайси', false, true, 0, 'Ролл радуга', 8, 'roll-rainbow/roll-rainbow.jpg', 'roll-rainbow/roll-rainbow-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'roll-rainbow/roll-rainbow-32x32.png', 100, '149', NULL, NULL, 'SUSHI', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (150, 700, 'Одна из популярных разновидностей суши в виде колодца овальной формы с красной лососевой икрой.', false, true, 0, 'Гункан Икура', 5, 'gunkan-ikura/gunkan-ikura.jpg', 'gunkan-ikura/gunkan-ikura-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'gunkan-ikura/gunkan-ikura-32x32.png', 0, '150', NULL, NULL, 'SUSHI', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (151, 1500, 'Традиционный  японский салат с морепродуктами, креветка тигровая, осьминог бэйби, лосось копченный.', false, true, 0, 'Салат чука с морепродуктами', 28, 'salad-chuka-seafood/salad-chuka-seafood.jpg', 'salad-chuka-seafood/salad-chuka-seafood-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'salad-chuka-seafood/salad-chuka-seafood-32x32.png', 0, '151', NULL, NULL, 'NONE', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (163, 1700, 'Традиционная японская Пшеничная лапша с морепродуктами и овощами…и соусом тонкацу.', false, true, 0, 'Удон с морепродуктами', 23, 'udon-seafood/udon-seafood.jpg', 'udon-seafood/udon-seafood-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'udon-seafood/udon-seafood-32x32.png', 200, '163', NULL, NULL, 'NONE', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (153, 700, 'Брюссельская капуста, цветная капуста, брокколи, морковь', false, true, 0, 'Oвощи Wok', 28, 'salad-vegetables-wok/salad-vegetables-wok.jpg', 'salad-vegetables-wok/salad-vegetables-wok-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'salad-vegetables-wok/salad-vegetables-wok-32x32.png', 0, '153', NULL, NULL, 'NONE', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (156, 1500, 'Мини шашлычки из лосося на бамбуковых шпажках в японском  соусе  терияки', false, true, 0, 'Шашлычок с лососем в соусе терияки', 23, 'shashl-losos/shashl-losos.jpg', 'shashl-losos/shashl-losos-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'shashl-losos/shashl-losos-32x32.png', 300, '156', NULL, NULL, 'NONE', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (166, 400, 'Японский Рис', false, true, 0, 'Японский Рис', 23, 'japan-rice/japan-rice.jpg', 'japan-rice/japan-rice.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'japan-rice/japan-rice-32x32.png', 1400, '166', NULL, NULL, 'NONE', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (159, 1850, 'Тигровые Креветки в нежной хрустящей корочке Темпура с соусом на Ваш выбор (кисло-сладкий Терияки, сладкий Унаги и Ореховый и тонкацу)', false, true, 0, 'Креветки Темпура', 23, 'krevetki-tempura/krevetki-tempura.jpg', 'krevetki-tempura/krevetki-tempura-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'krevetki-tempura/krevetki-tempura-32x32.png', 600, '159', NULL, NULL, 'NONE', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (164, 1500, 'Хрустящие в нежной панировке сырные палочки обжаренные до золотистой корочки с соусом на ваш выбор', false, true, 0, 'Сырные палочки', 23, 'cheese-fingers/cheese-fingers.jpg', 'cheese-fingers/cheese-fingers.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'cheese-fingers/cheese-fingers-32x32.png', 1000, '164', NULL, NULL, 'NONE', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (157, 1600, 'Куриное филе в нежной японской панировке канеширо. Соусом на ваш выбор острый соус  чили и соус спайси.', false, true, 0, 'Нагетсы в темпуре', 23, 'chicken-nuggets/chicken-nuggets.jpg', 'chicken-nuggets/chicken-nuggets-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'chicken-nuggets/chicken-nuggets-32x32.png', 700, '157', NULL, NULL, 'NONE', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (162, 1700, 'Шашлычки в ассортименте тигровая креветка кальмары, лосось, осьминог бэби в соусе тонкацу', false, true, 0, 'Шашлычок ассорти ', 23, 'shashl-assorti/shashl-assorti.jpg', 'shashl-assorti/shashl-assorti-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'shashl-assorti/shashl-assorti-32x32.png', 500, '162', NULL, NULL, 'NONE', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (160, 1500, 'Хрустящие кольца кальмаров в дуэте с луковыми кольцами и соусом на ваш выбор', false, true, 0, 'Кольца кальмара и лука в темпуре', 23, 'onion-rings-tempura/onion-rings-tempura.jpg', 'onion-rings-tempura/onion-rings-tempura.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'onion-rings-tempura/onion-rings-tempura-32x32.png', 900, '160', NULL, NULL, 'NONE', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (141, 5200, 'Ролл Филадельфия

Ролл Филадельфия Туна

Ролл Сливочный Лосось гриль

Ролл Сливочный Лосось 

', false, true, 0, 'Сет Фила безумие (32шт.)', 9, 'set-fila-crazy/set-fila-crazy.JPG', 'set-fila-crazy/set-fila-crazy-210x167.JPG', false, false, false, 0, 0, 0, false, false, false, 0, 0, 'set-fila-crazy/set-fila-crazy-32x32.png', 0, '141', NULL, NULL, 'SUSHI', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (152, 700, 'Брюссельская капуста, цветная капуста, брокколи, морковь', false, true, 0, 'Oвощи на пару', 28, 'salad-vegetables/salad-vegetables.jpg', 'salad-vegetables/salad-vegetables-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'salad-vegetables/salad-vegetables-32x32.png', 0, '152', NULL, NULL, 'NONE', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (158, 1800, 'Нежные Тигровые Креветки в кисло-сладком японском соусе Терияки с изысканным вкусом', false, true, 0, 'Шашлычок из Креветок в соусе Терияки', 23, 'shashl-ebi/shashl-ebi.jpg', 'shashl-ebi/shashl-ebi-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'shashl-ebi/shashl-ebi-32x32.jpg', 400, '158', NULL, NULL, 'NONE', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (165, 400, 'Картофель ФРИ', false, true, 0, 'Картофель Фри', 23, 'french-fried/french-fried.jpg', 'french-fried/french-fried.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'french-fried/french-fried-32x32.png', 1300, '165', NULL, NULL, 'NONE', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (154, 1300, 'Традиционные японские жаренные или варенные пельмени с начинкой на ваш выбор', false, true, 0, 'Пельмени Гедза', 23, 'pelmeni-gedza/pelmeni-gedza.jpg', 'pelmeni-gedza/pelmeni-gedza-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'pelmeni-gedza/pelmeni-gedza-32x32.png', 100, '154', NULL, NULL, 'NONE', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (167, 5000, 'Ролл огурец 8шт.,

Ролл тунец 8шт.,

Ролл лосось гриль маки 8шт.,

Ролл угорь 8шт.,

Ролл темпура с лососем 8шт.,

Ролл бонито с лос 8шт.,

Нигири лосось 1шт.,

Гункан чука 1шт.', false, true, 0, 'Сет Микс 50 шт.', 9, 'set-50/set-50.jpg', 'set-50/set-50-210x167.jpg', false, true, false, 0, 0, 0, false, false, true, 0, 0, 'set-50/set-50-32x32.png', 0, '167', NULL, NULL, 'SUSHI', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (135, 8800, 'Ролл филадельфия

Ролл сливочный угорь

Ролл сливочный лосось

Ролл калифорния с лососем

Ролл Лосось

Ролл Тунец

Ролл Огурец

Нигири угорь2шт.

Нигири Лосось 2щт.

Гункан Чука 2шт

', false, true, 0, 'Сет Ассорти(62шт.)', 9, 'set-assorti/set-assorti.jpg', 'set-assorti/set-assorti-210x167.jpg', false, false, false, 0, 0, 0, false, false, false, 0, 0, 'set-assorti/set-assorti-32x32.png', 0, '135', NULL, NULL, 'SUSHI', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (143, 1200, 'Теплый ролл с тигровой креветкой, икрой Тобико в японских сухарях канеширо', false, true, 0, 'Ролл темпура с креветкой', 8, 'tepliy-roll-tempura-krevetka/tepliy-roll-tempura-krevetka.jpg', 'tepliy-roll-tempura-krevetka/tepliy-roll-tempura-krevetka-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'tepliy-roll-tempura-krevetka/tepliy-roll-tempura-krevetka-32x32.png', 640, '143', NULL, NULL, 'SUSHI', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (155, 1350, 'Нежные куриные полоски в дуэте пшеничной и рисовой  муки (кляр) и нежных сухарях  темпура канеширо', false, true, 0, 'Куриные стрипсы в темпуре', 23, 'chicken-stripes/chicken-stripes.jpg', 'chicken-stripes/chicken-stripes-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'chicken-stripes/chicken-stripes-32x32.png', 800, '155', NULL, NULL, 'NONE', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (179, 1500, 'Фарш говяжий , болгарский перец, томаты, пицца-соус, сыр Моцарелла, перец черный молотый, зелень', false, true, 0, 'Болоньезе', 25, 'pizza-bolonese/pizza-bolonese.jpg', 'pizza-bolonese/pizza-bolonese-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'pizza-bolonese/pizza-bolonese-32x32.png', 0, '169', NULL, NULL, 'NONE', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (183, 1500, 'Пицца-соус, сыр Моцарелла, шампиньоны, ветчина, куриная грудка, пеперони', false, true, 0, 'Четыре сезона', 25, 'pizza-four-seasons/pizza-four-seasons.jpg', 'pizza-four-seasons/pizza-four-seasons-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'pizza-four-seasons/pizza-four-seasons-32x32.png', 0, '173', NULL, NULL, 'NONE', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (181, 1600, 'Говядина фарш, томаты, ветчина, болгарский перец, лук репчатый, специи под сыром «Моцарелла», соус Чили', false, true, 0, 'Чили', 25, 'pizza-chili/pizza-chili.jpg', 'pizza-chili/pizza-chili-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'pizza-chili/pizza-chili-32x32.png', 0, '171', NULL, NULL, 'NONE', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (178, 1750, 'Пепперони, ветчина, куриная грудка, охотничьи колбаски, зелень, соус «техасский барбекю», сыр «Моцарелла»', false, true, 0, 'Барбекю', 25, 'pizza-barbeque/pizza-barbeque.jpg', 'pizza-barbeque/pizza-barbeque-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'pizza-barbeque/pizza-barbeque-32x32.png', 0, '168', NULL, NULL, 'NONE', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (186, 1400, 'Пепперони, шампиньоны, Пицца-соус, сыр «Моцарелла»', false, true, 0, 'Пепперони', 25, 'pizza-peperoni/pizza-peperoni.jpg', 'pizza-peperoni/pizza-peperoni-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'pizza-peperoni/pizza-peperoni-32x32.png', 0, '176', NULL, NULL, 'NONE', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (188, 1700, 'Cоус «Тар-тар», сыр «Моцарелла», креветки, лосось, кальмары, осьминоги, зелень, лимон', false, true, 0, 'Средиземноморская', 25, 'pizza-srednezemnomorskaya/pizza-srednezemnomorskaya.jpg', 'pizza-srednezemnomorskaya/pizza-srednezemnomorskaya-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'pizza-srednezemnomorskaya/pizza-srednezemnomorskaya-32x32.png', 0, '178', NULL, NULL, 'NONE', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (184, 1350, 'Пицца-соус, сыр «Моцарелла», орегано', false, true, 0, 'Маргарита', 25, 'pizza-margarita/pizza-margarita.jpg', 'pizza-margarita/pizza-margarita-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'pizza-margarita/pizza-margarita-32x32.png', 0, '174', NULL, NULL, 'NONE', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (180, 1450, 'Соус «Техасский барбекю», сыр «Моцарелла», куриная грудка, томаты, ветчина, зелень', false, true, 0, 'Чикен-Барбекю', 25, 'pizza-chicken-berbeque/pizza-chicken-berbeque.jpg', 'pizza-chicken-barbeque/pizza-chicken-barbeque-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'pizza-chicken-barbeque/pizza-chicken-barbeque-32x32.png', 0, '170', NULL, NULL, 'NONE', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (182, 1350, 'Сыр моцарелла, Сыр Филадельфия, Сыр Гауда, Сыр Каманбер', false, true, 0, 'Четыре сыра', 25, 'pizza-four-cheeses/pizza-four-cheeses.jpg', 'pizza-four-cheeses/pizza-four-cheeses-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'pizza-four-cheeses/pizza-four-cheeses-32x32.png', 0, '172', NULL, NULL, 'NONE', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (187, 1450, 'Пицца-соус, сыр «Моцарелла», лук красный, колбаса «Пепперони», томаты, маслины, зелень', false, true, 0, 'Римская', 25, 'pizza-rim/pizza-rim.jpg', 'pizza-rim/pizza-rim-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'pizza-rim/pizza-rim-32x32.png', 0, '177', NULL, NULL, 'NONE', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (190, 1500, 'Салями, ветчина, грибы, перец болгарский, томаты, зелень., соус «томатно-горчичный», сыр «Моцарелла», соус Тар-Тар', false, true, 0, 'Сушими', 25, 'pizza-sushimi/pizza-sushimi.jpg', 'pizza-sushimi/pizza-sushimi-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'pizza-sushimi/pizza-sushimi-32x32.png', 0, '180', NULL, NULL, 'NONE', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (191, 1500, 'Соус «тар-тар», сыр «моцарелла», шампиньоны, пепперони, ветчина, томаты, перец болгарский', false, true, 0, 'Вечер романтики', 25, 'pizza-vecher-romantiki/pizza-vecher-romantiki.jpg', 'pizza-vecher-romantiki/pizza-vecher-romantiki-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'pizza-vecher-romantiki/pizza-vecher-romantiki-32x32.png', 0, '181', NULL, NULL, 'NONE', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (189, 1550, 'Грибы, ветчина, пепперони, томаты, куриная грудка, чеснок, лук, зелень, горчичный соус (Дижон), сыр «Моцарелла»', false, true, 0, 'Столичная', 25, 'pizza-stolichnaya/pizza-stolichnaya.jpg', 'pizza-stolichnaya/pizza-stolichnaya-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'pizza-stolichnaya/pizza-stolichnaya-32x32.png', 0, '179', NULL, NULL, 'NONE', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (192, 1400, 'Грибы шампиньоны, болгарский перец, томаты, чукка, маслины, лук, зелень, пицца-соус, сыр «Моцарелла»', false, true, 0, 'Вегетарианская', 25, 'pizza-vegetable/pizza-vegetable.jpg', 'pizza-vegetable/pizza-vegetable-210x167.jpg', false, true, false, 0, 0, 0, false, true, false, 0, 0, 'pizza-vegetable/pizza-vegetable-32x32.png', 0, '182', NULL, NULL, 'NONE', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (185, 1650, 'Ветчина,  куриная грудка, колбаски охотничьи, фарш, томаты, зелень, орегано, пицца-соус, сыр «Моцарелла»', false, true, 0, 'Мясная', 25, 'pizza-meat-assorti/pizza-meat-assorti.jpg', 'pizza-meat-assorti/pizza-meat-assorti-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'pizza-meat-assorti/pizza-meat-assorti-32x32.png', 0, '175', NULL, NULL, 'NONE', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (32, 300, 'Классический вид суши с ломтиком свежего лосося холодного копчения на нежной подушечке с риса.', false, true, 8, 'Нигири копченый лосось', 6, 'nigiri-kopcheniy-losos/nigiri-kopcheniy-losos.jpg', 'nigiri-kopcheniy-losos/nigiri-kopcheniy-losos-210x167.jpg', false, false, false, 0, 0, 0, false, false, false, 0, 0, 'nigiri-kopcheniy-losos/nigiri-kopcheniy-losos-32x32.png', 0, '32', '31  гр.', '53 ккал', 'SUSHI', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (29, 350, 'Классический вид суши с ломтиком тигровой креветки на нежной подушечке риса.', false, true, 8, 'Нигири креветка', 6, 'nigiri-krevetka/nigiri-krevetka.jpg', 'nigiri-krevetka/nigiri-krevetka-210x167.jpg', false, false, false, 0, 0, 0, false, false, false, 0, 0, 'nigiri-krevetka/nigiri-krevetka-32x32.png', 0, '29', '27  гр.', '32 ккал', 'SUSHI', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (30, 450, 'Классический вид суши с ломтиком свежего тунца на нежной подушечке риса.', false, true, 8, 'Нигири тунец', 6, 'nigiri-tunec/nigiri-tunec.jpg', 'nigiri-tunec/nigiri-tunec-210x167.jpg', false, false, false, 0, 0, 0, false, false, false, 0, 0, 'nigiri-tunec/nigiri-tunec-32x32.png', 0, '30', '31  гр.', '44 ккал', 'SUSHI', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (133, 1300, 'Традиционное блюдо японской кухни в виде нарезки  копченного угря.', false, true, 0, 'Сашими с угрем', 29, 'sashimi-ugor/sashimi-ugor.jpg', 'sashimi-ugor/sashimi-ugor-210x167.jpg', false, false, false, 0, 0, 0, false, false, false, 0, 0, 'sashimi-ugor/sashimi-ugor-32x32.png', 0, '133', NULL, NULL, 'SUSHI', NULL);
INSERT INTO products (id, cost, description, deleted, published, item_count, name, category_id, image_link, small_image_link, is_hit, is_new, recomended, carbohydrates, fats, proteins, is_hot, is_vegatable, popular, popular_age, popular_sex, icon_image_link, order_number, code, weight, calories, type, rating) VALUES (54, 100, 'Соус Васаби', false, true, 1, 'Васаби', 22, 'sauce-vasabi/sauce-vasabi.jpg', 'sauce-vasabi/sauce-vasabi-210x167.jpg', false, false, false, 0, 0, 0, false, false, false, 0, 0, 'sauce-vasabi/sauce-vasabi-32x32.png', 100, '54', '50 мл.', NULL, 'VASABI', NULL);


--
-- TOC entry 2517 (class 0 OID 49620)
-- Dependencies: 185
-- Data for Name: products_ingredients; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 2518 (class 0 OID 49623)
-- Dependencies: 186
-- Data for Name: restaurants; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO restaurants (id, address, description, image_url, deleted, published, latitude, longitude, modified_date, order_number, phone_number, title, workhours) VALUES (1, 'Астана ул. Тархана 9', 'Суши-бар "Сушими"', 'mobile/sushi-bar/sushi-bar-veer-326-244.jpg', false, true, 51.1609001, 71.4517975, '2014-10-10 00:00:00', 1, '+77012528252', 'Суши-бар на Тархана', 'с 11:00 до 24:00');


--
-- TOC entry 2519 (class 0 OID 49629)
-- Dependencies: 187
-- Data for Name: restaurants_photos; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO restaurants_photos (id, description, image_url, modified_date, small_url, restaurant_id, is_promo) VALUES (1, 'Фото нашего суши бара', 'mobile/sushi-bar/sushi-bar-veer-326-244.jpg', '2015-07-07 07:05:49.561184', 'mobile/sushi-bar/sushi-bar-veer-326-244.jpg', 1, true);
INSERT INTO restaurants_photos (id, description, image_url, modified_date, small_url, restaurant_id, is_promo) VALUES (2, 'Фото нашего суши бара 2', 'mobile/sushi-bar/sushi-bar-desk-view-326-244.jpg', '2015-07-07 07:06:25.556705', 'mobile/sushi-bar/sushi-bar-desk-view-326-244.jpg', 1, true);
INSERT INTO restaurants_photos (id, description, image_url, modified_date, small_url, restaurant_id, is_promo) VALUES (3, 'Фото нашего суши бара 2', 'mobile/sushi-bar/sushi-bar-veer-desk-326-244.jpg', '2015-07-07 07:06:56.653509', 'mobile/sushi-bar/sushi-bar-veer-desk-326-244.jpg', 1, false);


--
-- TOC entry 2568 (class 0 OID 0)
-- Dependencies: 210
-- Name: user_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('user_seq', 1, false);


--
-- TOC entry 2569 (class 0 OID 0)
-- Dependencies: 212
-- Name: user_tracking_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('user_tracking_seq', 101, true);


--
-- TOC entry 2541 (class 0 OID 49953)
-- Dependencies: 209
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO users (id, enabled, last_geolocation_sync_time, last_latitude, last_longitude, login, name, password, role, city_id, m_app_verison, m_operation_system, m_operation_system_version, m_auth_token, m_push_key, code) VALUES (2, true, '2015-10-12 16:38:36.538', '52', '51', '222', 'Artem', '1', 'COURIER', 1, '1.0', 2, '9.0.2', 'ada99268-10c2-4c5a-b397-50a0cc73bd54', 'super push', 'ast_courier_002');
INSERT INTO users (id, enabled, last_geolocation_sync_time, last_latitude, last_longitude, login, name, password, role, city_id, m_app_verison, m_operation_system, m_operation_system_version, m_auth_token, m_push_key, code) VALUES (1, true, '2015-10-16 14:18:10.204', '52', '51', '1', 'Ахмет', '1', 'COURIER', 1, '1.0', 2, '9.0.2', 'e76295d4-15c6-48f9-bde8-cf37168487e8', 'super push', 'ast_courier_001');


--
-- TOC entry 2543 (class 0 OID 49968)
-- Dependencies: 211
-- Data for Name: users_trackings; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO users_trackings (id, track_date, latitude, longitude, user_id) VALUES (1, '2015-09-23 20:20:57.773', '12.0', '12.0', 1);
INSERT INTO users_trackings (id, track_date, latitude, longitude, user_id) VALUES (2, '2015-09-23 20:21:07.783', '12.0', '12.0', 1);
INSERT INTO users_trackings (id, track_date, latitude, longitude, user_id) VALUES (3, '2015-09-23 20:21:17.786', '12.0', '12.0', 1);
INSERT INTO users_trackings (id, track_date, latitude, longitude, user_id) VALUES (4, '2015-09-23 20:21:27.952', '12.0', '12.0', 1);
INSERT INTO users_trackings (id, track_date, latitude, longitude, user_id) VALUES (5, '2015-09-23 20:21:43.48', '12.0', '12.0', 1);
INSERT INTO users_trackings (id, track_date, latitude, longitude, user_id) VALUES (6, '2015-09-23 20:21:47.974', '12.0', '12.0', 1);
INSERT INTO users_trackings (id, track_date, latitude, longitude, user_id) VALUES (7, '2015-09-23 20:21:57.986', '12.0', '12.0', 1);
INSERT INTO users_trackings (id, track_date, latitude, longitude, user_id) VALUES (49, '2015-09-23 20:29:01.39', '12.0', '12.0', 1);
INSERT INTO users_trackings (id, track_date, latitude, longitude, user_id) VALUES (50, '2015-09-23 20:29:44.311', '42.0', '13.0', 1);
INSERT INTO users_trackings (id, track_date, latitude, longitude, user_id) VALUES (51, '2015-09-23 20:30:44.164', '3.0', '2.0', 1);
INSERT INTO users_trackings (id, track_date, latitude, longitude, user_id) VALUES (52, '2015-09-23 20:31:54.446', '10.0', '10.0', 1);
INSERT INTO users_trackings (id, track_date, latitude, longitude, user_id) VALUES (53, '2015-09-23 20:33:04.896', '33.0', '1.0', 1);
INSERT INTO users_trackings (id, track_date, latitude, longitude, user_id) VALUES (54, '2015-09-24 00:19:54.319', '32.0', '12.0', 1);
INSERT INTO users_trackings (id, track_date, latitude, longitude, user_id) VALUES (55, '2015-09-24 02:57:40.298', '12.0', '20.0', 1);
INSERT INTO users_trackings (id, track_date, latitude, longitude, user_id) VALUES (56, '2015-09-27 23:15:51.482', '23.0', '10.0', 1);
INSERT INTO users_trackings (id, track_date, latitude, longitude, user_id) VALUES (57, '2015-10-04 21:44:02.937', '32.0', '12.0', 1);
INSERT INTO users_trackings (id, track_date, latitude, longitude, user_id) VALUES (58, '2015-10-04 21:44:33.005', '71.0', '51.0', 1);
INSERT INTO users_trackings (id, track_date, latitude, longitude, user_id) VALUES (59, '2015-10-04 21:45:33.319', '71.44499833333333', '51.180099999999996', 1);
INSERT INTO users_trackings (id, track_date, latitude, longitude, user_id) VALUES (60, '2015-10-04 21:46:26.662', '51.180099999999996', '71.44499833333333', 1);
INSERT INTO users_trackings (id, track_date, latitude, longitude, user_id) VALUES (61, '2015-10-06 12:28:21.232', '51.0', '71.0', 1);
INSERT INTO users_trackings (id, track_date, latitude, longitude, user_id) VALUES (62, '2015-10-16 12:15:37.519', '37.78583526611328', '-122.4064178466797', 1);
INSERT INTO users_trackings (id, track_date, latitude, longitude, user_id) VALUES (63, '2015-10-16 12:16:07.521', '37.78583526611328', '-122.4064178466797', 1);
INSERT INTO users_trackings (id, track_date, latitude, longitude, user_id) VALUES (64, '2015-10-16 12:16:37.522', '37.78583526611328', '-122.4064178466797', 1);
INSERT INTO users_trackings (id, track_date, latitude, longitude, user_id) VALUES (65, '2015-10-16 12:17:07.537', '37.785834', '-122.406417', 1);
INSERT INTO users_trackings (id, track_date, latitude, longitude, user_id) VALUES (66, '2015-10-16 12:17:37.597', '37.785834', '-122.406417', 1);
INSERT INTO users_trackings (id, track_date, latitude, longitude, user_id) VALUES (67, '2015-10-16 12:18:07.524', '37.785834', '-122.406417', 1);
INSERT INTO users_trackings (id, track_date, latitude, longitude, user_id) VALUES (68, '2015-10-16 12:18:37.524', '37.785834', '-122.406417', 1);
INSERT INTO users_trackings (id, track_date, latitude, longitude, user_id) VALUES (69, '2015-10-16 12:19:07.524', '37.785834', '-122.406417', 1);
INSERT INTO users_trackings (id, track_date, latitude, longitude, user_id) VALUES (70, '2015-10-16 12:19:37.527', '37.785834', '-122.406417', 1);
INSERT INTO users_trackings (id, track_date, latitude, longitude, user_id) VALUES (71, '2015-10-16 12:20:10.466', '37.785834', '-122.406417', 1);
INSERT INTO users_trackings (id, track_date, latitude, longitude, user_id) VALUES (72, '2015-10-16 12:20:37.528', '37.785834', '-122.406417', 1);
INSERT INTO users_trackings (id, track_date, latitude, longitude, user_id) VALUES (73, '2015-10-16 12:21:07.529', '37.785834', '-122.406417', 1);
INSERT INTO users_trackings (id, track_date, latitude, longitude, user_id) VALUES (74, '2015-10-16 12:21:37.529', '37.78583526611328', '-122.4064178466797', 1);
INSERT INTO users_trackings (id, track_date, latitude, longitude, user_id) VALUES (75, '2015-10-16 12:22:07.528', '37.78583526611328', '-122.4064178466797', 1);
INSERT INTO users_trackings (id, track_date, latitude, longitude, user_id) VALUES (76, '2015-10-16 12:22:37.534', '37.78583526611328', '-122.4064178466797', 1);
INSERT INTO users_trackings (id, track_date, latitude, longitude, user_id) VALUES (77, '2015-10-16 12:23:07.531', '37.78583526611328', '-122.4064178466797', 1);
INSERT INTO users_trackings (id, track_date, latitude, longitude, user_id) VALUES (78, '2015-10-16 12:23:37.532', '37.78583526611328', '-122.4064178466797', 1);
INSERT INTO users_trackings (id, track_date, latitude, longitude, user_id) VALUES (79, '2015-10-16 12:24:07.534', '37.78583526611328', '-122.4064178466797', 1);
INSERT INTO users_trackings (id, track_date, latitude, longitude, user_id) VALUES (80, '2015-10-16 12:24:37.536', '37.78583526611328', '-122.4064178466797', 1);
INSERT INTO users_trackings (id, track_date, latitude, longitude, user_id) VALUES (81, '2015-10-16 12:25:07.536', '37.785834', '-122.406417', 1);
INSERT INTO users_trackings (id, track_date, latitude, longitude, user_id) VALUES (82, '2015-10-16 12:25:37.539', '37.785834', '-122.406417', 1);
INSERT INTO users_trackings (id, track_date, latitude, longitude, user_id) VALUES (83, '2015-10-16 12:26:07.538', '37.785834', '-122.406417', 1);
INSERT INTO users_trackings (id, track_date, latitude, longitude, user_id) VALUES (84, '2015-10-16 12:26:37.537', '37.785834', '-122.406417', 1);
INSERT INTO users_trackings (id, track_date, latitude, longitude, user_id) VALUES (85, '2015-10-16 12:27:07.545', '37.785834', '-122.406417', 1);
INSERT INTO users_trackings (id, track_date, latitude, longitude, user_id) VALUES (86, '2015-10-16 12:27:37.543', '37.785834', '-122.406417', 1);
INSERT INTO users_trackings (id, track_date, latitude, longitude, user_id) VALUES (87, '2015-10-16 12:28:07.551', '37.785834', '-122.406417', 1);
INSERT INTO users_trackings (id, track_date, latitude, longitude, user_id) VALUES (88, '2015-10-16 12:28:37.543', '37.785834', '-122.406417', 1);
INSERT INTO users_trackings (id, track_date, latitude, longitude, user_id) VALUES (89, '2015-10-16 12:29:07.544', '37.785834', '-122.406417', 1);
INSERT INTO users_trackings (id, track_date, latitude, longitude, user_id) VALUES (90, '2015-10-16 12:29:37.546', '37.785834', '-122.406417', 1);
INSERT INTO users_trackings (id, track_date, latitude, longitude, user_id) VALUES (91, '2015-10-16 12:30:07.546', '37.785834', '-122.406417', 1);
INSERT INTO users_trackings (id, track_date, latitude, longitude, user_id) VALUES (92, '2015-10-16 12:30:37.547', '37.785834', '-122.406417', 1);
INSERT INTO users_trackings (id, track_date, latitude, longitude, user_id) VALUES (93, '2015-10-16 12:31:07.547', '37.785834', '-122.406417', 1);
INSERT INTO users_trackings (id, track_date, latitude, longitude, user_id) VALUES (94, '2015-10-16 12:31:37.55', '37.785834', '-122.406417', 1);
INSERT INTO users_trackings (id, track_date, latitude, longitude, user_id) VALUES (95, '2015-10-16 12:32:07.549', '37.785834', '-122.406417', 1);
INSERT INTO users_trackings (id, track_date, latitude, longitude, user_id) VALUES (96, '2015-10-16 12:32:37.556', '37.785834', '-122.406417', 1);
INSERT INTO users_trackings (id, track_date, latitude, longitude, user_id) VALUES (97, '2015-10-16 12:33:07.551', '37.785834', '-122.406417', 1);
INSERT INTO users_trackings (id, track_date, latitude, longitude, user_id) VALUES (98, '2015-10-16 12:33:37.554', '37.785834', '-122.406417', 1);
INSERT INTO users_trackings (id, track_date, latitude, longitude, user_id) VALUES (99, '2015-10-16 12:34:26.018', '37.78583526611328', '-122.4064178466797', 1);
INSERT INTO users_trackings (id, track_date, latitude, longitude, user_id) VALUES (100, '2015-10-16 12:34:55.99', '37.78583526611328', '-122.4064178466797', 1);
INSERT INTO users_trackings (id, track_date, latitude, longitude, user_id) VALUES (101, '2015-10-16 12:36:13.207', '37.78583526611328', '-122.4064178466797', 1);


--
-- TOC entry 2520 (class 0 OID 49635)
-- Dependencies: 188
-- Data for Name: vacancy; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 2521 (class 0 OID 49641)
-- Dependencies: 189
-- Data for Name: vacancy_app; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 2522 (class 0 OID 49647)
-- Dependencies: 190
-- Data for Name: vacancy_groups; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO vacancy_groups (id, description, deleted, published, name) VALUES (2, NULL, false, true, 'Курьер');
INSERT INTO vacancy_groups (id, description, deleted, published, name) VALUES (3, NULL, false, true, 'Повар-сушист');


--
-- TOC entry 2548 (class 0 OID 0)
-- Data for Name: BLOBS; Type: BLOBS; Schema: -; Owner: 
--

SET search_path = pg_catalog;

BEGIN;

SELECT pg_catalog.lo_open('112354', 131072);
SELECT pg_catalog.lowrite(0, '\x3c68746d6c20636c6173733d226a73206373737472616e736974696f6e73223e0a0a3c686561643e0a202020203c6d65746120636861727365743d227574662d38223e0a202020203c6d65746120687474702d65717569763d22636f6e74656e742d747970652220636f6e74656e743d22746578742f68746d6c3b20636861727365743d7574662d3822202f3e0a093c7469746c653e415254412053796e6567792041646d696e3c2f7469746c653e0a202020203c6d657461206e616d653d2276696577706f72742220636f6e74656e743d2277696474683d6465766963652d77696474682c20696e697469616c2d7363616c653d312e30223e0a202020203c6c696e6b2072656c3d2273686f72746375742069636f6e2220687265663d22696e6465782f696d616765732f66617669636f6e2e706e672220747970653d22696d6167652f782d69636f6e223e0a0a202020203c6c696e6b20747970653d22746578742f6373732220687265663d22696e6465782f7374796c65732f6a71756572792d75692d312e392e312e637573746f6d2e6d696e2e637373222072656c3d227374796c657368656574223e0a202020203c6c696e6b20747970653d22746578742f6373732220687265663d22696e6465782f7374796c65732f626f6f7473747261702e6d696e2e637373222072656c3d227374796c657368656574223e0a202020203c6c696e6b20747970653d22746578742f6373732220687265663d22696e6465782f7374796c65732f626f6f7473747261702d726573706f6e736976652e6d696e2e637373222072656c3d227374796c657368656574223e0a202020203c6c696e6b20747970653d22746578742f6373732220687265663d22696e6465782f7374796c65732f6a71756572792e66616e6379626f782e637373222072656c3d227374796c657368656574223e0a202020203c6c696e6b20747970653d22746578742f6373732220687265663d22696e6465782f7374796c65732f6a71756572792e66616e6379626f782d627574746f6e732e637373222072656c3d227374796c657368656574223e0a202020203c6c696e6b20747970653d22746578742f6373732220687265663d22696e6465782f7374796c65732f6a71756572792e66616e6379626f782d7468756d62732e637373222072656c3d227374796c657368656574223e0a202020203c6c696e6b20747970653d22746578742f6373732220687265663d22696e6465782f7374796c65732f7374796c652e637373222072656c3d227374796c657368656574223e0a202020203c6c696e6b20747970653d22746578742f6373732220687265663d22696e6465782f7374796c65732f74656d702e637373222072656c3d227374796c657368656574223e0a202020203c6c696e6b20747970653d22746578742f6373732220687265663d22696e6465782f7374796c65732f726573706f6e736976652e637373222072656c3d227374796c657368656574223e0a202020203c7374796c6520747970653d22746578742f637373222069643d2279615f73686172655f7374796c65223e0a202020202e622d73686172652d706f7075702d77726170207b0a20202020202020207a2d696e6465783a313037333734313832333b0a2020202020202020706f736974696f6e3a6162736f6c7574653b0a202020202020202077696474683a35303070780a202020207d0a202020202e622d73686172652d706f707570207b0a2020202020202020706f736974696f6e3a6162736f6c7574653b0a20202020202020207a2d696e6465783a313037333734313832333b0a2020202020202020626f726465723a31707820736f6c696420233838383b0a20202020202020206261636b67726f756e643a234646463b0a2020202020202020636f6c6f723a233030300a202020207d0a202020202e622d73686172652d706f7075702d77726170202e622d73686172652d706f7075705f646f776e207b0a2020202020202020746f703a300a202020207d0a202020202e622d73686172652d706f7075702d77726170202e622d73686172652d706f7075705f7570207b0a2020202020202020626f74746f6d3a300a202020207d0a202020202e622d73686172652d706f7075702d777261705f73746174655f68696464656e207b0a2020202020202020706f736974696f6e3a6162736f6c75746521696d706f7274616e743b0a2020202020202020746f703a2d39393939707821696d706f7274616e743b0a202020202020202072696768743a6175746f21696d706f7274616e743b0a2020202020202020626f74746f6d3a6175746f21696d706f7274616e743b0a20202020202020206c6566743a2d39393939707821696d706f7274616e743b0a20202020202020207669736962696c6974793a68696464656e21696d706f7274616e740a202020207d0a202020202e622d73686172652d706f7075702c20783a6e74682d6368696c64283129207b0a2020202020202020626f726465723a303b0a202020202020202070616464696e673a31707821696d706f7274616e740a202020207d0a20202020406d6564696120616c6c20616e6420287265736f6c7574696f6e3d3064706929207b0a20202020202020202e622d73686172652d706f7075702c20783a6e74682d6368696c642831292c20783a2d6f2d707265666f637573207b0a20202020202020202020202070616464696e673a3021696d706f7274616e743b0a202020202020202020202020626f726465723a31707820736f6c696420233838380a20202020202020207d0a202020207d0a202020202e622d73686172652d706f7075705f5f69207b0a2020202020202020646973706c61793a2d6d6f7a2d696e6c696e652d626f783b0a2020202020202020646973706c61793a696e6c696e652d626c6f636b3b0a202020202020202070616464696e673a357078203021696d706f7274616e743b0a20202020202020206f766572666c6f773a68696464656e3b0a2020202020202020766572746963616c2d616c69676e3a746f703b0a202020202020202077686974652d73706163653a6e6f777261703b0a20202020202020207669736962696c6974793a76697369626c653b0a20202020202020206261636b67726f756e643a234646463b0a20202020202020202d7765626b69742d626f782d736861646f773a302032707820397078207267626128302c20302c20302c20302e36293b0a20202020202020202d6d6f7a2d626f782d736861646f773a302032707820397078207267626128302c20302c20302c20302e36293b0a2020202020202020626f782d736861646f773a302032707820397078207267626128302c20302c20302c20302e36290a202020207d0a202020202e622d73686172652d706f7075705f5f6974656d207b0a2020202020202020666f6e743a31656d2f312e3235656d20417269616c2c2073616e732d73657269663b0a2020202020202020646973706c61793a626c6f636b3b0a202020202020202070616464696e673a357078203135707821696d706f7274616e743b0a202020202020202077686974652d73706163653a6e6f777261703b0a20202020202020206261636b67726f756e643a234646460a202020207d0a202020202e622d73686172652d706f7075705f5f6974656d2c20612e622d73686172652d706f7075705f5f6974656d3a6c696e6b2c20612e622d73686172652d706f7075705f5f6974656d3a76697369746564207b0a2020202020202020746578742d6465636f726174696f6e3a6e6f6e6521696d706f7274616e743b0a2020202020202020626f726465723a3021696d706f7274616e740a202020207d0a20202020612e622d73686172652d706f7075705f5f6974656d207b0a2020202020202020637572736f723a706f696e7465720a202020207d0a20202020612e622d73686172652d706f7075705f5f6974656d202e622d73686172652d706f7075705f5f6974656d5f5f74657874207b0a2020202020202020646973706c61793a696e6c696e653b0a2020202020202020746578742d6465636f726174696f6e3a756e6465726c696e653b0a2020202020202020636f6c6f723a233161336463310a202020207d0a20202020612e622d73686172652d706f7075705f5f6974656d3a686f766572207b0a2020202020202020776f72642d73706163696e673a300a202020207d0a20202020612e622d73686172652d706f7075705f5f6974656d3a686f766572202e622d73686172652d706f7075705f5f6974656d5f5f74657874207b0a2020202020202020636f6c6f723a234630303b0a2020202020202020637572736f723a706f696e7465720a202020207d0a202020202e622d73686172652d706f7075705f5f69636f6e207b0a2020202020202020646973706c61793a2d6d6f7a2d696e6c696e652d626f783b0a2020202020202020646973706c61793a696e6c696e652d626c6f636b3b0a20202020202020206d617267696e3a2d3370782030203020303b0a202020202020202070616464696e673a30203570782030203021696d706f7274616e743b0a2020202020202020766572746963616c2d616c69676e3a6d6964646c650a202020207d0a202020202e622d73686172652d706f7075705f5f69636f6e5f696e707574207b0a202020202020202077696474683a323170783b0a20202020202020206865696768743a313670783b0a20202020202020206d617267696e2d746f703a2d3670783b0a202020202020202070616464696e673a3021696d706f7274616e740a202020207d0a202020202e622d73686172652d706f7075705f5f69636f6e5f5f696e707574207b0a20202020202020206d617267696e2d72696768743a303b0a20202020202020206d617267696e2d6c6566743a3270783b0a2020202020202020766572746963616c2d616c69676e3a746f700a202020207d0a202020202e622d73686172652d706f7075705f5f737061636572207b0a2020202020202020646973706c61793a626c6f636b3b0a202020202020202070616464696e672d746f703a3130707821696d706f7274616e740a202020207d0a202020202e622d73686172652d706f7075705f5f686561646572207b0a2020202020202020666f6e743a3836252f31656d2056657264616e612c2073616e732d73657269663b0a2020202020202020646973706c61793a626c6f636b3b0a202020202020202070616464696e673a31307078203135707820357078203135707821696d706f7274616e743b0a2020202020202020636f6c6f723a233939390a202020207d0a202020202e622d73686172652d706f7075705f5f6865616465725f6669727374207b0a202020202020202070616464696e672d746f703a35707821696d706f7274616e740a202020207d0a202020202e622d73686172652d706f7075705f5f696e707574207b0a2020202020202020666f6e743a3836252f31656d2056657264616e612c2073616e732d73657269663b0a2020202020202020646973706c61793a626c6f636b3b0a202020202020202070616464696e673a357078203135707821696d706f7274616e743b0a2020202020202020636f6c6f723a233939393b0a2020202020202020746578742d616c69676e3a6c6566740a202020207d0a202020202e622d73686172652d706f7075705f5f696e7075745f5f696e707574207b0a2020202020202020666f6e743a31656d2f31656d2056657264616e612c2073616e732d73657269663b0a2020202020202020646973706c61793a626c6f636b3b0a202020202020202077696474683a313070783b0a20202020202020206d617267696e3a357078203020303b0a20202020202020202d7765626b69742d626f782d73697a696e673a626f726465722d626f783b0a20202020202020202d6d6f7a2d626f782d73697a696e673a626f726465722d626f783b0a2020202020202020626f782d73697a696e673a626f726465722d626f783b0a2020202020202020726573697a653a6e6f6e653b0a2020202020202020746578742d616c69676e3a6c6566743b0a2020202020202020646972656374696f6e3a6c74720a202020207d0a202020202e622d73686172652d706f7075705f646f776e202e622d73686172652d706f7075705f776974682d6c696e6b202e622d73686172652d706f7075705f5f696e7075745f6c696e6b207b0a2020202020202020706f736974696f6e3a6162736f6c7574653b0a2020202020202020746f703a3570783b0a202020202020202072696768743a303b0a20202020202020206c6566743a300a202020207d0a202020202e622d73686172652d706f7075705f7570202e622d73686172652d706f7075705f776974682d6c696e6b202e622d73686172652d706f7075705f5f696e7075745f6c696e6b207b0a2020202020202020706f736974696f6e3a6162736f6c7574653b0a202020202020202072696768743a303b0a2020202020202020626f74746f6d3a3570783b0a20202020202020206c6566743a300a202020207d0a202020202e622d73686172652d706f7075705f646f776e202e622d73686172652d706f7075705f776974682d6c696e6b207b0a202020202020202070616464696e672d746f703a3535707821696d706f7274616e740a202020207d0a202020202e622d73686172652d706f7075705f7570202e622d73686172652d706f7075705f776974682d6c696e6b207b0a202020202020202070616464696e672d626f74746f6d3a3535707821696d706f7274616e740a202020207d0a202020202e622d73686172652d706f7075705f646f776e202e622d73686172652d706f7075705f657870616e6461626c65202e622d73686172652d706f7075705f5f6d61696e207b0a202020202020202070616464696e672d626f74746f6d3a3235707821696d706f7274616e740a202020207d0a202020202e622d73686172652d706f7075705f7570202e622d73686172652d706f7075705f657870616e6461626c65202e622d73686172652d706f7075705f5f6d61696e207b0a202020202020202070616464696e672d746f703a3235707821696d706f7274616e740a202020207d0a202020202e622d73686172652d706f7075705f646f776e202e622d73686172652d706f7075705f79616e6465786564207b0a202020202020202070616464696e672d626f74746f6d3a3130707821696d706f7274616e740a202020207d0a202020202e622d73686172652d706f7075705f7570202e622d73686172652d706f7075705f79616e6465786564207b0a202020202020202070616464696e672d746f703a3130707821696d706f7274616e740a202020207d0a202020202e622d73686172652d706f7075705f5f79616e646578207b0a2020202020202020706f736974696f6e3a6162736f6c7574653b0a202020202020202072696768743a3470783b0a2020202020202020626f74746f6d3a3270783b0a2020202020202020666f6e743a37382e313235252f31656d2056657264616e612c2073616e732d73657269663b0a202020202020202070616464696e673a33707821696d706f7274616e743b0a20202020202020206261636b67726f756e643a7472616e73706172656e740a202020207d0a20202020612e622d73686172652d706f7075705f5f79616e6465783a6c696e6b2c20612e622d73686172652d706f7075705f5f79616e6465783a76697369746564207b0a2020202020202020636f6c6f723a236336633563353b0a2020202020202020746578742d6465636f726174696f6e3a6e6f6e650a202020207d0a20202020612e622d73686172652d706f7075705f5f79616e6465783a6c696e6b3a686f7665722c20612e622d73686172652d706f7075705f5f79616e6465783a766973697465643a686f766572207b0a2020202020202020636f6c6f723a234630303b0a2020202020202020746578742d6465636f726174696f6e3a756e6465726c696e650a202020207d0a202020202e622d73686172652d706f7075705f7570202e622d73686172652d706f7075705f5f79616e646578207b0a2020202020202020746f703a3270783b0a2020202020202020626f74746f6d3a6175746f0a202020207d0a202020202e622d73686172652d706f7075705f657870616e6461626c65202e622d73686172652d706f7075705f5f79616e646578207b0a202020202020202072696768743a6175746f3b0a20202020202020206c6566743a3470780a202020207d0a202020202e622d73686172652d706f7075705f746f2d7269676874202e622d73686172652d706f7075705f657870616e6461626c65202e622d73686172652d706f7075705f5f79616e646578207b0a202020202020202072696768743a3470783b0a20202020202020206c6566743a6175746f0a202020207d0a202020202e622d73686172652d706f7075705f5f657870616e646572202e622d73686172652d706f7075705f5f6974656d207b0a2020202020202020706f736974696f6e3a6162736f6c7574653b0a2020202020202020626f74746f6d3a3570783b0a2020202020202020666f6e743a3836252f31656d2056657264616e612c2073616e732d73657269663b0a20202020202020206d617267696e3a31307078203020303b0a202020202020202070616464696e673a357078203130707821696d706f7274616e743b0a2020202020202020637572736f723a706f696e7465723b0a2020202020202020636f6c6f723a233939393b0a20202020202020206261636b67726f756e643a7472616e73706172656e740a202020207d0a202020202e622d73686172652d706f7075705f746f2d72696768742c202e622d73686172652d706f7075705f746f2d7269676874202e622d73686172652d706f7075705f5f657870616e646572207b0a2020202020202020646972656374696f6e3a72746c0a202020207d0a202020202e622d73686172652d706f7075705f746f2d7269676874202e622d73686172652d706f7075705f5f657870616e646572202e622d73686172652d706f7075705f5f69636f6e207b0a202020202020202070616464696e673a30203020302035707821696d706f7274616e740a202020207d0a202020202e622d73686172652d706f7075705f7570202e622d73686172652d706f7075705f5f657870616e646572202e622d73686172652d706f7075705f5f6974656d207b0a2020202020202020746f703a2d3570783b0a2020202020202020626f74746f6d3a6175746f0a202020207d0a202020202e622d73686172652d706f7075705f5f657870616e646572202e622d73686172652d706f7075705f5f6974656d3a686f766572202e622d73686172652d706f7075705f5f6974656d5f5f74657874207b0a2020202020202020746578742d6465636f726174696f6e3a756e6465726c696e650a202020207d0a202020202e622d73686172652d706f7075705f5f657870616e646572202e622d69636f5f616374696f6e5f726172722c202e622d73686172652d706f7075705f746f2d7269676874202e622d73686172652d706f7075705f5f657870616e646572202e622d69636f5f616374696f6e5f6c6172722c202e622d73686172652d706f7075705f66756c6c202e622d73686172652d706f7075705f5f657870616e646572202e622d69636f5f616374696f6e5f6c6172722c202e622d73686172652d706f7075705f746f2d7269676874202e622d73686172652d706f7075705f66756c6c202e622d73686172652d706f7075705f5f657870616e646572202e622d69636f5f616374696f6e5f726172722c202e622d73686172652d706f7075705f5f657870616e646572202e622d73686172652d706f7075705f5f6974656d5f5f746578745f636f6c6c617073652c202e622d73686172652d706f7075705f66756c6c202e622d73686172652d706f7075705f5f6974656d5f5f746578745f657870616e64207b0a2020202020202020646973706c61793a6e6f6e650a202020207d0a202020202e622d73686172652d706f7075705f746f2d7269676874202e622d73686172652d706f7075705f5f657870616e646572202e622d69636f5f616374696f6e5f726172722c202e622d73686172652d706f7075705f66756c6c202e622d73686172652d706f7075705f5f6974656d5f5f746578745f636f6c6c617073652c202e622d73686172652d706f7075705f66756c6c202e622d73686172652d706f7075705f5f657870616e646572202e622d69636f5f616374696f6e5f726172722c202e622d73686172652d706f7075705f746f2d7269676874202e622d73686172652d706f7075705f66756c6c202e622d73686172652d706f7075705f5f657870616e646572202e622d69636f5f616374696f6e5f6c617272207b0a2020202020202020646973706c61793a696e6c696e650a202020207d0a202020202e622d69636f5f616374696f6e5f726172722c202e622d69636f5f616374696f6e5f6c617272207b0a202020202020202077696474683a3870783b0a20202020202020206865696768743a3770783b0a2020202020202020626f726465723a300a202020207d0a202020202e622d73686172652d706f7075705f5f6d61696e2c202e622d73686172652d706f7075705f5f6578747261207b0a2020202020202020646972656374696f6e3a6c74723b0a2020202020202020766572746963616c2d616c69676e3a626f74746f6d3b0a2020202020202020746578742d616c69676e3a6c6566740a202020207d0a202020202e622d73686172652d706f7075705f646f776e202e622d73686172652d706f7075705f5f6d61696e2c202e622d73686172652d706f7075705f646f776e202e622d73686172652d706f7075705f5f6578747261207b0a2020202020202020766572746963616c2d616c69676e3a746f700a202020207d0a202020202e622d73686172652d706f7075705f5f6d61696e207b0a2020202020202020646973706c61793a2d6d6f7a2d696e6c696e652d737461636b3b0a2020202020202020646973706c61793a696e6c696e652d626c6f636b0a202020207d0a202020202e622d73686172652d706f7075705f5f6578747261207b0a2020202020202020646973706c61793a6e6f6e653b0a20202020202020206d617267696e3a30202d31307078203020300a202020207d0a202020202e622d73686172652d706f7075705f66756c6c202e622d73686172652d706f7075705f5f6578747261207b0a2020202020202020646973706c61793a2d6d6f7a2d696e6c696e652d737461636b3b0a2020202020202020646973706c61793a696e6c696e652d626c6f636b0a202020207d0a202020202e622d73686172652d706f7075705f746f2d7269676874202e622d73686172652d706f7075705f5f6578747261207b0a20202020202020206d617267696e3a3020302030202d313070780a202020207d0a202020202e622d73686172652d706f7075705f5f7461696c207b0a2020202020202020706f736974696f6e3a6162736f6c7574653b0a202020202020202077696474683a323170783b0a20202020202020206865696768743a313070783b0a20202020202020206d617267696e3a3020302030202d313170780a202020207d0a202020202e622d73686172652d706f7075705f646f776e202e622d73686172652d706f7075705f5f7461696c207b0a2020202020202020746f703a2d313070783b0a20202020202020206261636b67726f756e643a75726c28696e6465782f696d616765732f622d73686172652d706f7075705f646f776e5f5f7461696c2e6769662920302030206e6f2d7265706561740a202020207d0a202020202e622d73686172652d706f7075705f7570202e622d73686172652d706f7075705f5f7461696c207b0a2020202020202020626f74746f6d3a2d313070783b0a20202020202020206261636b67726f756e643a75726c28696e6465782f696d616765732f622d73686172652d706f7075705f75705f5f7461696c2e6769662920302030206e6f2d7265706561740a202020207d0a202020202e622d73686172652d706f7075705f646f776e202e622d73686172652d706f7075705f5f7461696c2c20783a6e74682d6368696c64283129207b0a2020202020202020746f703a2d3970783b0a20202020202020206261636b67726f756e642d696d6167653a75726c28696e6465782f696d616765732f622d73686172652d706f7075705f646f776e5f5f7461696c2e706e67290a202020207d0a202020202e622d73686172652d706f7075705f7570202e622d73686172652d706f7075705f5f7461696c2c20783a6e74682d6368696c64283129207b0a2020202020202020626f74746f6d3a2d3970783b0a20202020202020206261636b67726f756e642d696d6167653a75726c28696e6465782f696d616765732f622d73686172652d706f7075705f75705f5f7461696c2e706e67290a202020207d0a20202020406d6564696120616c6c20616e6420287265736f6c7574696f6e3d3064706929207b0a20202020202020202e622d73686172652d706f7075705f646f776e202e622d73686172652d706f7075705f5f7461696c2c20783a6e74682d6368696c642831292c20783a2d6f2d707265666f637573207b0a202020202020202020202020746f703a2d313070783b0a2020202020202020202020206261636b67726f756e642d696d6167653a75726c28696e6465782f696d616765732f622d73686172652d706f7075705f646f776e5f5f7461696c2e676966290a20202020202020207d0a20202020202020202e622d73686172652d706f7075705f7570202e622d73686172652d706f7075705f5f7461696c2c20783a6e74682d6368696c642831292c20783a2d6f2d707265666f637573207b0a202020202020202020202020626f74746f6d3a2d313070783b0a2020202020202020202020206261636b67726f756e642d696d6167653a75726c28696e6465782f696d616765732f622d73686172652d706f7075705f75705f5f7461696c2e676966290a20202020202020207d0a202020207d0a202020202e622d73686172652d706f707570202e622d73686172652d706f7075705f73686f775f666f726d5f6d61696c2c202e622d73686172652d706f707570202e622d73686172652d706f7075705f73686f775f666f726d5f68746d6c207b0a202020202020202070616464696e673a3021696d706f7274616e740a202020207d0a202020202e622d73686172652d706f707570202e622d73686172652d706f7075705f73686f775f666f726d5f6d61696c202e622d73686172652d706f7075705f5f6d61696e2c202e622d73686172652d706f707570202e622d73686172652d706f7075705f73686f775f666f726d5f68746d6c202e622d73686172652d706f7075705f5f6d61696e2c202e622d73686172652d706f707570202e622d73686172652d706f7075705f73686f775f666f726d202e622d73686172652d706f7075705f5f6d61696e2c202e622d73686172652d706f707570202e622d73686172652d706f7075705f73686f775f666f726d5f6d61696c202e622d73686172652d706f7075705f5f65787472612c202e622d73686172652d706f707570202e622d73686172652d706f7075705f73686f775f666f726d5f68746d6c202e622d73686172652d706f7075705f5f65787472612c202e622d73686172652d706f707570202e622d73686172652d706f7075705f73686f775f666f726d202e622d73686172652d706f7075705f5f6578747261207b0a20202020202020206865696768743a313570783b0a202020202020202070616464696e673a3021696d706f7274616e743b0a20202020202020206f766572666c6f773a68696464656e3b0a20202020202020207669736962696c6974793a68696464656e0a202020207d0a202020202e622d73686172652d706f7075705f73686f775f666f726d5f6d61696c202e622d73686172652d706f7075705f5f657870616e6465722c202e622d73686172652d706f7075705f73686f775f666f726d5f68746d6c202e622d73686172652d706f7075705f5f657870616e6465722c202e622d73686172652d706f7075705f73686f775f666f726d202e622d73686172652d706f7075705f5f657870616e6465722c202e622d73686172652d706f7075705f73686f775f666f726d5f6d61696c202e622d73686172652d706f7075705f5f696e7075745f6c696e6b2c202e622d73686172652d706f7075705f73686f775f666f726d5f68746d6c202e622d73686172652d706f7075705f5f696e7075745f6c696e6b2c202e622d73686172652d706f7075705f73686f775f666f726d202e622d73686172652d706f7075705f5f696e7075745f6c696e6b207b0a2020202020202020646973706c61793a6e6f6e650a202020207d0a202020202e622d73686172652d706f7075705f5f666f726d207b0a2020202020202020706f736974696f6e3a72656c61746976653b0a2020202020202020646973706c61793a6e6f6e653b0a20202020202020206f766572666c6f773a68696464656e3b0a202020202020202070616464696e673a3570782030203021696d706f7274616e743b0a20202020202020206d617267696e3a302030202d313570783b0a202020202020202077686974652d73706163653a6e6f726d616c0a202020207d0a202020202e622d73686172652d706f7075705f73686f775f666f726d5f6d61696c202e622d73686172652d706f7075705f5f666f726d5f6d61696c2c202e622d73686172652d706f7075705f73686f775f666f726d5f68746d6c202e622d73686172652d706f7075705f5f666f726d5f68746d6c2c202e622d73686172652d706f7075705f73686f775f666f726d202e622d73686172652d706f7075705f5f666f726d207b0a2020202020202020646973706c61793a626c6f636b0a202020207d0a202020202e622d73686172652d706f7075705f5f666f726d5f5f6c696e6b207b0a2020202020202020666f6e743a3836252f312e34353435656d2056657264616e612c2073616e732d73657269663b0a2020202020202020666c6f61743a6c6566743b0a2020202020202020646973706c61793a696e6c696e653b0a202020202020202070616464696e673a35707821696d706f7274616e743b0a20202020202020206d617267696e3a3020302035707820313070783b0a2020202020202020746578742d6465636f726174696f6e3a756e6465726c696e653b0a2020202020202020637572736f723a706f696e7465723b0a2020202020202020636f6c6f723a233161336463310a202020207d0a202020202e622d73686172652d706f7075705f5f666f726d5f5f627574746f6e207b0a2020202020202020666f6e743a3836252f312e34353435656d2056657264616e612c2073616e732d73657269663b0a2020202020202020666c6f61743a6c6566743b0a2020202020202020646973706c61793a696e6c696e653b0a20202020202020206d617267696e3a3570782030203020313570780a202020207d0a202020202e622d73686172652d706f7075705f5f666f726d5f5f636c6f7365207b0a2020202020202020666f6e743a3836252f312e34353435656d2056657264616e612c2073616e732d73657269663b0a2020202020202020666c6f61743a72696768743b0a2020202020202020646973706c61793a696e6c696e653b0a202020202020202070616464696e673a35707821696d706f7274616e743b0a20202020202020206d617267696e3a3020313070782035707820303b0a2020202020202020637572736f723a706f696e7465723b0a2020202020202020636f6c6f723a233939390a202020207d0a20202020612e622d73686172652d706f7075705f5f666f726d5f5f6c696e6b3a686f7665722c20612e622d73686172652d706f7075705f5f666f726d5f5f636c6f73653a686f766572207b0a2020202020202020746578742d6465636f726174696f6e3a756e6465726c696e653b0a2020202020202020636f6c6f723a234630300a202020207d0a202020202e622d73686172652d706f7075705f666f6e745f6669786564202e622d73686172652d706f7075705f5f6974656d207b0a2020202020202020666f6e742d73697a653a31322e3870780a202020207d0a202020202e622d73686172652d706f7075705f666f6e745f6669786564202e622d73686172652d706f7075705f5f6865616465722c202e622d73686172652d706f7075705f666f6e745f6669786564202e622d73686172652d706f7075705f5f696e7075742c202e622d73686172652d706f7075705f666f6e745f6669786564202e622d73686172652d706f7075705f5f657870616e646572202e622d73686172652d706f7075705f5f6974656d2c202e622d73686172652d706f7075705f666f6e745f6669786564202e622d73686172652d706f7075705f5f666f726d5f5f6c696e6b2c202e622d73686172652d706f7075705f666f6e745f6669786564202e622d73686172652d706f7075705f5f666f726d5f5f627574746f6e2c202e622d73686172652d706f7075705f666f6e745f6669786564202e622d73686172652d706f7075705f5f666f726d5f5f636c6f7365207b0a2020202020202020666f6e742d73697a653a313170780a202020207d0a202020202e622d73686172652d706f7075705f666f6e745f6669786564202e622d73686172652d706f7075705f5f79616e646578207b0a2020202020202020666f6e742d73697a653a313070780a202020207d0a202020202e622d73686172652d666f726d2d627574746f6e207b0a2020202020202020666f6e743a3836252f313770782056657264616e612c20417269616c2c2073616e732d73657269663b0a2020202020202020646973706c61793a2d6d6f7a2d696e6c696e652d626f783b0a2020202020202020646973706c61793a696e6c696e652d626c6f636b3b0a2020202020202020706f736974696f6e3a72656c61746976653b0a20202020202020206865696768743a313970783b0a20202020202020206d617267696e3a30203370783b0a202020202020202070616464696e673a30203470783b0a2020202020202020637572736f723a64656661756c743b0a202020202020202077686974652d73706163653a6e6f777261703b0a2020202020202020746578742d6465636f726174696f6e3a6e6f6e6521696d706f7274616e743b0a2020202020202020636f6c6f723a2330303021696d706f7274616e743b0a2020202020202020626f726465723a6e6f6e653b0a20202020202020206f75746c696e653a6e6f6e653b0a20202020202020206261636b67726f756e643a75726c28696e6465782f696d616765732f622d73686172652d666f726d2d627574746f6e2e706e67292030202d32307078207265706561742d780a202020207d0a202020202e622d73686172652d666f726d2d627574746f6e3a6c696e6b3a686f7665722c202e622d73686172652d666f726d2d627574746f6e3a766973697465643a686f766572207b0a2020202020202020636f6c6f723a2330303021696d706f7274616e740a202020207d0a202020202e622d73686172652d666f726d2d627574746f6e5f5f6265666f72652c202e622d73686172652d666f726d2d627574746f6e5f5f6166746572207b0a2020202020202020706f736974696f6e3a6162736f6c7574653b0a202020202020202077696474683a3370783b0a20202020202020206865696768743a313970783b0a20202020202020206261636b67726f756e643a75726c28696e6465782f696d616765732f622d73686172652d666f726d2d627574746f6e2e706e67290a202020207d0a202020202e622d73686172652d666f726d2d627574746f6e5f5f6265666f7265207b0a20202020202020206d617267696e2d6c6566743a2d3770780a202020207d0a202020202e622d73686172652d666f726d2d627574746f6e5f5f6166746572207b0a20202020202020206d617267696e2d6c6566743a3470783b0a20202020202020206261636b67726f756e642d706f736974696f6e3a2d33707820300a202020207d0a202020202e622d73686172652d666f726d2d627574746f6e3a3a2d6d6f7a2d666f6375732d696e6e6572207b0a2020202020202020626f726465723a6e6f6e650a202020207d0a20202020627574746f6e2e622d73686172652d666f726d2d627574746f6e202e622d73686172652d666f726d2d627574746f6e5f5f6265666f72652c20627574746f6e2e622d73686172652d666f726d2d627574746f6e202e622d73686172652d666f726d2d627574746f6e5f5f6166746572207b0a20202020202020206d617267696e2d746f703a2d3170780a202020207d0a20202020402d6d6f7a2d646f63756d656e742075726c2d7072656669782829207b0a2020202020202020627574746f6e2e622d73686172652d666f726d2d627574746f6e202e622d73686172652d666f726d2d627574746f6e5f5f6166746572207b0a2020202020202020202020206d617267696e2d746f703a2d3270783b0a2020202020202020202020206d617267696e2d6c6566743a3670780a20202020202020207d0a2020202020202020627574746f6e2e622d73686172652d666f726d2d627574746f6e202e622d73686172652d666f726d2d627574746f6e5f5f6265666f7265207b0a2020202020202020202020206d617267696e2d746f703a2d3270783b0a2020202020202020202020206d617267696e2d6c6566743a2d3970780a20202020202020207d0a202020207d0a202020205350414e2e622d73686172652d666f726d2d627574746f6e3a686f7665722c202e622d73686172652d666f726d2d627574746f6e5f73746174655f686f766572207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a30202d363070780a202020207d0a202020205350414e2e622d73686172652d666f726d2d627574746f6e3a686f766572202e622d73686172652d666f726d2d627574746f6e5f5f6265666f72652c202e622d73686172652d666f726d2d627574746f6e5f73746174655f686f766572202e622d73686172652d666f726d2d627574746f6e5f5f6265666f7265207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a30202d343070780a202020207d0a202020205350414e2e622d73686172652d666f726d2d627574746f6e3a686f766572202e622d73686172652d666f726d2d627574746f6e5f5f61667465722c202e622d73686172652d666f726d2d627574746f6e5f73746174655f686f766572202e622d73686172652d666f726d2d627574746f6e5f5f6166746572207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a2d337078202d343070780a202020207d0a202020202e622d73686172652d666f726d2d627574746f6e5f73746174655f707265737365642c202e622d73686172652d666f726d2d627574746f6e5f73746174655f70726573736564202e622d73686172652d666f726d2d627574746f6e5f7368617265207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a30202d313030707821696d706f7274616e740a202020207d0a202020202e622d73686172652d666f726d2d627574746f6e5f73746174655f70726573736564202e622d73686172652d666f726d2d627574746f6e5f5f6265666f7265207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a30202d3830707821696d706f7274616e740a202020207d0a202020202e622d73686172652d666f726d2d627574746f6e5f73746174655f70726573736564202e622d73686172652d666f726d2d627574746f6e5f5f6166746572207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a2d337078202d3830707821696d706f7274616e740a202020207d0a20202020627574746f6e2e622d73686172652d666f726d2d627574746f6e5f73746174655f70726573736564207b0a20202020202020206f766572666c6f773a76697369626c650a202020207d0a202020202e622d73686172652d666f726d2d627574746f6e5f69636f6e73207b0a2020202020202020706f736974696f6e3a72656c61746976653b0a202020202020202070616464696e673a303b0a20202020202020206261636b67726f756e642d706f736974696f6e3a30202d3230707821696d706f7274616e740a202020207d0a202020202e622d73686172652d666f726d2d627574746f6e5f69636f6e73202e622d73686172652d666f726d2d627574746f6e5f5f6265666f7265207b0a20202020202020206c6566743a303b0a20202020202020206d617267696e2d6c6566743a2d3370783b0a20202020202020206261636b67726f756e642d706f736974696f6e3a30203021696d706f7274616e740a202020207d0a202020202e622d73686172652d666f726d2d627574746f6e5f69636f6e73202e622d73686172652d666f726d2d627574746f6e5f5f6166746572207b0a20202020202020207a2d696e6465783a2d313b0a20202020202020206d617267696e2d6c6566743a303b0a20202020202020206261636b67726f756e642d706f736974696f6e3a2d337078203021696d706f7274616e740a202020207d0a202020202e622d73686172652d666f726d2d627574746f6e5f69636f6e73202e622d73686172655f5f68616e646c65207b0a202020202020202070616464696e673a32707821696d706f7274616e740a202020207d0a202020202e622d73686172652d666f726d2d627574746f6e5f69636f6e73202e622d73686172655f5f68616e646c655f6d6f7265207b0a2020202020202020706f736974696f6e3a72656c61746976653b0a202020202020202070616464696e672d72696768743a36707821696d706f7274616e743b0a20202020202020206d617267696e2d72696768743a2d3470780a202020207d0a202020202e622d73686172652d666f726d2d627574746f6e5f69636f6e73202e622d73686172652d69636f6e207b0a20202020202020206f7061636974793a2e353b0a20202020202020206261636b67726f756e642d696d6167653a75726c28696e6465782f696d616765732f622d73686172652d69636f6e5f73697a655f31342e706e67290a202020207d0a202020202e622d73686172652d666f726d2d627574746f6e5f69636f6e7320412e622d73686172655f5f68616e646c653a686f766572202e622d73686172652d69636f6e207b0a20202020202020206f7061636974793a310a202020207d0a202020202e622d7368617265207b0a2020202020202020666f6e743a3836252f312e34353435656d20417269616c2c2073616e732d73657269663b0a2020202020202020646973706c61793a2d6d6f7a2d696e6c696e652d626f783b0a2020202020202020646973706c61793a696e6c696e652d626c6f636b3b0a202020202020202070616464696e673a31707820337078203170782034707821696d706f7274616e743b0a2020202020202020766572746963616c2d616c69676e3a6d6964646c650a202020207d0a202020202e622d7368617265202e622d73686172652d666f726d2d627574746f6e207b0a2020202020202020666f6e742d73697a653a31656d0a202020207d0a202020202e622d73686172655f5f74657874202e622d73686172652d69636f6e207b0a20202020202020206d617267696e3a3020357078203020303b0a2020202020202020626f726465723a6e6f6e650a202020207d0a202020202e622d73686172655f5f74657874207b0a20202020202020206d617267696e2d72696768743a3570780a202020207d0a202020202e622d73686172655f5f68616e646c65207b0a2020202020202020666c6f61743a6c6566743b0a2020202020202020637572736f723a706f696e7465723b0a2020202020202020746578742d616c69676e3a6c6566743b0a2020202020202020746578742d6465636f726174696f6e3a6e6f6e6521696d706f7274616e743b0a20202020202020206865696768743a313670783b0a202020202020202070616464696e673a35707820337078203570782032707821696d706f7274616e743b0a2020202020202020637572736f723a706f696e7465723b0a2020202020202020746578742d616c69676e3a6c6566743b0a2020202020202020746578742d6465636f726174696f6e3a6e6f6e6521696d706f7274616e740a202020207d0a202020202e622d73686172655f5f68616e646c655f637572736f725f64656661756c74207b0a2020202020202020637572736f723a64656661756c74');
SELECT pg_catalog.lowrite(0, '\x0a202020207d0a202020202e622d73686172655f5f68616e646c65202e622d73686172652d666f726d2d627574746f6e207b0a20202020202020206d617267696e2d746f703a2d3270780a202020207d0a202020202e622d73686172655f5f6872207b0a2020202020202020646973706c61793a6e6f6e653b0a2020202020202020666c6f61743a6c6566743b0a202020202020202077696474683a3170783b0a20202020202020206865696768743a323670783b0a20202020202020206d617267696e3a30203370782030203270780a202020207d0a20202020612e622d73686172655f5f68616e646c653a686f766572202e622d73686172655f5f74657874207b0a2020202020202020746578742d6465636f726174696f6e3a756e6465726c696e653b0a2020202020202020636f6c6f723a234630300a202020207d0a202020202e622d73686172655f626f726465726564207b0a202020202020202070616464696e673a302032707820302033707821696d706f7274616e743b0a2020202020202020626f726465723a31707820736f6c696420236534653465343b0a20202020202020202d6d6f7a2d626f726465722d7261646975733a3570783b0a20202020202020202d7765626b69742d626f726465722d7261646975733a3570783b0a2020202020202020626f726465722d7261646975733a3570780a202020207d0a202020202e622d73686172655f626f726465726564202e622d73686172655f5f6872207b0a2020202020202020646973706c61793a696e6c696e653b0a20202020202020206261636b67726f756e643a236534653465340a202020207d0a202020202e622d73686172655f6c696e6b207b0a20202020202020206d617267696e3a2d38707820300a202020207d0a20202020612e622d73686172655f6c696e6b207b0a20202020202020206d617267696e3a300a202020207d0a202020202e622d73686172655f6c696e6b202e622d73686172655f5f74657874207b0a2020202020202020746578742d6465636f726174696f6e3a756e6465726c696e653b0a2020202020202020636f6c6f723a233161336463310a202020207d0a202020202e622d73686172652d666f726d2d627574746f6e5f7368617265207b0a202020202020202070616464696e672d6c6566743a3236707821696d706f7274616e743b0a2020202020202020766572746963616c2d616c69676e3a746f700a202020207d0a202020202e622d73686172652d666f726d2d627574746f6e5f7368617265202e622d73686172652d666f726d2d627574746f6e5f5f6265666f7265207b0a20202020202020206d617267696e2d6c6566743a2d323970780a202020207d0a202020202e622d73686172652d666f726d2d627574746f6e5f7368617265202e622d73686172652d666f726d2d627574746f6e5f5f69636f6e207b0a2020202020202020706f736974696f6e3a6162736f6c7574653b0a202020202020202077696474683a323070783b0a20202020202020206865696768743a313770783b0a20202020202020206d617267696e3a31707820302030202d323370783b0a20202020202020206261636b67726f756e643a75726c28696e6465782f696d616765732f622d73686172652d666f726d2d627574746f6e5f73686172655f5f69636f6e2e706e672920302030206e6f2d7265706561740a202020207d0a202020202e622d73686172652d70736575646f2d6c696e6b207b0a2020202020202020626f726465722d626f74746f6d3a31707820646f747465643b0a2020202020202020637572736f723a706f696e7465723b0a2020202020202020746578742d6465636f726174696f6e3a6e6f6e6521696d706f7274616e740a202020207d0a202020202e622d73686172655f666f6e745f6669786564207b0a2020202020202020666f6e742d73697a653a313170780a202020207d0a202020202e622d73686172655f5f68616e646c655f6d6f7265207b0a2020202020202020666f6e742d73697a653a3970783b0a20202020202020206d617267696e2d746f703a2d3170783b0a2020202020202020636f6c6f723a233762376237620a202020207d0a20202020412e622d73686172655f5f68616e646c655f6d6f72653a686f766572207b0a2020202020202020636f6c6f723a233030300a202020207d0a202020202e622d73686172655f5f67726f7570207b0a2020202020202020666c6f61743a6c6566740a202020207d0a202020202e622d73686172652d69636f6e207b0a2020202020202020666c6f61743a6c6566743b0a2020202020202020646973706c61793a696e6c696e653b0a20202020202020206f766572666c6f773a68696464656e3b0a202020202020202077696474683a313670783b0a20202020202020206865696768743a313670783b0a202020202020202070616464696e673a3021696d706f7274616e743b0a2020202020202020766572746963616c2d616c69676e3a746f703b0a2020202020202020626f726465723a303b0a20202020202020206261636b67726f756e643a75726c28696e6465782f696d616765732f622d73686172652d69636f6e2e706e672920302039397078206e6f2d7265706561740a202020207d0a202020202e622d73686172652d69636f6e5f766b6f6e74616b74652c202e622d73686172652d69636f6e5f637573746f6d207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a3020300a202020207d0a202020202e622d73686172652d69636f6e5f796172752c202e622d73686172652d69636f6e5f796172755f70686f746f2c202e622d73686172652d69636f6e5f796172755f776973686c697374207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a30202d313770780a202020207d0a202020202e622d73686172652d69636f6e5f6c6a207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a30202d333470780a202020207d0a202020202e622d73686172652d69636f6e5f74776974746572207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a30202d353170780a202020207d0a202020202e622d73686172652d69636f6e5f66616365626f6f6b207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a30202d363870780a202020207d0a202020202e622d73686172652d69636f6e5f6d6f696d6972207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a30202d383570780a202020207d0a202020202e622d73686172652d69636f6e5f667269656e6466656564207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a30202d31303270780a202020207d0a202020202e622d73686172652d69636f6e5f6d61696c207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a30202d31313970780a202020207d0a202020202e622d73686172652d69636f6e5f68746d6c207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a30202d31333670780a202020207d0a202020202e622d73686172652d69636f6e5f706f737463617264207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a30202d31353370780a202020207d0a202020202e622d73686172652d69636f6e5f6f646e6f6b6c6173736e696b69207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a30202d31373070780a202020207d0a202020202e622d73686172652d69636f6e5f626c6f67676572207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a30202d31383770780a202020207d0a202020202e622d73686172652d69636f6e5f67726561646572207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a30202d32303470780a202020207d0a202020202e622d73686172652d69636f6e5f64656c6963696f7573207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a30202d32323170780a202020207d0a202020202e622d73686172652d69636f6e5f6762757a7a207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a30202d32333870780a202020207d0a202020202e622d73686172652d69636f6e5f6c696e6b6564696e207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a30202d32353570780a202020207d0a202020202e622d73686172652d69636f6e5f6d797370616365207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a30202d32373270780a202020207d0a202020202e622d73686172652d69636f6e5f657665726e6f7465207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a30202d32383970780a202020207d0a202020202e622d73686172652d69636f6e5f64696767207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a30202d33303670780a202020207d0a202020202e622d73686172652d69636f6e5f6a7569636b207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a30202d33323470780a202020207d0a202020202e622d73686172652d69636f6e5f6d6f696b727567207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a30202d33343170780a202020207d0a202020202e622d73686172652d69636f6e5f79617a616b6c61646b69207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a30202d33353870780a202020207d0a202020202e622d73686172652d69636f6e5f6c697665696e7465726e6574207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a30202d33373570780a202020207d0a202020202e622d73686172652d69636f6e5f7475746279207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a30202d33393270780a202020207d0a202020202e622d73686172652d69636f6e5f6469617279207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a30202d34303970780a202020207d0a202020202e622d73686172652d69636f6e5f67706c7573207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a30202d34323670780a202020207d0a202020202e622d73686172652d69636f6e5f706f636b6574207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a30202d34343370780a202020207d0a202020202e622d73686172652d69636f6e5f73757266696e6762697264207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a30202d34363070780a202020207d0a202020202e622d73686172652d69636f6e5f70696e746572657374207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a30202d34373770780a202020207d0a202020202e622d73686172655f7468656d655f6461726b202e622d73686172652d69636f6e207b0a20202020202020206261636b67726f756e643a75726c28696e6465782f696d616765732f622d73686172652d69636f6e735f5f7468656d655f6461726b2e706e672920393970782030206e6f2d7265706561740a202020207d0a202020202e622d73686172655f7468656d655f6461726b202e622d73686172652d69636f6e5f6f646e6f6b6c6173736e696b69207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a2d347078202d3370780a202020207d0a202020202e622d73686172655f7468656d655f6461726b202e622d73686172652d69636f6e5f766b6f6e74616b7465207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a2d32347078202d3370780a202020207d0a202020202e622d73686172655f7468656d655f6461726b202e622d73686172652d69636f6e5f74776974746572207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a2d34347078202d3370780a202020207d0a202020202e622d73686172655f7468656d655f6461726b202e622d73686172652d69636f6e5f66616365626f6f6b207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a2d36347078202d3370780a202020207d0a202020202e622d73686172655f7468656d655f6461726b202e622d73686172652d69636f6e5f6c6a207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a2d38357078202d3370780a202020207d0a202020202e622d73686172655f7468656d655f6461726b202e622d73686172652d69636f6e5f79617275207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a2d3130357078202d3370780a202020207d0a202020202e622d73686172655f7468656d655f6461726b202e622d73686172652d706f707570202e622d73686172652d69636f6e5f6f646e6f6b6c6173736e696b692c202e622d73686172655f7468656d655f6461726b202e622d73686172652d69636f6e5f6f646e6f6b6c6173736e696b693a686f766572207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a2d347078202d323870780a202020207d0a202020202e622d73686172655f7468656d655f6461726b202e622d73686172652d706f707570202e622d73686172652d69636f6e5f766b6f6e74616b74652c202e622d73686172655f7468656d655f6461726b202e622d73686172652d69636f6e5f766b6f6e74616b74653a686f766572207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a2d32347078202d323870780a202020207d0a202020202e622d73686172655f7468656d655f6461726b202e622d73686172652d706f707570202e622d73686172652d69636f6e5f747769747465722c202e622d73686172655f7468656d655f6461726b202e622d73686172652d69636f6e5f747769747465723a686f766572207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a2d34347078202d323870780a202020207d0a202020202e622d73686172655f7468656d655f6461726b202e622d73686172652d706f707570202e622d73686172652d69636f6e5f66616365626f6f6b2c202e622d73686172655f7468656d655f6461726b202e622d73686172652d69636f6e5f66616365626f6f6b3a686f766572207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a2d36347078202d323870780a202020207d0a202020202e622d73686172655f7468656d655f6461726b202e622d73686172652d706f707570202e622d73686172652d69636f6e5f6c6a2c202e622d73686172655f7468656d655f6461726b202e622d73686172652d69636f6e5f6c6a3a686f766572207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a2d38357078202d323870780a202020207d0a202020202e622d73686172655f7468656d655f6461726b202e622d73686172652d706f707570202e622d73686172652d69636f6e5f796172752c202e622d73686172655f7468656d655f6461726b202e622d73686172652d69636f6e5f796172753a686f766572207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a2d3130357078202d323870780a202020207d0a202020202e622d73686172655f7468656d655f6461726b202e622d73686172655f5f74657874207b0a2020202020202020636f6c6f723a236666660a202020207d0a202020202e622d73686172655f7468656d655f6461726b202e622d73686172652d666f726d2d627574746f6e5f7368617265202e622d73686172652d666f726d2d627574746f6e5f5f69636f6e207b0a20202020202020206261636b67726f756e642d696d6167653a75726c2822696e6465782f696d616765732f622d73686172652d666f726d2d627574746f6e5f73686172655f5f69636f6e5f6461726b2e706e6722290a202020207d0a202020202e622d73686172655f7468656d655f6461726b202e622d73686172652d666f726d2d627574746f6e207b0a2020202020202020636f6c6f723a2366666621696d706f7274616e743b0a20202020202020206f7061636974793a2e380a202020207d0a202020202e622d73686172655f7468656d655f6461726b202e622d73686172655f5f68616e646c653a686f766572202e622d73686172652d666f726d2d627574746f6e2c202e622d73686172655f7468656d655f6461726b202e622d73686172652d666f726d2d627574746f6e3a686f766572207b0a20202020202020206f7061636974793a313b0a2020202020202020637572736f723a706f696e7465720a202020207d0a202020202e622d73686172655f7468656d655f6461726b202e622d73686172652d666f726d2d627574746f6e2c202e622d73686172655f7468656d655f6461726b202e622d73686172652d666f726d2d627574746f6e5f5f6265666f72652c202e622d73686172655f7468656d655f6461726b202e622d73686172652d666f726d2d627574746f6e5f5f6166746572207b0a20202020202020206261636b67726f756e643a7472616e73706172656e740a202020207d0a202020202e622d73686172655f7468656d655f6461726b202e622d73686172652d706f7075705f5f69207b0a20202020202020206261636b67726f756e642d636f6c6f723a233333333b0a2020202020202020626f726465722d7261646975733a313070783b0a20202020202020202d7765626b69742d626f782d736861646f773a3020327078203970782072676261283235352c203235352c203235352c20302e36293b0a20202020202020202d6d6f7a2d626f782d736861646f773a3020327078203970782072676261283235352c203235352c203235352c20302e36293b0a2020202020202020626f782d736861646f773a3020327078203970782072676261283235352c203235352c203235352c20302e36290a202020207d0a202020202e622d73686172655f7468656d655f6461726b202e622d73686172655f5f74657874207b0a2020202020202020636f6c6f723a234141410a202020207d0a202020202e622d73686172655f7468656d655f6461726b202e622d73686172652d706f707570207b0a2020202020202020636f6c6f723a234141413b0a2020202020202020626f726465722d7261646975733a313070783b0a20202020202020206261636b67726f756e642d636f6c6f723a233333333b0a20202020202020206261636b67726f756e642d636f6c6f723a726762612835302c2035302c2035302c20302e33290a202020207d0a202020202e622d73686172655f7468656d655f6461726b202e622d73686172652d706f7075705f5f6974656d207b0a20202020202020206261636b67726f756e643a7472616e73706172656e743b0a2020202020202020636f6c6f723a236363630a202020207d0a202020202e622d73686172655f7468656d655f6461726b202e622d73686172652d706f707570202e622d73686172652d706f7075705f5f6974656d5f5f74657874207b0a2020202020202020636f6c6f723a236363630a202020207d0a202020202e622d73686172655f7468656d655f636f756e746572202e622d73686172652d69636f6e207b0a20202020202020206261636b67726f756e643a75726c28696e6465782f696d616765732f622d73686172652d69636f6e735f5f7468656d655f636f756e7465722e706e672920393970782030206e6f2d7265706561743b0a2020202020202020646973706c61793a626c6f636b3b0a2020202020202020666c6f61743a6c6566743b0a202020202020202077696474683a323870783b0a20202020202020206865696768743a323670783b0a20202020202020206d617267696e3a303b0a202020202020202070616464696e673a303b0a20202020202020206261636b67726f756e642d706f736974696f6e3a3939707820303b0a2020202020202020626f726465722d7261646975733a3470783b0a20202020202020202d6d6f7a2d626f726465722d7261646975733a3470783b0a20202020202020202d7765626b69742d626f726465722d7261646975733a3470783b0a20202020202020202d6b68746d6c2d626f726465722d7261646975733a3470783b0a20202020202020207a2d696e6465783a2d310a202020207d0a202020202e622d73686172655f7468656d655f636f756e746572202e622d73686172655f5f6c696e6b207b0a2020202020202020646973706c61793a696e6c696e652d626c6f636b3b0a20202020202020206261636b67726f756e643a6c69676874677265793b0a20202020202020206d617267696e3a303b0a202020202020202070616464696e673a3021696d706f7274616e743b0a2020202020202020626f726465722d7261646975733a3470783b0a20202020202020202d6d6f7a2d626f726465722d7261646975733a3470783b0a20202020202020202d7765626b69742d626f726465722d7261646975733a3470783b0a20202020202020202d6b68746d6c2d626f726465722d7261646975733a3470783b0a2020202020202020706f736974696f6e3a72656c61746976653b0a2020202020202020746578742d6465636f726174696f6e3a6e6f6e653b0a2020202020202020626f726465722d746f703a31707820736f6c696420236330633063303b0a2020202020202020626f726465722d626f74746f6d3a31707820736f6c696420236330633063303b0a2020202020202020626f782d736861646f773a30203170782032707820233930393039303b0a20202020202020206865696768743a6175746f3b0a20202020202020207a2d696e6465783a300a202020207d0a202020202e622d73686172655f7468656d655f636f756e74657220613a616374697665207b0a2020202020202020626f726465722d626f74746f6d3a303b0a2020202020202020626f726465722d746f703a31707820736f6c696420236330633063303b0a20202020202020206f7061636974793a2e373b0a202020202020202066696c7465723a616c706861286f7061636974793d3730290a202020207d0a202020202e622d73686172655f7468656d655f636f756e746572202e622d73686172652d62746e5f5f766b6f6e74616b74652c202e622d73686172655f7468656d655f636f756e746572202e622d73686172652d62746e5f5f766b6f6e74616b74653a686f766572202e622d73686172652d69636f6e207b0a20202020202020206261636b67726f756e642d636f6c6f723a233462373761323b0a2020202020202020626f726465722d626f74746f6d2d636f6c6f723a233364363138393b0a2020202020202020626f726465722d746f702d636f6c6f723a233537383061380a202020207d0a202020202e622d73686172655f7468656d655f636f756e746572202e622d73686172652d62746e5f5f766b6f6e74616b74653a616374697665207b0a2020202020202020626f726465722d746f702d636f6c6f723a233364363138390a202020207d0a202020202e622d73686172655f7468656d655f636f756e746572202e622d73686172652d69636f6e5f766b6f6e74616b7465207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a2d327078202d333270780a202020207d0a202020202e622d73686172655f7468656d655f636f756e746572202e622d73686172652d62746e5f5f747769747465722c202e622d73686172655f7468656d655f636f756e746572202e622d73686172652d62746e5f5f747769747465723a686f766572202e622d73686172652d69636f6e207b0a20202020202020206261636b67726f756e642d636f6c6f723a233030616665653b0a2020202020202020626f726465722d626f74746f6d2d636f6c6f723a233030393664333b0a2020202020202020626f726465722d746f702d636f6c6f723a233066623565660a202020207d0a202020202e622d73686172655f7468656d655f636f756e746572202e622d73686172652d62746e5f5f747769747465723a616374697665207b0a2020202020202020626f726465722d746f702d636f6c6f723a233030393664330a202020207d0a202020202e622d73686172655f7468656d655f636f756e746572202e622d73686172652d69636f6e5f74776974746572207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a2d327078202d393870780a202020207d0a202020202e622d73686172655f7468656d655f636f756e746572202e622d73686172652d62746e5f5f796172752c202e622d73686172655f7468656d655f636f756e746572202e622d73686172652d62746e5f5f796172753a686f766572202e622d73686172652d69636f6e207b0a20202020202020206261636b67726f756e642d636f6c6f723a236264626462643b0a2020202020202020626f726465722d626f74746f6d2d636f6c6f723a236135613561353b0a2020202020202020626f726465722d746f702d636f6c6f723a236332633263320a202020207d0a202020202e622d73686172655f7468656d655f636f756e746572202e622d73686172652d62746e5f5f796172753a616374697665207b0a2020202020202020626f726465722d746f702d636f6c6f723a236135613561350a202020207d0a202020202e622d73686172655f7468656d655f636f756e746572202e622d73686172652d69636f6e5f79617275207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a2d327078203170780a202020207d0a202020202e622d73686172655f7468656d655f636f756e746572202e622d73686172652d62746e5f5f667269656e64666565642c202e622d73686172655f7468656d655f636f756e746572202e622d73686172652d62746e5f5f667269656e64666565643a686f766572202e622d73686172652d69636f6e207b0a20202020202020206261636b67726f756e642d636f6c6f723a233637376663383b0a2020202020202020626f726465722d626f74746f6d2d636f6c6f723a233463363661663b0a2020202020202020626f726465722d746f702d636f6c6f723a233663383463640a202020207d0a202020202e622d73686172655f7468656d655f636f756e746572202e622d73686172652d62746e5f5f667269656e64666565643a616374697665207b0a2020202020202020626f726465722d746f702d636f6c6f723a233463363661660a202020207d0a202020202e622d73686172655f7468656d655f636f756e746572202e622d73686172652d69636f6e5f667269656e6466656564207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a2d327078202d32333070780a202020207d0a202020202e622d73686172655f7468656d655f636f756e746572202e622d73686172652d62746e5f5f6c6a2c202e622d73686172655f7468656d655f636f756e746572202e622d73686172652d62746e5f5f6c6a3a686f766572202e622d73686172652d69636f6e207b0a20202020202020206261636b67726f756e642d636f6c6f723a233433376163373b0a2020202020202020626f726465722d626f74746f6d2d636f6c6f723a233362373262663b0a2020202020202020626f726465722d746f702d636f6c6f723a233535386364390a202020207d0a202020202e622d73686172655f7468656d655f636f756e746572202e622d73686172652d62746e5f5f6c6a3a616374697665207b0a2020202020202020626f726465722d746f702d636f6c6f723a233362373262660a202020207d0a202020202e622d73686172655f7468656d655f636f756e746572202e622d73686172652d69636f6e5f6c6a207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a2d327078202d31393770780a202020207d0a202020202e622d73686172655f7468656d655f636f756e746572202e622d73686172652d62746e5f5f6f646e6f6b6c6173736e696b692c202e622d73686172655f7468656d655f636f756e746572202e622d73686172652d62746e5f5f6f646e6f6b6c6173736e696b693a686f766572202e622d73686172652d69636f6e207b0a20202020202020206261636b67726f756e642d636f6c6f723a236666613235303b0a2020202020202020626f726465722d626f74746f6d2d636f6c6f723a236534386134313b0a2020202020202020626f726465722d746f702d636f6c6f723a236666613935620a202020207d0a202020202e622d73686172655f7468656d655f636f756e746572202e622d73686172652d62746e5f5f6f646e6f6b6c6173736e696b693a616374697665207b0a2020202020202020626f726465722d746f702d636f6c6f723a236534386134310a202020207d0a202020202e622d73686172655f7468656d655f636f756e746572202e622d73686172652d69636f6e5f6f646e6f6b6c6173736e696b69207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a2d327078202d31333170780a202020207d0a202020202e622d73686172655f7468656d655f636f756e746572202e622d73686172652d62746e5f5f6d6f696b7275672c202e622d73686172655f7468656d655f636f756e746572202e622d73686172652d62746e5f5f6d6f696b7275673a686f766572202e622d73686172652d69636f6e207b0a20202020202020206261636b67726f756e642d636f6c6f723a233665623065343b0a2020202020202020626f726465722d626f74746f6d2d636f6c6f723a233636613864633b0a2020202020202020626f726465722d746f702d636f6c6f723a233830633266360a202020207d0a202020202e622d73686172655f7468656d655f636f756e746572202e622d73686172652d62746e5f5f6d6f696b7275673a616374697665207b0a2020202020202020626f726465722d746f702d636f6c6f723a233636613864630a202020207d0a202020202e622d73686172655f7468656d655f636f756e746572202e622d73686172652d69636f6e5f6d6f696b727567207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a2d327078202d32363370780a202020207d0a202020202e622d73686172655f7468656d655f636f756e746572202e622d73686172652d62746e5f5f6d6f696d69722c202e622d73686172655f7468656d655f636f756e746572202e622d73686172652d62746e5f5f6d6f696d69723a686f766572202e622d73686172652d69636f6e207b0a20202020202020206261636b67726f756e642d636f6c6f723a233233373362613b0a2020202020202020626f726465722d626f74746f6d2d636f6c6f723a233164356561313b0a2020202020202020626f726465722d746f702d636f6c6f723a233331376362660a202020207d0a202020202e622d73686172655f7468656d655f636f756e746572202e622d73686172652d62746e5f5f6d6f696d69723a616374697665207b0a2020202020202020626f726465722d746f702d636f6c6f723a233164356561310a202020207d0a202020202e622d73686172655f7468656d655f636f756e746572202e622d73686172652d69636f6e5f6d6f696d6972207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a2d327078202d31363470780a202020207d0a202020202e622d73686172655f7468656d655f636f756e746572202e622d73686172652d62746e5f5f66616365626f6f6b2c202e622d73686172655f7468656d655f636f756e746572202e622d73686172652d62746e5f5f66616365626f6f6b3a686f766572202e622d73686172652d69636f6e207b0a20202020202020206261636b67726f756e642d636f6c6f723a233365356539633b0a2020202020202020626f726465722d626f74746f6d2d636f6c6f723a233333346438333b0a2020202020202020626f726465722d746f702d636f6c6f723a233461363861330a202020207d0a202020202e622d73686172655f7468656d655f636f756e746572202e622d73686172652d62746e5f5f66616365626f6f6b3a616374697665207b0a2020202020202020626f726465722d746f702d636f6c6f723a233333346438330a202020207d0a202020202e622d73686172655f7468656d655f636f756e746572202e622d73686172652d69636f6e5f66616365626f6f6b207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a2d327078202d363570780a202020207d0a202020202e622d73686172655f7468656d655f636f756e746572202e622d73686172652d62746e5f5f67706c75732c202e622d73686172655f7468656d655f636f756e746572202e622d73686172652d62746e5f5f67706c75733a686f766572202e622d73686172652d69636f6e207b0a20202020202020206261636b67726f756e642d636f6c6f723a236334353533363b0a2020202020202020626f726465722d626f74746f6d2d636f6c6f723a236162343632643b0a2020202020202020626f726465722d746f702d636f6c6f723a236338363034330a202020207d0a202020202e622d73686172655f7468656d655f636f756e746572202e622d73686172652d62746e5f5f67706c75733a616374697665207b0a2020202020202020626f726465722d746f702d636f6c6f723a236162343632640a202020207d0a202020202e622d73686172655f7468656d655f636f756e746572202e622d73686172652d69636f6e5f67706c7573207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a2d327078202d32393670780a202020207d0a202020202e622d73686172652d636f756e746572207b0a2020202020202020646973706c61793a6e6f6e650a202020207d0a202020202e622d73686172652d62746e5f5f636f756e746572202e622d73686172652d636f756e746572207b0a2020202020202020646973706c61793a626c6f636b0a202020207d0a202020202e622d73686172655f7468656d655f636f756e746572202e622d73686172652d636f756e746572207b0a2020202020202020666c6f61743a6c6566743b0a20202020202020206d617267696e3a327078203470783b0a202020202020202070616464696e673a303b0a2020202020202020666f6e742d73697a653a313470783b0a20202020202020206c696e652d6865696768743a313870783b0a2020202020202020636f6c6f723a77686974653b0a202020202020202070616464696e673a327078203470783b0a2020202020202020746578742d6465636f726174696f6e3a6e6f6e6521696d706f7274616e740a202020207d0a202020202e622d73686172652d62746e5f5f77726170207b0a20202020202020206261636b67726f756e643a7267626128302c20302c20302c202e37293b0a2020202020202020646973706c61793a696e6c696e652d626c6f636b3b0a20202020202020206865696768743a6175746f3b0a20202020202020206d617267696e3a30203470783b0a202020202020202070616464696e673a303b0a2020202020202020626f726465722d7261646975733a3470783b0a20202020202020202d6d6f7a2d626f726465722d7261646975733a3470783b0a20202020202020202d7765626b69742d626f726465722d7261646975733a3470783b0a20202020202020202d6b68746d6c2d626f726465722d7261646975733a3470780a202020207d0a202020202e622d73686172655f7468656d655f636f756e746572202e622d73686172655f5f6c696e6b3a686f766572202e622d73686172652d69636f6e3a6166746572207b0a20202020202020206261636b67726f756e642d636f6c6f723a696e68657269743b0a20202020202020206261636b67726f756e642d696d6167653a6e6f6e653b0a20202020202020205f6261636b67726f756e642d636f6c6f723a7472616e73706172656e743b0a2020202020202020636f6e74656e743a22223b0a2020202020202020646973706c61793a626c6f636b3b0a20202020202020205f646973706c61793a6e6f6e653b0a20202020202020206f7061636974793a2e323b0a202020202020202066696c7465723a616c706861286f7061636974793d3230293b0a2020202020202020706f736974696f6e3a6162736f6c7574653b0a202020202020202077696474683a323670783b0a2020202020202020626f74746f6d3a303b0a20202020202020206c6566743a303b0a20202020202020206865696768743a3530250a202020207d0a202020202e622d73686172655f7468656d655f636f756e746572202e622d73686172655f747970655f736d616c6c202e622d73686172655f5f6c696e6b3a686f766572202e622d73686172652d69636f6e3a6166746572207b0a202020202020202077696474683a313870780a202020207d0a202020202e622d73686172655f7468656d655f636f756e746572202e622d73686172655f747970655f736d616c6c202e622d73686172652d69636f6e207b0a20202020202020206261636b67726f756e642d696d6167653a75726c28696e6465782f696d616765732f622d73686172652d736d616c6c2d636f756e7465722d69636f6e732e706e67293b0a202020202020202077696474683a323070783b0a20202020202020206865696768743a313870783b0a2020202020202020626f726465722d7261646975733a3370783b0a20202020202020202d6d6f7a2d626f726465722d7261646975733a3370783b0a20202020202020202d7765626b69742d626f726465722d7261646975733a3370783b0a20202020202020202d6b68746d6c2d626f726465722d7261646975733a3370780a202020207d0a202020202e622d73686172655f7468656d655f636f756e746572202e622d73686172655f5f6c696e6b207b0a2020202020202020626f726465722d7261646975733a3370783b0a20202020202020202d6d6f7a2d626f726465722d7261646975733a3370783b0a20202020202020202d7765626b69742d626f726465722d7261646975733a3370783b0a20202020202020202d6b68746d6c2d626f726465722d7261646975733a3370780a202020207d0a202020202e622d73686172655f7468656d655f636f756e746572202e622d73686172655f747970655f736d616c6c202e622d73686172652d636f756e746572207b0a2020202020202020666f6e742d73697a653a313170783b0a2020202020202020666f6e742d73697a653a31302e3570783b0a202020202020202070616464696e673a327078203020303b0a20202020202020206d617267696e3a327078203470783b0a20202020202020206c696e652d6865696768743a313070783b0a20202020202020205f70616464696e672d746f703a312e3570780a202020207d0a202020203c2f7374796c653e0a202020203c7374796c6520747970653d22746578742f637373223e3c2f7374796c653e0a093c736372697074206c616e67756167653d226a61766173637269707422207372633d22636f6d6d6f6e2e6a73223e3c2f7363726970743e0a093c736372697074206c616e67756167653d226a61766173637269707422207372633d226a71756572792e6a73223e3c2f7363726970743e0a093c736372697074206c616e67756167653d226a61766173637269707422207372633d226a71756572792e636f6f6b69652e6a73223e3c2f7363726970743e0a093c736372697074206c616e67756167653d226a617661736372697074223e0a090966756e6374696f6e20697356616c696428297b0a0909202069662028646f63756d656e742e676574456c656d656e744279496428226c6f67696e22292e76616c7565203d3d206e756c6c207c7c20646f63756d656e742e676574456c656d656e744279496428226c6f67696e22292e76616c75652e6c656e677468203d3d2030297b0a090909616c6572742822456e746572206c6f67696e22293b0a090909646f63756d656e742e676574456c656d656e744279496428226c6f67696e22292e666f63757328293b0a09090972657475726e2066616c73653b0a090920207d0a0909202069662028646f63756d656e742e676574456c656d656e744279496428227073776422292e76616c7565203d3d206e756c6c207c7c20646f63756d656e742e676574456c656d656e744279496428227073776422292e76616c75652e6c656e677468203d3d2030297b0a090909616c6572742822456e7465722070617373776f726422293b0a090909646f63756d656e742e676574456c656d656e744279496428227073776422292e666f63757328293b0a09090972657475726e2066616c73653b0a090920207d0a0909202072657475726e20747275653b0a09097d0a0a0909766172206c6f63616c655f736572766c6574203d2022656e223b0a090976617220627574746f6e55524c203d2022696e6465782f696d616765732f656e7465722f656e7465722e72752e706e67223b0a090976617220627574746f6e5072657373656455524c203d2022696e6465782f696d616765732f656e7465722f656e7465722e72752e707265737365642e706e67223b0a0a090966756e6374696f6e2072656164436f6f6b6965286e616d6529207b0a09092020766172206e616d654551203d206e616d65202b20223d223b0a09092020766172206361203d20646f63756d656e742e636f6f6b69652e73706c697428273b27293b0a09092020666f722876617220693d303b69203c2063612e6c656e6774683b692b2b29207b0a09092020207661722063203d2063615b695d3b0a09092020207768696c652028632e6368617241742830293d3d272027292063203d20632e737562737472696e6728312c632e6c656e677468293b0a090920202069662028632e696e6465784f66286e616d65455129203d3d2030292072657475726e20632e737562737472696e67286e616d6545512e6c656e6774682c632e6c656e677468293b0a0909207d0a09092072657475726e206e756c6c3b0a092020207d0a092020200a0920202066756e6374696f6e207573654c6f63616c6528297b0a0a0909766172206c6f63616c655f636f6f6b6965203d2072656164436f6f6b696528226d616e6167656d656e745f6c6f63616c6522293b0a0a090909097472797b0a090909090972755374796c65203d20226c696e6b223b0a09090909096b7a5374796c65203d20226c696e6b223b0a0909090909656e5374796c65203d20226c696e6b223b0a090909090969662028216c6f63616c655f636f6f6b6965297b0a0909090909096c6f63616c655f636f6f6b6965203d206c6f63616c655f736572766c65743b0a09090909097d0a0909090909696620286c6f63616c655f636f6f6b6965203d3d20226b7a22297b0a0909090909096b7a5374796c65203d20226c696e6b53656c6563746564223b0a090909090909627574746f6e55524c203d2022696e6465782f696d616765732f656e7465722f656e7465722e6b7a2e706e67223b0a090909090909627574746f6e5072657373656455524c203d2022696e6465782f696d616765732f656e7465722f656e7465722e6b7a2e707265737365642e706e67223b0a0909090909092f2f646f63756d656e742e676574456c656d656e744279496428226b7a5f696d6722292e737263203d2022696e6465782f696d616765732f6c6f67696e2f6b617a2e6a7067223b0a09090909097d20656c736520696620286c6f63616c655f636f6f6b6965203d3d2022656e22297b0a090909090909656e5374796c65203d20226c696e6b53656c6563746564223b0a090909090909627574746f6e55524c203d2022696e6465782f696d616765732f656e7465722f656e7465722e656e2e706e67223b0a090909090909627574746f6e5072657373656455524c203d2022696e6465782f696d616765732f656e7465722f656e7465722e656e2e707265737365642e706e67223b0a09090909097d20656c7365207b0a09090909090972755374796c65203d20226c696e6b53656c6563746564223b0a09090909097d0a090909097d6361746368202865297b0a0909090909616c6572742865293b0a090909097d0a0920207d0a0a09202066756e6374696f6e20666f6c6c6f774c696e6b286c6f63297b0a09096e6577436f6f6b696528226d616e6167656d656e745f6c6f63616c65222c206c6f632c2030293b0a090977696e646f772e6c6f636174696f6e203d20223f6c6f63616c653d222b6c6f633b0a0920207d');
SELECT pg_catalog.lowrite(0, '\x0a0a09202066756e6374696f6e2064697361626c65506c616365686f6c6465722865297b0a0909652e72656d6f76654174747269627574652822706c616365486f6c64657222293b0a0920207d0a09202066756e6374696f6e20656e61626c65506c616365686f6c64657228652c2073297b0a0909652e7365744174747269627574652822706c616365486f6c646572222c2073293b0a0920207d0a093c2f7363726970743e0a3c2f686561643e0a0a3c626f647920636c6173733d226d61696e5f70616765207061747465726e5f62672022207374796c653d227a6f6f6d3a20313b223e0a0a202020203c64697620636c6173733d22736861646f775f746f70223e0a20202020202020203c64697620636c6173733d226d61696e5f666c61675f6267223e0a2020202020202020202020203c64697620636c6173733d22636f6e7461696e6572223e0a202020202020202020202020202020203c64697620636c6173733d22636f6e7461696e65722d666c756964223e0a20202020202020202020202020202020202020203c64697620636c6173733d2277686974655f6c696e6b20726f775f666c756964223e0a2020202020202020202020202020202020202020202020203c756c20636c6173733d22696e6c696e65206c616e67223e0a202020202020202020202020202020202020202020202020202020203c6c693e3c612069643d226c616e675f6b617a2220687265663d222322206f6e636c69636b3d22666f6c6c6f774c696e6b28276b7a2729222072656c3d226e6f666f6c6c6f772220636c6173733d2262746e2062746e2d6d696e692062746e2d7072696d617279223e3c7370616e20636c6173733d226c73223ed29ad0b0d0b73c2f7370616e3e3c2f613e3c2f6c693e0a202020202020202020202020202020202020202020202020202020203c6c693e3c612069643d226c616e675f7275732220687265663d222322206f6e636c69636b3d22666f6c6c6f774c696e6b2827727527292220636c6173733d2262746e2062746e2d6d696e692062746e2d7072696d617279223e3c7370616e20636c6173733d226c73223ed0a0d183d1813c2f7370616e3e3c2f613e3c2f6c693e0a202020202020202020202020202020202020202020202020202020203c6c693e3c612069643d226c616e675f656e672220687265663d222322206f6e636c69636b3d22666f6c6c6f774c696e6b2827656e27292220636c6173733d2262746e2062746e2d6d696e692062746e2d7072696d617279223e3c7370616e20636c6173733d226c73223e456e673c2f7370616e3e3c2f613e3c2f6c693e0a2020202020202020202020202020202020202020202020203c2f756c3e0a2020202020202020202020202020202020202020202020203c64697620636c6173733d226c6f676f223e0a202020202020202020202020202020202020202020202020202020203c6120687265663d2223223e0a20202020202020202020202020202020202020202020202020202020202020203c696d6720636c6173733d226c6f676f5f696d61676522207372633d22696e6465782f696d616765732f6269675f6c6f676f2e706e67223e0a202020202020202020202020202020202020202020202020202020203c2f613e0a0a202020202020202020202020202020202020202020202020202020203c64697620636c6173733d2263656e7465725f63617074696f6e223e0a20202020202020202020202020202020202020202020202020202020202020203c6120687265663d22232220636c6173733d226c696e6b223e0a2020202020202020202020202020202020202020202020202020202020202020202020203c212d2d203c64697620636c6173733d2263656e7465725f63617074696f6e5f6974656d223ed0a1d0bfd0bed180d182d182d18bd29b20d0b6d0b5d0bad0bfd0b52dd0b6d0b5d0ba20d0b6d399d0bdd0b520d0bad2afd18820d29bd0bed0bbd0b4d0b0d0bdd18bd0bbd0b0d182d18bd0bd20d181d0bfd0bed180d18220d182d2afd180d0bbd0b5d180d19620d0bad0bed0bdd184d0b5d0b4d0b5d180d0b0d186d0b8d18fd181d18b3c2f6469763e202d2d3e0a2020202020202020202020202020202020202020202020202020202020202020202020203c6469762069643d22756e6465725f7469746c652220636c6173733d2263656e7465725f63617074696f6e5f6974656d223ed09ad0bed0bdd184d0b5d0b4d0b5d180d0b0d186d0b8d18f20d181d0bfd0bed180d182d0b8d0b2d0bdd18bd18520d0b5d0b4d0b8d0bdd0bed0b1d0bed180d181d182d0b220d0b820d181d0b8d0bbd0bed0b2d18bd18520d0b2d0b8d0b4d0bed0b220d181d0bfd0bed180d182d0b03c2f6469763e0a2020202020202020202020202020202020202020202020202020202020202020202020203c212d2d203c64697620636c6173733d2263656e7465725f63617074696f6e5f6974656d223e436f6d62617420616e6420737472656e6774682073706f72747320636f6e66656465726174696f6e3c2f6469763e202d2d3e0a20202020202020202020202020202020202020202020202020202020202020203c2f613e0a202020202020202020202020202020202020202020202020202020203c2f6469763e0a202020202020202020202020202020202020202020202020202020203c666f726d20636c6173733d22666f726d5f6c6f67696e2220726f6c653d22666f726d2220616374696f6e3d226c6f67696e736572766c657422206d6574686f643d22504f5354223e0a20202020202020202020202020202020202020202020202020202020202020203c696e70757420636c6173733d22666f726d5f6c6f67696e5f696e7075742220747970653d22746578742220706c616365686f6c6465723d22d09bd0bed0b3d0b8d0bd22206e616d653d226c6f67696e222069643d226c6f67696e223e0a20202020202020202020202020202020202020202020202020202020202020203c696e70757420636c6173733d22666f726d5f6c6f67696e5f696e7075742220747970653d2270617373776f72642220706c616365686f6c6465723d22d09fd0b0d180d0bed0bbd18c22206e616d653d2270737764222069643d2270737764223e0a20202020202020202020202020202020202020202020202020202020202020203c627574746f6e20636c6173733d22666f726d5f6c6f67696e5f627574746f6e2062746e2062746e2d6c672062746e2d7072696d6172792062746e2d626c6f636b222076616c75653d22d092d0bed0b9d182d0b82220747970653d227375626d6974222069643d227375626d6974223ed092d0bed0b9d182d0b83c2f627574746f6e3e0a20202020202020202020202020202020202020202020202020202020202020203c6c6162656c20636c6173733d22636865636b626f7820666f726d5f6c6f67696e5f636865636b626f7822203e0a2020202020202020202020202020202020202020202020202020202020202020202020203c696e70757420747970653d22636865636b626f78222069643d2272656d656d6265725f6d6522206e616d653d2272656d656d6265725f6d65223e20d097d0b0d0bfd0bed0bcd0bdd0b8d182d18c20d0bcd0b5d0bdd18f0a20202020202020202020202020202020202020202020202020202020202020203c2f6c6162656c3e0a202020202020202020202020202020202020202020202020202020203c2f666f726d3e0a2020202020202020202020202020202020202020202020203c2f6469763e0a0a0a2020202020202020202020202020202020202020202020203c756c20636c6173733d22756e7374796c656420696e6c696e6520636c656172206e61765f636f6c756d6e206c6973745f66656465726174696f6e20223e0a202020202020202020202020202020202020202020202020202020203c6c6920636c6173733d22636f6c756d6e206c6973745f66656465726174696f6e5f6974656d206974656d5f626f7820223e0a20202020202020202020202020202020202020202020202020202020202020203c6120687265663d22687474703a2f2f636f6e66656465726174696f6e2e6b7a2f626f78202220636c6173733d226c696e6b20223e0a2020202020202020202020202020202020202020202020202020202020202020202020203c7370616e20636c6173733d22696d6720223e0a202020202020202020202020202020202020202020202020202020202020202020202020202020203c696d67207372633d22696e6465782f696d616765732f64306335393231366133333865646264313632343263663238346663643532385f726573697a655f775f3132365f685f3132362e706e67202220616c743d22d091d0bed0bad18120d184d0b5d0b4d0b5d180d0b0d186d0b8d18fd181d18b20223e203c6920636c6173733d2269636f6e5f666c616720223e3c2f693e0a2020202020202020202020202020202020202020202020202020202020202020202020203c2f7370616e3e0a2020202020202020202020202020202020202020202020202020202020202020202020203c7370616e2069643d226665645f626f782220636c6173733d226c7320223ed091d0bed0bad18120d184d0b5d0b4d0b5d180d0b0d186d0b8d18fd181d18b3c2f7370616e3e0a20202020202020202020202020202020202020202020202020202020202020203c2f613e0a202020202020202020202020202020202020202020202020202020203c2f6c693e0a202020202020202020202020202020202020202020202020202020203c6c6920636c6173733d22636f6c756d6e206c6973745f66656465726174696f6e5f6974656d206974656d5f77726573746c696e6720223e0a20202020202020202020202020202020202020202020202020202020202020203c6120687265663d22687474703a2f2f636f6e66656465726174696f6e2e6b7a2f77726573746c696e67202220636c6173733d226c696e6b20223e0a2020202020202020202020202020202020202020202020202020202020202020202020203c7370616e20636c6173733d22696d6720223e0a202020202020202020202020202020202020202020202020202020202020202020202020202020203c696d67207372633d22696e6465782f696d616765732f66396636393961326431313237393866303762643733386464626131376538385f726573697a655f775f3132365f685f3132362e706e67202220616c743d22d093d180d0b5d0ba2dd180d0b8d0bc2c20d0b5d180d0bad196d0bd20d0b6d399d0bdd0b520d399d0b9d0b5d0bbd0b4d0b5d18020d0bad2afd180d0b5d181d19620d184d0b5d0b4d0b5d180d0b0d186d0b8d18fd181d18b20223e203c6920636c6173733d2269636f6e5f666c616720223e3c2f693e0a2020202020202020202020202020202020202020202020202020202020202020202020203c2f7370616e3e0a2020202020202020202020202020202020202020202020202020202020202020202020203c7370616e2069643d226665645f6772656b2220636c6173733d226c7320223ed093d180d0b5d0ba2dd180d0b8d0bc2c20d0b5d180d0bad196d0bd20d0b6d399d0bdd0b520d399d0b9d0b5d0bbd0b4d0b5d18020d0bad2afd180d0b5d181d19620d184d0b5d0b4d0b5d180d0b0d186d0b8d18fd181d18b3c2f7370616e3e0a20202020202020202020202020202020202020202020202020202020202020203c2f613e0a202020202020202020202020202020202020202020202020202020203c2f6c693e0a202020202020202020202020202020202020202020202020202020203c6c6920636c6173733d22636f6c756d6e206c6973745f66656465726174696f6e5f6974656d206974656d5f6a75646f20223e0a20202020202020202020202020202020202020202020202020202020202020203c6120687265663d22687474703a2f2f636f6e66656465726174696f6e2e6b7a2f6a75646f202220636c6173733d226c696e6b20223e0a2020202020202020202020202020202020202020202020202020202020202020202020203c7370616e20636c6173733d22696d6720223e0a202020202020202020202020202020202020202020202020202020202020202020202020202020203c696d67207372633d22696e6465782f696d616765732f63623762653561353030663637333261613034616233383935333934383039355f726573697a655f775f3132365f685f3132362e706e67202220616c743d22d094d0b7d18ed0b4d0be20d184d0b5d0b4d0b5d180d0b0d186d0b8d18fd181d18b20223e203c6920636c6173733d2269636f6e5f666c616720223e3c2f693e0a2020202020202020202020202020202020202020202020202020202020202020202020203c2f7370616e3e0a2020202020202020202020202020202020202020202020202020202020202020202020203c7370616e2069643d226665645f647a75646f2220636c6173733d226c7320223ed094d0b7d18ed0b4d0be20d184d0b5d0b4d0b5d180d0b0d186d0b8d18fd181d18b3c2f7370616e3e0a20202020202020202020202020202020202020202020202020202020202020203c2f613e0a202020202020202020202020202020202020202020202020202020203c2f6c693e0a202020202020202020202020202020202020202020202020202020203c6c6920636c6173733d22636f6c756d6e206c6973745f66656465726174696f6e5f6974656d206974656d5f7461656b776f6e646f20223e0a20202020202020202020202020202020202020202020202020202020202020203c6120687265663d22687474703a2f2f636f6e66656465726174696f6e2e6b7a2f7461656b776f6e646f202220636c6173733d226c696e6b20223e0a2020202020202020202020202020202020202020202020202020202020202020202020203c7370616e20636c6173733d22696d6720223e0a202020202020202020202020202020202020202020202020202020202020202020202020202020203c696d67207372633d22696e6465782f696d616765732f39656235623262623539356661386166333264333531373663616635643265665f726573697a655f775f3132365f685f3132362e706e67202220616c743d22d0a2d0b0d0b5d0bad0b2d0bed0bdd0b4d0be20285754462920d184d0b5d0b4d0b5d180d0b0d186d0b8d18fd181d18b20223e203c6920636c6173733d2269636f6e5f666c616720223e3c2f693e0a2020202020202020202020202020202020202020202020202020202020202020202020203c2f7370616e3e0a2020202020202020202020202020202020202020202020202020202020202020202020203c7370616e202069643d226665645f7465696b76616e646f2220636c6173733d226c7320223ed0a2d0b0d0b5d0bad0b2d0bed0bdd0b4d0be20285754462920d184d0b5d0b4d0b5d180d0b0d186d0b8d18fd181d18b3c2f7370616e3e0a20202020202020202020202020202020202020202020202020202020202020203c2f613e0a202020202020202020202020202020202020202020202020202020203c2f6c693e0a202020202020202020202020202020202020202020202020202020203c6c6920636c6173733d22636f6c756d6e206c6973745f66656465726174696f6e5f6974656d206974656d5f7765696768746c696674696e6720223e0a20202020202020202020202020202020202020202020202020202020202020203c6120687265663d22687474703a2f2f636f6e66656465726174696f6e2e6b7a2f7765696768746c696674696e67202220636c6173733d226c696e6b20223e0a2020202020202020202020202020202020202020202020202020202020202020202020203c7370616e20636c6173733d22696d6720223e0a202020202020202020202020202020202020202020202020202020202020202020202020202020203c696d67207372633d22696e6465782f696d616765732f36303133663938303436343531653664636438396262386264356163663037645f726573697a655f775f3132365f685f3132362e706e67202220616c743d22d090d183d18bd18020d0b0d182d0bbd0b5d182d0b8d0bad0b020d184d0b5d0b4d0b5d180d0b0d186d0b8d18fd181d18b20223e203c6920636c6173733d2269636f6e5f666c616720223e3c2f693e0a2020202020202020202020202020202020202020202020202020202020202020202020203c2f7370616e3e0a2020202020202020202020202020202020202020202020202020202020202020202020203c7370616e2069643d226665645f61746c65746963612220636c6173733d226c7320223ed090d183d18bd18020d0b0d182d0bbd0b5d182d0b8d0bad0b020d184d0b5d0b4d0b5d180d0b0d186d0b8d18fd181d18b3c2f7370616e3e0a20202020202020202020202020202020202020202020202020202020202020203c2f613e0a202020202020202020202020202020202020202020202020202020203c2f6c693e0a2020202020202020202020202020202020202020202020203c2f756c3e0a2020202020202020202020202020202020202020202020203c6469762069643d22636f707972696768742220636c6173733d22636f7079726967687420223ec2a9203230313420d0a1d0bfd0bed180d182d182d18bd29b20d0b6d0b5d0bad0bfd0b52dd0b6d0b5d0ba20d0b6d399d0bdd0b520d0bad2afd18820d29bd0bed0bbd0b4d0b0d0bdd18bd0bbd0b0d182d18bd0bd20d181d0bfd0bed180d18220d182d2afd180d0bbd0b5d180d19620d0bad0bed0bdd184d0b5d0b4d0b5d180d0b0d186d0b8d18fd181d18b3c2f6469763e0a20202020202020202020202020202020202020203c2f6469763e0a202020202020202020202020202020203c2f6469763e0a2020202020202020202020203c2f6469763e0a20202020202020203c2f6469763e0a202020203c2f6469763e0a202020203c64697620636c6173733d22736861646f775f626f74746f6d20223e3c2f6469763e0a0a093c73637269707420747970653d22746578742f6a617661736372697074223e0a0909766172206c6f63616c655f636f6f6b6965203d2072656164436f6f6b696528226d616e6167656d656e745f6c6f63616c6522293b0a0909766172206d655f72656d656d62203d2072656164436f6f6b696528226d626f5f757365725f72656d656d6265725f5f436f6e666967757261746f7222293b0a0a0909696620286d655f72656d656d623d3d277472756527297b0a090920202428222372656d656d6265725f6d6522292e617474722822636865636b6564222c74727565293b0a09097d0a0909696620286c6f63616c655f636f6f6b6965203d3d20226b7a22297b0a09092020242827236c6f67696e27292e617474722822706c616365686f6c646572222c22d09bd0bed0b3d0b8d0bd22293b0a09092020242827237073776427292e617474722822706c616365686f6c646572222c22d29ad2b1d0bfd0b8d18f20d181d3a9d0b722293b0a09092020242827237375626d697427292e746578742822d09ad196d180d18322293b0a090920202428272372656d656d6265725f6d655f6c6162656c27292e746578742822d09cd0b5d0bdd19620d0b5d181d182d0b520d181d0b0d29bd182d0b022293b0a090920200a09092020242827236c616e675f6b617a27292e616464436c61737328202264697361626c65642220290a0909202024282723756e6465725f7469746c6527292e746578742822d0a1d0bfd0bed180d182d182d18bd29b20d0b6d0b5d0bad0bfd0b52dd0b6d0b5d0ba20d0b6d399d0bdd0b520d0bad2afd18820d29bd0bed0bbd0b4d0b0d0bdd18bd0bbd0b0d182d18bd0bd20d181d0bfd0bed180d18220d182d2afd180d0bbd0b5d180d19620d0bad0bed0bdd184d0b5d0b4d0b5d180d0b0d186d0b8d18fd181d18b22293b0a09092020242827236665645f626f7827292e746578742822d091d0bed0bad18120d184d0b5d0b4d0b5d180d0b0d186d0b8d18fd181d18b22293b0a09092020242827236665645f6772656b27292e746578742822d093d180d0b5d0ba2dd180d0b8d0bc2c20d0b5d180d0bad196d0bd20d0b6d399d0bdd0b520d399d0b9d0b5d0bbd0b4d0b5d18020d0bad2afd180d0b5d181d19620d184d0b5d0b4d0b5d180d0b0d186d0b8d18fd181d18b22293b0a09092020242827236665645f647a75646f27292e746578742822d094d0b7d18ed0b4d0be20d184d0b5d0b4d0b5d180d0b0d186d0b8d18fd181d18b22293b0a09092020242827236665645f7465696b76616e646f27292e746578742822d0a2d0b0d0b5d0bad0b2d0bed0bdd0b4d0be20285754462920d184d0b5d0b4d0b5d180d0b0d186d0b8d18fd181d18b22293b0a09092020242827236665645f61746c657469636127292e746578742822d090d183d18bd18020d0b0d182d0bbd0b5d182d0b8d0bad0b020d184d0b5d0b4d0b5d180d0b0d186d0b8d18fd181d18b22293b0a0909202024282723636f7079726967687427292e746578742822c2a920d0a1d0bfd0bed180d182d182d18bd29b20d0b6d0b5d0bad0bfd0b52dd0b6d0b5d0ba20d0b6d399d0bdd0b520d0bad2afd18820d29bd0bed0bbd0b4d0b0d0bdd18bd0bbd0b0d182d18bd0bd20d181d0bfd0bed180d18220d182d2afd180d0bbd0b5d180d19620d0bad0bed0bdd184d0b5d0b4d0b5d180d0b0d186d0b8d18fd181d18b22293b0a090920200a09097d20656c736520696620286c6f63616c655f636f6f6b6965203d3d2022656e22297b0a09092020242827236c6f67696e27292e617474722822706c616365686f6c646572222c224c6f67696e22293b0a09092020242827237073776427292e617474722822706c616365686f6c646572222c2250617373776f726422293b0a09092020242827237375626d697427292e746578742822456e74657222293b0a090920202428272372656d656d6265725f6d655f6c6162656c27292e74657874282252656d656d626572206d6522293b0a090920200a09092020242827236c616e675f656e6727292e616464436c61737328202264697361626c65642220290a0909202024282723756e6465725f7469746c6527292e746578742822436f6d62617420616e6420737472656e6774682073706f72747320636f6e66656465726174696f6e22293b090920200a09092020242827236665645f626f7827292e746578742822426f78696e672046656465726174696f6e22293b0a09092020242827236665645f6772656b27292e74657874282257726573746c696e672046656465726174696f6e22293b0a09092020242827236665645f647a75646f27292e7465787428224a75646f2046656465726174696f6e22293b0a09092020242827236665645f7465696b76616e646f27292e7465787428225461656b776f6e646f2046656465726174696f6e22293b0a09092020242827236665645f61746c657469636127292e7465787428225765696768746c696674696e672046656465726174696f6e22293b0a0909202024282723636f7079726967687427292e746578742822c2a920436f6d62617420616e6420737472656e6774682073706f72747320636f6e66656465726174696f6e22293b09092020090920200a090920200a09097d20656c7365207b0a09092020242827236c6f67696e27292e617474722822706c616365686f6c646572222c22d09bd0bed0b3d0b8d0bd22293b0a09092020242827237073776427292e617474722822706c616365686f6c646572222c22d09fd0b0d180d0bed0bbd18c22293b0a09092020242827237375626d697427292e746578742822d092d0bed0b9d182d0b822293b0a090920202428272372656d656d6265725f6d655f6c6162656c27292e746578742822d097d0b0d0bfd0bed0bcd0bdd0b8d182d18c20d0bcd0b5d0bdd18f22293b0a090920200a09092020242827236c616e675f72757327292e616464436c61737328202264697361626c65642220290a0909202024282723756e6465725f7469746c6527292e746578742822d09ad0bed0bdd184d0b5d0b4d0b5d180d0b0d186d0b8d18f20d181d0bfd0bed180d182d0b8d0b2d0bdd18bd18520d0b5d0b4d0b8d0bdd0bed0b1d0bed180d181d182d0b220d0b820d181d0b8d0bbd0bed0b2d18bd18520d0b2d0b8d0b4d0bed0b220d181d0bfd0bed180d182d0b022293b0a09092020242827236665645f626f7827292e746578742822d0a4d0b5d0b4d0b5d180d0b0d186d0b8d18f20d0b1d0bed0bad181d0b022293b0a09092020242827236665645f6772656b27292e746578742822d0a4d0b5d0b4d0b5d180d0b0d186d0b8d18f20d0b3d180d0b5d0bad0be2dd180d0b8d0bcd181d0bad0bed0b92c20d0b2d0bed0bbd18cd0bdd0bed0b920d0b820d0b6d0b5d0bdd181d0bad0bed0b920d0b1d0bed180d18cd0b1d18b22293b0a09092020242827236665645f647a75646f27292e746578742822d0a4d0b5d0b4d0b5d180d0b0d186d0b8d18f20d0b4d0b7d18ed0b4d0be22293b0a09092020242827236665645f7465696b76616e646f27292e746578742822d0a4d0b5d0b4d0b5d180d0b0d186d0b8d18f20d182d0b0d0b5d0bad0b2d0bed0bdd0b4d0be20285754462922293b0a09092020242827236665645f61746c657469636127292e746578742822d0a4d0b5d0b4d0b5d180d0b0d186d0b8d18f20d182d18fd0b6d0b5d0bbd0bed0b920d0b0d182d0bbd0b5d182d0b8d0bad0b822293b0a0909202024282723636f7079726967687427292e746578742822c2a920d09ad0bed0bdd184d0b5d0b4d0b5d180d0b0d186d0b8d18f20d181d0bfd0bed180d182d0b8d0b2d0bdd18bd18520d0b5d0b4d0b8d0bdd0bed0b1d0bed180d181d182d0b220d0b820d181d0b8d0bbd0bed0b2d18bd18520d0b2d0b8d0b4d0bed0b220d181d0bfd0bed180d182d0b022293b090920200a09097d0a093c2f7363726970743e0a3c2f626f64793e0a0a3c2f68746d6c3e0a');
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('112358', 131072);
SELECT pg_catalog.lowrite(0, '\x3c68746d6c20636c6173733d226a73206373737472616e736974696f6e73223e0a0a3c686561643e0a202020203c6d65746120636861727365743d227574662d38223e0a202020203c6d65746120687474702d65717569763d22636f6e74656e742d747970652220636f6e74656e743d22746578742f68746d6c3b20636861727365743d7574662d3822202f3e0a093c7469746c653e415254412053796e6567792041646d696e3c2f7469746c653e0a202020203c6d657461206e616d653d2276696577706f72742220636f6e74656e743d2277696474683d6465766963652d77696474682c20696e697469616c2d7363616c653d312e30223e0a202020203c6c696e6b2072656c3d2273686f72746375742069636f6e2220687265663d22696e6465782f696d616765732f66617669636f6e2e706e672220747970653d22696d6167652f782d69636f6e223e0a0a202020203c6c696e6b20747970653d22746578742f6373732220687265663d22696e6465782f7374796c65732f6a71756572792d75692d312e392e312e637573746f6d2e6d696e2e637373222072656c3d227374796c657368656574223e0a202020203c6c696e6b20747970653d22746578742f6373732220687265663d22696e6465782f7374796c65732f626f6f7473747261702e6d696e2e637373222072656c3d227374796c657368656574223e0a202020203c6c696e6b20747970653d22746578742f6373732220687265663d22696e6465782f7374796c65732f626f6f7473747261702d726573706f6e736976652e6d696e2e637373222072656c3d227374796c657368656574223e0a202020203c6c696e6b20747970653d22746578742f6373732220687265663d22696e6465782f7374796c65732f6a71756572792e66616e6379626f782e637373222072656c3d227374796c657368656574223e0a202020203c6c696e6b20747970653d22746578742f6373732220687265663d22696e6465782f7374796c65732f6a71756572792e66616e6379626f782d627574746f6e732e637373222072656c3d227374796c657368656574223e0a202020203c6c696e6b20747970653d22746578742f6373732220687265663d22696e6465782f7374796c65732f6a71756572792e66616e6379626f782d7468756d62732e637373222072656c3d227374796c657368656574223e0a202020203c6c696e6b20747970653d22746578742f6373732220687265663d22696e6465782f7374796c65732f7374796c652e637373222072656c3d227374796c657368656574223e0a202020203c6c696e6b20747970653d22746578742f6373732220687265663d22696e6465782f7374796c65732f74656d702e637373222072656c3d227374796c657368656574223e0a202020203c6c696e6b20747970653d22746578742f6373732220687265663d22696e6465782f7374796c65732f726573706f6e736976652e637373222072656c3d227374796c657368656574223e0a202020203c7374796c6520747970653d22746578742f637373222069643d2279615f73686172655f7374796c65223e0a202020202e622d73686172652d706f7075702d77726170207b0a20202020202020207a2d696e6465783a313037333734313832333b0a2020202020202020706f736974696f6e3a6162736f6c7574653b0a202020202020202077696474683a35303070780a202020207d0a202020202e622d73686172652d706f707570207b0a2020202020202020706f736974696f6e3a6162736f6c7574653b0a20202020202020207a2d696e6465783a313037333734313832333b0a2020202020202020626f726465723a31707820736f6c696420233838383b0a20202020202020206261636b67726f756e643a234646463b0a2020202020202020636f6c6f723a233030300a202020207d0a202020202e622d73686172652d706f7075702d77726170202e622d73686172652d706f7075705f646f776e207b0a2020202020202020746f703a300a202020207d0a202020202e622d73686172652d706f7075702d77726170202e622d73686172652d706f7075705f7570207b0a2020202020202020626f74746f6d3a300a202020207d0a202020202e622d73686172652d706f7075702d777261705f73746174655f68696464656e207b0a2020202020202020706f736974696f6e3a6162736f6c75746521696d706f7274616e743b0a2020202020202020746f703a2d39393939707821696d706f7274616e743b0a202020202020202072696768743a6175746f21696d706f7274616e743b0a2020202020202020626f74746f6d3a6175746f21696d706f7274616e743b0a20202020202020206c6566743a2d39393939707821696d706f7274616e743b0a20202020202020207669736962696c6974793a68696464656e21696d706f7274616e740a202020207d0a202020202e622d73686172652d706f7075702c20783a6e74682d6368696c64283129207b0a2020202020202020626f726465723a303b0a202020202020202070616464696e673a31707821696d706f7274616e740a202020207d0a20202020406d6564696120616c6c20616e6420287265736f6c7574696f6e3d3064706929207b0a20202020202020202e622d73686172652d706f7075702c20783a6e74682d6368696c642831292c20783a2d6f2d707265666f637573207b0a20202020202020202020202070616464696e673a3021696d706f7274616e743b0a202020202020202020202020626f726465723a31707820736f6c696420233838380a20202020202020207d0a202020207d0a202020202e622d73686172652d706f7075705f5f69207b0a2020202020202020646973706c61793a2d6d6f7a2d696e6c696e652d626f783b0a2020202020202020646973706c61793a696e6c696e652d626c6f636b3b0a202020202020202070616464696e673a357078203021696d706f7274616e743b0a20202020202020206f766572666c6f773a68696464656e3b0a2020202020202020766572746963616c2d616c69676e3a746f703b0a202020202020202077686974652d73706163653a6e6f777261703b0a20202020202020207669736962696c6974793a76697369626c653b0a20202020202020206261636b67726f756e643a234646463b0a20202020202020202d7765626b69742d626f782d736861646f773a302032707820397078207267626128302c20302c20302c20302e36293b0a20202020202020202d6d6f7a2d626f782d736861646f773a302032707820397078207267626128302c20302c20302c20302e36293b0a2020202020202020626f782d736861646f773a302032707820397078207267626128302c20302c20302c20302e36290a202020207d0a202020202e622d73686172652d706f7075705f5f6974656d207b0a2020202020202020666f6e743a31656d2f312e3235656d20417269616c2c2073616e732d73657269663b0a2020202020202020646973706c61793a626c6f636b3b0a202020202020202070616464696e673a357078203135707821696d706f7274616e743b0a202020202020202077686974652d73706163653a6e6f777261703b0a20202020202020206261636b67726f756e643a234646460a202020207d0a202020202e622d73686172652d706f7075705f5f6974656d2c20612e622d73686172652d706f7075705f5f6974656d3a6c696e6b2c20612e622d73686172652d706f7075705f5f6974656d3a76697369746564207b0a2020202020202020746578742d6465636f726174696f6e3a6e6f6e6521696d706f7274616e743b0a2020202020202020626f726465723a3021696d706f7274616e740a202020207d0a20202020612e622d73686172652d706f7075705f5f6974656d207b0a2020202020202020637572736f723a706f696e7465720a202020207d0a20202020612e622d73686172652d706f7075705f5f6974656d202e622d73686172652d706f7075705f5f6974656d5f5f74657874207b0a2020202020202020646973706c61793a696e6c696e653b0a2020202020202020746578742d6465636f726174696f6e3a756e6465726c696e653b0a2020202020202020636f6c6f723a233161336463310a202020207d0a20202020612e622d73686172652d706f7075705f5f6974656d3a686f766572207b0a2020202020202020776f72642d73706163696e673a300a202020207d0a20202020612e622d73686172652d706f7075705f5f6974656d3a686f766572202e622d73686172652d706f7075705f5f6974656d5f5f74657874207b0a2020202020202020636f6c6f723a234630303b0a2020202020202020637572736f723a706f696e7465720a202020207d0a202020202e622d73686172652d706f7075705f5f69636f6e207b0a2020202020202020646973706c61793a2d6d6f7a2d696e6c696e652d626f783b0a2020202020202020646973706c61793a696e6c696e652d626c6f636b3b0a20202020202020206d617267696e3a2d3370782030203020303b0a202020202020202070616464696e673a30203570782030203021696d706f7274616e743b0a2020202020202020766572746963616c2d616c69676e3a6d6964646c650a202020207d0a202020202e622d73686172652d706f7075705f5f69636f6e5f696e707574207b0a202020202020202077696474683a323170783b0a20202020202020206865696768743a313670783b0a20202020202020206d617267696e2d746f703a2d3670783b0a202020202020202070616464696e673a3021696d706f7274616e740a202020207d0a202020202e622d73686172652d706f7075705f5f69636f6e5f5f696e707574207b0a20202020202020206d617267696e2d72696768743a303b0a20202020202020206d617267696e2d6c6566743a3270783b0a2020202020202020766572746963616c2d616c69676e3a746f700a202020207d0a202020202e622d73686172652d706f7075705f5f737061636572207b0a2020202020202020646973706c61793a626c6f636b3b0a202020202020202070616464696e672d746f703a3130707821696d706f7274616e740a202020207d0a202020202e622d73686172652d706f7075705f5f686561646572207b0a2020202020202020666f6e743a3836252f31656d2056657264616e612c2073616e732d73657269663b0a2020202020202020646973706c61793a626c6f636b3b0a202020202020202070616464696e673a31307078203135707820357078203135707821696d706f7274616e743b0a2020202020202020636f6c6f723a233939390a202020207d0a202020202e622d73686172652d706f7075705f5f6865616465725f6669727374207b0a202020202020202070616464696e672d746f703a35707821696d706f7274616e740a202020207d0a202020202e622d73686172652d706f7075705f5f696e707574207b0a2020202020202020666f6e743a3836252f31656d2056657264616e612c2073616e732d73657269663b0a2020202020202020646973706c61793a626c6f636b3b0a202020202020202070616464696e673a357078203135707821696d706f7274616e743b0a2020202020202020636f6c6f723a233939393b0a2020202020202020746578742d616c69676e3a6c6566740a202020207d0a202020202e622d73686172652d706f7075705f5f696e7075745f5f696e707574207b0a2020202020202020666f6e743a31656d2f31656d2056657264616e612c2073616e732d73657269663b0a2020202020202020646973706c61793a626c6f636b3b0a202020202020202077696474683a313070783b0a20202020202020206d617267696e3a357078203020303b0a20202020202020202d7765626b69742d626f782d73697a696e673a626f726465722d626f783b0a20202020202020202d6d6f7a2d626f782d73697a696e673a626f726465722d626f783b0a2020202020202020626f782d73697a696e673a626f726465722d626f783b0a2020202020202020726573697a653a6e6f6e653b0a2020202020202020746578742d616c69676e3a6c6566743b0a2020202020202020646972656374696f6e3a6c74720a202020207d0a202020202e622d73686172652d706f7075705f646f776e202e622d73686172652d706f7075705f776974682d6c696e6b202e622d73686172652d706f7075705f5f696e7075745f6c696e6b207b0a2020202020202020706f736974696f6e3a6162736f6c7574653b0a2020202020202020746f703a3570783b0a202020202020202072696768743a303b0a20202020202020206c6566743a300a202020207d0a202020202e622d73686172652d706f7075705f7570202e622d73686172652d706f7075705f776974682d6c696e6b202e622d73686172652d706f7075705f5f696e7075745f6c696e6b207b0a2020202020202020706f736974696f6e3a6162736f6c7574653b0a202020202020202072696768743a303b0a2020202020202020626f74746f6d3a3570783b0a20202020202020206c6566743a300a202020207d0a202020202e622d73686172652d706f7075705f646f776e202e622d73686172652d706f7075705f776974682d6c696e6b207b0a202020202020202070616464696e672d746f703a3535707821696d706f7274616e740a202020207d0a202020202e622d73686172652d706f7075705f7570202e622d73686172652d706f7075705f776974682d6c696e6b207b0a202020202020202070616464696e672d626f74746f6d3a3535707821696d706f7274616e740a202020207d0a202020202e622d73686172652d706f7075705f646f776e202e622d73686172652d706f7075705f657870616e6461626c65202e622d73686172652d706f7075705f5f6d61696e207b0a202020202020202070616464696e672d626f74746f6d3a3235707821696d706f7274616e740a202020207d0a202020202e622d73686172652d706f7075705f7570202e622d73686172652d706f7075705f657870616e6461626c65202e622d73686172652d706f7075705f5f6d61696e207b0a202020202020202070616464696e672d746f703a3235707821696d706f7274616e740a202020207d0a202020202e622d73686172652d706f7075705f646f776e202e622d73686172652d706f7075705f79616e6465786564207b0a202020202020202070616464696e672d626f74746f6d3a3130707821696d706f7274616e740a202020207d0a202020202e622d73686172652d706f7075705f7570202e622d73686172652d706f7075705f79616e6465786564207b0a202020202020202070616464696e672d746f703a3130707821696d706f7274616e740a202020207d0a202020202e622d73686172652d706f7075705f5f79616e646578207b0a2020202020202020706f736974696f6e3a6162736f6c7574653b0a202020202020202072696768743a3470783b0a2020202020202020626f74746f6d3a3270783b0a2020202020202020666f6e743a37382e313235252f31656d2056657264616e612c2073616e732d73657269663b0a202020202020202070616464696e673a33707821696d706f7274616e743b0a20202020202020206261636b67726f756e643a7472616e73706172656e740a202020207d0a20202020612e622d73686172652d706f7075705f5f79616e6465783a6c696e6b2c20612e622d73686172652d706f7075705f5f79616e6465783a76697369746564207b0a2020202020202020636f6c6f723a236336633563353b0a2020202020202020746578742d6465636f726174696f6e3a6e6f6e650a202020207d0a20202020612e622d73686172652d706f7075705f5f79616e6465783a6c696e6b3a686f7665722c20612e622d73686172652d706f7075705f5f79616e6465783a766973697465643a686f766572207b0a2020202020202020636f6c6f723a234630303b0a2020202020202020746578742d6465636f726174696f6e3a756e6465726c696e650a202020207d0a202020202e622d73686172652d706f7075705f7570202e622d73686172652d706f7075705f5f79616e646578207b0a2020202020202020746f703a3270783b0a2020202020202020626f74746f6d3a6175746f0a202020207d0a202020202e622d73686172652d706f7075705f657870616e6461626c65202e622d73686172652d706f7075705f5f79616e646578207b0a202020202020202072696768743a6175746f3b0a20202020202020206c6566743a3470780a202020207d0a202020202e622d73686172652d706f7075705f746f2d7269676874202e622d73686172652d706f7075705f657870616e6461626c65202e622d73686172652d706f7075705f5f79616e646578207b0a202020202020202072696768743a3470783b0a20202020202020206c6566743a6175746f0a202020207d0a202020202e622d73686172652d706f7075705f5f657870616e646572202e622d73686172652d706f7075705f5f6974656d207b0a2020202020202020706f736974696f6e3a6162736f6c7574653b0a2020202020202020626f74746f6d3a3570783b0a2020202020202020666f6e743a3836252f31656d2056657264616e612c2073616e732d73657269663b0a20202020202020206d617267696e3a31307078203020303b0a202020202020202070616464696e673a357078203130707821696d706f7274616e743b0a2020202020202020637572736f723a706f696e7465723b0a2020202020202020636f6c6f723a233939393b0a20202020202020206261636b67726f756e643a7472616e73706172656e740a202020207d0a202020202e622d73686172652d706f7075705f746f2d72696768742c202e622d73686172652d706f7075705f746f2d7269676874202e622d73686172652d706f7075705f5f657870616e646572207b0a2020202020202020646972656374696f6e3a72746c0a202020207d0a202020202e622d73686172652d706f7075705f746f2d7269676874202e622d73686172652d706f7075705f5f657870616e646572202e622d73686172652d706f7075705f5f69636f6e207b0a202020202020202070616464696e673a30203020302035707821696d706f7274616e740a202020207d0a202020202e622d73686172652d706f7075705f7570202e622d73686172652d706f7075705f5f657870616e646572202e622d73686172652d706f7075705f5f6974656d207b0a2020202020202020746f703a2d3570783b0a2020202020202020626f74746f6d3a6175746f0a202020207d0a202020202e622d73686172652d706f7075705f5f657870616e646572202e622d73686172652d706f7075705f5f6974656d3a686f766572202e622d73686172652d706f7075705f5f6974656d5f5f74657874207b0a2020202020202020746578742d6465636f726174696f6e3a756e6465726c696e650a202020207d0a202020202e622d73686172652d706f7075705f5f657870616e646572202e622d69636f5f616374696f6e5f726172722c202e622d73686172652d706f7075705f746f2d7269676874202e622d73686172652d706f7075705f5f657870616e646572202e622d69636f5f616374696f6e5f6c6172722c202e622d73686172652d706f7075705f66756c6c202e622d73686172652d706f7075705f5f657870616e646572202e622d69636f5f616374696f6e5f6c6172722c202e622d73686172652d706f7075705f746f2d7269676874202e622d73686172652d706f7075705f66756c6c202e622d73686172652d706f7075705f5f657870616e646572202e622d69636f5f616374696f6e5f726172722c202e622d73686172652d706f7075705f5f657870616e646572202e622d73686172652d706f7075705f5f6974656d5f5f746578745f636f6c6c617073652c202e622d73686172652d706f7075705f66756c6c202e622d73686172652d706f7075705f5f6974656d5f5f746578745f657870616e64207b0a2020202020202020646973706c61793a6e6f6e650a202020207d0a202020202e622d73686172652d706f7075705f746f2d7269676874202e622d73686172652d706f7075705f5f657870616e646572202e622d69636f5f616374696f6e5f726172722c202e622d73686172652d706f7075705f66756c6c202e622d73686172652d706f7075705f5f6974656d5f5f746578745f636f6c6c617073652c202e622d73686172652d706f7075705f66756c6c202e622d73686172652d706f7075705f5f657870616e646572202e622d69636f5f616374696f6e5f726172722c202e622d73686172652d706f7075705f746f2d7269676874202e622d73686172652d706f7075705f66756c6c202e622d73686172652d706f7075705f5f657870616e646572202e622d69636f5f616374696f6e5f6c617272207b0a2020202020202020646973706c61793a696e6c696e650a202020207d0a202020202e622d69636f5f616374696f6e5f726172722c202e622d69636f5f616374696f6e5f6c617272207b0a202020202020202077696474683a3870783b0a20202020202020206865696768743a3770783b0a2020202020202020626f726465723a300a202020207d0a202020202e622d73686172652d706f7075705f5f6d61696e2c202e622d73686172652d706f7075705f5f6578747261207b0a2020202020202020646972656374696f6e3a6c74723b0a2020202020202020766572746963616c2d616c69676e3a626f74746f6d3b0a2020202020202020746578742d616c69676e3a6c6566740a202020207d0a202020202e622d73686172652d706f7075705f646f776e202e622d73686172652d706f7075705f5f6d61696e2c202e622d73686172652d706f7075705f646f776e202e622d73686172652d706f7075705f5f6578747261207b0a2020202020202020766572746963616c2d616c69676e3a746f700a202020207d0a202020202e622d73686172652d706f7075705f5f6d61696e207b0a2020202020202020646973706c61793a2d6d6f7a2d696e6c696e652d737461636b3b0a2020202020202020646973706c61793a696e6c696e652d626c6f636b0a202020207d0a202020202e622d73686172652d706f7075705f5f6578747261207b0a2020202020202020646973706c61793a6e6f6e653b0a20202020202020206d617267696e3a30202d31307078203020300a202020207d0a202020202e622d73686172652d706f7075705f66756c6c202e622d73686172652d706f7075705f5f6578747261207b0a2020202020202020646973706c61793a2d6d6f7a2d696e6c696e652d737461636b3b0a2020202020202020646973706c61793a696e6c696e652d626c6f636b0a202020207d0a202020202e622d73686172652d706f7075705f746f2d7269676874202e622d73686172652d706f7075705f5f6578747261207b0a20202020202020206d617267696e3a3020302030202d313070780a202020207d0a202020202e622d73686172652d706f7075705f5f7461696c207b0a2020202020202020706f736974696f6e3a6162736f6c7574653b0a202020202020202077696474683a323170783b0a20202020202020206865696768743a313070783b0a20202020202020206d617267696e3a3020302030202d313170780a202020207d0a202020202e622d73686172652d706f7075705f646f776e202e622d73686172652d706f7075705f5f7461696c207b0a2020202020202020746f703a2d313070783b0a20202020202020206261636b67726f756e643a75726c28696e6465782f696d616765732f622d73686172652d706f7075705f646f776e5f5f7461696c2e6769662920302030206e6f2d7265706561740a202020207d0a202020202e622d73686172652d706f7075705f7570202e622d73686172652d706f7075705f5f7461696c207b0a2020202020202020626f74746f6d3a2d313070783b0a20202020202020206261636b67726f756e643a75726c28696e6465782f696d616765732f622d73686172652d706f7075705f75705f5f7461696c2e6769662920302030206e6f2d7265706561740a202020207d0a202020202e622d73686172652d706f7075705f646f776e202e622d73686172652d706f7075705f5f7461696c2c20783a6e74682d6368696c64283129207b0a2020202020202020746f703a2d3970783b0a20202020202020206261636b67726f756e642d696d6167653a75726c28696e6465782f696d616765732f622d73686172652d706f7075705f646f776e5f5f7461696c2e706e67290a202020207d0a202020202e622d73686172652d706f7075705f7570202e622d73686172652d706f7075705f5f7461696c2c20783a6e74682d6368696c64283129207b0a2020202020202020626f74746f6d3a2d3970783b0a20202020202020206261636b67726f756e642d696d6167653a75726c28696e6465782f696d616765732f622d73686172652d706f7075705f75705f5f7461696c2e706e67290a202020207d0a20202020406d6564696120616c6c20616e6420287265736f6c7574696f6e3d3064706929207b0a20202020202020202e622d73686172652d706f7075705f646f776e202e622d73686172652d706f7075705f5f7461696c2c20783a6e74682d6368696c642831292c20783a2d6f2d707265666f637573207b0a202020202020202020202020746f703a2d313070783b0a2020202020202020202020206261636b67726f756e642d696d6167653a75726c28696e6465782f696d616765732f622d73686172652d706f7075705f646f776e5f5f7461696c2e676966290a20202020202020207d0a20202020202020202e622d73686172652d706f7075705f7570202e622d73686172652d706f7075705f5f7461696c2c20783a6e74682d6368696c642831292c20783a2d6f2d707265666f637573207b0a202020202020202020202020626f74746f6d3a2d313070783b0a2020202020202020202020206261636b67726f756e642d696d6167653a75726c28696e6465782f696d616765732f622d73686172652d706f7075705f75705f5f7461696c2e676966290a20202020202020207d0a202020207d0a202020202e622d73686172652d706f707570202e622d73686172652d706f7075705f73686f775f666f726d5f6d61696c2c202e622d73686172652d706f707570202e622d73686172652d706f7075705f73686f775f666f726d5f68746d6c207b0a202020202020202070616464696e673a3021696d706f7274616e740a202020207d0a202020202e622d73686172652d706f707570202e622d73686172652d706f7075705f73686f775f666f726d5f6d61696c202e622d73686172652d706f7075705f5f6d61696e2c202e622d73686172652d706f707570202e622d73686172652d706f7075705f73686f775f666f726d5f68746d6c202e622d73686172652d706f7075705f5f6d61696e2c202e622d73686172652d706f707570202e622d73686172652d706f7075705f73686f775f666f726d202e622d73686172652d706f7075705f5f6d61696e2c202e622d73686172652d706f707570202e622d73686172652d706f7075705f73686f775f666f726d5f6d61696c202e622d73686172652d706f7075705f5f65787472612c202e622d73686172652d706f707570202e622d73686172652d706f7075705f73686f775f666f726d5f68746d6c202e622d73686172652d706f7075705f5f65787472612c202e622d73686172652d706f707570202e622d73686172652d706f7075705f73686f775f666f726d202e622d73686172652d706f7075705f5f6578747261207b0a20202020202020206865696768743a313570783b0a202020202020202070616464696e673a3021696d706f7274616e743b0a20202020202020206f766572666c6f773a68696464656e3b0a20202020202020207669736962696c6974793a68696464656e0a202020207d0a202020202e622d73686172652d706f7075705f73686f775f666f726d5f6d61696c202e622d73686172652d706f7075705f5f657870616e6465722c202e622d73686172652d706f7075705f73686f775f666f726d5f68746d6c202e622d73686172652d706f7075705f5f657870616e6465722c202e622d73686172652d706f7075705f73686f775f666f726d202e622d73686172652d706f7075705f5f657870616e6465722c202e622d73686172652d706f7075705f73686f775f666f726d5f6d61696c202e622d73686172652d706f7075705f5f696e7075745f6c696e6b2c202e622d73686172652d706f7075705f73686f775f666f726d5f68746d6c202e622d73686172652d706f7075705f5f696e7075745f6c696e6b2c202e622d73686172652d706f7075705f73686f775f666f726d202e622d73686172652d706f7075705f5f696e7075745f6c696e6b207b0a2020202020202020646973706c61793a6e6f6e650a202020207d0a202020202e622d73686172652d706f7075705f5f666f726d207b0a2020202020202020706f736974696f6e3a72656c61746976653b0a2020202020202020646973706c61793a6e6f6e653b0a20202020202020206f766572666c6f773a68696464656e3b0a202020202020202070616464696e673a3570782030203021696d706f7274616e743b0a20202020202020206d617267696e3a302030202d313570783b0a202020202020202077686974652d73706163653a6e6f726d616c0a202020207d0a202020202e622d73686172652d706f7075705f73686f775f666f726d5f6d61696c202e622d73686172652d706f7075705f5f666f726d5f6d61696c2c202e622d73686172652d706f7075705f73686f775f666f726d5f68746d6c202e622d73686172652d706f7075705f5f666f726d5f68746d6c2c202e622d73686172652d706f7075705f73686f775f666f726d202e622d73686172652d706f7075705f5f666f726d207b0a2020202020202020646973706c61793a626c6f636b0a202020207d0a202020202e622d73686172652d706f7075705f5f666f726d5f5f6c696e6b207b0a2020202020202020666f6e743a3836252f312e34353435656d2056657264616e612c2073616e732d73657269663b0a2020202020202020666c6f61743a6c6566743b0a2020202020202020646973706c61793a696e6c696e653b0a202020202020202070616464696e673a35707821696d706f7274616e743b0a20202020202020206d617267696e3a3020302035707820313070783b0a2020202020202020746578742d6465636f726174696f6e3a756e6465726c696e653b0a2020202020202020637572736f723a706f696e7465723b0a2020202020202020636f6c6f723a233161336463310a202020207d0a202020202e622d73686172652d706f7075705f5f666f726d5f5f627574746f6e207b0a2020202020202020666f6e743a3836252f312e34353435656d2056657264616e612c2073616e732d73657269663b0a2020202020202020666c6f61743a6c6566743b0a2020202020202020646973706c61793a696e6c696e653b0a20202020202020206d617267696e3a3570782030203020313570780a202020207d0a202020202e622d73686172652d706f7075705f5f666f726d5f5f636c6f7365207b0a2020202020202020666f6e743a3836252f312e34353435656d2056657264616e612c2073616e732d73657269663b0a2020202020202020666c6f61743a72696768743b0a2020202020202020646973706c61793a696e6c696e653b0a202020202020202070616464696e673a35707821696d706f7274616e743b0a20202020202020206d617267696e3a3020313070782035707820303b0a2020202020202020637572736f723a706f696e7465723b0a2020202020202020636f6c6f723a233939390a202020207d0a20202020612e622d73686172652d706f7075705f5f666f726d5f5f6c696e6b3a686f7665722c20612e622d73686172652d706f7075705f5f666f726d5f5f636c6f73653a686f766572207b0a2020202020202020746578742d6465636f726174696f6e3a756e6465726c696e653b0a2020202020202020636f6c6f723a234630300a202020207d0a202020202e622d73686172652d706f7075705f666f6e745f6669786564202e622d73686172652d706f7075705f5f6974656d207b0a2020202020202020666f6e742d73697a653a31322e3870780a202020207d0a202020202e622d73686172652d706f7075705f666f6e745f6669786564202e622d73686172652d706f7075705f5f6865616465722c202e622d73686172652d706f7075705f666f6e745f6669786564202e622d73686172652d706f7075705f5f696e7075742c202e622d73686172652d706f7075705f666f6e745f6669786564202e622d73686172652d706f7075705f5f657870616e646572202e622d73686172652d706f7075705f5f6974656d2c202e622d73686172652d706f7075705f666f6e745f6669786564202e622d73686172652d706f7075705f5f666f726d5f5f6c696e6b2c202e622d73686172652d706f7075705f666f6e745f6669786564202e622d73686172652d706f7075705f5f666f726d5f5f627574746f6e2c202e622d73686172652d706f7075705f666f6e745f6669786564202e622d73686172652d706f7075705f5f666f726d5f5f636c6f7365207b0a2020202020202020666f6e742d73697a653a313170780a202020207d0a202020202e622d73686172652d706f7075705f666f6e745f6669786564202e622d73686172652d706f7075705f5f79616e646578207b0a2020202020202020666f6e742d73697a653a313070780a202020207d0a202020202e622d73686172652d666f726d2d627574746f6e207b0a2020202020202020666f6e743a3836252f313770782056657264616e612c20417269616c2c2073616e732d73657269663b0a2020202020202020646973706c61793a2d6d6f7a2d696e6c696e652d626f783b0a2020202020202020646973706c61793a696e6c696e652d626c6f636b3b0a2020202020202020706f736974696f6e3a72656c61746976653b0a20202020202020206865696768743a313970783b0a20202020202020206d617267696e3a30203370783b0a202020202020202070616464696e673a30203470783b0a2020202020202020637572736f723a64656661756c743b0a202020202020202077686974652d73706163653a6e6f777261703b0a2020202020202020746578742d6465636f726174696f6e3a6e6f6e6521696d706f7274616e743b0a2020202020202020636f6c6f723a2330303021696d706f7274616e743b0a2020202020202020626f726465723a6e6f6e653b0a20202020202020206f75746c696e653a6e6f6e653b0a20202020202020206261636b67726f756e643a75726c28696e6465782f696d616765732f622d73686172652d666f726d2d627574746f6e2e706e67292030202d32307078207265706561742d780a202020207d0a202020202e622d73686172652d666f726d2d627574746f6e3a6c696e6b3a686f7665722c202e622d73686172652d666f726d2d627574746f6e3a766973697465643a686f766572207b0a2020202020202020636f6c6f723a2330303021696d706f7274616e740a202020207d0a202020202e622d73686172652d666f726d2d627574746f6e5f5f6265666f72652c202e622d73686172652d666f726d2d627574746f6e5f5f6166746572207b0a2020202020202020706f736974696f6e3a6162736f6c7574653b0a202020202020202077696474683a3370783b0a20202020202020206865696768743a313970783b0a20202020202020206261636b67726f756e643a75726c28696e6465782f696d616765732f622d73686172652d666f726d2d627574746f6e2e706e67290a202020207d0a202020202e622d73686172652d666f726d2d627574746f6e5f5f6265666f7265207b0a20202020202020206d617267696e2d6c6566743a2d3770780a202020207d0a202020202e622d73686172652d666f726d2d627574746f6e5f5f6166746572207b0a20202020202020206d617267696e2d6c6566743a3470783b0a20202020202020206261636b67726f756e642d706f736974696f6e3a2d33707820300a202020207d0a202020202e622d73686172652d666f726d2d627574746f6e3a3a2d6d6f7a2d666f6375732d696e6e6572207b0a2020202020202020626f726465723a6e6f6e650a202020207d0a20202020627574746f6e2e622d73686172652d666f726d2d627574746f6e202e622d73686172652d666f726d2d627574746f6e5f5f6265666f72652c20627574746f6e2e622d73686172652d666f726d2d627574746f6e202e622d73686172652d666f726d2d627574746f6e5f5f6166746572207b0a20202020202020206d617267696e2d746f703a2d3170780a202020207d0a20202020402d6d6f7a2d646f63756d656e742075726c2d7072656669782829207b0a2020202020202020627574746f6e2e622d73686172652d666f726d2d627574746f6e202e622d73686172652d666f726d2d627574746f6e5f5f6166746572207b0a2020202020202020202020206d617267696e2d746f703a2d3270783b0a2020202020202020202020206d617267696e2d6c6566743a3670780a20202020202020207d0a2020202020202020627574746f6e2e622d73686172652d666f726d2d627574746f6e202e622d73686172652d666f726d2d627574746f6e5f5f6265666f7265207b0a2020202020202020202020206d617267696e2d746f703a2d3270783b0a2020202020202020202020206d617267696e2d6c6566743a2d3970780a20202020202020207d0a202020207d0a202020205350414e2e622d73686172652d666f726d2d627574746f6e3a686f7665722c202e622d73686172652d666f726d2d627574746f6e5f73746174655f686f766572207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a30202d363070780a202020207d0a202020205350414e2e622d73686172652d666f726d2d627574746f6e3a686f766572202e622d73686172652d666f726d2d627574746f6e5f5f6265666f72652c202e622d73686172652d666f726d2d627574746f6e5f73746174655f686f766572202e622d73686172652d666f726d2d627574746f6e5f5f6265666f7265207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a30202d343070780a202020207d0a202020205350414e2e622d73686172652d666f726d2d627574746f6e3a686f766572202e622d73686172652d666f726d2d627574746f6e5f5f61667465722c202e622d73686172652d666f726d2d627574746f6e5f73746174655f686f766572202e622d73686172652d666f726d2d627574746f6e5f5f6166746572207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a2d337078202d343070780a202020207d0a202020202e622d73686172652d666f726d2d627574746f6e5f73746174655f707265737365642c202e622d73686172652d666f726d2d627574746f6e5f73746174655f70726573736564202e622d73686172652d666f726d2d627574746f6e5f7368617265207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a30202d313030707821696d706f7274616e740a202020207d0a202020202e622d73686172652d666f726d2d627574746f6e5f73746174655f70726573736564202e622d73686172652d666f726d2d627574746f6e5f5f6265666f7265207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a30202d3830707821696d706f7274616e740a202020207d0a202020202e622d73686172652d666f726d2d627574746f6e5f73746174655f70726573736564202e622d73686172652d666f726d2d627574746f6e5f5f6166746572207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a2d337078202d3830707821696d706f7274616e740a202020207d0a20202020627574746f6e2e622d73686172652d666f726d2d627574746f6e5f73746174655f70726573736564207b0a20202020202020206f766572666c6f773a76697369626c650a202020207d0a202020202e622d73686172652d666f726d2d627574746f6e5f69636f6e73207b0a2020202020202020706f736974696f6e3a72656c61746976653b0a202020202020202070616464696e673a303b0a20202020202020206261636b67726f756e642d706f736974696f6e3a30202d3230707821696d706f7274616e740a202020207d0a202020202e622d73686172652d666f726d2d627574746f6e5f69636f6e73202e622d73686172652d666f726d2d627574746f6e5f5f6265666f7265207b0a20202020202020206c6566743a303b0a20202020202020206d617267696e2d6c6566743a2d3370783b0a20202020202020206261636b67726f756e642d706f736974696f6e3a30203021696d706f7274616e740a202020207d0a202020202e622d73686172652d666f726d2d627574746f6e5f69636f6e73202e622d73686172652d666f726d2d627574746f6e5f5f6166746572207b0a20202020202020207a2d696e6465783a2d313b0a20202020202020206d617267696e2d6c6566743a303b0a20202020202020206261636b67726f756e642d706f736974696f6e3a2d337078203021696d706f7274616e740a202020207d0a202020202e622d73686172652d666f726d2d627574746f6e5f69636f6e73202e622d73686172655f5f68616e646c65207b0a202020202020202070616464696e673a32707821696d706f7274616e740a202020207d0a202020202e622d73686172652d666f726d2d627574746f6e5f69636f6e73202e622d73686172655f5f68616e646c655f6d6f7265207b0a2020202020202020706f736974696f6e3a72656c61746976653b0a202020202020202070616464696e672d72696768743a36707821696d706f7274616e743b0a20202020202020206d617267696e2d72696768743a2d3470780a202020207d0a202020202e622d73686172652d666f726d2d627574746f6e5f69636f6e73202e622d73686172652d69636f6e207b0a20202020202020206f7061636974793a2e353b0a20202020202020206261636b67726f756e642d696d6167653a75726c28696e6465782f696d616765732f622d73686172652d69636f6e5f73697a655f31342e706e67290a202020207d0a202020202e622d73686172652d666f726d2d627574746f6e5f69636f6e7320412e622d73686172655f5f68616e646c653a686f766572202e622d73686172652d69636f6e207b0a20202020202020206f7061636974793a310a202020207d0a202020202e622d7368617265207b0a2020202020202020666f6e743a3836252f312e34353435656d20417269616c2c2073616e732d73657269663b0a2020202020202020646973706c61793a2d6d6f7a2d696e6c696e652d626f783b0a2020202020202020646973706c61793a696e6c696e652d626c6f636b3b0a202020202020202070616464696e673a31707820337078203170782034707821696d706f7274616e743b0a2020202020202020766572746963616c2d616c69676e3a6d6964646c650a202020207d0a202020202e622d7368617265202e622d73686172652d666f726d2d627574746f6e207b0a2020202020202020666f6e742d73697a653a31656d0a202020207d0a202020202e622d73686172655f5f74657874202e622d73686172652d69636f6e207b0a20202020202020206d617267696e3a3020357078203020303b0a2020202020202020626f726465723a6e6f6e650a202020207d0a202020202e622d73686172655f5f74657874207b0a20202020202020206d617267696e2d72696768743a3570780a202020207d0a202020202e622d73686172655f5f68616e646c65207b0a2020202020202020666c6f61743a6c6566743b0a2020202020202020637572736f723a706f696e7465723b0a2020202020202020746578742d616c69676e3a6c6566743b0a2020202020202020746578742d6465636f726174696f6e3a6e6f6e6521696d706f7274616e743b0a20202020202020206865696768743a313670783b0a202020202020202070616464696e673a35707820337078203570782032707821696d706f7274616e743b0a2020202020202020637572736f723a706f696e7465723b0a2020202020202020746578742d616c69676e3a6c6566743b0a2020202020202020746578742d6465636f726174696f6e3a6e6f6e6521696d706f7274616e740a202020207d0a202020202e622d73686172655f5f68616e646c655f637572736f725f64656661756c74207b0a2020202020202020637572736f723a64656661756c74');
SELECT pg_catalog.lowrite(0, '\x0a202020207d0a202020202e622d73686172655f5f68616e646c65202e622d73686172652d666f726d2d627574746f6e207b0a20202020202020206d617267696e2d746f703a2d3270780a202020207d0a202020202e622d73686172655f5f6872207b0a2020202020202020646973706c61793a6e6f6e653b0a2020202020202020666c6f61743a6c6566743b0a202020202020202077696474683a3170783b0a20202020202020206865696768743a323670783b0a20202020202020206d617267696e3a30203370782030203270780a202020207d0a20202020612e622d73686172655f5f68616e646c653a686f766572202e622d73686172655f5f74657874207b0a2020202020202020746578742d6465636f726174696f6e3a756e6465726c696e653b0a2020202020202020636f6c6f723a234630300a202020207d0a202020202e622d73686172655f626f726465726564207b0a202020202020202070616464696e673a302032707820302033707821696d706f7274616e743b0a2020202020202020626f726465723a31707820736f6c696420236534653465343b0a20202020202020202d6d6f7a2d626f726465722d7261646975733a3570783b0a20202020202020202d7765626b69742d626f726465722d7261646975733a3570783b0a2020202020202020626f726465722d7261646975733a3570780a202020207d0a202020202e622d73686172655f626f726465726564202e622d73686172655f5f6872207b0a2020202020202020646973706c61793a696e6c696e653b0a20202020202020206261636b67726f756e643a236534653465340a202020207d0a202020202e622d73686172655f6c696e6b207b0a20202020202020206d617267696e3a2d38707820300a202020207d0a20202020612e622d73686172655f6c696e6b207b0a20202020202020206d617267696e3a300a202020207d0a202020202e622d73686172655f6c696e6b202e622d73686172655f5f74657874207b0a2020202020202020746578742d6465636f726174696f6e3a756e6465726c696e653b0a2020202020202020636f6c6f723a233161336463310a202020207d0a202020202e622d73686172652d666f726d2d627574746f6e5f7368617265207b0a202020202020202070616464696e672d6c6566743a3236707821696d706f7274616e743b0a2020202020202020766572746963616c2d616c69676e3a746f700a202020207d0a202020202e622d73686172652d666f726d2d627574746f6e5f7368617265202e622d73686172652d666f726d2d627574746f6e5f5f6265666f7265207b0a20202020202020206d617267696e2d6c6566743a2d323970780a202020207d0a202020202e622d73686172652d666f726d2d627574746f6e5f7368617265202e622d73686172652d666f726d2d627574746f6e5f5f69636f6e207b0a2020202020202020706f736974696f6e3a6162736f6c7574653b0a202020202020202077696474683a323070783b0a20202020202020206865696768743a313770783b0a20202020202020206d617267696e3a31707820302030202d323370783b0a20202020202020206261636b67726f756e643a75726c28696e6465782f696d616765732f622d73686172652d666f726d2d627574746f6e5f73686172655f5f69636f6e2e706e672920302030206e6f2d7265706561740a202020207d0a202020202e622d73686172652d70736575646f2d6c696e6b207b0a2020202020202020626f726465722d626f74746f6d3a31707820646f747465643b0a2020202020202020637572736f723a706f696e7465723b0a2020202020202020746578742d6465636f726174696f6e3a6e6f6e6521696d706f7274616e740a202020207d0a202020202e622d73686172655f666f6e745f6669786564207b0a2020202020202020666f6e742d73697a653a313170780a202020207d0a202020202e622d73686172655f5f68616e646c655f6d6f7265207b0a2020202020202020666f6e742d73697a653a3970783b0a20202020202020206d617267696e2d746f703a2d3170783b0a2020202020202020636f6c6f723a233762376237620a202020207d0a20202020412e622d73686172655f5f68616e646c655f6d6f72653a686f766572207b0a2020202020202020636f6c6f723a233030300a202020207d0a202020202e622d73686172655f5f67726f7570207b0a2020202020202020666c6f61743a6c6566740a202020207d0a202020202e622d73686172652d69636f6e207b0a2020202020202020666c6f61743a6c6566743b0a2020202020202020646973706c61793a696e6c696e653b0a20202020202020206f766572666c6f773a68696464656e3b0a202020202020202077696474683a313670783b0a20202020202020206865696768743a313670783b0a202020202020202070616464696e673a3021696d706f7274616e743b0a2020202020202020766572746963616c2d616c69676e3a746f703b0a2020202020202020626f726465723a303b0a20202020202020206261636b67726f756e643a75726c28696e6465782f696d616765732f622d73686172652d69636f6e2e706e672920302039397078206e6f2d7265706561740a202020207d0a202020202e622d73686172652d69636f6e5f766b6f6e74616b74652c202e622d73686172652d69636f6e5f637573746f6d207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a3020300a202020207d0a202020202e622d73686172652d69636f6e5f796172752c202e622d73686172652d69636f6e5f796172755f70686f746f2c202e622d73686172652d69636f6e5f796172755f776973686c697374207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a30202d313770780a202020207d0a202020202e622d73686172652d69636f6e5f6c6a207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a30202d333470780a202020207d0a202020202e622d73686172652d69636f6e5f74776974746572207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a30202d353170780a202020207d0a202020202e622d73686172652d69636f6e5f66616365626f6f6b207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a30202d363870780a202020207d0a202020202e622d73686172652d69636f6e5f6d6f696d6972207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a30202d383570780a202020207d0a202020202e622d73686172652d69636f6e5f667269656e6466656564207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a30202d31303270780a202020207d0a202020202e622d73686172652d69636f6e5f6d61696c207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a30202d31313970780a202020207d0a202020202e622d73686172652d69636f6e5f68746d6c207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a30202d31333670780a202020207d0a202020202e622d73686172652d69636f6e5f706f737463617264207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a30202d31353370780a202020207d0a202020202e622d73686172652d69636f6e5f6f646e6f6b6c6173736e696b69207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a30202d31373070780a202020207d0a202020202e622d73686172652d69636f6e5f626c6f67676572207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a30202d31383770780a202020207d0a202020202e622d73686172652d69636f6e5f67726561646572207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a30202d32303470780a202020207d0a202020202e622d73686172652d69636f6e5f64656c6963696f7573207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a30202d32323170780a202020207d0a202020202e622d73686172652d69636f6e5f6762757a7a207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a30202d32333870780a202020207d0a202020202e622d73686172652d69636f6e5f6c696e6b6564696e207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a30202d32353570780a202020207d0a202020202e622d73686172652d69636f6e5f6d797370616365207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a30202d32373270780a202020207d0a202020202e622d73686172652d69636f6e5f657665726e6f7465207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a30202d32383970780a202020207d0a202020202e622d73686172652d69636f6e5f64696767207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a30202d33303670780a202020207d0a202020202e622d73686172652d69636f6e5f6a7569636b207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a30202d33323470780a202020207d0a202020202e622d73686172652d69636f6e5f6d6f696b727567207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a30202d33343170780a202020207d0a202020202e622d73686172652d69636f6e5f79617a616b6c61646b69207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a30202d33353870780a202020207d0a202020202e622d73686172652d69636f6e5f6c697665696e7465726e6574207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a30202d33373570780a202020207d0a202020202e622d73686172652d69636f6e5f7475746279207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a30202d33393270780a202020207d0a202020202e622d73686172652d69636f6e5f6469617279207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a30202d34303970780a202020207d0a202020202e622d73686172652d69636f6e5f67706c7573207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a30202d34323670780a202020207d0a202020202e622d73686172652d69636f6e5f706f636b6574207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a30202d34343370780a202020207d0a202020202e622d73686172652d69636f6e5f73757266696e6762697264207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a30202d34363070780a202020207d0a202020202e622d73686172652d69636f6e5f70696e746572657374207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a30202d34373770780a202020207d0a202020202e622d73686172655f7468656d655f6461726b202e622d73686172652d69636f6e207b0a20202020202020206261636b67726f756e643a75726c28696e6465782f696d616765732f622d73686172652d69636f6e735f5f7468656d655f6461726b2e706e672920393970782030206e6f2d7265706561740a202020207d0a202020202e622d73686172655f7468656d655f6461726b202e622d73686172652d69636f6e5f6f646e6f6b6c6173736e696b69207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a2d347078202d3370780a202020207d0a202020202e622d73686172655f7468656d655f6461726b202e622d73686172652d69636f6e5f766b6f6e74616b7465207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a2d32347078202d3370780a202020207d0a202020202e622d73686172655f7468656d655f6461726b202e622d73686172652d69636f6e5f74776974746572207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a2d34347078202d3370780a202020207d0a202020202e622d73686172655f7468656d655f6461726b202e622d73686172652d69636f6e5f66616365626f6f6b207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a2d36347078202d3370780a202020207d0a202020202e622d73686172655f7468656d655f6461726b202e622d73686172652d69636f6e5f6c6a207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a2d38357078202d3370780a202020207d0a202020202e622d73686172655f7468656d655f6461726b202e622d73686172652d69636f6e5f79617275207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a2d3130357078202d3370780a202020207d0a202020202e622d73686172655f7468656d655f6461726b202e622d73686172652d706f707570202e622d73686172652d69636f6e5f6f646e6f6b6c6173736e696b692c202e622d73686172655f7468656d655f6461726b202e622d73686172652d69636f6e5f6f646e6f6b6c6173736e696b693a686f766572207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a2d347078202d323870780a202020207d0a202020202e622d73686172655f7468656d655f6461726b202e622d73686172652d706f707570202e622d73686172652d69636f6e5f766b6f6e74616b74652c202e622d73686172655f7468656d655f6461726b202e622d73686172652d69636f6e5f766b6f6e74616b74653a686f766572207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a2d32347078202d323870780a202020207d0a202020202e622d73686172655f7468656d655f6461726b202e622d73686172652d706f707570202e622d73686172652d69636f6e5f747769747465722c202e622d73686172655f7468656d655f6461726b202e622d73686172652d69636f6e5f747769747465723a686f766572207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a2d34347078202d323870780a202020207d0a202020202e622d73686172655f7468656d655f6461726b202e622d73686172652d706f707570202e622d73686172652d69636f6e5f66616365626f6f6b2c202e622d73686172655f7468656d655f6461726b202e622d73686172652d69636f6e5f66616365626f6f6b3a686f766572207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a2d36347078202d323870780a202020207d0a202020202e622d73686172655f7468656d655f6461726b202e622d73686172652d706f707570202e622d73686172652d69636f6e5f6c6a2c202e622d73686172655f7468656d655f6461726b202e622d73686172652d69636f6e5f6c6a3a686f766572207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a2d38357078202d323870780a202020207d0a202020202e622d73686172655f7468656d655f6461726b202e622d73686172652d706f707570202e622d73686172652d69636f6e5f796172752c202e622d73686172655f7468656d655f6461726b202e622d73686172652d69636f6e5f796172753a686f766572207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a2d3130357078202d323870780a202020207d0a202020202e622d73686172655f7468656d655f6461726b202e622d73686172655f5f74657874207b0a2020202020202020636f6c6f723a236666660a202020207d0a202020202e622d73686172655f7468656d655f6461726b202e622d73686172652d666f726d2d627574746f6e5f7368617265202e622d73686172652d666f726d2d627574746f6e5f5f69636f6e207b0a20202020202020206261636b67726f756e642d696d6167653a75726c2822696e6465782f696d616765732f622d73686172652d666f726d2d627574746f6e5f73686172655f5f69636f6e5f6461726b2e706e6722290a202020207d0a202020202e622d73686172655f7468656d655f6461726b202e622d73686172652d666f726d2d627574746f6e207b0a2020202020202020636f6c6f723a2366666621696d706f7274616e743b0a20202020202020206f7061636974793a2e380a202020207d0a202020202e622d73686172655f7468656d655f6461726b202e622d73686172655f5f68616e646c653a686f766572202e622d73686172652d666f726d2d627574746f6e2c202e622d73686172655f7468656d655f6461726b202e622d73686172652d666f726d2d627574746f6e3a686f766572207b0a20202020202020206f7061636974793a313b0a2020202020202020637572736f723a706f696e7465720a202020207d0a202020202e622d73686172655f7468656d655f6461726b202e622d73686172652d666f726d2d627574746f6e2c202e622d73686172655f7468656d655f6461726b202e622d73686172652d666f726d2d627574746f6e5f5f6265666f72652c202e622d73686172655f7468656d655f6461726b202e622d73686172652d666f726d2d627574746f6e5f5f6166746572207b0a20202020202020206261636b67726f756e643a7472616e73706172656e740a202020207d0a202020202e622d73686172655f7468656d655f6461726b202e622d73686172652d706f7075705f5f69207b0a20202020202020206261636b67726f756e642d636f6c6f723a233333333b0a2020202020202020626f726465722d7261646975733a313070783b0a20202020202020202d7765626b69742d626f782d736861646f773a3020327078203970782072676261283235352c203235352c203235352c20302e36293b0a20202020202020202d6d6f7a2d626f782d736861646f773a3020327078203970782072676261283235352c203235352c203235352c20302e36293b0a2020202020202020626f782d736861646f773a3020327078203970782072676261283235352c203235352c203235352c20302e36290a202020207d0a202020202e622d73686172655f7468656d655f6461726b202e622d73686172655f5f74657874207b0a2020202020202020636f6c6f723a234141410a202020207d0a202020202e622d73686172655f7468656d655f6461726b202e622d73686172652d706f707570207b0a2020202020202020636f6c6f723a234141413b0a2020202020202020626f726465722d7261646975733a313070783b0a20202020202020206261636b67726f756e642d636f6c6f723a233333333b0a20202020202020206261636b67726f756e642d636f6c6f723a726762612835302c2035302c2035302c20302e33290a202020207d0a202020202e622d73686172655f7468656d655f6461726b202e622d73686172652d706f7075705f5f6974656d207b0a20202020202020206261636b67726f756e643a7472616e73706172656e743b0a2020202020202020636f6c6f723a236363630a202020207d0a202020202e622d73686172655f7468656d655f6461726b202e622d73686172652d706f707570202e622d73686172652d706f7075705f5f6974656d5f5f74657874207b0a2020202020202020636f6c6f723a236363630a202020207d0a202020202e622d73686172655f7468656d655f636f756e746572202e622d73686172652d69636f6e207b0a20202020202020206261636b67726f756e643a75726c28696e6465782f696d616765732f622d73686172652d69636f6e735f5f7468656d655f636f756e7465722e706e672920393970782030206e6f2d7265706561743b0a2020202020202020646973706c61793a626c6f636b3b0a2020202020202020666c6f61743a6c6566743b0a202020202020202077696474683a323870783b0a20202020202020206865696768743a323670783b0a20202020202020206d617267696e3a303b0a202020202020202070616464696e673a303b0a20202020202020206261636b67726f756e642d706f736974696f6e3a3939707820303b0a2020202020202020626f726465722d7261646975733a3470783b0a20202020202020202d6d6f7a2d626f726465722d7261646975733a3470783b0a20202020202020202d7765626b69742d626f726465722d7261646975733a3470783b0a20202020202020202d6b68746d6c2d626f726465722d7261646975733a3470783b0a20202020202020207a2d696e6465783a2d310a202020207d0a202020202e622d73686172655f7468656d655f636f756e746572202e622d73686172655f5f6c696e6b207b0a2020202020202020646973706c61793a696e6c696e652d626c6f636b3b0a20202020202020206261636b67726f756e643a6c69676874677265793b0a20202020202020206d617267696e3a303b0a202020202020202070616464696e673a3021696d706f7274616e743b0a2020202020202020626f726465722d7261646975733a3470783b0a20202020202020202d6d6f7a2d626f726465722d7261646975733a3470783b0a20202020202020202d7765626b69742d626f726465722d7261646975733a3470783b0a20202020202020202d6b68746d6c2d626f726465722d7261646975733a3470783b0a2020202020202020706f736974696f6e3a72656c61746976653b0a2020202020202020746578742d6465636f726174696f6e3a6e6f6e653b0a2020202020202020626f726465722d746f703a31707820736f6c696420236330633063303b0a2020202020202020626f726465722d626f74746f6d3a31707820736f6c696420236330633063303b0a2020202020202020626f782d736861646f773a30203170782032707820233930393039303b0a20202020202020206865696768743a6175746f3b0a20202020202020207a2d696e6465783a300a202020207d0a202020202e622d73686172655f7468656d655f636f756e74657220613a616374697665207b0a2020202020202020626f726465722d626f74746f6d3a303b0a2020202020202020626f726465722d746f703a31707820736f6c696420236330633063303b0a20202020202020206f7061636974793a2e373b0a202020202020202066696c7465723a616c706861286f7061636974793d3730290a202020207d0a202020202e622d73686172655f7468656d655f636f756e746572202e622d73686172652d62746e5f5f766b6f6e74616b74652c202e622d73686172655f7468656d655f636f756e746572202e622d73686172652d62746e5f5f766b6f6e74616b74653a686f766572202e622d73686172652d69636f6e207b0a20202020202020206261636b67726f756e642d636f6c6f723a233462373761323b0a2020202020202020626f726465722d626f74746f6d2d636f6c6f723a233364363138393b0a2020202020202020626f726465722d746f702d636f6c6f723a233537383061380a202020207d0a202020202e622d73686172655f7468656d655f636f756e746572202e622d73686172652d62746e5f5f766b6f6e74616b74653a616374697665207b0a2020202020202020626f726465722d746f702d636f6c6f723a233364363138390a202020207d0a202020202e622d73686172655f7468656d655f636f756e746572202e622d73686172652d69636f6e5f766b6f6e74616b7465207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a2d327078202d333270780a202020207d0a202020202e622d73686172655f7468656d655f636f756e746572202e622d73686172652d62746e5f5f747769747465722c202e622d73686172655f7468656d655f636f756e746572202e622d73686172652d62746e5f5f747769747465723a686f766572202e622d73686172652d69636f6e207b0a20202020202020206261636b67726f756e642d636f6c6f723a233030616665653b0a2020202020202020626f726465722d626f74746f6d2d636f6c6f723a233030393664333b0a2020202020202020626f726465722d746f702d636f6c6f723a233066623565660a202020207d0a202020202e622d73686172655f7468656d655f636f756e746572202e622d73686172652d62746e5f5f747769747465723a616374697665207b0a2020202020202020626f726465722d746f702d636f6c6f723a233030393664330a202020207d0a202020202e622d73686172655f7468656d655f636f756e746572202e622d73686172652d69636f6e5f74776974746572207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a2d327078202d393870780a202020207d0a202020202e622d73686172655f7468656d655f636f756e746572202e622d73686172652d62746e5f5f796172752c202e622d73686172655f7468656d655f636f756e746572202e622d73686172652d62746e5f5f796172753a686f766572202e622d73686172652d69636f6e207b0a20202020202020206261636b67726f756e642d636f6c6f723a236264626462643b0a2020202020202020626f726465722d626f74746f6d2d636f6c6f723a236135613561353b0a2020202020202020626f726465722d746f702d636f6c6f723a236332633263320a202020207d0a202020202e622d73686172655f7468656d655f636f756e746572202e622d73686172652d62746e5f5f796172753a616374697665207b0a2020202020202020626f726465722d746f702d636f6c6f723a236135613561350a202020207d0a202020202e622d73686172655f7468656d655f636f756e746572202e622d73686172652d69636f6e5f79617275207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a2d327078203170780a202020207d0a202020202e622d73686172655f7468656d655f636f756e746572202e622d73686172652d62746e5f5f667269656e64666565642c202e622d73686172655f7468656d655f636f756e746572202e622d73686172652d62746e5f5f667269656e64666565643a686f766572202e622d73686172652d69636f6e207b0a20202020202020206261636b67726f756e642d636f6c6f723a233637376663383b0a2020202020202020626f726465722d626f74746f6d2d636f6c6f723a233463363661663b0a2020202020202020626f726465722d746f702d636f6c6f723a233663383463640a202020207d0a202020202e622d73686172655f7468656d655f636f756e746572202e622d73686172652d62746e5f5f667269656e64666565643a616374697665207b0a2020202020202020626f726465722d746f702d636f6c6f723a233463363661660a202020207d0a202020202e622d73686172655f7468656d655f636f756e746572202e622d73686172652d69636f6e5f667269656e6466656564207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a2d327078202d32333070780a202020207d0a202020202e622d73686172655f7468656d655f636f756e746572202e622d73686172652d62746e5f5f6c6a2c202e622d73686172655f7468656d655f636f756e746572202e622d73686172652d62746e5f5f6c6a3a686f766572202e622d73686172652d69636f6e207b0a20202020202020206261636b67726f756e642d636f6c6f723a233433376163373b0a2020202020202020626f726465722d626f74746f6d2d636f6c6f723a233362373262663b0a2020202020202020626f726465722d746f702d636f6c6f723a233535386364390a202020207d0a202020202e622d73686172655f7468656d655f636f756e746572202e622d73686172652d62746e5f5f6c6a3a616374697665207b0a2020202020202020626f726465722d746f702d636f6c6f723a233362373262660a202020207d0a202020202e622d73686172655f7468656d655f636f756e746572202e622d73686172652d69636f6e5f6c6a207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a2d327078202d31393770780a202020207d0a202020202e622d73686172655f7468656d655f636f756e746572202e622d73686172652d62746e5f5f6f646e6f6b6c6173736e696b692c202e622d73686172655f7468656d655f636f756e746572202e622d73686172652d62746e5f5f6f646e6f6b6c6173736e696b693a686f766572202e622d73686172652d69636f6e207b0a20202020202020206261636b67726f756e642d636f6c6f723a236666613235303b0a2020202020202020626f726465722d626f74746f6d2d636f6c6f723a236534386134313b0a2020202020202020626f726465722d746f702d636f6c6f723a236666613935620a202020207d0a202020202e622d73686172655f7468656d655f636f756e746572202e622d73686172652d62746e5f5f6f646e6f6b6c6173736e696b693a616374697665207b0a2020202020202020626f726465722d746f702d636f6c6f723a236534386134310a202020207d0a202020202e622d73686172655f7468656d655f636f756e746572202e622d73686172652d69636f6e5f6f646e6f6b6c6173736e696b69207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a2d327078202d31333170780a202020207d0a202020202e622d73686172655f7468656d655f636f756e746572202e622d73686172652d62746e5f5f6d6f696b7275672c202e622d73686172655f7468656d655f636f756e746572202e622d73686172652d62746e5f5f6d6f696b7275673a686f766572202e622d73686172652d69636f6e207b0a20202020202020206261636b67726f756e642d636f6c6f723a233665623065343b0a2020202020202020626f726465722d626f74746f6d2d636f6c6f723a233636613864633b0a2020202020202020626f726465722d746f702d636f6c6f723a233830633266360a202020207d0a202020202e622d73686172655f7468656d655f636f756e746572202e622d73686172652d62746e5f5f6d6f696b7275673a616374697665207b0a2020202020202020626f726465722d746f702d636f6c6f723a233636613864630a202020207d0a202020202e622d73686172655f7468656d655f636f756e746572202e622d73686172652d69636f6e5f6d6f696b727567207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a2d327078202d32363370780a202020207d0a202020202e622d73686172655f7468656d655f636f756e746572202e622d73686172652d62746e5f5f6d6f696d69722c202e622d73686172655f7468656d655f636f756e746572202e622d73686172652d62746e5f5f6d6f696d69723a686f766572202e622d73686172652d69636f6e207b0a20202020202020206261636b67726f756e642d636f6c6f723a233233373362613b0a2020202020202020626f726465722d626f74746f6d2d636f6c6f723a233164356561313b0a2020202020202020626f726465722d746f702d636f6c6f723a233331376362660a202020207d0a202020202e622d73686172655f7468656d655f636f756e746572202e622d73686172652d62746e5f5f6d6f696d69723a616374697665207b0a2020202020202020626f726465722d746f702d636f6c6f723a233164356561310a202020207d0a202020202e622d73686172655f7468656d655f636f756e746572202e622d73686172652d69636f6e5f6d6f696d6972207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a2d327078202d31363470780a202020207d0a202020202e622d73686172655f7468656d655f636f756e746572202e622d73686172652d62746e5f5f66616365626f6f6b2c202e622d73686172655f7468656d655f636f756e746572202e622d73686172652d62746e5f5f66616365626f6f6b3a686f766572202e622d73686172652d69636f6e207b0a20202020202020206261636b67726f756e642d636f6c6f723a233365356539633b0a2020202020202020626f726465722d626f74746f6d2d636f6c6f723a233333346438333b0a2020202020202020626f726465722d746f702d636f6c6f723a233461363861330a202020207d0a202020202e622d73686172655f7468656d655f636f756e746572202e622d73686172652d62746e5f5f66616365626f6f6b3a616374697665207b0a2020202020202020626f726465722d746f702d636f6c6f723a233333346438330a202020207d0a202020202e622d73686172655f7468656d655f636f756e746572202e622d73686172652d69636f6e5f66616365626f6f6b207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a2d327078202d363570780a202020207d0a202020202e622d73686172655f7468656d655f636f756e746572202e622d73686172652d62746e5f5f67706c75732c202e622d73686172655f7468656d655f636f756e746572202e622d73686172652d62746e5f5f67706c75733a686f766572202e622d73686172652d69636f6e207b0a20202020202020206261636b67726f756e642d636f6c6f723a236334353533363b0a2020202020202020626f726465722d626f74746f6d2d636f6c6f723a236162343632643b0a2020202020202020626f726465722d746f702d636f6c6f723a236338363034330a202020207d0a202020202e622d73686172655f7468656d655f636f756e746572202e622d73686172652d62746e5f5f67706c75733a616374697665207b0a2020202020202020626f726465722d746f702d636f6c6f723a236162343632640a202020207d0a202020202e622d73686172655f7468656d655f636f756e746572202e622d73686172652d69636f6e5f67706c7573207b0a20202020202020206261636b67726f756e642d706f736974696f6e3a2d327078202d32393670780a202020207d0a202020202e622d73686172652d636f756e746572207b0a2020202020202020646973706c61793a6e6f6e650a202020207d0a202020202e622d73686172652d62746e5f5f636f756e746572202e622d73686172652d636f756e746572207b0a2020202020202020646973706c61793a626c6f636b0a202020207d0a202020202e622d73686172655f7468656d655f636f756e746572202e622d73686172652d636f756e746572207b0a2020202020202020666c6f61743a6c6566743b0a20202020202020206d617267696e3a327078203470783b0a202020202020202070616464696e673a303b0a2020202020202020666f6e742d73697a653a313470783b0a20202020202020206c696e652d6865696768743a313870783b0a2020202020202020636f6c6f723a77686974653b0a202020202020202070616464696e673a327078203470783b0a2020202020202020746578742d6465636f726174696f6e3a6e6f6e6521696d706f7274616e740a202020207d0a202020202e622d73686172652d62746e5f5f77726170207b0a20202020202020206261636b67726f756e643a7267626128302c20302c20302c202e37293b0a2020202020202020646973706c61793a696e6c696e652d626c6f636b3b0a20202020202020206865696768743a6175746f3b0a20202020202020206d617267696e3a30203470783b0a202020202020202070616464696e673a303b0a2020202020202020626f726465722d7261646975733a3470783b0a20202020202020202d6d6f7a2d626f726465722d7261646975733a3470783b0a20202020202020202d7765626b69742d626f726465722d7261646975733a3470783b0a20202020202020202d6b68746d6c2d626f726465722d7261646975733a3470780a202020207d0a202020202e622d73686172655f7468656d655f636f756e746572202e622d73686172655f5f6c696e6b3a686f766572202e622d73686172652d69636f6e3a6166746572207b0a20202020202020206261636b67726f756e642d636f6c6f723a696e68657269743b0a20202020202020206261636b67726f756e642d696d6167653a6e6f6e653b0a20202020202020205f6261636b67726f756e642d636f6c6f723a7472616e73706172656e743b0a2020202020202020636f6e74656e743a22223b0a2020202020202020646973706c61793a626c6f636b3b0a20202020202020205f646973706c61793a6e6f6e653b0a20202020202020206f7061636974793a2e323b0a202020202020202066696c7465723a616c706861286f7061636974793d3230293b0a2020202020202020706f736974696f6e3a6162736f6c7574653b0a202020202020202077696474683a323670783b0a2020202020202020626f74746f6d3a303b0a20202020202020206c6566743a303b0a20202020202020206865696768743a3530250a202020207d0a202020202e622d73686172655f7468656d655f636f756e746572202e622d73686172655f747970655f736d616c6c202e622d73686172655f5f6c696e6b3a686f766572202e622d73686172652d69636f6e3a6166746572207b0a202020202020202077696474683a313870780a202020207d0a202020202e622d73686172655f7468656d655f636f756e746572202e622d73686172655f747970655f736d616c6c202e622d73686172652d69636f6e207b0a20202020202020206261636b67726f756e642d696d6167653a75726c28696e6465782f696d616765732f622d73686172652d736d616c6c2d636f756e7465722d69636f6e732e706e67293b0a202020202020202077696474683a323070783b0a20202020202020206865696768743a313870783b0a2020202020202020626f726465722d7261646975733a3370783b0a20202020202020202d6d6f7a2d626f726465722d7261646975733a3370783b0a20202020202020202d7765626b69742d626f726465722d7261646975733a3370783b0a20202020202020202d6b68746d6c2d626f726465722d7261646975733a3370780a202020207d0a202020202e622d73686172655f7468656d655f636f756e746572202e622d73686172655f5f6c696e6b207b0a2020202020202020626f726465722d7261646975733a3370783b0a20202020202020202d6d6f7a2d626f726465722d7261646975733a3370783b0a20202020202020202d7765626b69742d626f726465722d7261646975733a3370783b0a20202020202020202d6b68746d6c2d626f726465722d7261646975733a3370780a202020207d0a202020202e622d73686172655f7468656d655f636f756e746572202e622d73686172655f747970655f736d616c6c202e622d73686172652d636f756e746572207b0a2020202020202020666f6e742d73697a653a313170783b0a2020202020202020666f6e742d73697a653a31302e3570783b0a202020202020202070616464696e673a327078203020303b0a20202020202020206d617267696e3a327078203470783b0a20202020202020206c696e652d6865696768743a313070783b0a20202020202020205f70616464696e672d746f703a312e3570780a202020207d0a202020203c2f7374796c653e0a202020203c7374796c6520747970653d22746578742f637373223e3c2f7374796c653e0a093c736372697074206c616e67756167653d226a61766173637269707422207372633d22636f6d6d6f6e2e6a73223e3c2f7363726970743e0a093c736372697074206c616e67756167653d226a61766173637269707422207372633d226a71756572792e6a73223e3c2f7363726970743e0a093c736372697074206c616e67756167653d226a61766173637269707422207372633d226a71756572792e636f6f6b69652e6a73223e3c2f7363726970743e0a093c736372697074206c616e67756167653d226a617661736372697074223e0a090966756e6374696f6e20697356616c696428297b0a0909202069662028646f63756d656e742e676574456c656d656e744279496428226c6f67696e22292e76616c7565203d3d206e756c6c207c7c20646f63756d656e742e676574456c656d656e744279496428226c6f67696e22292e76616c75652e6c656e677468203d3d2030297b0a090909616c6572742822456e746572206c6f67696e22293b0a090909646f63756d656e742e676574456c656d656e744279496428226c6f67696e22292e666f63757328293b0a09090972657475726e2066616c73653b0a090920207d0a0909202069662028646f63756d656e742e676574456c656d656e744279496428227073776422292e76616c7565203d3d206e756c6c207c7c20646f63756d656e742e676574456c656d656e744279496428227073776422292e76616c75652e6c656e677468203d3d2030297b0a090909616c6572742822456e7465722070617373776f726422293b0a090909646f63756d656e742e676574456c656d656e744279496428227073776422292e666f63757328293b0a09090972657475726e2066616c73653b0a090920207d0a0909202072657475726e20747275653b0a09097d0a0a0909766172206c6f63616c655f736572766c6574203d2022656e223b0a090976617220627574746f6e55524c203d2022696e6465782f696d616765732f656e7465722f656e7465722e72752e706e67223b0a090976617220627574746f6e5072657373656455524c203d2022696e6465782f696d616765732f656e7465722f656e7465722e72752e707265737365642e706e67223b0a0a090966756e6374696f6e2072656164436f6f6b6965286e616d6529207b0a09092020766172206e616d654551203d206e616d65202b20223d223b0a09092020766172206361203d20646f63756d656e742e636f6f6b69652e73706c697428273b27293b0a09092020666f722876617220693d303b69203c2063612e6c656e6774683b692b2b29207b0a09092020207661722063203d2063615b695d3b0a09092020207768696c652028632e6368617241742830293d3d272027292063203d20632e737562737472696e6728312c632e6c656e677468293b0a090920202069662028632e696e6465784f66286e616d65455129203d3d2030292072657475726e20632e737562737472696e67286e616d6545512e6c656e6774682c632e6c656e677468293b0a0909207d0a09092072657475726e206e756c6c3b0a092020207d0a092020200a0920202066756e6374696f6e207573654c6f63616c6528297b0a0a0909766172206c6f63616c655f636f6f6b6965203d2072656164436f6f6b696528226d616e6167656d656e745f6c6f63616c6522293b0a0a090909097472797b0a090909090972755374796c65203d20226c696e6b223b0a09090909096b7a5374796c65203d20226c696e6b223b0a0909090909656e5374796c65203d20226c696e6b223b0a090909090969662028216c6f63616c655f636f6f6b6965297b0a0909090909096c6f63616c655f636f6f6b6965203d206c6f63616c655f736572766c65743b0a09090909097d0a0909090909696620286c6f63616c655f636f6f6b6965203d3d20226b7a22297b0a0909090909096b7a5374796c65203d20226c696e6b53656c6563746564223b0a090909090909627574746f6e55524c203d2022696e6465782f696d616765732f656e7465722f656e7465722e6b7a2e706e67223b0a090909090909627574746f6e5072657373656455524c203d2022696e6465782f696d616765732f656e7465722f656e7465722e6b7a2e707265737365642e706e67223b0a0909090909092f2f646f63756d656e742e676574456c656d656e744279496428226b7a5f696d6722292e737263203d2022696e6465782f696d616765732f6c6f67696e2f6b617a2e6a7067223b0a09090909097d20656c736520696620286c6f63616c655f636f6f6b6965203d3d2022656e22297b0a090909090909656e5374796c65203d20226c696e6b53656c6563746564223b0a090909090909627574746f6e55524c203d2022696e6465782f696d616765732f656e7465722f656e7465722e656e2e706e67223b0a090909090909627574746f6e5072657373656455524c203d2022696e6465782f696d616765732f656e7465722f656e7465722e656e2e707265737365642e706e67223b0a09090909097d20656c7365207b0a09090909090972755374796c65203d20226c696e6b53656c6563746564223b0a09090909097d0a090909097d6361746368202865297b0a0909090909616c6572742865293b0a090909097d0a0920207d0a0a09202066756e6374696f6e20666f6c6c6f774c696e6b286c6f63297b0a09096e6577436f6f6b696528226d616e6167656d656e745f6c6f63616c65222c206c6f632c2030293b0a090977696e646f772e6c6f636174696f6e203d20223f6c6f63616c653d222b6c6f633b0a0920207d');
SELECT pg_catalog.lowrite(0, '\x0a0a09202066756e6374696f6e2064697361626c65506c616365686f6c6465722865297b0a0909652e72656d6f76654174747269627574652822706c616365486f6c64657222293b0a0920207d0a09202066756e6374696f6e20656e61626c65506c616365686f6c64657228652c2073297b0a0909652e7365744174747269627574652822706c616365486f6c646572222c2073293b0a0920207d0a093c2f7363726970743e0a3c2f686561643e0a0a3c626f647920636c6173733d226d61696e5f70616765207061747465726e5f62672022207374796c653d227a6f6f6d3a20313b223e0a0a202020203c64697620636c6173733d22736861646f775f746f70223e0a20202020202020203c64697620636c6173733d226d61696e5f666c61675f6267223e0a2020202020202020202020203c64697620636c6173733d22636f6e7461696e6572223e0a202020202020202020202020202020203c64697620636c6173733d22636f6e7461696e65722d666c756964223e0a20202020202020202020202020202020202020203c64697620636c6173733d2277686974655f6c696e6b20726f775f666c756964223e0a2020202020202020202020202020202020202020202020203c756c20636c6173733d22696e6c696e65206c616e67223e0a202020202020202020202020202020202020202020202020202020203c6c693e3c612069643d226c616e675f6b617a2220687265663d222322206f6e636c69636b3d22666f6c6c6f774c696e6b28276b7a2729222072656c3d226e6f666f6c6c6f772220636c6173733d2262746e2062746e2d6d696e692062746e2d7072696d617279223e3c7370616e20636c6173733d226c73223ed29ad0b0d0b73c2f7370616e3e3c2f613e3c2f6c693e0a202020202020202020202020202020202020202020202020202020203c6c693e3c612069643d226c616e675f7275732220687265663d222322206f6e636c69636b3d22666f6c6c6f774c696e6b2827727527292220636c6173733d2262746e2062746e2d6d696e692062746e2d7072696d617279223e3c7370616e20636c6173733d226c73223ed0a0d183d1813c2f7370616e3e3c2f613e3c2f6c693e0a202020202020202020202020202020202020202020202020202020203c6c693e3c612069643d226c616e675f656e672220687265663d222322206f6e636c69636b3d22666f6c6c6f774c696e6b2827656e27292220636c6173733d2262746e2062746e2d6d696e692062746e2d7072696d617279223e3c7370616e20636c6173733d226c73223e456e673c2f7370616e3e3c2f613e3c2f6c693e0a2020202020202020202020202020202020202020202020203c2f756c3e0a2020202020202020202020202020202020202020202020203c64697620636c6173733d226c6f676f223e0a202020202020202020202020202020202020202020202020202020203c6120687265663d2223223e0a20202020202020202020202020202020202020202020202020202020202020203c696d6720636c6173733d226c6f676f5f696d61676522207372633d22696e6465782f696d616765732f6269675f6c6f676f2e706e67223e0a202020202020202020202020202020202020202020202020202020203c2f613e0a0a202020202020202020202020202020202020202020202020202020203c64697620636c6173733d2263656e7465725f63617074696f6e223e0a20202020202020202020202020202020202020202020202020202020202020203c6120687265663d22232220636c6173733d226c696e6b223e0a2020202020202020202020202020202020202020202020202020202020202020202020203c212d2d203c64697620636c6173733d2263656e7465725f63617074696f6e5f6974656d223ed0a1d0bfd0bed180d182d182d18bd29b20d0b6d0b5d0bad0bfd0b52dd0b6d0b5d0ba20d0b6d399d0bdd0b520d0bad2afd18820d29bd0bed0bbd0b4d0b0d0bdd18bd0bbd0b0d182d18bd0bd20d181d0bfd0bed180d18220d182d2afd180d0bbd0b5d180d19620d0bad0bed0bdd184d0b5d0b4d0b5d180d0b0d186d0b8d18fd181d18b3c2f6469763e202d2d3e0a2020202020202020202020202020202020202020202020202020202020202020202020203c6469762069643d22756e6465725f7469746c652220636c6173733d2263656e7465725f63617074696f6e5f6974656d223ed09ad0bed0bdd184d0b5d0b4d0b5d180d0b0d186d0b8d18f20d181d0bfd0bed180d182d0b8d0b2d0bdd18bd18520d0b5d0b4d0b8d0bdd0bed0b1d0bed180d181d182d0b220d0b820d181d0b8d0bbd0bed0b2d18bd18520d0b2d0b8d0b4d0bed0b220d181d0bfd0bed180d182d0b03c2f6469763e0a2020202020202020202020202020202020202020202020202020202020202020202020203c212d2d203c64697620636c6173733d2263656e7465725f63617074696f6e5f6974656d223e436f6d62617420616e6420737472656e6774682073706f72747320636f6e66656465726174696f6e3c2f6469763e202d2d3e0a20202020202020202020202020202020202020202020202020202020202020203c2f613e0a202020202020202020202020202020202020202020202020202020203c2f6469763e0a202020202020202020202020202020202020202020202020202020203c666f726d20636c6173733d22666f726d5f6c6f67696e2220726f6c653d22666f726d2220616374696f6e3d226c6f67696e736572766c657422206d6574686f643d22504f5354223e0a20202020202020202020202020202020202020202020202020202020202020203c696e70757420636c6173733d22666f726d5f6c6f67696e5f696e7075742220747970653d22746578742220706c616365686f6c6465723d22d09bd0bed0b3d0b8d0bd22206e616d653d226c6f67696e222069643d226c6f67696e223e0a20202020202020202020202020202020202020202020202020202020202020203c696e70757420636c6173733d22666f726d5f6c6f67696e5f696e7075742220747970653d2270617373776f72642220706c616365686f6c6465723d22d09fd0b0d180d0bed0bbd18c22206e616d653d2270737764222069643d2270737764223e0a20202020202020202020202020202020202020202020202020202020202020203c627574746f6e20636c6173733d22666f726d5f6c6f67696e5f627574746f6e2062746e2062746e2d6c672062746e2d7072696d6172792062746e2d626c6f636b222076616c75653d22d092d0bed0b9d182d0b82220747970653d227375626d6974222069643d227375626d6974223ed092d0bed0b9d182d0b83c2f627574746f6e3e0a20202020202020202020202020202020202020202020202020202020202020203c6c6162656c20636c6173733d22636865636b626f7820666f726d5f6c6f67696e5f636865636b626f7822203e0a2020202020202020202020202020202020202020202020202020202020202020202020203c696e70757420747970653d22636865636b626f78222069643d2272656d656d6265725f6d6522206e616d653d2272656d656d6265725f6d65223e20d097d0b0d0bfd0bed0bcd0bdd0b8d182d18c20d0bcd0b5d0bdd18f0a20202020202020202020202020202020202020202020202020202020202020203c2f6c6162656c3e0a202020202020202020202020202020202020202020202020202020203c2f666f726d3e0a2020202020202020202020202020202020202020202020203c2f6469763e0a0a0a2020202020202020202020202020202020202020202020203c756c20636c6173733d22756e7374796c656420696e6c696e6520636c656172206e61765f636f6c756d6e206c6973745f66656465726174696f6e20223e0a202020202020202020202020202020202020202020202020202020203c6c6920636c6173733d22636f6c756d6e206c6973745f66656465726174696f6e5f6974656d206974656d5f626f7820223e0a20202020202020202020202020202020202020202020202020202020202020203c6120687265663d22687474703a2f2f636f6e66656465726174696f6e2e6b7a2f626f78202220636c6173733d226c696e6b20223e0a2020202020202020202020202020202020202020202020202020202020202020202020203c7370616e20636c6173733d22696d6720223e0a202020202020202020202020202020202020202020202020202020202020202020202020202020203c696d67207372633d22696e6465782f696d616765732f64306335393231366133333865646264313632343263663238346663643532385f726573697a655f775f3132365f685f3132362e706e67202220616c743d22d091d0bed0bad18120d184d0b5d0b4d0b5d180d0b0d186d0b8d18fd181d18b20223e203c6920636c6173733d2269636f6e5f666c616720223e3c2f693e0a2020202020202020202020202020202020202020202020202020202020202020202020203c2f7370616e3e0a2020202020202020202020202020202020202020202020202020202020202020202020203c7370616e2069643d226665645f626f782220636c6173733d226c7320223ed091d0bed0bad18120d184d0b5d0b4d0b5d180d0b0d186d0b8d18fd181d18b3c2f7370616e3e0a20202020202020202020202020202020202020202020202020202020202020203c2f613e0a202020202020202020202020202020202020202020202020202020203c2f6c693e0a202020202020202020202020202020202020202020202020202020203c6c6920636c6173733d22636f6c756d6e206c6973745f66656465726174696f6e5f6974656d206974656d5f77726573746c696e6720223e0a20202020202020202020202020202020202020202020202020202020202020203c6120687265663d22687474703a2f2f636f6e66656465726174696f6e2e6b7a2f77726573746c696e67202220636c6173733d226c696e6b20223e0a2020202020202020202020202020202020202020202020202020202020202020202020203c7370616e20636c6173733d22696d6720223e0a202020202020202020202020202020202020202020202020202020202020202020202020202020203c696d67207372633d22696e6465782f696d616765732f66396636393961326431313237393866303762643733386464626131376538385f726573697a655f775f3132365f685f3132362e706e67202220616c743d22d093d180d0b5d0ba2dd180d0b8d0bc2c20d0b5d180d0bad196d0bd20d0b6d399d0bdd0b520d399d0b9d0b5d0bbd0b4d0b5d18020d0bad2afd180d0b5d181d19620d184d0b5d0b4d0b5d180d0b0d186d0b8d18fd181d18b20223e203c6920636c6173733d2269636f6e5f666c616720223e3c2f693e0a2020202020202020202020202020202020202020202020202020202020202020202020203c2f7370616e3e0a2020202020202020202020202020202020202020202020202020202020202020202020203c7370616e2069643d226665645f6772656b2220636c6173733d226c7320223ed093d180d0b5d0ba2dd180d0b8d0bc2c20d0b5d180d0bad196d0bd20d0b6d399d0bdd0b520d399d0b9d0b5d0bbd0b4d0b5d18020d0bad2afd180d0b5d181d19620d184d0b5d0b4d0b5d180d0b0d186d0b8d18fd181d18b3c2f7370616e3e0a20202020202020202020202020202020202020202020202020202020202020203c2f613e0a202020202020202020202020202020202020202020202020202020203c2f6c693e0a202020202020202020202020202020202020202020202020202020203c6c6920636c6173733d22636f6c756d6e206c6973745f66656465726174696f6e5f6974656d206974656d5f6a75646f20223e0a20202020202020202020202020202020202020202020202020202020202020203c6120687265663d22687474703a2f2f636f6e66656465726174696f6e2e6b7a2f6a75646f202220636c6173733d226c696e6b20223e0a2020202020202020202020202020202020202020202020202020202020202020202020203c7370616e20636c6173733d22696d6720223e0a202020202020202020202020202020202020202020202020202020202020202020202020202020203c696d67207372633d22696e6465782f696d616765732f63623762653561353030663637333261613034616233383935333934383039355f726573697a655f775f3132365f685f3132362e706e67202220616c743d22d094d0b7d18ed0b4d0be20d184d0b5d0b4d0b5d180d0b0d186d0b8d18fd181d18b20223e203c6920636c6173733d2269636f6e5f666c616720223e3c2f693e0a2020202020202020202020202020202020202020202020202020202020202020202020203c2f7370616e3e0a2020202020202020202020202020202020202020202020202020202020202020202020203c7370616e2069643d226665645f647a75646f2220636c6173733d226c7320223ed094d0b7d18ed0b4d0be20d184d0b5d0b4d0b5d180d0b0d186d0b8d18fd181d18b3c2f7370616e3e0a20202020202020202020202020202020202020202020202020202020202020203c2f613e0a202020202020202020202020202020202020202020202020202020203c2f6c693e0a202020202020202020202020202020202020202020202020202020203c6c6920636c6173733d22636f6c756d6e206c6973745f66656465726174696f6e5f6974656d206974656d5f7461656b776f6e646f20223e0a20202020202020202020202020202020202020202020202020202020202020203c6120687265663d22687474703a2f2f636f6e66656465726174696f6e2e6b7a2f7461656b776f6e646f202220636c6173733d226c696e6b20223e0a2020202020202020202020202020202020202020202020202020202020202020202020203c7370616e20636c6173733d22696d6720223e0a202020202020202020202020202020202020202020202020202020202020202020202020202020203c696d67207372633d22696e6465782f696d616765732f39656235623262623539356661386166333264333531373663616635643265665f726573697a655f775f3132365f685f3132362e706e67202220616c743d22d0a2d0b0d0b5d0bad0b2d0bed0bdd0b4d0be20285754462920d184d0b5d0b4d0b5d180d0b0d186d0b8d18fd181d18b20223e203c6920636c6173733d2269636f6e5f666c616720223e3c2f693e0a2020202020202020202020202020202020202020202020202020202020202020202020203c2f7370616e3e0a2020202020202020202020202020202020202020202020202020202020202020202020203c7370616e202069643d226665645f7465696b76616e646f2220636c6173733d226c7320223ed0a2d0b0d0b5d0bad0b2d0bed0bdd0b4d0be20285754462920d184d0b5d0b4d0b5d180d0b0d186d0b8d18fd181d18b3c2f7370616e3e0a20202020202020202020202020202020202020202020202020202020202020203c2f613e0a202020202020202020202020202020202020202020202020202020203c2f6c693e0a202020202020202020202020202020202020202020202020202020203c6c6920636c6173733d22636f6c756d6e206c6973745f66656465726174696f6e5f6974656d206974656d5f7765696768746c696674696e6720223e0a20202020202020202020202020202020202020202020202020202020202020203c6120687265663d22687474703a2f2f636f6e66656465726174696f6e2e6b7a2f7765696768746c696674696e67202220636c6173733d226c696e6b20223e0a2020202020202020202020202020202020202020202020202020202020202020202020203c7370616e20636c6173733d22696d6720223e0a202020202020202020202020202020202020202020202020202020202020202020202020202020203c696d67207372633d22696e6465782f696d616765732f36303133663938303436343531653664636438396262386264356163663037645f726573697a655f775f3132365f685f3132362e706e67202220616c743d22d090d183d18bd18020d0b0d182d0bbd0b5d182d0b8d0bad0b020d184d0b5d0b4d0b5d180d0b0d186d0b8d18fd181d18b20223e203c6920636c6173733d2269636f6e5f666c616720223e3c2f693e0a2020202020202020202020202020202020202020202020202020202020202020202020203c2f7370616e3e0a2020202020202020202020202020202020202020202020202020202020202020202020203c7370616e2069643d226665645f61746c65746963612220636c6173733d226c7320223ed090d183d18bd18020d0b0d182d0bbd0b5d182d0b8d0bad0b020d184d0b5d0b4d0b5d180d0b0d186d0b8d18fd181d18b3c2f7370616e3e0a20202020202020202020202020202020202020202020202020202020202020203c2f613e0a202020202020202020202020202020202020202020202020202020203c2f6c693e0a2020202020202020202020202020202020202020202020203c2f756c3e0a2020202020202020202020202020202020202020202020203c6469762069643d22636f707972696768742220636c6173733d22636f7079726967687420223ec2a9203230313420d0a1d0bfd0bed180d182d182d18bd29b20d0b6d0b5d0bad0bfd0b52dd0b6d0b5d0ba20d0b6d399d0bdd0b520d0bad2afd18820d29bd0bed0bbd0b4d0b0d0bdd18bd0bbd0b0d182d18bd0bd20d181d0bfd0bed180d18220d182d2afd180d0bbd0b5d180d19620d0bad0bed0bdd184d0b5d0b4d0b5d180d0b0d186d0b8d18fd181d18b3c2f6469763e0a20202020202020202020202020202020202020203c2f6469763e0a202020202020202020202020202020203c2f6469763e0a2020202020202020202020203c2f6469763e0a20202020202020203c2f6469763e0a202020203c2f6469763e0a202020203c64697620636c6173733d22736861646f775f626f74746f6d20223e3c2f6469763e0a0a093c73637269707420747970653d22746578742f6a617661736372697074223e0a0909766172206c6f63616c655f636f6f6b6965203d2072656164436f6f6b696528226d616e6167656d656e745f6c6f63616c6522293b0a0909766172206d655f72656d656d62203d2072656164436f6f6b696528226d626f5f757365725f72656d656d6265725f5f436f6e666967757261746f7222293b0a0a0909696620286d655f72656d656d623d3d277472756527297b0a090920202428222372656d656d6265725f6d6522292e617474722822636865636b6564222c74727565293b0a09097d0a0909696620286c6f63616c655f636f6f6b6965203d3d20226b7a22297b0a09092020242827236c6f67696e27292e617474722822706c616365686f6c646572222c22d09bd0bed0b3d0b8d0bd22293b0a09092020242827237073776427292e617474722822706c616365686f6c646572222c22d29ad2b1d0bfd0b8d18f20d181d3a9d0b722293b0a09092020242827237375626d697427292e746578742822d09ad196d180d18322293b0a090920202428272372656d656d6265725f6d655f6c6162656c27292e746578742822d09cd0b5d0bdd19620d0b5d181d182d0b520d181d0b0d29bd182d0b022293b0a090920200a09092020242827236c616e675f6b617a27292e616464436c61737328202264697361626c65642220290a0909202024282723756e6465725f7469746c6527292e746578742822d0a1d0bfd0bed180d182d182d18bd29b20d0b6d0b5d0bad0bfd0b52dd0b6d0b5d0ba20d0b6d399d0bdd0b520d0bad2afd18820d29bd0bed0bbd0b4d0b0d0bdd18bd0bbd0b0d182d18bd0bd20d181d0bfd0bed180d18220d182d2afd180d0bbd0b5d180d19620d0bad0bed0bdd184d0b5d0b4d0b5d180d0b0d186d0b8d18fd181d18b22293b0a09092020242827236665645f626f7827292e746578742822d091d0bed0bad18120d184d0b5d0b4d0b5d180d0b0d186d0b8d18fd181d18b22293b0a09092020242827236665645f6772656b27292e746578742822d093d180d0b5d0ba2dd180d0b8d0bc2c20d0b5d180d0bad196d0bd20d0b6d399d0bdd0b520d399d0b9d0b5d0bbd0b4d0b5d18020d0bad2afd180d0b5d181d19620d184d0b5d0b4d0b5d180d0b0d186d0b8d18fd181d18b22293b0a09092020242827236665645f647a75646f27292e746578742822d094d0b7d18ed0b4d0be20d184d0b5d0b4d0b5d180d0b0d186d0b8d18fd181d18b22293b0a09092020242827236665645f7465696b76616e646f27292e746578742822d0a2d0b0d0b5d0bad0b2d0bed0bdd0b4d0be20285754462920d184d0b5d0b4d0b5d180d0b0d186d0b8d18fd181d18b22293b0a09092020242827236665645f61746c657469636127292e746578742822d090d183d18bd18020d0b0d182d0bbd0b5d182d0b8d0bad0b020d184d0b5d0b4d0b5d180d0b0d186d0b8d18fd181d18b22293b0a0909202024282723636f7079726967687427292e746578742822c2a920d0a1d0bfd0bed180d182d182d18bd29b20d0b6d0b5d0bad0bfd0b52dd0b6d0b5d0ba20d0b6d399d0bdd0b520d0bad2afd18820d29bd0bed0bbd0b4d0b0d0bdd18bd0bbd0b0d182d18bd0bd20d181d0bfd0bed180d18220d182d2afd180d0bbd0b5d180d19620d0bad0bed0bdd184d0b5d0b4d0b5d180d0b0d186d0b8d18fd181d18b22293b0a090920200a09097d20656c736520696620286c6f63616c655f636f6f6b6965203d3d2022656e22297b0a09092020242827236c6f67696e27292e617474722822706c616365686f6c646572222c224c6f67696e22293b0a09092020242827237073776427292e617474722822706c616365686f6c646572222c2250617373776f726422293b0a09092020242827237375626d697427292e746578742822456e74657222293b0a090920202428272372656d656d6265725f6d655f6c6162656c27292e74657874282252656d656d626572206d6522293b0a090920200a09092020242827236c616e675f656e6727292e616464436c61737328202264697361626c65642220290a0909202024282723756e6465725f7469746c6527292e746578742822436f6d62617420616e6420737472656e6774682073706f72747320636f6e66656465726174696f6e22293b090920200a09092020242827236665645f626f7827292e746578742822426f78696e672046656465726174696f6e22293b0a09092020242827236665645f6772656b27292e74657874282257726573746c696e672046656465726174696f6e22293b0a09092020242827236665645f647a75646f27292e7465787428224a75646f2046656465726174696f6e22293b0a09092020242827236665645f7465696b76616e646f27292e7465787428225461656b776f6e646f2046656465726174696f6e22293b0a09092020242827236665645f61746c657469636127292e7465787428225765696768746c696674696e672046656465726174696f6e22293b0a0909202024282723636f7079726967687427292e746578742822c2a920436f6d62617420616e6420737472656e6774682073706f72747320636f6e66656465726174696f6e22293b09092020090920200a090920200a09097d20656c7365207b0a09092020242827236c6f67696e27292e617474722822706c616365686f6c646572222c22d09bd0bed0b3d0b8d0bd22293b0a09092020242827237073776427292e617474722822706c616365686f6c646572222c22d09fd0b0d180d0bed0bbd18c22293b0a09092020242827237375626d697427292e746578742822d092d0bed0b9d182d0b822293b0a090920202428272372656d656d6265725f6d655f6c6162656c27292e746578742822d097d0b0d0bfd0bed0bcd0bdd0b8d182d18c20d0bcd0b5d0bdd18f22293b0a090920200a09092020242827236c616e675f72757327292e616464436c61737328202264697361626c65642220290a0909202024282723756e6465725f7469746c6527292e746578742822d09ad0bed0bdd184d0b5d0b4d0b5d180d0b0d186d0b8d18f20d181d0bfd0bed180d182d0b8d0b2d0bdd18bd18520d0b5d0b4d0b8d0bdd0bed0b1d0bed180d181d182d0b220d0b820d181d0b8d0bbd0bed0b2d18bd18520d0b2d0b8d0b4d0bed0b220d181d0bfd0bed180d182d0b022293b0a09092020242827236665645f626f7827292e746578742822d0a4d0b5d0b4d0b5d180d0b0d186d0b8d18f20d0b1d0bed0bad181d0b022293b0a09092020242827236665645f6772656b27292e746578742822d0a4d0b5d0b4d0b5d180d0b0d186d0b8d18f20d0b3d180d0b5d0bad0be2dd180d0b8d0bcd181d0bad0bed0b92c20d0b2d0bed0bbd18cd0bdd0bed0b920d0b820d0b6d0b5d0bdd181d0bad0bed0b920d0b1d0bed180d18cd0b1d18b22293b0a09092020242827236665645f647a75646f27292e746578742822d0a4d0b5d0b4d0b5d180d0b0d186d0b8d18f20d0b4d0b7d18ed0b4d0be22293b0a09092020242827236665645f7465696b76616e646f27292e746578742822d0a4d0b5d0b4d0b5d180d0b0d186d0b8d18f20d182d0b0d0b5d0bad0b2d0bed0bdd0b4d0be20285754462922293b0a09092020242827236665645f61746c657469636127292e746578742822d0a4d0b5d0b4d0b5d180d0b0d186d0b8d18f20d182d18fd0b6d0b5d0bbd0bed0b920d0b0d182d0bbd0b5d182d0b8d0bad0b822293b0a0909202024282723636f7079726967687427292e746578742822c2a920d09ad0bed0bdd184d0b5d0b4d0b5d180d0b0d186d0b8d18f20d181d0bfd0bed180d182d0b8d0b2d0bdd18bd18520d0b5d0b4d0b8d0bdd0bed0b1d0bed180d181d182d0b220d0b820d181d0b8d0bbd0bed0b2d18bd18520d0b2d0b8d0b4d0bed0b220d181d0bfd0bed180d182d0b022293b090920200a09097d0a093c2f7363726970743e0a3c2f626f64793e0a0a3c2f68746d6c3e0a');
SELECT pg_catalog.lo_close(0);

COMMIT;

SET search_path = public, pg_catalog;

--
-- TOC entry 2313 (class 2606 OID 49654)
-- Name: announcements_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY announcements
    ADD CONSTRAINT announcements_pkey PRIMARY KEY (id);


--
-- TOC entry 2349 (class 2606 OID 49802)
-- Name: brc_email_broadcast_addressees_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY brc_email_broadcast_addressees
    ADD CONSTRAINT brc_email_broadcast_addressees_pkey PRIMARY KEY (id);


--
-- TOC entry 2351 (class 2606 OID 49807)
-- Name: brc_email_broadcast_templates_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY brc_email_broadcast_templates
    ADD CONSTRAINT brc_email_broadcast_templates_pkey PRIMARY KEY (id);


--
-- TOC entry 2353 (class 2606 OID 49815)
-- Name: brc_email_broadcasts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY brc_email_broadcasts
    ADD CONSTRAINT brc_email_broadcasts_pkey PRIMARY KEY (id);


--
-- TOC entry 2355 (class 2606 OID 49823)
-- Name: brc_emails_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY brc_emails
    ADD CONSTRAINT brc_emails_pkey PRIMARY KEY (id);


--
-- TOC entry 2359 (class 2606 OID 49839)
-- Name: brc_phone_broadcast_addressees_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY brc_phone_broadcast_addressees
    ADD CONSTRAINT brc_phone_broadcast_addressees_pkey PRIMARY KEY (id);


--
-- TOC entry 2357 (class 2606 OID 49831)
-- Name: brc_phone_broadcast_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY brc_phone_broadcast
    ADD CONSTRAINT brc_phone_broadcast_pkey PRIMARY KEY (id);


--
-- TOC entry 2361 (class 2606 OID 49847)
-- Name: brc_phones_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY brc_phones
    ADD CONSTRAINT brc_phones_pkey PRIMARY KEY (id);


--
-- TOC entry 2363 (class 2606 OID 49855)
-- Name: brc_pushes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY brc_pushes
    ADD CONSTRAINT brc_pushes_pkey PRIMARY KEY (id);


--
-- TOC entry 2317 (class 2606 OID 49656)
-- Name: cart_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY cart_items
    ADD CONSTRAINT cart_items_pkey PRIMARY KEY (id);


--
-- TOC entry 2315 (class 2606 OID 49658)
-- Name: cart_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY cart
    ADD CONSTRAINT cart_pkey PRIMARY KEY (session);


--
-- TOC entry 2319 (class 2606 OID 49660)
-- Name: categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- TOC entry 2321 (class 2606 OID 49662)
-- Name: cities_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY cities
    ADD CONSTRAINT cities_pkey PRIMARY KEY (id);


--
-- TOC entry 2323 (class 2606 OID 49664)
-- Name: delivery_service_points_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY delivery_service_points
    ADD CONSTRAINT delivery_service_points_pkey PRIMARY KEY (id);


--
-- TOC entry 2325 (class 2606 OID 49666)
-- Name: departments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY departments
    ADD CONSTRAINT departments_pkey PRIMARY KEY (id);


--
-- TOC entry 2345 (class 2606 OID 49781)
-- Name: feedbacks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY feedbacks
    ADD CONSTRAINT feedbacks_pkey PRIMARY KEY (id);


--
-- TOC entry 2327 (class 2606 OID 49668)
-- Name: ingredients_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY ingredients
    ADD CONSTRAINT ingredients_pkey PRIMARY KEY (id);


--
-- TOC entry 2365 (class 2606 OID 49947)
-- Name: orders_history_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY orders_history
    ADD CONSTRAINT orders_history_pkey PRIMARY KEY (id);


--
-- TOC entry 2331 (class 2606 OID 49670)
-- Name: orders_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY orders_items
    ADD CONSTRAINT orders_items_pkey PRIMARY KEY (id);


--
-- TOC entry 2329 (class 2606 OID 49672)
-- Name: orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- TOC entry 2347 (class 2606 OID 49789)
-- Name: pages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY pages
    ADD CONSTRAINT pages_pkey PRIMARY KEY (id);


--
-- TOC entry 2333 (class 2606 OID 49674)
-- Name: products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- TOC entry 2337 (class 2606 OID 49676)
-- Name: restaurants_photos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY restaurants_photos
    ADD CONSTRAINT restaurants_photos_pkey PRIMARY KEY (id);


--
-- TOC entry 2335 (class 2606 OID 49678)
-- Name: restaurants_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY restaurants
    ADD CONSTRAINT restaurants_pkey PRIMARY KEY (id);


--
-- TOC entry 2367 (class 2606 OID 49960)
-- Name: users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 2369 (class 2606 OID 49975)
-- Name: users_trackings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY users_trackings
    ADD CONSTRAINT users_trackings_pkey PRIMARY KEY (id);


--
-- TOC entry 2339 (class 2606 OID 49680)
-- Name: vacancies_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY vacancy
    ADD CONSTRAINT vacancies_pkey PRIMARY KEY (id);


--
-- TOC entry 2341 (class 2606 OID 49682)
-- Name: vacancy_app_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY vacancy_app
    ADD CONSTRAINT vacancy_app_pkey PRIMARY KEY (id);


--
-- TOC entry 2343 (class 2606 OID 49684)
-- Name: vacancy_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY vacancy_groups
    ADD CONSTRAINT vacancy_groups_pkey PRIMARY KEY (id);


--
-- TOC entry 2387 (class 2606 OID 49856)
-- Name: fk1a7c000c1afae915; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY brc_email_broadcast_addressees
    ADD CONSTRAINT fk1a7c000c1afae915 FOREIGN KEY (addressee_id) REFERENCES brc_emails(id);


--
-- TOC entry 2388 (class 2606 OID 49861)
-- Name: fk1a7c000c707a2f6b; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY brc_email_broadcast_addressees
    ADD CONSTRAINT fk1a7c000c707a2f6b FOREIGN KEY (broadcast_id) REFERENCES brc_email_broadcasts(id);


--
-- TOC entry 2375 (class 2606 OID 49685)
-- Name: fk1f3a2761aa217444; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY departments
    ADD CONSTRAINT fk1f3a2761aa217444 FOREIGN KEY (city_id) REFERENCES cities(id);


--
-- TOC entry 2391 (class 2606 OID 49876)
-- Name: fk2746c57a3a8e19c7; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY brc_phone_broadcast_addressees
    ADD CONSTRAINT fk2746c57a3a8e19c7 FOREIGN KEY (broadcast_id) REFERENCES brc_phone_broadcast(id);


--
-- TOC entry 2390 (class 2606 OID 49871)
-- Name: fk2746c57a6cd0a739; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY brc_phone_broadcast_addressees
    ADD CONSTRAINT fk2746c57a6cd0a739 FOREIGN KEY (addressee_id) REFERENCES brc_phones(id);


--
-- TOC entry 2370 (class 2606 OID 49690)
-- Name: fk2e7b20aa217444; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY cart
    ADD CONSTRAINT fk2e7b20aa217444 FOREIGN KEY (city_id) REFERENCES cities(id);


--
-- TOC entry 2378 (class 2606 OID 49695)
-- Name: fk3d5b2de629cf924e; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY orders_items
    ADD CONSTRAINT fk3d5b2de629cf924e FOREIGN KEY (product_id) REFERENCES products(id);


--
-- TOC entry 2379 (class 2606 OID 49700)
-- Name: fk3d5b2de673a767df; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY orders_items
    ADD CONSTRAINT fk3d5b2de673a767df FOREIGN KEY (order_id) REFERENCES orders(id);


--
-- TOC entry 2373 (class 2606 OID 49705)
-- Name: fk4d47461ca7ada568; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY categories
    ADD CONSTRAINT fk4d47461ca7ada568 FOREIGN KEY (category_id) REFERENCES categories(id);


--
-- TOC entry 2374 (class 2606 OID 49769)
-- Name: fk4d47461cdc6be2a4; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY categories
    ADD CONSTRAINT fk4d47461cdc6be2a4 FOREIGN KEY (mobilecategory_id) REFERENCES categories(id);


--
-- TOC entry 2385 (class 2606 OID 49710)
-- Name: fk4eba305d1a6d59ac; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vacancy_app
    ADD CONSTRAINT fk4eba305d1a6d59ac FOREIGN KEY (vacancy_id) REFERENCES vacancy(id);


--
-- TOC entry 2381 (class 2606 OID 49715)
-- Name: fk5cb1026713e02477; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY products_ingredients
    ADD CONSTRAINT fk5cb1026713e02477 FOREIGN KEY (ingredients_id) REFERENCES ingredients(id);


--
-- TOC entry 2382 (class 2606 OID 49720)
-- Name: fk5cb10267e160c097; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY products_ingredients
    ADD CONSTRAINT fk5cb10267e160c097 FOREIGN KEY (products_id) REFERENCES products(id);


--
-- TOC entry 2386 (class 2606 OID 49790)
-- Name: fk657efc4385cc86; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY pages
    ADD CONSTRAINT fk657efc4385cc86 FOREIGN KEY (category_id) REFERENCES categories(id);


--
-- TOC entry 2393 (class 2606 OID 49961)
-- Name: fk6a68e0846517f66; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY users
    ADD CONSTRAINT fk6a68e0846517f66 FOREIGN KEY (city_id) REFERENCES cities(id);


--
-- TOC entry 2371 (class 2606 OID 49725)
-- Name: fk8907ede12f9da305; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY cart_items
    ADD CONSTRAINT fk8907ede12f9da305 FOREIGN KEY (cart_session) REFERENCES cart(session);


--
-- TOC entry 2372 (class 2606 OID 49730)
-- Name: fk8907ede1a2b8152c; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY cart_items
    ADD CONSTRAINT fk8907ede1a2b8152c FOREIGN KEY (product_id) REFERENCES products(id);


--
-- TOC entry 2389 (class 2606 OID 49866)
-- Name: fkaf928d017fa183ac; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY brc_email_broadcasts
    ADD CONSTRAINT fkaf928d017fa183ac FOREIGN KEY (template_id) REFERENCES brc_email_broadcast_templates(id);


--
-- TOC entry 2376 (class 2606 OID 49735)
-- Name: fkc3df62e543ab8906; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY orders
    ADD CONSTRAINT fkc3df62e543ab8906 FOREIGN KEY (department_id) REFERENCES departments(id);


--
-- TOC entry 2377 (class 2606 OID 49740)
-- Name: fkc3df62e546517f66; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY orders
    ADD CONSTRAINT fkc3df62e546517f66 FOREIGN KEY (city_id) REFERENCES cities(id);


--
-- TOC entry 2380 (class 2606 OID 49745)
-- Name: fkc42bd164a7ada568; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY products
    ADD CONSTRAINT fkc42bd164a7ada568 FOREIGN KEY (category_id) REFERENCES categories(id);


--
-- TOC entry 2394 (class 2606 OID 49976)
-- Name: fkc43d572523677aee; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY users_trackings
    ADD CONSTRAINT fkc43d572523677aee FOREIGN KEY (user_id) REFERENCES users(id);


--
-- TOC entry 2392 (class 2606 OID 49948)
-- Name: fkc64393a73a767df; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY orders_history
    ADD CONSTRAINT fkc64393a73a767df FOREIGN KEY (order_id) REFERENCES orders(id);


--
-- TOC entry 2384 (class 2606 OID 49750)
-- Name: fkd4a8da599f2dbc88; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vacancy
    ADD CONSTRAINT fkd4a8da599f2dbc88 FOREIGN KEY (vacancygroup_id) REFERENCES vacancy_groups(id);


--
-- TOC entry 2383 (class 2606 OID 49755)
-- Name: fkdd16c0a23c4fd26; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY restaurants_photos
    ADD CONSTRAINT fkdd16c0a23c4fd26 FOREIGN KEY (restaurant_id) REFERENCES restaurants(id);


--
-- TOC entry 2555 (class 0 OID 0)
-- Dependencies: 6
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2015-10-21 13:40:10 ALMT

--
-- PostgreSQL database dump complete
--

