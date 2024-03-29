# Generated by Django 2.2 on 2019-11-16 13:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shopapp', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='addressee',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('addressee_name', models.CharField(max_length=255)),
                ('addressee_addr', models.CharField(max_length=255)),
                ('addressee_phone', models.CharField(max_length=255)),
                ('addr_is_default', models.CharField(max_length=4)),
                ('addr_rel_user', models.CharField(max_length=11)),
            ],
        ),
        migrations.CreateModel(
            name='author',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('author_name', models.CharField(max_length=255)),
                ('author_discribe', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='book',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('book_name', models.CharField(max_length=255)),
                ('book_author', models.CharField(max_length=255)),
                ('book_discribe', models.CharField(max_length=255)),
                ('book_price', models.CharField(max_length=10)),
                ('book_sales', models.CharField(max_length=11)),
                ('book_stock', models.CharField(max_length=11)),
                ('book_detail', models.CharField(max_length=255)),
                ('book_image', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='cart',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cart_num', models.CharField(max_length=11)),
            ],
        ),
        migrations.CreateModel(
            name='orderbook',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('orderbook_rel_order', models.CharField(max_length=11)),
                ('orderbook_book', models.CharField(max_length=255)),
                ('orderbook_num', models.CharField(max_length=11)),
                ('orderbook_price', models.CharField(max_length=10)),
                ('orderbook_total_price', models.CharField(max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='orders',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order_rel_user', models.CharField(max_length=11)),
                ('order_rel_addressee', models.CharField(max_length=11)),
                ('order_addressee_name', models.CharField(max_length=255)),
                ('rder_addressee_addr', models.CharField(max_length=255)),
                ('order_total_num', models.CharField(max_length=11)),
                ('order_total_price', models.CharField(max_length=10)),
                ('order_express_cost', models.CharField(max_length=10)),
                ('order_state', models.CharField(max_length=11)),
                ('order_createtime', models.CharField(max_length=6)),
            ],
        ),
        migrations.CreateModel(
            name='user',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_name', models.CharField(max_length=255)),
                ('user_password', models.CharField(max_length=255)),
                ('user_email', models.CharField(max_length=255)),
                ('user_is_admin', models.CharField(max_length=4)),
            ],
        ),
        migrations.DeleteModel(
            name='user_info',
        ),
    ]
