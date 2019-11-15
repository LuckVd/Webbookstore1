from django.db import models

class addressee(models.Model):
     addressee_name=models.CharField(max_length=255)
     addressee_addr = models.CharField(max_length=255)
     addressee_phone = models.CharField(max_length=255)
     addr_is_default = models.CharField(max_length=4)
     addr_rel_user = models.CharField(max_length=11)
# Create your models here.
class author(models.Model):
     author_name= models.CharField(max_length=255)
     author_discribe = models.CharField(max_length=255)

class book(models.Model):
     book_name = models.CharField(max_length=255)
     book_author = models.CharField(max_length=255)
     book_discribe = models.CharField(max_length=255)
     book_price = models.CharField(max_length=10)
     book_sales = models.CharField(max_length=11)
     book_stock = models.CharField(max_length=11)
     book_detail = models.CharField(max_length=255)
     book_image = models.CharField(max_length=255)

class orderbook(models.Model):
     orderbook_rel_order = models.CharField(max_length=11)
     orderbook_book = models.CharField(max_length=255)
     orderbook_num = models.CharField(max_length=11)
     orderbook_price = models.CharField(max_length=10)
     orderbook_total_price = models.CharField(max_length=10)

class cart(models.Model):
     cart_num=models.CharField(max_length=11)

class orders(models.Model):
     order_rel_user = models.CharField(max_length=11)
     order_rel_addressee = models.CharField(max_length=11)
     order_addressee_name = models.CharField(max_length=255)
     rder_addressee_addr = models.CharField(max_length=255)
     order_total_num = models.CharField(max_length=11)
     order_total_price = models.CharField(max_length=10)
     order_express_cost = models.CharField(max_length=10)
     order_state = models.CharField(max_length=11)
     order_createtime = models.CharField(max_length=6)

class user(models.Model):
     user_name = models.CharField(max_length=255)
     user_password = models.CharField(max_length=255)
     user_email = models.CharField(max_length=255)
     user_is_admin = models.CharField(max_length=4)