import os
import environ

from .settings import *

env = environ.Env()
env.read_env(os.path.join(BASE_DIR, '.env'))

DEBUG = False

SECRET_KEY = env('SECRET_KEY')