from django.contrib import admin
from .models import CustomUser, Profile, Team, TeamBoard, Training, Schedule, FinishedSchedule

admin.site.register(CustomUser)
admin.site.register(Profile)
admin.site.register(Team)
admin.site.register(TeamBoard)
admin.site.register(Training)
admin.site.register(Schedule)
admin.site.register(FinishedSchedule)
