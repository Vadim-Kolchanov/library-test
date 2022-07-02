package ru.itresource.library.core;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import ru.itresource.library.core.entities.Author;
import ru.itresource.library.core.port.AuthorRepository;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

/**
 * Тестирование сервиса при помощи Mock репозитория
 */
@ExtendWith(MockitoExtension.class)
public class AuthorServiceMockTest {

    public static final int AUTHORS_COUNT = 2;

    @Mock
    private AuthorRepository authorRepository;

    @InjectMocks
    private AuthorService authorService;

    @Test
    public void authorsTest() {
        when(authorRepository.findAll()).thenReturn(this.createdAuthors());

        List<Author> authors = authorService.authors();

        assertEquals(AUTHORS_COUNT, authors.size());
        assertTrue(authors.contains(this.createdAuthorDefault()));
    }

    @Test
    public void saveAuthorTest() {
        Author author = this.createdAuthorDefault();

        when(authorRepository.save(any(Author.class))).thenReturn(author);

        assertEquals(author, authorService.saveAuthor(this.createdAuthorDefault()));
    }

    private Author createdAuthorDefault() {
        return this.createdAuthor(1L, "Test1");
    }

    private Iterable<Author> createdAuthors() {
        return List.of(
                this.createdAuthorDefault(),
                this.createdAuthor(2L, "Test2")
        );
    }

    private Author createdAuthor(Long id, String name) {
        Author author = new Author();

        author.setId(id);
        author.setName(name);

        return author;
    }
}