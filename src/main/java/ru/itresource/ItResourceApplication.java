package ru.itresource;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

@Slf4j
@SpringBootApplication
public class ItResourceApplication {

    public static final String LOCAL_SERVER_PORT = "local.server.port";

    public static void main(String[] args) {
        Environment env = SpringApplication
                .run(ItResourceApplication.class, args)
                .getEnvironment();

        String port = env.getProperty(LOCAL_SERVER_PORT);

        log.info("\n----------------------------------------------------------\n\t" +
                        "Application is running!  Access URLs:\n\t" +
                        "Check status: http://localhost:{}/api/status\n\t" +
                        "Swagger: http://localhost:{}/swagger-ui/index.html\n\t" +
                  "\n----------------------------------------------------------",
                port, port
        );
    }
}
