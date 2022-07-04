package ru.itresource.library.core.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;
import java.util.Objects;

@Getter
@Setter
@Entity
@Table(schema = "library", name = "book")
public class Book extends AbstractEntity {

    @Column(name = "release_date")
    private Date releaseDate;

    @Column(name = "is_deleted")
    private Boolean isDeleted;

    @ManyToOne
    @JoinColumn(name = "author_id")
    private Author author;

    @ManyToOne
    @JoinColumn(name = "catalog_id")
    private Catalog catalog;

    public void validateBook() {
        if (Objects.isNull(catalog) || this.catalog.isZeroId()) {
            throw new IllegalArgumentException(String.format("Для книги '%s' не указан каталог", this.getName()));
        }
    }

    public boolean isNewAuthor() {
        return this.author.isZeroId();
    }

    /**
     * Метод-конструктор помогающий не забыть поля, которые надо засетить.
     * Потому что JPA не даст создать полноценный конструктор
     */
    public static Book createBook(String name, Date releaseDate, Boolean isDeleted, Author author, Catalog catalog) {
        Book book = new Book();

        book.setName(name);
        book.setReleaseDate(releaseDate);
        book.setIsDeleted(isDeleted);
        book.setAuthor(author);
        book.setCatalog(catalog);

        return book;
    }
}
