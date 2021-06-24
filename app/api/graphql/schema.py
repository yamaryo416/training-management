import graphene
import graphql_jwt

from graphene_django.filter import DjangoFilterConnectionField
from graphql_jwt.decorators import login_required, user_passes_test
from graphql_relay import from_global_id

from api.models import Profile, Team, TeamBoard
from api.graphql.node import ProfileNode, TeamNode, TeamBoardNode
from api.graphql.mutation.user_mutation import CreateGeneralUserMutation, CreateGuestUserMutation, DeleteUserMutation
from api.graphql.mutation.profile_mutation import \
    UpdateProfileNicknameMutation, UpdateProfileTeamBoardMutation, DeleteMyProfileTeamBoardMutation, \
    DeleteOneProfileTeamBoardMutation
from api.graphql.mutation.team_mutation import CreateTeamMutation, UpdateTeamMutation
from api.graphql.mutation.team_board_mutation import UpdateTeamBoardIntroductionMutation, UpdateTeamBoardCoachMutation

class Mutation(graphene.AbstractType):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    create_general_user = CreateGeneralUserMutation.Field()
    create_guest_user = CreateGuestUserMutation.Field()
    delete_user = DeleteUserMutation.Field()
    update_profile_nickname = UpdateProfileNicknameMutation.Field()
    update_profile_team_board = UpdateProfileTeamBoardMutation.Field()
    delete_my_profile_team_board = DeleteMyProfileTeamBoardMutation.Field()
    delete_one_profile_team_board = DeleteOneProfileTeamBoardMutation.Field()
    create_team = CreateTeamMutation.Field()
    update_team = UpdateTeamMutation.Field()
    update_team_board_introduction = UpdateTeamBoardIntroductionMutation.Field()
    update_team_board_coach = UpdateTeamBoardCoachMutation.Field()

class Query(graphene.ObjectType):
    my_profile = graphene.Field(ProfileNode)
    one_team_from_name = graphene.Field(TeamNode,
                                        name=graphene.NonNull(graphene.String),
                                        password=graphene.NonNull(graphene.String))
    one_team_from_id = graphene.Field(TeamNode,
                                      team_id=graphene.NonNull(graphene.ID))
    all_team_board = DjangoFilterConnectionField(TeamBoardNode)

    @login_required
    def resolve_my_profile(self, info, **kwargs):
        return Profile.objects.get(user=info.context.user.id)

    @login_required
    def resolve_one_team_from_name(self, info, **kwargs):
        name = kwargs.get('name')
        password = kwargs.get('password')
        if name is not None and password is not None:
            return Team.objects.get(name=name, password=password)

    @login_required
    def resolve_one_team_from_id(self, info, **kwargs):
        team_id = from_global_id(kwargs.get('team_id'))[1]
        return Team.objects.get(id=team_id)

    @login_required
    def resolve_all_team_board(self, info, **kwargs):
        return TeamBoard.objects.filter(team__is_limit_join=False).order_by('-join_count')