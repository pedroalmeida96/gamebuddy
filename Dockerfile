FROM openjdk:17-jdk-slim AS build

WORKDIR /app
COPY . .

RUN chmod +x gradlew
RUN ./gradlew bootJar --no-daemon

FROM openjdk:17-jdk-slim

EXPOSE 8080
COPY --from=build /app/build/libs/gamebuddy-0.0.1.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]
