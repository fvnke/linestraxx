// Override Settings
var bcSfFilterSettings = {
    general: {
        limit: 50,
        /* Optional */
        loadProductFirst: false,
    }
};


/*
<div class="grid-item gallery-child product-item third">
  <div class="gallery-inner-child">
  <a href="/collections/man-trousers/products/waxed-elastic-band-short">
    <div class="item-image mh-image">
        <img src="//cdn.shopify.com/s/files/1/0007/2918/6359/products/AAMSO0007-1_084afdcd-8de1-4d91-b0b1-87b293c4d1ad_1024x.jpg?v=1525341335" alt="WAXED ELASTIC BAND SHORT">	
    </div>
    <div class="item-details mh-details">
		    <span class="product-barcode">AAMSO0007001</span>
	    <h3 class="product-title">WAXED ELASTIC BAND SHORT</h3>
	    <span class="product-price">  
	      <span class="money" data-currency-eur="€324,00" data-currency-aud="$509.02 AUD" data-currency="AUD">$509.02 AUD</span>
	    </span>
    </div>
    
  </a>
  </div>
</div>

    // Grid Template
    'productGridItemHtml': '<div class="grid-item gallery-child product-item third {{soldOutClass}} {{saleClass}}">' +
                                '<div class="gallery-inner-child">' +
                                    '<a href="{{itemUrl}}" class="grid-link">' +
                                        '<div class="item-image mh-image">' +
                                          '<img src="{{itemThumbUrl}}" alt="{{itemTitle}}" />' +
                                        '</div>' +
                                        '<div class="item-details mh-details">' +
                                            '<h3 class="product-title">{{itemTitle}}</h3>'
                                            '<span class="product-price">{{itemPrice}}</span>' +
                                        '</div>' +
                                    '</a>' +
                                '</div>' +
                            '</div>',

    // Grid Template
    'productGridItemHtml': '<div class="grid-item gallery-child product-item third {{soldOutClass}} {{saleClass}}">' +
                                '<div class="gallery-inner-child">' +
                                    '<a href="{{itemUrl}}" class="grid-link">' +
                                        '<div class="item-image mh-image">' +
                                        '<span class="grid-link__image grid-link__image--product">' +
                                            '{{itemSaleLabel}}' +
                                            '{{itemSoldOutLabel}}' +
                                            '<span class="grid-link__image-centered"><img src="{{itemThumbUrl}}" alt="{{itemTitle}}" /></span>' +
                                        '</span>' +
                                        '<p class="grid-link__title">{{itemTitle}}</p>' +
                                        '{{itemVendor}}' +
                                        '{{itemPrice}}' +
                                    '</a>' +
                                '</div>' +
                            '</div>',

    'soldOutClass': 'sold-out',
    'saleClass': 'on-sale',
    'soldOutLabelHtml': '<span class="badge"><span>' + bcSfFilterConfig.label.sold_out + '</span></span>',
    'saleLabelHtml': '<span class="badge"><span>' + bcSfFilterConfig.label.sale + '</span></span>',
    'vendorHtml': '<div>{{itemVendorLabel}}</div>',
*/


// Declare Templates
var bcSfFilterTemplate = {
    'soldOutClass': 'sold-out',
    'saleClass': 'on-sale',
    'soldOutLabelHtml': '<span class="badge"><span>Sold Out</span></span>',
    'saleLabelHtml': '<span class="badge"><span>Sale</span></span>',
    'vendorHtml': '<div>{{itemVendorLabel}}</div>',

    // Grid Template
    'productGridItemHtml': '<div class="grid-item gallery-child product-item third {{soldOutClass}} {{saleClass}}">' +
                                '<div class="gallery-inner-child">' +
                                    '<a href="{{itemUrl}}" class="grid-link">' +
                                        '<div class="item-image mh-image">' +
                                          '<img src="{{itemThumbUrl}}" alt="{{itemTitle}}" />' +
                                        '</div>' +
                                        '<div class="item-details mh-details">' +
                                            '<span class="product-barcode">{{itemSku}}</span>' +
                                            '{{itemSaleLabel}}' +
                                            '{{itemSoldOutLabel}}' +
                                            '<h3 class="product-title">{{itemTitle}}</h3>' +
                                            '<span class="product-price">{{itemPrice}}</span>' +
                                        '</div>' +
                                    '</a>' +
                                '</div>' +
                            '</div>',

    // Pagination Template
    'previousActiveHtml': '<li><a href="{{itemUrl}}">&larr;</a></li>',
    'previousDisabledHtml': '<li class="disabled"><span>&larr;</span></li>',
    'nextActiveHtml': '<li><a href="{{itemUrl}}">&rarr;</a></li>',
    'nextDisabledHtml': '<li class="disabled"><span>&rarr;</span></li>',
    'pageItemHtml': '<li><a href="{{itemUrl}}">{{itemTitle}}</a></li>',
    'pageItemSelectedHtml': '<li><span class="active">{{itemTitle}}</span></li>',
    'pageItemRemainHtml': '<li><span>{{itemTitle}}</span></li>',
    'paginateHtml': '<ul class="pagination-custom">{{previous}}{{pageItems}}{{next}}</ul>',
  
    // Sorting Template
    'sortingHtml': '<label class="label--hidden">' + bcSfFilterConfig.label.sorting + '</label><select class="collection-sort__input">{{sortingItems}}</select>',
};

