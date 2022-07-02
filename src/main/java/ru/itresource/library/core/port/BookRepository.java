package ru.itresource.library.core.port;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.itresource.library.core.entities.Book;

import java.util.Optional;

@Repository
public interface BookRepository extends PagingAndSortingRepository<Book, Long> {

    Optional<Book> findByIdAndIsDeletedFalse(Long id);

    Page<Book> findAllByCatalogIdAndIsDeletedFalse(Long catalogId, Pageable pageable);

    @Modifying
    @Query(value = "UPDATE Book b SET b.isDeleted = true WHERE b.id = ?1")
    void softDeleteById(Long id);

    @Modifying
    @Query(value = "UPDATE Book b SET b.catalog.id = :catalog_id WHERE b.id = :id")
    void changeCatalogByBookId(@Param("id") Long bookId, @Param("catalog_id") Long catalogId);
}
