package ru.itresource.library.core;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.itresource.library.core.entities.Book;
import ru.itresource.library.core.exceptions.BookNotFoundException;
import ru.itresource.library.core.port.BookRepository;

@Service
@AllArgsConstructor
public class BookService {

    private final AuthorService authorService;
    private final BookRepository bookRepository;

    public Book bookById(Long id) throws BookNotFoundException {
        return this.bookRepository
                .findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new BookNotFoundException(id));
    }

    public Page<Book> allBooksByCatalogId(Long catalogId, Pageable pageable) {
        return this.bookRepository.findAllByCatalogIdAndIsDeletedFalse(catalogId, pageable);
    }

    public Book saveBook(Book book) {
        if (book.isNewAuthor()) {
            book.setAuthor(this.authorService.createAuthor(book.getAuthor().getName()));
        }

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
