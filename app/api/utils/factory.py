import datetime

from factory.django import DjangoModelFactory
from factory import Sequence, Trait, SubFactory, RelatedFactory

from api.models import CustomUser, Profile, Team, TeamBoard

class ProfileFactory(DjangoModelFactory):
    class Meta:
        model = Profile

    nickname = Sequence(lambda n: 'user{0}'.format(n))
    user = SubFactory('api.utils.factory.UserFactory', profile=None)
    is_coach = False
    is_guest = False
    created_at = Sequence(lambda n: datetime.datetime(2020, 1, 1, 0, 0, 0, 0000) + datetime.timedelta(days=n))

class UserFactory(DjangoModelFactory):
    class Meta:
        model = CustomUser

    profile = RelatedFactory(ProfileFactory, factory_related_name='user')
    email = Sequence(lambda n: 'user{0}@example.com'.format(n))
    password = Sequence(lambda n: 'password{0}'.format(n))

class TeamBoardFactory(DjangoModelFactory):
    class Meta:
        model = TeamBoard

    introduction = ""
    join_count = 1

class TeamFactory(DjangoModelFactory):
    class Meta:
        model = Team

    name = Sequence(lambda n: 'team{0}'.format(n))
    team_board = RelatedFactory(TeamBoardFactory, factory_related_name="team")
    is_limit_join = False
    password = "0000"