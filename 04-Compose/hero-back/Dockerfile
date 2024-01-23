FROM openjdk:11

ARG JAR_FILE
COPY ${JAR_FILE} hero.jar

ENV DB_URL=jdbc:mysql://hero-db:3306/hero
ENV DB_USERNAME=root
ENV DB_PASSWORD=root 
ENV SERVER_PORT=8080

CMD ["java","-jar","/hero.jar"]