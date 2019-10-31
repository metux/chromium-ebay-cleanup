
console.log("item-page");

/* normalize URLs of item pages */
newurl = normalize_url_item(window.location.href);

if (newurl == window.location.href) {
    /* do some pagae cleaning */
    remove_elements_by_id([
        "merch_html_100040",
        "srp-rtm-placeholder",
        "scandal100727",
    ]);

    cleanup_links_item();
    window.setTimeout(function() { cleanup_links_item()}, 2000);
}
else
{
    redirect(newurl);
}
