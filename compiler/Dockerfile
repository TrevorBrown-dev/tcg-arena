FROM python
# install dependencies
WORKDIR /usr/app
COPY ./requirements.txt ./
RUN pip3 install -r requirements.txt
COPY ./src ./src
EXPOSE 6969
CMD ["python", "/usr/app/src/app.py"]