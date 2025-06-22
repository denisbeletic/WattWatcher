FROM python:3.12.9-slim
WORKDIR /app/
COPY requirements.txt req.txt
RUN pip install -r req.txt
COPY . .
EXPOSE 8080
CMD ["python", "app.py"]