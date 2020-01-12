package com.engineering.shop.cart.order;


import com.engineering.shop.cart.Exceptions.BucketException;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;



import java.util.Optional;

@RestController
@RequestMapping("/order")
public class OrderController {

    private OrderRepo orderRepo;
    private OrderPOJOtoOrder orderPOJOtoOrder;

    @Autowired
    public OrderController(OrderRepo orderRepo, OrderPOJOtoOrder orderPOJOtoOrder) {
        this.orderRepo = orderRepo;
        this.orderPOJOtoOrder = orderPOJOtoOrder;
    }

    @PostMapping("/addOrder")
    public void addOrder(@RequestBody OrderPOJO orderPOJO){
        Order order = orderPOJOtoOrder.transform(orderPOJO);
        orderRepo.save(order);
    }

    @GetMapping("/all")
    public Iterable<Order> getAll(){
        return orderRepo.findAll();
    }

    @GetMapping(path="{id}")
    public Order getById(@PathVariable("id") Integer id) {
        Optional<Order> optOrder = Optional.ofNullable(orderRepo.findById(id)).orElseThrow(()-> new BucketException("Order not found with provided  id"));
        return optOrder.get();
    }

    @PutMapping("update/{id}")
    public void updateOrder(@PathVariable("id") Integer id
                                            ,@RequestBody OrderPOJO orderPOJO) {
       Order order = orderPOJOtoOrder.transform(orderPOJO);
       orderRepo.save(order);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteById(@PathVariable("id") Integer id){
        orderRepo.deleteById(id);
    }


}
