from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from django.contrib.auth.models import User
from django.contrib.auth import authenticate

from .models import Product
from .models import Product, Order, OrderItem
from .serializers import ProductSerializer, RegisterSerializer,OrderSerializer



# ---------------- PRODUCTS ----------------

@api_view(['GET'])
def product_list(request):
    products = Product.objects.all()

    serializer = ProductSerializer(
        products,
        many=True,
        context={'request': request}
    )

    return Response(serializer.data)


@api_view(['GET'])
def product_detail(request, id):
    try:
        product = Product.objects.get(id=id)

    except Product.DoesNotExist:
        return Response(
            {'error': 'Product not found'},
            status=status.HTTP_404_NOT_FOUND
        )

    serializer = ProductSerializer(
        product,
        context={'request': request}
    )

    return Response(serializer.data)


# ---------------- REGISTER ----------------

@api_view(['POST'])
def register(request):

    serializer = RegisterSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

        return Response(
            {'message': 'Registration successful'},
            status=status.HTTP_201_CREATED
        )

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )


# ---------------- LOGIN ----------------

@api_view(['POST'])
def login(request):

    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(
        username=username,
        password=password
    )

    if user is not None:

        return Response({
            'message': 'Login successful',
            'username': user.username,
            'user_id': user.id
        })

    return Response(
        {'error': 'Invalid username or password'},
        status=status.HTTP_401_UNAUTHORIZED
    )




# ---------------- CREATE ORDER ----------------

@api_view(['POST'])
def create_order(request):

    user_id = request.data.get('user_id')
    items = request.data.get('items', [])

    if not user_id:
        return Response(
            {'error': 'User ID is required'},
            status=status.HTTP_400_BAD_REQUEST
        )

    if not items:
        return Response(
            {'error': 'Cart is empty'},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        user = User.objects.get(id=user_id)

    except User.DoesNotExist:
        return Response(
            {'error': 'User not found'},
            status=status.HTTP_404_NOT_FOUND
        )

    total_amount = 0

    for item in items:

        product_id = item.get('product_id')
        quantity = int(item.get('quantity', 1))

        try:
            product = Product.objects.get(id=product_id)

        except Product.DoesNotExist:
            return Response(
                {'error': f'Product {product_id} not found'},
                status=status.HTTP_404_NOT_FOUND
            )

        if quantity <= 0:
            return Response(
                {'error': 'Quantity must be greater than 0'},
                status=status.HTTP_400_BAD_REQUEST
            )

        if quantity > product.stock:
            return Response(
                {
                    'error': f'Only {product.stock} items available for {product.name}'
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        total_amount += product.price * quantity

    order = Order.objects.create(
        user=user,
        total_amount=total_amount
    )

    for item in items:

        product = Product.objects.get(
            id=item.get('product_id')
        )

        quantity = int(item.get('quantity', 1))

        OrderItem.objects.create(
            order=order,
            product=product,
            quantity=quantity,
            price=product.price
        )

        product.stock -= quantity
        product.save()

    return Response(
        {
            'message': 'Order placed successfully',
            'order_id': order.id,
            'total_amount': order.total_amount
        },
        status=status.HTTP_201_CREATED
    )


# ---------------- USER ORDERS ----------------

@api_view(['GET'])
def user_orders(request, user_id):

    try:
        user = User.objects.get(id=user_id)

    except User.DoesNotExist:
        return Response(
            {'error': 'User not found'},
            status=status.HTTP_404_NOT_FOUND
        )

    orders = Order.objects.filter(
        user=user
    ).order_by('-created_at')

    serializer = OrderSerializer(
        orders,
        many=True
    )

    return Response(serializer.data)