package ru.itresource.app;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * API для определения статуса работы сервиса
 */
@RestController
@RequestMapping("/api")
@Api(tags={"Статус сервиса"})
public class ApplicationStatusResource {

    @GetMapping(value = "/status")
    @ApiOperation(value = "Возвращает статус сервера")
    public ResponseEntity<String> status() {
        final HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.TEXT_PLAIN);

        return new ResponseEntity<>("OK", httpHeaders, HttpStatus.OK);
    }
}
