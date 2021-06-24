from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None):

        if not email:
            raise ValueError('email is must')

        user = self.model(email=self.normalize_email(email))
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, password):
        user = self.create_user(email, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)

        return user

class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=50, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'

    def __str__(self):
        return self.email

class Profile(models.Model):
    nickname = models.CharField(max_length=20)
    user = models.OneToOneField(
        CustomUser, related_name="profile",
        on_delete=models.CASCADE
    )
    is_guest = models.BooleanField(default=False)
    is_coach = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    join_at = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return self.nickname