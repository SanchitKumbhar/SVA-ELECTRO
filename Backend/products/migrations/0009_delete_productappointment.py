# Generated by Django 4.2.20 on 2025-06-05 11:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0008_alter_product_productimg'),
    ]

    operations = [
        migrations.DeleteModel(
            name='ProductAppointment',
        ),
    ]
