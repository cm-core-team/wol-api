FROM eclipse-temurin:17-jdk-jammy

RUN apt update && apt upgrade -y
RUN apt install -y maven
# Add user
RUN useradd --create-home appuser
WORKDIR /home/appuser
VOLUME /home/appuser

COPY . /home/appuser/
RUN mvn install && \
    cp /home/appuser/target/*.jar /home/appuser/app.jar

EXPOSE 8080
CMD ["java","-jar", "/home/appuser/app.jar"]
