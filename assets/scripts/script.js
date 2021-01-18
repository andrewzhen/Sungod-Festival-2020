document.addEventListener('DOMContentLoaded', function(event) {
  var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
  let body = document.getElementsByTagName('body')[0];
  let nav = document.getElementsByTagName('nav')[0];
  let landingContact = document.getElementsByClassName("footer-right")[0];
  let container = document.getElementById("main-container");
  let hamburgerIcon = document.getElementById("hamburger");
  let hamburgerMenu = document.getElementById("hamburger-menu");
  let radius = document.getElementById("radius-container");
  let landingLogo = document.getElementsByClassName("landing-logo")[0];
  let altLogo = document.getElementsByClassName("alt-logo")[0];
  let menuOpen = false;
  let windowHeight = window.innerHeight * 0.01;
  document.documentElement.style.setProperty (
    "--windowHeight",
    `${windowHeight * 100}px`
  );



  handleMenu = () => {
    // Menu is open
    if (window.getComputedStyle(container).getPropertyValue("transform") === "matrix(1, 0, 0, 1, 0, 0)") {
      menuOpen = true;
      container.style.transform = "translateX(50%)";
      nav.style.transform = "translateX(52%)";
      hamburgerIcon.style.transform = "translateX(850%)";
      hamburgerMenu.style.transform = "translateX(0)";
      body.style.overflow = "hidden";
      
      try {
        radius.style.left = "0";
        radius.style.transform = "translateX(calc(50% - 20px))";
        radius.style.height = "calc(100vh + 20px)";
      } catch (error) { console.log(error); }

    // Menu is closed
    } else {
      menuOpen = false;
      container.style.transform = hamburgerIcon.style.transform = nav.style.transform = "translateX(0)";
      hamburgerMenu.style.transform = "translateX(-110%)";
      body.style.overflow = "auto";

      try {
        radius.style.left = "-10px";
        radius.style.transform = "translateX(0)";
        radius.style.height = "30px";
      } catch (error) { console.log(error); }
    }

    // Exit hamburger menu
    if (menuOpen) {
      container.addEventListener("click", handleMenu);
    } else {
      container.removeEventListener("click", handleMenu);
    }
  }



  // Hamburger icon opens menu
  document.getElementById("hamburger").addEventListener("click", function() {
    handleMenu();
  });



  body.onscroll = function() {
    width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    
    // Toggle fixed nav if scrolled past 75 pixels
    if (window.pageYOffset < 75) {
      nav.classList.remove("nav-scroll");
      
      try {
        if (window.innerWidth < 900) {
          altLogo.src = "assets/images/nav/logo-icon-blue.svg";
        } else {
          altLogo.src = "assets/images/nav/logo-full-blue.svg";
        }
        landingContact.classList.remove("nav-scroll");
      } catch (error) {}

      if (!hamburgerIcon.classList.contains('whiteIcon')) {
        hamburgerIcon.classList.add("blueIcon");
      }

    } else {
      nav.classList.add("nav-scroll");
      hamburgerIcon.classList.remove("blueIcon");

      try {
        if (window.innerWidth < 900) {
          altLogo.src = "assets/images/nav/logo-icon-white.svg";
        } else {
          altLogo.src = "assets/images/nav/logo-full-white.svg";
        }
        width <= 500 ? landingContact.classList.add("nav-scroll") : landingContact.classList.remove("nav-scroll");
      } catch (error) {}
    }

    // Toggle radius container if scrolled to bottom of landing video
    try {
      radius.style.display = window.pageYOffset >= window.innerHeight ? "none" : "block";
    } catch (error) {}
  }



  // Set video background
  try {
    if (width <= 500) {
      document.getElementById('sunflower-start').style.display = "none";
      document.getElementById('sunflower-loop').autoplay = true;
    } else {
      document.getElementById('sunflower-start').addEventListener('ended', startLoop, false);
      function startLoop(e) {
        document.getElementById('sunflower-start').style.display = "none";
        document.getElementById("sunflower-loop").play();
      }
    }
  } catch (error) {}



  // Swap logos for desktop/mobile
  changeLogo = () => {
    if (window.innerWidth > 900) {
      try {
        landingLogo.style.opacity = "1";
        landingLogo.src = "assets/images/nav/logo-full-white.svg";
      } catch (error) {}

      try {
        altLogo.style.opacity = "1";
        altLogo.src = "assets/images/nav/logo-full-blue.svg";
      } catch (error) {}

    } else {
      try {
        landingLogo.style.opacity = "0.7";
        landingLogo.src = "assets/images/nav/logo-icon-white.svg";
      } catch (error) {}

      try {
        altLogo.style.opacity = "0.7";
        altLogo.src = "assets/images/nav/logo-icon-blue.svg";
      } catch (error) {}
    }
  }



  changeLogo();
  window.addEventListener("resize", function() {
    changeLogo();

    windowHeight = window.innerHeight * 0.01;
    document.documentElement.style.setProperty (
      "--windowHeight",
      `${windowHeight * 100}px`
    );
  });



  // Safety drawers
  function expandDrawer($drawerLabel) {
    $drawerLabel.addClass("active");
    $drawerLabel.find(".caret").addClass("active");
    $drawerLabel
      .closest(".drawer")
      .find(".drawer-content")
      .slideDown();

    updateBtnsCursor($drawerLabel.closest(".drawers-section"));
  }
  function closeDrawer($drawerLabel) {
    $drawerLabel.removeClass("active");
    $drawerLabel.find(".caret").removeClass("active");
    $drawerLabel
      .closest(".drawer")
      .find(".drawer-content")
      .slideUp();

    updateBtnsCursor($drawerLabel.closest(".drawers-section"));
  }
  function updateBtnsCursor($drawersSection) {
    // Update btns cursors
    var all_closed = true;
    var all_expanded = true;

    $drawersSection.find(".drawer-label").each(function() {
      if ($(this).hasClass("active")) {
        all_closed = false;
      } else {
        all_expanded = false;
      }
    });

    var $close = $drawersSection.find(".close");
    var $expand = $drawersSection.find(".expand");

    if (all_closed) {
      $close.addClass("disabled");
      $expand.removeClass("disabled");
    } else if (all_expanded) {
      $expand.addClass("disabled");
      $close.removeClass("disabled");
    }
    if (!all_closed) {
      $close.removeClass("disabled");
    }
    if (!all_expanded) {
      $expand.removeClass("disabled");
    }
  }
  function toggleDrawer($drawerLabel) {
    $drawerLabel.toggleClass("active");
    $drawerLabel.find(".caret").toggleClass("active");
    $drawerLabel
      .closest(".drawer")
      .find(".drawer-content")
      .slideToggle();

    updateBtnsCursor($drawerLabel.closest(".drawers-section"));
  }
  $(".drawer-label").click(function() {
    toggleDrawer($(this));
  });
  $(".drawers-section .expand").click(function() {
    $(this)
      .closest(".drawers-section")
      .find(".drawer-label")
      .each(function() {
        expandDrawer($(this));
      });
  });
  $(".drawers-section .close").click(function() {
    $(this)
      .closest(".drawers-section")
      .find(".drawer-label")
      .each(function() {
        closeDrawer($(this));
      });
  });



  // const noise = () => {
  //   let canvas, ctx;
  //   let wWidth, wHeight;
  //   let noiseData = [];
  //   let frame = 0;
  //   let loopTimeout;

  //   // Create Noise
  //   const createNoise = () => {
  //     const idata = ctx.createImageData(wWidth, wHeight);
  //     const buffer32 = new Uint32Array(idata.data.buffer);
  //     const len = buffer32.length;

  //     for (let i = 0; i < len; i++) {
  //       if (Math.random() < 0.5) {
  //         buffer32[i] = 0xff000000;
  //       }
  //     }

  //     noiseData.push(idata);
  //   };

  //   // Play Noise
  //   const paintNoise = () => {
  //     if (frame === 9) {
  //       frame = 0;
  //     } else {
  //       frame++;
  //     }

  //     ctx.putImageData(noiseData[frame], 0, 0);
  //   };

  //   // Loop
  //   const loop = () => {
  //     paintNoise(frame);

  //     loopTimeout = window.setTimeout(() => {
  //       window.requestAnimationFrame(loop);
  //     }, (1000 / 25));
  //   };

  //   // Setup
  //   const setup = () => {
  //     wWidth = window.innerWidth;
  //     wHeight = window.innerHeight;

  //     canvas.width = wWidth;
  //     canvas.height = wHeight;

  //     for (let i = 0; i < 10; i++) {
  //       createNoise();
  //     }

  //     loop();
  //   };

  //   // Reset
  //   let resizeThrottle;
  //   const reset = () => {
  //     window.addEventListener('resize', () => {
  //       window.clearTimeout(resizeThrottle);

  //       resizeThrottle = window.setTimeout(() => {
  //         window.clearTimeout(loopTimeout);
  //         setup();
  //       }, 200);
  //     }, false);
  //   };

  //   // Init
  //   const init = (() => {
  //     canvas = document.getElementById('noise');
  //     ctx = canvas.getContext('2d');

  //     setup();
  //   })();
  // };

  // noise();

  // var countDownDate = new Date("April 25, 2020 12:00:00").getTime();
  // var x = setInterval(function() {
  //   var now = new Date().getTime();
  //   var distance = countDownDate - now;
  //   if (distance < 0) {
  //     return;
  //   }

  //   var days = Math.floor(distance / (1000 * 60 * 60 * 24)); 
  //   var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  //   var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  //   var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  //   if (days.toString().length == 1) {
  //     days = "0" + days;
  //   }
  //   if (hours.toString().length == 1) {
  //     hours = "0" + hours;
  //   }
  //   if (minutes.toString().length == 1) {
  //     minutes = "0" + minutes;
  //   }
  //   if (seconds.toString().length == 1) {
  //     seconds = "0" + seconds;
  //   }

  //   // Display the result in the element with id="demo"
  //   document.getElementById("days").innerHTML = days;
  //   document.getElementById("hours").innerHTML = hours;
  //   document.getElementById("minutes").innerHTML = minutes;
  //   document.getElementById("seconds").innerHTML = seconds;

  //   // If the count down is finished, write some text
  //   if (distance < 0) {
  //     clearInterval(x);
  //     document.getElementById("days").innerHTML = "00";
  //     document.getElementById("hours").innerHTML = "00";
  //     document.getElementById("minutes").innerHTML = "00";
  //     document.getElementById("seconds").innerHTML = "00";
  //   }
  // }, 500);
})