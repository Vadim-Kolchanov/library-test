package ru.itresource.library.core;

import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import ru.itresource.ItResourceApplication;
import ru.itresource.library.core.entities.Author;
import ru.itresource.library.core.entities.Book;
import ru.itresource.library.core.entities.Catalog;
import ru.itresource.library.core.entities.enums.CatalogPath;
import ru.itresource.library.core.exceptions.BookNotFoundException;

import java.util.Date;
import java.util.List;
import java.util.Objects;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Интеграционный тест для проверки выполнения операций над книгами
 * (Требуется подключение к БД)
 */
@SpringBootTest(classes = ItResourceApplication.class)
@TestMethodOrder(MethodOrderer.MethodName.class)
public class BookServiceIntegrationTest {

    private static final long DEFAULT_BOOK_ID = -1L;
    private static final long UNKNOWN_AUTHOR_ID = -1L;
    private static final String NAME_BOOK = "Тестовая Книга";

    private static Long bookId = DEFAULT_BOOK_ID;

    @Autowired
    private BookService bookService;

    @Test
    void test1_saveBook() {
        Book book = this.bookService.saveBook(this.createdBook());
        bookId = book.getId();

        assertNotEquals(DEFAULT_BOOK_ID, (long) bookId);
    }

    @Test
    void test2_bookById() throws BookNotFoundException {
        Book book = this.bookService.bookById(bookId);

        assertTrue(Objects.nonNull(book));
        assertEquals(NAME_BOOK, book.getName());
    }

    @Test
    void test3_allBooksByCatalogId() {
        List<Book> books = this.bookService.allBooksByCatalogId(CatalogPath.PUBLIC.id, this.pageable());

        assertFalse(books.isEmpty());
        assertTrue(this.isAllBooksInPublicCatalog(books));
    }

    @Test
    void test4_changeCatalogByBookId() throws BookNotFoundException {
        // Проверяем, что книга находится в публичном каталоге
        this.assertEqualsByCatalogId(CatalogPath.PUBLIC.id);

        // Меняем каталог книги на закрытый
        this.bookService.changeCatalogByBookId(bookId, CatalogPath.PRIVATE.id);

        // Проверяем, что книга стала находится в закрытом каталоге
        this.assertEqualsByCatalogId(CatalogPath.PRIVATE.id);
    }

    @Test
    void test5_deleteBookById() throws BookNotFoundException {
        // Проверяем, что книга не удалена
        assertFalse(this.bookService.bookById(bookId).getIsDeleted());

        // Удаляем книгу
        this.bookService.deleteBookById(bookId);

        // Ождиаем, что книга не будет найдена
        assertThrows(BookNotFoundException.class, () -> {
            this.bookService.bookById(bookId);
        });
    }

    @Test
    void test6_forceDeleteBookById() {
        this.bookService.forceDeleteBookById(bookId);
    }

    private Book createdBook() {
        return Book.createBook(
                NAME_BOOK,
                new Date(),
                false,
                this.author(),
                this.publicCatalog()
        );
    }

    private Author author() {
        Author author = new Author();
        author.setId(UNKNOWN_AUTHOR_ID);

        return author;
    }

    private Catalog publicCatalog() {
        Catalog catalog = new Catalog();
        catalog.setId(CatalogPath.PUBLIC.id);

        return catalog;
    }

    private Pageable pageable() {
        return PageRequest.of(0, 1);
    }

    private void assertEqualsByCatalogId(Long catalogId) throws BookNotFoundException {
        assertEquals(
                catalogId,
                this.bookService.bookById(bookId).getCatalog().getId()
        );
    }

    private boolean isAllBooksInPublicCatalog(List<Book> books) {
        return books.stream().allMatch(it -> it.getCatalog().getId() == CatalogPath.PUBLIC.id);
    }
}