/************************** BUILD PRODUCT LIST **************************/

// Build Product Grid Item
BCSfFilter.prototype.buildProductGridItem = function(data, index) {
    /*** Prepare data ***/
    var images = data.images_info;
    data.price_min *= 100, data.price_max *= 100, data.compare_at_price_min *= 100, data.compare_at_price_max *= 100; // Displaying price base on the policy of Shopify, have to multiple by 100
    var soldOut = !data.available; // Check a product is out of stock
    var onSale = data.compare_at_price_min > data.price_min; // Check a product is on sale
    var priceVaries = data.price_min != data.price_max; // Check a product has many prices
    // Get First Variant (selected_or_first_available_variant)
    var firstVariant = data['variants'][0];
    
    if (getParam('variant') !== null && getParam('variant') != '') {
        var paramVariant = data.variants.filter(function(e) { return e.id == getParam('variant'); });
        if (typeof paramVariant[0] !== 'undefined') firstVariant = paramVariant[0];
    } else {
        for (var i = 0; i < data['variants'].length; i++) {
            if (data['variants'][i].available) {
                firstVariant = data['variants'][i];
                break;
            }
        }
    }
    
    //AAUBA0001001
    //AA-U-SS-0017-0-02
    //AAMSH0009001
    var sku = firstVariant.sku;
    var str1 = sku.slice(0,2) + '-';
    var str2 = sku.slice(2, 3) + '-';
    var str3 = sku.slice(3,5) + '-';
    var str4 = sku.slice(5,9) + '-';
    var str5 = sku.slice(9,10) + '-';
    var str6 = sku.slice(10, sku.length);
    var new_sku = str1 + str2 + str3 + str4 + str5 + str6;
 
    /*** End Prepare data ***/

    // Get Template
    var itemHtml = bcSfFilterTemplate.productGridItemHtml;

    // Add Thumbnail
    var itemThumbUrl = images.length > 0 ? this.optimizeImage(images[0]['src']) : bcSfFilterConfig.general.no_image_url;
    itemThumbUrl = itemThumbUrl.split('large').join('1024x')
    itemHtml = itemHtml.replace(/{{itemThumbUrl}}/g, itemThumbUrl);

    // Add Price
    var itemPriceHtml = '';
    if (data.title != '')  {
        itemPriceHtml += '<p class="grid-link__meta">';
        if (onSale) {
            itemPriceHtml += '<s class="grid-link__sale_price">' + this.formatMoney(data.compare_at_price_min) + '</s> ';
        }
        if (priceVaries) {
         //   itemPriceHtml += (bcSfFilterConfig.label.from_price).replace(/{{ price }}/g, this.formatMoney(data.price_min));
          itemPriceHtml += this.formatMoney(data.price_min);
        } else {
            itemPriceHtml += this.formatMoney(data.price_min);
        }
        itemPriceHtml += '</p>';
    }
    itemHtml = itemHtml.replace(/{{itemPrice}}/g, itemPriceHtml);

    // Add soldOut class
    var soldOutClass = soldOut ? bcSfFilterTemplate.soldOutClass : '';
    itemHtml = itemHtml.replace(/{{soldOutClass}}/g, soldOutClass);
  
    // Add onSale class
    var saleClass = onSale ? bcSfFilterTemplate.saleClass : '';
    itemHtml = itemHtml.replace(/{{saleClass}}/g, saleClass);
  
    // Add soldOut Label
    var itemSoldOutLabelHtml = soldOut ? bcSfFilterTemplate.soldOutLabelHtml : '';
    itemHtml = itemHtml.replace(/{{itemSoldOutLabel}}/g, itemSoldOutLabelHtml);

    // Add onSale Label
    var itemSaleLabelHtml = onSale ? bcSfFilterTemplate.saleLabelHtml : '';
    itemHtml = itemHtml.replace(/{{itemSaleLabel}}/g, itemSaleLabelHtml);

    // Add Vendor
    var itemVendorHtml = bcSfFilterConfig.custom.vendor_enable ? bcSfFilterTemplate.vendorHtml.replace(/{{itemVendorLabel}}/g, data.vendor) : '';
    itemHtml = itemHtml.replace(/{{itemVendor}}/g, itemVendorHtml);
    
    // Add SKU
    var itemSkuHtml = new_sku;
    itemHtml = itemHtml.replace(/{{itemSku}}/g, itemSkuHtml);

    // Add main attribute (Always put at the end of this function)
    itemHtml = itemHtml.replace(/{{itemId}}/g, data.id);
    itemHtml = itemHtml.replace(/{{itemHandle}}/g, data.handle);
    itemHtml = itemHtml.replace(/{{itemTitle}}/g, data.title);
    itemHtml = itemHtml.replace(/{{itemUrl}}/g, this.buildProductItemUrl(data));

    return itemHtml;
};

