package ru.itresource.library.core.port;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ru.itresource.library.core.entities.Catalog;

@Repository
public interface CatalogRepository extends CrudRepository<Catalog, Long> {
}
