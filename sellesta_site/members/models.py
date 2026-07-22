from django.db import models
from django.contrib.auth.models import User

class Member(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="member")
    phone = models.CharField(max_length=20, blank=True, null=True)
    joined_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.user.get_full_name() or self.user.username