// Build Product List Item
BCSfFilter.prototype.buildProductListItem = function(data) {
    // // Add Description
    // var itemDescription = jQ('<p>' + data.body_html + '</p>').text();
    // // Truncate by word
    // itemDescription = (itemDescription.split(" ")).length > 51 ? itemDescription.split(" ").splice(0, 51).join(" ") + '...' : itemDescription.split(" ").splice(0, 51).join(" ");
    // // Truncate by character
    // itemDescription = itemDescription.length > 350 ? itemDescription.substring(0, 350) + '...' : itemDescription.substring(0, 350);
    // itemHtml = itemHtml.replace(/{{itemDescription}}/g, itemDescription);
};

// Customize data to suit the data of Shopify API
BCSfFilter.prototype.prepareProductData = function(data) {
    for (var k in data) {
        // Featured image
        if (data['images_info'] > 0) {
            data[k]['featured_image'] = data['images_info'][0];
        } else {
            data[k]['featured_image'] = {width: '', height: '', aspect_ratio: 0}
        }

        // Add Options
        var optionsArr = [];
        for (var i in data[k]['options_with_values']) {
            optionsArr.push(data[k]['options_with_values'][i]['name']);
        }
        data[k]['options'] = optionsArr;

        // Customize variants
        for (var i in data[k]['variants']) {
            var variantOptionArr = [];
            var count = 1;
            var variant = data[k]['variants'][i];
            // Add Options
            var variantOptions = variant['merged_options'];
            if (Array.isArray(variantOptions)) {
                for (var j = 0; j < variantOptions.length; j++) {
                    var temp = variantOptions[j].split(':');
                    data[k]['variants'][i]['option' + (parseInt(j) + 1)] = temp[1];
                    data[k]['variants'][i]['option_' + temp[0]] = temp[1];
                    variantOptionArr.push(temp[1]);
                }
                data[k]['variants'][i]['options'] = variantOptionArr;
            }
            data[k]['variants'][i]['compare_at_price'] = parseFloat(data[k]['variants'][i]['compare_at_price']) * 100;
            data[k]['variants'][i]['price'] = parseFloat(data[k]['variants'][i]['price']) * 100;
        }

        // Add Description
        data[k]['description'] = data[k]['body_html'];
    }
    return data;
};

/************************** END BUILD PRODUCT LIST **************************/

