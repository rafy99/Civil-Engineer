# Generated by Django 3.0.5 on 2020-05-24 14:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0004_auto_20200524_1434'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='type',
            field=models.CharField(choices=[('none', 'none'), ('plumber', 'plumber'), ('painter', 'painter'), ('cleaner', 'cleaner')], default='none', max_length=10),
        ),
    ]
