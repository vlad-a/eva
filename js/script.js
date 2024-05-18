$(document).ready(function () {
  $(".header-lang__top").on("click", function () {
    $(".header__lang").toggleClass("active"); // Сначала удалить класс у всех элементов
  });
  var sections = $(".section-class");
  var navItems = $(".section-list__item");
  var currentSection = 0;
  var isAnimating = false;

  function scrollToSection(index) {
    if (index >= 0 && index < sections.length && !isAnimating) {
      isAnimating = true;
      $("html, body").animate(
        {
          scrollTop: sections.eq(index).offset().top,
        },
        300,
        function () {
          isAnimating = false;
          setActiveSection(index);
        }
      );
    }
  }

  function setActiveSection(index) {
    sections.removeClass("active");
    sections.eq(index).addClass("active");
    navItems.removeClass("active");
    navItems.eq(index).addClass("active");
  }

  // Adding click event listener to each nav item
  navItems.each(function (index) {
    $(this).on("click", function () {
      scrollToSection(index);
    });
  });
  $(document).on("click", function (event) {
    if (
      !$(event.target).closest(".header-lang__dropdown, .header-lang__top")
        .length
    ) {
      $(".header__lang").removeClass("active");
    }
  });
  $(window).on("wheel", function (e) {
    if (isAnimating) return;

    if (e.originalEvent.deltaY > 0) {
      // Scroll down
      currentSection++;
    } else {
      // Scroll up
      currentSection--;
    }

    currentSection = Math.max(0, Math.min(sections.length - 1, currentSection));
    scrollToSection(currentSection);
  });

  $(window).on("keydown", function (e) {
    if (isAnimating) return;

    if (e.which == 40) {
      // Down arrow
      currentSection++;
    } else if (e.which == 38) {
      // Up arrow
      currentSection--;
    }

    currentSection = Math.max(0, Math.min(sections.length - 1, currentSection));
    scrollToSection(currentSection);
  });

  // Set the initial active section
  setActiveSection(currentSection);

  $(".changes__slider").owlCarousel({
    loop: false,
    nav: true,
    items: 5,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 5,
      },
    },
  });
});
