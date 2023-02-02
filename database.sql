
        
CREATE TABLE event
(
  id      INT         NOT NULL,
  id_type INT         NOT NULL,
  name    VARCHAR(15) NOT NULL,
  date    DATETIME    NOT NULL,
  price   FLOAT       NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE event_type
(
  id   INT         NOT NULL,
  type VARCHAR(15) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE login
(
  id       VARCHAR(36) NOT NULL,
  name     VARCHAR(15) NOT NULL,
  email    VARCHAR(20) NOT NULL,
  password VARCHAR(16) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE order
(
  id       INT         NOT NULL,
  id_login VARCHAR(36) NOT NULL,
  id_event INT         NOT NULL,
  amount   INT         NOT NULL,
  payment  VARCHAR(10) NOT NULL,
  PRIMARY KEY (id)
);

ALTER TABLE event
  ADD CONSTRAINT FK_event_type_TO_event
    FOREIGN KEY (id_type)
    REFERENCES event_type (id);

ALTER TABLE order
  ADD CONSTRAINT FK_login_TO_order
    FOREIGN KEY (id_login)
    REFERENCES login (id);

ALTER TABLE order
  ADD CONSTRAINT FK_event_TO_order
    FOREIGN KEY (id_event)
    REFERENCES event (id);


        
      