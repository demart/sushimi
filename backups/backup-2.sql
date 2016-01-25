--
-- PostgreSQL database dump
--

-- Dumped from database version 9.4.0
-- Dumped by pg_dump version 9.4.0
-- Started on 2015-07-26 01:12:16 ALMT

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

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
-- TOC entry 192 (class 1259 OID 49782)
-- Name: pages; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE pages (
    id bigint NOT NULL,
    html_footer character varying(1000),
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
-- TOC entry 2330 (class 0 OID 49774)
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


--
-- TOC entry 2331 (class 0 OID 49782)
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
INSERT INTO pages (id, html_footer, is_active, meta_description, meta_title, page_id, title, meta_content, meta_keywords, category_id) VALUES (9, NULL, true, 'Доставка суши Астана, доставка суши в Астане, доставка суши Астана, доставка суши на дом Астана, доставка еды Астана, роллы на дом Астана, Астана роллы на дом, Астана суши на дом, Астана суши, суши роллы доставка Астана, бесплатная доставка суши Астана, Казахстан', 'Доставка суши Астана, доставка суши в Астане, доставка суши Астана, доставка суши на дом Астана, доставка еды Астана, роллы на дом Астана, Астана роллы на дом, Астана суши на дом, Астана суши, суши роллы доставка Астана, бесплатная доставка суши Астана, Казахстан', 'INDEX', 'Доставка суши Астана, доставка суши в Астане, доставка суши Астана, доставка суши на дом Астана, доставка еды Астана, роллы на дом Астана, Астана роллы на дом, Астана суши на дом, Астана суши, суши роллы доставка Астана, бесплатная доставка суши Астана, Казахстан', 'Доставка суши Астана, доставка суши в Астане, доставка суши Астана, доставка суши на дом Астана, доставка еды Астана, роллы на дом Астана, Астана роллы на дом, Астана суши на дом, Астана суши, суши роллы доставка Астана, бесплатная доставка суши Астана, Казахстан', 'Доставка суши Астана, доставка суши в Астане, доставка суши Астана, доставка суши на дом Астана, доставка еды Астана, роллы на дом Астана, Астана роллы на дом, Астана суши на дом, Астана суши, суши роллы доставка Астана, бесплатная доставка суши Астана, Казахстан', NULL);
INSERT INTO pages (id, html_footer, is_active, meta_description, meta_title, page_id, title, meta_content, meta_keywords, category_id) VALUES (11, NULL, true, 'Вакансии - Компания «Сушими»', 'Вакансии - Компания «Сушими»', 'VACANCIES', 'Вакансии - Компания «Сушими»', 'Вакансии - Компания «Сушими»', 'Вакансии - Компания «Сушими»', NULL);
INSERT INTO pages (id, html_footer, is_active, meta_description, meta_title, page_id, title, meta_content, meta_keywords, category_id) VALUES (12, NULL, true, 'Sushimi.kz - Заказ', 'Sushimi.kz - Заказ', 'COMPLETED_ORDER', 'Sushimi.kz - Заказ', 'Sushimi.kz - Заказ', 'Sushimi.kz - Заказ', NULL);
INSERT INTO pages (id, html_footer, is_active, meta_description, meta_title, page_id, title, meta_content, meta_keywords, category_id) VALUES (14, NULL, true, 'Меню - Компания «Сушими»', 'Меню - Компания «Сушими»', 'MENU', 'Меню - Компания «Сушими»', 'Меню - Компания «Сушими»', 'Меню - Компания «Сушими»', NULL);
INSERT INTO pages (id, html_footer, is_active, meta_description, meta_title, page_id, title, meta_content, meta_keywords, category_id) VALUES (19, NULL, true, 'Пицца - Компания «Сушими»', 'Пицца - Компания «Сушими»', 'MENU_PIZZA', 'Пицца - Компания «Сушими»', 'Пицца - Компания «Сушими»', 'Пицца - Компания «Сушими»', 25);
INSERT INTO pages (id, html_footer, is_active, meta_description, meta_title, page_id, title, meta_content, meta_keywords, category_id) VALUES (7, NULL, true, 'Доставка суши Астана, доставка суши в Астане, доставка суши Астана, доставка суши на дом Астана, доставка еды Астана, роллы на дом Астана, Астана роллы на дом, Астана суши на дом, Астана суши, суши роллы доставка Астана, бесплатная доставка суши Астана, Казахстан', 'Доставка суши Астана, доставка суши в Астане, доставка суши Астана, доставка суши на дом Астана, доставка еды Астана, роллы на дом Астана, Астана роллы на дом, Астана суши на дом, Астана суши, суши роллы доставка Астана, бесплатная доставка суши Астана, Казахстан', 'DELIVERY', 'Доставка суши Астана, доставка суши в Астане, доставка суши Астана, доставка суши на дом Астана, доставка еды Астана, роллы на дом Астана, Астана роллы на дом, Астана суши на дом, Астана суши, суши роллы доставка Астана, бесплатная доставка суши Астана, Казахстан', 'Доставка суши Астана, доставка суши в Астане, доставка суши Астана, доставка суши на дом Астана, доставка еды Астана, роллы на дом Астана, Астана роллы на дом, Астана суши на дом, Астана суши, суши роллы доставка Астана, бесплатная доставка суши Астана, Казахстан', 'Доставка суши Астана, доставка суши в Астане, доставка суши Астана, доставка суши на дом Астана, доставка еды Астана, роллы на дом Астана, Астана роллы на дом, Астана суши на дом, Астана суши, суши роллы доставка Астана, бесплатная доставка суши Астана, Казахстан', NULL);
INSERT INTO pages (id, html_footer, is_active, meta_description, meta_title, page_id, title, meta_content, meta_keywords, category_id) VALUES (13, NULL, true, 'Астана суши, Астана суши на дом, доставка суши Астана, доставка суши на дом Астана, доставка еды Астана, доставка суши Астана, доставка суши в Астане, Казахстан', 'Астана суши, Астана суши на дом, доставка суши Астана, доставка суши на дом Астана, доставка еды Астана, доставка суши Астана, доставка суши в Астане, Казахстан', 'PRODUCT_DETAILS', 'Астана суши, Астана суши на дом, доставка суши Астана, доставка суши на дом Астана, доставка еды Астана, доставка суши Астана, доставка суши в Астане, Казахстан', 'Астана суши, Астана суши на дом, доставка суши Астана, доставка суши на дом Астана, доставка еды Астана, доставка суши Астана, доставка суши в Астане, Казахстан', 'Астана суши, Астана суши на дом, доставка суши Астана, доставка суши на дом Астана, доставка еды Астана, доставка суши Астана, доставка суши в Астане, Казахстан', NULL);
INSERT INTO pages (id, html_footer, is_active, meta_description, meta_title, page_id, title, meta_content, meta_keywords, category_id) VALUES (15, NULL, true, 'Заказ - Доставка суши и роллов Sushimi.kz', 'Заказ - Доставка суши и роллов Sushimi.kz', 'ORDER', 'Заказ - Доставка суши и роллов Sushimi.kz', 'Заказ - Доставка суши и роллов Sushimi.kz', 'Заказ - Доставка суши и роллов Sushimi.kz', NULL);
INSERT INTO pages (id, html_footer, is_active, meta_description, meta_title, page_id, title, meta_content, meta_keywords, category_id) VALUES (16, NULL, true, 'Суши - Компания «Сушими»', 'Суши - Компания "Сушими"', 'MENU_SUSHI', 'Суши Меню - Компания "Сушими"', 'Суши Меню - Компания "Сушими"', 'Суши Меню - Компания "Сушими"', 1);
INSERT INTO pages (id, html_footer, is_active, meta_description, meta_title, page_id, title, meta_content, meta_keywords, category_id) VALUES (17, NULL, true, 'Роллы - Компания «Сушими»', 'Роллы - Компания «Сушими»', 'MENU_ROLLS', 'Роллы - Компания «Сушими»', 'Роллы - Компания «Сушими»', 'Роллы - Компания «Сушими»', 8);
INSERT INTO pages (id, html_footer, is_active, meta_description, meta_title, page_id, title, meta_content, meta_keywords, category_id) VALUES (18, NULL, true, 'Сеты - Компания «Сушими»', 'Сеты - Компания «Сушими»', 'MENU_SETS', 'Сеты - Компания «Сушими»', 'Сеты - Компания «Сушими»', 'Сеты - Компания «Сушими»', 9);
INSERT INTO pages (id, html_footer, is_active, meta_description, meta_title, page_id, title, meta_content, meta_keywords, category_id) VALUES (20, NULL, true, 'Антисуши - Компания «Сушими»', 'Антисуши - Компания «Сушими»', 'MENU_ANTI', 'Антисуши - Компания «Сушими»', 'Антисуши - Компания «Сушими»', 'Антисуши - Компания «Сушими»', 2);
INSERT INTO pages (id, html_footer, is_active, meta_description, meta_title, page_id, title, meta_content, meta_keywords, category_id) VALUES (21, NULL, true, 'Соусы - Компания «Сушими»', 'Соусы - Компания «Сушими»', 'MENU_SAUCE', 'Соусы - Компания «Сушими»', 'Соусы - Компания «Сушими»', 'Соусы - Компания «Сушими»', 22);
INSERT INTO pages (id, html_footer, is_active, meta_description, meta_title, page_id, title, meta_content, meta_keywords, category_id) VALUES (22, NULL, true, 'Напитки - Компания «Сушими»', 'Напитки - Компания «Сушими»', 'MENU_DRINKS', 'Напитки - Компания «Сушими»', NULL, 'Напитки - Компания «Сушими»', 4);


--
-- TOC entry 2217 (class 2606 OID 49781)
-- Name: feedbacks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY feedbacks
    ADD CONSTRAINT feedbacks_pkey PRIMARY KEY (id);


--
-- TOC entry 2219 (class 2606 OID 49789)
-- Name: pages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY pages
    ADD CONSTRAINT pages_pkey PRIMARY KEY (id);


--
-- TOC entry 2220 (class 2606 OID 49790)
-- Name: fk657efc4385cc86; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY pages
    ADD CONSTRAINT fk657efc4385cc86 FOREIGN KEY (category_id) REFERENCES categories(id);


-- Completed on 2015-07-26 01:12:16 ALMT

--
-- PostgreSQL database dump complete
--

