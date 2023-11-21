
ALTER TABLE public.song
ADD COLUMN url character varying;

ALTER TABLE public.song
ADD COLUMN album_cover character varying;

ALTER TABLE public.song
ADD COLUMN artist character varying;

ALTER TABLE public.users
ADD COLUMN image character varying;
COMMIT;
