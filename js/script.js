//***======================================================================
//TODO 'Делаем Слайдер'

$(document).ready(function () {
   $('.slider__inner').slick({
      infinite: true,
      speed: 800,
      arrows: true,
      prevArrow: '<button type="button" class="slick-prev"><img src="./icons/slider/left_arrow.png"></button>',
      nextArrow: '<button type="button" class="slick-next"><img src="./icons/slider/right_arrow.png"></button>',
      // responsive: [
      //    {
      //       breakpoint: 680,
      //       settings: {
      //          arrows: false,
      //          dots: true
      //       }
      //    }
      // ]
   });
});

//***======================================================================
//TODO 'Делаем табы каталога'

$('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
   $(this)
      .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
      .closest('div.container').find('div.catalog__row').removeClass('catalog__row_active').eq($(this).index()).addClass('catalog__row_active');
});

//***======================================================================
//TODO 'Делаем кнопки'

// Для кнопок ПОДРОБНЕЕ и НАЗАД
function toggleSlide(item) {
   $(item).each(function (i) {
      $(this).on('click', function (e) {
         e.preventDefault();
         $('.item-catalog__top').eq(i).toggleClass('item-catalog__top_active');
         $('.item-catalog__about').eq(i).toggleClass('item-catalog__about_active');
      })
   });

   // Для кнопок Модальных окон
   $('[data-modal="consultation"]').on('click', function () {
      $('.overlay, #consultation').fadeIn('slow');
   });
   $('.modal__close').on('click', function () {
      $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
   })
   $('[data-modal="order"]').each(function (i) {
      $(this).on('click', function () {
         $('#order .modal__descr').text($('.item-catalog__title').eq(i).text());
         $('.overlay, #order').fadeIn('slow');
      })
   })

   // Для валидации форм
   function validateForms(form) {
      $(form).validate({
         rules: {
            name: "required",
            telephone: "required",
            email: {
               required: true,
               email: true
            }
         },
         messages: {
            name: "Пожалуйста, введите своё имя",
            telephone: "Пожалуйста, введите свой телефон",
            email: {
               required: "Пожалуйста, введите свою электронную почту",
               email: "Ваша почта должна быть в формате name@domain.ru"
            }
         }

      })
   };
   validateForms('#consultation-form');
   validateForms('#order form');
   validateForms('#consultation form');

   // Маска ввода телефона
   $('input[name = telephone]').mask("+7 (999) 999-99-99");

   // Отправка писем с сайта
   $('form').submit(function (e) {
      e.preventDefault();

      // Валидатор данных
      if (!$(this).valid()) {
         return;
      }

      // Отправка
      $.ajax({
         type: "POST",
         url: "mailer/smart.php",
         data: $(this).serialize()
      }).done(function () {
         $(this).find("input").val("");

         $('form').trigger('reset');
      });
      return false;
   });


   // Скрипт для плавного скролла
   $(window).scroll(function () {
      if ($(this).scrollTop() > 1500) {
         $('.pageup').fadeIn();
      } else {
         $('.pageup').fadeOut();
      }
   });

   // Плавность
   $("a").on('click', function (event) {
      if (this.hash !== "") {
         event.preventDefault();
         var hash = this.hash;
         $('html, body').animate({
            scrollTop: $(hash).offset().top
         }, 800, function () {
            window.location.hash = hash;
         });
      }
   });
};

toggleSlide('.item-catalog__link');
toggleSlide('.item-catalog__back');

//***======================================================================
//TODO 'Делаем Преимущества через конструктор'

