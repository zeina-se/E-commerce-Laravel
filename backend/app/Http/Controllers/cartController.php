<?php

namespace App\Http\Controllers;
use App\Models\cart_details;
use App\Models\Cart;

use Illuminate\Http\Request;

class cartController extends Controller
{
          
    function getCartbyUser($id) {
        $carts = DB::table('carts')
                    ->join('cart_details', 'cart.id', '=', 'cart_details.cart_id')
                    ->select("*")
                    ->where('cart.id_user', $id)
                    ->get();
        return json_encode(["carts" => $carts]);
    }
    
    function addToCart(Request $request) {
        
        $cart = new Cart;
        $cart->id_user = $request->id_user;
        $cart->save();
        $id_cart = $cart->insertGetId();

        foreach($request->product as $product){
            $cart_details = new CartDetails;  
            $cart_details->product_id = $product['product_id'];
            $cart_details->cart_id = $id_cart;
            $cart_details->quantity = $product['quantity'];
            $cart_details->save();
        }

        
        return json_encode(["cart" => $cart]);
    }
    
        
        

    }