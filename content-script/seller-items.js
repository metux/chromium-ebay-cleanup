
console.log("seller-items");

/* normalize URLs of seller's item list pages */
redirect(normalize_url_seller_items(window.location.href));

/* cleanup the links to items */
cleanup_links_item();

/* do some pagae cleaning */
remove_elements_by_id([
    "head",
    "Foot",
    "Top",
    "merch_html_100040",
    "srp-rtm-placeholder",
    "glbfooter"
]);
