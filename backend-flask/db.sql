drop table if exists Users cascade;
drop table if exists Tasks cascade;


create table if not exists Users(
    u_id integer,
    first_name varchar(50),
    last_name varchar(50),
    email varchar(100),
    hash_password varchar(50),
    tokens text[],
    perm_type integer,
    time_registered  date,
    primary key (u_id)
);

create table if not exists Tasks(
    task_id integer,
    user_id integer,
    task varchar(100),
    hours_taken float,
    date_completed date,
    primary key(task_id),
    foreign key (user_id) references Users(u_id)
);