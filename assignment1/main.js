$('.btn-number').click(function(e) {
	e.preventDefault();
    
	var fieldName = $(this).attr('data-field');
	console.log('fieldName: ' + fieldName);
	var type = $(this).attr('data-type');
	var input = $("input[name='" + fieldName + "']");
	var currentVal = Number(input.val());
	
	var itemName = $(this).parent().parent().siblings('.card-block').children('.card-title').text();
	var itemPrice = $(this).parent().parent().siblings('.card-block').children('.card-subtitle').text().substring(1);
	var currentQty = 0;
	
	if (!isNaN(currentVal)) {
		if (type == 'minus') {            
			if (currentVal > input.attr('min')) {
				currentQty = currentVal - 1;
				input.val(currentQty).change();
				
				if ($('#order-list p[name="' + fieldName + '"]').length) {
					$('#order-list p[name="' + fieldName + '"] .qty').text(currentQty);
					$('#order-list p[name="' + fieldName + '"] .price').text('$' + Number(currentQty * itemPrice).toFixed(2));
				} else {
					// add item into order list
					$('#order-list .card-block').append('<p class="row" name="' + fieldName + '"></p>');
					$('#order-list .card-block p:last-child').append('<span class="col-6">' + itemName 
						+ '</span><span class="col qty">' + currentQty + '</span><span class="col price">$' + Number(itemPrice).toFixed(2) + '</span>');
				}
			} 
			if (Number(input.val()) == input.attr('min')) {
				$(this).attr('disabled', true);
				
				// remove item from order list
				if ($('#order-list p[name="' + fieldName + '"]') != null) {
					$('#order-list p[name="' + fieldName + '"]').remove();
				}
			}
		} else if (type == 'plus') {
			if (currentVal < input.attr('max')) {
				currentQty = currentVal + 1;
				input.val(currentQty).change();			
					
				if ($('#order-list p[name="' + fieldName + '"]').length) {
					$('#order-list p[name="' + fieldName + '"] .qty').text(currentQty);
					$('#order-list p[name="' + fieldName + '"] .price').text('$' + Number(currentQty * itemPrice).toFixed(2));
				} else {
					// add item into order list
					$('#order-list .card-block').append('<p class="row" name="' + fieldName + '"></p>');
					$('#order-list .card-block p:last-child').append('<span class="col-6">' + itemName 
						+ '</span><span class="col qty">' + currentQty + '</span><span class="col price">$' + Number(itemPrice).toFixed(2) + '</span>');
				}
			}
			if (Number(input.val()) == input.attr('max')) {
				$(this).attr('disabled', true);
			}
		}
		
		// total count
		var sum = 0;
		$('.price').each(function() {
			sum += Number($(this).text().substring(1));
			console.log('sum: ' + sum);
		});
		$('#total').text('$' + sum.toFixed(2));
	} else {
		input.val(0);
	}
});

$('.input-number').focusin(function(){
   $(this).data('oldValue', $(this).val());
});

$('.input-number').change(function() {    
	var minValue =  Number($(this).attr('min'));
	var maxValue =  Number($(this).attr('max'));
	var valueCurrent = Number($(this).val());
	var qty = $(this).val();

	fieldName = $(this).attr('name');
	if (valueCurrent >= minValue) {
	  $(".btn-number[data-type='minus'][data-field='" + fieldName + "']").removeAttr('disabled');	  
	} else {
	  alert('Sorry, the minimum value was reached');
	  $(this).val($(this).data('oldValue'));
	}
	
	if (valueCurrent <= maxValue) {
	  $(".btn-number[data-type='plus'][data-field='" + fieldName + "']").removeAttr('disabled')
	} else {
	  alert('Sorry, the maximum value was reached');
	  $(this).val($(this).data('oldValue'));
	}    
});

$('#order-list button').click(function() {
	if ($(this).siblings('.card-block').children().length) {
		// clear data
		$('#confirmModal .modal-body').empty();
		$('#confirmModal button.success').show();
		// display new data
		$('#order-list > .card-block p').clone().appendTo('#confirmModal .modal-body');
		$('#order-list > .card-footer').clone().appendTo('#confirmModal .modal-body');
		$('#confirmModal').modal('show');
	} else {
		$('#warningModal').modal('show');
	}
}); 

$('#confirmModal button.success').click(function() {
	// clear data
	$('#confirmModal .modal-body').empty();
	// display new data
	$('#confirmModal .modal-body').text('Order no: ' +  parseInt((Math.random() * 10000), 10));
	$('#confirmModal button.success').hide();
}); 