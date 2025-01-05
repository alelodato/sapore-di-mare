from django.shortcuts import render
from django.views import generic
from .models import Review
from .forms import FeedbackForm
# Create your views here.

class Reviews(generic.ListView):
    queryset = Review.objects.all()
    template_name = "feedback/feedback.html"
    paginate_by = 10
    

def feedback_detail(request):
    """
    Display an individual :model:`feedback.Review`.
    """

    queryset = Review.objects.all()
    feedback = get_object_or_404(queryset,)
    reviews = feedback.all().order_by("-created_on")
    feedback_form = FeedbackForm()
    return render(
        request,
        "feedback/feedback.html",
        {"feedback_form": feedback_form,
        },
    )