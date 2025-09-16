from django.db import models

class Slide(models.Model):
     title = models.CharField(max_length=200 , verbose_name='عنوان')
     description = models.TextField(blank=True , null=True, verbose_name='توضیحات')
     image = models.ImageField(upload_to="slider/" , blank=True , null=True , verbose_name='عکس')
     img_url = models.URLField(blank=True, null=True , verbose_name='لینک خارجی')
     is_active = models.BooleanField(default=True , verbose_name='فعال ؟ ')
     created_at = models.DateTimeField(auto_now_add=True)
     
     def __str__(self):
        return self.title or 'slide'
    
     @property
     def get_image(self):
        if self.image:
            return self.image.url
        elif self.img_url:
            return self.img_url
        return "https://picsum.photos/1280/720?random"