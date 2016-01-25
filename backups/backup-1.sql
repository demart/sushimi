--
-- PostgreSQL database dump
--

-- Dumped from database version 9.4.0
-- Dumped by pg_dump version 9.4.0
-- Started on 2015-06-11 22:25:42 ALMT

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
-- TOC entry 174 (class 1259 OID 41377)
-- Name: client_discount; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE client_discount (
    id bigint NOT NULL,
    from_sum integer,
    name character varying(255),
    percent real,
    to_sum integer,
    created_date timestamp without time zone,
    modified_date timestamp without time zone,
    user_id bigint
);


ALTER TABLE client_discount OWNER TO postgres;

--
-- TOC entry 2330 (class 0 OID 41377)
-- Dependencies: 174
-- Data for Name: client_discount; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO client_discount (id, from_sum, name, percent, to_sum, created_date, modified_date, user_id) VALUES (1, 30000, 'Скидка 2% (от 30 тыс)', 2, 50000, '2015-08-06 00:00:00', '2015-08-06 00:00:00', 1);
INSERT INTO client_discount (id, from_sum, name, percent, to_sum, created_date, modified_date, user_id) VALUES (4, 120001, 'Скидка 5% (от 85 тыс)', 5, 155000, '2015-08-06 00:00:00', '2015-08-06 00:00:00', 1);
INSERT INTO client_discount (id, from_sum, name, percent, to_sum, created_date, modified_date, user_id) VALUES (3, 85001, 'Скидка 4% (от 85 тыс)', 4, 120000, '2015-08-06 00:00:00', '2015-08-06 00:00:00', 1);
INSERT INTO client_discount (id, from_sum, name, percent, to_sum, created_date, modified_date, user_id) VALUES (2, 50001, 'Скидка 3% (от 50 тыс)', 3, 85000, '2015-08-06 00:00:00', '2015-08-06 00:00:00', 1);
INSERT INTO client_discount (id, from_sum, name, percent, to_sum, created_date, modified_date, user_id) VALUES (5, 155001, 'Скидка 6% (от 155 тыс)', 6, 190000, '2015-08-06 00:00:00', '2015-08-06 00:00:00', 1);
INSERT INTO client_discount (id, from_sum, name, percent, to_sum, created_date, modified_date, user_id) VALUES (6, 190001, 'Скидка 7% (от 190 тыс)', 7, 225000, '2015-08-06 00:00:00', '2015-08-06 00:00:00', 1);
INSERT INTO client_discount (id, from_sum, name, percent, to_sum, created_date, modified_date, user_id) VALUES (7, 225001, 'Скидка 8% (от 225 тыс)', 8, 260000, '2015-08-06 00:00:00', '2015-08-06 00:00:00', 1);
INSERT INTO client_discount (id, from_sum, name, percent, to_sum, created_date, modified_date, user_id) VALUES (8, 260001, 'Скидка 9% (от 260 тыс)', 9, 295000, '2015-08-06 00:00:00', '2015-08-06 00:00:00', 1);
INSERT INTO client_discount (id, from_sum, name, percent, to_sum, created_date, modified_date, user_id) VALUES (9, 295001, 'Скидка 10% (от 295 тыс)', 10, 5000000, '2015-08-06 00:00:00', '2015-08-06 00:00:00', 1);


--
-- TOC entry 2219 (class 2606 OID 41466)
-- Name: client_discount_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY client_discount
    ADD CONSTRAINT client_discount_pkey PRIMARY KEY (id);


--
-- TOC entry 2220 (class 2606 OID 41633)
-- Name: fka778c7359a2f7e65; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY client_discount
    ADD CONSTRAINT fka778c7359a2f7e65 FOREIGN KEY (user_id) REFERENCES users(id);


-- Completed on 2015-06-11 22:25:43 ALMT

--
-- PostgreSQL database dump complete
--

