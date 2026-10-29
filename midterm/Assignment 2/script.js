document.addEventListener("DOMContentLoaded", () => {
  const MAX_LIMIT_PER_PRODUCT = 3;
  let cart = [];

  const cartIconBtn = document.getElementById("cart-icon-btn");
  const cartBadge = document.getElementById("cart-badge");
  const miniCartPanel = document.getElementById("mini-cart-panel");
  const miniCartList = document.getElementById("mini-cart-list");
  const miniCartCount = document.getElementById("mini-cart-count");
  const miniCartTotalPrice = document.getElementById("mini-cart-total-price");

  if (cartIconBtn && miniCartPanel) {
    cartIconBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      miniCartPanel.classList.toggle("open");
    });

    document.addEventListener("click", (e) => {
      if (
        !miniCartPanel.contains(e.target) &&
        !cartIconBtn.contains(e.target)
      ) {
        miniCartPanel.classList.remove("open");
      }
    });
  }

  const addCartButtons = document.querySelectorAll(".btn-add-cart");
  addCartButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const card = e.currentTarget.closest(".product-card");
      if (!card) return;

      const titleEl = card.querySelector(".product-title");
      const priceEl = card.querySelector(".product-price");

      if (!titleEl || !priceEl) return;

      const title = titleEl.textContent.trim();
      const priceText = priceEl.textContent.trim();
      const numericPrice = parseFloat(priceText.replace(/[^0-9.]/g, "")) || 0;

      addToCart(title, numericPrice, button);
    });
  });

  function addToCart(title, price, button) {
    const existingItem = cart.find((item) => item.title === title);

    if (existingItem) {
      if (existingItem.quantity < MAX_LIMIT_PER_PRODUCT) {
        existingItem.quantity += 1;
      }
    } else {
      cart.push({
        id: title,
        title: title,
        price: price,
        quantity: 1,
      });
    }

    updateCartUI();
    checkButtonLimitState(title, button);
  }

  window.removeCartItem = function (title) {
    const itemIndex = cart.findIndex((item) => item.title === title);
    if (itemIndex > -1) {
      if (cart[itemIndex].quantity > 1) {
        cart[itemIndex].quantity -= 1;
      } else {
        cart.splice(itemIndex, 1);
      }
    }

    updateCartUI();
    updateAllButtonStates();
  };

  function checkButtonLimitState(title, button) {
    const existingItem = cart.find((item) => item.title === title);
    if (existingItem && existingItem.quantity >= MAX_LIMIT_PER_PRODUCT) {
      button.textContent = "Limit reached";
      button.disabled = true;
    }
  }

  function updateAllButtonStates() {
    const cards = document.querySelectorAll(".product-card");
    cards.forEach((card) => {
      const titleEl = card.querySelector(".product-title");
      if (!titleEl) return;

      const title = titleEl.textContent.trim();
      const button = card.querySelector(".btn-add-cart");
      const existingItem = cart.find((item) => item.title === title);

      if (!existingItem || existingItem.quantity < MAX_LIMIT_PER_PRODUCT) {
        if (button) {
          button.textContent = "ADD TO CART";
          button.disabled = false;
        }
      }
    });
  }

  function updateCartUI() {
    const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartBadge) cartBadge.textContent = totalItemsCount;
    if (miniCartCount) miniCartCount.textContent = `(${totalItemsCount})`;

    const grandTotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    if (miniCartTotalPrice) {
      miniCartTotalPrice.textContent = `Rs.${grandTotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}`;
    }

    if (!miniCartList) return;

    if (cart.length === 0) {
      miniCartList.innerHTML =
        '<p style="font-size: 12px; color: #888;">Your cart is empty.</p>';
      return;
    }

    miniCartList.innerHTML = cart
      .map(
        (item) => `
        <div class="mini-cart-item">
          <div>
            <div style="font-weight:600">${item.title} (x${item.quantity})</div>
            <div style="color:#666">Rs.${(item.price * item.quantity).toLocaleString()}</div>
          </div>
          <button class="btn-remove-item" onclick="removeCartItem('${item.title}')">Remove</button>
        </div>`,
      )
      .join("");
  }
});