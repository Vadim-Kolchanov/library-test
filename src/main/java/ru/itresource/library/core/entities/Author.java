package ru.itresource.library.core.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Getter
@Setter
@Entity
@Table(schema = "library", name = "author")
public class Author extends AbstractEntity {

    @Column(name = "name")
    private String name;
}
