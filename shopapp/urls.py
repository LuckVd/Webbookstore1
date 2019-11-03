from django.conf.urls import url
from django.conf.urls.static import static
from django.urls import path
from django.views.static import serve

from Webbookstore import settings
from . import views
from shopapp.Py import register, index, cart, shop
app_name = 'blog'
urlpatterns = [

    path('index/bestsellurl', index.bestsell),
    path('cart/cart_show', cart.cart_show),
    path('shop/author_list', shop.author_list),
    path('shop/book_list', shop.book_list),
    url(r'^index/$', views.index),
    url(r'^shop/$', views.shop),
    url(r'^gallery/$', views.gallery),
    url(r'^author/$', views.author),
    url(r'^about/$', views.about),
    url(r'^cart/$', views.cart),
    url(r'^register/$', register.register),
    url(r'^$', views.index, name='index'),
    url(r'images/(?P<path>.*)$', serve, {'document_root': 'shopapp/static/images'}),
]
