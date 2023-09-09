FROM rust:latest

RUN apt-get update && apt-get --no-install-recommends install -y \
    && rm -rf /var/lib/apt/lists/*

RUN useradd --create-home appuser
WORKDIR /home/appuser
VOLUME /home/appuser

COPY ./backend /home/appuser/

# ensure rust is on the latest stable version
RUN rustup update && rustup default stable

EXPOSE 8000
CMD ["cargo", "run"]

# http://127.0.0.1:8000/api/v1/bible-verses
