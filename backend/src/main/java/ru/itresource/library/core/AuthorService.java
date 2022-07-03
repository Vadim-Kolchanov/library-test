package ru.itresource.library.core;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import ru.itresource.library.core.entities.Author;
import ru.itresource.library.core.port.AuthorRepository;
import ru.itresource.utils.IterableUtil;

import java.util.List;

@Service
@AllArgsConstructor
public class AuthorService {

    private final AuthorRepository authorRepository;

    public List<Author> authors() {
        return IterableUtil.iterableToList(this.authorRepository.findAll());
    }

    public Author saveAuthor(Author author) {
        return this.authorRepository.save(author);
    }
}
