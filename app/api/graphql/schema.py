import graphene
import graphql_jwt

from graphene_django.filter import DjangoFilterConnectionField
from graphql_jwt.decorators import login_required, user_passes_test
from graphql_relay import from_global_id

from api.models import Profile
from api.graphql.node import ProfileNode
from api.graphql.mutation.user_mutation import CreateGeneralUserMutation, CreateGuestUserMutation, DeleteUserMutation

class Mutation(graphene.AbstractType):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    create_general_user = CreateGeneralUserMutation.Field()
    create_guest_user = CreateGuestUserMutation.Field()
    delete_user = DeleteUserMutation.Field()

class Query(graphene.ObjectType):
    my_profile = graphene.Field(ProfileNode)

    @login_required
    def resolve_my_profile(self, info, **kwargs):
        return Profile.objects.get(user=info.context.user.id)