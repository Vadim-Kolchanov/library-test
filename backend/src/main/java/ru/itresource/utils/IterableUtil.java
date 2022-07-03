package ru.itresource.utils;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

public class IterableUtil {

    public static <T> List<T> iterableToList(Iterable<T> iterable) {
        return iterableToList(iterable, false);
    }

    public static <T> List<T> iterableToList(Iterable<T> iterable, boolean parallel) {
        return StreamSupport.stream(iterable.spliterator(), parallel).collect(Collectors.toList());
    }
}
