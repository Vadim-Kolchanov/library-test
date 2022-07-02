package ru.itresource.library.core.entities.enums;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum CatalogPath {

    PUBLIC(1L, "/public"),
    PRIVATE(2L, "/private");

    public final Long id;
    public final String path;
}
