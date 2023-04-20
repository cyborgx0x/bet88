FROM python:latest
ENV PYTHONUNBUFFERED 1
RUN mkdir /code
WORKDIR /code
COPY . /code
ADD requirements.txt /code/
RUN pip install -r requirements.txt
RUN pip install gunicorn
RUN pip install flask
# EXPOSE 80
# CMD ["gunicorn --bind 0.0.0.0:80 code.server:app"]