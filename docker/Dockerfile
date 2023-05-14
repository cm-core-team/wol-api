FROM eclipse-temurin:17-jdk-jammy


RUN apt update && apt upgrade -y
RUN apt install -y maven
# Add user
RUN useradd --create-home appuser
WORKDIR /home/appuser
VOLUME /home/appuser
USER appuser

COPY . /home/appuser/
RUN mvn install

EXPOSE 8080
CMD ["java","-jar", "/app.jar"]
