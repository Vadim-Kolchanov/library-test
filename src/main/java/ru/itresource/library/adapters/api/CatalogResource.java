package ru.itresource.library.adapters.api;

import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.itresource.library.core.CatalogService;
import ru.itresource.library.core.entities.Catalog;

import java.util.List;

@RestController
@RequestMapping("/api/catalog")
@AllArgsConstructor
public class CatalogResource {

    private final CatalogService catalogService;

    @GetMapping
    @ApiOperation(value = "Возвращает список каталогов")
    public List<Catalog> catalogs() {
        return catalogService.catalogs();
    }
}
