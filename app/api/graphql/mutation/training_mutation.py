import graphene

from graphql import GraphQLError
from graphene import relay
from graphql_jwt.decorators import login_required, user_passes_test
from graphql_relay import from_global_id

from api.models import Training
from api.utils.validator import validate_name
from api.graphql.node import TrainingNode

class CreateTrainingMutation(relay.ClientIDMutation):
    class Input:
        title = graphene.String(required=True)
        description = graphene.String(required=True)
        icon_number = graphene.Int(required=True)
        finished_patern = graphene.String(required=True)

    training = graphene.Field(TrainingNode)

    @login_required
    @user_passes_test(lambda use: use.profile.is_coach)
    def mutate_and_get_payload(root, info, **input):
        training = Training(
            title=validate_name(input.get('title')),
            description=input.get('description'),
            icon_number=input.get('icon_number'),
            finished_patern=input.get('finished_patern'),
            team_board=info.context.user.profile.team_board
        )
        training.save()

        return CreateTrainingMutation(training=training)

class UpdateTrainingMutation(relay.ClientIDMutation):
    class Input:
        training_id = graphene.ID(required=True)
        title = graphene.String(required=True)
        description = graphene.String()
        icon_number = graphene.Int()
        finished_patern = graphene.String()

    training = graphene.Field(TrainingNode)

    @login_required
    @user_passes_test(lambda use: use.profile.is_coach)
    def mutate_and_get_payload(root, info, **input):
        training = Training.objects.get(
            id=from_global_id(input.get('training_id'))[1]
        )
        if training.team_board != info.context.user.profile.team_board:
            raise GraphQLError("Other team training cannot be changed")
        training.title = validate_name(input.get('title'))
        training.finished_patern = input.get('finished_patern')
        training.icon_number = input.get('icon_number')
        training.save()

        return UpdateTrainingMutation(training=training)

class DeleteTrainingMutation(relay.ClientIDMutation):
    class Input:
        training_id = graphene.ID(required=True)

    training = graphene.Field(TrainingNode)

    @login_required
    @user_passes_test(lambda use: use.profile.is_coach)
    def mutate_and_get_payload(root, info, **input):
        training = Training.objects.get(
            id=from_global_id(input.get('training_id'))[1]
        )
        if training.team_board != info.context.user.profile.team_board:
            raise GraphQLError("Other team training cannot be deleted")
        training.delete()

        return DeleteTrainingMutation(training=None)