// Build Pagination
BCSfFilter.prototype.buildPagination = function(totalProduct) {
    if (this.getSettingValue('general.paginationType') == 'default') {
        // Get page info
        var currentPage = parseInt(this.queryParams.page);
        var totalPage = Math.ceil(totalProduct / this.queryParams.limit);

        // If it has only one page, clear Pagination
        if (totalPage == 1) {
            jQ(this.selector.bottomPagination).html('');
            return false;
        }

        if (this.getSettingValue('general.paginationType') == 'default') {
            var paginationHtml = bcSfFilterTemplate.paginateHtml;

            // Build Previous
            var previousHtml = (currentPage > 1) ? bcSfFilterTemplate.previousActiveHtml : bcSfFilterTemplate.previousDisabledHtml;
            previousHtml = previousHtml.replace(/{{itemUrl}}/g, this.buildToolbarLink('page', currentPage, currentPage - 1));
            paginationHtml = paginationHtml.replace(/{{previous}}/g, previousHtml);

            // Build Next
            var nextHtml = (currentPage < totalPage) ? bcSfFilterTemplate.nextActiveHtml :  bcSfFilterTemplate.nextDisabledHtml;
            nextHtml = nextHtml.replace(/{{itemUrl}}/g, this.buildToolbarLink('page', currentPage, currentPage + 1));
            paginationHtml = paginationHtml.replace(/{{next}}/g, nextHtml);

            // Create page items array
            var beforeCurrentPageArr = [];
            for (var iBefore = currentPage - 1; iBefore > currentPage - 3 && iBefore > 0; iBefore--) {
                beforeCurrentPageArr.unshift(iBefore);
            }
            if (currentPage - 4 > 0) {
                beforeCurrentPageArr.unshift('...');
            }
            if (currentPage - 4 >= 0) {
                beforeCurrentPageArr.unshift(1);
            }
            beforeCurrentPageArr.push(currentPage);

            var afterCurrentPageArr = [];
            for (var iAfter = currentPage + 1; iAfter < currentPage + 3 && iAfter <= totalPage; iAfter++) {
                afterCurrentPageArr.push(iAfter);
            }
            if (currentPage + 3 < totalPage) {
                afterCurrentPageArr.push('...');
            }
            if (currentPage + 3 <= totalPage) {
                afterCurrentPageArr.push(totalPage);
            }

            // Build page items
            var pageItemsHtml = '';
            var pageArr = beforeCurrentPageArr.concat(afterCurrentPageArr);
            for (var iPage = 0; iPage < pageArr.length; iPage++) {
                if (pageArr[iPage] == '...') {
                    pageItemsHtml += bcSfFilterTemplate.pageItemRemainHtml;
                } else {
                    pageItemsHtml += (pageArr[iPage] == currentPage) ? bcSfFilterTemplate.pageItemSelectedHtml : bcSfFilterTemplate.pageItemHtml;
                }
                pageItemsHtml = pageItemsHtml.replace(/{{itemTitle}}/g, pageArr[iPage]);
                pageItemsHtml = pageItemsHtml.replace(/{{itemUrl}}/g, this.buildToolbarLink('page', currentPage, pageArr[iPage]));
            }
            paginationHtml = paginationHtml.replace(/{{pageItems}}/g, pageItemsHtml);

            jQ(this.selector.bottomPagination).html(paginationHtml);
        }
    }
};

/************************** BUILD TOOLBAR **************************/

// Build Sorting
BCSfFilter.prototype.buildFilterSorting = function() {
    if (bcSfFilterTemplate.hasOwnProperty('sortingHtml')) {
        jQ(this.selector.topSorting).html('');

        var sortingArr = this.getSortingList();
        if (sortingArr) {
            // Build content 
            var sortingItemsHtml = '';
            for (var k in sortingArr) {
                sortingItemsHtml += '<option value="' + k +'">' + sortingArr[k] + '</option>';
            }
            var html = bcSfFilterTemplate.sortingHtml.replace(/{{sortingItems}}/g, sortingItemsHtml);
            jQ(this.selector.topSorting).html(html);

            // Set current value
            jQ(this.selector.topSorting + ' select').val(this.queryParams.sort);
        }
    }
  
  if("undefined" != typeof checkShopifyFormatMoney){
  $m("<style type=\"text/css\">span.money{ display: none; }</style>").appendTo("head");
  checkShopifyFormatMoney();
  }
};

// Build Display type (List / Grid / Collage)
// BCSfFilter.prototype.buildFilterDisplayType = function() {
//     var itemHtml = '<a href="' + this.buildToolbarLink('display', 'list', 'grid') + '" title="Grid view" class="change-view bc-sf-filter-display-grid" data-view="grid"><span class="icon-fallback-text"><i class="fa fa-th" aria-hidden="true"></i><span class="fallback-text">Grid view</span></span></a>';
//     itemHtml += '<a href="' + this.buildToolbarLink('display', 'grid', 'list') + '" title="List view" class="change-view bc-sf-filter-display-list" data-view="list"><span class="icon-fallback-text"><i class="fa fa-list" aria-hidden="true"></i><span class="fallback-text">List view</span></span></a>';
//     jQ(this.selector.topDisplayType).html(itemHtml);

//     // Active current display type
//     jQ(this.selector.topDisplayType).find('.bc-sf-filter-display-list').removeClass('active');
//     jQ(this.selector.topDisplayType).find('.bc-sf-filter-display-grid').removeClass('active');
//     if (this.queryParams.display == 'list') {
//         jQ(this.selector.topDisplayType).find('.bc-sf-filter-display-list').addClass('active');
//     } else if (this.queryParams.display == 'grid') {
//         jQ(this.selector.topDisplayType).find('.bc-sf-filter-display-grid').addClass('active');
//     }
// };

/************************** END BUILD TOOLBAR **************************/

// Add additional feature for product list, used commonly in customizing product list
BCSfFilter.prototype.buildExtrasProductList = function(data, eventType) {};

// Build additional elements
BCSfFilter.prototype.buildAdditionalElements = function(data, eventType) {};