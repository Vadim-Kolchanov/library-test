package ru.itresource.library.core.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Table;

@Getter
@Setter
@Entity
@Table(schema = "library", name = "author")
public class Author extends AbstractEntity {
}
