


(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner(0);
    
    
    // Initiate the wowjs
    new WOW().init();

    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.navbar').addClass('sticky-top shadow-sm');
        } else {
            $('.navbar').removeClass('sticky-top shadow-sm');
        }
    });


    // Hero Header carousel
    $(".header-carousel").owlCarousel({
        animateOut: 'fadeOut',
        items: 1,
        margin: 0,
        stagePadding: 0,
        autoplay: true,
        smartSpeed: 500,
        dots: true,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
    });


    // attractions carousel
    $(".blog-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        center: false,
        dots: false,
        loop: true,
        margin: 25,
        nav : true,
        navText : [
            '<i class="fa fa-angle-right"></i>',
            '<i class="fa fa-angle-left"></i>'
        ],
        responsiveClass: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:2
            },
            1200:{
                items:3
            }
        }
    });


    // testimonial carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        center: false,
        dots: true,
        loop: true,
        margin: 25,
        nav : true,
        navText : [
            '<i class="fa fa-angle-right"></i>',
            '<i class="fa fa-angle-left"></i>'
        ],
        responsiveClass: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:2
            },
            1200:{
                items:3
            }
        }
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 5,
        time: 2000
    });


   // Back to top button
   $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
        $('.back-to-top').fadeIn('slow');
    } else {
        $('.back-to-top').fadeOut('slow');
    }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


})(jQuery);

/* =========================================================
   Trading Plans — robust app.js (safe with/without jQuery)
   ========================================================= */

/** Screenshot-based plans used to auto-fill cards (optional) */
const TP_PLANS = [
  {
    title: "Monthly Plan",
    usd: 59,
    xaf: "38,000 XAF",
    priceLabel: "$59 / 38,000 XAF",
    features: [
      "Provides basic market access",
      "Educational materials",
      "Trade alerts",
      "Risk management tools & support",
      "With limited community access",
      "& No personalized coaching"
    ]
  },
  {
    title: "Private Mentorship",
    usd: 116,
    xaf: "75,000 XAF",
    priceLabel: "$116 / 75,000 XAF",
    features: [
      "Offers full market access",
      "Intermediate educational resources",
      "Trade alerts",
      "Advanced risk management",
      "Priority support",
      "With weekly market analysis",
      "& No personalised coaching"
    ]
  },
  {
    title: "Exclusive Mentorship",
    usd: 236,
    xaf: "149,000 XAF",
    priceLabel: "$236 / 149,000 XAF",
    features: [
      "Grants unlimited market access",
      "Expert-level education",
      "Instant alerts",
      "Customized risk management",
      "Professional tools",
      "VIP support",
      "Exclusive community access",
      "& Monthly coaching"
    ]
  }
];

// Selected plan state
let tpSelectedPlan = null;

// --------- small helpers ----------
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const $ = (sel, root = document) => root.querySelector(sel);
const textOf = (sel, root) => {
  const el = $(sel, root);
  return el ? el.textContent.trim() : "";
};

// Create floating cart button if missing
function ensureFloatingCartBtn() {
  let btn = document.getElementById("tp-cart-btn");
  if (!btn) {
    btn = document.createElement("button");
    btn.id = "tp-cart-btn";
    btn.type = "button";
    btn.title = "View cart";
    btn.style.cssText =
      "position:fixed;right:16px;bottom:16px;width:56px;height:56px;border-radius:50%;border:none;cursor:pointer;z-index:9999;font-size:22px;box-shadow:0 10px 24px rgba(0,0,0,.15);background:#FD346E;color:#fff;";
    btn.innerHTML = "🛒";
    document.body.appendChild(btn);
  }
  return btn;
}

