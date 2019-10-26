from django.conf.urls import url
from django.conf.urls.static import static
from django.urls import path
from django.views.static import serve

from Webbookstore import settings
from . import views
from shopapp.Py import register
app_name = 'blog'
urlpatterns = [

    path('index', views.index, name='index'),
    url(r'^images/(?P<path>.*)$', serve, {'document_root': 'shopapp/static/images'}),
    url(r'^register/$', register.register),
    #url(r'^bestsellurl/$', views.bestsell, name='bestsell'),
    path('bestsellurl', views.bestsell),
    url(r'^shop.html/$', views.shop,name='shop'),
    url(r'^$', views.index, name='index'),
]
