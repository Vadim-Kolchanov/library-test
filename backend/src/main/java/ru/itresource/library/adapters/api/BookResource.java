package ru.itresource.library.adapters.api;

import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;
import ru.itresource.library.core.BookService;
import ru.itresource.library.core.entities.Book;

import java.util.List;

@RestController
@RequestMapping("/api/book")
@AllArgsConstructor
public class BookResource {

    public static final String DEFAULT_PAGE = "0";
    public static final String DEFAULT_LIMIT = "25";

    private final BookService bookService;

    @PostMapping("/save")
    @ApiOperation(value = "Сохраняет или обновляет книгу")
    public Book saveBook(@RequestBody Book book) {
        book.validateBook();

        return this.bookService.saveBook(book);
    }

    @GetMapping("/all-by-catalog-{catalogId}")
    @ApiOperation(value = "Возвращает книги по указанному каталогу")
    public Page<Book> allBooksByCatalogId(
            @PathVariable Long catalogId,
            @RequestParam(defaultValue = DEFAULT_PAGE) int page,
            @RequestParam(defaultValue = DEFAULT_LIMIT) int limit
    ) {
        return this.bookService.allBooksByCatalogId(catalogId, PageRequest.of(page, limit));
    }

    @GetMapping("/delete/{id}")
    @ApiOperation(value = "Удаляет книгу")
    public void deleteBookById(@PathVariable Long id) {
        this.bookService.deleteBookById(id);
    }

    @GetMapping("/force-delete/{id}")
    @ApiOperation(value = "Навсегда удаляет книгу из БД")
    public void forceDeleteBookById(@PathVariable Long id) {
        this.bookService.forceDeleteBookById(id);
    }

    @GetMapping("/change-catalog")
    @ApiOperation(value = "Перемещает книгу в указанный каталог")
    public void changeCatalogByBookId(@RequestParam Long bookId, @RequestParam Long catalogId) {
        this.bookService.changeCatalogByBookId(bookId, catalogId);
    }
}
