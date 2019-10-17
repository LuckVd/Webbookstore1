from django.db import models

# Create your models here.
class user_info(models.Model):
    username = models.CharField(max_length=20)
    password = models.CharField(max_length=20)
    
    def __unicode__(self):
        return self.username


