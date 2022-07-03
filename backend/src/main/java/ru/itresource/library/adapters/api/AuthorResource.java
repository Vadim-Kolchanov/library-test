package ru.itresource.library.adapters.api;

import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ru.itresource.library.core.AuthorService;
import ru.itresource.library.core.entities.Author;

import java.util.List;

@RestController
@RequestMapping("/api/author")
@AllArgsConstructor
public class AuthorResource {

    private final AuthorService authorService;

    @GetMapping("/all")
    @ApiOperation(value = "Возвращает список всех авторов")
    public List<Author> authors() {
        return this.authorService.authors();
    }

    @PostMapping("/save")
    @ApiOperation(value = "Сохраняет нового автора")
    public Author saveAuthor(@RequestBody Author author) {
        return this.authorService.saveAuthor(author);
    }
}
