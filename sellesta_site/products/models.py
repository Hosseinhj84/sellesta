from django.db import models
from django.utils import timezone
from django.utils.text import slugify

class Category(models.Model):
    name = models.CharField(max_length=200, unique=True, verbose_name="نام دسته‌بندی")
    slug = models.SlugField(max_length=200, unique=True, verbose_name="اسلاگ")
    created = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(upload_to="categoties/", blank=True, null=True)
    image_url = models.URLField(blank=True , null=True)
    
    def get_image_url(self):
        if self.image:
            return self.image.url
        elif self.image_url :
            return self.image_url
        # عکس پیشفرض خارجی
        else :
            return "https://picsum.photos/200/200?blur"

    class Meta:
        verbose_name = "دسته‌بندی"
        verbose_name_plural = "دسته‌بندی‌ها"

    def __str__(self):
        return self.name


class Products(models.Model):
    name = models.CharField(max_length=200, verbose_name="نام محصول")
    slug = models.SlugField(max_length=200, unique=True, verbose_name="اسلاگ")
    categories = models.ManyToManyField(Category, related_name="products", verbose_name="دسته‌بندی‌ها")
    description = models.TextField(blank=True, verbose_name="توضیحات")
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="قیمت")
    available = models.BooleanField(default=True, verbose_name="موجود است؟")
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "محصول"
        verbose_name_plural = "محصولات"

    def __str__(self):
        return self.name
