# Generated by Django 4.2.20 on 2025-05-31 17:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0007_alter_product_launch'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='productimg',
            field=models.ImageField(upload_to='static/productimg'),
        ),
    ]
