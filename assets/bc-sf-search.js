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
      jQ('#app-search').append(jQ('.' + b))
      jQ('#app-search').append('test');
      console.log(jQ(b));
      //var c = this.getSettingValue("search.suggestionPosition");
      //jQ(a).parent().prepend('<div class="bc-sf-search-suggestion-popover" data-direction="' + c + '"></div>')
  }
}

BCSfFilter.prototype.buildSuggestionProductList = function(a, b, c) {
    if (Object.keys(b).length > 0) {
        var d = this.getSettingValue("search.suggestionProductLimit"),
            e = this.getSettingValue("label.suggestion.productHeader"),
            f = this.buildSuggestionHeader(e, "product"),
            g = 0;
        for (var h in b) {
            if (!(g < d)) break;
            var i = b[h];
            if (!1 === this.getSettingValue("search.productAvailable") || this.getSettingValue("search.productAvailable") && i.available) {
                var j = this.customizeSuggetionProductTitle(i.title, a, b);
                j = this.highlightSuggestionResult(j, a);
                var k = this.buildProductItemUrl(i, !1),
                    l = i.images_info.length > 0 ? this.optimizeImage(i.images_info[0].src, "medium") : bcSfFilterConfig.general.no_image_url,
                    m = null !== i.skus && i.skus.length > 0 ? i.skus[0] : "",
                    n = this.class.searchSuggestion,
                    o = this.getSettingValue("search.openProductNewTab") ? 'target="_blank"' : "";
                f += '<li class="list-num-' + h +' ' + this.class.searchSuggestionItem + " " + this.class.searchSuggestionItem + '-product" aria-label="' + this.escape(e) + ": " + this.escape(i.title) + '">', f += '<a href="' + k + '" ' + o + ">", this.getSettingValue("search.showSuggestionProductImage") && (f += '<div class="' + n + '-left"><img src="' + l + '" /></div>'), f += '<div class="' + n + '-right">', f += '<div class="' + n + '-product-title">' + j + "</div>", this.getSettingValue("search.showSuggestionProductSku") && (f += '<div class="' + n + '-product-sku">' + m + "</div>"), this.getSettingValue("search.showSuggestionProductVendor") && (f += '<div class="' + n + '-product-vendor">' + i.vendor + "</div>"), f += this.buildSuggestionProductPrice(i), f += "</div>", f += "</a>", f += "</li>", g++
            }
        }
        return f
    }
    return ""
}

console.log(BCSfFilter.prototype)