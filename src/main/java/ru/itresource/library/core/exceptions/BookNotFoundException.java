package ru.itresource.library.core.exceptions;

public class BookNotFoundException extends Throwable {

    public BookNotFoundException(Long id) {
        super(String.format("Книга с идентификатором %d не найдена!", id));
    }
}
