package ru.itresource.library.core.entities.enums;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum CatalogPath {

    PUBLIC(1L, "Публичный"),
    PRIVATE(2L, "Закрытый");

    public final Long id;
    public final String name;
}
