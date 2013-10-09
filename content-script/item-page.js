
console.log("item-page");

/* normalize URLs of item pages */
redirect(normalize_url_item(window.location.href));

cleanup_links_item();

/* do some pagae cleaning */
remove_elements_by_id([
    "merch_html_100040",
    "srp-rtm-placeholder"
]);

window.setTimeout(function() { cleanup_links_item()}, 2000);
