# Generated by Django 3.1.2 on 2021-06-24 20:25

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_profile_finished_schedule_count'),
    ]

    operations = [
        migrations.AlterField(
            model_name='schedule',
            name='date',
            field=models.DateField(),
        ),
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.CharField(max_length=100)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('profile', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='posts', to='api.profile')),
                ('team_board', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='posts', to='api.teamboard')),
            ],
        ),
    ]