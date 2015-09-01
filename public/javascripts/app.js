$(document).ready(function() {
////access the list of customers - make an AJAX call

//get our content UL
    var $results=$('#customer');

    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: '/customers'
    }).done(function(data){//.done is the same as success
 //for each customer, create an LI with their name in a p tag
        data.forEach(function(elem){
                var $li=$('<li>', {id: elem.id});
                var $p=$('<p>');
                $p.text('Customer: ' + elem.firstName + ' ' + elem.lastName + ' id: ' + elem.id);
                $li.append($p);
                $results.append($li);

            // go get their shipping address
            getShipping(elem.id);
        });
    }).fail(function (jqXHR, textStatus, errorThrown) {
        // same as error
        console.log('There was an error: ', errorThrown);
    }).always(function () {
        // same as complete
        console.log('Ajax Complete!');
    });

    function getShipping(id) {
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: '/shipping/' + id
        }).done(function (data) {

            // find what the parrent LI is by ID
            var $parentLi = $('#' + id);

            // create a new UL with the id set to "shipping" plus the customer ID
            var $ul = $('<ul>', {id: 'shipping' + id});
            var $p = $('<p>');
            $p.text('Shipping Address:');
            $ul.append($p);

            // if there is no shipping address, then don't add the data. Save that for later.
            if (data != null) {

                appendData($ul, data);
            }

            $parentLi.append($ul);

            // now go get the billing address
            getBilling(id, data != null);

        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.log('There was an error: ', errorThrown);
        }).always(function () {
            console.log('Ajax Complete!');
        });
    }

    function getBilling(id, hasShipping) {
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: '/billing/' + id
        }).done(function (data) {

            // gets the customer's UL by ID
            var $parentLi = $('#' + id);

            // create a new UL with id set to "billing" plus the customer ID
            var $ul = $('<ul>', {id: 'billing' + id});
            var $p = $('<p>');
            $p.text('Billing Address:');
            $ul.append($p);

            // add the billing data
            appendData($ul, data);

            // if there is no shipping address, use the billing as the shipping.
            if (!hasShipping) {
                var $shippingUl = $('#shipping' + id);
                appendData($shippingUl, data);
            }

            $parentLi.append($ul);


        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.log('There was an error: ', errorThrown);
        }).always(function () {
            console.log('Ajax Complete!');
        });
    }

    // a helper function that appends the given data to the given UL element
    function appendData($ul, data) {

        var $address = $('<li>');
        $address.text('Address: ' + data.addressLine1);
        $ul.append($address);

        var $address2 = $('<li>');
        $address2.text('Address 2: ' + data.addressLine2);
        $ul.append($address2);

        var $city = $('<li>');
        $city.text('City: ' + data.city);
        $ul.append($city);

        var $state = $('<li>');
        $state.text('state: ' + data.state);
        $ul.append($state);

        var $zip = $('<li>');
        $zip.text('Zipcode: ' + data.zip);
        $ul.append($zip);

        var $phone = $('<li>');
        $phone.text('Phone: ' + data.phoneNumber);
        $ul.append($phone);
    }
});