// Create cart sidebar if missing
function ensureCartSidebar() {
  let sidebar = document.getElementById("tp-cart-sidebar");
  if (!sidebar) {
    sidebar = document.createElement("aside");
    sidebar.id = "tp-cart-sidebar";
    sidebar.style.cssText =
      "position:fixed;top:0;right:0;width:min(420px,100%);height:100%;background:#fff;transform:translateX(100%);transition:transform .24s ease;z-index:9998;box-shadow:-10px 0 30px rgba(0,0,0,.08);display:flex;flex-direction:column;";
    sidebar.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:space-between;padding:14px 16px;border-bottom:1px solid #eee;">
        <strong>Enrollment</strong>
        <button id="tp-close-cart" type="button" style="border:1px solid #eee;background:#fff;padding:6px 10px;border-radius:10px;cursor:pointer">Close</button>
      </div>
      <div style="padding:14px 16px;overflow:auto;flex:1">
        <div id="tp-cart-details" style="background:#fafafa;border:1px solid #eee;border-radius:12px;padding:12px"></div>
        <form id="tp-cart-form" style="margin-top:12px;display:none">
          <div style="display:grid;gap:10px">
            <div>
              <label for="tp-user-name" style="display:block;margin-bottom:6px;font-weight:600">Full name</label>
              <input id="tp-user-name" type="text" placeholder="Your name" style="width:100%;padding:10px;border:1px solid #e5e7eb;border-radius:10px" />
            </div>
            <div>
              <label for="tp-user-phone" style="display:block;margin-bottom:6px;font-weight:600">Phone</label>
              <input id="tp-user-phone" type="tel" placeholder="6xx xx xx xx" style="width:100%;padding:10px;border:1px solid #e5e7eb;border-radius:10px" />
            </div>
            <button type="submit" style="background:#FD346E;color:#fff;border:none;padding:12px;border-radius:12px;font-weight:700;cursor:pointer">Send to WhatsApp</button>
          </div>
        </form>
      </div>
    `;
    document.body.appendChild(sidebar);
  }
  return sidebar;
}

// Sidebar open/close helpers
function openSidebar() {
  const sb = ensureCartSidebar();
  sb.style.transform = "translateX(0)";
}
function closeSidebar() {
  const sb = ensureCartSidebar();
  sb.style.transform = "translateX(100%)";
}

// Try to extract plan info from a card element
function extractPlanFromCard(card) {
  const title =
    card.dataset.plan ||
    textOf(".tp-card-title, .plan-title, h3, h4", card) ||
    "Selected Plan";
  // Price: prefer data-price, else try text nodes
  const price =
    card.dataset.price ||
    textOf(".tp-card-price, .price, .tp-price, .amount", card) ||
    "";
  // Build desc from features list if present
  let desc = card.dataset.desc || "";
  if (!desc) {
    const lis = $$(".tp-features li, .features li, ul li", card).map((li) =>
      li.textContent.trim()
    );
    if (lis.length) desc = lis.join(" • ");
  }
  if (!desc) desc = textOf(".tp-card-desc, .desc, p", card);

  return { title, price, desc };
}

// Autofill helper (optional): populate cards marked with data-tp-autofill
function autoFillCardsFromScreenshotData() {
  const autoCards = $$(
    ".tp-card[data-tp-autofill], [data-tp-autofill].tp-card"
  );
  autoCards.forEach((card, i) => {
    const plan = TP_PLANS[i] || TP_PLANS[0];
    // Write visible content if common placeholders exist
    const titleEl =
      $(".tp-card-title, .plan-title, h3, h4", card) || document.createElement("div");
    titleEl.textContent = plan.title;
    const priceEl =
      $(".tp-card-price, .tp-price, .price, .amount", card) ||
      document.createElement("div");
    priceEl.textContent = plan.priceLabel;

    let ul = $(".tp-features, .features, ul", card);
    if (!ul) {
      ul = document.createElement("ul");
      ul.className = "tp-features";
      card.appendChild(ul);
    }
    ul.innerHTML = plan.features.map((f) => `<li>${f}</li>`).join("");

    // Keep machine-readable attributes for the enroll action
    card.dataset.plan = plan.title;
    card.dataset.price = plan.priceLabel;
    card.dataset.desc = plan.features.join(" • ");
  });
}

// Attach listeners (robust to partial markup)
function bindCoreEvents() {
  const cartBtn = ensureFloatingCartBtn();
  const sidebar = ensureCartSidebar();
  const details = $("#tp-cart-details");
  const form = $("#tp-cart-form");
  const closeBtn = $("#tp-close-cart");

  // Event delegation for various enroll buttons
  document.addEventListener("click", (e) => {
    const enrollBtn = e.target.closest(
      ".tp-enroll-btn, [data-enroll], #enrollNowPrimary, #tp-enroll-now, #enrollNowBtn"
    );
    if (!enrollBtn) return;

    // Prefer a card around the button
    const card = enrollBtn.closest(".tp-card") || enrollBtn.closest("[data-plan]");
    let plan;
    if (card) {
      plan = extractPlanFromCard(card);
    } else {
      // fallback: read data directly from the button
      plan = {
        title: enrollBtn.dataset.plan || "Selected Plan",
        price: enrollBtn.dataset.price || "",
        desc: enrollBtn.dataset.desc || ""
      };
    }

    tpSelectedPlan = plan;

    if (details) {
      details.innerHTML = `
        <p style="margin:.25rem 0"><strong>Plan choisi:</strong> ${plan.title}</p>
        <p style="margin:.25rem 0"><strong>Prix:</strong> ${plan.price}</p>
        <p style="margin:.5rem 0"><em>${plan.desc}</em></p>
      `;
    }
    if (form) form.style.display = "block";
    openSidebar();
  });

  // Floating cart behavior
  cartBtn.addEventListener("click", () => {
    if (tpSelectedPlan) {
      openSidebar();
    } else {
      // Friendly prompt when empty
      alert(
        "Votre panier est vide.\n\nVeuillez cliquer sur “Enroll Now” sur un plan pour l’ajouter."
      );
    }
  });

  // Close cart
  if (closeBtn) {
    closeBtn.addEventListener("click", closeSidebar);
  }

  // Submit → WhatsApp
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!tpSelectedPlan) {
        alert("Veuillez sélectionner un plan avant de soumettre.");
        return;
      }

      const name = ($("#tp-user-name") || {}).value
        ? $("#tp-user-name").value.trim()
        : "";
      const phone = ($("#tp-user-phone") || {}).value
        ? $("#tp-user-phone").value.trim()
        : "";

      if (!name || !phone) {
        alert("Veuillez entrer votre nom et votre numéro de téléphone.");
        return;
      }

      const message =
        `Nouvelle inscription:\n` +
        `👤 Nom: ${name}\n` +
        `📞 Téléphone: ${phone}\n\n` +
        `📦 Plan: ${tpSelectedPlan.title}\n` +
        `💵 Prix: ${tpSelectedPlan.price}\n` +
        `📝 Détails: ${tpSelectedPlan.desc}`;

      const wa = `https://wa.me/237653154864?text=${encodeURIComponent(message)}`;
      window.open(wa, "_blank");

      form.reset();
      tpSelectedPlan = null;
      closeSidebar();
    });
  }
}

