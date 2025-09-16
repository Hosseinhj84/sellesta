from django.db import models

class Brand(models.Model):
    name = models.CharField(max_length=200, unique=True, verbose_name="نام برند")
    logo = models.ImageField(upload_to="brands/", blank=True, null=True, verbose_name="لوگو برند")
    logo_url = models.URLField(blank=True, null=True, verbose_name="آدرس لوگو (در صورت استفاده از URL)")
    description = models.TextField(blank=True, null=True, verbose_name="توضیحات")
    website = models.URLField(blank=True, null=True, verbose_name="وب‌سایت رسمی برند")
    is_active = models.BooleanField(default=True, verbose_name="فعال؟")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "برند"
        verbose_name_plural = "برندها"

    def __str__(self):
        return self.name

    @property
    def get_logo(self):
        if self.logo:
            return self.logo.url
        elif self.logo_url:
            return self.logo_url
        return "https://picsum.photos/1280/720?random"
