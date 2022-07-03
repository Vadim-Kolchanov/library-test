package ru.itresource.library.core;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import ru.itresource.library.core.entities.Catalog;
import ru.itresource.library.core.port.CatalogRepository;
import ru.itresource.utils.IterableUtil;

import java.util.List;

@Service
@AllArgsConstructor
public class CatalogService {

    private final CatalogRepository catalogRepository;

    public List<Catalog> catalogs() {
        return IterableUtil.iterableToList(this.catalogRepository.findAll());
    }
}
