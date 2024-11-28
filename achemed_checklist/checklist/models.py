from django.db import models

class Checklist(models.Model):
    cliente = models.CharField(max_length=100)
    consultorio = models.CharField(max_length=100)
    processador = models.BooleanField(default=False)
    ram = models.BooleanField(default=False)  
    armazenamento = models.BooleanField(default=False)
    sistema = models.BooleanField(default=False)  
    monitor = models.BooleanField(default=False)
    webcam = models.BooleanField(default=False)
    microfone = models.BooleanField(default=False)
    autoFalantes = models.BooleanField(default=False)  
    internet = models.BooleanField(default=False)  
    navegador = models.BooleanField(default=False)
    status = models.CharField(max_length=10, default="NÃO APTO")

    def __str__(self):
        return f'{self.cliente} - {self.consultorio} ({self.status})'


class Cliente(models.Model):
    nome = models.CharField(max_length=255)
    cnpj = models.CharField(max_length=18, unique=True)
    telefone = models.CharField(max_length=15)

    def __str__(self):
        return self.nome
    
class Consultorio(models.Model):
    nome = models.CharField(max_length=255)
    cliente = models.ForeignKey(Cliente, related_name="id", on_delete=models.CASCADE)
    
    def __str__(self):
        return f"{self.nome} - {self.cliente.nome}"