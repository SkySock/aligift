from django.shortcuts import render, get_object_or_404
from django.contrib.postgres.search import SearchVector, SearchQuery, SearchRank
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.http import JsonResponse
from django.views import View
from .models import Category, Product
from .forms import SearchForm


class ProductList(View):
    category = None
    categories = Category.objects.all()
    products = Product.objects.all()

    def get(self, request, category_slug=None, *args, **kwargs):
        if category_slug:
            self.category = get_object_or_404(Category, slug=category_slug)
            self.products = self.products.filter(category=self.category)

        form = SearchForm()

        if 'query' in request.GET:
            form = SearchForm(request.GET)

        if form.is_valid():
            query = form.cleaned_data['query']
            search_vector = SearchVector('name', 'description')
            search_query = SearchQuery(query)

            self.products = Product.objects.annotate(
                search=search_vector,
                rank=SearchRank(search_vector, search_query)
            ).filter(search=search_query).order_by('-rank')

        if 'page' in request.GET:
            page = self.request.GET.get('page')
            return self.get_products_for_page(page=page)

        return render(request, 'web/product/list.html',
                      {'category': self.category,
                       'categories': self.categories,
                       'products': self.products}
                      )

    def get_products_for_page(self, page):
        paginator = Paginator(self.products, 6)
        pages = paginator.num_pages
        resp = {
            'pages': pages,
            'products': []
        }

        try:
            self.products = paginator.page(page).object_list
        except PageNotAnInteger:
            # Если страница не является целым числом, возвращаем первую страницу.
            self.products = []
        except EmptyPage:
            # Если номер страницы больше, чем общее количество страниц, возвращаем последнюю.
            self.products = []

        for prod in self.products:
            product = {
                'name': prod.name,
                'description': prod.description,
                'img': prod.image.url if prod.image else None,
                'url': prod.url
            }
            resp.get('products').append(product)
        return JsonResponse(resp)
