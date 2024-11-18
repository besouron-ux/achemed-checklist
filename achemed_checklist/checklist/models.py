from django.db import models

class Checklist(models.Model):
    cliente = models.CharField(max_length=100)
    consultorio = models.CharField(max_length=100)
    processador = models.BooleanField(default=False)
    memoria_ram = models.BooleanField(default=False)
    armazenamento = models.BooleanField(default=False)
    sistema_operacional = models.BooleanField(default=False)
    monitor = models.BooleanField(default=False)
    webcam = models.BooleanField(default=False)
    microfone = models.BooleanField(default=False)
    alto_falantes = models.BooleanField(default=False)
    conexao_internet = models.BooleanField(default=False)
    navegador = models.BooleanField(default=False)
    status = models.CharField(max_length=10, default="NÃO APTO")  # Armazena "APTO" ou "NÃO APTO"

    def __str__(self):
        return f'{self.cliente} - {self.consultorio} ({self.status})'
