var regexp_url_item = [
    new RegExp('https://www.ebay.(de|com|ch|co.uk)/c/[0-9]+#oid([0-9]+).*'),
    new RegExp('https://www.ebay.(de|com|ch|co.uk)/itm/.*/([0-9]+).*'),
    new RegExp('https://www.ebay.(de|com|ch|co.uk)/itm/([0-9]+)\?.*')
];

var regexp_url_seller_items = [
    new RegExp('https://www.ebay.(de|com|ch|co.uk)/sch/(.*)/m.html\?.*'),
    new RegExp('https://www.ebay.(de|com|ch|co.uk)/sch/(.*)/m.html'),
];


function node_getElementsByClassName(node,searchClass)
{
    if (node.getElementsByClassName) // use native implementation if available
        return node.getElementsByClassName(searchClass);

    var classElements = [],
    els = node.getElementsByTagName("*"),
    elsLen = els.length,
    pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)"), i, j;
    for (i = 0, j = 0; i < elsLen; i++) {
        if ( pattern.test(els[i].className) ) {
            classElements[j] = els[i];
            j++;
        }
    }

    return classElements;
}

function redirect(new_url) {
    if (new_url == window.location.href)
        return false;

    window.location.href = new_url;
    return true;
}

function mkurl_user_items(tld, username) {
    return 'https://www.ebay.'+tld+'/sch/'+username+'/m.html';
}

/* create a link to an auction item */
/* NOTE: due to ebay's recent misfeature which automatically redirects
 *       to some completely unrelated auction once the actual is closed,
 *       we have to add a special parameter for preventing this shit
 */
function mkurl_item(tld, id) {
    return "https://www.ebay."+tld+"/itm/"+id+"?nordt=true";
}

function match_current_url(re) {
    return window.location.href.match(new RegExp(re));
}

function normalize_url_item(url) {
    for (re of regexp_url_item) {
        if (m = url.match(re)) {
            return mkurl_item(m[1],m[2]);
        }
    }

    return url;
}

function normalize_url_seller_items(url) {
    for (re of regexp_url_seller_items) {
        if (m = url.match(re)) {
            return mkurl_user_items(m[1],m[2]);
        }
    }

    return url;
}

function cleanup_links_item() {
    for (e of document.querySelectorAll("a[href^='https://www.ebay.de/itm/']")) {
        console.log("22 found item link: "+e.href);
        e.href = normalize_url_item(e.href);
        e.target = "_blank";
    }
}

function cleanup_links_seller_items() {
    for (e of document.querySelectorAll("a[href^='https://www.ebay.de/sch/']")) {
        e.href = normalize_url_item(e.href);
        e.target = "_blank";
    }
}

function remove_elements_by_id(ids) {
    console.log("remove_elements_by_id");
    for (id of ids) {
        console.log("cleaning by id: "+id);
        var element = document.getElementById(id);
        if (element != null) {
            console.log("clean: found item ...");
            element.parentNode.removeChild(element);
        }
    }
}
