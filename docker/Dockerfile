FROM rust:latest

RUN apt-get update && apt-get --no-install-recommends install -y \
    && rm -rf /var/lib/apt/lists/*

RUN useradd --create-home appuser
WORKDIR /home/appuser
VOLUME /home/appuser

COPY ./backend /home/appuser/

ENV ROCKET_ADDRESS="0.0.0.0"
# RUN cargo install --path .

EXPOSE 8000
CMD ["cargo", "run"]

# http://127.0.0.1:8000/api/v1/bible-verses
