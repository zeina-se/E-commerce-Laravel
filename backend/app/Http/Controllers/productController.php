<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Product;
use Illuminate\Support\Facades\File;


class productController extends Controller
{


    function test (){
        return json_encode(["name" => "zeina"]);
    }

    function addOrUpdateProduct(Request $request, $id = "add") {
        if ($id == "add") {
            $product = new Product;            
        } else {
           
            $product = Product::find($id);
            if (!$product) {
                return  response()->json(['error' => "No product Found"]);
            }           
            }
           
        if ( $id == "add" || $request->file('image') ) {
            
            $validator = Validator::make($request->all(),[ 
                'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
              ]);   
       
            if($validator->fails()) {          
                  
                return response()->json(['error'=>$validator->errors()], 401);                        
               }  

            // Store the uploaded file
            $file = $request->file('image');
            $path = $file->store('uploads'); // Choose the desired storage path

            //store your file into directory
              
              $product->image= $path;
              
          }

        $product->category_id = $request->category_id ? $request->category_id : $product->category_id;
        $product->name = $request->product_name ? $request->product_name : $product->product_name;
        $product->description = $request->description ? $request->description : $product->description;
        $product->save();
    
       
        return json_encode(["products" => $product]);
    }
    
    function getProducts($id = null){
        if($id){
            $products = Product::find($id);
        }else{
            $products = Product::all();
        }
        
        return json_encode(["products" => $products]);
    
    }

    // function getProductbyCategory($id){
    //     // $products = Product::where("category_id", $id)->get();
    //     // return json_encode(["products" => $products]);
    //     return json_encode(["name" => "getby cat"]);

    // }

    function deleteProduct($id){
        $product = Product::find($id);
        if (!$product) {
            return  response()->json(['error' => "No product Found"]);
        }   
        // delete the image
        $imagePath = 'http://localhost/E-commerce-Laravel/backend/storage/app/'.$product->image; 

        if (File::exists($imagePath)) {
            File::delete($imagePath);
        }
        // delete from db
        $product = Product::find($id)->delete();
        return  response()->json(['error' => "product Deleted"]);
    }
    

    
}
