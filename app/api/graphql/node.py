from graphene_django import DjangoObjectType
from graphene import relay

from api.models import CustomUser, Profile

class UserNode(DjangoObjectType):
    class Meta:
        model = CustomUser
        filter_fields = {
            'email': ['exact'],
        }
        interfaces = (relay.Node,)

class ProfileNode(DjangoObjectType):
    class Meta:
        model = Profile
        filter_fields = {
            'nickname': ['exact', 'icontains'],
        }
        interfaces = (relay.Node,)