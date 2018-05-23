// Override Settings
var bcSfSearchSettings = {
    search: {
        //suggestionMode: 'test'
        //suggestionPosition: 'left'
    }
};

// Customize style of Suggestion box
BCSfFilter.prototype.customizeSuggestion = function(el) {
};

BCSfFilter.prototype.buildSuggestionWrapper = function(a) {
  var b = this.class.searchSuggestionWrapper;
  if (!jQ(a).parent().hasClass(b)) {
      jQ(a).wrap('<div class="' + b + '"></div>');
      jQ('#app-search').append(jQ('.' + b));
      
  }
}

BCSfFilter.prototype.beforeBuildSearchBox = function(a) {}, BCSfFilter.prototype.buildSearchBox = function(a) {
    var b = this;
    if (jQ(a).length > 0) {
        var c = getParam(this.searchTermKey);
        jQ(a).val(c), jQ(a).autocomplete({
            minLength: b.getSettingValue("search.suggestionMinLength"),
            source: function(a, c) {
                window.suggestionCallback = c, b.getSuggestionData(a.term, c)
            },
            classes: {
                "ui-autocomplete": b.class.searchSuggestion
            },
            focus: function() {
                return !1
            },
            open: function(c, d) {
                b.openSuggestionEvent(a)
            },
            close: function(c, d) {
                b.closeSuggestionEvent(a)
            },
            select: function(a, b) {
                return !1
            }
        }).on("click", function() {
            b.focusSearchBoxEvent(a)
            console.log('click')
        }).addClass(b.class.searchBox).attr("data-search-box", a), jQ(a).autocomplete("instance")._renderMenu = function(c, d) {
            c.attr("data-search-box", a);
            var e = encodeURIParamValue(this.term);
            return b.buildSuggestion(e, d, c)
        }, jQ(a).autocomplete("instance")._resizeMenu = function() {
            var c = this.menu.element,
                d = this.element;
            b.buildStyleSuggestion(c, d, a)
        }, b.clickOutsideSuggestionEvent(a)
        
        jQ('.search-close').on('click', function(e){
          e.stopPropagation();
          e.preventDefault();
          jQ(a).val('');
          $('.search-suggestions-alyx').show();
          
          jQ('.bc-sf-search-suggestion-wrapper ul').html('');
          setTimeout(function() {
              jQ(a).focus();
          });
        });
        
        jQ('.search-result-suggestion').on('click', function(e){
          e.preventDefault();
          jQ(a).val($(this).text());
          
          setTimeout(function() {
              jQ(a).focus();
              jQ(a).click();
          });
        });
    }
    this.setSuggestionPosition(a)
}


BCSfFilter.prototype.buildSuggestionPopular = function(a, b, c) {
    if (Object.keys(b).length > 0) {
        $('.search-suggestions-alyx').hide();
        var d = this.getSettingValue("search.suggestionPopularLimit"),
            e = this.getSettingValue("label.suggestion.popularHeader"),
            f = this.buildSuggestionHeader(e, "popular");
        for (var g in b)
            if (g < d) {
                var h = this.highlightSuggestionResult(b[g], a);
                f += '<li class="' + this.class.searchSuggestionItem + '" aria-label="' + this.escape(e) + ": " + this.escape(b[g]) + '">', f += '<a href="' + this.buildSearchLink(b[g]) + '">' + h + "</a>", f += "</li>"
            }
        
        if ( f != undefined) f = '<div class="suggestion-list-wrapper"><ul>' + f + '</ul></div>';
        return f
    }
    return ""
}

BCSfFilter.prototype.buildSuggestionProductList = function(a, b, c) {
    if (Object.keys(b).length > 0) {
        $('.search-suggestions-alyx').hide();
        var d = 20, //term results limit
            e = 20, //product results limit
            f = this.buildSuggestionHeader(e, "product"),
            g = 0;
        for (var h in b) {
            if (!(g < d)) break;
            var i = b[h];
            if (!1 === this.getSettingValue("search.productAvailable") || this.getSettingValue("search.productAvailable") && i.available) {
                var j = this.customizeSuggetionProductTitle(i.title, a, b);
                j = this.highlightSuggestionResult(j, a);
                var sku = null !== i.skus && i.skus.length > 0 ? i.skus[0] : "";
                    var str1 = sku.slice(0,2) + '-';
                    var str2 = sku.slice(2, 3) + '-';
                    var str3 = sku.slice(3,5) + '-';
                    var str4 = sku.length > 9 ? sku.slice(5,9) + '-' : sku.slice(5,9);
                    var str5 = sku.length > 9 ? sku.slice(9,10) + '-' : '';
                    var str6 = sku.length > 9 ? sku.slice(10, sku.length) : '';
                    var new_sku = str1 + str2 + str3 + str4 + str5 + str6;
                    
                var k = this.buildProductItemUrl(i, !1),
                    l = i.images_info.length > 0 ? this.optimizeImage(i.images_info[0].src, "large") : bcSfFilterConfig.general.no_image_url,
                    m = null !== i.skus && i.skus.length > 0 ? i.skus[0] : "",
                    n = this.class.searchSuggestion,
                    o = this.getSettingValue("search.openProductNewTab") ? 'target="_blank"' : "";
                f += '<li class="gallery-child list-num-' + h +' ' + this.class.searchSuggestionItem + " " + this.class.searchSuggestionItem + '-product" aria-label="' + this.escape(e) + ": " + this.escape(i.title) + '">', f += '<a class="gallery-inner-child" href="' + k + '" ' + o + ">", this.getSettingValue("search.showSuggestionProductImage") && (f += '<div class="' + n + '-left"><img src="' + l + '" /></div>'), f += '<div class="' + n + '-right">', f += '<div class="' + n + '-product-title">' + j + "</div>", this.getSettingValue("search.showSuggestionProductSku") && (f += '<div class="' + n + '-product-sku product-bardcode">' + new_sku + "</div>"), this.getSettingValue("search.showSuggestionProductVendor") && (f += '<div class="' + n + '-product-vendor">' + i.vendor + "</div>"), f += this.buildSuggestionProductPrice(i), f += "</div>", f += "</a>", f += "</li>", g++
            }
        }
        f = '<div class="gallery"><ul class="gallery-inner">' + f + '</ul></div>';
        return f
    }
    return ""
}