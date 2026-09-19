# Multi-stage Dockerfile for SpringCore Backend
# Stage 1: Build JAR
FROM eclipse-temurin:17-jdk-alpine AS build
WORKDIR /app

# Cache Maven dependencies
COPY .mvn/ .mvn
COPY mvnw pom.xml ./
RUN chmod +x ./mvnw && ./mvnw dependency:go-offline -B

# Copy source and build
COPY src ./src
RUN ./mvnw clean package -DskipTests

# Stage 2: Production JRE runtime
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Add unprivileged user for security
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring

COPY --from=build /app/target/springcore-0.0.1-SNAPSHOT.jar app.jar

ENV PORT=8080
EXPOSE 8080

ENTRYPOINT ["java", "-XX:+UseContainerSupport", "-XX:MaxRAMPercentage=75.0", "-Dserver.port=${PORT}", "-jar", "app.jar"]

