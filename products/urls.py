from django.urls import path
from products import views

urlpatterns = [
    path("products",views.productspage,name="products"),
    path("api/submit-appointments",views.submitProductpage,name="submit-appointments"),    
    path("api/products",views.showproducts,name="show-products")
]

# {
#   "key": "alt+d",
#   "command": "editor.action.duplicateSelection",
#   "when": "editorTextFocus"
# }