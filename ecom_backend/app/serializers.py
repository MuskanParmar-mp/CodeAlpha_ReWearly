from rest_framework import serializers
from django.contrib.auth.models import User

from .models import Product, Order, OrderItem


# ---------------- PRODUCT ----------------

class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = '__all__'


# ---------------- REGISTER ----------------

class RegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):

        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )

        return user


# ---------------- ORDER ITEM ----------------

class OrderItemSerializer(serializers.ModelSerializer):

    product_name = serializers.CharField(
        source='product.name',
        read_only=True
    )

    class Meta:
        model = OrderItem
        fields = [
            'id',
            'product',
            'product_name',
            'quantity',
            'price'
        ]


# ---------------- ORDER ----------------

class OrderSerializer(serializers.ModelSerializer):

    items = OrderItemSerializer(
        source='orderitem_set',
        many=True,
        read_only=True
    )

    class Meta:
        model = Order
        fields = [
            'id',
            'user',
            'total_amount',
            'status',
            'created_at',
            'items'
        ]