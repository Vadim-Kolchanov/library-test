FROM maven:3.8.1-jdk-11 as build
WORKDIR /backend

COPY pom.xml .
COPY /src ./src

RUN mvn clean install -P docker


FROM tomcat:9-jre11

# Удаляем ROOT папку, называем файл ROOT.war - требуется для корректного URL
RUN rm -rf /usr/local/tomcat/webapps/ROOT
COPY --from=build backend/target/backend-1.0.0.war /usr/local/tomcat/webapps/ROOT.war

EXPOSE 8080