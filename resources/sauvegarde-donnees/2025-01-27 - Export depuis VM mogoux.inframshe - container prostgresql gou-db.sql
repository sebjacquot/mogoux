--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3 (Debian 16.3-1.pgdg120+1)
-- Dumped by pg_dump version 16.3 (Debian 16.3-1.pgdg120+1)

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

--
-- Name: enum_medias_type; Type: TYPE; Schema: public; Owner: thomas
--

CREATE TYPE public.enum_medias_type AS ENUM (
    'image',
    'video',
    'audio'
);


ALTER TYPE public.enum_medias_type OWNER TO thomas;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: cities; Type: TABLE; Schema: public; Owner: thomas
--

CREATE TABLE public.cities (
    id integer NOT NULL,
    name character varying NOT NULL,
    slug character varying NOT NULL,
    description jsonb NOT NULL,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.cities OWNER TO thomas;

--
-- Name: cities_id_seq; Type: SEQUENCE; Schema: public; Owner: thomas
--

CREATE SEQUENCE public.cities_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cities_id_seq OWNER TO thomas;

--
-- Name: cities_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: thomas
--

ALTER SEQUENCE public.cities_id_seq OWNED BY public.cities.id;


--
-- Name: cities_rels; Type: TABLE; Schema: public; Owner: thomas
--

CREATE TABLE public.cities_rels (
    id integer NOT NULL,
    "order" integer,
    parent_id integer NOT NULL,
    path character varying NOT NULL,
    thematics_id integer,
    medias_id integer
);


ALTER TABLE public.cities_rels OWNER TO thomas;

--
-- Name: cities_rels_id_seq; Type: SEQUENCE; Schema: public; Owner: thomas
--

CREATE SEQUENCE public.cities_rels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cities_rels_id_seq OWNER TO thomas;

--
-- Name: cities_rels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: thomas
--

ALTER SEQUENCE public.cities_rels_id_seq OWNED BY public.cities_rels.id;


--
-- Name: documents; Type: TABLE; Schema: public; Owner: thomas
--

CREATE TABLE public.documents (
    id integer NOT NULL,
    alt character varying,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    url character varying,
    filename character varying,
    mime_type character varying,
    filesize numeric,
    width numeric,
    height numeric,
    focal_x numeric,
    focal_y numeric
);


ALTER TABLE public.documents OWNER TO thomas;

--
-- Name: documents_id_seq; Type: SEQUENCE; Schema: public; Owner: thomas
--

CREATE SEQUENCE public.documents_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.documents_id_seq OWNER TO thomas;

--
-- Name: documents_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: thomas
--

ALTER SEQUENCE public.documents_id_seq OWNED BY public.documents.id;


--
-- Name: medias; Type: TABLE; Schema: public; Owner: thomas
--

CREATE TABLE public.medias (
    id integer NOT NULL,
    identification_cote character varying NOT NULL,
    identification_title character varying NOT NULL,
    identification_date character varying NOT NULL,
    contexte_credits_name character varying NOT NULL,
    contexte_credits_link character varying,
    contexte_modality character varying,
    access_and_use_access_condition character varying,
    access_and_use_reproduction_condition character varying,
    other_references_conservation_location character varying,
    other_references_complementary_sources character varying,
    other_references_bibliography character varying,
    other_references_notes character varying,
    contributor character varying NOT NULL,
    slug character varying NOT NULL,
    alt character varying NOT NULL,
    legend character varying NOT NULL,
    description character varying NOT NULL,
    location_location_name character varying NOT NULL,
    location_location_link character varying,
    type public.enum_medias_type NOT NULL,
    notice character varying,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    url character varying,
    filename character varying,
    mime_type character varying,
    filesize numeric,
    width numeric,
    height numeric,
    focal_x numeric,
    focal_y numeric
);


ALTER TABLE public.medias OWNER TO thomas;

--
-- Name: medias_id_seq; Type: SEQUENCE; Schema: public; Owner: thomas
--

CREATE SEQUENCE public.medias_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.medias_id_seq OWNER TO thomas;

--
-- Name: medias_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: thomas
--

ALTER SEQUENCE public.medias_id_seq OWNED BY public.medias.id;


--
-- Name: medias_identification_tag; Type: TABLE; Schema: public; Owner: thomas
--

CREATE TABLE public.medias_identification_tag (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    tag_name character varying NOT NULL
);


ALTER TABLE public.medias_identification_tag OWNER TO thomas;

--
-- Name: payload_migrations; Type: TABLE; Schema: public; Owner: thomas
--

CREATE TABLE public.payload_migrations (
    id integer NOT NULL,
    name character varying,
    batch numeric,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.payload_migrations OWNER TO thomas;

--
-- Name: payload_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: thomas
--

CREATE SEQUENCE public.payload_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.payload_migrations_id_seq OWNER TO thomas;

--
-- Name: payload_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: thomas
--

ALTER SEQUENCE public.payload_migrations_id_seq OWNED BY public.payload_migrations.id;


--
-- Name: payload_preferences; Type: TABLE; Schema: public; Owner: thomas
--

CREATE TABLE public.payload_preferences (
    id integer NOT NULL,
    key character varying,
    value jsonb,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.payload_preferences OWNER TO thomas;

--
-- Name: payload_preferences_id_seq; Type: SEQUENCE; Schema: public; Owner: thomas
--

CREATE SEQUENCE public.payload_preferences_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.payload_preferences_id_seq OWNER TO thomas;

--
-- Name: payload_preferences_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: thomas
--

ALTER SEQUENCE public.payload_preferences_id_seq OWNED BY public.payload_preferences.id;


--
-- Name: payload_preferences_rels; Type: TABLE; Schema: public; Owner: thomas
--

CREATE TABLE public.payload_preferences_rels (
    id integer NOT NULL,
    "order" integer,
    parent_id integer NOT NULL,
    path character varying NOT NULL,
    users_id integer
);


ALTER TABLE public.payload_preferences_rels OWNER TO thomas;

--
-- Name: payload_preferences_rels_id_seq; Type: SEQUENCE; Schema: public; Owner: thomas
--

CREATE SEQUENCE public.payload_preferences_rels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.payload_preferences_rels_id_seq OWNER TO thomas;

--
-- Name: payload_preferences_rels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: thomas
--

ALTER SEQUENCE public.payload_preferences_rels_id_seq OWNED BY public.payload_preferences_rels.id;


--
-- Name: sections; Type: TABLE; Schema: public; Owner: thomas
--

CREATE TABLE public.sections (
    id integer NOT NULL,
    name character varying,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.sections OWNER TO thomas;

--
-- Name: sections_id_seq; Type: SEQUENCE; Schema: public; Owner: thomas
--

CREATE SEQUENCE public.sections_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.sections_id_seq OWNER TO thomas;

--
-- Name: sections_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: thomas
--

ALTER SEQUENCE public.sections_id_seq OWNED BY public.sections.id;


--
-- Name: sections_rels; Type: TABLE; Schema: public; Owner: thomas
--

CREATE TABLE public.sections_rels (
    id integer NOT NULL,
    "order" integer,
    parent_id integer NOT NULL,
    path character varying NOT NULL,
    thematics_id integer,
    documents_id integer
);


ALTER TABLE public.sections_rels OWNER TO thomas;

--
-- Name: sections_rels_id_seq; Type: SEQUENCE; Schema: public; Owner: thomas
--

CREATE SEQUENCE public.sections_rels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.sections_rels_id_seq OWNER TO thomas;

--
-- Name: sections_rels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: thomas
--

ALTER SEQUENCE public.sections_rels_id_seq OWNED BY public.sections_rels.id;


--
-- Name: thematics; Type: TABLE; Schema: public; Owner: thomas
--

CREATE TABLE public.thematics (
    id integer NOT NULL,
    slug character varying NOT NULL,
    title character varying NOT NULL,
    color character varying NOT NULL,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.thematics OWNER TO thomas;

--
-- Name: thematics_id_seq; Type: SEQUENCE; Schema: public; Owner: thomas
--

CREATE SEQUENCE public.thematics_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.thematics_id_seq OWNER TO thomas;

--
-- Name: thematics_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: thomas
--

ALTER SEQUENCE public.thematics_id_seq OWNED BY public.thematics.id;


--
-- Name: thematics_rels; Type: TABLE; Schema: public; Owner: thomas
--

CREATE TABLE public.thematics_rels (
    id integer NOT NULL,
    "order" integer,
    parent_id integer NOT NULL,
    path character varying NOT NULL,
    medias_id integer
);


ALTER TABLE public.thematics_rels OWNER TO thomas;

--
-- Name: thematics_rels_id_seq; Type: SEQUENCE; Schema: public; Owner: thomas
--

CREATE SEQUENCE public.thematics_rels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.thematics_rels_id_seq OWNER TO thomas;

--
-- Name: thematics_rels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: thomas
--

ALTER SEQUENCE public.thematics_rels_id_seq OWNED BY public.thematics_rels.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: thomas
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    email character varying NOT NULL,
    reset_password_token character varying,
    reset_password_expiration timestamp(3) with time zone,
    salt character varying,
    hash character varying,
    login_attempts numeric,
    lock_until timestamp(3) with time zone
);


ALTER TABLE public.users OWNER TO thomas;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: thomas
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO thomas;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: thomas
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: cities id; Type: DEFAULT; Schema: public; Owner: thomas
--

ALTER TABLE ONLY public.cities ALTER COLUMN id SET DEFAULT nextval('public.cities_id_seq'::regclass);


--
-- Name: cities_rels id; Type: DEFAULT; Schema: public; Owner: thomas
--

ALTER TABLE ONLY public.cities_rels ALTER COLUMN id SET DEFAULT nextval('public.cities_rels_id_seq'::regclass);


--
-- Name: documents id; Type: DEFAULT; Schema: public; Owner: thomas
--

ALTER TABLE ONLY public.documents ALTER COLUMN id SET DEFAULT nextval('public.documents_id_seq'::regclass);


--
-- Name: medias id; Type: DEFAULT; Schema: public; Owner: thomas
--

ALTER TABLE ONLY public.medias ALTER COLUMN id SET DEFAULT nextval('public.medias_id_seq'::regclass);


--
-- Name: payload_migrations id; Type: DEFAULT; Schema: public; Owner: thomas
--

ALTER TABLE ONLY public.payload_migrations ALTER COLUMN id SET DEFAULT nextval('public.payload_migrations_id_seq'::regclass);


--
-- Name: payload_preferences id; Type: DEFAULT; Schema: public; Owner: thomas
--

ALTER TABLE ONLY public.payload_preferences ALTER COLUMN id SET DEFAULT nextval('public.payload_preferences_id_seq'::regclass);


--
-- Name: payload_preferences_rels id; Type: DEFAULT; Schema: public; Owner: thomas
--

ALTER TABLE ONLY public.payload_preferences_rels ALTER COLUMN id SET DEFAULT nextval('public.payload_preferences_rels_id_seq'::regclass);


--
-- Name: sections id; Type: DEFAULT; Schema: public; Owner: thomas
--

ALTER TABLE ONLY public.sections ALTER COLUMN id SET DEFAULT nextval('public.sections_id_seq'::regclass);


--
-- Name: sections_rels id; Type: DEFAULT; Schema: public; Owner: thomas
--

ALTER TABLE ONLY public.sections_rels ALTER COLUMN id SET DEFAULT nextval('public.sections_rels_id_seq'::regclass);


--
-- Name: thematics id; Type: DEFAULT; Schema: public; Owner: thomas
--

ALTER TABLE ONLY public.thematics ALTER COLUMN id SET DEFAULT nextval('public.thematics_id_seq'::regclass);


--
-- Name: thematics_rels id; Type: DEFAULT; Schema: public; Owner: thomas
--

ALTER TABLE ONLY public.thematics_rels ALTER COLUMN id SET DEFAULT nextval('public.thematics_rels_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: thomas
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: cities; Type: TABLE DATA; Schema: public; Owner: thomas
--

COPY public.cities (id, name, slug, description, updated_at, created_at) FROM stdin;
3	Beaulieu	beaulieu-valentigney	[{"children": [{"text": "\\n\\n\\n"}]}, {"children": [{"text": "Valentigney est un des berceaux de l’entreprise Peugeot : c’est là qu’est né Armand Peugeot, en 1849, le créateur de la société des automobiles Peugeot, et c’est sur le site dit de Beaulieu que seront créées les premières automobiles de la marque à la toute fin du XIXe siècle, avant que la société n’investisse le village de Sochaux. Beaulieu, situé le long du Doubs, est cependant toujours resté un site industriel important autour de l’entreprise Peugeot."}]}, {"children": [{"text": "\\n\\n\\n\\n\\n\\n"}]}]	2024-07-08 14:10:37.37+00	2024-06-14 12:00:30.79+00
10	Héricourt	hericourt	[{"children": [{"text": "\\nÀ la fin du XIXe siècle, Fritz Koechlin édifie un tissage mécanique qui prend le nom de tissage de la Grand-Pré. Différentes cités voient alors le jour pour accueillir les travailleurs. Rachetée à plusieurs reprises, l’usine entre progressivement en crise et réduit ses effectifs dans les années 1970-1980, avant de fermer définitivement ses portes en 2000.\\n\\n\\n\\n"}]}]	2024-06-14 14:58:37.973+00	2024-06-14 14:58:37.973+00
4	Site industriel de la Roche (ou Laroche)	bart-bavans	[{"children": [{"text": "\\n\\n\\n"}]}, {"children": [{"text": "Entre Bavans et Bart, le site de la Roche (ou Laroche), d’abord occupé par un moulin, le long du Doubs, est devenu un site industriel important au XIXe siècle. Devenu propriété de Japy, l’usine, centrée sur la fabrication d’ustensiles de ménage, est restée très active au début du XXe siècle avant d’être rachetée par Peugeot pour fabriquer des câbles et des amortisseurs après la Seconde Guerre mondiale. A l’abandon à la fin du XXe siècle, le lieu est redevenu un site industriel particulièrement actif aujourd’hui."}]}, {"children": [{"text": "\\n\\n\\n\\n\\n\\n"}]}]	2024-06-14 14:48:55.666+00	2024-06-14 14:48:55.666+00
5	Beaucourt	beaucourt	[{"children": [{"text": "\\n\\n\\n"}]}, {"children": [{"text": "Frédéric Japy a fait de Beaucourt le lieu emblématique de son activité horlogère à la fin du XVIIIe siècle, évoluant ensuite vers une grande diversité de production d’objets métalliques. Beaucourt accueille aujourd’hui le musée Japy, inauguré en 1986, l’année même de la publication de "}, {"text": "Mémoires de l’Enclave", "italic": true}, {"text": "."}]}, {"children": [{"text": "\\n\\n\\n\\n\\n\\n"}]}]	2024-06-14 14:50:21.492+00	2024-06-14 14:50:21.492+00
8	Bethoncourt	bethoncourt	[{"children": [{"text": "\\nBethoncourt est le lieu par excellence de la filature de la Lizaine, appartenant à la famille Schwob, inaugurée en 1908. Le village va ensuite accueillir deux cités : la Cité du Parc puis les Cités nouvelles, construites entre les deux guerres. Plus tard, un quartier d’immeubles sera bâti à Champvallon, à partir de 1957, pour accueillir la population travaillant chez Peugeot, à Sochaux principalement. L’activité textile a été arrêtée en 1973 et l’usine totalement rasée en 2006.\\n\\n\\n\\n"}]}]	2024-06-14 14:55:22.397+00	2024-06-14 14:55:22.397+00
1	Audincourt	audincourt	[{"children": [{"text": "\\n\\n\\n"}]}, {"children": [{"text": "L’histoire des forges d’Audincourt remonte à la fin du XVIIIe siècle. En 1825 naît la Société anonyme des Forges d’Audincourt qui connaît son âge d’or entre 1850 et 1875, avant d’évoluer vers la seule fonderie. L’activité décline progressivement et l’« usine du Fourneau » finit par fermer ses portes en 1959. Les bâtiments ont depuis été démolis pour faire place à un collège construit entre 1993 et 1994."}]}, {"children": [{"text": "\\n\\n\\n\\n\\n\\n"}]}]	2024-06-26 12:04:59.862+00	2024-06-13 11:57:05.506+00
13	Sochaux	sochaux	[{"children": [{"text": "\\nC’est en 1912 que la société des automobiles Peugeot implante une première usine à Sochaux, simple village situé tout près de Montbéliard. Le développement sera exponentiel jusqu’aux années 1970 où l’entreprise compte jusqu’à 40 000 salariés. Le rayonnement s’opère également avec la création du Football Club de Sochaux en 1928. Après une période de crise et de restructuration, Sochaux reste un lieu industriel majeur pour l’entreprise Stellantis et accueille le musée de l’Aventure Peugeot.\\n\\n\\n\\n"}]}]	2024-07-05 10:53:58.821+00	2024-06-14 15:01:36.884+00
9	Vallée de la Feschotte	fesches-le-chatel-dampierre	[{"children": [{"text": "\\n\\n\\n"}]}, {"children": [{"text": "A proximité de Beaucourt, la vallée de la Feschotte est devenue un lieu industriel très important lié à l’entreprise Japy, situé entre Fesches-le-Châtel et Badevel, mais dépendant administrativement le plus souvent de Dampierre-les-bois. À l’abandon à la fin du XXe siècle, le lieu a retrouvé une activité industrielle, notamment autour de l’entreprise Cristel, spécialisée dans les articles de cuisson haut-de-gamme."}]}, {"children": [{"text": "\\n\\n\\n\\n\\n\\n"}]}]	2024-07-08 14:32:28.083+00	2024-06-14 14:57:04.077+00
11	Hérimoncourt	herimoncourt	[{"children": [{"text": "\\nC’est à Hérimoncourt que la famille Peugeot s’est d’abord fait connaître, à la fin du XVIIIe siècle autour de l’exploitation d’un moulin hydraulique, avant de développer des activités métallurgiques au XIXe siècle. Elles vont progressivement s’étendre géographiquement à l’échelle locale puis nationale. Hérimoncourt est relié, de 1887 à 1932, par un tramway, aux villes de Seloncourt et Audincourt, ce qui fait de toute la vallée d’Hérimoncourt un lieu industriel majeur, avant de décliner progressivement à partir des années 1930. L’ancienne usine Peugeot de Terre Blanche est devenue le Centre d’archives historiques du groupe Stellantis actuel.\\n\\n\\n\\n"}]}]	2024-07-08 14:38:17.267+00	2024-06-14 14:59:58.534+00
12	Montbéliard	montbeliard	[{"children": [{"text": "\\n\\n\\n"}]}, {"children": [{"text": "Montbéliard, sous-préfecture du Doubs, a longtemps rivalisé avec Besançon par son statut de capitale économique et industrielle majeure, acquis à partir du début du XIXe siècle. Ce sera le lieu de résidence de Jean-Paul Goux entre 1984 et 1985 pour la rédaction de son ouvrage "}, {"text": "Mémoires de l’Enclave", "italic": true}, {"text": "."}]}, {"children": [{"text": "\\n\\n\\n\\n\\n\\n"}]}]	2024-07-09 09:22:11.408+00	2024-06-14 15:00:47.429+00
\.


--
-- Data for Name: cities_rels; Type: TABLE DATA; Schema: public; Owner: thomas
--

COPY public.cities_rels (id, "order", parent_id, path, thematics_id, medias_id) FROM stdin;
165	1	3	thematics	23	\N
166	2	3	thematics	22	\N
167	3	3	thematics	16	\N
168	4	3	thematics	11	\N
169	5	3	thematics	6	\N
170	1	3	medias	\N	90
171	2	3	medias	\N	80
172	3	3	medias	\N	83
173	4	3	medias	\N	78
174	5	3	medias	\N	77
175	6	3	medias	\N	76
176	7	3	medias	\N	75
177	8	3	medias	\N	74
178	9	3	medias	\N	73
179	10	3	medias	\N	72
180	11	3	medias	\N	71
181	12	3	medias	\N	70
182	13	3	medias	\N	69
183	14	3	medias	\N	68
184	15	3	medias	\N	67
185	16	3	medias	\N	65
186	17	3	medias	\N	57
187	18	3	medias	\N	62
188	19	3	medias	\N	63
189	20	3	medias	\N	64
72	1	1	thematics	10	\N
78	1	13	thematics	13	\N
79	2	13	thematics	5	\N
238	1	9	thematics	3	\N
239	2	9	thematics	4	\N
240	3	9	thematics	5	\N
241	4	9	thematics	6	\N
242	5	9	thematics	7	\N
243	6	9	thematics	8	\N
244	7	9	thematics	9	\N
245	8	9	thematics	10	\N
246	9	9	thematics	11	\N
247	10	9	thematics	12	\N
248	11	9	thematics	13	\N
249	12	9	thematics	14	\N
250	13	9	thematics	15	\N
251	14	9	thematics	16	\N
252	15	9	thematics	17	\N
253	16	9	thematics	19	\N
254	1	9	medias	\N	42
255	2	9	medias	\N	91
256	1	11	thematics	3	\N
257	2	11	thematics	4	\N
258	3	11	thematics	6	\N
259	4	11	thematics	8	\N
260	5	11	thematics	9	\N
261	6	11	thematics	11	\N
262	7	11	thematics	12	\N
263	8	11	thematics	14	\N
264	9	11	thematics	16	\N
265	10	11	thematics	17	\N
266	11	11	thematics	18	\N
267	12	11	thematics	19	\N
268	13	11	thematics	21	\N
269	14	11	thematics	22	\N
270	15	11	thematics	23	\N
291	1	12	thematics	21	\N
\.


--
-- Data for Name: documents; Type: TABLE DATA; Schema: public; Owner: thomas
--

COPY public.documents (id, alt, updated_at, created_at, url, filename, mime_type, filesize, width, height, focal_x, focal_y) FROM stdin;
\.


--
-- Data for Name: medias; Type: TABLE DATA; Schema: public; Owner: thomas
--

COPY public.medias (id, identification_cote, identification_title, identification_date, contexte_credits_name, contexte_credits_link, contexte_modality, access_and_use_access_condition, access_and_use_reproduction_condition, other_references_conservation_location, other_references_complementary_sources, other_references_bibliography, other_references_notes, contributor, slug, alt, legend, description, location_location_name, location_location_link, type, notice, updated_at, created_at, url, filename, mime_type, filesize, width, height, focal_x, focal_y) FROM stdin;
24	0163	Cité du Parc	01/04/1985	Gilles Choffé	\N	\N	\N	\N	\N	\N	\N	\N	Pascal Lécroart	0163	Cité du Parc	Cité du Parc	Photographie de Gilles Choffé réalisée au moment de la résidence de Jean-Paul Goux à Montbéliard	Audincourt	\N	image	\N	2024-07-05 08:21:32.471+00	2024-06-14 08:16:34.846+00	/medias/0163.jpg	0163-1.jpg	image/jpeg	1015573	6253	3913	50	50
23	0162	Inscription Cité du Pont le Gland	01/04/1985	Gilles Choffé	\N	\N	\N	\N	\N	\N	\N	\N	Pascal Lécroart	0162	Inscription Cité du Pont le Gland	Inscription Cité du Pont le Gland	Photographie de Gilles Choffé réalisée au moment de la résidence de Jean-Paul Goux à Montbéliard	Audincourt	\N	image	\N	2024-07-05 08:21:55.251+00	2024-06-14 08:15:16.979+00	/medias/0162.jpg	0162-1.jpg	image/jpeg	1013451	6214	3937	50	50
22	0161	Cabanons de la Cité du Pont le Gland	01/04/1985	Gilles Choffé	\N	\N	\N	\N	\N	\N	\N	\N	Pascal Lécroart	0161	Cabanons de la Cité du Pont le Gland	Cabanons de la Cité du Pont le Gland	Photographie de Gilles Choffé réalisée au moment de la résidence de Jean-Paul Goux à Montbéliard	Audincourt	\N	image	\N	2024-07-05 08:22:15.596+00	2024-06-14 08:12:43.374+00	/medias/0161.jpg	0161-1.jpg	image/jpeg	1013294	6059	4038	50	50
21	0160	Cité du Pont le Gland	01/04/1985	Gilles Choffé	\N	\N	\N	\N	\N	\N	\N	\N	Pascal Lécroart	0160	Cité du Pont le Gland	Cité du Pont le Gland	Photographie de Gilles Choffé réalisée au moment de la résidence de Jean-Paul Goux à Montbéliard	Audincourt	\N	image	\N	2024-07-05 08:22:34.048+00	2024-06-14 08:10:47.921+00	/medias/0160.jpg	0160-1.jpg	image/jpeg	1021263	6093	4015	50	50
20	0159	Cité du Pont le Gland	01/04/1985	Gilles Choffé	\N	\N	\N	\N	\N	\N	\N	\N	Pascal Lécroart	0159	Cité du Pont le Gland	Cité du Pont le Gland	Photographie de Gilles Choffé réalisée au moment de la résidence de Jean-Paul Goux à Montbéliard	Audincourt	\N	image	\N	2024-07-05 08:22:54.28+00	2024-06-14 08:09:20.033+00	/medias/0159.jpg	0159-1.jpg	image/jpeg	1023569	6132	3989	50	50
19	0158	Photographie de Gilles Choffé réalisée au moment de la résidence de Jean-Paul Goux à Montbéliard	01/04/1985	Gilles Choffé	\N	\N	\N	\N	\N	\N	\N	\N	Pascal Lécroart	0158	Cité Mickiewicz	Cité Mickiewicz	Photographie de Gilles Choffé réalisée au moment de la résidence de Jean-Paul Goux à Montbéliard	Audincourt	\N	image	\N	2024-07-05 08:23:14.962+00	2024-06-14 08:08:06.158+00	/medias/0158.jpg	0158-1.jpg	image/jpeg	1014700	6047	4045	50	50
18	0157	Cité Mickiewicz	01/04/1985	Gilles Choffé	\N	\N	\N	\N	\N	\N	\N	\N	Pascal Lécroart	0157	Cité Mickiewicz	Cité Mickiewicz	Photographie de Gilles Choffé réalisée au moment de la résidence de Jean-Paul Goux à Montbéliard	Audincourt	\N	image	\N	2024-07-05 08:23:31.031+00	2024-06-14 08:06:51.466+00	/medias/0157.jpg	0157-1.jpg	image/jpeg	1018316	6210	3939	50	50
7	0020	Ancien magasin d'alimentation	10/03/1985	Gilles Choffé	\N	\N	\N	\N	\N	\N	\N	\N	Pascal Lécroart	0020	Ancien magasin d'alimentation	Ancien magasin d'alimentation	Photographie de Gilles Choffé réalisée au moment de la résidence de Jean-Paul Goux à Montbéliard	Audincourt	\N	image	\N	2024-07-05 08:06:08.402+00	2024-06-14 07:52:49.002+00	/medias/0020.jpg	0020-1.jpg	image/jpeg	1021962	6150	3978	50	50
17	0156	Cité de Pologne	01/04/1985	Gilles Choffé	\N	\N	\N	\N	\N	\N	\N	\N	Pascal Lécroart	0156	Cité de Pologne	Cité de Pologne	Photographie de Gilles Choffé réalisée au moment de la résidence de Jean-Paul Goux à Montbéliard	Audincourt	\N	image	\N	2024-07-05 08:23:50.287+00	2024-06-14 08:05:37.176+00	/medias/0156.jpg	0156-1.jpg	image/jpeg	1009674	6120	3997	50	50
16	0155	Cité de Pologne	01/04/1985	Gilles Choffé	\N	\N	\N	\N	\N	\N	\N	\N	Pascal Lécroart	0155	Cité de Pologne	Cité de Pologne	Photographie de Gilles Choffé réalisée au moment de la résidence de Jean-Paul Goux à Montbéliard	Audincourt	\N	image	\N	2024-07-05 08:24:43.07+00	2024-06-14 08:04:11.539+00	/medias/0155.jpg	0155-1.jpg	image/jpeg	992168	6206	3942	50	50
4	0017	Anciens foyers Peugeot	10/03/1985	Gilles Choffé	\N	\N	\N	\N	\N	\N	\N	\N	Pascal Lécroart	0017	Anciens foyers Peugeot	Anciens foyers Peugeot	Photographie de Gilles Choffé réalisée au moment de la résidence de Jean-Paul Goux à Montbéliard	Audincourt	\N	image	\N	2024-07-05 08:05:06.454+00	2024-06-14 07:41:34.896+00	/medias/0017.jpg	0017-1.jpg	image/jpeg	1023751	5964	4103	50	50
5	0018	Bâtiment à proximité des ruines du château Peugeot	10/03/1985	Gilles Choffé	\N	\N	\N	\N	\N	\N	\N	\N	Pascal Lécroart	0018	Bâtiment à proximité des ruines du château Peugeot	Bâtiment à proximité des ruines du château Peugeot	Photographie	Audincourt	\N	image	\N	2024-07-05 08:05:26.383+00	2024-06-14 07:44:28.643+00	/medias/0018.jpg	0018-1.jpg	image/jpeg	1020597	6143	3983	50	50
6	0019	Bâtiment en ruine près du Doubs	10/03/1985	Gilles Choffé	\N	\N	\N	\N	\N	\N	\N	\N	Pascal Lécroart	0019	Bâtiment en ruine près du Doubs	Bâtiment en ruine près du Doubs	Photographie de Gilles Choffé réalisée au moment de la résidence de Jean-Paul Goux à Montbéliard	Audincourt	\N	image	\N	2024-07-05 08:05:46.526+00	2024-06-14 07:48:23.633+00	/medias/0019.jpg	0019-1.jpg	image/jpeg	1023030	6070	4031	50	50
15	0154	Cités Keller	01/04/1985	Gilles Choffé	\N	\N	\N	\N	\N	\N	\N	\N	Pascal Lécroart	0154	Cités Keller	Cités Keller	Photographie de Gilles Choffé réalisée au moment de la résidence de Jean-Paul Goux à Montbéliard	Audincourt	\N	image	\N	2024-07-05 08:25:03.012+00	2024-06-14 08:02:45.052+00	/medias/0154-1.jpg	0154.jpg	image/jpeg	1018639	6125	3994	50	50
13	0152	Le Montano	01/04/1985	Gilles Choffé	\N	\N	\N	\N	\N	\N	\N	\N	Pascal Lécroart	0152	Le Montano	Le Montano	Photographie de Gilles Choffé réalisée au moment de la résidence de Jean-Paul Goux à Montbéliard	Audincourt	\N	image	\N	2024-07-05 08:25:37.518+00	2024-06-14 08:01:09.218+00	/medias/0152.jpg	0152-1.jpg	image/jpeg	995339	6092	4016	50	50
8	0147	Cités Keller	01/04/1985	Gilles Choffé	\N	\N	\N	\N	\N	\N	\N	\N	Pascal Lécroart	0147	Cités Keller	Cités Keller	Photographie de Gilles Choffé réalisée au moment de la résidence de Jean-Paul Goux à Montbéliard	Audincourt	\N	image	\N	2024-07-05 08:31:42.703+00	2024-06-14 07:54:28.675+00	/medias/0147.jpg	0147-1.jpg	image/jpeg	1023375	6188	3953	50	50
9	0148	Photographie de Gilles Choffé réalisée au moment de la résidence de Jean-Paul Goux à Montbéliard	01/04/1985	Gilles Choffé	\N	\N	\N	\N	\N	\N	\N	\N	Pascal Lécroart	0148	Cités Keller	Cités Keller	Photographie de Gilles Choffé réalisée au moment de la résidence de Jean-Paul Goux à Montbéliard	Audincourt	\N	image	\N	2024-07-05 08:31:59.599+00	2024-06-14 07:56:04.376+00	/medias/0148.jpg	0148-1.jpg	image/jpeg	1023683	5927	4127	50	50
10	0149	Cités Keller	01/04/1985	Gilles Choffé	\N	\N	\N	\N	\N	\N	\N	\N	Pascal Lécroart	0149	Cités Keller	Cités Keller	Photographie de Gilles Choffé réalisée au moment de la résidence de Jean-Paul Goux à Montbéliard	Audincourt	\N	image	\N	2024-07-05 08:32:17.618+00	2024-06-14 07:57:28.243+00	/medias/0149.jpg	0149-1.jpg	image/jpeg	1019877	6070	4031	50	50
11	0150	Cités Keller	01/04/1985	Gilles Choffé	\N	\N	\N	\N	\N	\N	\N	\N	Pascal Lécroart	0150	Cités Keller	Cités Keller	Photographie de Gilles Choffé réalisée au moment de la résidence de Jean-Paul Goux à Montbéliard	Audincourt	\N	image	\N	2024-07-05 08:32:33.699+00	2024-06-14 07:58:49.619+00	/medias/0150.jpg	0150-1.jpg	image/jpeg	1001486	6103	4009	50	50
12	0151	Cités Keller	01/04/1985	Gilles Choffé	\N	\N	\N	\N	\N	\N	\N	\N	Pascal Lécroart	0151	Cités Keller	Cités Keller	Photographie de Gilles Choffé réalisée au moment de la résidence de Jean-Paul Goux à Montbéliard	Audincourt	\N	image	\N	2024-07-05 08:32:49.088+00	2024-06-14 07:59:51.849+00	/medias/0151.jpg	0151-1.jpg	image/jpeg	1015711	6114	4001	50	50
92	ECOLE_1930_APB	Ecole de Bethoncourt en 1930	1930	PL	\N	\N	\N	\N	\N	\N	\N	\N	PL	ECOLE_1930_APB	ECOLE_1930_APB	Ecole de Bethoncourt en 1930	Photo	Bethoncourt	\N	image	\N	2024-07-05 08:37:49.919+00	2024-07-05 08:37:49.919+00	\N	Ecole  1930 APB.jpg	image/jpeg	804353	1541	955	50	50
93	THEM01	Travail Forges	Vers 1920	PL	\N	\N	\N	\N	\N	\N	\N	\N	PL	THEM01	Forge	Forges	Photo	Audincourt	\N	image	\N	2024-07-08 13:04:07.996+00	2024-07-08 13:04:07.996+00	\N	THEM01.JPG	image/jpeg	1036634	4806	2922	50	50
27	0189	Hôtel	01/04/1985	Gilles Choffé	\N	\N	\N	\N	\N	\N	\N	\N	Pascal Lécroart	0189	Hôtel	Hôtel	Photographie de Gilles Choffé réalisée au moment de la résidence de Jean-Paul Goux à Montbéliard	Audincourt	\N	image	\N	2024-07-05 08:20:16.674+00	2024-06-14 08:26:51.399+00	/medias/0189.jpg	0189-1.jpg	image/jpeg	907122	6178	3961	50	50
26	0165	Maison des Castors	01/04/1985	Gilles Choffé	\N	\N	\N	\N	\N	\N	\N	\N	Pascal Lécroart	0165	Maison des Castors	Maison des Castors	Photographie de Gilles Choffé réalisée au moment de la résidence de Jean-Paul Goux à Montbéliard. Les maisons des "Castors" ont été construites directement par des ouvriers de chez Peugeot avec l'appui de l'entreprise, ce que Goux analyse à la fin du chapitre XIII comme une caractéristique du paternalisme.	Audincourt	\N	image	\N	2024-07-05 08:20:40+00	2024-06-14 08:24:03.561+00	/medias/0165.jpg	0165-1.jpg	image/jpeg	1017971	6120	3998	50	50
25	0164	Maison des Castors	01/04/1985	Gilles Choffé	\N	\N	\N	\N	\N	\N	\N	\N	Pascal Lécroart	0164	Maison des Castors	Maison des Castors	Photographie de Gilles Choffé réalisée au moment de la résidence de Jean-Paul Goux à Montbéliard. Les maisons des "Castors" ont été construites directement par des ouvriers de chez Peugeot avec l'appui de l'entreprise, ce que Goux analyse à la fin du chapitre XIII comme une caractéristique du paternalisme.	Audincourt	\N	image	\N	2024-07-05 08:21:11.097+00	2024-06-14 08:22:04.462+00	/medias/0164.jpg	0164-1.jpg	image/jpeg	1013387	6148	3979	50	50
94	THEM02	Usine de Beaulieu	Vers 1920	Perrenot	\N	\N	\N	\N	\N	\N	\N	\N	PL	THEM02	Vue usine	Carte postale	Usine de Beaulieu	Beaulieu	\N	image	\N	2024-07-08 13:18:51.723+00	2024-07-08 13:18:51.723+00	\N	THEM02.jpg	image/jpeg	871375	5214	3306	50	50
40	0313	Anciennes forges	14/02/1985	Gilles Choffé	\N	\N	\N	\N	\N	\N	\N	\N	Pascal Lécroart	0313	Anciennes forges	Anciennes forges	Photographie de Gilles Choffé réalisée au moment de la résidence de Jean-Paul Goux à Montbéliard	Audincourt	\N	image	\N	2024-06-28 07:23:22.199+00	2024-06-14 08:58:16.905+00	/medias/0313.jpg	0313-1.jpg	image/jpeg	1001569	4950	3601	50	50
43	0317	Anciennes forges	14/02/1985	Gilles Choffé	\N	\N	\N	\N	\N	\N	\N	\N	Pascal Lécroart	0317	Anciennes forges	Anciennes forges	Photographie de Gilles Choffé réalisée au moment de la résidence de Jean-Paul Goux à Montbéliard	Audincourt	\N	image	\N	2024-06-28 07:32:26.628+00	2024-06-14 09:02:10.239+00	/medias/0317.jpg	0317-1.jpg	image/jpeg	992812	4972	3689	50	50
44	0318	Anciennes forges	14/02/1985	Gilles Choffé	\N	\N	\N	\N	\N	\N	\N	\N	Pascal Lécroart	0318	Anciennes forges	Anciennes forges	Photographie de Gilles Choffé réalisée au moment de la résidence de Jean-Paul Goux à Montbéliard	Audincourt	\N	image	\N	2024-06-28 07:32:40.979+00	2024-06-14 10:05:08.236+00	/medias/0318.jpg	0318-1.jpg	image/jpeg	1014764	5038	3711	50	50
45	0319	Anciennes forges	14/02/1985	Gilles Choffé	\N	\N	\N	\N	\N	\N	\N	\N	Pascal Lécroart	0319	Anciennes forges	Anciennes forges	Photographie de Gilles Choffé réalisée au moment de la résidence de Jean-Paul Goux à Montbéliard	Audincourt	\N	image	\N	2024-06-28 07:32:50.7+00	2024-06-14 10:06:26.516+00	/medias/0319.jpg	0319-1.jpg	image/jpeg	1022825	5082	3733	50	50
46	0320	Anciennes forges	14/02/1985	Gilles Choffé	\N	\N	\N	\N	\N	\N	\N	\N	Pascal Lécroart	0320	Anciennes forges	Anciennes forges	Photographie de Gilles Choffé réalisée au moment de la résidence de Jean-Paul Goux à Montbéliard	Audincourt	\N	image	\N	2024-06-28 07:33:01.035+00	2024-06-14 10:07:58.282+00	/medias/0320.jpg	0320-1.jpg	image/jpeg	1016723	5038	3667	50	50
41	0314	Anciennes forges	14/02/1985	Gilles Choffé	\N	\N	\N	\N	\N	\N	\N	\N	Pascal Lécroart	0314	Anciennes forges	Anciennes forges	Photographie de Gilles Choffé réalisée au moment de la résidence de Jean-Paul Goux à Montbéliard	Audincourt	\N	image	\N	2024-06-28 08:09:52.382+00	2024-06-14 08:59:32.255+00	/medias/0314-1.jpg	0314.jpg	image/jpeg	998194	4861	3579	50	50
49	0327	Anciennes forges	14/02/1985	Gilles Choffé	\N	\N	\N	\N	\N	\N	\N	\N	P.L.	0327	Anciennes forges	Anciennes forges	Photographie de Gilles Choffé réalisée au moment de la résidence de Jean-Paul Goux à Montbéliard	Audincourt	\N	image	\N	2024-07-05 08:09:47.144+00	2024-06-14 10:16:16.115+00	/medias/0327.jpg	0327-1.jpg	image/jpeg	1014883	5038	3623	50	50
48	0326	Anciennes forges	14/02/1985	Gilles Choffé	\N	\N	\N	\N	\N	\N	\N	\N	PL	0326	Anciennes forges	Anciennes forges	Photographie de Gilles Choffé réalisée au moment de la résidence de Jean-Paul Goux à Montbéliard	Audincourt	\N	image	\N	2024-07-05 08:11:02.592+00	2024-06-14 10:15:10.853+00	/medias/0326.jpg	0326-1.jpg	image/jpeg	1007691	5016	3667	50	50
38	0311	Anciennes forges	14/02/1985	Gilles Choffé	\N	\N	\N	\N	\N	\N	\N	\N	Pascal Lécroart	0311	Anciennes forges	Anciennes forges	Photographie de Gilles Choffé réalisée au moment de la résidence de Jean-Paul Goux à Montbéliard\n	Audincourt	\N	image	\N	2024-07-05 08:11:40.803+00	2024-06-14 08:56:01.931+00	/medias/0311.jpg	0311-1.jpg	image/jpeg	1009659	4994	3866	50	50
37	0310	Anciennes forges	14/02/1985	Gilles Choffé	\N	\N	\N	\N	\N	\N	\N	\N	Pascal Lécroart	0310	Anciennes forges	Anciennes forges	Photographie de Gilles Choffé réalisée au moment de la résidence de Jean-Paul Goux à Montbéliard	Audincourt	\N	image	\N	2024-07-05 08:11:59.671+00	2024-06-14 08:54:11.527+00	/medias/0310-1.jpg	0310.jpg	image/jpeg	1002324	5016	3601	50	50
35	0309	Anciennes forges	14/02/1985	Gilles Choffé	\N	\N	\N	\N	\N	\N	\N	\N	Pascal Lécroart	0309	Anciennes forges	Anciennes forges	Photographie de Gilles Choffé réalisée au moment de la résidence de Jean-Paul Goux à Montbéliard	Audincourt	\N	image	\N	2024-07-05 08:12:25.787+00	2024-06-14 08:51:17.579+00	/medias/0309.jpg	0309-1.jpg	image/jpeg	1008681	5214	3646	50	50
34	0250	Rue du château - Usine Japy	09/12/1984	Gilles Choffé	\N	\N	\N	\N	\N	\N	\N	\N	Pascal Lécroart	0250	Rue du château - Usine Japy	Rue du château - Usine Japy	Photographie de Gilles Choffé réalisée au moment de la résidence de Jean-Paul Goux à Montbéliard\n	Audincourt	\N	image	\N	2024-07-05 08:12:45.309+00	2024-06-14 08:47:00.341+00	/medias/0250-1.jpg	0250.jpg	image/jpeg	994170	4928	3557	50	50
32	0249	Rue du château - Usine Japy	09/12/1984	Gilles Choffé	\N	\N	\N	\N	\N	\N	\N	\N	Pascal Lécroart	0249	Rue du château - Usine Japy	Rue du château - Usine Japy	Photographie de Gilles Choffé réalisée au moment de la résidence de Jean-Paul Goux à Montbéliard	Audincourt	\N	image	\N	2024-07-05 08:13:21.107+00	2024-06-14 08:45:15.408+00	/medias/0249.jpg	0249-1.jpg	image/jpeg	1013608	4928	3601	50	50
31	0248	Rue du château - Usine Japy	09/12/1984	Gilles Choffé	\N	\N	\N	\N	\N	\N	\N	\N	Pascal Lécroart	0248	Rue du château - Usine Japy	Rue du château - Usine Japy	Photographie de Gilles Choffé réalisée au moment de la résidence de Jean-Paul Goux à Montbéliard	Audincourt	\N	image	\N	2024-07-05 08:13:51.781+00	2024-06-14 08:44:01.873+00	/medias/0248.jpg	0248-1.jpg	image/jpeg	1007543	4773	3623	50	50
30	0247	Rue du château - Abords des ruines du château Peugeot	09/12/1984	Gilles Choffé	\N	\N	\N	\N	\N	\N	\N	\N	Pascal Lécroart	0247	Rue du château - Abords des ruines du château Peugeot	Rue du château - Abords des ruines du château Peugeot	Photographie de Gilles Choffé réalisée au moment de la résidence de Jean-Paul Goux à Montbéliard	Audincourt	\N	image	\N	2024-07-05 08:14:09.915+00	2024-06-14 08:35:37.394+00	/medias/0247.jpg	0247-1.jpg	image/jpeg	1023545	4928	3557	50	50
29	0246	Rue du château - Ruines du château Peugeot	09/12/1984	Gilles Choffé	\N	\N	\N	\N	\N	\N	\N	\N	Pascal Lécroart	0246	Rue du château - Ruines du château Peugeot	Rue du château - Ruines du château Peugeot	Photographie de Gilles Choffé réalisée au moment de la résidence de Jean-Paul Goux à Montbéliard	Audincourt	\N	image	\N	2024-07-05 08:14:26.985+00	2024-06-14 08:30:22.948+00	/medias/0246.jpg	0246-1.jpg	image/jpeg	1022806	4950	3513	50	50
65	0023	Cités Sous Roches	06/03/1985	Gilles Choffé	\N	\N	\N	\N	\N	\N	\N	\N	P.L.	0023	Cités Sous Roches	Cités Sous Roches	Photographie de Gilles Choffé réalisée au moment de la résidence de Jean-Paul Goux à Montbéliard	Valentigney	\N	image	\N	2024-07-05 08:26:12.878+00	2024-06-14 11:11:32.622+00	/medias/0023.jpg	0023-1.jpg	image/jpeg	1012227	6143	3983	50	50
67	0024	Cités Sous Roches	06/03/1985	Gilles Choffé	\N	\N	\N	\N	\N	\N	\N	\N	P.L.	0024	Cités Sous Roches	Cités Sous Roches	Photographie de Gilles Choffé réalisée au moment de la résidence de Jean-Paul Goux à Montbéliard	Valentigney	\N	image	\N	2024-07-05 08:26:29.065+00	2024-06-14 11:14:49.319+00	/medias/0024-1.jpg	0024.jpg	image/jpeg	1006198	6143	3982	50	50
68	0025	Cités Sous Roches	06/03/1985	Gilles Choffé	\N	\N	\N	\N	\N	\N	\N	\N	P.L.	0025	Cités Sous Roches	Cités Sous Roches	Photographie de Gilles Choffé réalisée au moment de la résidence de Jean-Paul Goux à Montbéliard	Valentigney	\N	image	\N	2024-07-05 08:26:58.778+00	2024-06-14 11:16:10.017+00	/medias/0025.jpg	0025-1.jpg	image/jpeg	992862	6092	4016	50	50
69	0026	Cités Sous Roches	06/03/1985	Gilles Choffé	\N	\N	\N	\N	\N	\N	\N	\N	P.L.	0026	Cités Sous Roches	Cités Sous Roches	Photographie de Gilles Choffé réalisée au moment de la résidence de Jean-Paul Goux à Montbéliard	Valentigney	\N	image	\N	2024-07-05 08:27:13.644+00	2024-06-14 11:17:19.446+00	/medias/0026.jpg	0026-1.jpg	image/jpeg	1003493	6114	4001	50	50
71	0028	Cités Sous Roches	06/03/1985	Gilles Choffé	\N	\N	\N	\N	\N	\N	\N	\N	P.L.	0028	Cités Sous Roches	Cités Sous Roches	Photographie de Gilles Choffé réalisée au moment de la résidence de Jean-Paul Goux à Montbéliard	Valentigney	\N	image	\N	2024-07-05 08:27:51.479+00	2024-06-14 11:19:46.003+00	/medias/0028.jpg	0028-1.jpg	image/jpeg	1015122	6086	4019	50	50
72	0029	Cités Sous Roches	06/03/1985	Gilles Choffé	\N	\N	\N	\N	\N	\N	\N	\N	P.L.	0029	Cités Sous Roches	Cités Sous Roches	Photographie de Gilles Choffé réalisée au moment de la résidence de Jean-Paul Goux à Montbéliard	Valentigney	\N	image	\N	2024-07-05 08:28:18.331+00	2024-06-14 11:21:04.434+00	/medias/0029.jpg	0029-1.jpg	image/jpeg	1008655	6187	3954	50	50
95	0403	Jean-Paul Goux à Montbéliard	1985	Gilles Choffé	\N	\N	\N	\N	\N	\N	\N	\N	PL	0403	Jean-Paul Goux à Montbéliard	Jean-Paul Goux à Montbéliard	Photographie	Montbéliard	\N	image	\N	2024-07-08 13:24:35.821+00	2024-07-08 13:24:35.821+00	\N	0403.jpg	image/jpeg	1015590	4883	3667	50	50
57	AUD0002	Les conditions de travail aux Forges	1984-1985	Jean-Paul Goux	\N	\N	\N	\N	\N	\N	\N	\N	Jean-Paul Goux M. Rimacci	0002	Les conditions de travail aux Forges	Les conditions de travail aux Forges	Enregistrement audio	Audincourt	\N	audio	\N	2024-07-05 11:21:15.052+00	2024-06-14 10:43:05.135+00	/medias/Les_conditions_de_travail_aux_Forges.mp3	Les_conditions_de_travail_aux_Forges.mp3	audio/mpeg	2533248	\N	\N	\N	\N
100	THEM16	Logements	1985	Gilles Choffé	\N	\N	\N	\N	\N	\N	\N	\N	PL	THEM16	Logements	Logements	Logements	Logements	\N	image	\N	2024-07-08 13:34:20.889+00	2024-07-08 13:34:20.889+00	\N	THEM16.jpg	image/jpeg	891472	6137	3987	50	50
59	0004	Les rapports entre ouvriers de différentes nationalités	1984-1985	Jean-Paul Goux	\N	\N	\N	\N	\N	\N	\N	\N	Jean-Paul Goux M. Rimacci	0004	Les rapports entre ouvriers de différentes nationalités	Les rapports entre ouvriers de différentes nationalités	Enregistrement audio	Audincourt	\N	audio	\N	2024-07-05 08:00:39.342+00	2024-06-14 10:48:49.854+00	/medias/Les_rapports_entre_ouvriers_de_differentes_nationalites.mp3	Les_rapports_entre_ouvriers_de_differentes_nationalites-1.mp3	audio/mpeg	3015936	\N	\N	\N	\N
56	AUD_001	La photo d'atelier	1984-1985	Jean-Paul Goux	\N	\N	\N	\N	\N	\N	\N	\N	Jean-Paul Goux M. et Mme Marcel Bernard	0001	La photo d'atelier	La photo d'atelier	Enregistrement audio	Audincourt	\N	audio	\N	2024-07-05 08:01:52.643+00	2024-06-14 10:37:23.862+00	/medias/La_photo_d_atelier.mp3	La_photo_d_atelier-1.mp3	audio/mpeg	1590912	\N	\N	\N	\N
55	0333	Anciennes forges	14/02/1985	Gilles Choffé	\N	\N	\N	\N	\N	\N	\N	\N	P.L.	0333	Anciennes forges	Anciennes forges	Photographie de Gilles Choffé réalisée au moment de la résidence de Jean-Paul Goux à Montbéliard	Audincourt	\N	image	\N	2024-07-05 08:07:32.037+00	2024-06-14 10:27:35.601+00	/medias/0333.jpg	0333-1.jpg	image/jpeg	1021989	5060	3579	50	50
63	AUD0008	L'interdiction de parler et de chanter pendant le travail	1984-1985	Jean-Paul Goux	\N	\N	\N	\N	\N	\N	\N	\N	Jean-Paul Goux Mme Gisèle Berthet	0008	L'interdiction de parler et de chanter pendant le travail	L'interdiction de parler et de chanter pendant le travail	Enregistrement audio	Valentigney	\N	audio	\N	2024-07-05 07:57:27.55+00	2024-06-14 11:01:00.322+00	/medias/L_interdiction_de_parler_et_de_chanter_pendant_le_travail.mp3	L_interdiction_de_parler_et_de_chanter_pendant_le_travail-1.mp3	audio/mpeg	1240751	\N	\N	\N	\N
64	AUD0009	La lutte syndicale collective face au travail le samedi	1984-1985	Jean-Paul Goux	\N	\N	\N	\N	\N	\N	\N	\N	Jean-Paul Goux Mme Gisèle Berthet	0009	La lutte syndicale collective face au travail le samedi	La lutte syndicale collective face au travail le samedi	Enregistrement audio	Valentigney	\N	audio	\N	2024-07-05 07:57:46.527+00	2024-06-14 11:03:44.439+00	/medias/La_lutte_syndicale_collective_face_au_travail_le_samedi.mp3	La_lutte_syndicale_collective_face_au_travail_le_samedi-1.mp3	audio/mpeg	1847280	\N	\N	\N	\N
58	AUD0003	Les filles toujours victimes des hommes	1984-1985	Jean-Paul Goux	\N	\N	\N	\N	\N	\N	\N	\N	Jean-Paul Goux Mme Marcel Bernard	0003	Les filles toujours victimes des hommes	Les filles toujours victimes des hommes	Enregistrement audio	Audincourt	\N	audio	\N	2024-07-05 07:59:43.508+00	2024-06-14 10:45:53.794+00	/medias/Les_filles_toujours_victimes_des_hommes.mp3	Les_filles_toujours_victimes_des_hommes-1.mp3	audio/mpeg	1350144	\N	\N	\N	\N
60	AUD0005	Une femme face aux avances d'un homme	1984-1985	Jean-Paul Goux	\N	\N	\N	\N	\N	\N	\N	\N	Jean-Paul Goux Mme Marcel Bernard	0005	Une femme face aux avances d'un homme	Une femme face aux avances d'un homme	Enregistrement audio	Audincourt	\N	audio	\N	2024-07-05 08:02:49.287+00	2024-06-14 10:51:13.399+00	/medias/Une_femme_face_aux_avances_d_un_homme.mp3	Une_femme_face_aux_avances_d_un_homme-1.mp3	audio/mpeg	2494080	\N	\N	\N	\N
54	0332	Anciennes forges	14/02/1985	Gilles Choffé	\N	\N	\N	\N	\N	\N	\N	\N	P.L.	0332	Anciennes forges	Anciennes forges	Photographie de Gilles Choffé réalisée au moment de la résidence de Jean-Paul Goux à Montbéliard	Audincourt	\N	image	\N	2024-07-05 08:07:47.618+00	2024-06-14 10:26:19.753+00	/medias/0332.jpg	0332-1.jpg	image/jpeg	1023856	5193	3733	50	50
53	0331	Anciennes forges	14/02/1985	Gilles Choffé	\N	\N	\N	\N	\N	\N	\N	\N	P.L.	0331	Anciennes forges	Anciennes forges	Photographie de Gilles Choffé réalisée au moment de la résidence de Jean-Paul Goux à Montbéliard	Audincourt	\N	image	\N	2024-07-05 08:08:05.279+00	2024-06-14 10:24:05.038+00	/medias/0331.jpg	0331-1.jpg	image/jpeg	1016677	5038	3756	50	50
52	0330	Anciennes forges	14/02/1985	Gilles Choffé	\N	\N	\N	\N	\N	\N	\N	\N	P.L.	0330	Anciennes forges	Anciennes forges	Photographie de Gilles Choffé réalisée au moment de la résidence de Jean-Paul Goux à Montbéliard	Audincourt	\N	image	\N	2024-07-05 08:08:20.794+00	2024-06-14 10:22:08.58+00	/medias/0330.jpg	0330-1.jpg	image/jpeg	1021597	4950	3733	50	50
51	0329	Anciennes forges	14/02/1985	Gilles Choffé	\N	\N	\N	\N	\N	\N	\N	\N	P.L.	0329	Anciennes forges	Anciennes forges	Photographie de Gilles Choffé réalisée au moment de la résidence de Jean-Paul Goux à Montbéliard	Audincourt	\N	image	\N	2024-07-05 08:08:37.382+00	2024-06-14 10:20:21.195+00	/medias/0329.jpg	0329-1.jpg	image/jpeg	1008969	4994	3601	50	50
50	0328	Anciennes forges	14/02/1985	Gilles Choffé	\N	\N	\N	\N	\N	\N	\N	\N	P.L.	0328	Anciennes forges	Anciennes forges	Photographie de Gilles Choffé réalisée au moment de la résidence de Jean-Paul Goux à Montbéliard	Audincourt	\N	image	\N	2024-07-05 08:09:30.899+00	2024-06-14 10:17:35.891+00	/medias/0328.jpg	0328-1.jpg	image/jpeg	1018222	5016	3601	50	50
73	0030	Cités Sous Roches	06/03/1985	Gilles Choffé	\N	\N	\N	\N	\N	\N	\N	\N	P.L.	0030	Cités Sous Roches	Cités Sous Roches	Photographie de Gilles Choffé réalisée au moment de la résidence de Jean-Paul Goux à Montbéliard	Valentigney	\N	image	\N	2024-07-05 08:28:38.295+00	2024-06-14 11:21:59.58+00	/medias/0030.jpg	0030-1.jpg	image/jpeg	1018918	6175	3961	50	50
74	0034	Escaliers en face des usines Peugeot	20/04/1985	Gilles Choffé	\N	\N	\N	\N	\N	\N	\N	\N	P.L.	0034	Escaliers en face des usines Peugeot	Escaliers en face des usines Peugeot	Photographie de Gilles Choffé réalisée au moment de la résidence de Jean-Paul Goux à Montbéliard	Valentigney	\N	image	\N	2024-07-05 08:28:55.642+00	2024-06-14 11:24:07.373+00	/medias/0034.jpg	0034-1.jpg	image/jpeg	991282	4027	6075	50	50
75	0035	Cités Sous Roches	20/04/1985	Gilles Choffé	\N	\N	\N	\N	\N	\N	\N	\N	P.L.	0035	Cités Sous Roches	Cités Sous Roches	Photographie de Gilles Choffé réalisée au moment de la résidence de Jean-Paul Goux à Montbéliard	Valentigney	\N	image	\N	2024-07-05 08:29:12.557+00	2024-06-14 11:26:01.563+00	/medias/0035.jpg	0035-1.jpg	image/jpeg	1004323	6076	4027	50	50
76	0036	Cités Sous Roches	20/04/1985	Gilles Choffé	\N	\N	\N	\N	\N	\N	\N	\N	P.L.	0036	Cités Sous Roches	Cités Sous Roches	Photographie de Gilles Choffé réalisée au moment de la résidence de Jean-Paul Goux à Montbéliard	Valentigney	\N	image	\N	2024-07-05 08:29:31.618+00	2024-06-14 11:29:38.853+00	/medias/0036.jpg	0036-1.jpg	image/jpeg	1003831	6167	3968	50	50
77	0037	Cités Sous Roches	20/04/1985	Gilles Choffé	\N	\N	\N	\N	\N	\N	\N	\N	P.L.	0037	Cités Sous Roches	Cités Sous Roches	Photographie de Gilles Choffé réalisée au moment de la résidence de Jean-Paul Goux à Montbéliard	Valentigney	\N	image	\N	2024-07-05 08:29:55.112+00	2024-06-14 11:31:30.911+00	/medias/0037-1.jpg	0037-1.jpg	image/jpeg	1016737	5968	4100	50	50
78	0038	Cités Sous Roches	20/04/1985	Gilles Choffé	\N	\N	\N	\N	\N	\N	\N	\N	P.L.	0038	Cités Sous Roches	Cités Sous Roches	Photographie de Gilles Choffé réalisée au moment de la résidence de Jean-Paul Goux à Montbéliard	Valentigney	\N	image	\N	2024-07-05 08:30:13.859+00	2024-06-14 11:32:22.974+00	/medias/0038.jpg	0038-1.jpg	image/jpeg	1019641	6081	4024	50	50
90	0071	Usine Japy	20/04/1985	Gilles Choffé	\N	\N	\N	\N	\N	\N	\N	\N	P.L.	0071	Usine Japy	Usine Japy	Photographie de Gilles Choffé réalisée au moment de la résidence de Jean-Paul Goux à Montbéliard	Valentigney	\N	image	\N	2024-07-05 08:30:32.957+00	2024-06-14 11:47:07.031+00	/medias/0071.jpg	0071-1.jpg	image/jpeg	1009252	4530	5192	50	50
80	0072	Usine Japy	20/04/1985	Gilles Choffé	\N	\N	\N	\N	\N	\N	\N	\N	P.L.	0072	Usine Japy	Usine Japy	Photographie de Gilles Choffé réalisée au moment de la résidence de Jean-Paul Goux à Montbéliard	Valentigney	\N	image	\N	2024-07-05 08:30:59.543+00	2024-06-14 11:34:39.844+00	/medias/0072.jpg	0072-1.jpg	image/jpeg	998029	6114	4001	50	50
83	0073	Usine Japy	20/04/1985	Gilles Choffé	\N	\N	\N	\N	\N	\N	\N	\N	P.L.	0073	Usine Japy	Usine Japy	Photographie de Gilles Choffé réalisée au moment de la résidence de Jean-Paul Goux à Montbéliard	Valentigney	\N	image	\N	2024-07-05 08:31:14.916+00	2024-06-14 11:39:43.219+00	/medias/0073.jpg	0073-1.jpg	image/jpeg	1008170	6080	4023	50	50
96	THEM18	Photographie de l'église évangélique Mennonite	1989	Gilles Choffé	\N	\N	\N	\N	\N	\N	\N	\N	PL	THEM-18	Photographie de l'église évangélique Mennonite	Photographie de l'église évangélique Mennonite	Photographie de Gilles Choffé	Sochaux	\N	image	\N	2024-07-08 13:28:03.599+00	2024-07-08 13:28:03.599+00	\N	THEM18.jpg	image/jpeg	724340	4640	3689	50	50
91	0427	Ouvrier au travail à la SCOP Cristel - ex usine Japy (Le Rondelot)	21/05/1985	Gilles Choffé	\N	\N	\N	\N	\N	\N	\N	\N	P.L.	0427	Ouvrier au travail à la SCOP Cristel - ex usine Japy (Le Rondelot)	Ouvrier au travail à la SCOP Cristel - ex usine Japy (Le Rondelot)	Photographie de Gilles Choffé réalisée au moment de la résidence de Jean-Paul Goux à Montbéliard	Fesches-le-Châtel	\N	image	\N	2024-06-26 13:01:18.98+00	2024-06-14 12:17:12.549+00	/medias/0427.jpg	0427.jpg	image/jpeg	1022816	4972	3535	50	50
61	AUD0006	Une fille de 16 ans à l'usine	1984-1985	Jean-Paul Goux	\N	\N	\N	\N	\N	\N	\N	\N	Jean-Paul Goux	0006	Une fille de 16 ans à l'usine	Une fille de 16 ans à l'usine	Entretien avec Mme Marcel Bernard	Audincourt	\N	audio	\N	2024-07-05 07:59:18.451+00	2024-06-14 10:53:31.011+00	/medias/Une_fille_de_16_ans_a_l_usine.mp3	Une_fille_de_16_ans_a_l_usine-1.mp3	audio/mpeg	2810304	\N	\N	\N	\N
3	0016	Ruines du château Peugeot et usine Japy	10/03/1985	Gilles Choffé	\N	\N	\N	\N	\N	\N	\N	\N	Pascal Lécroart	0016	Ruines du château Peugeot et usine Japy	Ruines du château Peugeot et usine Japy	Photographie de Gilles Choffé réalisée au moment de la résidence de Jean-Paul Goux à Montbéliard	Audincourt	\N	image	\N	2024-07-05 08:04:02.728+00	2024-06-14 07:39:11.239+00	/medias/0016.jpg	0016-1.jpg	image/jpeg	1022151	6161	3971	50	50
42	0466	SCOP Cristel - ex usine Japy (Le Rondelot)	21/05/1985	Gilles Choffé	\N	\N	\N	\N	\N	\N	\N	\N	Pascal Lécroart	0466	SCOP Cristel - ex usine Japy (Le Rondelot)	SCOP Cristel - ex usine Japy (Le Rondelot)	Photographie de Gilles Choffé réalisée au moment de la résidence de Jean-Paul Goux à Montbéliard	Fesches-le-Châtel	\N	image	\N	2024-07-05 08:06:43.528+00	2024-06-14 09:00:39.898+00	/medias/0466.jpg	0466-1.jpg	image/jpeg	991391	5060	3601	50	50
47	0321	Anciennes forges	14/02/1985	Gilles Choffé	\N	\N	\N	\N	\N	\N	\N	\N	Pascal Lécroart	0321	Anciennes forges	Anciennes forges	Photographie de Gilles Choffé réalisée au moment de la résidence de Jean-Paul Goux à Montbéliard	Audincourt	\N	image	\N	2024-07-05 08:11:19.774+00	2024-06-14 10:13:35.82+00	/medias/0321.jpg	0321-1.jpg	image/jpeg	1017011	4994	3667	50	50
28	0244	Rue du château - Abords des ruines du château Peugeot	09/12/1984	Gilles Choffé	\N	\N	\N	\N	\N	\N	\N	\N	Pascal Lécroart	0244	Rue du château - Abords des ruines du château Peugeot	Rue du château - Abords des ruines du château Peugeot	Photographie de Gilles Choffé réalisée au moment de la résidence de Jean-Paul Goux à Montbéliard	Audincourt	\N	image	\N	2024-07-05 08:14:43.527+00	2024-06-14 08:28:45.676+00	/medias/0244.jpg	0244-1.jpg	image/jpeg	994921	4883	3601	50	50
99	THEM17	Représentation théâtrale de la Passion à Beaucourt vers 1911	Vers 1911	Inconnu	\N	\N	\N	\N	\N	\N	\N	\N	PL	THEM18	Représentation théâtrale de la Passion à Beaucourt vers 1911	Représentation théâtrale de la Passion à Beaucourt vers 1911	Photographie	Beaucourt	\N	image	\N	2024-07-08 13:32:00.758+00	2024-07-08 13:32:00.758+00	\N	THEM17-2.jpg	image/jpeg	444840	1501	916	50	50
101	THEM15	Photographie intérieur cuisine	1985	Gilles Choffé	\N	\N	\N	\N	\N	\N	\N	\N	PL	THEM15	Photographie intérieur cuisine	Photographie intérieur cuisine	Photographie intérieur cuisine	A def	\N	image	\N	2024-07-08 13:36:42.912+00	2024-07-08 13:36:42.912+00	\N	THEM15.jpg	image/jpeg	913737	3456	2288	50	50
102	THEM14	Château Japy	Vers 1930	Inconnu	\N	\N	\N	\N	\N	\N	\N	\N	PL	THEM14	Château Japy	Château Japy	Château Japy	Bavans	\N	image	\N	2024-07-08 13:38:27.959+00	2024-07-08 13:38:27.959+00	\N	THEM14.jpg	image/jpeg	60800	1200	754	50	50
103	THEM13	Grêve à Montbéliard en 1960	1960	Inconnu	\N	\N	\N	\N	\N	\N	\N	\N	PL	THEM13	Grêve à Montbéliard en 1960	Grêve à Montbéliard en 1960	Grêve à Montbéliard en 1960	Montbéliard	\N	image	\N	2024-07-08 13:40:31.288+00	2024-07-08 13:40:31.288+00	\N	THEM13.jpg	image/jpeg	630911	2622	2664	50	50
104	THEM12	Affiche de mise en garde	Vers 1960	Inconnu	\N	\N	\N	\N	\N	\N	\N	\N	PL	TEHM12	Affiche de mise en garde	Affiche de mise en garde	Affiche de mise en garde	Inconnu	\N	image	\N	2024-07-08 13:43:00.187+00	2024-07-08 13:43:00.187+00	\N	THEM12.jpg	image/jpeg	573429	4383	6769	50	50
105	THEM11	Tract	Vers 1960	Inconnu	\N	\N	\N	\N	\N	\N	\N	\N	PL	THEM11	Tract PTT	Tract PTT	Tract PTT	Inconnu	\N	image	\N	2024-07-08 13:49:33.532+00	2024-07-08 13:49:33.532+00	\N	THEM11.jpg	image/jpeg	648036	6000	4000	50	50
106	THEM10	Photographie de travailleurs - document promotionnel Peugeot	vers 1980	Peugeot	\N	\N	\N	\N	\N	\N	\N	\N	Inconnu	THEM10	Photographie de travailleurs - document promotionnel Peugeot	Photographie de travailleurs - document promotionnel Peugeot	Photographie de travailleurs - document promotionnel Peugeot	Sochaux	\N	image	\N	2024-07-08 13:51:59.249+00	2024-07-08 13:51:59.249+00	\N	THEM10.jpg	image/jpeg	765328	3230	1761	50	50
108	THEM09	Photographie intérieur entreprise	Vers 1960	Inconnu	\N	\N	\N	\N	\N	\N	\N	\N	PL	THEM09	Photographie intérieur entreprise	Photographie intérieur entreprise	Photographie intérieur entreprise	Beaucourt	\N	image	\N	2024-07-08 13:54:16.221+00	2024-07-08 13:54:16.221+00	\N	THEM09-1.jpg	image/jpeg	924574	4792	3616	50	50
109	THEM08	Photographie promotionnelle Peugeot	Vers 1980	Inconnu	\N	\N	\N	\N	\N	\N	\N	\N	PL	THEM08	Photographie promotionnelle Peugeot	Photographie promotionnelle Peugeot	Photographie promotionnelle Peugeot	Sochaux	\N	image	\N	2024-07-08 13:56:04.227+00	2024-07-08 13:56:04.227+00	\N	THEM08.jpg	image/jpeg	455213	2838	1761	50	50
110	THEM07	Entreprise	Vers 1920	Inconnu	\N	\N	\N	\N	\N	\N	\N	\N	PL	THEM07	Entreprise	Entreprise	Entreprise	A déterminer	\N	image	\N	2024-07-08 13:58:03.149+00	2024-07-08 13:58:03.149+00	\N	THEM07.jpg	image/jpeg	908808	4116	3114	50	50
111	THEM06	Sortie usine Schwob Bethoncourt	Vers 1910	Inconnu	\N	\N	\N	\N	\N	\N	\N	\N	PL	THEM06	Sortie usine Schwob Bethoncourt	Sortie usine Schwob Bethoncourt	Sortie usine Schwob Bethoncourt	Bethoncourt	\N	image	\N	2024-07-08 14:00:03.481+00	2024-07-08 14:00:03.481+00	\N	THEM06.jpg	image/jpeg	480366	684	533	50	50
112	THEM05	Femmes au travail chez Japy	Vers 1970	Inconnu	\N	\N	\N	\N	\N	\N	\N	\N	PL	THEM05	Femmes au travail chez Japy	Femmes au travail chez Japy	Femmes au travail chez Japy	A déterminer	\N	image	\N	2024-07-08 14:02:24.284+00	2024-07-08 14:02:24.284+00	\N	THEM05.jpg	image/jpeg	826452	1546	1473	50	50
113	THEM04	Publicité montre Japy	Vers 1930	Inconnu	\N	\N	\N	\N	\N	\N	\N	\N	PL	THEM04	Publicité montre Japy	Publicité montre Japy	Publicité montre Japy	Inconnu	\N	image	\N	2024-07-08 14:03:54.014+00	2024-07-08 14:03:54.014+00	\N	THEM04.jpg	image/jpeg	826691	3702	4680	50	50
114	THEM03	Brochure promotionnelle Peugeot	Vers 1980	Inconnu	\N	\N	\N	\N	\N	\N	\N	\N	PL	THEM03	Brochure promotionnelle Peugeot	Brochure promotionnelle Peugeot	Brochure promotionnelle Peugeot	Sochaux	\N	image	\N	2024-07-08 14:06:20.205+00	2024-07-08 14:06:20.205+00	\N	THEM03.jpg	image/jpeg	637446	3198	2265	50	50
62	AUD0007	L'entrée à l'usine à 15 ans et la peur	1984-1985	Jean-Paul Goux	\N	\N	\N	\N	\N	\N	\N	\N	PL	0007	L'entrée à l'usine à 15 ans et la peur	L'entrée à l'usine à 15 ans et la peur	Enregistrement audio  de Jean-Paul Goux avec Mme Gisèle Berthet	Valentigney	\N	audio	\N	2024-07-09 09:10:57.492+00	2024-06-14 10:58:58.023+00	/medias/L_entree_a_l_usine_a_15_ans_et_la_peur-1.mp3	L_entree_a_l_usine_a_15_ans_et_la_peur-1.mp3	audio/mpeg	977571	\N	\N	\N	\N
39	0312	Anciennes forges	14/02/1985	Gilles Choffé	\N	\N	\N	\N	\N	\N	\N	\N	Pascal Lécroart	0312	Anciennes forges	Anciennes forges	Photographie de Gilles Choffé réalisée au moment de la résidence de Jean-Paul Goux à Montbéliard	Audincourt	\N	image	\N	2024-07-09 12:40:59.68+00	2024-06-14 08:57:14.079+00	/medias/0312-1.jpg	0312.jpg	image/jpeg	1000570	4972	3579	50	50
70	0027	Cités Sous Roches	06/03/1985	Gilles Choffé	\N	\N	\N	\N	\N	\N	\N	\N	P.L.	0027	Cités Sous Roches	Cités Sous Roches	Photographie de Gilles Choffé réalisée au moment de la résidence de Jean-Paul Goux à Montbéliard	Valentigney	\N	image	\N	2024-10-05 07:42:31.914+00	2024-06-14 11:18:31.937+00	/medias/0027-1.jpg	0027-1.jpg	image/jpeg	1006276	6080	4023	50	50
\.


--
-- Data for Name: medias_identification_tag; Type: TABLE DATA; Schema: public; Owner: thomas
--

COPY public.medias_identification_tag (_order, _parent_id, id, tag_name) FROM stdin;
1	59	666c20115ffb4100015f0548	Audio
1	60	666c20a15ffb4100015f0549	Audio
2	60	666c20a15ffb4100015f054a	Témoignage
1	16	666bf97b5775b70001a72ba7	Photographie
2	16	666bf97b5775b70001a72ba8	Habitations
1	15	666bf9255775b70001a72ba5	Photographie
2	15	666bf9255775b70001a72ba6	Habitations
3	60	666c20a15ffb4100015f054b	Ouvrière
1	4	666bf42e5775b70001a72b90	Photographie
1	13	666bf8c55775b70001a72ba1	Photographie
2	13	666bf8c55775b70001a72ba2	Habitations
1	65	666c25645ffb4100015f0558	Photographie
2	65	666c25645ffb4100015f0559	Habitations
1	67	666c26295ffb4100015f055c	Photographie
2	67	666c26295ffb4100015f055d	Habitations
1	68	666c267a5ffb4100015f055e	Photographie
2	68	666c267a5ffb4100015f055f	Habitations
1	69	666c26bf5ffb4100015f0560	Photographie
2	69	666c26bf5ffb4100015f0561	Habitations
1	71	666c27525ffb4100015f0564	Photographie
2	71	666c27525ffb4100015f0565	Habitations
1	72	666c27a05ffb4100015f0566	Photographie
2	72	666c27a05ffb4100015f0567	Habitations
1	73	666c27d75ffb4100015f0568	Photographie
2	73	666c27d75ffb4100015f0569	Habitations
1	74	666c28575ffb4100015f056a	Photographie
2	74	666c28575ffb4100015f056b	Paysage industriel
1	75	666c28c95ffb4100015f056c	Photographie
2	75	666c28c95ffb4100015f056d	Habitations
1	76	666c29a25ffb4100015f056e	Photographie
2	76	666c29a25ffb4100015f056f	Habitations
1	6	666bf5c75775b70001a72b93	Photographie
2	6	666bf5c75775b70001a72b94	Habitations
1	42	666c06b75ffb4100015f0517	Photographie
2	42	666c06b75ffb4100015f0518	Usines
1	54	666c1acb5ffb4100015f0539	Photographie
2	54	666c1acb5ffb4100015f053a	Usines
1	77	666c2a125ffb4100015f0570	Photographie
2	77	666c2a125ffb4100015f0571	Habitations
1	78	666c2a465ffb4100015f0572	Photographie
3	54	666c1acb5ffb4100015f053b	Ruines
1	52	666c19d05ffb4100015f0533	Photographie
2	52	666c19d05ffb4100015f0534	Usines
2	78	666c2a465ffb4100015f0573	Habitations
1	90	666c2dbb5ffb4100015f0589	Photographie
2	90	666c2dbb5ffb4100015f058a	Usines
1	80	666c2acf5ffb4100015f0576	Photographie
2	80	666c2acf5ffb4100015f0577	Usines
1	83	666c2bff5ffb4100015f057c	Photographie
2	83	666c2bff5ffb4100015f057d	Usines
1	8	666bf7345775b70001a72b97	Photographie
2	8	666bf7345775b70001a72b98	Habitations
1	9	666bf7945775b70001a72b99	Photographie
2	9	666bf7945775b70001a72b9a	Habitations
1	10	666bf7e85775b70001a72b9b	Photographie
2	10	666bf7e85775b70001a72b9c	Habitations
1	11	666bf8395775b70001a72b9d	Photographie
2	11	666bf8395775b70001a72b9e	Habitations
1	12	666bf8775775b70001a72b9f	Photographie
2	12	666bf8775775b70001a72ba0	Habitations
1	92	6687b0dd68ed37000108535b	Ecole
3	52	666c19d05ffb4100015f0535	Ruines
1	50	666c18bf5ffb4100015f052d	Photographie
2	50	666c18bf5ffb4100015f052e	Usines
3	50	666c18bf5ffb4100015f052f	Ruines
1	48	666c182e5ffb4100015f0527	Photographie
2	48	666c182e5ffb4100015f0528	Usines
3	48	666c182e5ffb4100015f0529	Ruines
1	38	666c05a15ffb4100015f050f	Photographie
2	38	666c05a15ffb4100015f0510	Usines
1	35	666c04855ffb4100015f0509	Photographie
2	35	666c04855ffb4100015f050a	Usines
1	32	666c031b5ffb4100015f0503	Photographie
2	32	666c031b5ffb4100015f0504	Usines
1	30	666c00d95ffb4100015f04fe	Photographie
2	30	666c00d95ffb4100015f04ff	Habitations
3	30	666c00d95ffb4100015f0500	Ruines
1	28	666bff3d5ffb4100015f04f8	Photographie
2	28	666bff3d5ffb4100015f04f9	Habitations
3	28	666bff3d5ffb4100015f04fa	Ruines
1	57	6687d71c8cb187460de87de0	Audio
2	57	6687d7248cb187460de87de1	Témoignage
3	57	6687d6e88cb187460de87ddf	Ouvrier
1	93	668be3c8ce540300015c5b7e	Forges
1	94	668be73bce540300015c5b7f	Carte postale
1	95	668be893ce540300015c5b80	Photographie
1	96	668be963ce540300015c5b81	Photographie
1	99	668bea50ce540300015c5b84	Carte postale
1	26	666bfe235ffb4100015f04f4	Photographie
2	26	666bfe235ffb4100015f04f5	Habitations
1	24	666bfc625ffb4100015f04f0	Photographie
2	24	666bfc625ffb4100015f04f1	Habitations
1	22	666bfb7b5775b70001a72bb3	Photographie
2	22	666bfb7b5775b70001a72bb4	Habitations
2	21	666bfb075775b70001a72bb2	Habitations
1	20	666bfab05775b70001a72baf	Photographie
2	20	666bfab05775b70001a72bb0	Habitations
1	19	666bfa665775b70001a72bad	Photographie
2	19	666bfa665775b70001a72bae	Habitations
1	18	666bfa1b5775b70001a72bab	Photographie
2	18	666bfa1b5775b70001a72bac	Habitations
1	17	666bf9d15775b70001a72ba9	Photographie
2	17	666bf9d15775b70001a72baa	Habitations
1	56	666c1d635ffb4100015f053f	Audio
2	56	666c1d635ffb4100015f0540	Témoignage
3	56	666c1d635ffb4100015f0541	Ouvrier
1	3	666bf39f5775b70001a72b8f	Photographie
1	5	666bf4dc5775b70001a72b91	Photographie
2	5	666bf4dc5775b70001a72b92	Habitations
1	7	666bf6d15775b70001a72b95	Photographie
2	7	666bf6d15775b70001a72b96	Commerce
1	55	666c1b175ffb4100015f053c	Photographie
2	55	666c1b175ffb4100015f053d	Usines
3	55	666c1b175ffb4100015f053e	Ruines
1	53	666c1a455ffb4100015f0536	Photographie
2	53	666c1a455ffb4100015f0537	Usines
3	53	666c1a455ffb4100015f0538	Ruines
1	51	666c19655ffb4100015f0530	Photographie
2	51	666c19655ffb4100015f0531	Usines
3	51	666c19655ffb4100015f0532	Ruines
1	49	666c18705ffb4100015f052a	Photographie
2	49	666c18705ffb4100015f052b	Usines
3	49	666c18705ffb4100015f052c	Ruines
1	47	666c17cf5ffb4100015f0524	Photographie
2	47	666c17cf5ffb4100015f0525	Usines
3	47	666c17cf5ffb4100015f0526	Ruines
1	37	666c05335ffb4100015f050d	Photographie
2	37	666c05335ffb4100015f050e	Usines
1	34	666c03845ffb4100015f0507	Photographie
2	34	666c03845ffb4100015f0508	Usines
1	31	666c02d15ffb4100015f0501	Photographie
2	31	666c02d15ffb4100015f0502	Usines
1	29	666bff9e5ffb4100015f04fb	Photographie
2	29	666bff9e5ffb4100015f04fc	Habitations
3	29	666bff9e5ffb4100015f04fd	Ruines
1	27	666bfecb5ffb4100015f04f6	Photographie
2	27	666bfecb5ffb4100015f04f7	Habitations
1	25	666bfdac5ffb4100015f04f2	Photographie
2	25	666bfdac5ffb4100015f04f3	Habitations
1	23	666bfc145ffb4100015f04ee	Photographie
2	23	666bfc145ffb4100015f04ef	Habitations
1	21	666bfb075775b70001a72bb1	Photographie
1	91	666c34c85ffb4100015f058b	Photographie
2	91	666c34c85ffb4100015f058c	Usines
3	91	666c34c85ffb4100015f058d	Ouvrier
1	40	666c06285ffb4100015f0513	Photographie
2	40	666c06285ffb4100015f0514	Usines
1	43	666c07125ffb4100015f0519	Photographie
2	43	666c07125ffb4100015f051a	Usines
1	44	666c15d45ffb4100015f051b	Photographie
2	44	666c15d45ffb4100015f051c	Usines
3	44	666c15d45ffb4100015f051d	Ruines
1	45	666c16225ffb4100015f051e	Photographie
2	45	666c16225ffb4100015f051f	Usines
3	45	666c16225ffb4100015f0520	Ruines
1	46	666c167e5ffb4100015f0521	Photographie
2	46	666c167e5ffb4100015f0522	Usines
3	46	666c167e5ffb4100015f0523	Ruines
1	41	666c06745ffb4100015f0515	Photographie
2	41	666c06745ffb4100015f0516	Usines
1	63	666c22ec5ffb4100015f0552	Audio
2	63	666c22ec5ffb4100015f0553	Témoignage
3	63	666c22ec5ffb4100015f0554	Ouvrière
1	64	666c23905ffb4100015f0555	Audio
2	64	666c23905ffb4100015f0556	Témoignage
3	64	666c23905ffb4100015f0557	Ouvrière
1	61	666c212b5ffb4100015f054c	Audio
2	61	666c212b5ffb4100015f054d	Témoignage
3	61	666c212b5ffb4100015f054e	Ouvrière
1	58	666c1f615ffb4100015f0545	Audio
2	58	666c1f615ffb4100015f0546	Témoignage
3	58	666c1f615ffb4100015f0547	Ouvrière
1	100	668beadcce540300015c5b85	Photographie
1	101	668beb6ace540300015c5b86	Photographie
1	102	668bebd3ce540300015c5b87	Photographie
1	103	668bec4fce540300015c5b88	Photographie
1	104	668bece4ce540300015c5b89	Affiche
1	105	668bee6dce540300015c5b8a	Tract
1	106	668beeffce540300015c5b8b	Photographies
1	108	668bef88ce540300015c5b8d	Photographie
1	109	668beff4ce540300015c5b8e	Photographie
1	110	668bf06bce540300015c5b8f	Photographie
1	111	668bf0e3ce540300015c5b90	Photographie
1	112	668bf170ce540300015c5b91	Photographie
1	113	668bf1cace540300015c5b92	Publicité
1	114	668bf25cce540300015c5b93	Brochure
1	62	666c22725ffb4100015f054f	Audio
2	62	666c22725ffb4100015f0550	Témoignage
3	62	666c22725ffb4100015f0551	Ouvrière
1	39	666c05ea5ffb4100015f0511	Photographie
2	39	666c05ea5ffb4100015f0512	Usines
1	70	666c27075ffb4100015f0562	Photographie
2	70	666c27075ffb4100015f0563	Habitations
\.


--
-- Data for Name: payload_migrations; Type: TABLE DATA; Schema: public; Owner: thomas
--

COPY public.payload_migrations (id, name, batch, updated_at, created_at) FROM stdin;
\.


--
-- Data for Name: payload_preferences; Type: TABLE DATA; Schema: public; Owner: thomas
--

COPY public.payload_preferences (id, key, value, updated_at, created_at) FROM stdin;
7	users-list	{"limit": "10", "columns": [{"active": true, "accessor": "_select"}, {"active": true, "accessor": "email"}, {"active": true, "accessor": "id"}, {"active": true, "accessor": "username"}, {"active": true, "accessor": "updatedAt"}, {"active": false, "accessor": "createdAt"}]}	2024-06-13 13:41:16.731+00	2024-06-13 13:41:16.731+00
8	cities-list	{"columns": [{"active": true, "accessor": "_select"}, {"active": true, "accessor": "id"}, {"active": true, "accessor": "name"}, {"active": true, "accessor": "slug"}, {"active": true, "accessor": "description"}, {"active": true, "accessor": "thematics"}, {"active": false, "accessor": "medias"}, {"active": false, "accessor": "updatedAt"}, {"active": false, "accessor": "createdAt"}]}	2024-06-13 14:49:15.367+00	2024-06-13 14:49:15.367+00
6	nav	{"open": true}	2024-06-13 12:37:29.624+00	2024-06-13 12:37:29.624+00
3	cities-list	{"columns": [{"active": true, "accessor": "_select"}, {"active": true, "accessor": "id"}, {"active": true, "accessor": "name"}, {"active": true, "accessor": "slug"}, {"active": true, "accessor": "description"}, {"active": false, "accessor": "thematics"}, {"active": false, "accessor": "medias"}, {"active": false, "accessor": "updatedAt"}, {"active": false, "accessor": "createdAt"}]}	2024-06-13 11:58:36.1+00	2024-06-13 11:58:36.1+00
5	documents-list	{"columns": [{"active": true, "accessor": "_select"}, {"active": true, "accessor": "filename"}, {"active": true, "accessor": "id"}, {"active": true, "accessor": "alt"}, {"active": true, "accessor": "updatedAt"}, {"active": false, "accessor": "createdAt"}, {"active": false, "accessor": "url"}, {"active": false, "accessor": "mimeType"}, {"active": false, "accessor": "filesize"}, {"active": false, "accessor": "width"}, {"active": false, "accessor": "height"}, {"active": false, "accessor": "focalX"}, {"active": false, "accessor": "focalY"}]}	2024-06-13 12:21:00.065+00	2024-06-13 12:21:00.065+00
4	sections-list	{"limit": "10", "columns": [{"active": true, "accessor": "_select"}, {"active": true, "accessor": "name"}, {"active": true, "accessor": "id"}, {"active": true, "accessor": "thematics"}, {"active": true, "accessor": "documents"}, {"active": false, "accessor": "updatedAt"}, {"active": false, "accessor": "createdAt"}]}	2024-06-13 11:58:47.142+00	2024-06-13 11:58:47.142+00
2	thematics-list	{"limit": "10", "columns": [{"active": true, "accessor": "_select"}, {"active": true, "accessor": "title"}, {"active": true, "accessor": "id"}, {"active": true, "accessor": "backgroundImage"}, {"active": true, "accessor": "slug"}, {"active": false, "accessor": "color"}, {"active": false, "accessor": "medias"}, {"active": false, "accessor": "updatedAt"}, {"active": false, "accessor": "createdAt"}]}	2024-06-13 11:58:01.525+00	2024-06-13 11:58:01.525+00
11	sections-list	{"limit": "10", "columns": [{"active": true, "accessor": "_select"}, {"active": true, "accessor": "name"}, {"active": true, "accessor": "id"}, {"active": true, "accessor": "thematics"}, {"active": true, "accessor": "documents"}, {"active": false, "accessor": "updatedAt"}, {"active": false, "accessor": "createdAt"}]}	2024-06-14 09:34:48.957+00	2024-06-14 09:34:48.957+00
10	thematics-list	{"columns": [{"active": true, "accessor": "_select"}, {"active": true, "accessor": "title"}, {"active": true, "accessor": "id"}, {"active": true, "accessor": "backgroundImage"}, {"active": true, "accessor": "slug"}, {"active": false, "accessor": "color"}, {"active": false, "accessor": "medias"}, {"active": false, "accessor": "updatedAt"}, {"active": false, "accessor": "createdAt"}]}	2024-06-14 09:31:21.308+00	2024-06-14 09:31:21.308+00
14	nav	{"open": true}	2024-06-26 12:28:28.679+00	2024-06-26 12:28:28.679+00
13	users-list	{"limit": "10", "columns": [{"active": true, "accessor": "_select"}, {"active": true, "accessor": "email"}, {"active": true, "accessor": "id"}, {"active": true, "accessor": "username"}, {"active": true, "accessor": "updatedAt"}, {"active": false, "accessor": "createdAt"}]}	2024-06-26 12:02:20.791+00	2024-06-26 12:02:20.791+00
15	collapsed-Collections-groups	[]	2024-06-26 12:28:32.469+00	2024-06-26 12:28:32.469+00
12	documents-list	{"limit": "10", "columns": [{"active": true, "accessor": "_select"}, {"active": true, "accessor": "filename"}, {"active": true, "accessor": "id"}, {"active": true, "accessor": "alt"}, {"active": true, "accessor": "updatedAt"}, {"active": false, "accessor": "createdAt"}, {"active": false, "accessor": "url"}, {"active": false, "accessor": "mimeType"}, {"active": false, "accessor": "filesize"}, {"active": false, "accessor": "width"}, {"active": false, "accessor": "height"}, {"active": false, "accessor": "focalX"}, {"active": false, "accessor": "focalY"}]}	2024-06-26 11:58:00.041+00	2024-06-26 11:58:00.041+00
1	medias-list	{"sort": "-slug", "columns": [{"active": true, "accessor": "_select"}, {"active": true, "accessor": "slug"}, {"active": true, "accessor": "id"}, {"active": true, "accessor": "identification"}, {"active": true, "accessor": "contexte"}, {"active": false, "accessor": "access_and_use"}, {"active": false, "accessor": "other_references"}, {"active": false, "accessor": "contributor"}, {"active": false, "accessor": "alt"}, {"active": false, "accessor": "legend"}, {"active": false, "accessor": "description"}, {"active": false, "accessor": "location"}, {"active": false, "accessor": "type"}, {"active": false, "accessor": "notice"}, {"active": false, "accessor": "updatedAt"}, {"active": false, "accessor": "createdAt"}, {"active": false, "accessor": "url"}, {"active": false, "accessor": "filename"}, {"active": false, "accessor": "mimeType"}, {"active": false, "accessor": "filesize"}, {"active": false, "accessor": "width"}, {"active": false, "accessor": "height"}, {"active": false, "accessor": "focalX"}, {"active": false, "accessor": "focalY"}]}	2024-06-13 11:57:12.586+00	2024-06-13 11:57:12.586+00
16	users-list	{"limit": "10", "columns": [{"active": true, "accessor": "_select"}, {"active": true, "accessor": "email"}, {"active": true, "accessor": "id"}, {"active": true, "accessor": "username"}, {"active": true, "accessor": "updatedAt"}, {"active": false, "accessor": "createdAt"}]}	2025-01-27 09:32:06.344+00	2025-01-27 09:32:06.344+00
18	thematics-list	{}	2025-01-27 10:42:00.996+00	2025-01-27 10:42:00.996+00
17	medias-list	{}	2025-01-27 10:41:48.794+00	2025-01-27 10:41:48.794+00
9	medias-list	{"sort": "slug", "limit": "10", "columns": [{"active": true, "accessor": "_select"}, {"active": true, "accessor": "slug"}, {"active": true, "accessor": "location"}, {"active": true, "accessor": "filename"}, {"active": true, "accessor": "type"}, {"active": true, "accessor": "id"}, {"active": true, "accessor": "identification"}, {"active": true, "accessor": "contexte"}, {"active": false, "accessor": "access_and_use"}, {"active": false, "accessor": "other_references"}, {"active": false, "accessor": "contributor"}, {"active": false, "accessor": "alt"}, {"active": false, "accessor": "legend"}, {"active": false, "accessor": "description"}, {"active": false, "accessor": "notice"}, {"active": false, "accessor": "updatedAt"}, {"active": false, "accessor": "createdAt"}, {"active": false, "accessor": "url"}, {"active": false, "accessor": "mimeType"}, {"active": false, "accessor": "filesize"}, {"active": false, "accessor": "width"}, {"active": false, "accessor": "height"}, {"active": false, "accessor": "focalX"}, {"active": false, "accessor": "focalY"}]}	2024-06-14 07:39:24.902+00	2024-06-14 07:39:24.902+00
\.


--
-- Data for Name: payload_preferences_rels; Type: TABLE DATA; Schema: public; Owner: thomas
--

COPY public.payload_preferences_rels (id, "order", parent_id, path, users_id) FROM stdin;
667	\N	5	user	1
613	\N	8	user	2
668	\N	4	user	1
669	\N	2	user	1
670	\N	1	user	1
672	\N	16	user	3
674	\N	18	user	3
675	\N	17	user	3
18	\N	6	user	1
241	\N	14	user	2
243	\N	15	user	2
471	\N	12	user	2
475	\N	11	user	2
637	\N	13	user	2
644	\N	9	user	2
661	\N	7	user	1
666	\N	3	user	1
592	\N	10	user	2
\.


--
-- Data for Name: sections; Type: TABLE DATA; Schema: public; Owner: thomas
--

COPY public.sections (id, name, updated_at, created_at) FROM stdin;
3	La vie en dehors du travail	2024-06-14 09:47:56.268+00	2024-06-14 09:47:56.268+00
4	Jean-Paul Goux	2024-06-14 15:11:12.828+00	2024-06-14 15:11:12.828+00
2	Luttes et vie sociale au travail	2024-07-08 09:55:36.64+00	2024-06-14 09:42:24.704+00
1	Les formes et les types de travail	2024-07-08 09:57:43.703+00	2024-06-13 11:59:08.875+00
\.


--
-- Data for Name: sections_rels; Type: TABLE DATA; Schema: public; Owner: thomas
--

COPY public.sections_rels (id, "order", parent_id, path, thematics_id, documents_id) FROM stdin;
25	1	3	thematics	18	\N
26	2	3	thematics	15	\N
27	3	3	thematics	17	\N
28	4	3	thematics	19	\N
29	5	3	thematics	16	\N
31	1	4	thematics	21	\N
42	1	2	thematics	8	\N
43	2	2	thematics	9	\N
44	3	2	thematics	10	\N
45	4	2	thematics	11	\N
46	5	2	thematics	12	\N
47	6	2	thematics	13	\N
48	7	2	thematics	14	\N
50	2	1	thematics	3	\N
51	3	1	thematics	4	\N
52	4	1	thematics	5	\N
53	5	1	thematics	6	\N
54	6	1	thematics	7	\N
\.


--
-- Data for Name: thematics; Type: TABLE DATA; Schema: public; Owner: thomas
--

COPY public.thematics (id, slug, title, color, updated_at, created_at) FROM stdin;
19	ecole	L'école et les études	a	2024-07-05 08:37:57.795+00	2024-06-14 09:46:37.195+00
22	vie-travail	La vie au travail	#e8b30c	2024-07-08 13:14:00.53+00	2024-07-08 13:11:42.113+00
21	goux	Jean-Paul Goux à Montbéliard	#FFFF00	2024-07-08 13:25:02.272+00	2024-06-14 15:10:48.887+00
18	religion	La religion	#ff8b	2024-07-08 13:29:10.987+00	2024-06-14 09:46:15.696+00
17	occupations-loisirs	Les occupations et les loisirs	a	2024-07-08 13:32:20.206+00	2024-06-14 09:45:56.506+00
16	logement	Le logement	#ff8b	2024-07-08 13:34:53.01+00	2024-06-14 09:45:12.026+00
15	vie-familiale	La vie familiale	#ff8b	2024-07-08 13:37:01.325+00	2024-06-14 09:44:55.091+00
14	patrons-paternalisme	Les patrons et le paternalisme	#ca2639	2024-07-08 13:38:52.624+00	2024-06-14 09:41:24.145+00
13	mouvement-sociaux	Les mouvements sociaux	#ca2639	2024-07-08 13:40:51.913+00	2024-06-14 09:40:49.961+00
12	protection-sociale	La protection et les acquis sociaux	#ca2639	2024-07-08 13:43:26.825+00	2024-06-14 09:40:24.017+00
11	syndicat	Action et vie syndicale	#ca2639	2024-07-08 13:49:56.809+00	2024-06-14 09:38:55.729+00
10	immigre-travail	La main d'œuvre immigrée	#ca2639	2024-07-08 13:52:13.774+00	2024-06-14 09:38:18.539+00
9	rapports-homme-femme	Les rapports hommes-femmes au travail	#ca2639	2024-07-08 13:54:28.776+00	2024-06-14 09:37:06.162+00
8	relations-humaines	Relations humaines et classes sociales au travail	#ca2639	2024-07-08 13:56:16.551+00	2024-06-14 09:36:04.553+00
4	horaires-travail	Les horaires au travail	#e8b30c	2024-07-08 14:04:18.138+00	2024-06-14 09:32:57.44+00
3	types-travail	Les différents types de travail	#e8b30c	2024-07-08 14:06:42.049+00	2024-06-14 09:32:22.84+00
7	evolution-travail	Changement et évolution dans le monde du travail	#e8b30c	2024-07-08 14:07:41.18+00	2024-06-14 09:34:43.624+00
6	enfants-travail	Les enfants et les jeunes au travail	#e8b30c	2024-07-08 14:08:09.757+00	2024-06-14 09:33:55.976+00
5	femmes-travail	Les femmes au travail	#e8b30c	2024-07-08 14:08:34.144+00	2024-06-14 09:33:17.336+00
23	lieux-travail	Les lieux de travail	#e8b30c	2024-07-09 07:14:52.617+00	2024-07-08 13:20:31.702+00
\.


--
-- Data for Name: thematics_rels; Type: TABLE DATA; Schema: public; Owner: thomas
--

COPY public.thematics_rels (id, "order", parent_id, path, medias_id) FROM stdin;
111	\N	4	backgroundImage	113
112	1	4	medias	3
113	\N	3	backgroundImage	114
114	1	3	medias	57
115	\N	7	backgroundImage	110
116	1	7	medias	4
117	\N	6	backgroundImage	111
118	1	6	medias	61
119	2	6	medias	62
120	\N	5	backgroundImage	112
121	1	5	medias	58
122	2	5	medias	60
123	\N	23	backgroundImage	94
124	1	23	medias	100
125	2	23	medias	75
126	3	23	medias	67
127	4	23	medias	69
128	5	23	medias	71
129	6	23	medias	72
64	\N	19	backgroundImage	92
65	1	19	medias	3
70	\N	22	backgroundImage	93
71	1	22	medias	93
74	\N	21	backgroundImage	95
75	1	21	medias	55
76	\N	18	backgroundImage	96
77	1	18	medias	3
78	\N	17	backgroundImage	99
79	1	17	medias	3
82	\N	16	backgroundImage	100
83	1	16	medias	3
84	\N	15	backgroundImage	101
85	1	15	medias	3
86	\N	14	backgroundImage	102
87	1	14	medias	3
88	\N	13	backgroundImage	103
89	1	13	medias	3
90	\N	12	backgroundImage	104
91	1	12	medias	3
92	\N	11	backgroundImage	105
93	1	11	medias	64
94	\N	10	backgroundImage	106
95	1	10	medias	59
96	\N	9	backgroundImage	108
97	1	9	medias	42
98	\N	8	backgroundImage	109
99	1	8	medias	59
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: thomas
--

COPY public.users (id, username, updated_at, created_at, email, reset_password_token, reset_password_expiration, salt, hash, login_attempts, lock_until) FROM stdin;
1	Sébastien	2024-06-13 11:47:17.467+00	2024-06-13 11:47:17.467+00	sebastien.jacquot@univ-fcomte.fr	\N	\N	fbb3127fff18b4a72e207407a26a7ff855660e0575aaae30a2d48edd3d14c8b6	4829c2cad443445f745835d6bb90c92d4ef63f7ead8d43103e762a8c805a80fc852f843128617bd9f9658a7340eb69f5dc3a6fabdc8bdb1f32b0902844ab651aad4e7df711119333c967c5cabeaaed43f737ea93366d6fab009e39c06aa99863d410b2d55419ab08ba9a8958e9a4cd4dbf783ef2f35a7ef383ad9932b33722babfecd18c5c2d5d4a8b1f2077adc4f6f14ce9e5393c5fa3e052de62db09b465449324460b6260fc846a76f6999255a581e0f9dfdb1c5e91cf19549b57b41d1596cf7f0115e5da53b8a2330a0c3d26bb2a06fcb4b1a81460707fd0a754606a405e100ee549058ca80ba749995f714e6119452d13473301152d5be30a13b720de7ea25b15a31cf3d8fecbd287475a6443e5db8cc5894e2cc8ced8a85db4c9d2be01621f70d4ff470038fa957667c02bde0e18e4b1174d128e40593340e51c532fa867ea91934eea073cce249333a7b281812867dc0c193942a1a5cee5bbd1ca926269733f0a4b111153f32c2651cf86956ca9cddf77ddb2d7fc780afd70f56bb0486c290816b09408be8adb1a5e579abe286f50cfe6cbe7ee8f645495c6b632e4536634e049a669a8525c0434a980add32aa4dd2df4213b3e0e1e0eee447390dccb880571d747da4ed22163e27e54bfba34e110341715772b367d2932ecd7a2567ce66853f6ed9f406cf3a019d61909c294962fb316042c8dcdf7500073230d463a	0	\N
2	Pascal Lécroart	2024-06-27 09:08:10.4+00	2024-06-13 13:44:54.671+00	pascal.lecroart@univ-fcomte.fr	\N	\N	7ee7fecbe368048a7619ba63a30ded2eca131711ce0ee0e0420be8c0e0b6f533	c4d8dee32a846e34fb848e5c20dfbaf6df2a38de941710f28e5d835a0b7d83bb198cee05d82e043c144d56609c7b86ae3f19cc020dcc0051dea3595fd22a8ee7080fca75e42e45578c2c88d28bdd7f93a4adf574db48267558730b2066ba0fc63098d8c5a02964f26bb24027c6af4fe7db1366e83ac0257855510c1c438cd11cdf3ba034d0ef00b6292209196aeeb9cae2a57f267d9669ec5f49f4048f11f7f594dd540ed56d4950c2b217c16c24d6d13370a4a8ddf0b61f983644572f47f2b3ce1b214355dbf955798c490266db1ad9a3abc493202a62f2b1095027085b1feed214f2155b78d21462b90791771e568b298baa7c1c0849915b527eabeaf05a9c057b446ff40d5ead709fc505b1eef1c413b4525cdc87250e89060541853258eeae10749151b6f11618da335bbdfe000eb8e7bf50fccb0518a8153167bf796ef7cdb319469e24a5d0b0ef75810dfe54ff971ca8ba65a0b651bc74c4e3e13602e4228e94a634a9f55c89b48ce0cca3807fc92190cf00d23b6c9efc291fbbb2fe87b840ffceeb84f731c3c28c9caa9139ff70df04f82542d682cb3ab979c63324783f534b009b28e8e08430955f6e667025da3956a2afc74994a6746b324c36fb7a21702069b340094e0989b6d217de02010ebac40154d324aeaf7cf13f1ba6be087a8d5604fe7a2ee2ffb3083d6861a5d95b06884814a8cfe14e9a0fc82b32f2ce	1	\N
3	Paul Gravinese	2025-01-27 09:11:56.7+00	2025-01-27 09:11:45.652+00	gravinese.paul@orange.fr	\N	\N	1b1a86b765382fbaf8224d97a8482c574b64a34857f3fe1de6da6faffde5b450	55a9c12f243c2d7ad7901f535c1bd675a864ded347ae59988d0e5ea91f79417a4d4a00399719a9809bea6f2c5a6df6eeb7e73ae1d888abe6ef2d9a64cc1a4c43e845c11a4963ffdfd4b61a87a6aa953a258b3b5b12fcc03bec4b116ee62a4f00edd2597c7de1542e9a9efb4250495dfc12f1e6a8fde74d3591ea4cc4ce9f337dc8104afa90ea2d8e31f11bb0f9a73525937f91d77cc7373129e54fbb8ca861f7102f11ad8a05e2e49d8c39c708545f77cd57ce3f488691581618c0e88eef8df7b5786ed089e412c6c7f879538eabf307c037e57507006ac34afa1a589d56ae351554fa4fce4cadf64b30e1f9e7a1b825816a4f200c02c2b2b20a18e8ba7145c565056c2ace588cfea9b862ff087d5c9bcaf74f18c6fe0ff944604881b37a4f57c263b0f03c0fc8c1a9474c1073396d9e8fd3c726b90e083dd31895bb91f5399dd2ed5cdb4acaada4e9d8d6945665b6ae797b8e5752221f1e2715c8879d36ffa7bc1ec85fa17979e10f51df99e09d70040892bba1f5c76724575a7950f7a939533dc0d771ee855bad315fcec32e0a20200e13b4e23f11d5025fe7feecda0187f65aebdaaf4341f3c3f7658f3c1feabf8dae2754687780859b8d98873cb252846c8dd3e501ff8ae420bf628f796fc7ba25c8d674c5dd8738df09722149f25abe498ff3998c41fb5a52987ca9a32f9d176faa6dbd51b2ed5d8954c96f10e239dded	0	\N
\.


--
-- Name: cities_id_seq; Type: SEQUENCE SET; Schema: public; Owner: thomas
--

SELECT pg_catalog.setval('public.cities_id_seq', 13, true);


--
-- Name: cities_rels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: thomas
--

SELECT pg_catalog.setval('public.cities_rels_id_seq', 291, true);


--
-- Name: documents_id_seq; Type: SEQUENCE SET; Schema: public; Owner: thomas
--

SELECT pg_catalog.setval('public.documents_id_seq', 1, true);


--
-- Name: medias_id_seq; Type: SEQUENCE SET; Schema: public; Owner: thomas
--

SELECT pg_catalog.setval('public.medias_id_seq', 114, true);


--
-- Name: payload_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: thomas
--

SELECT pg_catalog.setval('public.payload_migrations_id_seq', 1, false);


--
-- Name: payload_preferences_id_seq; Type: SEQUENCE SET; Schema: public; Owner: thomas
--

SELECT pg_catalog.setval('public.payload_preferences_id_seq', 18, true);


--
-- Name: payload_preferences_rels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: thomas
--

SELECT pg_catalog.setval('public.payload_preferences_rels_id_seq', 675, true);


--
-- Name: sections_id_seq; Type: SEQUENCE SET; Schema: public; Owner: thomas
--

SELECT pg_catalog.setval('public.sections_id_seq', 4, true);


--
-- Name: sections_rels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: thomas
--

SELECT pg_catalog.setval('public.sections_rels_id_seq', 54, true);


--
-- Name: thematics_id_seq; Type: SEQUENCE SET; Schema: public; Owner: thomas
--

SELECT pg_catalog.setval('public.thematics_id_seq', 23, true);


--
-- Name: thematics_rels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: thomas
--

SELECT pg_catalog.setval('public.thematics_rels_id_seq', 129, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: thomas
--

SELECT pg_catalog.setval('public.users_id_seq', 3, true);


--
-- Name: cities cities_pkey; Type: CONSTRAINT; Schema: public; Owner: thomas
--

ALTER TABLE ONLY public.cities
    ADD CONSTRAINT cities_pkey PRIMARY KEY (id);


--
-- Name: cities_rels cities_rels_pkey; Type: CONSTRAINT; Schema: public; Owner: thomas
--

ALTER TABLE ONLY public.cities_rels
    ADD CONSTRAINT cities_rels_pkey PRIMARY KEY (id);


--
-- Name: documents documents_pkey; Type: CONSTRAINT; Schema: public; Owner: thomas
--

ALTER TABLE ONLY public.documents
    ADD CONSTRAINT documents_pkey PRIMARY KEY (id);


--
-- Name: medias_identification_tag medias_identification_tag_pkey; Type: CONSTRAINT; Schema: public; Owner: thomas
--

ALTER TABLE ONLY public.medias_identification_tag
    ADD CONSTRAINT medias_identification_tag_pkey PRIMARY KEY (id);


--
-- Name: medias medias_pkey; Type: CONSTRAINT; Schema: public; Owner: thomas
--

ALTER TABLE ONLY public.medias
    ADD CONSTRAINT medias_pkey PRIMARY KEY (id);


--
-- Name: payload_migrations payload_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: thomas
--

ALTER TABLE ONLY public.payload_migrations
    ADD CONSTRAINT payload_migrations_pkey PRIMARY KEY (id);


--
-- Name: payload_preferences payload_preferences_pkey; Type: CONSTRAINT; Schema: public; Owner: thomas
--

ALTER TABLE ONLY public.payload_preferences
    ADD CONSTRAINT payload_preferences_pkey PRIMARY KEY (id);


--
-- Name: payload_preferences_rels payload_preferences_rels_pkey; Type: CONSTRAINT; Schema: public; Owner: thomas
--

ALTER TABLE ONLY public.payload_preferences_rels
    ADD CONSTRAINT payload_preferences_rels_pkey PRIMARY KEY (id);


--
-- Name: sections sections_pkey; Type: CONSTRAINT; Schema: public; Owner: thomas
--

ALTER TABLE ONLY public.sections
    ADD CONSTRAINT sections_pkey PRIMARY KEY (id);


--
-- Name: sections_rels sections_rels_pkey; Type: CONSTRAINT; Schema: public; Owner: thomas
--

ALTER TABLE ONLY public.sections_rels
    ADD CONSTRAINT sections_rels_pkey PRIMARY KEY (id);


--
-- Name: thematics thematics_pkey; Type: CONSTRAINT; Schema: public; Owner: thomas
--

ALTER TABLE ONLY public.thematics
    ADD CONSTRAINT thematics_pkey PRIMARY KEY (id);


--
-- Name: thematics_rels thematics_rels_pkey; Type: CONSTRAINT; Schema: public; Owner: thomas
--

ALTER TABLE ONLY public.thematics_rels
    ADD CONSTRAINT thematics_rels_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: thomas
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: cities_created_at_idx; Type: INDEX; Schema: public; Owner: thomas
--

CREATE INDEX cities_created_at_idx ON public.cities USING btree (created_at);


--
-- Name: cities_name_idx; Type: INDEX; Schema: public; Owner: thomas
--

CREATE UNIQUE INDEX cities_name_idx ON public.cities USING btree (name);


--
-- Name: cities_rels_order_idx; Type: INDEX; Schema: public; Owner: thomas
--

CREATE INDEX cities_rels_order_idx ON public.cities_rels USING btree ("order");


--
-- Name: cities_rels_parent_idx; Type: INDEX; Schema: public; Owner: thomas
--

CREATE INDEX cities_rels_parent_idx ON public.cities_rels USING btree (parent_id);


--
-- Name: cities_rels_path_idx; Type: INDEX; Schema: public; Owner: thomas
--

CREATE INDEX cities_rels_path_idx ON public.cities_rels USING btree (path);


--
-- Name: cities_slug_idx; Type: INDEX; Schema: public; Owner: thomas
--

CREATE UNIQUE INDEX cities_slug_idx ON public.cities USING btree (slug);


--
-- Name: documents_created_at_idx; Type: INDEX; Schema: public; Owner: thomas
--

CREATE INDEX documents_created_at_idx ON public.documents USING btree (created_at);


--
-- Name: documents_filename_idx; Type: INDEX; Schema: public; Owner: thomas
--

CREATE UNIQUE INDEX documents_filename_idx ON public.documents USING btree (filename);


--
-- Name: medias_contexte_contexte_modality_idx; Type: INDEX; Schema: public; Owner: thomas
--

CREATE UNIQUE INDEX medias_contexte_contexte_modality_idx ON public.medias USING btree (contexte_modality);


--
-- Name: medias_created_at_idx; Type: INDEX; Schema: public; Owner: thomas
--

CREATE INDEX medias_created_at_idx ON public.medias USING btree (created_at);


--
-- Name: medias_filename_idx; Type: INDEX; Schema: public; Owner: thomas
--

CREATE UNIQUE INDEX medias_filename_idx ON public.medias USING btree (filename);


--
-- Name: medias_identification_identification_cote_idx; Type: INDEX; Schema: public; Owner: thomas
--

CREATE UNIQUE INDEX medias_identification_identification_cote_idx ON public.medias USING btree (identification_cote);


--
-- Name: medias_identification_tag_order_idx; Type: INDEX; Schema: public; Owner: thomas
--

CREATE INDEX medias_identification_tag_order_idx ON public.medias_identification_tag USING btree (_order);


--
-- Name: medias_identification_tag_parent_id_idx; Type: INDEX; Schema: public; Owner: thomas
--

CREATE INDEX medias_identification_tag_parent_id_idx ON public.medias_identification_tag USING btree (_parent_id);


--
-- Name: medias_slug_idx; Type: INDEX; Schema: public; Owner: thomas
--

CREATE UNIQUE INDEX medias_slug_idx ON public.medias USING btree (slug);


--
-- Name: payload_migrations_created_at_idx; Type: INDEX; Schema: public; Owner: thomas
--

CREATE INDEX payload_migrations_created_at_idx ON public.payload_migrations USING btree (created_at);


--
-- Name: payload_preferences_created_at_idx; Type: INDEX; Schema: public; Owner: thomas
--

CREATE INDEX payload_preferences_created_at_idx ON public.payload_preferences USING btree (created_at);


--
-- Name: payload_preferences_key_idx; Type: INDEX; Schema: public; Owner: thomas
--

CREATE INDEX payload_preferences_key_idx ON public.payload_preferences USING btree (key);


--
-- Name: payload_preferences_rels_order_idx; Type: INDEX; Schema: public; Owner: thomas
--

CREATE INDEX payload_preferences_rels_order_idx ON public.payload_preferences_rels USING btree ("order");


--
-- Name: payload_preferences_rels_parent_idx; Type: INDEX; Schema: public; Owner: thomas
--

CREATE INDEX payload_preferences_rels_parent_idx ON public.payload_preferences_rels USING btree (parent_id);


--
-- Name: payload_preferences_rels_path_idx; Type: INDEX; Schema: public; Owner: thomas
--

CREATE INDEX payload_preferences_rels_path_idx ON public.payload_preferences_rels USING btree (path);


--
-- Name: sections_created_at_idx; Type: INDEX; Schema: public; Owner: thomas
--

CREATE INDEX sections_created_at_idx ON public.sections USING btree (created_at);


--
-- Name: sections_rels_order_idx; Type: INDEX; Schema: public; Owner: thomas
--

CREATE INDEX sections_rels_order_idx ON public.sections_rels USING btree ("order");


--
-- Name: sections_rels_parent_idx; Type: INDEX; Schema: public; Owner: thomas
--

CREATE INDEX sections_rels_parent_idx ON public.sections_rels USING btree (parent_id);


--
-- Name: sections_rels_path_idx; Type: INDEX; Schema: public; Owner: thomas
--

CREATE INDEX sections_rels_path_idx ON public.sections_rels USING btree (path);


--
-- Name: thematics_created_at_idx; Type: INDEX; Schema: public; Owner: thomas
--

CREATE INDEX thematics_created_at_idx ON public.thematics USING btree (created_at);


--
-- Name: thematics_rels_order_idx; Type: INDEX; Schema: public; Owner: thomas
--

CREATE INDEX thematics_rels_order_idx ON public.thematics_rels USING btree ("order");


--
-- Name: thematics_rels_parent_idx; Type: INDEX; Schema: public; Owner: thomas
--

CREATE INDEX thematics_rels_parent_idx ON public.thematics_rels USING btree (parent_id);


--
-- Name: thematics_rels_path_idx; Type: INDEX; Schema: public; Owner: thomas
--

CREATE INDEX thematics_rels_path_idx ON public.thematics_rels USING btree (path);


--
-- Name: thematics_slug_idx; Type: INDEX; Schema: public; Owner: thomas
--

CREATE UNIQUE INDEX thematics_slug_idx ON public.thematics USING btree (slug);


--
-- Name: users_created_at_idx; Type: INDEX; Schema: public; Owner: thomas
--

CREATE INDEX users_created_at_idx ON public.users USING btree (created_at);


--
-- Name: users_email_idx; Type: INDEX; Schema: public; Owner: thomas
--

CREATE UNIQUE INDEX users_email_idx ON public.users USING btree (email);


--
-- Name: cities_rels cities_rels_medias_fk; Type: FK CONSTRAINT; Schema: public; Owner: thomas
--

ALTER TABLE ONLY public.cities_rels
    ADD CONSTRAINT cities_rels_medias_fk FOREIGN KEY (medias_id) REFERENCES public.medias(id) ON DELETE CASCADE;


--
-- Name: cities_rels cities_rels_parent_fk; Type: FK CONSTRAINT; Schema: public; Owner: thomas
--

ALTER TABLE ONLY public.cities_rels
    ADD CONSTRAINT cities_rels_parent_fk FOREIGN KEY (parent_id) REFERENCES public.cities(id) ON DELETE CASCADE;


--
-- Name: cities_rels cities_rels_thematics_fk; Type: FK CONSTRAINT; Schema: public; Owner: thomas
--

ALTER TABLE ONLY public.cities_rels
    ADD CONSTRAINT cities_rels_thematics_fk FOREIGN KEY (thematics_id) REFERENCES public.thematics(id) ON DELETE CASCADE;


--
-- Name: medias_identification_tag medias_identification_tag_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: thomas
--

ALTER TABLE ONLY public.medias_identification_tag
    ADD CONSTRAINT medias_identification_tag_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.medias(id) ON DELETE CASCADE;


--
-- Name: payload_preferences_rels payload_preferences_rels_parent_fk; Type: FK CONSTRAINT; Schema: public; Owner: thomas
--

ALTER TABLE ONLY public.payload_preferences_rels
    ADD CONSTRAINT payload_preferences_rels_parent_fk FOREIGN KEY (parent_id) REFERENCES public.payload_preferences(id) ON DELETE CASCADE;


--
-- Name: payload_preferences_rels payload_preferences_rels_users_fk; Type: FK CONSTRAINT; Schema: public; Owner: thomas
--

ALTER TABLE ONLY public.payload_preferences_rels
    ADD CONSTRAINT payload_preferences_rels_users_fk FOREIGN KEY (users_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: sections_rels sections_rels_documents_fk; Type: FK CONSTRAINT; Schema: public; Owner: thomas
--

ALTER TABLE ONLY public.sections_rels
    ADD CONSTRAINT sections_rels_documents_fk FOREIGN KEY (documents_id) REFERENCES public.documents(id) ON DELETE CASCADE;


--
-- Name: sections_rels sections_rels_parent_fk; Type: FK CONSTRAINT; Schema: public; Owner: thomas
--

ALTER TABLE ONLY public.sections_rels
    ADD CONSTRAINT sections_rels_parent_fk FOREIGN KEY (parent_id) REFERENCES public.sections(id) ON DELETE CASCADE;


--
-- Name: sections_rels sections_rels_thematics_fk; Type: FK CONSTRAINT; Schema: public; Owner: thomas
--

ALTER TABLE ONLY public.sections_rels
    ADD CONSTRAINT sections_rels_thematics_fk FOREIGN KEY (thematics_id) REFERENCES public.thematics(id) ON DELETE CASCADE;


--
-- Name: thematics_rels thematics_rels_medias_fk; Type: FK CONSTRAINT; Schema: public; Owner: thomas
--

ALTER TABLE ONLY public.thematics_rels
    ADD CONSTRAINT thematics_rels_medias_fk FOREIGN KEY (medias_id) REFERENCES public.medias(id) ON DELETE CASCADE;


--
-- Name: thematics_rels thematics_rels_parent_fk; Type: FK CONSTRAINT; Schema: public; Owner: thomas
--

ALTER TABLE ONLY public.thematics_rels
    ADD CONSTRAINT thematics_rels_parent_fk FOREIGN KEY (parent_id) REFERENCES public.thematics(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

