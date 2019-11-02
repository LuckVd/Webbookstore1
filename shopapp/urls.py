from django.conf.urls import url
from django.conf.urls.static import static
from django.urls import path
from django.views.static import serve

from Webbookstore import settings
from . import views
from shopapp.Py import register, index, cart
app_name = 'blog'
urlpatterns = [

    path('index.html/bestsellurl', index.bestsell),
    path('cart.html/cart_show', cart.cart_show),
    url(r'^index.html/$', views.index),
    url(r'^shop.html/$', views.shop),
    url(r'^gallery.html/$', views.gallery),
    url(r'^author.html/$', views.author),
    url(r'^about.html/$', views.about),
    url(r'^cart.html/$', views.cart),
    url(r'^register/$', register.register),
    url(r'^$', views.index, name='index'),
    url(r'images/(?P<path>.*)$', serve, {'document_root': 'shopapp/static/images'}),
]
