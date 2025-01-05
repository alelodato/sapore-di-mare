from .models import Review
from django import forms


class FeedbackForm(forms.ModelForm):
    class Meta:
        model = Review
        fields = ('body',)