// ========== Initialize ==========
document.addEventListener("DOMContentLoaded", () => {
  try {
    autoFillCardsFromScreenshotData();
  } catch (_) {}
  bindCoreEvents();
});

/* =========================================================
   Make jQuery-based widgets SAFE (don’t error if missing)
   ========================================================= */
(function safeJQ() {
  if (!window.jQuery) return; // quietly exit if jQuery not present
  (function ($) {
    "use strict";

    // Spinner (safe)
    setTimeout(function () {
      if ($("#spinner").length) $("#spinner").removeClass("show");
    }, 1);

    // WOW (safe)
    try {
      if (window.WOW) new WOW().init();
    } catch (_) {}

    // Sticky Navbar
    $(window).on("scroll", function () {
      if ($(this).scrollTop() > 45) {
        $(".navbar").addClass("sticky-top shadow-sm");
      } else {
        $(".navbar").removeClass("sticky-top shadow-sm");
      }
    });

    // Owl carousels (only if plugin loaded)
    if ($.fn && $.fn.owlCarousel) {
      $(".header-carousel").owlCarousel({
        animateOut: "fadeOut",
        items: 1,
        margin: 0,
        stagePadding: 0,
        autoplay: true,
        smartSpeed: 500,
        dots: true,
        loop: true,
        nav: true,
        navText: [
          '<i class="bi bi-arrow-left"></i>',
          '<i class="bi bi-arrow-right"></i>'
        ]
      });

      $(".blog-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        center: false,
        dots: false,
        loop: true,
        margin: 25,
        nav: true,
        navText: [
          '<i class="fa fa-angle-right"></i>',
          '<i class="fa fa-angle-left"></i>'
        ],
        responsiveClass: true,
        responsive: {
          0: { items: 1 },
          576: { items: 1 },
          768: { items: 2 },
          992: { items: 2 },
          1200: { items: 3 }
        }
      });

      $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        center: false,
        dots: true,
        loop: true,
        margin: 25,
        nav: true,
        navText: [
          '<i class="fa fa-angle-right"></i>',
          '<i class="fa fa-angle-left"></i>'
        ],
        responsiveClass: true,
        responsive: {
          0: { items: 1 },
          576: { items: 1 },
          768: { items: 2 },
          992: { items: 2 },
          1200: { items: 3 }
        }
      });
    }

    // CounterUp (safe)
    if ($.fn && $.fn.counterUp) {
      $('[data-toggle="counter-up"]').counterUp({
        delay: 5,
        time: 2000
      });
    }

    // Back to top
    $(window).on("scroll", function () {
      if ($(this).scrollTop() > 300) {
        $(".back-to-top").fadeIn("slow");
      } else {
        $(".back-to-top").fadeOut("slow");
      }
    });
    $(".back-to-top").on("click", function () {
      const easing = $.easing && $.easing.easeInOutExpo ? "easeInOutExpo" : "swing";
      $("html, body").animate({ scrollTop: 0 }, 1500, easing);
      return false;
    });
  })(jQuery);
})();




