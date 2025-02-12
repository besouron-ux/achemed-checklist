# Generated by Django 5.1.3 on 2024-11-14 20:56

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Checklist',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cliente', models.CharField(max_length=100)),
                ('consultorio', models.CharField(max_length=100)),
                ('processador', models.BooleanField(default=False)),
                ('memoria_ram', models.BooleanField(default=False)),
                ('armazenamento', models.BooleanField(default=False)),
                ('sistema_operacional', models.BooleanField(default=False)),
                ('monitor', models.BooleanField(default=False)),
                ('webcam', models.BooleanField(default=False)),
                ('microfone', models.BooleanField(default=False)),
                ('alto_falantes', models.BooleanField(default=False)),
                ('conexao_internet', models.BooleanField(default=False)),
                ('navegador', models.BooleanField(default=False)),
                ('status', models.CharField(default='NÃO APTO', max_length=10)),
            ],
        ),
    ]
