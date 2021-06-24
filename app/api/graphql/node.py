from graphene_django import DjangoObjectType
from graphene import relay

from api.models import CustomUser, Profile, Team, TeamBoard

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

class TeamNode(DjangoObjectType):
    class Meta:
        model = Team
        filter_fields = {
            'id': ['exact'],
            'name': ['exact'],
            'password': ['exact'],
        }
        interfaces = (relay.Node,)

class TeamBoardNode(DjangoObjectType):
    class Meta:
        model = TeamBoard
        filter_fields = {
            'team__id': ['exact'],
        }
        interfaces = (relay.Node,)