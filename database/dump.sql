--
-- PostgreSQL database dump
--

-- Dumped from database version 10.10 (Ubuntu 10.10-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.10 (Ubuntu 10.10-0ubuntu0.18.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE ONLY public.grades DROP CONSTRAINT grades_pk;
ALTER TABLE ONLY public.games DROP CONSTRAINT games_pk;
ALTER TABLE public.grades ALTER COLUMN "gradeId" DROP DEFAULT;
ALTER TABLE public.games ALTER COLUMN "gameId" DROP DEFAULT;
DROP SEQUENCE public."grades_gradeId_seq";
DROP TABLE public.grades;
DROP SEQUENCE public."games_gameId_seq";
DROP TABLE public.games;
DROP EXTENSION plpgsql;
DROP SCHEMA public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: games; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.games (
    "gameId" integer NOT NULL,
    title text NOT NULL,
    platform text NOT NULL,
    price integer NOT NULL
);


--
-- Name: games_gameId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."games_gameId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: games_gameId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."games_gameId_seq" OWNED BY public.games."gameId";


--
-- Name: grades; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.grades (
    "gradeId" integer NOT NULL,
    name text NOT NULL,
    course text NOT NULL,
    grade integer NOT NULL
);


--
-- Name: grades_gradeId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."grades_gradeId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: grades_gradeId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."grades_gradeId_seq" OWNED BY public.grades."gradeId";


--
-- Name: games gameId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.games ALTER COLUMN "gameId" SET DEFAULT nextval('public."games_gameId_seq"'::regclass);


--
-- Name: grades gradeId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.grades ALTER COLUMN "gradeId" SET DEFAULT nextval('public."grades_gradeId_seq"'::regclass);


--
-- Data for Name: games; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.games ("gameId", title, platform, price) FROM stdin;
1	Pokemon Sword	Switch	60
2	Super Luckys Tale	Switch	40
\.


--
-- Data for Name: grades; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.grades ("gradeId", name, course, grade) FROM stdin;
1	Ada Lovelace	Programming	100
2	Linus Torvalds	Linux	100
\.


--
-- Name: games_gameId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."games_gameId_seq"', 2, true);


--
-- Name: grades_gradeId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."grades_gradeId_seq"', 2, true);


--
-- Name: games games_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.games
    ADD CONSTRAINT games_pk PRIMARY KEY ("gameId");


--
-- Name: grades grades_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.grades
    ADD CONSTRAINT grades_pk PRIMARY KEY ("gradeId");


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