window.addEventListener('DOMContentLoaded', () => {

   class FeatureItem {
      constructor(src, alt, title, text, parentSelector) {
         this.src = src;
         this.alt = alt;
         this.title = title;
         this.text = text;
         this.parent = document.querySelector(parentSelector);
      }

      createHTML() {
         const newElement = document.createElement('div');
         newElement.innerHTML = `
				<div class="features__item item-features">
					<div class="item-features__icon">
						<img src=${this.src} alt=${this.alt}>
					</div>
					<div class="item-features__title">${this.title}</div>
					<div class="item-features__text">${this.text}</div>
				</div>
			`;
         this.parent.append(newElement);
      }
   }

   new FeatureItem(
      "./icons/features/features-icon_1.png",
      "features-icon_1",
      'Делимся опытом',
      'Наши сотрудники всегда готовы поделиться своим опытом, так как сами бегают полумарафоны, переплыли Босфор, готовятся к соревнованиям по триатлону!',
      '.features__row'
   ).createHTML();


   new FeatureItem(
      "./icons/features/features-icon_2.png",
      "features-icon_2",
      'Заботимся о здоровье',
      'Мы работаем для того, чтобы Ваши занятия спортом шли на пользу Вашему здоровью и были в радость Вам и Вашим близким!',
      '.features__row'
   ).createHTML();


   new FeatureItem(
      "./icons/features/features-icon_3.png",
      "features-icon_3",
      'Учим бегать',
      'Помогаем с обучением правильной технике бега! Дружим с крупнейшей школой бега в России - <a href="#">I LOVE RUNNING.</a>',
      '.features__row'
   ).createHTML();

});

//***======================================================================
//TODO 'Делаем Отзывы через конструктор'

window.addEventListener('DOMContentLoaded', () => {

   class FeedbackItem {
      constructor(src, alt, name, sub, text, parentSelector) {
         this.src = src;
         this.alt = alt;
         this.name = name;
         this.sub = sub;
         this.text = text;
         this.parent = document.querySelector(parentSelector)
      }

      createFeedbackItem() {
         const newFeedback = document.createElement('div');
         newFeedback.innerHTML = `
					<div class="feedback__item item-feedback">
						<div class="item-feedback__image">
							<img src=${this.src} alt=${this.alt}>
						</div>
						<div class="item-feedback__body">
							<div class="item-feedback__name">${this.name}</div>
							<div class="item-feedback__sub">${this.sub}</div>
							<div class="item-feedback__text">
							${this.text}
							</div>
						</div>
					</div>
			`;
         this.parent.append(newFeedback);
      }
   }

   new FeedbackItem(
      "./img/review_1.jpg",
      "review_1",
      'Ирина Иванченко',
      '2 полумарафона',
      '<p>Не знала, что себе купить - обратилась к ребятам из RunSmart - подобрали пульсометр, который подошёл именно под мои цели и финансовые возможности. Через некоторое время решила обновить гаджет - не раздумывая обратилась туда же.</p> <p>Новые цели - новый гаджет!</p><p>Спасибо, RunSmart!</p>',
      '.feedback__row'
   ).createFeedbackItem();

   new FeedbackItem(
      "./img/review_2.jpg",
      "review_2",
      'Иван Сёмочкин',
      '1 полумарафон',
      '<p>Крутая штука-пульсометр. Обычно без них бегал. Оказывается только хуже себе делал. <br>Купил пульсометр, ещё в подарок получил тренировку. Со мной вместе провели первую тренировку, научили пользоваться новым гаджетом. Также объяснили основы анатомии, составили план тренировок на месяц вперёд.</p><p>С ними подготовился к своему первому полумарафону! Спасибо!!!</p>',
      '.feedback__row'
   ).createFeedbackItem();

   new FeedbackItem(
      "./img/review_3.jpg",
      "review_3",
      'Юлия Дашкина',
      '2 полумарафона',
      '<p>Долго не могла начать бегать, т.к. до этого несколько раз начинала, но становилось тяжело и я бросала. От друзей услышала о RunSmart и о беге с контролем пульса и решила попробовать.</p><p>Позвонила, ребята поинтересовались моими целями и подобрали очень интересный вариант со скидкой! Теперь бегаю и наслаждаюсь бегом! Пробежала уже 2 полумарафона и несколько более коротких забегов и не намерена останавливаться!</p><p>Спасибо!!!</p>',
      '.feedback__row'
   ).createFeedbackItem();
});

// Подключаем WOW
new WOW().init();
