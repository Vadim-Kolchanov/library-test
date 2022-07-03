package ru.itresource.library.core;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.itresource.library.core.entities.Book;
import ru.itresource.library.core.exceptions.BookNotFoundException;
import ru.itresource.library.core.port.BookRepository;

import java.util.List;

@Service
@AllArgsConstructor
public class BookService {

    private final BookRepository bookRepository;

    public Book bookById(Long id) throws BookNotFoundException {
        return this.bookRepository
                .findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new BookNotFoundException(id));
    }

    public List<Book> allBooksByCatalogId(Long catalogId, Pageable pageable) {
        return this.bookRepository
                .findAllByCatalogIdAndIsDeletedFalse(catalogId, pageable)
                .getContent();
    }

    public Book saveBook(Book book) {
        return this.bookRepository.save(book);
    }

    @Transactional
    public void deleteBookById(Long id) {
        this.bookRepository.softDeleteById(id);
    }

    public void forceDeleteBookById(Long id) {
        this.bookRepository.deleteById(id);
    }

    @Transactional
    public void changeCatalogByBookId(Long bookId, Long catalogId) {
        this.bookRepository.changeCatalogByBookId(bookId, catalogId);
    }
}
