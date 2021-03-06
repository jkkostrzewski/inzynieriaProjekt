package com.engineering.shop.products;

import com.engineering.shop.categories.Category;
import lombok.*;
import org.springframework.hateoas.RepresentationModel;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Set;


@Entity
@Builder(access = AccessLevel.PUBLIC)
@EqualsAndHashCode(callSuper = false)
@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
public class Product extends RepresentationModel<Product> {
    @Singular
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "CATEGORIES_PRODUCTS",
            joinColumns = {@JoinColumn(name = "product_id")},
            inverseJoinColumns = {@JoinColumn(name = "category_id")})
    private Set<Category> categories;
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private Integer id;
    private String name;
    private String description;
    private Integer mainCategoryId;
    private BigDecimal price;
    private String reference;
    private String isbn;
    private String ean13;
    private boolean active;
    private Integer mainImage;
}
