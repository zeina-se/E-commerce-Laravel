<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TodoController;
use App\Http\Controllers\productController;


Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');

});

Route::controller(TodoController::class)->group(function () {
    Route::get('todos', 'index');
    Route::post('todo', 'store');
    Route::get('todo/{id}', 'show');
    Route::put('todo/{id}', 'update');
    Route::delete('todo/{id}', 'destroy');
}); 

Route::controller(productController::class)->group(function () {
    Route::post('/test', "test");
       Route::get('/get_products/{id?}', "getProducts");

    Route::get('/products/{id?}', "getProducts");
    Route::get('/product_category/{id}', "getProductbyCategory");
    Route::get('/delete_product/{id}',"deleteProduct");
    Route::post('/add_update_product/{id?}', "addOrUpdateProduct");

   
}); 


