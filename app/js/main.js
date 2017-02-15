$(document).ready(function() {

	// массив классов-состояний + предполагаемое количество классов
	var brainCond = [],
		brainCondLength = 5;

	// цикл для заполнения массива
	for(var i=0; i<brainCondLength; i++) {
		brainCond.push('brain-condition-' + (i+1));
		if (i==(brainCondLength-1)) {
			brainCond.push('brain-condition-error');
		}
	}

	// добавление класса нужному блоку по клику + проверка, если активен radio-button
	$('.js-brainLine ol li').click(function() {
		var condNum = $(this).index();
		$('.brain_use-info').removeClass(brainCond.join(' ')).addClass(brainCond[condNum]);
		if (condNum !== (brainCondLength-1)) {
			$('.js-brainCheck input').prop('checked', false);
		}
		else {
			$('.js-brainCheck input[value="2"]').prop('checked', true);
		}
	});
	// добавление классов через radio-button
	$('.js-brainCheck input').click(function() {
		var brainCheck = $('.js-brainCheck input[name=brain-check]:checked').val();
		if(brainCheck == 1){
			$('.brain_use-info').removeClass(brainCond.join(' ')).addClass(brainCond[brainCondLength]);
		}
		else{
			if(brainCheck == 2) {
				$('.brain_use-info').removeClass(brainCond.join(' ')).addClass(brainCond[brainCondLength-1]);
			}
			else {
				return false;
			}
		}
	});

	// листинг секции с диаграммой
	var diagItem = 0,
		diagInt = setInterval(function() {
		$('.js-diagramPoint ul li').eq(diagItem).find('input').prop('checked', true);
		diagItem ++;
		if(diagItem==10) {
			diagItem=0;
		};
	}, 360
	);
	$('.js-diagramPoint ul li input').click(function() {
		clearInterval(diagInt);
		var diagNum = $(this).parent('li').find('input[name=diagram-radio]:checked').val();

		if($('.js-diagramList ul li').eq(diagNum-1).hasClass('fadeIn')) {
			return false;
		}
		else {
			if($('.js-diagramList ul li').hasClass('fadeIn')) {
				$('.js-diagramList ul .fadeIn').addClass('fadeOut');
				setTimeout(function() {
					$('.js-diagramList ul .fadeOut').removeClass('fadeIn fadeOut');
					$('.js-diagramList ul li').eq(diagNum-1).addClass('fadeIn');
				}, 400);
			}
			else {
				$('.js-diagramList ul li').eq(diagNum-1).addClass('fadeIn');
			}
		}
	});

	// секция с зп
	var salMonth = 500,
		salHour = Math.round(salMonth/800)*5,
		salOnce = Math.round(salMonth*0.003)*500;
		$('.js-salalry-month').text(salMonth);
		$('.js-salalry-hour').text(salHour);
		$('.js-salalry-once').text(salOnce);
	$('.js-salary-check').find('input').click(function() {
		if($(this).is(':checked')) {
			salMonth = salMonth + $(this).data('salary');
			$(this).parent('li').addClass('active');
		}
		else {
			salMonth = salMonth - $(this).data('salary');
			$(this).parent('li').removeClass('active');
		}
		salHour = Math.round(salMonth/800)*5;
		salOnce = Math.round(salMonth*0.003)*500;
		$('.js-salalry-month').text(salMonth);
		$('.js-salalry-hour').text(salHour);
		$('.js-salalry-once').text(salOnce);
		if(salMonth<1200) {
			$('.js-marks').find('.active').removeClass('active');
			$('.js-marks').find('figure').eq(1).addClass('active');
		}
		else {
			if(salMonth>=1200 && salMonth<8000) {
				$('.js-marks').find('.active').removeClass('active');
				$('.js-marks').find('figure').eq(2).addClass('active');
			}
			else {
				if(salMonth>=8000) {
					$('.js-marks').find('.active').removeClass('active');
					$('.js-marks').find('figure').eq(0).addClass('active');
				}
				else {
					return false;
				}
			}
		}
	});

	// waypoints
	$('.js-salary-section').waypoint({
		handler: function(direction) {
			$('.js-salary-info').toggleClass('fixed');
		},
		offset: -707
	});
	$('.js-salary-section').waypoint({
		handler: function(direction) {
			$('.js-salary-info ul').toggleClass('fadeOut');
		},
		offset: function() {
			return -$('.js-salary-section').height()+200
		}
	});
});