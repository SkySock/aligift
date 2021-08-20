from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from . import views
app_name = 'web'

urlpatterns = [
    path('', views.ProductList.as_view(), name='product_list'),
    path('search/', views.ProductList.as_view(), name='product_search'),
    path('category/<slug:category_slug>/', views.ProductList.as_view(), name='product_list_by_category'),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
