from django.conf.urls import url
from django.views.static import serve
from . import views
from shopapp.Py import register
app_name = 'blog'
urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^images/(?P<path>.*)$', serve, {'document_root': 'shopapp/static/images'}),
    url(r'^register/$', register.register),
    url(r'^shop.html/$', views.shop,name='shop'),

]
