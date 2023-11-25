--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2

-- Started on 2023-05-29 22:25:51

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
-- TOC entry 2 (class 3079 OID 32853)
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- TOC entry 3362 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 217 (class 1259 OID 32946)
-- Name: playlist; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.playlist (
    code uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    title character varying NOT NULL,
    description character varying NOT NULL,
    user_code uuid NOT NULL
);


ALTER TABLE public.playlist OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 32938)
-- Name: song; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.song (
    code uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    title character varying NOT NULL,
    duration integer NOT NULL
);


ALTER TABLE public.song OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 32959)
-- Name: songxplaylist; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.songxplaylist (
    code uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    song_code uuid NOT NULL,
    playlist_code uuid NOT NULL,
    date_added date DEFAULT now() NOT NULL
);


ALTER TABLE public.songxplaylist OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 32864)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    code uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    username character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 3355 (class 0 OID 32946)
-- Dependencies: 217
-- Data for Name: playlist; Type: TABLE DATA; Schema: public; Owner: postgres
--

ALTER TABLE public.users ADD active boolean NOT NULL DEFAULT true;

CREATE TABLE public.token (
	code uuid NOT NULL DEFAULT gen_random_uuid(),
	"content" varchar NOT NULL,
	active boolean NOT NULL DEFAULT true,
	"timestamp" timestamp without time zone NULL DEFAULT CURRENT_TIMESTAMP,
	user_code uuid NULL,
	CONSTRAINT token_pk PRIMARY KEY (code),
	CONSTRAINT token_fk FOREIGN KEY (user_code) REFERENCES public.users(code) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO public.playlist VALUES ('3eda6d04-a6b1-4ab0-aa4c-a4f2e6d64e0e', 'elit, pellentesque', 'eros nec tellus. Nunc lectus pede, ultrices a, auctor non,', '5d6ae485-d552-4e4f-bce0-69ee75b424c9');
INSERT INTO public.playlist VALUES ('a8a37851-25e2-4d2a-bee5-c29f5cf8d858', 'eu turpis.', 'euismod mauris eu elit. Nulla facilisi. Sed neque. Sed eget', 'b554160e-07e8-464f-857d-c453d4348f43');
INSERT INTO public.playlist VALUES ('e32d40a2-c49e-449a-9b87-86df6cf2e3e5', 'et arcu', 'eros non enim commodo hendrerit. Donec porttitor tellus non magna.', 'b16bc02d-f1f2-43c4-88ec-69da698d5376');
INSERT INTO public.playlist VALUES ('096af6cf-3803-4e38-9298-314dd7da7312', 'ultrices, mauris', 'Nullam nisl. Maecenas malesuada fringilla est. Mauris eu turpis. Nulla', 'b16bc02d-f1f2-43c4-88ec-69da698d5376');
INSERT INTO public.playlist VALUES ('0b9cabfc-3a65-4f22-b602-6c57677dd7cf', 'nibh sit', 'dolor elit, pellentesque a, facilisis non, bibendum sed, est. Nunc', 'b554160e-07e8-464f-857d-c453d4348f43');
INSERT INTO public.playlist VALUES ('99698421-2f40-4ce1-8e1e-9049b5bb8adc', 'ac nulla.', 'consequat dolor vitae dolor. Donec fringilla. Donec feugiat metus sit', '5d6ae485-d552-4e4f-bce0-69ee75b424c9');
INSERT INTO public.playlist VALUES ('20b0c1c3-fdfe-4277-865f-23c8f8c2c119', 'et, lacinia', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Etiam laoreet,', '4d2193e7-3b1d-4455-a160-e067f7245538');
INSERT INTO public.playlist VALUES ('1df67c76-0071-4480-98f3-139e40335850', 'elit pede,', 'fringilla est. Mauris eu turpis. Nulla aliquet. Proin velit. Sed', 'b16bc02d-f1f2-43c4-88ec-69da698d5376');
INSERT INTO public.playlist VALUES ('53d29f8f-8de1-4e27-8840-6d816882a3a8', 'velit dui,', 'et magnis dis parturient montes, nascetur ridiculus mus. Aenean eget', 'b2686ee8-1505-4364-94d3-bdefd82d42d2');
INSERT INTO public.playlist VALUES ('c97767f6-3bb8-451b-b588-5c1d15a71524', 'Suspendisse dui.', 'montes, nascetur ridiculus mus. Proin vel nisl. Quisque fringilla euismod', 'b2686ee8-1505-4364-94d3-bdefd82d42d2');
INSERT INTO public.playlist VALUES ('807dae0a-69b1-4733-b722-d50cb72783ca', 'imperdiet dictum', 'Nunc quis arcu vel quam dignissim pharetra. Nam ac nulla.', '5d6ae485-d552-4e4f-bce0-69ee75b424c9');
INSERT INTO public.playlist VALUES ('9285e23c-0ad0-40ff-a4bc-806ceb9e5b2d', 'ornare tortor', 'euismod in, dolor. Fusce feugiat. Lorem ipsum dolor sit amet,', 'b16bc02d-f1f2-43c4-88ec-69da698d5376');
INSERT INTO public.playlist VALUES ('a2475254-697b-4096-af98-bc36d7cffb71', 'Lorem ipsum', 'vitae odio sagittis semper. Nam tempor diam dictum sapien. Aenean', 'b2686ee8-1505-4364-94d3-bdefd82d42d2');
INSERT INTO public.playlist VALUES ('26df7f80-85a4-4cd2-a15b-f8187947b3e0', 'Aliquam ultrices', 'erat semper rutrum. Fusce dolor quam, elementum at, egestas a,', 'b554160e-07e8-464f-857d-c453d4348f43');
INSERT INTO public.playlist VALUES ('c52c2bc8-e16d-49e3-af0e-d666b838ce4c', 'elit. Curabitur', 'non, egestas a, dui. Cras pellentesque. Sed dictum. Proin eget', '0da2c928-7b98-4d10-a753-70cf582310f8');
INSERT INTO public.playlist VALUES ('15ee45d0-f9af-453d-b7e5-1ca27b12d293', 'laoreet lectus', 'lorem semper auctor. Mauris vel turpis. Aliquam adipiscing lobortis risus.', '4d2193e7-3b1d-4455-a160-e067f7245538');
INSERT INTO public.playlist VALUES ('d8288e83-3fd1-476f-84f7-3ac72783df38', 'nisi. Cum', 'posuere cubilia Curae Donec tincidunt. Donec vitae erat vel pede', 'b554160e-07e8-464f-857d-c453d4348f43');
INSERT INTO public.playlist VALUES ('9d5b86e9-63f9-4ef4-99b4-49e4ea95a92b', 'consequat, lectus', 'conubia nostra, per inceptos hymenaeos. Mauris ut quam vel sapien', '19850f9c-68fe-424d-a6dc-94a627d3b7a3');
INSERT INTO public.playlist VALUES ('bc9926be-50df-4cec-8721-016a36adc7d0', 'quam a', 'cursus et, eros. Proin ultrices. Duis volutpat nunc sit amet', 'a2f2203b-2324-43e3-a879-bcb13854b131');
INSERT INTO public.playlist VALUES ('55f154b0-b73e-48ce-899f-33210fe86440', 'Nam porttitor', 'Vivamus non lorem vitae odio sagittis semper. Nam tempor diam', 'b2686ee8-1505-4364-94d3-bdefd82d42d2');
INSERT INTO public.playlist VALUES ('13deecfa-9b3e-4a6f-a929-b405cacbeb65', 'massa lobortis', 'dictum magna. Ut tincidunt orci quis lectus. Nullam suscipit, est', 'b554160e-07e8-464f-857d-c453d4348f43');
INSERT INTO public.playlist VALUES ('7ca8dc7e-a6f6-4726-8474-b706d7726fd0', 'nascetur ridiculus', 'fames ac turpis egestas. Fusce aliquet magna a neque. Nullam', 'b16bc02d-f1f2-43c4-88ec-69da698d5376');
INSERT INTO public.playlist VALUES ('80e998fd-0ec9-4584-bdbd-6fd8214604eb', 'Proin dolor.', 'Donec vitae erat vel pede blandit congue. In scelerisque scelerisque', 'b2686ee8-1505-4364-94d3-bdefd82d42d2');
INSERT INTO public.playlist VALUES ('cbb1ec99-b441-42a5-9d9a-ffad3f46f35a', 'ipsum nunc', 'fringilla ornare placerat, orci lacus vestibulum lorem, sit amet ultricies', 'a2f2203b-2324-43e3-a879-bcb13854b131');
INSERT INTO public.playlist VALUES ('524f159e-4096-48b0-aca6-498b019e6cad', 'Nunc laoreet', 'a feugiat tellus lorem eu metus. In lorem. Donec elementum,', '5d6ae485-d552-4e4f-bce0-69ee75b424c9');
INSERT INTO public.playlist VALUES ('87eb5703-6071-41da-a94f-971911e20565', 'metus. Aliquam', 'In at pede. Cras vulputate velit eu sem. Pellentesque ut', '0da2c928-7b98-4d10-a753-70cf582310f8');
INSERT INTO public.playlist VALUES ('abacb7bd-5093-46e1-9660-02a0a39c4405', 'at, velit.', 'aliquet, sem ut cursus luctus, ipsum leo elementum sem, vitae', 'b16bc02d-f1f2-43c4-88ec-69da698d5376');
INSERT INTO public.playlist VALUES ('28ed55f9-bcca-4748-8a1b-54d5b4990712', 'ut mi.', 'Pellentesque ultricies dignissim lacus. Aliquam rutrum lorem ac risus. Morbi', '5d6ae485-d552-4e4f-bce0-69ee75b424c9');
INSERT INTO public.playlist VALUES ('8783af55-61ae-4252-bbad-91795dcfdd33', 'vulputate, risus', 'luctus vulputate, nisi sem semper erat, in consectetuer ipsum nunc', 'd8c468e6-60fc-4c94-81f4-6cf755da0c38');
INSERT INTO public.playlist VALUES ('6c0c5840-fd10-4bd4-868b-cf0f30dc89b9', 'bibendum ullamcorper.', 'lobortis. Class aptent taciti sociosqu ad litora torquent per conubia', '5d6ae485-d552-4e4f-bce0-69ee75b424c9');
INSERT INTO public.playlist VALUES ('545d2df6-5051-486a-ae14-dd8296612afa', 'urna. Nunc', 'metus. Vivamus euismod urna. Nullam lobortis quam a felis ullamcorper', '4d2193e7-3b1d-4455-a160-e067f7245538');
INSERT INTO public.playlist VALUES ('add55160-2baa-49d9-a7c3-e945e5c35575', 'tellus, imperdiet', 'ultricies ligula. Nullam enim. Sed nulla ante, iaculis nec, eleifend', 'b16bc02d-f1f2-43c4-88ec-69da698d5376');
INSERT INTO public.playlist VALUES ('81376c73-b30a-497f-bc37-c3c9542768b9', 'quis arcu', 'ipsum. Suspendisse sagittis. Nullam vitae diam. Proin dolor. Nulla semper', 'a2f2203b-2324-43e3-a879-bcb13854b131');
INSERT INTO public.playlist VALUES ('f3862e0a-7a0d-4bcf-9824-a3d3f91d580d', 'velit dui,', 'aliquet, metus urna convallis erat, eget tincidunt dui augue eu', 'a2f2203b-2324-43e3-a879-bcb13854b131');
INSERT INTO public.playlist VALUES ('42d19466-b433-4ce7-a9ed-7244d0ee57c1', 'vitae, posuere', 'Morbi non sapien molestie orci tincidunt adipiscing. Mauris molestie pharetra', '19850f9c-68fe-424d-a6dc-94a627d3b7a3');
INSERT INTO public.playlist VALUES ('7b877bf6-5378-4be2-b8e8-2982e33de468', 'suscipit, est', 'mauris id sapien. Cras dolor dolor, tempus non, lacinia at,', '19850f9c-68fe-424d-a6dc-94a627d3b7a3');
INSERT INTO public.playlist VALUES ('446e274f-c03e-4a10-b822-abd6c94dbd75', 'amet, dapibus', 'lorem lorem, luctus ut, pellentesque eget, dictum placerat, augue. Sed', '4d2193e7-3b1d-4455-a160-e067f7245538');
INSERT INTO public.playlist VALUES ('80ca07b5-334c-48aa-9c62-c5561f92c7b2', 'felis ullamcorper', 'luctus lobortis. Class aptent taciti sociosqu ad litora torquent per', '19850f9c-68fe-424d-a6dc-94a627d3b7a3');
INSERT INTO public.playlist VALUES ('b35364c6-b685-4ce2-bc96-5cdf8a87610a', 'rhoncus. Proin', 'tempus scelerisque, lorem ipsum sodales purus, in molestie tortor nibh', '19850f9c-68fe-424d-a6dc-94a627d3b7a3');
INSERT INTO public.playlist VALUES ('0d71053e-7ddf-4aca-a4b0-bb8f09a764a1', 'amet luctus', 'senectus et netus et malesuada fames ac turpis egestas. Fusce', 'b554160e-07e8-464f-857d-c453d4348f43');
INSERT INTO public.playlist VALUES ('386dacba-209f-45a2-9ff0-b95229f7c251', 'feugiat placerat', 'sed dictum eleifend, nunc risus varius orci, in consequat enim', 'a2f2203b-2324-43e3-a879-bcb13854b131');
INSERT INTO public.playlist VALUES ('3c366c2f-e730-4dc4-8083-64e405244035', 'lorem ut', 'mauris erat eget ipsum. Suspendisse sagittis. Nullam vitae diam. Proin', 'b554160e-07e8-464f-857d-c453d4348f43');
INSERT INTO public.playlist VALUES ('86951ce3-4316-46d5-9cee-caec7131476d', 'rutrum magna.', 'lorem, vehicula et, rutrum eu, ultrices sit amet, risus. Donec', '5d6ae485-d552-4e4f-bce0-69ee75b424c9');
INSERT INTO public.playlist VALUES ('a23169c6-8983-4545-a449-dff4b5fa0a8c', 'consequat auctor,', 'erat, in consectetuer ipsum nunc id enim. Curabitur massa. Vestibulum', '19850f9c-68fe-424d-a6dc-94a627d3b7a3');
INSERT INTO public.playlist VALUES ('b1a943cc-6ac7-475a-8687-d8a9ea35fbfe', 'Aenean egestas', 'Suspendisse non leo. Vivamus nibh dolor, nonummy ac, feugiat non,', 'b2686ee8-1505-4364-94d3-bdefd82d42d2');
INSERT INTO public.playlist VALUES ('f46eb7c8-4839-4c28-94fc-1502a27798c7', 'dolor sit', 'adipiscing elit. Etiam laoreet, libero et tristique pellentesque, tellus sem', '5d6ae485-d552-4e4f-bce0-69ee75b424c9');
INSERT INTO public.playlist VALUES ('52bacb8e-6bfe-4ea0-88b7-5e11bf6cd99a', 'et, rutrum', 'commodo auctor velit. Aliquam nisl. Nulla eu neque pellentesque massa', '5d6ae485-d552-4e4f-bce0-69ee75b424c9');
INSERT INTO public.playlist VALUES ('6e0db3f6-f93e-4d41-9c45-ef99d1403efb', 'malesuada ut,', 'lacus, varius et, euismod et, commodo at, libero. Morbi accumsan', '5d6ae485-d552-4e4f-bce0-69ee75b424c9');
INSERT INTO public.playlist VALUES ('45dc6737-0b46-4074-8d1e-ed6ef7074dfb', 'cursus purus.', 'Pellentesque ut ipsum ac mi eleifend egestas. Sed pharetra, felis', 'a2f2203b-2324-43e3-a879-bcb13854b131');
INSERT INTO public.playlist VALUES ('741515a7-cd8d-426c-b56d-9397e9677b7a', 'Etiam bibendum', 'tempor bibendum. Donec felis orci, adipiscing non, luctus sit amet,', 'b2686ee8-1505-4364-94d3-bdefd82d42d2');
INSERT INTO public.playlist VALUES ('75b6b89a-d571-4d51-9f50-7c9119292ef4', 'Llamen a Dios', 'Si funciona', 'b26bd3e7-7134-4f58-816a-a487e5857c76');


--
-- TOC entry 3354 (class 0 OID 32938)
-- Dependencies: 216
-- Data for Name: song; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.song VALUES ('238c080d-1410-4baf-9a26-31e77b79b903', 'pojos telefono', 161);
INSERT INTO public.song VALUES ('5b2cfd47-e5c8-4795-8f78-00ed3cb903c3', 'salvaje crimson', 77);
INSERT INTO public.song VALUES ('3985df81-7771-41f3-811d-844c240e0955', 'los las', 120);
INSERT INTO public.song VALUES ('70bbe196-280d-41b6-a43a-f81aff6b1324', 'partido sexo', 69);
INSERT INTO public.song VALUES ('6d0faedf-4b29-48d8-9c77-a50ef1d6291b', 'amores arbol', 112);
INSERT INTO public.song VALUES ('36b752db-830e-43e9-a15a-a2b33a686e6c', 'pantalla java', 75);
INSERT INTO public.song VALUES ('6f7fa3cb-b4fe-47a1-adb6-267940b9315a', 'pojos telefono', 169);
INSERT INTO public.song VALUES ('b26cb268-3047-41fd-b424-520bae90d8ad', 'los las', 111);
INSERT INTO public.song VALUES ('77cb08c8-246e-44dd-9e43-9d66687bba95', 'corazon partida', 106);
INSERT INTO public.song VALUES ('7375b3f0-c2f9-4552-8c6e-f85c838b39a4', 'amor partido', 126);
INSERT INTO public.song VALUES ('ed58d153-d574-43b3-81bb-33037bf3a6f5', 'pojos telefono', 134);
INSERT INTO public.song VALUES ('3fb666d3-b12d-4f11-a09a-4f44ec836a82', 'java pojos', 161);
INSERT INTO public.song VALUES ('0e7d6207-779d-4f39-8bc9-fbd0404254f7', 'las amores', 104);
INSERT INTO public.song VALUES ('87dc2e06-01f9-4fd4-bac1-f5099cc3770b', 'el la', 99);
INSERT INTO public.song VALUES ('42db2d60-daf8-4b03-9872-3e26f59db25e', 'las amores', 138);
INSERT INTO public.song VALUES ('d8e89486-6d85-4c0d-937f-3c023d2561f6', 'java pojos', 90);
INSERT INTO public.song VALUES ('2654de61-4baa-4222-88d4-cd8a99d6d406', 'code pantalla', 114);
INSERT INTO public.song VALUES ('9738b25a-fe27-4069-8be0-33892b629b42', 'los las', 152);
INSERT INTO public.song VALUES ('e2bc0992-f79c-4674-863a-1f8badf1be3d', 'amores arbol', 140);
INSERT INTO public.song VALUES ('57b667c6-16b9-440a-b517-1b45aecc4154', 'salvaje crimson', 62);
INSERT INTO public.song VALUES ('ad2a3993-a563-4d6a-8b86-9558da12e7cf', 'code pantalla', 174);
INSERT INTO public.song VALUES ('4b063d36-7c99-4737-a6cd-6aaae13ee23c', 'pantalla java', 138);
INSERT INTO public.song VALUES ('7acfd9b4-1e2c-43c5-ae4c-6233d02b35dc', 'pantalla java', 162);
INSERT INTO public.song VALUES ('c15f6c63-90a4-41dd-8439-545e26c4ac7f', 'code pantalla', 176);
INSERT INTO public.song VALUES ('a24e6f2a-85d6-4ed3-96c5-3e52cd031a1d', 'telefono corazon', 171);
INSERT INTO public.song VALUES ('05fbeb0c-5e85-4904-b1aa-9a4f42866717', 'crimson code', 76);
INSERT INTO public.song VALUES ('03f0f086-ce06-4488-a22b-4fbd7282a5f5', 'java pojos', 72);
INSERT INTO public.song VALUES ('2a216afa-3668-4386-bc85-b68c59be7064', 'la los', 98);
INSERT INTO public.song VALUES ('f34eb304-af42-49a4-8b29-cffafcbc5597', 'corazon partida', 133);
INSERT INTO public.song VALUES ('9bda980a-813f-4a71-8c15-a7d935687c87', 'amores arbol', 124);
INSERT INTO public.song VALUES ('6d75c4d3-d31e-488c-a3e9-062f9266cbb6', 'pantalla java', 81);
INSERT INTO public.song VALUES ('03ad5103-ae02-43f9-9ae8-9b1d60e7571e', 'amores arbol', 61);
INSERT INTO public.song VALUES ('ed4f1e6d-42c5-4914-b68a-a34f0ab4ffbc', 'code pantalla', 139);
INSERT INTO public.song VALUES ('ac3d5378-faa6-42e1-a811-44f7d2ea0f5a', 'pojos telefono', 171);
INSERT INTO public.song VALUES ('d482dd45-d8e0-4ae2-89be-7ee50436fb1f', 'corazon partida', 144);
INSERT INTO public.song VALUES ('a21bfbbd-9259-4bc8-968b-dea73ea5afba', 'amores arbol', 130);
INSERT INTO public.song VALUES ('b677f645-97d0-4cdd-be7f-594f0aae1e0d', 'java pojos', 115);
INSERT INTO public.song VALUES ('a89dba9e-0f1d-448d-adec-4f231c06d9f5', 'la los', 72);
INSERT INTO public.song VALUES ('35332dd7-5a84-421c-b0fe-0002da997618', 'telefono corazon', 67);
INSERT INTO public.song VALUES ('b10cd128-7d0a-42e1-9080-ba4a02915aef', 'pojos telefono', 77);
INSERT INTO public.song VALUES ('e8d2e40c-8de5-44cb-8dee-a65b5e46328f', 'code pantalla', 96);
INSERT INTO public.song VALUES ('cc60efff-65e4-4a66-b24d-053b9ca1fd5a', 'corazon partida', 161);
INSERT INTO public.song VALUES ('907693cc-b9f8-4ec5-8e36-6ab434e9b79f', 'el la', 125);
INSERT INTO public.song VALUES ('f228a838-51b7-41b2-804a-685e7b3581b5', 'partida el', 178);
INSERT INTO public.song VALUES ('62da9273-1d39-410c-b72b-5dfcabb5de32', 'los las', 123);
INSERT INTO public.song VALUES ('06a39d7f-6c6d-463c-97d7-86b9573016f0', 'telefono corazon', 117);
INSERT INTO public.song VALUES ('b728d3c0-6369-4aad-a976-306c105e6e03', 'pojos telefono', 126);
INSERT INTO public.song VALUES ('2919204d-6255-42df-8a1e-27e32bea474f', 'las amores', 163);
INSERT INTO public.song VALUES ('857a5011-ae01-4a81-94cd-78f711e90448', 'amores arbol', 130);
INSERT INTO public.song VALUES ('b90e6580-7ef7-4e19-9946-b11b53de33ce', 'el la', 124);
INSERT INTO public.song VALUES ('ac27d3ae-bb72-4915-aa5c-139503298a27', 'pojos telefono', 122);
INSERT INTO public.song VALUES ('18c063f7-affa-4945-bb35-e76c615bede1', 'crimson code', 86);
INSERT INTO public.song VALUES ('54b6e035-47c9-49db-b755-e8ed266bd1c0', 'code pantalla', 129);
INSERT INTO public.song VALUES ('8a5e9350-4e22-4ec4-b75e-79bac47dea2f', 'pantalla java', 67);
INSERT INTO public.song VALUES ('2dd54b35-e326-4f45-8b89-06f5e4bc676f', 'las amores', 95);
INSERT INTO public.song VALUES ('59b38882-77ce-40dc-9de9-ba4ccf0b64ff', 'la los', 160);
INSERT INTO public.song VALUES ('5b649b1d-4756-445d-87e7-6144a7e4eb1e', 'code pantalla', 87);
INSERT INTO public.song VALUES ('56be07e3-7a92-4118-956c-d9072d33cfd2', 'los las', 89);
INSERT INTO public.song VALUES ('1d9384e9-b0f9-42dc-b3f2-4dd31abf544d', 'java pojos', 148);
INSERT INTO public.song VALUES ('d5a5d936-318e-4ba9-abca-63afe8873237', 'telefono corazon', 99);
INSERT INTO public.song VALUES ('7292cf3f-d5be-4f90-b2cb-a3f0707c8672', 'partida el', 69);
INSERT INTO public.song VALUES ('10777151-9a5d-43ba-8f9e-1721f1db2d9f', 'el la', 115);
INSERT INTO public.song VALUES ('32692220-ce80-4492-9efe-81938615dd46', 'corazon partida', 88);
INSERT INTO public.song VALUES ('2f65b03d-ae27-447c-827c-7fbfbfb587ac', 'partida el', 109);
INSERT INTO public.song VALUES ('378737a4-159a-4cf6-adaf-02892542620a', 'amor partido', 103);
INSERT INTO public.song VALUES ('2413b373-222c-4134-964a-83f7c46da52d', 'los las', 109);
INSERT INTO public.song VALUES ('7ba475bd-5633-4b6e-b44e-11f50cc71f48', 'amor partido', 167);
INSERT INTO public.song VALUES ('55173ac6-de27-4dff-83a4-ff3648b86e6c', 'pantalla java', 129);
INSERT INTO public.song VALUES ('008ad0d8-c8a9-4dc1-a74a-8e974c82569b', 'el la', 144);
INSERT INTO public.song VALUES ('c7aa1776-012f-4f1e-9fa2-1148efd30bd8', 'pantalla java', 146);
INSERT INTO public.song VALUES ('f091ebd1-6f01-4006-98dc-b7c70b8de215', 'corazon partida', 161);
INSERT INTO public.song VALUES ('a412240a-e339-4cc6-b798-7cc56ca0a645', 'arbol mesa', 129);
INSERT INTO public.song VALUES ('40a4ee01-c442-453f-aa1b-8006f22c9bab', 'crimson code', 105);
INSERT INTO public.song VALUES ('da437923-0e31-4bf2-8f05-d5c21a1b9213', 'code pantalla', 67);
INSERT INTO public.song VALUES ('ad44a38f-d9cd-48d4-99af-a025e19b8128', 'code pantalla', 114);
INSERT INTO public.song VALUES ('f54b5846-f7bc-431d-a081-1db89f23f70e', 'el la', 120);
INSERT INTO public.song VALUES ('f9906097-c99d-4d75-8a6c-967860d742ca', 'corazon partida', 142);
INSERT INTO public.song VALUES ('da3d5e36-2cfb-492a-a906-6e07352a7161', 'amores arbol', 157);
INSERT INTO public.song VALUES ('641977e0-11f2-4bda-8228-171845991d4b', 'partida el', 140);
INSERT INTO public.song VALUES ('07c163cd-ebe6-4274-8915-389d1bd38fd2', 'salvaje crimson', 173);
INSERT INTO public.song VALUES ('c6dbc0e0-6b48-4f8c-8b34-ea5f041e2676', 'corazon partida', 93);
INSERT INTO public.song VALUES ('574685bb-a275-4c02-8e45-fee2db97fb5d', 'partido sexo', 98);
INSERT INTO public.song VALUES ('c2c13d92-d16f-4d8e-94dc-ed4a30fca19f', 'las amores', 104);
INSERT INTO public.song VALUES ('616b8fa2-e6f4-4148-b607-413c9bd9b40c', 'java pojos', 173);
INSERT INTO public.song VALUES ('1afc0d62-8b61-48d7-8845-2182eca64336', 'los las', 173);
INSERT INTO public.song VALUES ('2193f7bb-1918-4d75-b992-b44858bb4787', 'la los', 142);
INSERT INTO public.song VALUES ('a307aba0-6cc7-4da8-9ade-223769e2a063', 'java pojos', 81);
INSERT INTO public.song VALUES ('205936ab-ec26-4e85-b7fb-27c0cb74c214', 'las amores', 115);
INSERT INTO public.song VALUES ('61d49042-1806-47d4-a20c-4cb9c7f4e3be', 'crimson code', 76);
INSERT INTO public.song VALUES ('0ec79349-c9ad-495a-a991-dd6aa640828d', 'partida el', 144);
INSERT INTO public.song VALUES ('528d2dc0-4a35-43af-8a96-a23b1b6aa281', 'telefono corazon', 103);
INSERT INTO public.song VALUES ('bb00549b-33f2-4ec8-b56f-9fee5cf68bbe', 'partida el', 146);
INSERT INTO public.song VALUES ('849ed8a0-babb-4b9e-b792-edb0774d5813', 'salvaje crimson', 166);
INSERT INTO public.song VALUES ('90fede1b-bbd0-4213-ad16-0ba7a7a36e88', 'crimson code', 88);
INSERT INTO public.song VALUES ('93f1dcd1-b76f-4126-92bb-7b83e0980fa3', 'la los', 127);
INSERT INTO public.song VALUES ('5e1795db-561d-48fa-8165-9fbb1ec75b5a', 'la los', 140);
INSERT INTO public.song VALUES ('fd1cb28e-4c85-4f55-97fd-924bcfdfe4e9', 'la los', 85);
INSERT INTO public.song VALUES ('c6057de1-3c85-4ba1-8d8b-e457abc91bf1', 'la los', 148);
INSERT INTO public.song VALUES ('b6973b1d-c9c1-4ee3-9c1f-65075482d814', 'corazon partida', 60);
INSERT INTO public.song VALUES ('4197c253-bb07-4b23-9cac-6d51651833a3', 'sexo salvaje', 150);


--
-- TOC entry 3356 (class 0 OID 32959)
-- Dependencies: 218
-- Data for Name: songxplaylist; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.songxplaylist VALUES ('4f9a6a4d-fdad-4cc2-9380-b489efc013fc', '5b2cfd47-e5c8-4795-8f78-00ed3cb903c3', '1df67c76-0071-4480-98f3-139e40335850', '2023-05-29');
INSERT INTO public.songxplaylist VALUES ('5260432d-ebc0-4c1a-99c3-f62d65efc9f9', '36b752db-830e-43e9-a15a-a2b33a686e6c', '15ee45d0-f9af-453d-b7e5-1ca27b12d293', '2023-05-29');
INSERT INTO public.songxplaylist VALUES ('a16109a6-edb9-485f-87d3-d54145dae1b5', '1d9384e9-b0f9-42dc-b3f2-4dd31abf544d', '096af6cf-3803-4e38-9298-314dd7da7312', '2023-05-29');
INSERT INTO public.songxplaylist VALUES ('102f152d-547d-41a7-8abd-ef781bdc4a14', '2a216afa-3668-4386-bc85-b68c59be7064', '0b9cabfc-3a65-4f22-b602-6c57677dd7cf', '2023-05-29');
INSERT INTO public.songxplaylist VALUES ('a425b53a-bfbf-4767-aaae-a3f85fbf9e44', '2193f7bb-1918-4d75-b992-b44858bb4787', '13deecfa-9b3e-4a6f-a929-b405cacbeb65', '2023-05-29');
INSERT INTO public.songxplaylist VALUES ('b62d8d6f-cb6d-4441-ba27-04da483c96e3', '4197c253-bb07-4b23-9cac-6d51651833a3', '386dacba-209f-45a2-9ff0-b95229f7c251', '2023-05-29');
INSERT INTO public.songxplaylist VALUES ('69ccea5b-a59d-4cab-a5c7-ffa88246dc8e', '2dd54b35-e326-4f45-8b89-06f5e4bc676f', '13deecfa-9b3e-4a6f-a929-b405cacbeb65', '2023-05-29');
INSERT INTO public.songxplaylist VALUES ('4da36556-2926-41c5-b4fc-a37e1a7de4c2', '3985df81-7771-41f3-811d-844c240e0955', '26df7f80-85a4-4cd2-a15b-f8187947b3e0', '2023-05-29');
INSERT INTO public.songxplaylist VALUES ('8e41ba58-e1bb-48b2-b275-e6826b9c7d4a', '008ad0d8-c8a9-4dc1-a74a-8e974c82569b', '386dacba-209f-45a2-9ff0-b95229f7c251', '2023-05-29');
INSERT INTO public.songxplaylist VALUES ('d0eb5aca-7e5f-4173-8b24-747821e212ea', '5b649b1d-4756-445d-87e7-6144a7e4eb1e', '1df67c76-0071-4480-98f3-139e40335850', '2023-05-29');
INSERT INTO public.songxplaylist VALUES ('6cff4ff1-e420-4971-855d-54565459053a', '4b063d36-7c99-4737-a6cd-6aaae13ee23c', '386dacba-209f-45a2-9ff0-b95229f7c251', '2023-05-29');
INSERT INTO public.songxplaylist VALUES ('15b26c0e-3ac3-465b-9215-a7e70fc87483', '4197c253-bb07-4b23-9cac-6d51651833a3', '13deecfa-9b3e-4a6f-a929-b405cacbeb65', '2023-05-29');
INSERT INTO public.songxplaylist VALUES ('e089c41b-2d5c-423f-b06c-293321043265', '3985df81-7771-41f3-811d-844c240e0955', '0b9cabfc-3a65-4f22-b602-6c57677dd7cf', '2023-05-29');
INSERT INTO public.songxplaylist VALUES ('c786ac6b-b726-4981-85e1-b906c0ac7e78', '54b6e035-47c9-49db-b755-e8ed266bd1c0', '0b9cabfc-3a65-4f22-b602-6c57677dd7cf', '2023-05-29');
INSERT INTO public.songxplaylist VALUES ('e0e6b44d-8ebc-4f35-9d9c-16c4aea49e0a', '36b752db-830e-43e9-a15a-a2b33a686e6c', '13deecfa-9b3e-4a6f-a929-b405cacbeb65', '2023-05-29');
INSERT INTO public.songxplaylist VALUES ('6fb9dc60-9479-4c9d-9b23-1bc1b32ac141', '06a39d7f-6c6d-463c-97d7-86b9573016f0', '20b0c1c3-fdfe-4277-865f-23c8f8c2c119', '2023-05-29');
INSERT INTO public.songxplaylist VALUES ('4a81830e-d8fe-48ad-9e2e-2af6587a93d4', '03ad5103-ae02-43f9-9ae8-9b1d60e7571e', '0d71053e-7ddf-4aca-a4b0-bb8f09a764a1', '2023-05-29');
INSERT INTO public.songxplaylist VALUES ('b574b29c-5bd7-4408-ba33-b8966cc6820e', '32692220-ce80-4492-9efe-81938615dd46', '386dacba-209f-45a2-9ff0-b95229f7c251', '2023-05-29');
INSERT INTO public.songxplaylist VALUES ('a0cb008a-2346-42fd-b1e5-181951ccd26c', '2dd54b35-e326-4f45-8b89-06f5e4bc676f', '20b0c1c3-fdfe-4277-865f-23c8f8c2c119', '2023-05-29');
INSERT INTO public.songxplaylist VALUES ('4626087e-8603-4a92-8db6-64f4a1ba7d8a', '54b6e035-47c9-49db-b755-e8ed266bd1c0', '1df67c76-0071-4480-98f3-139e40335850', '2023-05-29');
INSERT INTO public.songxplaylist VALUES ('13371fb3-23f4-429b-8a3d-0bb3957340aa', '40a4ee01-c442-453f-aa1b-8006f22c9bab', '13deecfa-9b3e-4a6f-a929-b405cacbeb65', '2023-05-29');
INSERT INTO public.songxplaylist VALUES ('404c92bc-4c31-461c-b6ea-d10a25533b97', '574685bb-a275-4c02-8e45-fee2db97fb5d', '386dacba-209f-45a2-9ff0-b95229f7c251', '2023-05-29');
INSERT INTO public.songxplaylist VALUES ('a1944082-0c01-40d6-ac77-ecc6c331439f', '06a39d7f-6c6d-463c-97d7-86b9573016f0', '386dacba-209f-45a2-9ff0-b95229f7c251', '2023-05-29');
INSERT INTO public.songxplaylist VALUES ('cd28aa59-40ee-432a-b761-dab217ad605e', '32692220-ce80-4492-9efe-81938615dd46', '15ee45d0-f9af-453d-b7e5-1ca27b12d293', '2023-05-29');
INSERT INTO public.songxplaylist VALUES ('fabc65ff-b806-4411-b268-5746d2c43bad', '3fb666d3-b12d-4f11-a09a-4f44ec836a82', '1df67c76-0071-4480-98f3-139e40335850', '2023-05-29');
INSERT INTO public.songxplaylist VALUES ('64ba618a-41c2-4202-94d6-442877c69770', '0ec79349-c9ad-495a-a991-dd6aa640828d', '15ee45d0-f9af-453d-b7e5-1ca27b12d293', '2023-05-29');
INSERT INTO public.songxplaylist VALUES ('629b5ca7-fc19-4eb2-8ca3-15e15c6c9d4e', '07c163cd-ebe6-4274-8915-389d1bd38fd2', '15ee45d0-f9af-453d-b7e5-1ca27b12d293', '2023-05-29');
INSERT INTO public.songxplaylist VALUES ('3e47335d-f2ba-4f89-8e2a-9f7657db751d', '32692220-ce80-4492-9efe-81938615dd46', '26df7f80-85a4-4cd2-a15b-f8187947b3e0', '2023-05-29');
INSERT INTO public.songxplaylist VALUES ('fcb8f2bb-4c18-4021-865b-35e1ea31828d', '35332dd7-5a84-421c-b0fe-0002da997618', '096af6cf-3803-4e38-9298-314dd7da7312', '2023-05-29');
INSERT INTO public.songxplaylist VALUES ('27028648-c2e7-4800-93f2-441476230933', '36b752db-830e-43e9-a15a-a2b33a686e6c', '13deecfa-9b3e-4a6f-a929-b405cacbeb65', '2023-05-29');
INSERT INTO public.songxplaylist VALUES ('e4a45514-1c82-49b4-9bfa-0631b757439d', '5e1795db-561d-48fa-8165-9fbb1ec75b5a', '13deecfa-9b3e-4a6f-a929-b405cacbeb65', '2023-05-29');
INSERT INTO public.songxplaylist VALUES ('50fecf39-c60c-4bbe-b37d-8a20fe0ab623', '03ad5103-ae02-43f9-9ae8-9b1d60e7571e', '15ee45d0-f9af-453d-b7e5-1ca27b12d293', '2023-05-29');
INSERT INTO public.songxplaylist VALUES ('e6a81254-421b-4012-aaae-f4102feaca93', '205936ab-ec26-4e85-b7fb-27c0cb74c214', '13deecfa-9b3e-4a6f-a929-b405cacbeb65', '2023-05-29');
INSERT INTO public.songxplaylist VALUES ('311e09ba-faac-40f2-bf86-522ecbcf02e7', '03ad5103-ae02-43f9-9ae8-9b1d60e7571e', '15ee45d0-f9af-453d-b7e5-1ca27b12d293', '2023-05-29');
INSERT INTO public.songxplaylist VALUES ('fb1371d3-787e-4bbf-a29d-a05be9d9f4b6', '205936ab-ec26-4e85-b7fb-27c0cb74c214', '26df7f80-85a4-4cd2-a15b-f8187947b3e0', '2023-05-29');
INSERT INTO public.songxplaylist VALUES ('47ae28f8-9374-4734-aac3-0cc84507377c', '03ad5103-ae02-43f9-9ae8-9b1d60e7571e', '096af6cf-3803-4e38-9298-314dd7da7312', '2023-05-29');
INSERT INTO public.songxplaylist VALUES ('e637597b-d9d9-4664-823d-f1eb4506a369', '3985df81-7771-41f3-811d-844c240e0955', '26df7f80-85a4-4cd2-a15b-f8187947b3e0', '2023-05-29');
INSERT INTO public.songxplaylist VALUES ('16ddbd37-30b3-45ee-8cb4-1db128ec6ef6', '57b667c6-16b9-440a-b517-1b45aecc4154', '386dacba-209f-45a2-9ff0-b95229f7c251', '2023-05-29');
INSERT INTO public.songxplaylist VALUES ('c68cecc5-4b2e-4445-a0f8-fabbb3381ee2', '56be07e3-7a92-4118-956c-d9072d33cfd2', '28ed55f9-bcca-4748-8a1b-54d5b4990712', '2023-05-29');
INSERT INTO public.songxplaylist VALUES ('4859bedc-769c-4037-be5d-0a58bdae1d4f', '3fb666d3-b12d-4f11-a09a-4f44ec836a82', '26df7f80-85a4-4cd2-a15b-f8187947b3e0', '2023-05-29');
INSERT INTO public.songxplaylist VALUES ('7e175724-b8ff-41e9-af99-b507668fd0a5', '4b063d36-7c99-4737-a6cd-6aaae13ee23c', '15ee45d0-f9af-453d-b7e5-1ca27b12d293', '2023-05-29');
INSERT INTO public.songxplaylist VALUES ('c0f3136e-d78a-4e70-ba0c-a7340dba1532', '57b667c6-16b9-440a-b517-1b45aecc4154', '28ed55f9-bcca-4748-8a1b-54d5b4990712', '2023-05-29');
INSERT INTO public.songxplaylist VALUES ('a12d8b79-c522-43dc-9af8-6074e6d29ce3', '55173ac6-de27-4dff-83a4-ff3648b86e6c', '26df7f80-85a4-4cd2-a15b-f8187947b3e0', '2023-05-29');
INSERT INTO public.songxplaylist VALUES ('0e809799-e977-43ce-9ade-04b1a7239df1', '36b752db-830e-43e9-a15a-a2b33a686e6c', '13deecfa-9b3e-4a6f-a929-b405cacbeb65', '2023-05-29');
INSERT INTO public.songxplaylist VALUES ('50df8f9b-f281-4320-8c25-2e9a4b9f7805', '18c063f7-affa-4945-bb35-e76c615bede1', '15ee45d0-f9af-453d-b7e5-1ca27b12d293', '2023-05-29');
INSERT INTO public.songxplaylist VALUES ('05088e65-c34c-4841-a25b-803eb0903482', '238c080d-1410-4baf-9a26-31e77b79b903', '20b0c1c3-fdfe-4277-865f-23c8f8c2c119', '2023-05-29');
INSERT INTO public.songxplaylist VALUES ('d1a58f78-e6c2-4e4c-85fe-be637246cde8', '5b649b1d-4756-445d-87e7-6144a7e4eb1e', '13deecfa-9b3e-4a6f-a929-b405cacbeb65', '2023-05-29');
INSERT INTO public.songxplaylist VALUES ('9ae17c77-c051-4978-a19d-ff7a4542d7bf', '07c163cd-ebe6-4274-8915-389d1bd38fd2', '26df7f80-85a4-4cd2-a15b-f8187947b3e0', '2023-05-29');
INSERT INTO public.songxplaylist VALUES ('47379123-8beb-4eaa-b526-5231f7e32d4e', '205936ab-ec26-4e85-b7fb-27c0cb74c214', '096af6cf-3803-4e38-9298-314dd7da7312', '2023-05-29');
INSERT INTO public.songxplaylist VALUES ('b22e50a1-fc73-4031-aa4d-7b2b394ac486', '62da9273-1d39-410c-b72b-5dfcabb5de32', '0b9cabfc-3a65-4f22-b602-6c57677dd7cf', '2023-05-29');


--
-- TOC entry 3353 (class 0 OID 32864)
-- Dependencies: 215
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users VALUES ('a2f2203b-2324-43e3-a879-bcb13854b131', 'asdasd', 'asdasd', '"asdasd"');
INSERT INTO public.users VALUES ('b26bd3e7-7134-4f58-816a-a487e5857c76', 'Kermit Alvarez', 'pellentesque.a@aol.org', 'FHP63ZMR6YG');
INSERT INTO public.users VALUES ('4d2193e7-3b1d-4455-a160-e067f7245538', 'Ezekiel Allison', 'ut.molestie@yahoo.com', 'QKS13NPR4HP');
INSERT INTO public.users VALUES ('5d6ae485-d552-4e4f-bce0-69ee75b424c9', 'Jordan Maddox', 'duis@outlook.com', 'BIF37SMP5SL');
INSERT INTO public.users VALUES ('19850f9c-68fe-424d-a6dc-94a627d3b7a3', 'Axel Malone', 'lectus.a.sollicitudin@hotmail.com', 'IOV62JLI5DO');
INSERT INTO public.users VALUES ('c4ff8ff3-3c73-435b-822c-d2d33d949f36', 'Clinton Fox', 'natoque.penatibus@google.couk', 'JIT65NZT1NG');
INSERT INTO public.users VALUES ('0da2c928-7b98-4d10-a753-70cf582310f8', 'Ursa Clemons', 'urna@icloud.net', 'ABX91USH6DT');
INSERT INTO public.users VALUES ('b2686ee8-1505-4364-94d3-bdefd82d42d2', 'Doris Newman', 'donec.est@google.couk', 'LWV00GDX4NB');
INSERT INTO public.users VALUES ('b554160e-07e8-464f-857d-c453d4348f43', 'Carol Mclean', 'morbi.sit.amet@protonmail.org', 'IFM18WIP7RT');
INSERT INTO public.users VALUES ('d8c468e6-60fc-4c94-81f4-6cf755da0c38', 'Kiara Vincent', 'ipsum.primis.in@protonmail.com', 'ARD58SBB7NF');
INSERT INTO public.users VALUES ('b16bc02d-f1f2-43c4-88ec-69da698d5376', 'Zane Mooney', 'ornare.fusce@icloud.ca', 'SQN71HPD8XC');


--
-- TOC entry 3205 (class 2606 OID 32953)
-- Name: playlist Playlist_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.playlist
    ADD CONSTRAINT "Playlist_pkey" PRIMARY KEY (code);


--
-- TOC entry 3203 (class 2606 OID 32945)
-- Name: song Song_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.song
    ADD CONSTRAINT "Song_pkey" PRIMARY KEY (code);


--
-- TOC entry 3207 (class 2606 OID 32965)
-- Name: songxplaylist SongxPlaylist_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.songxplaylist
    ADD CONSTRAINT "SongxPlaylist_pkey" PRIMARY KEY (code);


--
-- TOC entry 3201 (class 2606 OID 32871)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (code);


--
-- TOC entry 3208 (class 2606 OID 32954)
-- Name: playlist Playlist_user_code_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.playlist
    ADD CONSTRAINT "Playlist_user_code_fkey" FOREIGN KEY (user_code) REFERENCES public.users(code) NOT VALID;


--
-- TOC entry 3209 (class 2606 OID 32971)
-- Name: songxplaylist SongxPlaylist_playlist_code_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.songxplaylist
    ADD CONSTRAINT "SongxPlaylist_playlist_code_fkey" FOREIGN KEY (playlist_code) REFERENCES public.playlist(code);


--
-- TOC entry 3210 (class 2606 OID 32966)
-- Name: songxplaylist SongxPlaylist_song_code_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.songxplaylist
    ADD CONSTRAINT "SongxPlaylist_song_code_fkey" FOREIGN KEY (song_code) REFERENCES public.song(code);


-- Completed on 2023-05-29 22:25:52

--
-- PostgreSQL database dump complete
--

