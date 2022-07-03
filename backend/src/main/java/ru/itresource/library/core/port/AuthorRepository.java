package ru.itresource.library.core.port;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ru.itresource.library.core.entities.Author;

@Repository
public interface AuthorRepository extends CrudRepository<Author, Long> {
}
