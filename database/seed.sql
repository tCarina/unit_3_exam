DROP DATABASE IF EXISTS unit_3_exam;
CREATE DATABASE unit_3_exam;

\c unit_3_exam;

CREATE TABLE researchers (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  job_title VARCHAR NOT NULL
);

CREATE TABLE species (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  is_mammal BOOLEAN NOT NULL
);

CREATE TABLE animals (
  id SERIAL PRIMARY KEY,
  species_id INT REFERENCES species(id),
  nickname VARCHAR NOT NULL
);

CREATE TABLE habitats (
  id SERIAL PRIMARY KEY,
  catergory VARCHAR NOT NULL
);

CREATE TABLE taggings (
  id SERIAL PRIMARY KEY,
  animal_id INT REFERENCES animals(id) ON DELETE CASCADE,
  researcher_id INT REFERENCES researchers(id) ON DELETE SET NULL
);

CREATE TABLE sightings (
  id SERIAL PRIMARY KEY,
  researcher_id INT REFERENCES researchers(id) ON DELETE SET NULL,
  species_id INT REFERENCES species(id) ON DELETE CASCADE,
  habitat_id INT REFERENCES habitats(id)
);

INSERT INTO researchers(name, job_title) VALUES ('Marian Aleta', 'Project Lead'), ('Javed Patrick', 'Senior Field Researcher'), ('Carolina Itai', 'Field Researcher'), ('Jazmyn Gottfried', 'Field Researcher'), ('Ezra Flip', 'Research Intern');

INSERT INTO species(name, is_mammal) VALUES ('Dolphin', TRUE), ('Moray Eel', FALSE), ('Tiger Shark', FALSE), ('Orca Whale', TRUE), ('Moon Jelly', FALSE);

INSERT INTO animals(species_id, nickname) VALUES (1, 'Flip'), (1, 'Skip'), (2, 'Jenkins'), (3, 'Sally'), (5, 'Flapjack'), (5, 'Gibbous'), (5, 'Nox');

INSERT INTO habitats(catergory) VALUES ('Shallows'), ('Coral Reef'), ('Tide Pools'), ('Deeps');

INSERT INTO taggings(animal_id, researcher_id) VALUES (1, 4), (2, 3), (3, 1), (4, 2), (5, 4), (6, 4), (7, 2);

INSERT INTO sightings(researcher_id, species_id, habitat_id) VALUES (4, 4, 4), (1, 3, 4), (3, 5, 3), (5, 2, 2), (2, 1, 1), (5, 2, 1);
