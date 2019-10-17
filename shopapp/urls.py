from django.conf.urls import url
from django.views.static import serve
from . import views

app_name = 'blog'
urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^images/(?P<path>.*)$', serve, {'document_root': 'shopapp/static/images'}),

]
