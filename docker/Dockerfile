FROM eclipse-temurin:17-jdk-jammy


RUN apt update && apt upgrade -y
# Add user
RUN useradd --create-home appuser
WORKDIR /home/appuser
VOLUME /home/appuser
USER appuser

COPY target/*.jar /app.jar

CMD ["java","-jar", "/app.jar"]
