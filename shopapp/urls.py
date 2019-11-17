from django.conf.urls import url
from django.conf.urls.static import static
from django.urls import path
from django.views.static import serve

from Webbookstore import settings
from . import views
from . import api
from shopapp.Py import   cart,add, search, temp
from shopapp import api
app_name = 'blog'
urlpatterns = [


    path('cart/cart_show', cart.cart_show),
    #path('add/', add.add),
   # path('search/', search.search),
    path('temp_save/', temp.temp_save),
    path('temp_get/', temp.temp_get),
    url(r'^index/$', views.index),
    url(r'^book-detail/$', views.book_detail),
    url(r'^shop/$', views.shop),
    url(r'^gallery/$', views.gallery),
    url(r'^author/$', views.author),
    url(r'^author-detail/$', views.author_detail),
    url(r'^about/$', views.about),
    url(r'^cart/$', views.cart),
    #管理员界面的路由
    url(r'^book_admin/$', views.admin),
    url(r'^book-fd.html/$', views.book_fd),
    url(r'^book-revise.html/$', views.book_revise),
    url(r'^author-add.html/$', views.author_add),
    url(r'^author-fd.html/$', views.author_fd),
    url(r'^author-revise.html/$', views.author_revise),
    url(r'^user-fd.html/$', views.user_fd),

    url(r'^$', views.index, name='index'),
    url(r'images/(?P<path>.*)$', serve, {'document_root': 'shopapp/static/images'}),

    path('add/',api.add),
    path('delete/',api.delete),
    path('update/',api.update),
    path('search/',api.search),

]
