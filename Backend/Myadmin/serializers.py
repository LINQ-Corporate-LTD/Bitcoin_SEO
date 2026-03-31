from rest_framework import serializers
from Event.models import eventAgenda, eventIndustryTrends,blockedEmailDomains

class eventAgendaSerializer(serializers.ModelSerializer):
    class Meta:
        model = eventAgenda
        fields = '__all__'

    def create(self, validated_data):
        from django.db import transaction
        from django.db.models import F
        from datetime import datetime, date, timedelta, time
        
        with transaction.atomic():
            # Find the most recently added item for sequential counting and time defaults
            last_added = eventAgenda.objects.order_by('-id').first()
            
            # 1. Handle sortOrder functionality
            target_sort_number = (last_added.sortOrder + 1) if last_added and last_added.sortOrder is not None else 0
            if eventAgenda.objects.filter(sortOrder=target_sort_number).exists():
                eventAgenda.objects.filter(sortOrder__gte=target_sort_number).update(sortOrder=F('sortOrder') + 1)
            
            if validated_data.get('sortOrder') is None:
                validated_data['sortOrder'] = target_sort_number

            # 2. Handle startTime functionality (defaulting and sequencing)
            if not validated_data.get('startTime'):
                if last_added:
                    if last_added.endTime:
                        validated_data['startTime'] = last_added.endTime
                    elif last_added.startTime:
                        try:
                            # Try to parse string time to do math
                            t_start = datetime.strptime(last_added.startTime, "%H:%M").time()
                            dummy_date = date.today()
                            dt_start = datetime.combine(dummy_date, t_start)
                            dt_end = dt_start + timedelta(minutes=30)
                            validated_data['startTime'] = dt_end.strftime("%H:%M")
                        except (ValueError, TypeError):
                            validated_data['startTime'] = last_added.startTime
                    else:
                        validated_data['startTime'] = "09:00"
                else:
                    validated_data['startTime'] = "09:00"

            return eventAgenda.objects.create(**validated_data)

class eventIndustryTrendsSerializer(serializers.ModelSerializer):
    class Meta:
        model = eventIndustryTrends
        fields = '__all__'

class EmailVerificationSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate_email(self, value):
        domain = value.split("@")[-1].lower()
        if blockedEmailDomains.objects.filter(domainName__iexact=domain).exists():
            raise serializers.ValidationError(
                f"Emails from '{domain}' are not allowed."
            )
        return value
